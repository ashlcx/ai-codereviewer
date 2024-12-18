import { giteaApi } from "gitea-js";
import * as core from "@actions/core";
import OpenAI from "openai";
import { readFileSync } from "fs";

const GITEA_TOKEN: string = core.getInput("GIHUB_TOKEN");
const OPENAI_API_KEY: string = core.getInput("OPENAI_API_KEY");
const OPENAI_API_MODEL: string = core.getInput("OPENAI_API_MODEL");
const OPENAI_API_BASE_URL: string = core.getInput("OPENAI_API_BASE_URL");

const GITEA_URL = process.env.GITHUB_SERVER_URL!;

console.log(GITEA_TOKEN);

const gitea = giteaApi(GITEA_URL, {
  token: GITEA_TOKEN,
});

// const openai = new OpenAI({
//   apiKey: OPENAI_API_KEY,
//   baseURL: OPENAI_API_BASE_URL,
// });

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

async function main() {
  // Set development environment variables
  process.env.GITHUB_REPOSITORY = "cerberus/cerberus";
  process.env.GITHUB_REF_NAME = "13";
  const prDetails = await getPRDetails();
  console.log(prDetails);

  const eventData = JSON.parse(
    readFileSync(process.env.GITHUB_EVENT_PATH ?? "", "utf8")
  );
  console.log(eventData);
}

main().catch((error) => {
  console.error("Error:", error);
  process.exit(1);
});
