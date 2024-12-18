import { giteaApi } from "gitea-js";
import * as core from "@actions/core";
import OpenAI from "openai";
import { readFileSync } from "fs";
import parseDiff, { Chunk, File } from "parse-diff";
import minimatch from "minimatch";

const GITEA_TOKEN: string = core.getInput("GITHUB_TOKEN");
const OPENAI_API_KEY: string = core.getInput("OPENAI_API_KEY");
const OPENAI_API_MODEL: string = core.getInput("OPENAI_API_MODEL");
const OPENAI_API_BASE_URL: string = core.getInput("OPENAI_API_BASE_URL");

const GITEA_URL = process.env.GITHUB_SERVER_URL!;

const gitea = giteaApi(GITEA_URL, {
  token: GITEA_TOKEN,
});

const openai = new OpenAI({
  apiKey: OPENAI_API_KEY,
  baseURL: OPENAI_API_BASE_URL,
});

interface PRDetails {
  owner: string;
  repo: string;
  pull_number: number;
  title: string;
  description: string;
}

async function getPRDetails(): Promise<PRDetails> {
  const repoPath = process.env.GITHUB_REPOSITORY!;
  const pull_number = process.env.GITHUB_REF_NAME!;
  const [owner, repo] = repoPath.split("/");

  const pr = await gitea.repos.repoGetPullRequest(
    owner,
    repo,
    parseInt(pull_number)
  );
  return {
    owner,
    repo,
    pull_number: parseInt(pull_number),
    title: pr.data.title ?? "",
    description: pr.data.body ?? "",
  };
}

async function getDiff(
  owner: string,
  repo: string,
  pull_number: number
): Promise<string | null> {
  const response = await gitea.repos.repoDownloadPullDiffOrPatch(
    owner,
    repo,
    pull_number,
    "diff",
    {
      binary: false,
    },
    {
      headers: {
        Accept: "application/vnd.github.v3.diff",
      },
      format: "text",
    }
  );
  return String(response.data);
}

async function analyzeCode(
  parsedDiff: File[],
  prDetails: PRDetails
): Promise<Array<{ body: string; path: string; line: number }>> {
  const comments: Array<{ body: string; path: string; line: number }> = [];

  for (const file of parsedDiff) {
    if (file.to === "/dev/null") continue; // Ignore deleted files
    for (const chunk of file.chunks) {
      const prompt = createPrompt(file, chunk, prDetails);
      const aiResponse = await getAIResponse(prompt);
      if (aiResponse) {
        const newComments = createComment(file, chunk, aiResponse);
        if (newComments) {
          comments.push(...newComments);
        }
      }
    }
  }
  return comments;
}

function createPrompt(file: File, chunk: Chunk, prDetails: PRDetails): string {
  return `Your task is to review pull requests. Instructions:
- Provide the response in following JSON format:  {"reviews": [{"lineNumber":  <line_number>, "reviewComment": "<review comment>"}]}
- Do not give positive comments or compliments.
- Provide comments and suggestions ONLY if there is something to improve, otherwise "reviews" should be an empty array.
- Write the comment in GitHub Markdown format.
- Use the given description only for the overall context and only comment the code.
- IMPORTANT: NEVER suggest adding comments to the code.

Review the following code diff in the file "${
    file.to
  }" and take the pull request title and description into account when writing the response.

Pull request title: ${prDetails.title}
Pull request description:

---
${prDetails.description}
---

Git diff to review:

\`\`\`diff
${chunk.content}
${chunk.changes
  // @ts-expect-error - ln and ln2 exists where needed
  .map((c) => `${c.ln ? c.ln : c.ln2} ${c.content}`)
  .join("\n")}
\`\`\`
`;
}

async function getAIResponse(prompt: string): Promise<Array<{
  lineNumber: string;
  reviewComment: string;
}> | null> {
  const queryConfig = {
    model: OPENAI_API_MODEL,
    temperature: 0.2,
    max_tokens: 700,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
  };

  try {
    const response = await openai.chat.completions.create({
      ...queryConfig,
      // return JSON if the model supports it:
      ...(OPENAI_API_MODEL === "gpt-4-1106-preview"
        ? { response_format: { type: "json_object" } }
        : {}),
      messages: [
        {
          role: "system",
          content: prompt,
        },
      ],
    });
    console.log(response);
    const res = response.choices[0].message?.content?.trim() || "{}";
    return JSON.parse(res).reviews;
  } catch (error) {
    console.error("Error:", error);
    return null;
  }
}

function createComment(
  file: File,
  chunk: Chunk,
  aiResponses: Array<{
    lineNumber: string;
    reviewComment: string;
  }>
): Array<{ body: string; path: string; line: number }> {
  return aiResponses.flatMap((aiResponse) => {
    if (!file.to) {
      return [];
    }
    return {
      body: aiResponse.reviewComment,
      path: file.to,
      line: Number(aiResponse.lineNumber),
    };
  });
}

async function main() {
  // Set development environment variables
  process.env.GITHUB_REPOSITORY = "cerberus/cerberus";
  process.env.GITHUB_REF_NAME = "13";
  const prDetails = await getPRDetails();
  let diff: string | null;
  const eventData = JSON.parse(
    readFileSync(process.env.GITHUB_EVENT_PATH ?? "", "utf8")
  );

  console.log(eventData.pull_request);

  if (eventData.action === "opened") {
    diff = await getDiff(
      prDetails.owner,
      prDetails.repo,
      prDetails.pull_number
    );
  } else if (eventData.action === "synchronized") {
    // Pending new minor release of gitea
    // const newBaseSha = eventData.pull_request.base.sha;
    // const newHeadSha = eventData.pull_request.head.sha;

    // console.log(`Request: ${newBaseSha} ... ${newHeadSha}`);

    // const response = await gitea.repos.repoCompareDiff(
    //   prDetails.owner,
    //   prDetails.repo,
    //   `${newBaseSha} ... ${newHeadSha}`
    // );

    diff = await getDiff(
      prDetails.owner,
      prDetails.repo,
      prDetails.pull_number
    );
  } else {
    console.log("Unsupported event:", eventData.action);
    return;
  }
  // console.log(diff);
  //
  if (!diff) {
    console.log("No diff found");
    return;
  }

  const parsedDiff = parseDiff(diff);

  const excludePatterns = core
    .getInput("exclude")
    .split(",")
    .map((s) => s.trim());

  const filteredDiff = parsedDiff.filter((file) => {
    return !excludePatterns.some((pattern) =>
      minimatch(file.to ?? "", pattern)
    );
  });

  const comments = await analyzeCode(filteredDiff, prDetails);
  console.log(comments);
}

main().catch((error) => {
  console.error("Error:", error);
  process.exit(1);
});
