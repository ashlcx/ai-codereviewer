require('./sourcemap-register.js');/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ 109:
/***/ (function(__unused_webpack_module, exports, __nccwpck_require__) {

"use strict";

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const gitea_js_1 = __nccwpck_require__(814);
const core = __importStar(__nccwpck_require__(186));
const fs_1 = __nccwpck_require__(147);
const GITEA_TOKEN = core.getInput("GIHUB_TOKEN");
const OPENAI_API_KEY = core.getInput("OPENAI_API_KEY");
const OPENAI_API_MODEL = core.getInput("OPENAI_API_MODEL");
const OPENAI_API_BASE_URL = core.getInput("OPENAI_API_BASE_URL");
const GITEA_URL = process.env.GITHUB_SERVER_URL;
const gitea = (0, gitea_js_1.giteaApi)(GITEA_URL, {
    token: GITEA_TOKEN,
});
function getPRDetails() {
    var _a, _b;
    return __awaiter(this, void 0, void 0, function* () {
        const repoPath = process.env.GITHUB_REPOSITORY;
        const pull_number = process.env.GITHUB_REF_NAME;
        const [owner, repo] = repoPath.split("/");
        const pr = yield gitea.repos.repoGetPullRequest(owner, repo, parseInt(pull_number));
        return {
            owner,
            repo,
            pull_number: parseInt(pull_number),
            title: (_a = pr.data.title) !== null && _a !== void 0 ? _a : "",
            description: (_b = pr.data.body) !== null && _b !== void 0 ? _b : "",
        };
    });
}
function main() {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        // Set development environment variables
        process.env.GITHUB_REPOSITORY = "cerberus/cerberus";
        process.env.GITHUB_REF_NAME = "13";
        const prDetails = yield getPRDetails();
        console.log(prDetails);
        const eventData = JSON.parse((0, fs_1.readFileSync)((_a = process.env.GITHUB_EVENT_PATH) !== null && _a !== void 0 ? _a : "", "utf8"));
        console.log(eventData);
    });
}
main().catch((error) => {
    console.error("Error:", error);
    process.exit(1);
});


/***/ }),

/***/ 351:
/***/ (function(__unused_webpack_module, exports, __nccwpck_require__) {

"use strict";

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.issue = exports.issueCommand = void 0;
const os = __importStar(__nccwpck_require__(37));
const utils_1 = __nccwpck_require__(278);
/**
 * Commands
 *
 * Command Format:
 *   ::name key=value,key=value::message
 *
 * Examples:
 *   ::warning::This is the message
 *   ::set-env name=MY_VAR::some value
 */
function issueCommand(command, properties, message) {
    const cmd = new Command(command, properties, message);
    process.stdout.write(cmd.toString() + os.EOL);
}
exports.issueCommand = issueCommand;
function issue(name, message = '') {
    issueCommand(name, {}, message);
}
exports.issue = issue;
const CMD_STRING = '::';
class Command {
    constructor(command, properties, message) {
        if (!command) {
            command = 'missing.command';
        }
        this.command = command;
        this.properties = properties;
        this.message = message;
    }
    toString() {
        let cmdStr = CMD_STRING + this.command;
        if (this.properties && Object.keys(this.properties).length > 0) {
            cmdStr += ' ';
            let first = true;
            for (const key in this.properties) {
                if (this.properties.hasOwnProperty(key)) {
                    const val = this.properties[key];
                    if (val) {
                        if (first) {
                            first = false;
                        }
                        else {
                            cmdStr += ',';
                        }
                        cmdStr += `${key}=${escapeProperty(val)}`;
                    }
                }
            }
        }
        cmdStr += `${CMD_STRING}${escapeData(this.message)}`;
        return cmdStr;
    }
}
function escapeData(s) {
    return utils_1.toCommandValue(s)
        .replace(/%/g, '%25')
        .replace(/\r/g, '%0D')
        .replace(/\n/g, '%0A');
}
function escapeProperty(s) {
    return utils_1.toCommandValue(s)
        .replace(/%/g, '%25')
        .replace(/\r/g, '%0D')
        .replace(/\n/g, '%0A')
        .replace(/:/g, '%3A')
        .replace(/,/g, '%2C');
}
//# sourceMappingURL=command.js.map

/***/ }),

/***/ 186:
/***/ (function(__unused_webpack_module, exports, __nccwpck_require__) {

"use strict";

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.getIDToken = exports.getState = exports.saveState = exports.group = exports.endGroup = exports.startGroup = exports.info = exports.notice = exports.warning = exports.error = exports.debug = exports.isDebug = exports.setFailed = exports.setCommandEcho = exports.setOutput = exports.getBooleanInput = exports.getMultilineInput = exports.getInput = exports.addPath = exports.setSecret = exports.exportVariable = exports.ExitCode = void 0;
const command_1 = __nccwpck_require__(351);
const file_command_1 = __nccwpck_require__(717);
const utils_1 = __nccwpck_require__(278);
const os = __importStar(__nccwpck_require__(37));
const path = __importStar(__nccwpck_require__(17));
const oidc_utils_1 = __nccwpck_require__(41);
/**
 * The code to exit an action
 */
var ExitCode;
(function (ExitCode) {
    /**
     * A code indicating that the action was successful
     */
    ExitCode[ExitCode["Success"] = 0] = "Success";
    /**
     * A code indicating that the action was a failure
     */
    ExitCode[ExitCode["Failure"] = 1] = "Failure";
})(ExitCode = exports.ExitCode || (exports.ExitCode = {}));
//-----------------------------------------------------------------------
// Variables
//-----------------------------------------------------------------------
/**
 * Sets env variable for this action and future actions in the job
 * @param name the name of the variable to set
 * @param val the value of the variable. Non-string values will be converted to a string via JSON.stringify
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function exportVariable(name, val) {
    const convertedVal = utils_1.toCommandValue(val);
    process.env[name] = convertedVal;
    const filePath = process.env['GITHUB_ENV'] || '';
    if (filePath) {
        return file_command_1.issueFileCommand('ENV', file_command_1.prepareKeyValueMessage(name, val));
    }
    command_1.issueCommand('set-env', { name }, convertedVal);
}
exports.exportVariable = exportVariable;
/**
 * Registers a secret which will get masked from logs
 * @param secret value of the secret
 */
function setSecret(secret) {
    command_1.issueCommand('add-mask', {}, secret);
}
exports.setSecret = setSecret;
/**
 * Prepends inputPath to the PATH (for this action and future actions)
 * @param inputPath
 */
function addPath(inputPath) {
    const filePath = process.env['GITHUB_PATH'] || '';
    if (filePath) {
        file_command_1.issueFileCommand('PATH', inputPath);
    }
    else {
        command_1.issueCommand('add-path', {}, inputPath);
    }
    process.env['PATH'] = `${inputPath}${path.delimiter}${process.env['PATH']}`;
}
exports.addPath = addPath;
/**
 * Gets the value of an input.
 * Unless trimWhitespace is set to false in InputOptions, the value is also trimmed.
 * Returns an empty string if the value is not defined.
 *
 * @param     name     name of the input to get
 * @param     options  optional. See InputOptions.
 * @returns   string
 */
function getInput(name, options) {
    const val = process.env[`INPUT_${name.replace(/ /g, '_').toUpperCase()}`] || '';
    if (options && options.required && !val) {
        throw new Error(`Input required and not supplied: ${name}`);
    }
    if (options && options.trimWhitespace === false) {
        return val;
    }
    return val.trim();
}
exports.getInput = getInput;
/**
 * Gets the values of an multiline input.  Each value is also trimmed.
 *
 * @param     name     name of the input to get
 * @param     options  optional. See InputOptions.
 * @returns   string[]
 *
 */
function getMultilineInput(name, options) {
    const inputs = getInput(name, options)
        .split('\n')
        .filter(x => x !== '');
    if (options && options.trimWhitespace === false) {
        return inputs;
    }
    return inputs.map(input => input.trim());
}
exports.getMultilineInput = getMultilineInput;
/**
 * Gets the input value of the boolean type in the YAML 1.2 "core schema" specification.
 * Support boolean input list: `true | True | TRUE | false | False | FALSE` .
 * The return value is also in boolean type.
 * ref: https://yaml.org/spec/1.2/spec.html#id2804923
 *
 * @param     name     name of the input to get
 * @param     options  optional. See InputOptions.
 * @returns   boolean
 */
function getBooleanInput(name, options) {
    const trueValue = ['true', 'True', 'TRUE'];
    const falseValue = ['false', 'False', 'FALSE'];
    const val = getInput(name, options);
    if (trueValue.includes(val))
        return true;
    if (falseValue.includes(val))
        return false;
    throw new TypeError(`Input does not meet YAML 1.2 "Core Schema" specification: ${name}\n` +
        `Support boolean input list: \`true | True | TRUE | false | False | FALSE\``);
}
exports.getBooleanInput = getBooleanInput;
/**
 * Sets the value of an output.
 *
 * @param     name     name of the output to set
 * @param     value    value to store. Non-string values will be converted to a string via JSON.stringify
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function setOutput(name, value) {
    const filePath = process.env['GITHUB_OUTPUT'] || '';
    if (filePath) {
        return file_command_1.issueFileCommand('OUTPUT', file_command_1.prepareKeyValueMessage(name, value));
    }
    process.stdout.write(os.EOL);
    command_1.issueCommand('set-output', { name }, utils_1.toCommandValue(value));
}
exports.setOutput = setOutput;
/**
 * Enables or disables the echoing of commands into stdout for the rest of the step.
 * Echoing is disabled by default if ACTIONS_STEP_DEBUG is not set.
 *
 */
function setCommandEcho(enabled) {
    command_1.issue('echo', enabled ? 'on' : 'off');
}
exports.setCommandEcho = setCommandEcho;
//-----------------------------------------------------------------------
// Results
//-----------------------------------------------------------------------
/**
 * Sets the action status to failed.
 * When the action exits it will be with an exit code of 1
 * @param message add error issue message
 */
function setFailed(message) {
    process.exitCode = ExitCode.Failure;
    error(message);
}
exports.setFailed = setFailed;
//-----------------------------------------------------------------------
// Logging Commands
//-----------------------------------------------------------------------
/**
 * Gets whether Actions Step Debug is on or not
 */
function isDebug() {
    return process.env['RUNNER_DEBUG'] === '1';
}
exports.isDebug = isDebug;
/**
 * Writes debug message to user log
 * @param message debug message
 */
function debug(message) {
    command_1.issueCommand('debug', {}, message);
}
exports.debug = debug;
/**
 * Adds an error issue
 * @param message error issue message. Errors will be converted to string via toString()
 * @param properties optional properties to add to the annotation.
 */
function error(message, properties = {}) {
    command_1.issueCommand('error', utils_1.toCommandProperties(properties), message instanceof Error ? message.toString() : message);
}
exports.error = error;
/**
 * Adds a warning issue
 * @param message warning issue message. Errors will be converted to string via toString()
 * @param properties optional properties to add to the annotation.
 */
function warning(message, properties = {}) {
    command_1.issueCommand('warning', utils_1.toCommandProperties(properties), message instanceof Error ? message.toString() : message);
}
exports.warning = warning;
/**
 * Adds a notice issue
 * @param message notice issue message. Errors will be converted to string via toString()
 * @param properties optional properties to add to the annotation.
 */
function notice(message, properties = {}) {
    command_1.issueCommand('notice', utils_1.toCommandProperties(properties), message instanceof Error ? message.toString() : message);
}
exports.notice = notice;
/**
 * Writes info to log with console.log.
 * @param message info message
 */
function info(message) {
    process.stdout.write(message + os.EOL);
}
exports.info = info;
/**
 * Begin an output group.
 *
 * Output until the next `groupEnd` will be foldable in this group
 *
 * @param name The name of the output group
 */
function startGroup(name) {
    command_1.issue('group', name);
}
exports.startGroup = startGroup;
/**
 * End an output group.
 */
function endGroup() {
    command_1.issue('endgroup');
}
exports.endGroup = endGroup;
/**
 * Wrap an asynchronous function call in a group.
 *
 * Returns the same type as the function itself.
 *
 * @param name The name of the group
 * @param fn The function to wrap in the group
 */
function group(name, fn) {
    return __awaiter(this, void 0, void 0, function* () {
        startGroup(name);
        let result;
        try {
            result = yield fn();
        }
        finally {
            endGroup();
        }
        return result;
    });
}
exports.group = group;
//-----------------------------------------------------------------------
// Wrapper action state
//-----------------------------------------------------------------------
/**
 * Saves state for current action, the state can only be retrieved by this action's post job execution.
 *
 * @param     name     name of the state to store
 * @param     value    value to store. Non-string values will be converted to a string via JSON.stringify
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function saveState(name, value) {
    const filePath = process.env['GITHUB_STATE'] || '';
    if (filePath) {
        return file_command_1.issueFileCommand('STATE', file_command_1.prepareKeyValueMessage(name, value));
    }
    command_1.issueCommand('save-state', { name }, utils_1.toCommandValue(value));
}
exports.saveState = saveState;
/**
 * Gets the value of an state set by this action's main execution.
 *
 * @param     name     name of the state to get
 * @returns   string
 */
function getState(name) {
    return process.env[`STATE_${name}`] || '';
}
exports.getState = getState;
function getIDToken(aud) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield oidc_utils_1.OidcClient.getIDToken(aud);
    });
}
exports.getIDToken = getIDToken;
/**
 * Summary exports
 */
var summary_1 = __nccwpck_require__(327);
Object.defineProperty(exports, "summary", ({ enumerable: true, get: function () { return summary_1.summary; } }));
/**
 * @deprecated use core.summary
 */
var summary_2 = __nccwpck_require__(327);
Object.defineProperty(exports, "markdownSummary", ({ enumerable: true, get: function () { return summary_2.markdownSummary; } }));
/**
 * Path exports
 */
var path_utils_1 = __nccwpck_require__(981);
Object.defineProperty(exports, "toPosixPath", ({ enumerable: true, get: function () { return path_utils_1.toPosixPath; } }));
Object.defineProperty(exports, "toWin32Path", ({ enumerable: true, get: function () { return path_utils_1.toWin32Path; } }));
Object.defineProperty(exports, "toPlatformPath", ({ enumerable: true, get: function () { return path_utils_1.toPlatformPath; } }));
//# sourceMappingURL=core.js.map

/***/ }),

/***/ 717:
/***/ (function(__unused_webpack_module, exports, __nccwpck_require__) {

"use strict";

// For internal use, subject to change.
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.prepareKeyValueMessage = exports.issueFileCommand = void 0;
// We use any as a valid input type
/* eslint-disable @typescript-eslint/no-explicit-any */
const fs = __importStar(__nccwpck_require__(147));
const os = __importStar(__nccwpck_require__(37));
const uuid_1 = __nccwpck_require__(840);
const utils_1 = __nccwpck_require__(278);
function issueFileCommand(command, message) {
    const filePath = process.env[`GITHUB_${command}`];
    if (!filePath) {
        throw new Error(`Unable to find environment variable for file command ${command}`);
    }
    if (!fs.existsSync(filePath)) {
        throw new Error(`Missing file at path: ${filePath}`);
    }
    fs.appendFileSync(filePath, `${utils_1.toCommandValue(message)}${os.EOL}`, {
        encoding: 'utf8'
    });
}
exports.issueFileCommand = issueFileCommand;
function prepareKeyValueMessage(key, value) {
    const delimiter = `ghadelimiter_${uuid_1.v4()}`;
    const convertedValue = utils_1.toCommandValue(value);
    // These should realistically never happen, but just in case someone finds a
    // way to exploit uuid generation let's not allow keys or values that contain
    // the delimiter.
    if (key.includes(delimiter)) {
        throw new Error(`Unexpected input: name should not contain the delimiter "${delimiter}"`);
    }
    if (convertedValue.includes(delimiter)) {
        throw new Error(`Unexpected input: value should not contain the delimiter "${delimiter}"`);
    }
    return `${key}<<${delimiter}${os.EOL}${convertedValue}${os.EOL}${delimiter}`;
}
exports.prepareKeyValueMessage = prepareKeyValueMessage;
//# sourceMappingURL=file-command.js.map

/***/ }),

/***/ 41:
/***/ (function(__unused_webpack_module, exports, __nccwpck_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.OidcClient = void 0;
const http_client_1 = __nccwpck_require__(255);
const auth_1 = __nccwpck_require__(526);
const core_1 = __nccwpck_require__(186);
class OidcClient {
    static createHttpClient(allowRetry = true, maxRetry = 10) {
        const requestOptions = {
            allowRetries: allowRetry,
            maxRetries: maxRetry
        };
        return new http_client_1.HttpClient('actions/oidc-client', [new auth_1.BearerCredentialHandler(OidcClient.getRequestToken())], requestOptions);
    }
    static getRequestToken() {
        const token = process.env['ACTIONS_ID_TOKEN_REQUEST_TOKEN'];
        if (!token) {
            throw new Error('Unable to get ACTIONS_ID_TOKEN_REQUEST_TOKEN env variable');
        }
        return token;
    }
    static getIDTokenUrl() {
        const runtimeUrl = process.env['ACTIONS_ID_TOKEN_REQUEST_URL'];
        if (!runtimeUrl) {
            throw new Error('Unable to get ACTIONS_ID_TOKEN_REQUEST_URL env variable');
        }
        return runtimeUrl;
    }
    static getCall(id_token_url) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const httpclient = OidcClient.createHttpClient();
            const res = yield httpclient
                .getJson(id_token_url)
                .catch(error => {
                throw new Error(`Failed to get ID Token. \n 
        Error Code : ${error.statusCode}\n 
        Error Message: ${error.result.message}`);
            });
            const id_token = (_a = res.result) === null || _a === void 0 ? void 0 : _a.value;
            if (!id_token) {
                throw new Error('Response json body do not have ID Token field');
            }
            return id_token;
        });
    }
    static getIDToken(audience) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // New ID Token is requested from action service
                let id_token_url = OidcClient.getIDTokenUrl();
                if (audience) {
                    const encodedAudience = encodeURIComponent(audience);
                    id_token_url = `${id_token_url}&audience=${encodedAudience}`;
                }
                core_1.debug(`ID token url is ${id_token_url}`);
                const id_token = yield OidcClient.getCall(id_token_url);
                core_1.setSecret(id_token);
                return id_token;
            }
            catch (error) {
                throw new Error(`Error message: ${error.message}`);
            }
        });
    }
}
exports.OidcClient = OidcClient;
//# sourceMappingURL=oidc-utils.js.map

/***/ }),

/***/ 981:
/***/ (function(__unused_webpack_module, exports, __nccwpck_require__) {

"use strict";

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.toPlatformPath = exports.toWin32Path = exports.toPosixPath = void 0;
const path = __importStar(__nccwpck_require__(17));
/**
 * toPosixPath converts the given path to the posix form. On Windows, \\ will be
 * replaced with /.
 *
 * @param pth. Path to transform.
 * @return string Posix path.
 */
function toPosixPath(pth) {
    return pth.replace(/[\\]/g, '/');
}
exports.toPosixPath = toPosixPath;
/**
 * toWin32Path converts the given path to the win32 form. On Linux, / will be
 * replaced with \\.
 *
 * @param pth. Path to transform.
 * @return string Win32 path.
 */
function toWin32Path(pth) {
    return pth.replace(/[/]/g, '\\');
}
exports.toWin32Path = toWin32Path;
/**
 * toPlatformPath converts the given path to a platform-specific path. It does
 * this by replacing instances of / and \ with the platform-specific path
 * separator.
 *
 * @param pth The path to platformize.
 * @return string The platform-specific path.
 */
function toPlatformPath(pth) {
    return pth.replace(/[/\\]/g, path.sep);
}
exports.toPlatformPath = toPlatformPath;
//# sourceMappingURL=path-utils.js.map

/***/ }),

/***/ 327:
/***/ (function(__unused_webpack_module, exports, __nccwpck_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.summary = exports.markdownSummary = exports.SUMMARY_DOCS_URL = exports.SUMMARY_ENV_VAR = void 0;
const os_1 = __nccwpck_require__(37);
const fs_1 = __nccwpck_require__(147);
const { access, appendFile, writeFile } = fs_1.promises;
exports.SUMMARY_ENV_VAR = 'GITHUB_STEP_SUMMARY';
exports.SUMMARY_DOCS_URL = 'https://docs.github.com/actions/using-workflows/workflow-commands-for-github-actions#adding-a-job-summary';
class Summary {
    constructor() {
        this._buffer = '';
    }
    /**
     * Finds the summary file path from the environment, rejects if env var is not found or file does not exist
     * Also checks r/w permissions.
     *
     * @returns step summary file path
     */
    filePath() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this._filePath) {
                return this._filePath;
            }
            const pathFromEnv = process.env[exports.SUMMARY_ENV_VAR];
            if (!pathFromEnv) {
                throw new Error(`Unable to find environment variable for $${exports.SUMMARY_ENV_VAR}. Check if your runtime environment supports job summaries.`);
            }
            try {
                yield access(pathFromEnv, fs_1.constants.R_OK | fs_1.constants.W_OK);
            }
            catch (_a) {
                throw new Error(`Unable to access summary file: '${pathFromEnv}'. Check if the file has correct read/write permissions.`);
            }
            this._filePath = pathFromEnv;
            return this._filePath;
        });
    }
    /**
     * Wraps content in an HTML tag, adding any HTML attributes
     *
     * @param {string} tag HTML tag to wrap
     * @param {string | null} content content within the tag
     * @param {[attribute: string]: string} attrs key-value list of HTML attributes to add
     *
     * @returns {string} content wrapped in HTML element
     */
    wrap(tag, content, attrs = {}) {
        const htmlAttrs = Object.entries(attrs)
            .map(([key, value]) => ` ${key}="${value}"`)
            .join('');
        if (!content) {
            return `<${tag}${htmlAttrs}>`;
        }
        return `<${tag}${htmlAttrs}>${content}</${tag}>`;
    }
    /**
     * Writes text in the buffer to the summary buffer file and empties buffer. Will append by default.
     *
     * @param {SummaryWriteOptions} [options] (optional) options for write operation
     *
     * @returns {Promise<Summary>} summary instance
     */
    write(options) {
        return __awaiter(this, void 0, void 0, function* () {
            const overwrite = !!(options === null || options === void 0 ? void 0 : options.overwrite);
            const filePath = yield this.filePath();
            const writeFunc = overwrite ? writeFile : appendFile;
            yield writeFunc(filePath, this._buffer, { encoding: 'utf8' });
            return this.emptyBuffer();
        });
    }
    /**
     * Clears the summary buffer and wipes the summary file
     *
     * @returns {Summary} summary instance
     */
    clear() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.emptyBuffer().write({ overwrite: true });
        });
    }
    /**
     * Returns the current summary buffer as a string
     *
     * @returns {string} string of summary buffer
     */
    stringify() {
        return this._buffer;
    }
    /**
     * If the summary buffer is empty
     *
     * @returns {boolen} true if the buffer is empty
     */
    isEmptyBuffer() {
        return this._buffer.length === 0;
    }
    /**
     * Resets the summary buffer without writing to summary file
     *
     * @returns {Summary} summary instance
     */
    emptyBuffer() {
        this._buffer = '';
        return this;
    }
    /**
     * Adds raw text to the summary buffer
     *
     * @param {string} text content to add
     * @param {boolean} [addEOL=false] (optional) append an EOL to the raw text (default: false)
     *
     * @returns {Summary} summary instance
     */
    addRaw(text, addEOL = false) {
        this._buffer += text;
        return addEOL ? this.addEOL() : this;
    }
    /**
     * Adds the operating system-specific end-of-line marker to the buffer
     *
     * @returns {Summary} summary instance
     */
    addEOL() {
        return this.addRaw(os_1.EOL);
    }
    /**
     * Adds an HTML codeblock to the summary buffer
     *
     * @param {string} code content to render within fenced code block
     * @param {string} lang (optional) language to syntax highlight code
     *
     * @returns {Summary} summary instance
     */
    addCodeBlock(code, lang) {
        const attrs = Object.assign({}, (lang && { lang }));
        const element = this.wrap('pre', this.wrap('code', code), attrs);
        return this.addRaw(element).addEOL();
    }
    /**
     * Adds an HTML list to the summary buffer
     *
     * @param {string[]} items list of items to render
     * @param {boolean} [ordered=false] (optional) if the rendered list should be ordered or not (default: false)
     *
     * @returns {Summary} summary instance
     */
    addList(items, ordered = false) {
        const tag = ordered ? 'ol' : 'ul';
        const listItems = items.map(item => this.wrap('li', item)).join('');
        const element = this.wrap(tag, listItems);
        return this.addRaw(element).addEOL();
    }
    /**
     * Adds an HTML table to the summary buffer
     *
     * @param {SummaryTableCell[]} rows table rows
     *
     * @returns {Summary} summary instance
     */
    addTable(rows) {
        const tableBody = rows
            .map(row => {
            const cells = row
                .map(cell => {
                if (typeof cell === 'string') {
                    return this.wrap('td', cell);
                }
                const { header, data, colspan, rowspan } = cell;
                const tag = header ? 'th' : 'td';
                const attrs = Object.assign(Object.assign({}, (colspan && { colspan })), (rowspan && { rowspan }));
                return this.wrap(tag, data, attrs);
            })
                .join('');
            return this.wrap('tr', cells);
        })
            .join('');
        const element = this.wrap('table', tableBody);
        return this.addRaw(element).addEOL();
    }
    /**
     * Adds a collapsable HTML details element to the summary buffer
     *
     * @param {string} label text for the closed state
     * @param {string} content collapsable content
     *
     * @returns {Summary} summary instance
     */
    addDetails(label, content) {
        const element = this.wrap('details', this.wrap('summary', label) + content);
        return this.addRaw(element).addEOL();
    }
    /**
     * Adds an HTML image tag to the summary buffer
     *
     * @param {string} src path to the image you to embed
     * @param {string} alt text description of the image
     * @param {SummaryImageOptions} options (optional) addition image attributes
     *
     * @returns {Summary} summary instance
     */
    addImage(src, alt, options) {
        const { width, height } = options || {};
        const attrs = Object.assign(Object.assign({}, (width && { width })), (height && { height }));
        const element = this.wrap('img', null, Object.assign({ src, alt }, attrs));
        return this.addRaw(element).addEOL();
    }
    /**
     * Adds an HTML section heading element
     *
     * @param {string} text heading text
     * @param {number | string} [level=1] (optional) the heading level, default: 1
     *
     * @returns {Summary} summary instance
     */
    addHeading(text, level) {
        const tag = `h${level}`;
        const allowedTag = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'].includes(tag)
            ? tag
            : 'h1';
        const element = this.wrap(allowedTag, text);
        return this.addRaw(element).addEOL();
    }
    /**
     * Adds an HTML thematic break (<hr>) to the summary buffer
     *
     * @returns {Summary} summary instance
     */
    addSeparator() {
        const element = this.wrap('hr', null);
        return this.addRaw(element).addEOL();
    }
    /**
     * Adds an HTML line break (<br>) to the summary buffer
     *
     * @returns {Summary} summary instance
     */
    addBreak() {
        const element = this.wrap('br', null);
        return this.addRaw(element).addEOL();
    }
    /**
     * Adds an HTML blockquote to the summary buffer
     *
     * @param {string} text quote text
     * @param {string} cite (optional) citation url
     *
     * @returns {Summary} summary instance
     */
    addQuote(text, cite) {
        const attrs = Object.assign({}, (cite && { cite }));
        const element = this.wrap('blockquote', text, attrs);
        return this.addRaw(element).addEOL();
    }
    /**
     * Adds an HTML anchor tag to the summary buffer
     *
     * @param {string} text link text/content
     * @param {string} href hyperlink
     *
     * @returns {Summary} summary instance
     */
    addLink(text, href) {
        const element = this.wrap('a', text, { href });
        return this.addRaw(element).addEOL();
    }
}
const _summary = new Summary();
/**
 * @deprecated use `core.summary`
 */
exports.markdownSummary = _summary;
exports.summary = _summary;
//# sourceMappingURL=summary.js.map

/***/ }),

/***/ 278:
/***/ ((__unused_webpack_module, exports) => {

"use strict";

// We use any as a valid input type
/* eslint-disable @typescript-eslint/no-explicit-any */
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.toCommandProperties = exports.toCommandValue = void 0;
/**
 * Sanitizes an input into a string so it can be passed into issueCommand safely
 * @param input input to sanitize into a string
 */
function toCommandValue(input) {
    if (input === null || input === undefined) {
        return '';
    }
    else if (typeof input === 'string' || input instanceof String) {
        return input;
    }
    return JSON.stringify(input);
}
exports.toCommandValue = toCommandValue;
/**
 *
 * @param annotationProperties
 * @returns The command properties to send with the actual annotation command
 * See IssueCommandProperties: https://github.com/actions/runner/blob/main/src/Runner.Worker/ActionCommandManager.cs#L646
 */
function toCommandProperties(annotationProperties) {
    if (!Object.keys(annotationProperties).length) {
        return {};
    }
    return {
        title: annotationProperties.title,
        file: annotationProperties.file,
        line: annotationProperties.startLine,
        endLine: annotationProperties.endLine,
        col: annotationProperties.startColumn,
        endColumn: annotationProperties.endColumn
    };
}
exports.toCommandProperties = toCommandProperties;
//# sourceMappingURL=utils.js.map

/***/ }),

/***/ 526:
/***/ (function(__unused_webpack_module, exports) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PersonalAccessTokenCredentialHandler = exports.BearerCredentialHandler = exports.BasicCredentialHandler = void 0;
class BasicCredentialHandler {
    constructor(username, password) {
        this.username = username;
        this.password = password;
    }
    prepareRequest(options) {
        if (!options.headers) {
            throw Error('The request has no headers');
        }
        options.headers['Authorization'] = `Basic ${Buffer.from(`${this.username}:${this.password}`).toString('base64')}`;
    }
    // This handler cannot handle 401
    canHandleAuthentication() {
        return false;
    }
    handleAuthentication() {
        return __awaiter(this, void 0, void 0, function* () {
            throw new Error('not implemented');
        });
    }
}
exports.BasicCredentialHandler = BasicCredentialHandler;
class BearerCredentialHandler {
    constructor(token) {
        this.token = token;
    }
    // currently implements pre-authorization
    // TODO: support preAuth = false where it hooks on 401
    prepareRequest(options) {
        if (!options.headers) {
            throw Error('The request has no headers');
        }
        options.headers['Authorization'] = `Bearer ${this.token}`;
    }
    // This handler cannot handle 401
    canHandleAuthentication() {
        return false;
    }
    handleAuthentication() {
        return __awaiter(this, void 0, void 0, function* () {
            throw new Error('not implemented');
        });
    }
}
exports.BearerCredentialHandler = BearerCredentialHandler;
class PersonalAccessTokenCredentialHandler {
    constructor(token) {
        this.token = token;
    }
    // currently implements pre-authorization
    // TODO: support preAuth = false where it hooks on 401
    prepareRequest(options) {
        if (!options.headers) {
            throw Error('The request has no headers');
        }
        options.headers['Authorization'] = `Basic ${Buffer.from(`PAT:${this.token}`).toString('base64')}`;
    }
    // This handler cannot handle 401
    canHandleAuthentication() {
        return false;
    }
    handleAuthentication() {
        return __awaiter(this, void 0, void 0, function* () {
            throw new Error('not implemented');
        });
    }
}
exports.PersonalAccessTokenCredentialHandler = PersonalAccessTokenCredentialHandler;
//# sourceMappingURL=auth.js.map

/***/ }),

/***/ 255:
/***/ (function(__unused_webpack_module, exports, __nccwpck_require__) {

"use strict";

/* eslint-disable @typescript-eslint/no-explicit-any */
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.HttpClient = exports.isHttps = exports.HttpClientResponse = exports.HttpClientError = exports.getProxyUrl = exports.MediaTypes = exports.Headers = exports.HttpCodes = void 0;
const http = __importStar(__nccwpck_require__(685));
const https = __importStar(__nccwpck_require__(687));
const pm = __importStar(__nccwpck_require__(835));
const tunnel = __importStar(__nccwpck_require__(294));
var HttpCodes;
(function (HttpCodes) {
    HttpCodes[HttpCodes["OK"] = 200] = "OK";
    HttpCodes[HttpCodes["MultipleChoices"] = 300] = "MultipleChoices";
    HttpCodes[HttpCodes["MovedPermanently"] = 301] = "MovedPermanently";
    HttpCodes[HttpCodes["ResourceMoved"] = 302] = "ResourceMoved";
    HttpCodes[HttpCodes["SeeOther"] = 303] = "SeeOther";
    HttpCodes[HttpCodes["NotModified"] = 304] = "NotModified";
    HttpCodes[HttpCodes["UseProxy"] = 305] = "UseProxy";
    HttpCodes[HttpCodes["SwitchProxy"] = 306] = "SwitchProxy";
    HttpCodes[HttpCodes["TemporaryRedirect"] = 307] = "TemporaryRedirect";
    HttpCodes[HttpCodes["PermanentRedirect"] = 308] = "PermanentRedirect";
    HttpCodes[HttpCodes["BadRequest"] = 400] = "BadRequest";
    HttpCodes[HttpCodes["Unauthorized"] = 401] = "Unauthorized";
    HttpCodes[HttpCodes["PaymentRequired"] = 402] = "PaymentRequired";
    HttpCodes[HttpCodes["Forbidden"] = 403] = "Forbidden";
    HttpCodes[HttpCodes["NotFound"] = 404] = "NotFound";
    HttpCodes[HttpCodes["MethodNotAllowed"] = 405] = "MethodNotAllowed";
    HttpCodes[HttpCodes["NotAcceptable"] = 406] = "NotAcceptable";
    HttpCodes[HttpCodes["ProxyAuthenticationRequired"] = 407] = "ProxyAuthenticationRequired";
    HttpCodes[HttpCodes["RequestTimeout"] = 408] = "RequestTimeout";
    HttpCodes[HttpCodes["Conflict"] = 409] = "Conflict";
    HttpCodes[HttpCodes["Gone"] = 410] = "Gone";
    HttpCodes[HttpCodes["TooManyRequests"] = 429] = "TooManyRequests";
    HttpCodes[HttpCodes["InternalServerError"] = 500] = "InternalServerError";
    HttpCodes[HttpCodes["NotImplemented"] = 501] = "NotImplemented";
    HttpCodes[HttpCodes["BadGateway"] = 502] = "BadGateway";
    HttpCodes[HttpCodes["ServiceUnavailable"] = 503] = "ServiceUnavailable";
    HttpCodes[HttpCodes["GatewayTimeout"] = 504] = "GatewayTimeout";
})(HttpCodes = exports.HttpCodes || (exports.HttpCodes = {}));
var Headers;
(function (Headers) {
    Headers["Accept"] = "accept";
    Headers["ContentType"] = "content-type";
})(Headers = exports.Headers || (exports.Headers = {}));
var MediaTypes;
(function (MediaTypes) {
    MediaTypes["ApplicationJson"] = "application/json";
})(MediaTypes = exports.MediaTypes || (exports.MediaTypes = {}));
/**
 * Returns the proxy URL, depending upon the supplied url and proxy environment variables.
 * @param serverUrl  The server URL where the request will be sent. For example, https://api.github.com
 */
function getProxyUrl(serverUrl) {
    const proxyUrl = pm.getProxyUrl(new URL(serverUrl));
    return proxyUrl ? proxyUrl.href : '';
}
exports.getProxyUrl = getProxyUrl;
const HttpRedirectCodes = [
    HttpCodes.MovedPermanently,
    HttpCodes.ResourceMoved,
    HttpCodes.SeeOther,
    HttpCodes.TemporaryRedirect,
    HttpCodes.PermanentRedirect
];
const HttpResponseRetryCodes = [
    HttpCodes.BadGateway,
    HttpCodes.ServiceUnavailable,
    HttpCodes.GatewayTimeout
];
const RetryableHttpVerbs = ['OPTIONS', 'GET', 'DELETE', 'HEAD'];
const ExponentialBackoffCeiling = 10;
const ExponentialBackoffTimeSlice = 5;
class HttpClientError extends Error {
    constructor(message, statusCode) {
        super(message);
        this.name = 'HttpClientError';
        this.statusCode = statusCode;
        Object.setPrototypeOf(this, HttpClientError.prototype);
    }
}
exports.HttpClientError = HttpClientError;
class HttpClientResponse {
    constructor(message) {
        this.message = message;
    }
    readBody() {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve) => __awaiter(this, void 0, void 0, function* () {
                let output = Buffer.alloc(0);
                this.message.on('data', (chunk) => {
                    output = Buffer.concat([output, chunk]);
                });
                this.message.on('end', () => {
                    resolve(output.toString());
                });
            }));
        });
    }
}
exports.HttpClientResponse = HttpClientResponse;
function isHttps(requestUrl) {
    const parsedUrl = new URL(requestUrl);
    return parsedUrl.protocol === 'https:';
}
exports.isHttps = isHttps;
class HttpClient {
    constructor(userAgent, handlers, requestOptions) {
        this._ignoreSslError = false;
        this._allowRedirects = true;
        this._allowRedirectDowngrade = false;
        this._maxRedirects = 50;
        this._allowRetries = false;
        this._maxRetries = 1;
        this._keepAlive = false;
        this._disposed = false;
        this.userAgent = userAgent;
        this.handlers = handlers || [];
        this.requestOptions = requestOptions;
        if (requestOptions) {
            if (requestOptions.ignoreSslError != null) {
                this._ignoreSslError = requestOptions.ignoreSslError;
            }
            this._socketTimeout = requestOptions.socketTimeout;
            if (requestOptions.allowRedirects != null) {
                this._allowRedirects = requestOptions.allowRedirects;
            }
            if (requestOptions.allowRedirectDowngrade != null) {
                this._allowRedirectDowngrade = requestOptions.allowRedirectDowngrade;
            }
            if (requestOptions.maxRedirects != null) {
                this._maxRedirects = Math.max(requestOptions.maxRedirects, 0);
            }
            if (requestOptions.keepAlive != null) {
                this._keepAlive = requestOptions.keepAlive;
            }
            if (requestOptions.allowRetries != null) {
                this._allowRetries = requestOptions.allowRetries;
            }
            if (requestOptions.maxRetries != null) {
                this._maxRetries = requestOptions.maxRetries;
            }
        }
    }
    options(requestUrl, additionalHeaders) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.request('OPTIONS', requestUrl, null, additionalHeaders || {});
        });
    }
    get(requestUrl, additionalHeaders) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.request('GET', requestUrl, null, additionalHeaders || {});
        });
    }
    del(requestUrl, additionalHeaders) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.request('DELETE', requestUrl, null, additionalHeaders || {});
        });
    }
    post(requestUrl, data, additionalHeaders) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.request('POST', requestUrl, data, additionalHeaders || {});
        });
    }
    patch(requestUrl, data, additionalHeaders) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.request('PATCH', requestUrl, data, additionalHeaders || {});
        });
    }
    put(requestUrl, data, additionalHeaders) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.request('PUT', requestUrl, data, additionalHeaders || {});
        });
    }
    head(requestUrl, additionalHeaders) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.request('HEAD', requestUrl, null, additionalHeaders || {});
        });
    }
    sendStream(verb, requestUrl, stream, additionalHeaders) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.request(verb, requestUrl, stream, additionalHeaders);
        });
    }
    /**
     * Gets a typed object from an endpoint
     * Be aware that not found returns a null.  Other errors (4xx, 5xx) reject the promise
     */
    getJson(requestUrl, additionalHeaders = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            additionalHeaders[Headers.Accept] = this._getExistingOrDefaultHeader(additionalHeaders, Headers.Accept, MediaTypes.ApplicationJson);
            const res = yield this.get(requestUrl, additionalHeaders);
            return this._processResponse(res, this.requestOptions);
        });
    }
    postJson(requestUrl, obj, additionalHeaders = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = JSON.stringify(obj, null, 2);
            additionalHeaders[Headers.Accept] = this._getExistingOrDefaultHeader(additionalHeaders, Headers.Accept, MediaTypes.ApplicationJson);
            additionalHeaders[Headers.ContentType] = this._getExistingOrDefaultHeader(additionalHeaders, Headers.ContentType, MediaTypes.ApplicationJson);
            const res = yield this.post(requestUrl, data, additionalHeaders);
            return this._processResponse(res, this.requestOptions);
        });
    }
    putJson(requestUrl, obj, additionalHeaders = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = JSON.stringify(obj, null, 2);
            additionalHeaders[Headers.Accept] = this._getExistingOrDefaultHeader(additionalHeaders, Headers.Accept, MediaTypes.ApplicationJson);
            additionalHeaders[Headers.ContentType] = this._getExistingOrDefaultHeader(additionalHeaders, Headers.ContentType, MediaTypes.ApplicationJson);
            const res = yield this.put(requestUrl, data, additionalHeaders);
            return this._processResponse(res, this.requestOptions);
        });
    }
    patchJson(requestUrl, obj, additionalHeaders = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = JSON.stringify(obj, null, 2);
            additionalHeaders[Headers.Accept] = this._getExistingOrDefaultHeader(additionalHeaders, Headers.Accept, MediaTypes.ApplicationJson);
            additionalHeaders[Headers.ContentType] = this._getExistingOrDefaultHeader(additionalHeaders, Headers.ContentType, MediaTypes.ApplicationJson);
            const res = yield this.patch(requestUrl, data, additionalHeaders);
            return this._processResponse(res, this.requestOptions);
        });
    }
    /**
     * Makes a raw http request.
     * All other methods such as get, post, patch, and request ultimately call this.
     * Prefer get, del, post and patch
     */
    request(verb, requestUrl, data, headers) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this._disposed) {
                throw new Error('Client has already been disposed.');
            }
            const parsedUrl = new URL(requestUrl);
            let info = this._prepareRequest(verb, parsedUrl, headers);
            // Only perform retries on reads since writes may not be idempotent.
            const maxTries = this._allowRetries && RetryableHttpVerbs.includes(verb)
                ? this._maxRetries + 1
                : 1;
            let numTries = 0;
            let response;
            do {
                response = yield this.requestRaw(info, data);
                // Check if it's an authentication challenge
                if (response &&
                    response.message &&
                    response.message.statusCode === HttpCodes.Unauthorized) {
                    let authenticationHandler;
                    for (const handler of this.handlers) {
                        if (handler.canHandleAuthentication(response)) {
                            authenticationHandler = handler;
                            break;
                        }
                    }
                    if (authenticationHandler) {
                        return authenticationHandler.handleAuthentication(this, info, data);
                    }
                    else {
                        // We have received an unauthorized response but have no handlers to handle it.
                        // Let the response return to the caller.
                        return response;
                    }
                }
                let redirectsRemaining = this._maxRedirects;
                while (response.message.statusCode &&
                    HttpRedirectCodes.includes(response.message.statusCode) &&
                    this._allowRedirects &&
                    redirectsRemaining > 0) {
                    const redirectUrl = response.message.headers['location'];
                    if (!redirectUrl) {
                        // if there's no location to redirect to, we won't
                        break;
                    }
                    const parsedRedirectUrl = new URL(redirectUrl);
                    if (parsedUrl.protocol === 'https:' &&
                        parsedUrl.protocol !== parsedRedirectUrl.protocol &&
                        !this._allowRedirectDowngrade) {
                        throw new Error('Redirect from HTTPS to HTTP protocol. This downgrade is not allowed for security reasons. If you want to allow this behavior, set the allowRedirectDowngrade option to true.');
                    }
                    // we need to finish reading the response before reassigning response
                    // which will leak the open socket.
                    yield response.readBody();
                    // strip authorization header if redirected to a different hostname
                    if (parsedRedirectUrl.hostname !== parsedUrl.hostname) {
                        for (const header in headers) {
                            // header names are case insensitive
                            if (header.toLowerCase() === 'authorization') {
                                delete headers[header];
                            }
                        }
                    }
                    // let's make the request with the new redirectUrl
                    info = this._prepareRequest(verb, parsedRedirectUrl, headers);
                    response = yield this.requestRaw(info, data);
                    redirectsRemaining--;
                }
                if (!response.message.statusCode ||
                    !HttpResponseRetryCodes.includes(response.message.statusCode)) {
                    // If not a retry code, return immediately instead of retrying
                    return response;
                }
                numTries += 1;
                if (numTries < maxTries) {
                    yield response.readBody();
                    yield this._performExponentialBackoff(numTries);
                }
            } while (numTries < maxTries);
            return response;
        });
    }
    /**
     * Needs to be called if keepAlive is set to true in request options.
     */
    dispose() {
        if (this._agent) {
            this._agent.destroy();
        }
        this._disposed = true;
    }
    /**
     * Raw request.
     * @param info
     * @param data
     */
    requestRaw(info, data) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                function callbackForResult(err, res) {
                    if (err) {
                        reject(err);
                    }
                    else if (!res) {
                        // If `err` is not passed, then `res` must be passed.
                        reject(new Error('Unknown error'));
                    }
                    else {
                        resolve(res);
                    }
                }
                this.requestRawWithCallback(info, data, callbackForResult);
            });
        });
    }
    /**
     * Raw request with callback.
     * @param info
     * @param data
     * @param onResult
     */
    requestRawWithCallback(info, data, onResult) {
        if (typeof data === 'string') {
            if (!info.options.headers) {
                info.options.headers = {};
            }
            info.options.headers['Content-Length'] = Buffer.byteLength(data, 'utf8');
        }
        let callbackCalled = false;
        function handleResult(err, res) {
            if (!callbackCalled) {
                callbackCalled = true;
                onResult(err, res);
            }
        }
        const req = info.httpModule.request(info.options, (msg) => {
            const res = new HttpClientResponse(msg);
            handleResult(undefined, res);
        });
        let socket;
        req.on('socket', sock => {
            socket = sock;
        });
        // If we ever get disconnected, we want the socket to timeout eventually
        req.setTimeout(this._socketTimeout || 3 * 60000, () => {
            if (socket) {
                socket.end();
            }
            handleResult(new Error(`Request timeout: ${info.options.path}`));
        });
        req.on('error', function (err) {
            // err has statusCode property
            // res should have headers
            handleResult(err);
        });
        if (data && typeof data === 'string') {
            req.write(data, 'utf8');
        }
        if (data && typeof data !== 'string') {
            data.on('close', function () {
                req.end();
            });
            data.pipe(req);
        }
        else {
            req.end();
        }
    }
    /**
     * Gets an http agent. This function is useful when you need an http agent that handles
     * routing through a proxy server - depending upon the url and proxy environment variables.
     * @param serverUrl  The server URL where the request will be sent. For example, https://api.github.com
     */
    getAgent(serverUrl) {
        const parsedUrl = new URL(serverUrl);
        return this._getAgent(parsedUrl);
    }
    _prepareRequest(method, requestUrl, headers) {
        const info = {};
        info.parsedUrl = requestUrl;
        const usingSsl = info.parsedUrl.protocol === 'https:';
        info.httpModule = usingSsl ? https : http;
        const defaultPort = usingSsl ? 443 : 80;
        info.options = {};
        info.options.host = info.parsedUrl.hostname;
        info.options.port = info.parsedUrl.port
            ? parseInt(info.parsedUrl.port)
            : defaultPort;
        info.options.path =
            (info.parsedUrl.pathname || '') + (info.parsedUrl.search || '');
        info.options.method = method;
        info.options.headers = this._mergeHeaders(headers);
        if (this.userAgent != null) {
            info.options.headers['user-agent'] = this.userAgent;
        }
        info.options.agent = this._getAgent(info.parsedUrl);
        // gives handlers an opportunity to participate
        if (this.handlers) {
            for (const handler of this.handlers) {
                handler.prepareRequest(info.options);
            }
        }
        return info;
    }
    _mergeHeaders(headers) {
        if (this.requestOptions && this.requestOptions.headers) {
            return Object.assign({}, lowercaseKeys(this.requestOptions.headers), lowercaseKeys(headers || {}));
        }
        return lowercaseKeys(headers || {});
    }
    _getExistingOrDefaultHeader(additionalHeaders, header, _default) {
        let clientHeader;
        if (this.requestOptions && this.requestOptions.headers) {
            clientHeader = lowercaseKeys(this.requestOptions.headers)[header];
        }
        return additionalHeaders[header] || clientHeader || _default;
    }
    _getAgent(parsedUrl) {
        let agent;
        const proxyUrl = pm.getProxyUrl(parsedUrl);
        const useProxy = proxyUrl && proxyUrl.hostname;
        if (this._keepAlive && useProxy) {
            agent = this._proxyAgent;
        }
        if (this._keepAlive && !useProxy) {
            agent = this._agent;
        }
        // if agent is already assigned use that agent.
        if (agent) {
            return agent;
        }
        const usingSsl = parsedUrl.protocol === 'https:';
        let maxSockets = 100;
        if (this.requestOptions) {
            maxSockets = this.requestOptions.maxSockets || http.globalAgent.maxSockets;
        }
        // This is `useProxy` again, but we need to check `proxyURl` directly for TypeScripts's flow analysis.
        if (proxyUrl && proxyUrl.hostname) {
            const agentOptions = {
                maxSockets,
                keepAlive: this._keepAlive,
                proxy: Object.assign(Object.assign({}, ((proxyUrl.username || proxyUrl.password) && {
                    proxyAuth: `${proxyUrl.username}:${proxyUrl.password}`
                })), { host: proxyUrl.hostname, port: proxyUrl.port })
            };
            let tunnelAgent;
            const overHttps = proxyUrl.protocol === 'https:';
            if (usingSsl) {
                tunnelAgent = overHttps ? tunnel.httpsOverHttps : tunnel.httpsOverHttp;
            }
            else {
                tunnelAgent = overHttps ? tunnel.httpOverHttps : tunnel.httpOverHttp;
            }
            agent = tunnelAgent(agentOptions);
            this._proxyAgent = agent;
        }
        // if reusing agent across request and tunneling agent isn't assigned create a new agent
        if (this._keepAlive && !agent) {
            const options = { keepAlive: this._keepAlive, maxSockets };
            agent = usingSsl ? new https.Agent(options) : new http.Agent(options);
            this._agent = agent;
        }
        // if not using private agent and tunnel agent isn't setup then use global agent
        if (!agent) {
            agent = usingSsl ? https.globalAgent : http.globalAgent;
        }
        if (usingSsl && this._ignoreSslError) {
            // we don't want to set NODE_TLS_REJECT_UNAUTHORIZED=0 since that will affect request for entire process
            // http.RequestOptions doesn't expose a way to modify RequestOptions.agent.options
            // we have to cast it to any and change it directly
            agent.options = Object.assign(agent.options || {}, {
                rejectUnauthorized: false
            });
        }
        return agent;
    }
    _performExponentialBackoff(retryNumber) {
        return __awaiter(this, void 0, void 0, function* () {
            retryNumber = Math.min(ExponentialBackoffCeiling, retryNumber);
            const ms = ExponentialBackoffTimeSlice * Math.pow(2, retryNumber);
            return new Promise(resolve => setTimeout(() => resolve(), ms));
        });
    }
    _processResponse(res, options) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                const statusCode = res.message.statusCode || 0;
                const response = {
                    statusCode,
                    result: null,
                    headers: {}
                };
                // not found leads to null obj returned
                if (statusCode === HttpCodes.NotFound) {
                    resolve(response);
                }
                // get the result from the body
                function dateTimeDeserializer(key, value) {
                    if (typeof value === 'string') {
                        const a = new Date(value);
                        if (!isNaN(a.valueOf())) {
                            return a;
                        }
                    }
                    return value;
                }
                let obj;
                let contents;
                try {
                    contents = yield res.readBody();
                    if (contents && contents.length > 0) {
                        if (options && options.deserializeDates) {
                            obj = JSON.parse(contents, dateTimeDeserializer);
                        }
                        else {
                            obj = JSON.parse(contents);
                        }
                        response.result = obj;
                    }
                    response.headers = res.message.headers;
                }
                catch (err) {
                    // Invalid resource (contents not json);  leaving result obj null
                }
                // note that 3xx redirects are handled by the http layer.
                if (statusCode > 299) {
                    let msg;
                    // if exception/error in body, attempt to get better error
                    if (obj && obj.message) {
                        msg = obj.message;
                    }
                    else if (contents && contents.length > 0) {
                        // it may be the case that the exception is in the body message as string
                        msg = contents;
                    }
                    else {
                        msg = `Failed request: (${statusCode})`;
                    }
                    const err = new HttpClientError(msg, statusCode);
                    err.result = response.result;
                    reject(err);
                }
                else {
                    resolve(response);
                }
            }));
        });
    }
}
exports.HttpClient = HttpClient;
const lowercaseKeys = (obj) => Object.keys(obj).reduce((c, k) => ((c[k.toLowerCase()] = obj[k]), c), {});
//# sourceMappingURL=index.js.map

/***/ }),

/***/ 835:
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.checkBypass = exports.getProxyUrl = void 0;
function getProxyUrl(reqUrl) {
    const usingSsl = reqUrl.protocol === 'https:';
    if (checkBypass(reqUrl)) {
        return undefined;
    }
    const proxyVar = (() => {
        if (usingSsl) {
            return process.env['https_proxy'] || process.env['HTTPS_PROXY'];
        }
        else {
            return process.env['http_proxy'] || process.env['HTTP_PROXY'];
        }
    })();
    if (proxyVar) {
        return new URL(proxyVar);
    }
    else {
        return undefined;
    }
}
exports.getProxyUrl = getProxyUrl;
function checkBypass(reqUrl) {
    if (!reqUrl.hostname) {
        return false;
    }
    const reqHost = reqUrl.hostname;
    if (isLoopbackAddress(reqHost)) {
        return true;
    }
    const noProxy = process.env['no_proxy'] || process.env['NO_PROXY'] || '';
    if (!noProxy) {
        return false;
    }
    // Determine the request port
    let reqPort;
    if (reqUrl.port) {
        reqPort = Number(reqUrl.port);
    }
    else if (reqUrl.protocol === 'http:') {
        reqPort = 80;
    }
    else if (reqUrl.protocol === 'https:') {
        reqPort = 443;
    }
    // Format the request hostname and hostname with port
    const upperReqHosts = [reqUrl.hostname.toUpperCase()];
    if (typeof reqPort === 'number') {
        upperReqHosts.push(`${upperReqHosts[0]}:${reqPort}`);
    }
    // Compare request host against noproxy
    for (const upperNoProxyItem of noProxy
        .split(',')
        .map(x => x.trim().toUpperCase())
        .filter(x => x)) {
        if (upperNoProxyItem === '*' ||
            upperReqHosts.some(x => x === upperNoProxyItem ||
                x.endsWith(`.${upperNoProxyItem}`) ||
                (upperNoProxyItem.startsWith('.') &&
                    x.endsWith(`${upperNoProxyItem}`)))) {
            return true;
        }
    }
    return false;
}
exports.checkBypass = checkBypass;
function isLoopbackAddress(host) {
    const hostLower = host.toLowerCase();
    return (hostLower === 'localhost' ||
        hostLower.startsWith('127.') ||
        hostLower.startsWith('[::1]') ||
        hostLower.startsWith('[0:0:0:0:0:0:0:1]'));
}
//# sourceMappingURL=proxy.js.map

/***/ }),

/***/ 814:
/***/ ((module) => {

"use strict";

var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
var __objRest = (source, exclude) => {
  var target = {};
  for (var prop in source)
    if (__hasOwnProp.call(source, prop) && exclude.indexOf(prop) < 0)
      target[prop] = source[prop];
  if (source != null && __getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(source)) {
      if (exclude.indexOf(prop) < 0 && __propIsEnum.call(source, prop))
        target[prop] = source[prop];
    }
  return target;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var src_exports = {};
__export(src_exports, {
  Api: () => Api,
  ContentType: () => ContentType,
  HttpClient: () => HttpClient,
  giteaApi: () => giteaApi
});
module.exports = __toCommonJS(src_exports);

// src/api.ts
var ContentType = /* @__PURE__ */ ((ContentType2) => {
  ContentType2["Json"] = "application/json";
  ContentType2["FormData"] = "multipart/form-data";
  ContentType2["UrlEncoded"] = "application/x-www-form-urlencoded";
  ContentType2["Text"] = "text/plain";
  return ContentType2;
})(ContentType || {});
var HttpClient = class {
  constructor(apiConfig = {}) {
    this.baseUrl = "/api/v1";
    this.securityData = null;
    this.abortControllers = /* @__PURE__ */ new Map();
    this.customFetch = (...fetchParams) => fetch(...fetchParams);
    this.baseApiParams = {
      credentials: "same-origin",
      headers: {},
      redirect: "follow",
      referrerPolicy: "no-referrer"
    };
    this.setSecurityData = (data) => {
      this.securityData = data;
    };
    this.contentFormatters = {
      ["application/json" /* Json */]: (input) => input !== null && (typeof input === "object" || typeof input === "string") ? JSON.stringify(input) : input,
      ["text/plain" /* Text */]: (input) => input !== null && typeof input !== "string" ? JSON.stringify(input) : input,
      ["multipart/form-data" /* FormData */]: (input) => Object.keys(input || {}).reduce((formData, key) => {
        const property = input[key];
        formData.append(
          key,
          property instanceof Blob ? property : typeof property === "object" && property !== null ? JSON.stringify(property) : `${property}`
        );
        return formData;
      }, new FormData()),
      ["application/x-www-form-urlencoded" /* UrlEncoded */]: (input) => this.toQueryString(input)
    };
    this.createAbortSignal = (cancelToken) => {
      if (this.abortControllers.has(cancelToken)) {
        const abortController2 = this.abortControllers.get(cancelToken);
        if (abortController2) {
          return abortController2.signal;
        }
        return void 0;
      }
      const abortController = new AbortController();
      this.abortControllers.set(cancelToken, abortController);
      return abortController.signal;
    };
    this.abortRequest = (cancelToken) => {
      const abortController = this.abortControllers.get(cancelToken);
      if (abortController) {
        abortController.abort();
        this.abortControllers.delete(cancelToken);
      }
    };
    this.request = async (_a) => {
      var _b = _a, {
        body,
        secure,
        path,
        type,
        query,
        format,
        baseUrl,
        cancelToken
      } = _b, params = __objRest(_b, [
        "body",
        "secure",
        "path",
        "type",
        "query",
        "format",
        "baseUrl",
        "cancelToken"
      ]);
      const secureParams = (typeof secure === "boolean" ? secure : this.baseApiParams.secure) && this.securityWorker && await this.securityWorker(this.securityData) || {};
      const requestParams = this.mergeRequestParams(params, secureParams);
      const queryString = query && this.toQueryString(query);
      const payloadFormatter = this.contentFormatters[type || "application/json" /* Json */];
      const responseFormat = format || requestParams.format;
      return this.customFetch(`${baseUrl || this.baseUrl || ""}${path}${queryString ? `?${queryString}` : ""}`, __spreadProps(__spreadValues({}, requestParams), {
        headers: __spreadValues(__spreadValues({}, requestParams.headers || {}), type && type !== "multipart/form-data" /* FormData */ ? { "Content-Type": type } : {}),
        signal: (cancelToken ? this.createAbortSignal(cancelToken) : requestParams.signal) || null,
        body: typeof body === "undefined" || body === null ? null : payloadFormatter(body)
      })).then(async (response) => {
        const r = response;
        r.data = null;
        r.error = null;
        const data = !responseFormat ? r : await response[responseFormat]().then((data2) => {
          if (r.ok) {
            r.data = data2;
          } else {
            r.error = data2;
          }
          return r;
        }).catch((e) => {
          r.error = e;
          return r;
        });
        if (cancelToken) {
          this.abortControllers.delete(cancelToken);
        }
        if (!response.ok)
          throw data;
        return data;
      });
    };
    Object.assign(this, apiConfig);
  }
  encodeQueryParam(key, value) {
    const encodedKey = encodeURIComponent(key);
    return `${encodedKey}=${encodeURIComponent(typeof value === "number" ? value : `${value}`)}`;
  }
  addQueryParam(query, key) {
    return this.encodeQueryParam(key, query[key]);
  }
  addArrayQueryParam(query, key) {
    const value = query[key];
    return value.map((v) => this.encodeQueryParam(key, v)).join("&");
  }
  toQueryString(rawQuery) {
    const query = rawQuery || {};
    const keys = Object.keys(query).filter((key) => "undefined" !== typeof query[key]);
    return keys.map((key) => Array.isArray(query[key]) ? this.addArrayQueryParam(query, key) : this.addQueryParam(query, key)).join("&");
  }
  addQueryParams(rawQuery) {
    const queryString = this.toQueryString(rawQuery);
    return queryString ? `?${queryString}` : "";
  }
  mergeRequestParams(params1, params2) {
    return __spreadProps(__spreadValues(__spreadValues(__spreadValues({}, this.baseApiParams), params1), params2 || {}), {
      headers: __spreadValues(__spreadValues(__spreadValues({}, this.baseApiParams.headers || {}), params1.headers || {}), params2 && params2.headers || {})
    });
  }
};
var Api = class extends HttpClient {
  constructor() {
    super(...arguments);
    this.activitypub = {
      /**
       * No description
       *
       * @tags activitypub
       * @name ActivitypubPerson
       * @summary Returns the Person actor for a user
       * @request GET:/activitypub/user-id/{user-id}
       * @secure
       */
      activitypubPerson: (userId, params = {}) => this.request(__spreadValues({
        path: `/activitypub/user-id/${userId}`,
        method: "GET",
        secure: true
      }, params)),
      /**
       * No description
       *
       * @tags activitypub
       * @name ActivitypubPersonInbox
       * @summary Send to the inbox
       * @request POST:/activitypub/user-id/{user-id}/inbox
       * @secure
       */
      activitypubPersonInbox: (userId, params = {}) => this.request(__spreadValues({
        path: `/activitypub/user-id/${userId}/inbox`,
        method: "POST",
        secure: true
      }, params))
    };
    this.admin = {
      /**
       * No description
       *
       * @tags admin
       * @name AdminCronList
       * @summary List cron tasks
       * @request GET:/admin/cron
       * @secure
       */
      adminCronList: (query, params = {}) => this.request(__spreadValues({
        path: `/admin/cron`,
        method: "GET",
        query,
        secure: true
      }, params)),
      /**
       * No description
       *
       * @tags admin
       * @name AdminCronRun
       * @summary Run cron task
       * @request POST:/admin/cron/{task}
       * @secure
       */
      adminCronRun: (task, params = {}) => this.request(__spreadValues({
        path: `/admin/cron/${task}`,
        method: "POST",
        secure: true
      }, params)),
      /**
       * No description
       *
       * @tags admin
       * @name AdminGetAllEmails
       * @summary List all emails
       * @request GET:/admin/emails
       * @secure
       */
      adminGetAllEmails: (query, params = {}) => this.request(__spreadValues({
        path: `/admin/emails`,
        method: "GET",
        query,
        secure: true
      }, params)),
      /**
       * No description
       *
       * @tags admin
       * @name AdminSearchEmails
       * @summary Search all emails
       * @request GET:/admin/emails/search
       * @secure
       */
      adminSearchEmails: (query, params = {}) => this.request(__spreadValues({
        path: `/admin/emails/search`,
        method: "GET",
        query,
        secure: true
      }, params)),
      /**
       * No description
       *
       * @tags admin
       * @name AdminListHooks
       * @summary List system's webhooks
       * @request GET:/admin/hooks
       * @secure
       */
      adminListHooks: (query, params = {}) => this.request(__spreadValues({
        path: `/admin/hooks`,
        method: "GET",
        query,
        secure: true
      }, params)),
      /**
       * No description
       *
       * @tags admin
       * @name AdminCreateHook
       * @summary Create a hook
       * @request POST:/admin/hooks
       * @secure
       */
      adminCreateHook: (body, params = {}) => this.request(__spreadValues({
        path: `/admin/hooks`,
        method: "POST",
        body,
        secure: true,
        type: "application/json" /* Json */
      }, params)),
      /**
       * No description
       *
       * @tags admin
       * @name AdminGetHook
       * @summary Get a hook
       * @request GET:/admin/hooks/{id}
       * @secure
       */
      adminGetHook: (id, params = {}) => this.request(__spreadValues({
        path: `/admin/hooks/${id}`,
        method: "GET",
        secure: true
      }, params)),
      /**
       * No description
       *
       * @tags admin
       * @name AdminDeleteHook
       * @summary Delete a hook
       * @request DELETE:/admin/hooks/{id}
       * @secure
       */
      adminDeleteHook: (id, params = {}) => this.request(__spreadValues({
        path: `/admin/hooks/${id}`,
        method: "DELETE",
        secure: true
      }, params)),
      /**
       * No description
       *
       * @tags admin
       * @name AdminEditHook
       * @summary Update a hook
       * @request PATCH:/admin/hooks/{id}
       * @secure
       */
      adminEditHook: (id, body, params = {}) => this.request(__spreadValues({
        path: `/admin/hooks/${id}`,
        method: "PATCH",
        body,
        secure: true,
        type: "application/json" /* Json */
      }, params)),
      /**
       * No description
       *
       * @tags admin
       * @name AdminGetAllOrgs
       * @summary List all organizations
       * @request GET:/admin/orgs
       * @secure
       */
      adminGetAllOrgs: (query, params = {}) => this.request(__spreadValues({
        path: `/admin/orgs`,
        method: "GET",
        query,
        secure: true
      }, params)),
      /**
       * No description
       *
       * @tags admin
       * @name AdminGetRunnerRegistrationToken
       * @summary Get an global actions runner registration token
       * @request GET:/admin/runners/registration-token
       * @secure
       */
      adminGetRunnerRegistrationToken: (params = {}) => this.request(__spreadValues({
        path: `/admin/runners/registration-token`,
        method: "GET",
        secure: true
      }, params)),
      /**
       * No description
       *
       * @tags admin
       * @name AdminUnadoptedList
       * @summary List unadopted repositories
       * @request GET:/admin/unadopted
       * @secure
       */
      adminUnadoptedList: (query, params = {}) => this.request(__spreadValues({
        path: `/admin/unadopted`,
        method: "GET",
        query,
        secure: true
      }, params)),
      /**
       * No description
       *
       * @tags admin
       * @name AdminAdoptRepository
       * @summary Adopt unadopted files as a repository
       * @request POST:/admin/unadopted/{owner}/{repo}
       * @secure
       */
      adminAdoptRepository: (owner, repo, params = {}) => this.request(__spreadValues({
        path: `/admin/unadopted/${owner}/${repo}`,
        method: "POST",
        secure: true
      }, params)),
      /**
       * No description
       *
       * @tags admin
       * @name AdminDeleteUnadoptedRepository
       * @summary Delete unadopted files
       * @request DELETE:/admin/unadopted/{owner}/{repo}
       * @secure
       */
      adminDeleteUnadoptedRepository: (owner, repo, params = {}) => this.request(__spreadValues({
        path: `/admin/unadopted/${owner}/${repo}`,
        method: "DELETE",
        secure: true
      }, params)),
      /**
       * No description
       *
       * @tags admin
       * @name AdminSearchUsers
       * @summary Search users according filter conditions
       * @request GET:/admin/users
       * @secure
       */
      adminSearchUsers: (query, params = {}) => this.request(__spreadValues({
        path: `/admin/users`,
        method: "GET",
        query,
        secure: true
      }, params)),
      /**
       * No description
       *
       * @tags admin
       * @name AdminCreateUser
       * @summary Create a user
       * @request POST:/admin/users
       * @secure
       */
      adminCreateUser: (body, params = {}) => this.request(__spreadValues({
        path: `/admin/users`,
        method: "POST",
        body,
        secure: true,
        type: "application/json" /* Json */
      }, params)),
      /**
       * No description
       *
       * @tags admin
       * @name AdminDeleteUser
       * @summary Delete a user
       * @request DELETE:/admin/users/{username}
       * @secure
       */
      adminDeleteUser: (username, query, params = {}) => this.request(__spreadValues({
        path: `/admin/users/${username}`,
        method: "DELETE",
        query,
        secure: true
      }, params)),
      /**
       * No description
       *
       * @tags admin
       * @name AdminEditUser
       * @summary Edit an existing user
       * @request PATCH:/admin/users/{username}
       * @secure
       */
      adminEditUser: (username, body, params = {}) => this.request(__spreadValues({
        path: `/admin/users/${username}`,
        method: "PATCH",
        body,
        secure: true,
        type: "application/json" /* Json */
      }, params)),
      /**
       * No description
       *
       * @tags admin
       * @name AdminListUserBadges
       * @summary List a user's badges
       * @request GET:/admin/users/{username}/badges
       * @secure
       */
      adminListUserBadges: (username, params = {}) => this.request(__spreadValues({
        path: `/admin/users/${username}/badges`,
        method: "GET",
        secure: true
      }, params)),
      /**
       * No description
       *
       * @tags admin
       * @name AdminAddUserBadges
       * @summary Add a badge to a user
       * @request POST:/admin/users/{username}/badges
       * @secure
       */
      adminAddUserBadges: (username, body, params = {}) => this.request(__spreadValues({
        path: `/admin/users/${username}/badges`,
        method: "POST",
        body,
        secure: true,
        type: "application/json" /* Json */
      }, params)),
      /**
       * No description
       *
       * @tags admin
       * @name AdminDeleteUserBadges
       * @summary Remove a badge from a user
       * @request DELETE:/admin/users/{username}/badges
       * @secure
       */
      adminDeleteUserBadges: (username, body, params = {}) => this.request(__spreadValues({
        path: `/admin/users/${username}/badges`,
        method: "DELETE",
        body,
        secure: true,
        type: "application/json" /* Json */
      }, params)),
      /**
       * No description
       *
       * @tags admin
       * @name AdminCreatePublicKey
       * @summary Add a public key on behalf of a user
       * @request POST:/admin/users/{username}/keys
       * @secure
       */
      adminCreatePublicKey: (username, key, params = {}) => this.request(__spreadValues({
        path: `/admin/users/${username}/keys`,
        method: "POST",
        body: key,
        secure: true,
        type: "application/json" /* Json */
      }, params)),
      /**
       * No description
       *
       * @tags admin
       * @name AdminDeleteUserPublicKey
       * @summary Delete a user's public key
       * @request DELETE:/admin/users/{username}/keys/{id}
       * @secure
       */
      adminDeleteUserPublicKey: (username, id, params = {}) => this.request(__spreadValues({
        path: `/admin/users/${username}/keys/${id}`,
        method: "DELETE",
        secure: true
      }, params)),
      /**
       * No description
       *
       * @tags admin
       * @name AdminCreateOrg
       * @summary Create an organization
       * @request POST:/admin/users/{username}/orgs
       * @secure
       */
      adminCreateOrg: (username, organization, params = {}) => this.request(__spreadValues({
        path: `/admin/users/${username}/orgs`,
        method: "POST",
        body: organization,
        secure: true,
        type: "application/json" /* Json */
      }, params)),
      /**
       * No description
       *
       * @tags admin
       * @name AdminRenameUser
       * @summary Rename a user
       * @request POST:/admin/users/{username}/rename
       * @secure
       */
      adminRenameUser: (username, body, params = {}) => this.request(__spreadValues({
        path: `/admin/users/${username}/rename`,
        method: "POST",
        body,
        secure: true,
        type: "application/json" /* Json */
      }, params)),
      /**
       * No description
       *
       * @tags admin
       * @name AdminCreateRepo
       * @summary Create a repository on behalf of a user
       * @request POST:/admin/users/{username}/repos
       * @secure
       */
      adminCreateRepo: (username, repository, params = {}) => this.request(__spreadValues({
        path: `/admin/users/${username}/repos`,
        method: "POST",
        body: repository,
        secure: true,
        type: "application/json" /* Json */
      }, params))
    };
    this.gitignore = {
      /**
       * No description
       *
       * @tags miscellaneous
       * @name ListGitignoresTemplates
       * @summary Returns a list of all gitignore templates
       * @request GET:/gitignore/templates
       * @secure
       */
      listGitignoresTemplates: (params = {}) => this.request(__spreadValues({
        path: `/gitignore/templates`,
        method: "GET",
        secure: true
      }, params)),
      /**
       * No description
       *
       * @tags miscellaneous
       * @name GetGitignoreTemplateInfo
       * @summary Returns information about a gitignore template
       * @request GET:/gitignore/templates/{name}
       * @secure
       */
      getGitignoreTemplateInfo: (name, params = {}) => this.request(__spreadValues({
        path: `/gitignore/templates/${name}`,
        method: "GET",
        secure: true
      }, params))
    };
    this.label = {
      /**
       * No description
       *
       * @tags miscellaneous
       * @name ListLabelTemplates
       * @summary Returns a list of all label templates
       * @request GET:/label/templates
       * @secure
       */
      listLabelTemplates: (params = {}) => this.request(__spreadValues({
        path: `/label/templates`,
        method: "GET",
        secure: true
      }, params)),
      /**
       * No description
       *
       * @tags miscellaneous
       * @name GetLabelTemplateInfo
       * @summary Returns all labels in a template
       * @request GET:/label/templates/{name}
       * @secure
       */
      getLabelTemplateInfo: (name, params = {}) => this.request(__spreadValues({
        path: `/label/templates/${name}`,
        method: "GET",
        secure: true
      }, params))
    };
    this.licenses = {
      /**
       * No description
       *
       * @tags miscellaneous
       * @name ListLicenseTemplates
       * @summary Returns a list of all license templates
       * @request GET:/licenses
       * @secure
       */
      listLicenseTemplates: (params = {}) => this.request(__spreadValues({
        path: `/licenses`,
        method: "GET",
        secure: true
      }, params)),
      /**
       * No description
       *
       * @tags miscellaneous
       * @name GetLicenseTemplateInfo
       * @summary Returns information about a license template
       * @request GET:/licenses/{name}
       * @secure
       */
      getLicenseTemplateInfo: (name, params = {}) => this.request(__spreadValues({
        path: `/licenses/${name}`,
        method: "GET",
        secure: true
      }, params))
    };
    this.markdown = {
      /**
       * No description
       *
       * @tags miscellaneous
       * @name RenderMarkdown
       * @summary Render a markdown document as HTML
       * @request POST:/markdown
       * @secure
       */
      renderMarkdown: (body, params = {}) => this.request(__spreadValues({
        path: `/markdown`,
        method: "POST",
        body,
        secure: true,
        type: "application/json" /* Json */
      }, params)),
      /**
       * No description
       *
       * @tags miscellaneous
       * @name RenderMarkdownRaw
       * @summary Render raw markdown as HTML
       * @request POST:/markdown/raw
       * @secure
       */
      renderMarkdownRaw: (body, params = {}) => this.request(__spreadValues({
        path: `/markdown/raw`,
        method: "POST",
        body,
        secure: true,
        type: "text/plain" /* Text */
      }, params))
    };
    this.markup = {
      /**
       * No description
       *
       * @tags miscellaneous
       * @name RenderMarkup
       * @summary Render a markup document as HTML
       * @request POST:/markup
       * @secure
       */
      renderMarkup: (body, params = {}) => this.request(__spreadValues({
        path: `/markup`,
        method: "POST",
        body,
        secure: true,
        type: "application/json" /* Json */
      }, params))
    };
    this.nodeinfo = {
      /**
       * No description
       *
       * @tags miscellaneous
       * @name GetNodeInfo
       * @summary Returns the nodeinfo of the Gitea application
       * @request GET:/nodeinfo
       * @secure
       */
      getNodeInfo: (params = {}) => this.request(__spreadValues({
        path: `/nodeinfo`,
        method: "GET",
        secure: true
      }, params))
    };
    this.notifications = {
      /**
       * No description
       *
       * @tags notification
       * @name NotifyGetList
       * @summary List users's notification threads
       * @request GET:/notifications
       * @secure
       */
      notifyGetList: (query, params = {}) => this.request(__spreadValues({
        path: `/notifications`,
        method: "GET",
        query,
        secure: true,
        type: "application/json" /* Json */
      }, params)),
      /**
       * No description
       *
       * @tags notification
       * @name NotifyReadList
       * @summary Mark notification threads as read, pinned or unread
       * @request PUT:/notifications
       * @secure
       */
      notifyReadList: (query, params = {}) => this.request(__spreadValues({
        path: `/notifications`,
        method: "PUT",
        query,
        secure: true,
        type: "application/json" /* Json */
      }, params)),
      /**
       * No description
       *
       * @tags notification
       * @name NotifyNewAvailable
       * @summary Check if unread notifications exist
       * @request GET:/notifications/new
       * @secure
       */
      notifyNewAvailable: (params = {}) => this.request(__spreadValues({
        path: `/notifications/new`,
        method: "GET",
        secure: true
      }, params)),
      /**
       * No description
       *
       * @tags notification
       * @name NotifyGetThread
       * @summary Get notification thread by ID
       * @request GET:/notifications/threads/{id}
       * @secure
       */
      notifyGetThread: (id, params = {}) => this.request(__spreadValues({
        path: `/notifications/threads/${id}`,
        method: "GET",
        secure: true,
        type: "application/json" /* Json */
      }, params)),
      /**
       * No description
       *
       * @tags notification
       * @name NotifyReadThread
       * @summary Mark notification thread as read by ID
       * @request PATCH:/notifications/threads/{id}
       * @secure
       */
      notifyReadThread: (id, query, params = {}) => this.request(__spreadValues({
        path: `/notifications/threads/${id}`,
        method: "PATCH",
        query,
        secure: true,
        type: "application/json" /* Json */
      }, params))
    };
    this.org = {
      /**
       * No description
       *
       * @tags organization
       * @name CreateOrgRepoDeprecated
       * @summary Create a repository in an organization
       * @request POST:/org/{org}/repos
       * @deprecated
       * @secure
       */
      createOrgRepoDeprecated: (org, body, params = {}) => this.request(__spreadValues({
        path: `/org/${org}/repos`,
        method: "POST",
        body,
        secure: true,
        type: "application/json" /* Json */
      }, params))
    };
    this.orgs = {
      /**
       * No description
       *
       * @tags organization
       * @name OrgGetAll
       * @summary Get list of organizations
       * @request GET:/orgs
       * @secure
       */
      orgGetAll: (query, params = {}) => this.request(__spreadValues({
        path: `/orgs`,
        method: "GET",
        query,
        secure: true
      }, params)),
      /**
       * No description
       *
       * @tags organization
       * @name OrgCreate
       * @summary Create an organization
       * @request POST:/orgs
       * @secure
       */
      orgCreate: (organization, params = {}) => this.request(__spreadValues({
        path: `/orgs`,
        method: "POST",
        body: organization,
        secure: true,
        type: "application/json" /* Json */
      }, params)),
      /**
       * No description
       *
       * @tags organization
       * @name OrgGet
       * @summary Get an organization
       * @request GET:/orgs/{org}
       * @secure
       */
      orgGet: (org, params = {}) => this.request(__spreadValues({
        path: `/orgs/${org}`,
        method: "GET",
        secure: true
      }, params)),
      /**
       * No description
       *
       * @tags organization
       * @name OrgDelete
       * @summary Delete an organization
       * @request DELETE:/orgs/{org}
       * @secure
       */
      orgDelete: (org, params = {}) => this.request(__spreadValues({
        path: `/orgs/${org}`,
        method: "DELETE",
        secure: true
      }, params)),
      /**
       * No description
       *
       * @tags organization
       * @name OrgEdit
       * @summary Edit an organization
       * @request PATCH:/orgs/{org}
       * @secure
       */
      orgEdit: (org, body, params = {}) => this.request(__spreadValues({
        path: `/orgs/${org}`,
        method: "PATCH",
        body,
        secure: true,
        type: "application/json" /* Json */
      }, params)),
      /**
       * No description
       *
       * @tags organization
       * @name OrgGetRunnerRegistrationToken
       * @summary Get an organization's actions runner registration token
       * @request GET:/orgs/{org}/actions/runners/registration-token
       * @secure
       */
      orgGetRunnerRegistrationToken: (org, params = {}) => this.request(__spreadValues({
        path: `/orgs/${org}/actions/runners/registration-token`,
        method: "GET",
        secure: true
      }, params)),
      /**
       * No description
       *
       * @tags organization
       * @name OrgListActionsSecrets
       * @summary List an organization's actions secrets
       * @request GET:/orgs/{org}/actions/secrets
       * @secure
       */
      orgListActionsSecrets: (org, query, params = {}) => this.request(__spreadValues({
        path: `/orgs/${org}/actions/secrets`,
        method: "GET",
        query,
        secure: true
      }, params)),
      /**
       * No description
       *
       * @tags organization
       * @name UpdateOrgSecret
       * @summary Create or Update a secret value in an organization
       * @request PUT:/orgs/{org}/actions/secrets/{secretname}
       * @secure
       */
      updateOrgSecret: (org, secretname, body, params = {}) => this.request(__spreadValues({
        path: `/orgs/${org}/actions/secrets/${secretname}`,
        method: "PUT",
        body,
        secure: true,
        type: "application/json" /* Json */
      }, params)),
      /**
       * No description
       *
       * @tags organization
       * @name DeleteOrgSecret
       * @summary Delete a secret in an organization
       * @request DELETE:/orgs/{org}/actions/secrets/{secretname}
       * @secure
       */
      deleteOrgSecret: (org, secretname, params = {}) => this.request(__spreadValues({
        path: `/orgs/${org}/actions/secrets/${secretname}`,
        method: "DELETE",
        secure: true,
        type: "application/json" /* Json */
      }, params)),
      /**
       * No description
       *
       * @tags organization
       * @name GetOrgVariablesList
       * @summary Get an org-level variables list
       * @request GET:/orgs/{org}/actions/variables
       * @secure
       */
      getOrgVariablesList: (org, query, params = {}) => this.request(__spreadValues({
        path: `/orgs/${org}/actions/variables`,
        method: "GET",
        query,
        secure: true
      }, params)),
      /**
       * No description
       *
       * @tags organization
       * @name GetOrgVariable
       * @summary Get an org-level variable
       * @request GET:/orgs/{org}/actions/variables/{variablename}
       * @secure
       */
      getOrgVariable: (org, variablename, params = {}) => this.request(__spreadValues({
        path: `/orgs/${org}/actions/variables/${variablename}`,
        method: "GET",
        secure: true
      }, params)),
      /**
       * No description
       *
       * @tags organization
       * @name UpdateOrgVariable
       * @summary Update an org-level variable
       * @request PUT:/orgs/{org}/actions/variables/{variablename}
       * @secure
       */
      updateOrgVariable: (org, variablename, body, params = {}) => this.request(__spreadValues({
        path: `/orgs/${org}/actions/variables/${variablename}`,
        method: "PUT",
        body,
        secure: true,
        type: "application/json" /* Json */
      }, params)),
      /**
       * No description
       *
       * @tags organization
       * @name CreateOrgVariable
       * @summary Create an org-level variable
       * @request POST:/orgs/{org}/actions/variables/{variablename}
       * @secure
       */
      createOrgVariable: (org, variablename, body, params = {}) => this.request(__spreadValues({
        path: `/orgs/${org}/actions/variables/${variablename}`,
        method: "POST",
        body,
        secure: true,
        type: "application/json" /* Json */
      }, params)),
      /**
       * No description
       *
       * @tags organization
       * @name DeleteOrgVariable
       * @summary Delete an org-level variable
       * @request DELETE:/orgs/{org}/actions/variables/{variablename}
       * @secure
       */
      deleteOrgVariable: (org, variablename, params = {}) => this.request(__spreadValues({
        path: `/orgs/${org}/actions/variables/${variablename}`,
        method: "DELETE",
        secure: true
      }, params)),
      /**
       * No description
       *
       * @tags organization
       * @name OrgListActivityFeeds
       * @summary List an organization's activity feeds
       * @request GET:/orgs/{org}/activities/feeds
       * @secure
       */
      orgListActivityFeeds: (org, query, params = {}) => this.request(__spreadValues({
        path: `/orgs/${org}/activities/feeds`,
        method: "GET",
        query,
        secure: true
      }, params)),
      /**
       * No description
       *
       * @tags organization
       * @name OrgUpdateAvatar
       * @summary Update Avatar
       * @request POST:/orgs/{org}/avatar
       * @secure
       */
      orgUpdateAvatar: (org, body, params = {}) => this.request(__spreadValues({
        path: `/orgs/${org}/avatar`,
        method: "POST",
        body,
        secure: true
      }, params)),
      /**
       * No description
       *
       * @tags organization
       * @name OrgDeleteAvatar
       * @summary Delete Avatar
       * @request DELETE:/orgs/{org}/avatar
       * @secure
       */
      orgDeleteAvatar: (org, params = {}) => this.request(__spreadValues({
        path: `/orgs/${org}/avatar`,
        method: "DELETE",
        secure: true
      }, params)),
      /**
       * No description
       *
       * @tags organization
       * @name OrganizationListBlocks
       * @summary List users blocked by the organization
       * @request GET:/orgs/{org}/blocks
       * @secure
       */
      organizationListBlocks: (org, query, params = {}) => this.request(__spreadValues({
        path: `/orgs/${org}/blocks`,
        method: "GET",
        query,
        secure: true
      }, params)),
      /**
       * No description
       *
       * @tags organization
       * @name OrganizationCheckUserBlock
       * @summary Check if a user is blocked by the organization
       * @request GET:/orgs/{org}/blocks/{username}
       * @secure
       */
      organizationCheckUserBlock: (org, username, params = {}) => this.request(__spreadValues({
        path: `/orgs/${org}/blocks/${username}`,
        method: "GET",
        secure: true
      }, params)),
      /**
       * No description
       *
       * @tags organization
       * @name OrganizationBlockUser
       * @summary Block a user
       * @request PUT:/orgs/{org}/blocks/{username}
       * @secure
       */
      organizationBlockUser: (org, username, query, params = {}) => this.request(__spreadValues({
        path: `/orgs/${org}/blocks/${username}`,
        method: "PUT",
        query,
        secure: true
      }, params)),
      /**
       * No description
       *
       * @tags organization
       * @name OrganizationUnblockUser
       * @summary Unblock a user
       * @request DELETE:/orgs/{org}/blocks/{username}
       * @secure
       */
      organizationUnblockUser: (org, username, params = {}) => this.request(__spreadValues({
        path: `/orgs/${org}/blocks/${username}`,
        method: "DELETE",
        secure: true
      }, params)),
      /**
       * No description
       *
       * @tags organization
       * @name OrgListHooks
       * @summary List an organization's webhooks
       * @request GET:/orgs/{org}/hooks
       * @secure
       */
      orgListHooks: (org, query, params = {}) => this.request(__spreadValues({
        path: `/orgs/${org}/hooks`,
        method: "GET",
        query,
        secure: true
      }, params)),
      /**
       * No description
       *
       * @tags organization
       * @name OrgCreateHook
       * @summary Create a hook
       * @request POST:/orgs/{org}/hooks
       * @secure
       */
      orgCreateHook: (org, body, params = {}) => this.request(__spreadValues({
        path: `/orgs/${org}/hooks`,
        method: "POST",
        body,
        secure: true,
        type: "application/json" /* Json */
      }, params)),
      /**
       * No description
       *
       * @tags organization
       * @name OrgGetHook
       * @summary Get a hook
       * @request GET:/orgs/{org}/hooks/{id}
       * @secure
       */
      orgGetHook: (org, id, params = {}) => this.request(__spreadValues({
        path: `/orgs/${org}/hooks/${id}`,
        method: "GET",
        secure: true
      }, params)),
      /**
       * No description
       *
       * @tags organization
       * @name OrgDeleteHook
       * @summary Delete a hook
       * @request DELETE:/orgs/{org}/hooks/{id}
       * @secure
       */
      orgDeleteHook: (org, id, params = {}) => this.request(__spreadValues({
        path: `/orgs/${org}/hooks/${id}`,
        method: "DELETE",
        secure: true
      }, params)),
      /**
       * No description
       *
       * @tags organization
       * @name OrgEditHook
       * @summary Update a hook
       * @request PATCH:/orgs/{org}/hooks/{id}
       * @secure
       */
      orgEditHook: (org, id, body, params = {}) => this.request(__spreadValues({
        path: `/orgs/${org}/hooks/${id}`,
        method: "PATCH",
        body,
        secure: true,
        type: "application/json" /* Json */
      }, params)),
      /**
       * No description
       *
       * @tags organization
       * @name OrgListLabels
       * @summary List an organization's labels
       * @request GET:/orgs/{org}/labels
       * @secure
       */
      orgListLabels: (org, query, params = {}) => this.request(__spreadValues({
        path: `/orgs/${org}/labels`,
        method: "GET",
        query,
        secure: true
      }, params)),
      /**
       * No description
       *
       * @tags organization
       * @name OrgCreateLabel
       * @summary Create a label for an organization
       * @request POST:/orgs/{org}/labels
       * @secure
       */
      orgCreateLabel: (org, body, params = {}) => this.request(__spreadValues({
        path: `/orgs/${org}/labels`,
        method: "POST",
        body,
        secure: true,
        type: "application/json" /* Json */
      }, params)),
      /**
       * No description
       *
       * @tags organization
       * @name OrgGetLabel
       * @summary Get a single label
       * @request GET:/orgs/{org}/labels/{id}
       * @secure
       */
      orgGetLabel: (org, id, params = {}) => this.request(__spreadValues({
        path: `/orgs/${org}/labels/${id}`,
        method: "GET",
        secure: true
      }, params)),
      /**
       * No description
       *
       * @tags organization
       * @name OrgDeleteLabel
       * @summary Delete a label
       * @request DELETE:/orgs/{org}/labels/{id}
       * @secure
       */
      orgDeleteLabel: (org, id, params = {}) => this.request(__spreadValues({
        path: `/orgs/${org}/labels/${id}`,
        method: "DELETE",
        secure: true
      }, params)),
      /**
       * No description
       *
       * @tags organization
       * @name OrgEditLabel
       * @summary Update a label
       * @request PATCH:/orgs/{org}/labels/{id}
       * @secure
       */
      orgEditLabel: (org, id, body, params = {}) => this.request(__spreadValues({
        path: `/orgs/${org}/labels/${id}`,
        method: "PATCH",
        body,
        secure: true,
        type: "application/json" /* Json */
      }, params)),
      /**
       * No description
       *
       * @tags organization
       * @name OrgListMembers
       * @summary List an organization's members
       * @request GET:/orgs/{org}/members
       * @secure
       */
      orgListMembers: (org, query, params = {}) => this.request(__spreadValues({
        path: `/orgs/${org}/members`,
        method: "GET",
        query,
        secure: true
      }, params)),
      /**
       * No description
       *
       * @tags organization
       * @name OrgIsMember
       * @summary Check if a user is a member of an organization
       * @request GET:/orgs/{org}/members/{username}
       * @secure
       */
      orgIsMember: (org, username, params = {}) => this.request(__spreadValues({
        path: `/orgs/${org}/members/${username}`,
        method: "GET",
        secure: true
      }, params)),
      /**
       * No description
       *
       * @tags organization
       * @name OrgDeleteMember
       * @summary Remove a member from an organization
       * @request DELETE:/orgs/{org}/members/{username}
       * @secure
       */
      orgDeleteMember: (org, username, params = {}) => this.request(__spreadValues({
        path: `/orgs/${org}/members/${username}`,
        method: "DELETE",
        secure: true
      }, params)),
      /**
       * No description
       *
       * @tags organization
       * @name OrgListPublicMembers
       * @summary List an organization's public members
       * @request GET:/orgs/{org}/public_members
       * @secure
       */
      orgListPublicMembers: (org, query, params = {}) => this.request(__spreadValues({
        path: `/orgs/${org}/public_members`,
        method: "GET",
        query,
        secure: true
      }, params)),
      /**
       * No description
       *
       * @tags organization
       * @name OrgIsPublicMember
       * @summary Check if a user is a public member of an organization
       * @request GET:/orgs/{org}/public_members/{username}
       * @secure
       */
      orgIsPublicMember: (org, username, params = {}) => this.request(__spreadValues({
        path: `/orgs/${org}/public_members/${username}`,
        method: "GET",
        secure: true
      }, params)),
      /**
       * No description
       *
       * @tags organization
       * @name OrgPublicizeMember
       * @summary Publicize a user's membership
       * @request PUT:/orgs/{org}/public_members/{username}
       * @secure
       */
      orgPublicizeMember: (org, username, params = {}) => this.request(__spreadValues({
        path: `/orgs/${org}/public_members/${username}`,
        method: "PUT",
        secure: true
      }, params)),
      /**
       * No description
       *
       * @tags organization
       * @name OrgConcealMember
       * @summary Conceal a user's membership
       * @request DELETE:/orgs/{org}/public_members/{username}
       * @secure
       */
      orgConcealMember: (org, username, params = {}) => this.request(__spreadValues({
        path: `/orgs/${org}/public_members/${username}`,
        method: "DELETE",
        secure: true
      }, params)),
      /**
       * No description
       *
       * @tags organization
       * @name OrgListRepos
       * @summary List an organization's repos
       * @request GET:/orgs/{org}/repos
       * @secure
       */
      orgListRepos: (org, query, params = {}) => this.request(__spreadValues({
        path: `/orgs/${org}/repos`,
        method: "GET",
        query,
        secure: true
      }, params)),
      /**
       * No description
       *
       * @tags organization
       * @name CreateOrgRepo
       * @summary Create a repository in an organization
       * @request POST:/orgs/{org}/repos
       * @secure
       */
      createOrgRepo: (org, body, params = {}) => this.request(__spreadValues({
        path: `/orgs/${org}/repos`,
        method: "POST",
        body,
        secure: true,
        type: "application/json" /* Json */
      }, params)),
      /**
       * No description
       *
       * @tags organization
       * @name OrgListTeams
       * @summary List an organization's teams
       * @request GET:/orgs/{org}/teams
       * @secure
       */
      orgListTeams: (org, query, params = {}) => this.request(__spreadValues({
        path: `/orgs/${org}/teams`,
        method: "GET",
        query,
        secure: true
      }, params)),
      /**
       * No description
       *
       * @tags organization
       * @name OrgCreateTeam
       * @summary Create a team
       * @request POST:/orgs/{org}/teams
       * @secure
       */
      orgCreateTeam: (org, body, params = {}) => this.request(__spreadValues({
        path: `/orgs/${org}/teams`,
        method: "POST",
        body,
        secure: true,
        type: "application/json" /* Json */
      }, params)),
      /**
       * No description
       *
       * @tags organization
       * @name TeamSearch
       * @summary Search for teams within an organization
       * @request GET:/orgs/{org}/teams/search
       * @secure
       */
      teamSearch: (org, query, params = {}) => this.request(__spreadValues({
        path: `/orgs/${org}/teams/search`,
        method: "GET",
        query,
        secure: true,
        format: "json"
      }, params))
    };
    this.packages = {
      /**
       * No description
       *
       * @tags package
       * @name ListPackages
       * @summary Gets all packages of an owner
       * @request GET:/packages/{owner}
       * @secure
       */
      listPackages: (owner, query, params = {}) => this.request(__spreadValues({
        path: `/packages/${owner}`,
        method: "GET",
        query,
        secure: true
      }, params)),
      /**
       * No description
       *
       * @tags package
       * @name GetPackage
       * @summary Gets a package
       * @request GET:/packages/{owner}/{type}/{name}/{version}
       * @secure
       */
      getPackage: (owner, type, name, version, params = {}) => this.request(__spreadValues({
        path: `/packages/${owner}/${type}/${name}/${version}`,
        method: "GET",
        secure: true
      }, params)),
      /**
       * No description
       *
       * @tags package
       * @name DeletePackage
       * @summary Delete a package
       * @request DELETE:/packages/{owner}/{type}/{name}/{version}
       * @secure
       */
      deletePackage: (owner, type, name, version, params = {}) => this.request(__spreadValues({
        path: `/packages/${owner}/${type}/${name}/${version}`,
        method: "DELETE",
        secure: true
      }, params)),
      /**
       * No description
       *
       * @tags package
       * @name ListPackageFiles
       * @summary Gets all files of a package
       * @request GET:/packages/{owner}/{type}/{name}/{version}/files
       * @secure
       */
      listPackageFiles: (owner, type, name, version, params = {}) => this.request(__spreadValues({
        path: `/packages/${owner}/${type}/${name}/${version}/files`,
        method: "GET",
        secure: true
      }, params))
    };
    this.repos = {
      /**
       * No description
       *
       * @tags issue
       * @name IssueSearchIssues
       * @summary Search for issues across the repositories that the user has access to
       * @request GET:/repos/issues/search
       * @secure
       */
      issueSearchIssues: (query, params = {}) => this.request(__spreadValues({
        path: `/repos/issues/search`,
        method: "GET",
        query,
        secure: true
      }, params)),
      /**
       * No description
       *
       * @tags repository
       * @name RepoMigrate
       * @summary Migrate a remote git repository
       * @request POST:/repos/migrate
       * @secure
       */
      repoMigrate: (body, params = {}) => this.request(__spreadValues({
        path: `/repos/migrate`,
        method: "POST",
        body,
        secure: true,
        type: "application/json" /* Json */
      }, params)),
      /**
       * No description
       *
       * @tags repository
       * @name RepoSearch
       * @summary Search for repositories
       * @request GET:/repos/search
       * @secure
       */
      repoSearch: (query, params = {}) => this.request(__spreadValues({
        path: `/repos/search`,
        method: "GET",
        query,
        secure: true
      }, params)),
      /**
       * No description
       *
       * @tags repository
       * @name RepoGet
       * @summary Get a repository
       * @request GET:/repos/{owner}/{repo}
       * @secure
       */
      repoGet: (owner, repo, params = {}) => this.request(__spreadValues({
        path: `/repos/${owner}/${repo}`,
        method: "GET",
        secure: true
      }, params)),
      /**
       * No description
       *
       * @tags repository
       * @name RepoDelete
       * @summary Delete a repository
       * @request DELETE:/repos/{owner}/{repo}
       * @secure
       */
      repoDelete: (owner, repo, params = {}) => this.request(__spreadValues({
        path: `/repos/${owner}/${repo}`,
        method: "DELETE",
        secure: true
      }, params)),
      /**
       * No description
       *
       * @tags repository
       * @name RepoEdit
       * @summary Edit a repository's properties. Only fields that are set will be changed.
       * @request PATCH:/repos/{owner}/{repo}
       * @secure
       */
      repoEdit: (owner, repo, body, params = {}) => this.request(__spreadValues({
        path: `/repos/${owner}/${repo}`,
        method: "PATCH",
        body,
        secure: true,
        type: "application/json" /* Json */
      }, params)),
      /**
       * No description
       *
       * @tags repository
       * @name RepoListActionsSecrets
       * @summary List an repo's actions secrets
       * @request GET:/repos/{owner}/{repo}/actions/secrets
       * @secure
       */
      repoListActionsSecrets: (owner, repo, query, params = {}) => this.request(__spreadValues({
        path: `/repos/${owner}/${repo}/actions/secrets`,
        method: "GET",
        query,
        secure: true
      }, params)),
      /**
       * No description
       *
       * @tags repository
       * @name UpdateRepoSecret
       * @summary Create or Update a secret value in a repository
       * @request PUT:/repos/{owner}/{repo}/actions/secrets/{secretname}
       * @secure
       */
      updateRepoSecret: (owner, repo, secretname, body, params = {}) => this.request(__spreadValues({
        path: `/repos/${owner}/${repo}/actions/secrets/${secretname}`,
        method: "PUT",
        body,
        secure: true,
        type: "application/json" /* Json */
      }, params)),
      /**
       * No description
       *
       * @tags repository
       * @name DeleteRepoSecret
       * @summary Delete a secret in a repository
       * @request DELETE:/repos/{owner}/{repo}/actions/secrets/{secretname}
       * @secure
       */
      deleteRepoSecret: (owner, repo, secretname, params = {}) => this.request(__spreadValues({
        path: `/repos/${owner}/${repo}/actions/secrets/${secretname}`,
        method: "DELETE",
        secure: true,
        type: "application/json" /* Json */
      }, params)),
      /**
       * No description
       *
       * @tags repository
       * @name GetRepoVariablesList
       * @summary Get repo-level variables list
       * @request GET:/repos/{owner}/{repo}/actions/variables
       * @secure
       */
      getRepoVariablesList: (owner, repo, query, params = {}) => this.request(__spreadValues({
        path: `/repos/${owner}/${repo}/actions/variables`,
        method: "GET",
        query,
        secure: true
      }, params)),
      /**
       * No description
       *
       * @tags repository
       * @name GetRepoVariable
       * @summary Get a repo-level variable
       * @request GET:/repos/{owner}/{repo}/actions/variables/{variablename}
       * @secure
       */
      getRepoVariable: (owner, repo, variablename, params = {}) => this.request(__spreadValues({
        path: `/repos/${owner}/${repo}/actions/variables/${variablename}`,
        method: "GET",
        secure: true
      }, params)),
      /**
       * No description
       *
       * @tags repository
       * @name UpdateRepoVariable
       * @summary Update a repo-level variable
       * @request PUT:/repos/{owner}/{repo}/actions/variables/{variablename}
       * @secure
       */
      updateRepoVariable: (owner, repo, variablename, body, params = {}) => this.request(__spreadValues({
        path: `/repos/${owner}/${repo}/actions/variables/${variablename}`,
        method: "PUT",
        body,
        secure: true,
        type: "application/json" /* Json */
      }, params)),
      /**
       * No description
       *
       * @tags repository
       * @name CreateRepoVariable
       * @summary Create a repo-level variable
       * @request POST:/repos/{owner}/{repo}/actions/variables/{variablename}
       * @secure
       */
      createRepoVariable: (owner, repo, variablename, body, params = {}) => this.request(__spreadValues({
        path: `/repos/${owner}/${repo}/actions/variables/${variablename}`,
        method: "POST",
        body,
        secure: true,
        type: "application/json" /* Json */
      }, params)),
      /**
       * No description
       *
       * @tags repository
       * @name DeleteRepoVariable
       * @summary Delete a repo-level variable
       * @request DELETE:/repos/{owner}/{repo}/actions/variables/{variablename}
       * @secure
       */
      deleteRepoVariable: (owner, repo, variablename, params = {}) => this.request(__spreadValues({
        path: `/repos/${owner}/${repo}/actions/variables/${variablename}`,
        method: "DELETE",
        secure: true
      }, params)),
      /**
       * No description
       *
       * @tags repository
       * @name RepoListActivityFeeds
       * @summary List a repository's activity feeds
       * @request GET:/repos/{owner}/{repo}/activities/feeds
       * @secure
       */
      repoListActivityFeeds: (owner, repo, query, params = {}) => this.request(__spreadValues({
        path: `/repos/${owner}/${repo}/activities/feeds`,
        method: "GET",
        query,
        secure: true
      }, params)),
      /**
       * No description
       *
       * @tags repository
       * @name RepoGetArchive
       * @summary Get an archive of a repository
       * @request GET:/repos/{owner}/{repo}/archive/{archive}
       * @secure
       */
      repoGetArchive: (owner, repo, archive, params = {}) => this.request(__spreadValues({
        path: `/repos/${owner}/${repo}/archive/${archive}`,
        method: "GET",
        secure: true
      }, params)),
      /**
       * No description
       *
       * @tags repository
       * @name RepoGetAssignees
       * @summary Return all users that have write access and can be assigned to issues
       * @request GET:/repos/{owner}/{repo}/assignees
       * @secure
       */
      repoGetAssignees: (owner, repo, params = {}) => this.request(__spreadValues({
        path: `/repos/${owner}/${repo}/assignees`,
        method: "GET",
        secure: true
      }, params)),
      /**
       * No description
       *
       * @tags repository
       * @name RepoUpdateAvatar
       * @summary Update avatar
       * @request POST:/repos/{owner}/{repo}/avatar
       * @secure
       */
      repoUpdateAvatar: (owner, repo, body, params = {}) => this.request(__spreadValues({
        path: `/repos/${owner}/${repo}/avatar`,
        method: "POST",
        body,
        secure: true,
        type: "application/json" /* Json */
      }, params)),
      /**
       * No description
       *
       * @tags repository
       * @name RepoDeleteAvatar
       * @summary Delete avatar
       * @request DELETE:/repos/{owner}/{repo}/avatar
       * @secure
       */
      repoDeleteAvatar: (owner, repo, params = {}) => this.request(__spreadValues({
        path: `/repos/${owner}/${repo}/avatar`,
        method: "DELETE",
        secure: true
      }, params)),
      /**
       * No description
       *
       * @tags repository
       * @name RepoListBranchProtection
       * @summary List branch protections for a repository
       * @request GET:/repos/{owner}/{repo}/branch_protections
       * @secure
       */
      repoListBranchProtection: (owner, repo, params = {}) => this.request(__spreadValues({
        path: `/repos/${owner}/${repo}/branch_protections`,
        method: "GET",
        secure: true
      }, params)),
      /**
       * No description
       *
       * @tags repository
       * @name RepoCreateBranchProtection
       * @summary Create a branch protections for a repository
       * @request POST:/repos/{owner}/{repo}/branch_protections
       * @secure
       */
      repoCreateBranchProtection: (owner, repo, body, params = {}) => this.request(__spreadValues({
        path: `/repos/${owner}/${repo}/branch_protections`,
        method: "POST",
        body,
        secure: true,
        type: "application/json" /* Json */
      }, params)),
      /**
       * No description
       *
       * @tags repository
       * @name RepoGetBranchProtection
       * @summary Get a specific branch protection for the repository
       * @request GET:/repos/{owner}/{repo}/branch_protections/{name}
       * @secure
       */
      repoGetBranchProtection: (owner, repo, name, params = {}) => this.request(__spreadValues({
        path: `/repos/${owner}/${repo}/branch_protections/${name}`,
        method: "GET",
        secure: true
      }, params)),
      /**
       * No description
       *
       * @tags repository
       * @name RepoDeleteBranchProtection
       * @summary Delete a specific branch protection for the repository
       * @request DELETE:/repos/{owner}/{repo}/branch_protections/{name}
       * @secure
       */
      repoDeleteBranchProtection: (owner, repo, name, params = {}) => this.request(__spreadValues({
        path: `/repos/${owner}/${repo}/branch_protections/${name}`,
        method: "DELETE",
        secure: true
      }, params)),
      /**
       * No description
       *
       * @tags repository
       * @name RepoEditBranchProtection
       * @summary Edit a branch protections for a repository. Only fields that are set will be changed
       * @request PATCH:/repos/{owner}/{repo}/branch_protections/{name}
       * @secure
       */
      repoEditBranchProtection: (owner, repo, name, body, params = {}) => this.request(__spreadValues({
        path: `/repos/${owner}/${repo}/branch_protections/${name}`,
        method: "PATCH",
        body,
        secure: true,
        type: "application/json" /* Json */
      }, params)),
      /**
       * No description
       *
       * @tags repository
       * @name RepoListBranches
       * @summary List a repository's branches
       * @request GET:/repos/{owner}/{repo}/branches
       * @secure
       */
      repoListBranches: (owner, repo, query, params = {}) => this.request(__spreadValues({
        path: `/repos/${owner}/${repo}/branches`,
        method: "GET",
        query,
        secure: true
      }, params)),
      /**
       * No description
       *
       * @tags repository
       * @name RepoCreateBranch
       * @summary Create a branch
       * @request POST:/repos/{owner}/{repo}/branches
       * @secure
       */
      repoCreateBranch: (owner, repo, body, params = {}) => this.request(__spreadValues({
        path: `/repos/${owner}/${repo}/branches`,
        method: "POST",
        body,
        secure: true,
        type: "application/json" /* Json */
      }, params)),
      /**
       * No description
       *
       * @tags repository
       * @name RepoGetBranch
       * @summary Retrieve a specific branch from a repository, including its effective branch protection
       * @request GET:/repos/{owner}/{repo}/branches/{branch}
       * @secure
       */
      repoGetBranch: (owner, repo, branch, params = {}) => this.request(__spreadValues({
        path: `/repos/${owner}/${repo}/branches/${branch}`,
        method: "GET",
        secure: true
      }, params)),
      /**
       * No description
       *
       * @tags repository
       * @name RepoDeleteBranch
       * @summary Delete a specific branch from a repository
       * @request DELETE:/repos/{owner}/{repo}/branches/{branch}
       * @secure
       */
      repoDeleteBranch: (owner, repo, branch, params = {}) => this.request(__spreadValues({
        path: `/repos/${owner}/${repo}/branches/${branch}`,
        method: "DELETE",
        secure: true
      }, params)),
      /**
       * No description
       *
       * @tags repository
       * @name RepoListCollaborators
       * @summary List a repository's collaborators
       * @request GET:/repos/{owner}/{repo}/collaborators
       * @secure
       */
      repoListCollaborators: (owner, repo, query, params = {}) => this.request(__spreadValues({
        path: `/repos/${owner}/${repo}/collaborators`,
        method: "GET",
        query,
        secure: true
      }, params)),
      /**
       * No description
       *
       * @tags repository
       * @name RepoCheckCollaborator
       * @summary Check if a user is a collaborator of a repository
       * @request GET:/repos/{owner}/{repo}/collaborators/{collaborator}
       * @secure
       */
      repoCheckCollaborator: (owner, repo, collaborator, params = {}) => this.request(__spreadValues({
        path: `/repos/${owner}/${repo}/collaborators/${collaborator}`,
        method: "GET",
        secure: true
      }, params)),
      /**
       * No description
       *
       * @tags repository
       * @name RepoAddCollaborator
       * @summary Add a collaborator to a repository
       * @request PUT:/repos/{owner}/{repo}/collaborators/{collaborator}
       * @secure
       */
      repoAddCollaborator: (owner, repo, collaborator, body, params = {}) => this.request(__spreadValues({
        path: `/repos/${owner}/${repo}/collaborators/${collaborator}`,
        method: "PUT",
        body,
        secure: true,
        type: "application/json" /* Json */
      }, params)),
      /**
       * No description
       *
       * @tags repository
       * @name RepoDeleteCollaborator
       * @summary Delete a collaborator from a repository
       * @request DELETE:/repos/{owner}/{repo}/collaborators/{collaborator}
       * @secure
       */
      repoDeleteCollaborator: (owner, repo, collaborator, params = {}) => this.request(__spreadValues({
        path: `/repos/${owner}/${repo}/collaborators/${collaborator}`,
        method: "DELETE",
        secure: true
      }, params)),
      /**
       * No description
       *
       * @tags repository
       * @name RepoGetRepoPermissions
       * @summary Get repository permissions for a user
       * @request GET:/repos/{owner}/{repo}/collaborators/{collaborator}/permission
       * @secure
       */
      repoGetRepoPermissions: (owner, repo, collaborator, params = {}) => this.request(__spreadValues({
        path: `/repos/${owner}/${repo}/collaborators/${collaborator}/permission`,
        method: "GET",
        secure: true
      }, params)),
      /**
       * No description
       *
       * @tags repository
       * @name RepoGetAllCommits
       * @summary Get a list of all commits from a repository
       * @request GET:/repos/{owner}/{repo}/commits
       * @secure
       */
      repoGetAllCommits: (owner, repo, query, params = {}) => this.request(__spreadValues({
        path: `/repos/${owner}/${repo}/commits`,
        method: "GET",
        query,
        secure: true
      }, params)),
      /**
       * No description
       *
       * @tags repository
       * @name RepoGetCombinedStatusByRef
       * @summary Get a commit's combined status, by branch/tag/commit reference
       * @request GET:/repos/{owner}/{repo}/commits/{ref}/status
       * @secure
       */
      repoGetCombinedStatusByRef: (owner, repo, ref, query, params = {}) => this.request(__spreadValues({
        path: `/repos/${owner}/${repo}/commits/${ref}/status`,
        method: "GET",
        query,
        secure: true
      }, params)),
      /**
       * No description
       *
       * @tags repository
       * @name RepoListStatusesByRef
       * @summary Get a commit's statuses, by branch/tag/commit reference
       * @request GET:/repos/{owner}/{repo}/commits/{ref}/statuses
       * @secure
       */
      repoListStatusesByRef: (owner, repo, ref, query, params = {}) => this.request(__spreadValues({
        path: `/repos/${owner}/${repo}/commits/${ref}/statuses`,
        method: "GET",
        query,
        secure: true
      }, params)),
      /**
       * No description
       *
       * @tags repository
       * @name RepoGetCommitPullRequest
       * @summary Get the pull request of the commit
       * @request GET:/repos/{owner}/{repo}/commits/{sha}/pull
       * @secure
       */
      repoGetCommitPullRequest: (owner, repo, sha, params = {}) => this.request(__spreadValues({
        path: `/repos/${owner}/${repo}/commits/${sha}/pull`,
        method: "GET",
        secure: true
      }, params)),
      /**
       * No description
       *
       * @tags repository
       * @name RepoCompareDiff
       * @summary Get commit comparison information
       * @request GET:/repos/{owner}/{repo}/compare/{basehead}
       * @secure
       */
      repoCompareDiff: (owner, repo, basehead, params = {}) => this.request(__spreadValues({
        path: `/repos/${owner}/${repo}/compare/${basehead}`,
        method: "GET",
        secure: true
      }, params)),
      /**
       * No description
       *
       * @tags repository
       * @name RepoGetContentsList
       * @summary Gets the metadata of all the entries of the root dir
       * @request GET:/repos/{owner}/{repo}/contents
       * @secure
       */
      repoGetContentsList: (owner, repo, query, params = {}) => this.request(__spreadValues({
        path: `/repos/${owner}/${repo}/contents`,
        method: "GET",
        query,
        secure: true
      }, params)),
      /**
       * No description
       *
       * @tags repository
       * @name RepoChangeFiles
       * @summary Modify multiple files in a repository
       * @request POST:/repos/{owner}/{repo}/contents
       * @secure
       */
      repoChangeFiles: (owner, repo, body, params = {}) => this.request(__spreadValues({
        path: `/repos/${owner}/${repo}/contents`,
        method: "POST",
        body,
        secure: true,
        type: "application/json" /* Json */
      }, params)),
      /**
       * No description
       *
       * @tags repository
       * @name RepoGetContents
       * @summary Gets the metadata and contents (if a file) of an entry in a repository, or a list of entries if a dir
       * @request GET:/repos/{owner}/{repo}/contents/{filepath}
       * @secure
       */
      repoGetContents: (owner, repo, filepath, query, params = {}) => this.request(__spreadValues({
        path: `/repos/${owner}/${repo}/contents/${filepath}`,
        method: "GET",
        query,
        secure: true
      }, params)),
      /**
       * No description
       *
       * @tags repository
       * @name RepoUpdateFile
       * @summary Update a file in a repository
       * @request PUT:/repos/{owner}/{repo}/contents/{filepath}
       * @secure
       */
      repoUpdateFile: (owner, repo, filepath, body, params = {}) => this.request(__spreadValues({
        path: `/repos/${owner}/${repo}/contents/${filepath}`,
        method: "PUT",
        body,
        secure: true,
        type: "application/json" /* Json */
      }, params)),
      /**
       * No description
       *
       * @tags repository
       * @name RepoCreateFile
       * @summary Create a file in a repository
       * @request POST:/repos/{owner}/{repo}/contents/{filepath}
       * @secure
       */
      repoCreateFile: (owner, repo, filepath, body, params = {}) => this.request(__spreadValues({
        path: `/repos/${owner}/${repo}/contents/${filepath}`,
        method: "POST",
        body,
        secure: true,
        type: "application/json" /* Json */
      }, params)),
      /**
       * No description
       *
       * @tags repository
       * @name RepoDeleteFile
       * @summary Delete a file in a repository
       * @request DELETE:/repos/{owner}/{repo}/contents/{filepath}
       * @secure
       */
      repoDeleteFile: (owner, repo, filepath, body, params = {}) => this.request(__spreadValues({
        path: `/repos/${owner}/${repo}/contents/${filepath}`,
        method: "DELETE",
        body,
        secure: true,
        type: "application/json" /* Json */
      }, params)),
      /**
       * No description
       *
       * @tags repository
       * @name RepoApplyDiffPatch
       * @summary Apply diff patch to repository
       * @request POST:/repos/{owner}/{repo}/diffpatch
       * @secure
       */
      repoApplyDiffPatch: (owner, repo, body, params = {}) => this.request(__spreadValues({
        path: `/repos/${owner}/${repo}/diffpatch`,
        method: "POST",
        body,
        secure: true,
        type: "application/json" /* Json */
      }, params)),
      /**
       * No description
       *
       * @tags repository
       * @name RepoGetEditorConfig
       * @summary Get the EditorConfig definitions of a file in a repository
       * @request GET:/repos/{owner}/{repo}/editorconfig/{filepath}
       * @secure
       */
      repoGetEditorConfig: (owner, repo, filepath, query, params = {}) => this.request(__spreadValues({
        path: `/repos/${owner}/${repo}/editorconfig/${filepath}`,
        method: "GET",
        query,
        secure: true
      }, params)),
      /**
       * No description
       *
       * @tags repository
       * @name ListForks
       * @summary List a repository's forks
       * @request GET:/repos/{owner}/{repo}/forks
       * @secure
       */
      listForks: (owner, repo, query, params = {}) => this.request(__spreadValues({
        path: `/repos/${owner}/${repo}/forks`,
        method: "GET",
        query,
        secure: true
      }, params)),
      /**
       * No description
       *
       * @tags repository
       * @name CreateFork
       * @summary Fork a repository
       * @request POST:/repos/{owner}/{repo}/forks
       * @secure
       */
      createFork: (owner, repo, body, params = {}) => this.request(__spreadValues({
        path: `/repos/${owner}/${repo}/forks`,
        method: "POST",
        body,
        secure: true,
        type: "application/json" /* Json */
      }, params)),
      /**
       * No description
       *
       * @tags repository
       * @name GetBlob
       * @summary Gets the blob of a repository.
       * @request GET:/repos/{owner}/{repo}/git/blobs/{sha}
       * @secure
       */
      getBlob: (owner, repo, sha, params = {}) => this.request(__spreadValues({
        path: `/repos/${owner}/${repo}/git/blobs/${sha}`,
        method: "GET",
        secure: true
      }, params)),
      /**
       * No description
       *
       * @tags repository
       * @name RepoGetSingleCommit
       * @summary Get a single commit from a repository
       * @request GET:/repos/{owner}/{repo}/git/commits/{sha}
       * @secure
       */
      repoGetSingleCommit: (owner, repo, sha, query, params = {}) => this.request(__spreadValues({
        path: `/repos/${owner}/${repo}/git/commits/${sha}`,
        method: "GET",
        query,
        secure: true
      }, params)),
      /**
       * No description
       *
       * @tags repository
       * @name RepoDownloadCommitDiffOrPatch
       * @summary Get a commit's diff or patch
       * @request GET:/repos/{owner}/{repo}/git/commits/{sha}.{diffType}
       * @secure
       */
      repoDownloadCommitDiffOrPatch: (owner, repo, sha, diffType, params = {}) => this.request(__spreadValues({
        path: `/repos/${owner}/${repo}/git/commits/${sha}.${diffType}`,
        method: "GET",
        secure: true
      }, params)),
      /**
       * No description
       *
       * @tags repository
       * @name RepoGetNote
       * @summary Get a note corresponding to a single commit from a repository
       * @request GET:/repos/{owner}/{repo}/git/notes/{sha}
       * @secure
       */
      repoGetNote: (owner, repo, sha, query, params = {}) => this.request(__spreadValues({
        path: `/repos/${owner}/${repo}/git/notes/${sha}`,
        method: "GET",
        query,
        secure: true
      }, params)),
      /**
       * No description
       *
       * @tags repository
       * @name RepoListAllGitRefs
       * @summary Get specified ref or filtered repository's refs
       * @request GET:/repos/{owner}/{repo}/git/refs
       * @secure
       */
      repoListAllGitRefs: (owner, repo, params = {}) => this.request(__spreadValues({
        path: `/repos/${owner}/${repo}/git/refs`,
        method: "GET",
        secure: true
      }, params)),
      /**
       * No description
       *
       * @tags repository
       * @name RepoListGitRefs
       * @summary Get specified ref or filtered repository's refs
       * @request GET:/repos/{owner}/{repo}/git/refs/{ref}
       * @secure
       */
      repoListGitRefs: (owner, repo, ref, params = {}) => this.request(__spreadValues({
        path: `/repos/${owner}/${repo}/git/refs/${ref}`,
        method: "GET",
        secure: true
      }, params)),
      /**
       * No description
       *
       * @tags repository
       * @name GetAnnotatedTag
       * @summary Gets the tag object of an annotated tag (not lightweight tags)
       * @request GET:/repos/{owner}/{repo}/git/tags/{sha}
       * @secure
       */
      getAnnotatedTag: (owner, repo, sha, params = {}) => this.request(__spreadValues({
        path: `/repos/${owner}/${repo}/git/tags/${sha}`,
        method: "GET",
        secure: true
      }, params)),
      /**
       * No description
       *
       * @tags repository
       * @name GetTree
       * @summary Gets the tree of a repository.
       * @request GET:/repos/{owner}/{repo}/git/trees/{sha}
       * @secure
       */
      getTree: (owner, repo, sha, query, params = {}) => this.request(__spreadValues({
        path: `/repos/${owner}/${repo}/git/trees/${sha}`,
        method: "GET",
        query,
        secure: true
      }, params)),
      /**
       * No description
       *
       * @tags repository
       * @name RepoListHooks
       * @summary List the hooks in a repository
       * @request GET:/repos/{owner}/{repo}/hooks
       * @secure
       */
      repoListHooks: (owner, repo, query, params = {}) => this.request(__spreadValues({
        path: `/repos/${owner}/${repo}/hooks`,
        method: "GET",
        query,
        secure: true
      }, params)),
      /**
       * No description
       *
       * @tags repository
       * @name RepoCreateHook
       * @summary Create a hook
       * @request POST:/repos/{owner}/{repo}/hooks
       * @secure
       */
      repoCreateHook: (owner, repo, body, params = {}) => this.request(__spreadValues({
        path: `/repos/${owner}/${repo}/hooks`,
        method: "POST",
        body,
        secure: true,
        type: "application/json" /* Json */
      }, params)),
      /**
       * No description
       *
       * @tags repository
       * @name RepoListGitHooks
       * @summary List the Git hooks in a repository
       * @request GET:/repos/{owner}/{repo}/hooks/git
       * @secure
       */
      repoListGitHooks: (owner, repo, params = {}) => this.request(__spreadValues({
        path: `/repos/${owner}/${repo}/hooks/git`,
        method: "GET",
        secure: true
      }, params)),
      /**
       * No description
       *
       * @tags repository
       * @name RepoGetGitHook
       * @summary Get a Git hook
       * @request GET:/repos/{owner}/{repo}/hooks/git/{id}
       * @secure
       */
      repoGetGitHook: (owner, repo, id, params = {}) => this.request(__spreadValues({
        path: `/repos/${owner}/${repo}/hooks/git/${id}`,
        method: "GET",
        secure: true
      }, params)),
      /**
       * No description
       *
       * @tags repository
       * @name RepoDeleteGitHook
       * @summary Delete a Git hook in a repository
       * @request DELETE:/repos/{owner}/{repo}/hooks/git/{id}
       * @secure
       */
      repoDeleteGitHook: (owner, repo, id, params = {}) => this.request(__spreadValues({
        path: `/repos/${owner}/${repo}/hooks/git/${id}`,
        method: "DELETE",
        secure: true
      }, params)),
      /**
       * No description
       *
       * @tags repository
       * @name RepoEditGitHook
       * @summary Edit a Git hook in a repository
       * @request PATCH:/repos/{owner}/{repo}/hooks/git/{id}
       * @secure
       */
      repoEditGitHook: (owner, repo, id, body, params = {}) => this.request(__spreadValues({
        path: `/repos/${owner}/${repo}/hooks/git/${id}`,
        method: "PATCH",
        body,
        secure: true,
        type: "application/json" /* Json */
      }, params)),
      /**
       * No description
       *
       * @tags repository
       * @name RepoGetHook
       * @summary Get a hook
       * @request GET:/repos/{owner}/{repo}/hooks/{id}
       * @secure
       */
      repoGetHook: (owner, repo, id, params = {}) => this.request(__spreadValues({
        path: `/repos/${owner}/${repo}/hooks/${id}`,
        method: "GET",
        secure: true
      }, params)),
      /**
       * No description
       *
       * @tags repository
       * @name RepoDeleteHook
       * @summary Delete a hook in a repository
       * @request DELETE:/repos/{owner}/{repo}/hooks/{id}
       * @secure
       */
      repoDeleteHook: (owner, repo, id, params = {}) => this.request(__spreadValues({
        path: `/repos/${owner}/${repo}/hooks/${id}`,
        method: "DELETE",
        secure: true
      }, params)),
      /**
       * No description
       *
       * @tags repository
       * @name RepoEditHook
       * @summary Edit a hook in a repository
       * @request PATCH:/repos/{owner}/{repo}/hooks/{id}
       * @secure
       */
      repoEditHook: (owner, repo, id, body, params = {}) => this.request(__spreadValues({
        path: `/repos/${owner}/${repo}/hooks/${id}`,
        method: "PATCH",
        body,
        secure: true,
        type: "application/json" /* Json */
      }, params)),
      /**
       * No description
       *
       * @tags repository
       * @name RepoTestHook
       * @summary Test a push webhook
       * @request POST:/repos/{owner}/{repo}/hooks/{id}/tests
       * @secure
       */
      repoTestHook: (owner, repo, id, query, params = {}) => this.request(__spreadValues({
        path: `/repos/${owner}/${repo}/hooks/${id}/tests`,
        method: "POST",
        query,
        secure: true
      }, params)),
      /**
       * No description
       *
       * @tags repository
       * @name RepoGetIssueConfig
       * @summary Returns the issue config for a repo
       * @request GET:/repos/{owner}/{repo}/issue_config
       * @secure
       */
      repoGetIssueConfig: (owner, repo, params = {}) => this.request(__spreadValues({
        path: `/repos/${owner}/${repo}/issue_config`,
        method: "GET",
        secure: true
      }, params)),
      /**
       * No description
       *
       * @tags repository
       * @name RepoValidateIssueConfig
       * @summary Returns the validation information for a issue config
       * @request GET:/repos/{owner}/{repo}/issue_config/validate
       * @secure
       */
      repoValidateIssueConfig: (owner, repo, params = {}) => this.request(__spreadValues({
        path: `/repos/${owner}/${repo}/issue_config/validate`,
        method: "GET",
        secure: true
      }, params)),
      /**
       * No description
       *
       * @tags repository
       * @name RepoGetIssueTemplates
       * @summary Get available issue templates for a repository
       * @request GET:/repos/{owner}/{repo}/issue_templates
       * @secure
       */
      repoGetIssueTemplates: (owner, repo, params = {}) => this.request(__spreadValues({
        path: `/repos/${owner}/${repo}/issue_templates`,
        method: "GET",
        secure: true
      }, params)),
      /**
       * No description
       *
       * @tags issue
       * @name IssueListIssues
       * @summary List a repository's issues
       * @request GET:/repos/{owner}/{repo}/issues
       * @secure
       */
      issueListIssues: (owner, repo, query, params = {}) => this.request(__spreadValues({
        path: `/repos/${owner}/${repo}/issues`,
        method: "GET",
        query,
        secure: true
      }, params)),
      /**
       * No description
       *
       * @tags issue
       * @name IssueCreateIssue
       * @summary Create an issue. If using deadline only the date will be taken into account, and time of day ignored.
       * @request POST:/repos/{owner}/{repo}/issues
       * @secure
       */
      issueCreateIssue: (owner, repo, body, params = {}) => this.request(__spreadValues({
        path: `/repos/${owner}/${repo}/issues`,
        method: "POST",
        body,
        secure: true,
        type: "application/json" /* Json */
      }, params)),
      /**
       * No description
       *
       * @tags issue
       * @name IssueGetRepoComments
       * @summary List all comments in a repository
       * @request GET:/repos/{owner}/{repo}/issues/comments
       * @secure
       */
      issueGetRepoComments: (owner, repo, query, params = {}) => this.request(__spreadValues({
        path: `/repos/${owner}/${repo}/issues/comments`,
        method: "GET",
        query,
        secure: true
      }, params)),
      /**
       * No description
       *
       * @tags issue
       * @name IssueGetComment
       * @summary Get a comment
       * @request GET:/repos/{owner}/{repo}/issues/comments/{id}
       * @secure
       */
      issueGetComment: (owner, repo, id, params = {}) => this.request(__spreadValues({
        path: `/repos/${owner}/${repo}/issues/comments/${id}`,
        method: "GET",
        secure: true,
        type: "application/json" /* Json */
      }, params)),
      /**
       * No description
       *
       * @tags issue
       * @name IssueDeleteComment
       * @summary Delete a comment
       * @request DELETE:/repos/{owner}/{repo}/issues/comments/{id}
       * @secure
       */
      issueDeleteComment: (owner, repo, id, params = {}) => this.request(__spreadValues({
        path: `/repos/${owner}/${repo}/issues/comments/${id}`,
        method: "DELETE",
        secure: true
      }, params)),
      /**
       * No description
       *
       * @tags issue
       * @name IssueEditComment
       * @summary Edit a comment
       * @request PATCH:/repos/{owner}/{repo}/issues/comments/{id}
       * @secure
       */
      issueEditComment: (owner, repo, id, body, params = {}) => this.request(__spreadValues({
        path: `/repos/${owner}/${repo}/issues/comments/${id}`,
        method: "PATCH",
        body,
        secure: true,
        type: "application/json" /* Json */
      }, params)),
      /**
       * No description
       *
       * @tags issue
       * @name IssueListIssueCommentAttachments
       * @summary List comment's attachments
       * @request GET:/repos/{owner}/{repo}/issues/comments/{id}/assets
       * @secure
       */
      issueListIssueCommentAttachments: (owner, repo, id, params = {}) => this.request(__spreadValues({
        path: `/repos/${owner}/${repo}/issues/comments/${id}/assets`,
        method: "GET",
        secure: true
      }, params)),
      /**
       * No description
       *
       * @tags issue
       * @name IssueCreateIssueCommentAttachment
       * @summary Create a comment attachment
       * @request POST:/repos/{owner}/{repo}/issues/comments/{id}/assets
       * @secure
       */
      issueCreateIssueCommentAttachment: (owner, repo, id, data, query, params = {}) => this.request(__spreadValues({
        path: `/repos/${owner}/${repo}/issues/comments/${id}/assets`,
        method: "POST",
        query,
        body: data,
        secure: true,
        type: "multipart/form-data" /* FormData */
      }, params)),
      /**
       * No description
       *
       * @tags issue
       * @name IssueGetIssueCommentAttachment
       * @summary Get a comment attachment
       * @request GET:/repos/{owner}/{repo}/issues/comments/{id}/assets/{attachment_id}
       * @secure
       */
      issueGetIssueCommentAttachment: (owner, repo, id, attachmentId, params = {}) => this.request(__spreadValues({
        path: `/repos/${owner}/${repo}/issues/comments/${id}/assets/${attachmentId}`,
        method: "GET",
        secure: true
      }, params)),
      /**
       * No description
       *
       * @tags issue
       * @name IssueDeleteIssueCommentAttachment
       * @summary Delete a comment attachment
       * @request DELETE:/repos/{owner}/{repo}/issues/comments/{id}/assets/{attachment_id}
       * @secure
       */
      issueDeleteIssueCommentAttachment: (owner, repo, id, attachmentId, params = {}) => this.request(__spreadValues({
        path: `/repos/${owner}/${repo}/issues/comments/${id}/assets/${attachmentId}`,
        method: "DELETE",
        secure: true
      }, params)),
      /**
       * No description
       *
       * @tags issue
       * @name IssueEditIssueCommentAttachment
       * @summary Edit a comment attachment
       * @request PATCH:/repos/{owner}/{repo}/issues/comments/{id}/assets/{attachment_id}
       * @secure
       */
      issueEditIssueCommentAttachment: (owner, repo, id, attachmentId, body, params = {}) => this.request(__spreadValues({
        path: `/repos/${owner}/${repo}/issues/comments/${id}/assets/${attachmentId}`,
        method: "PATCH",
        body,
        secure: true,
        type: "application/json" /* Json */
      }, params)),
      /**
       * No description
       *
       * @tags issue
       * @name IssueGetCommentReactions
       * @summary Get a list of reactions from a comment of an issue
       * @request GET:/repos/{owner}/{repo}/issues/comments/{id}/reactions
       * @secure
       */
      issueGetCommentReactions: (owner, repo, id, params = {}) => this.request(__spreadValues({
        path: `/repos/${owner}/${repo}/issues/comments/${id}/reactions`,
        method: "GET",
        secure: true,
        type: "application/json" /* Json */
      }, params)),
      /**
       * No description
       *
       * @tags issue
       * @name IssuePostCommentReaction
       * @summary Add a reaction to a comment of an issue
       * @request POST:/repos/{owner}/{repo}/issues/comments/{id}/reactions
       * @secure
       */
      issuePostCommentReaction: (owner, repo, id, content, params = {}) => this.request(__spreadValues({
        path: `/repos/${owner}/${repo}/issues/comments/${id}/reactions`,
        method: "POST",
        body: content,
        secure: true,
        type: "application/json" /* Json */
      }, params)),
      /**
       * No description
       *
       * @tags issue
       * @name IssueDeleteCommentReaction
       * @summary Remove a reaction from a comment of an issue
       * @request DELETE:/repos/{owner}/{repo}/issues/comments/{id}/reactions
       * @secure
       */
      issueDeleteCommentReaction: (owner, repo, id, content, params = {}) => this.request(__spreadValues({
        path: `/repos/${owner}/${repo}/issues/comments/${id}/reactions`,
        method: "DELETE",
        body: content,
        secure: true,
        type: "application/json" /* Json */
      }, params)),
      /**
       * No description
       *
       * @tags repository
       * @name RepoListPinnedIssues
       * @summary List a repo's pinned issues
       * @request GET:/repos/{owner}/{repo}/issues/pinned
       * @secure
       */
      repoListPinnedIssues: (owner, repo, params = {}) => this.request(__spreadValues({
        path: `/repos/${owner}/${repo}/issues/pinned`,
        method: "GET",
        secure: true
      }, params)),
      /**
       * No description
       *
       * @tags issue
       * @name IssueGetIssue
       * @summary Get an issue
       * @request GET:/repos/{owner}/{repo}/issues/{index}
       * @secure
       */
      issueGetIssue: (owner, repo, index, params = {}) => this.request(__spreadValues({
        path: `/repos/${owner}/${repo}/issues/${index}`,
        method: "GET",
        secure: true
      }, params)),
      /**
       * No description
       *
       * @tags issue
       * @name IssueDelete
       * @summary Delete an issue
       * @request DELETE:/repos/{owner}/{repo}/issues/{index}
       * @secure
       */
      issueDelete: (owner, repo, index, params = {}) => this.request(__spreadValues({
        path: `/repos/${owner}/${repo}/issues/${index}`,
        method: "DELETE",
        secure: true
      }, params)),
      /**
       * No description
       *
       * @tags issue
       * @name IssueEditIssue
       * @summary Edit an issue. If using deadline only the date will be taken into account, and time of day ignored.
       * @request PATCH:/repos/{owner}/{repo}/issues/{index}
       * @secure
       */
      issueEditIssue: (owner, repo, index, body, params = {}) => this.request(__spreadValues({
        path: `/repos/${owner}/${repo}/issues/${index}`,
        method: "PATCH",
        body,
        secure: true,
        type: "application/json" /* Json */
      }, params)),
      /**
       * No description
       *
       * @tags issue
       * @name IssueListIssueAttachments
       * @summary List issue's attachments
       * @request GET:/repos/{owner}/{repo}/issues/{index}/assets
       * @secure
       */
      issueListIssueAttachments: (owner, repo, index, params = {}) => this.request(__spreadValues({
        path: `/repos/${owner}/${repo}/issues/${index}/assets`,
        method: "GET",
        secure: true
      }, params)),
      /**
       * No description
       *
       * @tags issue
       * @name IssueCreateIssueAttachment
       * @summary Create an issue attachment
       * @request POST:/repos/{owner}/{repo}/issues/{index}/assets
       * @secure
       */
      issueCreateIssueAttachment: (owner, repo, index, data, query, params = {}) => this.request(__spreadValues({
        path: `/repos/${owner}/${repo}/issues/${index}/assets`,
        method: "POST",
        query,
        body: data,
        secure: true,
        type: "multipart/form-data" /* FormData */
      }, params)),
      /**
       * No description
       *
       * @tags issue
       * @name IssueGetIssueAttachment
       * @summary Get an issue attachment
       * @request GET:/repos/{owner}/{repo}/issues/{index}/assets/{attachment_id}
       * @secure
       */
      issueGetIssueAttachment: (owner, repo, index, attachmentId, params = {}) => this.request(__spreadValues({
        path: `/repos/${owner}/${repo}/issues/${index}/assets/${attachmentId}`,
        method: "GET",
        secure: true
      }, params)),
      /**
       * No description
       *
       * @tags issue
       * @name IssueDeleteIssueAttachment
       * @summary Delete an issue attachment
       * @request DELETE:/repos/{owner}/{repo}/issues/{index}/assets/{attachment_id}
       * @secure
       */
      issueDeleteIssueAttachment: (owner, repo, index, attachmentId, params = {}) => this.request(__spreadValues({
        path: `/repos/${owner}/${repo}/issues/${index}/assets/${attachmentId}`,
        method: "DELETE",
        secure: true
      }, params)),
      /**
       * No description
       *
       * @tags issue
       * @name IssueEditIssueAttachment
       * @summary Edit an issue attachment
       * @request PATCH:/repos/{owner}/{repo}/issues/{index}/assets/{attachment_id}
       * @secure
       */
      issueEditIssueAttachment: (owner, repo, index, attachmentId, body, params = {}) => this.request(__spreadValues({
        path: `/repos/${owner}/${repo}/issues/${index}/assets/${attachmentId}`,
        method: "PATCH",
        body,
        secure: true,
        type: "application/json" /* Json */
      }, params)),
      /**
       * No description
       *
       * @tags issue
       * @name IssueListBlocks
       * @summary List issues that are blocked by this issue
       * @request GET:/repos/{owner}/{repo}/issues/{index}/blocks
       * @secure
       */
      issueListBlocks: (owner, repo, index, query, params = {}) => this.request(__spreadValues({
        path: `/repos/${owner}/${repo}/issues/${index}/blocks`,
        method: "GET",
        query,
        secure: true
      }, params)),
      /**
       * No description
       *
       * @tags issue
       * @name IssueCreateIssueBlocking
       * @summary Block the issue given in the body by the issue in path
       * @request POST:/repos/{owner}/{repo}/issues/{index}/blocks
       * @secure
       */
      issueCreateIssueBlocking: (owner, repo, index, body, params = {}) => this.request(__spreadValues({
        path: `/repos/${owner}/${repo}/issues/${index}/blocks`,
        method: "POST",
        body,
        secure: true
      }, params)),
      /**
       * No description
       *
       * @tags issue
       * @name IssueRemoveIssueBlocking
       * @summary Unblock the issue given in the body by the issue in path
       * @request DELETE:/repos/{owner}/{repo}/issues/{index}/blocks
       * @secure
       */
      issueRemoveIssueBlocking: (owner, repo, index, body, params = {}) => this.request(__spreadValues({
        path: `/repos/${owner}/${repo}/issues/${index}/blocks`,
        method: "DELETE",
        body,
        secure: true
      }, params)),
      /**
       * No description
       *
       * @tags issue
       * @name IssueGetComments
       * @summary List all comments on an issue
       * @request GET:/repos/{owner}/{repo}/issues/{index}/comments
       * @secure
       */
      issueGetComments: (owner, repo, index, query, params = {}) => this.request(__spreadValues({
        path: `/repos/${owner}/${repo}/issues/${index}/comments`,
        method: "GET",
        query,
        secure: true
      }, params)),
      /**
       * No description
       *
       * @tags issue
       * @name IssueCreateComment
       * @summary Add a comment to an issue
       * @request POST:/repos/{owner}/{repo}/issues/{index}/comments
       * @secure
       */
      issueCreateComment: (owner, repo, index, body, params = {}) => this.request(__spreadValues({
        path: `/repos/${owner}/${repo}/issues/${index}/comments`,
        method: "POST",
        body,
        secure: true,
        type: "application/json" /* Json */
      }, params)),
      /**
       * No description
       *
       * @tags issue
       * @name IssueDeleteCommentDeprecated
       * @summary Delete a comment
       * @request DELETE:/repos/{owner}/{repo}/issues/{index}/comments/{id}
       * @deprecated
       * @secure
       */
      issueDeleteCommentDeprecated: (owner, repo, index, id, params = {}) => this.request(__spreadValues({
        path: `/repos/${owner}/${repo}/issues/${index}/comments/${id}`,
        method: "DELETE",
        secure: true
      }, params)),
      /**
       * No description
       *
       * @tags issue
       * @name IssueEditCommentDeprecated
       * @summary Edit a comment
       * @request PATCH:/repos/{owner}/{repo}/issues/{index}/comments/{id}
       * @deprecated
       * @secure
       */
      issueEditCommentDeprecated: (owner, repo, index, id, body, params = {}) => this.request(__spreadValues({
        path: `/repos/${owner}/${repo}/issues/${index}/comments/${id}`,
        method: "PATCH",
        body,
        secure: true,
        type: "application/json" /* Json */
      }, params)),
      /**
       * No description
       *
       * @tags issue
       * @name IssueEditIssueDeadline
       * @summary Set an issue deadline. If set to null, the deadline is deleted. If using deadline only the date will be taken into account, and time of day ignored.
       * @request POST:/repos/{owner}/{repo}/issues/{index}/deadline
       * @secure
       */
      issueEditIssueDeadline: (owner, repo, index, body, params = {}) => this.request(__spreadValues({
        path: `/repos/${owner}/${repo}/issues/${index}/deadline`,
        method: "POST",
        body,
        secure: true,
        type: "application/json" /* Json */
      }, params)),
      /**
       * No description
       *
       * @tags issue
       * @name IssueListIssueDependencies
       * @summary List an issue's dependencies, i.e all issues that block this issue.
       * @request GET:/repos/{owner}/{repo}/issues/{index}/dependencies
       * @secure
       */
      issueListIssueDependencies: (owner, repo, index, query, params = {}) => this.request(__spreadValues({
        path: `/repos/${owner}/${repo}/issues/${index}/dependencies`,
        method: "GET",
        query,
        secure: true
      }, params)),
      /**
       * No description
       *
       * @tags issue
       * @name IssueCreateIssueDependencies
       * @summary Make the issue in the url depend on the issue in the form.
       * @request POST:/repos/{owner}/{repo}/issues/{index}/dependencies
       * @secure
       */
      issueCreateIssueDependencies: (owner, repo, index, body, params = {}) => this.request(__spreadValues({
        path: `/repos/${owner}/${repo}/issues/${index}/dependencies`,
        method: "POST",
        body,
        secure: true
      }, params)),
      /**
       * No description
       *
       * @tags issue
       * @name IssueRemoveIssueDependencies
       * @summary Remove an issue dependency
       * @request DELETE:/repos/{owner}/{repo}/issues/{index}/dependencies
       * @secure
       */
      issueRemoveIssueDependencies: (owner, repo, index, body, params = {}) => this.request(__spreadValues({
        path: `/repos/${owner}/${repo}/issues/${index}/dependencies`,
        method: "DELETE",
        body,
        secure: true
      }, params)),
      /**
       * No description
       *
       * @tags issue
       * @name IssueGetLabels
       * @summary Get an issue's labels
       * @request GET:/repos/{owner}/{repo}/issues/{index}/labels
       * @secure
       */
      issueGetLabels: (owner, repo, index, params = {}) => this.request(__spreadValues({
        path: `/repos/${owner}/${repo}/issues/${index}/labels`,
        method: "GET",
        secure: true
      }, params)),
      /**
       * No description
       *
       * @tags issue
       * @name IssueReplaceLabels
       * @summary Replace an issue's labels
       * @request PUT:/repos/{owner}/{repo}/issues/{index}/labels
       * @secure
       */
      issueReplaceLabels: (owner, repo, index, body, params = {}) => this.request(__spreadValues({
        path: `/repos/${owner}/${repo}/issues/${index}/labels`,
        method: "PUT",
        body,
        secure: true,
        type: "application/json" /* Json */
      }, params)),
      /**
       * No description
       *
       * @tags issue
       * @name IssueAddLabel
       * @summary Add a label to an issue
       * @request POST:/repos/{owner}/{repo}/issues/{index}/labels
       * @secure
       */
      issueAddLabel: (owner, repo, index, body, params = {}) => this.request(__spreadValues({
        path: `/repos/${owner}/${repo}/issues/${index}/labels`,
        method: "POST",
        body,
        secure: true,
        type: "application/json" /* Json */
      }, params)),
      /**
       * No description
       *
       * @tags issue
       * @name IssueClearLabels
       * @summary Remove all labels from an issue
       * @request DELETE:/repos/{owner}/{repo}/issues/{index}/labels
       * @secure
       */
      issueClearLabels: (owner, repo, index, params = {}) => this.request(__spreadValues({
        path: `/repos/${owner}/${repo}/issues/${index}/labels`,
        method: "DELETE",
        secure: true
      }, params)),
      /**
       * No description
       *
       * @tags issue
       * @name IssueRemoveLabel
       * @summary Remove a label from an issue
       * @request DELETE:/repos/{owner}/{repo}/issues/{index}/labels/{id}
       * @secure
       */
      issueRemoveLabel: (owner, repo, index, id, params = {}) => this.request(__spreadValues({
        path: `/repos/${owner}/${repo}/issues/${index}/labels/${id}`,
        method: "DELETE",
        secure: true
      }, params)),
      /**
       * No description
       *
       * @tags issue
       * @name PinIssue
       * @summary Pin an Issue
       * @request POST:/repos/{owner}/{repo}/issues/{index}/pin
       * @secure
       */
      pinIssue: (owner, repo, index, params = {}) => this.request(__spreadValues({
        path: `/repos/${owner}/${repo}/issues/${index}/pin`,
        method: "POST",
        secure: true
      }, params)),
      /**
       * No description
       *
       * @tags issue
       * @name UnpinIssue
       * @summary Unpin an Issue
       * @request DELETE:/repos/{owner}/{repo}/issues/{index}/pin
       * @secure
       */
      unpinIssue: (owner, repo, index, params = {}) => this.request(__spreadValues({
        path: `/repos/${owner}/${repo}/issues/${index}/pin`,
        method: "DELETE",
        secure: true
      }, params)),
      /**
       * No description
       *
       * @tags issue
       * @name MoveIssuePin
       * @summary Moves the Pin to the given Position
       * @request PATCH:/repos/{owner}/{repo}/issues/{index}/pin/{position}
       * @secure
       */
      moveIssuePin: (owner, repo, index, position, params = {}) => this.request(__spreadValues({
        path: `/repos/${owner}/${repo}/issues/${index}/pin/${position}`,
        method: "PATCH",
        secure: true
      }, params)),
      /**
       * No description
       *
       * @tags issue
       * @name IssueGetIssueReactions
       * @summary Get a list reactions of an issue
       * @request GET:/repos/{owner}/{repo}/issues/{index}/reactions
       * @secure
       */
      issueGetIssueReactions: (owner, repo, index, query, params = {}) => this.request(__spreadValues({
        path: `/repos/${owner}/${repo}/issues/${index}/reactions`,
        method: "GET",
        query,
        secure: true,
        type: "application/json" /* Json */
      }, params)),
      /**
       * No description
       *
       * @tags issue
       * @name IssuePostIssueReaction
       * @summary Add a reaction to an issue
       * @request POST:/repos/{owner}/{repo}/issues/{index}/reactions
       * @secure
       */
      issuePostIssueReaction: (owner, repo, index, content, params = {}) => this.request(__spreadValues({
        path: `/repos/${owner}/${repo}/issues/${index}/reactions`,
        method: "POST",
        body: content,
        secure: true,
        type: "application/json" /* Json */
      }, params)),
      /**
       * No description
       *
       * @tags issue
       * @name IssueDeleteIssueReaction
       * @summary Remove a reaction from an issue
       * @request DELETE:/repos/{owner}/{repo}/issues/{index}/reactions
       * @secure
       */
      issueDeleteIssueReaction: (owner, repo, index, content, params = {}) => this.request(__spreadValues({
        path: `/repos/${owner}/${repo}/issues/${index}/reactions`,
        method: "DELETE",
        body: content,
        secure: true,
        type: "application/json" /* Json */
      }, params)),
      /**
       * No description
       *
       * @tags issue
       * @name IssueDeleteStopWatch
       * @summary Delete an issue's existing stopwatch.
       * @request DELETE:/repos/{owner}/{repo}/issues/{index}/stopwatch/delete
       * @secure
       */
      issueDeleteStopWatch: (owner, repo, index, params = {}) => this.request(__spreadValues({
        path: `/repos/${owner}/${repo}/issues/${index}/stopwatch/delete`,
        method: "DELETE",
        secure: true,
        type: "application/json" /* Json */
      }, params)),
      /**
       * No description
       *
       * @tags issue
       * @name IssueStartStopWatch
       * @summary Start stopwatch on an issue.
       * @request POST:/repos/{owner}/{repo}/issues/{index}/stopwatch/start
       * @secure
       */
      issueStartStopWatch: (owner, repo, index, params = {}) => this.request(__spreadValues({
        path: `/repos/${owner}/${repo}/issues/${index}/stopwatch/start`,
        method: "POST",
        secure: true,
        type: "application/json" /* Json */
      }, params)),
      /**
       * No description
       *
       * @tags issue
       * @name IssueStopStopWatch
       * @summary Stop an issue's existing stopwatch.
       * @request POST:/repos/{owner}/{repo}/issues/{index}/stopwatch/stop
       * @secure
       */
      issueStopStopWatch: (owner, repo, index, params = {}) => this.request(__spreadValues({
        path: `/repos/${owner}/${repo}/issues/${index}/stopwatch/stop`,
        method: "POST",
        secure: true,
        type: "application/json" /* Json */
      }, params)),
      /**
       * No description
       *
       * @tags issue
       * @name IssueSubscriptions
       * @summary Get users who subscribed on an issue.
       * @request GET:/repos/{owner}/{repo}/issues/{index}/subscriptions
       * @secure
       */
      issueSubscriptions: (owner, repo, index, query, params = {}) => this.request(__spreadValues({
        path: `/repos/${owner}/${repo}/issues/${index}/subscriptions`,
        method: "GET",
        query,
        secure: true,
        type: "application/json" /* Json */
      }, params)),
      /**
       * No description
       *
       * @tags issue
       * @name IssueCheckSubscription
       * @summary Check if user is subscribed to an issue
       * @request GET:/repos/{owner}/{repo}/issues/{index}/subscriptions/check
       * @secure
       */
      issueCheckSubscription: (owner, repo, index, params = {}) => this.request(__spreadValues({
        path: `/repos/${owner}/${repo}/issues/${index}/subscriptions/check`,
        method: "GET",
        secure: true,
        type: "application/json" /* Json */
      }, params)),
      /**
       * No description
       *
       * @tags issue
       * @name IssueAddSubscription
       * @summary Subscribe user to issue
       * @request PUT:/repos/{owner}/{repo}/issues/{index}/subscriptions/{user}
       * @secure
       */
      issueAddSubscription: (owner, repo, index, user, params = {}) => this.request(__spreadValues({
        path: `/repos/${owner}/${repo}/issues/${index}/subscriptions/${user}`,
        method: "PUT",
        secure: true,
        type: "application/json" /* Json */
      }, params)),
      /**
       * No description
       *
       * @tags issue
       * @name IssueDeleteSubscription
       * @summary Unsubscribe user from issue
       * @request DELETE:/repos/{owner}/{repo}/issues/{index}/subscriptions/{user}
       * @secure
       */
      issueDeleteSubscription: (owner, repo, index, user, params = {}) => this.request(__spreadValues({
        path: `/repos/${owner}/${repo}/issues/${index}/subscriptions/${user}`,
        method: "DELETE",
        secure: true,
        type: "application/json" /* Json */
      }, params)),
      /**
       * No description
       *
       * @tags issue
       * @name IssueGetCommentsAndTimeline
       * @summary List all comments and events on an issue
       * @request GET:/repos/{owner}/{repo}/issues/{index}/timeline
       * @secure
       */
      issueGetCommentsAndTimeline: (owner, repo, index, query, params = {}) => this.request(__spreadValues({
        path: `/repos/${owner}/${repo}/issues/${index}/timeline`,
        method: "GET",
        query,
        secure: true
      }, params)),
      /**
       * No description
       *
       * @tags issue
       * @name IssueTrackedTimes
       * @summary List an issue's tracked times
       * @request GET:/repos/{owner}/{repo}/issues/{index}/times
       * @secure
       */
      issueTrackedTimes: (owner, repo, index, query, params = {}) => this.request(__spreadValues({
        path: `/repos/${owner}/${repo}/issues/${index}/times`,
        method: "GET",
        query,
        secure: true
      }, params)),
      /**
       * No description
       *
       * @tags issue
       * @name IssueAddTime
       * @summary Add tracked time to a issue
       * @request POST:/repos/{owner}/{repo}/issues/{index}/times
       * @secure
       */
      issueAddTime: (owner, repo, index, body, params = {}) => this.request(__spreadValues({
        path: `/repos/${owner}/${repo}/issues/${index}/times`,
        method: "POST",
        body,
        secure: true,
        type: "application/json" /* Json */
      }, params)),
      /**
       * No description
       *
       * @tags issue
       * @name IssueResetTime
       * @summary Reset a tracked time of an issue
       * @request DELETE:/repos/{owner}/{repo}/issues/{index}/times
       * @secure
       */
      issueResetTime: (owner, repo, index, params = {}) => this.request(__spreadValues({
        path: `/repos/${owner}/${repo}/issues/${index}/times`,
        method: "DELETE",
        secure: true,
        type: "application/json" /* Json */
      }, params)),
      /**
       * No description
       *
       * @tags issue
       * @name IssueDeleteTime
       * @summary Delete specific tracked time
       * @request DELETE:/repos/{owner}/{repo}/issues/{index}/times/{id}
       * @secure
       */
      issueDeleteTime: (owner, repo, index, id, params = {}) => this.request(__spreadValues({
        path: `/repos/${owner}/${repo}/issues/${index}/times/${id}`,
        method: "DELETE",
        secure: true,
        type: "application/json" /* Json */
      }, params)),
      /**
       * No description
       *
       * @tags repository
       * @name RepoListKeys
       * @summary List a repository's keys
       * @request GET:/repos/{owner}/{repo}/keys
       * @secure
       */
      repoListKeys: (owner, repo, query, params = {}) => this.request(__spreadValues({
        path: `/repos/${owner}/${repo}/keys`,
        method: "GET",
        query,
        secure: true
      }, params)),
      /**
       * No description
       *
       * @tags repository
       * @name RepoCreateKey
       * @summary Add a key to a repository
       * @request POST:/repos/{owner}/{repo}/keys
       * @secure
       */
      repoCreateKey: (owner, repo, body, params = {}) => this.request(__spreadValues({
        path: `/repos/${owner}/${repo}/keys`,
        method: "POST",
        body,
        secure: true,
        type: "application/json" /* Json */
      }, params)),
      /**
       * No description
       *
       * @tags repository
       * @name RepoGetKey
       * @summary Get a repository's key by id
       * @request GET:/repos/{owner}/{repo}/keys/{id}
       * @secure
       */
      repoGetKey: (owner, repo, id, params = {}) => this.request(__spreadValues({
        path: `/repos/${owner}/${repo}/keys/${id}`,
        method: "GET",
        secure: true
      }, params)),
      /**
       * No description
       *
       * @tags repository
       * @name RepoDeleteKey
       * @summary Delete a key from a repository
       * @request DELETE:/repos/{owner}/{repo}/keys/{id}
       * @secure
       */
      repoDeleteKey: (owner, repo, id, params = {}) => this.request(__spreadValues({
        path: `/repos/${owner}/${repo}/keys/${id}`,
        method: "DELETE",
        secure: true
      }, params)),
      /**
       * No description
       *
       * @tags issue
       * @name IssueListLabels
       * @summary Get all of a repository's labels
       * @request GET:/repos/{owner}/{repo}/labels
       * @secure
       */
      issueListLabels: (owner, repo, query, params = {}) => this.request(__spreadValues({
        path: `/repos/${owner}/${repo}/labels`,
        method: "GET",
        query,
        secure: true
      }, params)),
      /**
       * No description
       *
       * @tags issue
       * @name IssueCreateLabel
       * @summary Create a label
       * @request POST:/repos/{owner}/{repo}/labels
       * @secure
       */
      issueCreateLabel: (owner, repo, body, params = {}) => this.request(__spreadValues({
        path: `/repos/${owner}/${repo}/labels`,
        method: "POST",
        body,
        secure: true,
        type: "application/json" /* Json */
      }, params)),
      /**
       * No description
       *
       * @tags issue
       * @name IssueGetLabel
       * @summary Get a single label
       * @request GET:/repos/{owner}/{repo}/labels/{id}
       * @secure
       */
      issueGetLabel: (owner, repo, id, params = {}) => this.request(__spreadValues({
        path: `/repos/${owner}/${repo}/labels/${id}`,
        method: "GET",
        secure: true
      }, params)),
      /**
       * No description
       *
       * @tags issue
       * @name IssueDeleteLabel
       * @summary Delete a label
       * @request DELETE:/repos/{owner}/{repo}/labels/{id}
       * @secure
       */
      issueDeleteLabel: (owner, repo, id, params = {}) => this.request(__spreadValues({
        path: `/repos/${owner}/${repo}/labels/${id}`,
        method: "DELETE",
        secure: true
      }, params)),
      /**
       * No description
       *
       * @tags issue
       * @name IssueEditLabel
       * @summary Update a label
       * @request PATCH:/repos/{owner}/{repo}/labels/{id}
       * @secure
       */
      issueEditLabel: (owner, repo, id, body, params = {}) => this.request(__spreadValues({
        path: `/repos/${owner}/${repo}/labels/${id}`,
        method: "PATCH",
        body,
        secure: true,
        type: "application/json" /* Json */
      }, params)),
      /**
       * No description
       *
       * @tags repository
       * @name RepoGetLanguages
       * @summary Get languages and number of bytes of code written
       * @request GET:/repos/{owner}/{repo}/languages
       * @secure
       */
      repoGetLanguages: (owner, repo, params = {}) => this.request(__spreadValues({
        path: `/repos/${owner}/${repo}/languages`,
        method: "GET",
        secure: true
      }, params)),
      /**
       * No description
       *
       * @tags repository
       * @name RepoGetRawFileOrLfs
       * @summary Get a file or it's LFS object from a repository
       * @request GET:/repos/{owner}/{repo}/media/{filepath}
       * @secure
       */
      repoGetRawFileOrLfs: (owner, repo, filepath, query, params = {}) => this.request(__spreadValues({
        path: `/repos/${owner}/${repo}/media/${filepath}`,
        method: "GET",
        query,
        secure: true
      }, params)),
      /**
       * No description
       *
       * @tags issue
       * @name IssueGetMilestonesList
       * @summary Get all of a repository's opened milestones
       * @request GET:/repos/{owner}/{repo}/milestones
       * @secure
       */
      issueGetMilestonesList: (owner, repo, query, params = {}) => this.request(__spreadValues({
        path: `/repos/${owner}/${repo}/milestones`,
        method: "GET",
        query,
        secure: true
      }, params)),
      /**
       * No description
       *
       * @tags issue
       * @name IssueCreateMilestone
       * @summary Create a milestone
       * @request POST:/repos/{owner}/{repo}/milestones
       * @secure
       */
      issueCreateMilestone: (owner, repo, body, params = {}) => this.request(__spreadValues({
        path: `/repos/${owner}/${repo}/milestones`,
        method: "POST",
        body,
        secure: true,
        type: "application/json" /* Json */
      }, params)),
      /**
       * No description
       *
       * @tags issue
       * @name IssueGetMilestone
       * @summary Get a milestone
       * @request GET:/repos/{owner}/{repo}/milestones/{id}
       * @secure
       */
      issueGetMilestone: (owner, repo, id, params = {}) => this.request(__spreadValues({
        path: `/repos/${owner}/${repo}/milestones/${id}`,
        method: "GET",
        secure: true
      }, params)),
      /**
       * No description
       *
       * @tags issue
       * @name IssueDeleteMilestone
       * @summary Delete a milestone
       * @request DELETE:/repos/{owner}/{repo}/milestones/{id}
       * @secure
       */
      issueDeleteMilestone: (owner, repo, id, params = {}) => this.request(__spreadValues({
        path: `/repos/${owner}/${repo}/milestones/${id}`,
        method: "DELETE",
        secure: true
      }, params)),
      /**
       * No description
       *
       * @tags issue
       * @name IssueEditMilestone
       * @summary Update a milestone
       * @request PATCH:/repos/{owner}/{repo}/milestones/{id}
       * @secure
       */
      issueEditMilestone: (owner, repo, id, body, params = {}) => this.request(__spreadValues({
        path: `/repos/${owner}/${repo}/milestones/${id}`,
        method: "PATCH",
        body,
        secure: true,
        type: "application/json" /* Json */
      }, params)),
      /**
       * No description
       *
       * @tags repository
       * @name RepoMirrorSync
       * @summary Sync a mirrored repository
       * @request POST:/repos/{owner}/{repo}/mirror-sync
       * @secure
       */
      repoMirrorSync: (owner, repo, params = {}) => this.request(__spreadValues({
        path: `/repos/${owner}/${repo}/mirror-sync`,
        method: "POST",
        secure: true
      }, params)),
      /**
       * No description
       *
       * @tags repository
       * @name RepoNewPinAllowed
       * @summary Returns if new Issue Pins are allowed
       * @request GET:/repos/{owner}/{repo}/new_pin_allowed
       * @secure
       */
      repoNewPinAllowed: (owner, repo, params = {}) => this.request(__spreadValues({
        path: `/repos/${owner}/${repo}/new_pin_allowed`,
        method: "GET",
        secure: true
      }, params)),
      /**
       * No description
       *
       * @tags notification
       * @name NotifyGetRepoList
       * @summary List users's notification threads on a specific repo
       * @request GET:/repos/{owner}/{repo}/notifications
       * @secure
       */
      notifyGetRepoList: (owner, repo, query, params = {}) => this.request(__spreadValues({
        path: `/repos/${owner}/${repo}/notifications`,
        method: "GET",
        query,
        secure: true,
        type: "application/json" /* Json */
      }, params)),
      /**
       * No description
       *
       * @tags notification
       * @name NotifyReadRepoList
       * @summary Mark notification threads as read, pinned or unread on a specific repo
       * @request PUT:/repos/{owner}/{repo}/notifications
       * @secure
       */
      notifyReadRepoList: (owner, repo, query, params = {}) => this.request(__spreadValues({
        path: `/repos/${owner}/${repo}/notifications`,
        method: "PUT",
        query,
        secure: true,
        type: "application/json" /* Json */
      }, params)),
      /**
       * No description
       *
       * @tags repository
       * @name RepoListPullRequests
       * @summary List a repo's pull requests
       * @request GET:/repos/{owner}/{repo}/pulls
       * @secure
       */
      repoListPullRequests: (owner, repo, query, params = {}) => this.request(__spreadValues({
        path: `/repos/${owner}/${repo}/pulls`,
        method: "GET",
        query,
        secure: true
      }, params)),
      /**
       * No description
       *
       * @tags repository
       * @name RepoCreatePullRequest
       * @summary Create a pull request
       * @request POST:/repos/{owner}/{repo}/pulls
       * @secure
       */
      repoCreatePullRequest: (owner, repo, body, params = {}) => this.request(__spreadValues({
        path: `/repos/${owner}/${repo}/pulls`,
        method: "POST",
        body,
        secure: true,
        type: "application/json" /* Json */
      }, params)),
      /**
       * No description
       *
       * @tags repository
       * @name RepoListPinnedPullRequests
       * @summary List a repo's pinned pull requests
       * @request GET:/repos/{owner}/{repo}/pulls/pinned
       * @secure
       */
      repoListPinnedPullRequests: (owner, repo, params = {}) => this.request(__spreadValues({
        path: `/repos/${owner}/${repo}/pulls/pinned`,
        method: "GET",
        secure: true
      }, params)),
      /**
       * No description
       *
       * @tags repository
       * @name RepoGetPullRequestByBaseHead
       * @summary Get a pull request by base and head
       * @request GET:/repos/{owner}/{repo}/pulls/{base}/{head}
       * @secure
       */
      repoGetPullRequestByBaseHead: (owner, repo, base, head, params = {}) => this.request(__spreadValues({
        path: `/repos/${owner}/${repo}/pulls/${base}/${head}`,
        method: "GET",
        secure: true
      }, params)),
      /**
       * No description
       *
       * @tags repository
       * @name RepoGetPullRequest
       * @summary Get a pull request
       * @request GET:/repos/{owner}/{repo}/pulls/{index}
       * @secure
       */
      repoGetPullRequest: (owner, repo, index, params = {}) => this.request(__spreadValues({
        path: `/repos/${owner}/${repo}/pulls/${index}`,
        method: "GET",
        secure: true
      }, params)),
      /**
       * No description
       *
       * @tags repository
       * @name RepoEditPullRequest
       * @summary Update a pull request. If using deadline only the date will be taken into account, and time of day ignored.
       * @request PATCH:/repos/{owner}/{repo}/pulls/{index}
       * @secure
       */
      repoEditPullRequest: (owner, repo, index, body, params = {}) => this.request(__spreadValues({
        path: `/repos/${owner}/${repo}/pulls/${index}`,
        method: "PATCH",
        body,
        secure: true,
        type: "application/json" /* Json */
      }, params)),
      /**
       * No description
       *
       * @tags repository
       * @name RepoDownloadPullDiffOrPatch
       * @summary Get a pull request diff or patch
       * @request GET:/repos/{owner}/{repo}/pulls/{index}.{diffType}
       * @secure
       */
      repoDownloadPullDiffOrPatch: (owner, repo, index, diffType, query, params = {}) => this.request(__spreadValues({
        path: `/repos/${owner}/${repo}/pulls/${index}.${diffType}`,
        method: "GET",
        query,
        secure: true
      }, params)),
      /**
       * No description
       *
       * @tags repository
       * @name RepoGetPullRequestCommits
       * @summary Get commits for a pull request
       * @request GET:/repos/{owner}/{repo}/pulls/{index}/commits
       * @secure
       */
      repoGetPullRequestCommits: (owner, repo, index, query, params = {}) => this.request(__spreadValues({
        path: `/repos/${owner}/${repo}/pulls/${index}/commits`,
        method: "GET",
        query,
        secure: true
      }, params)),
      /**
       * No description
       *
       * @tags repository
       * @name RepoGetPullRequestFiles
       * @summary Get changed files for a pull request
       * @request GET:/repos/{owner}/{repo}/pulls/{index}/files
       * @secure
       */
      repoGetPullRequestFiles: (owner, repo, index, query, params = {}) => this.request(__spreadValues({
        path: `/repos/${owner}/${repo}/pulls/${index}/files`,
        method: "GET",
        query,
        secure: true
      }, params)),
      /**
       * No description
       *
       * @tags repository
       * @name RepoPullRequestIsMerged
       * @summary Check if a pull request has been merged
       * @request GET:/repos/{owner}/{repo}/pulls/{index}/merge
       * @secure
       */
      repoPullRequestIsMerged: (owner, repo, index, params = {}) => this.request(__spreadValues({
        path: `/repos/${owner}/${repo}/pulls/${index}/merge`,
        method: "GET",
        secure: true
      }, params)),
      /**
       * No description
       *
       * @tags repository
       * @name RepoMergePullRequest
       * @summary Merge a pull request
       * @request POST:/repos/{owner}/{repo}/pulls/{index}/merge
       * @secure
       */
      repoMergePullRequest: (owner, repo, index, body, params = {}) => this.request(__spreadValues({
        path: `/repos/${owner}/${repo}/pulls/${index}/merge`,
        method: "POST",
        body,
        secure: true,
        type: "application/json" /* Json */
      }, params)),
      /**
       * No description
       *
       * @tags repository
       * @name RepoCancelScheduledAutoMerge
       * @summary Cancel the scheduled auto merge for the given pull request
       * @request DELETE:/repos/{owner}/{repo}/pulls/{index}/merge
       * @secure
       */
      repoCancelScheduledAutoMerge: (owner, repo, index, params = {}) => this.request(__spreadValues({
        path: `/repos/${owner}/${repo}/pulls/${index}/merge`,
        method: "DELETE",
        secure: true
      }, params)),
      /**
       * No description
       *
       * @tags repository
       * @name RepoCreatePullReviewRequests
       * @summary create review requests for a pull request
       * @request POST:/repos/{owner}/{repo}/pulls/{index}/requested_reviewers
       * @secure
       */
      repoCreatePullReviewRequests: (owner, repo, index, body, params = {}) => this.request(__spreadValues({
        path: `/repos/${owner}/${repo}/pulls/${index}/requested_reviewers`,
        method: "POST",
        body,
        secure: true
      }, params)),
      /**
       * No description
       *
       * @tags repository
       * @name RepoDeletePullReviewRequests
       * @summary cancel review requests for a pull request
       * @request DELETE:/repos/{owner}/{repo}/pulls/{index}/requested_reviewers
       * @secure
       */
      repoDeletePullReviewRequests: (owner, repo, index, body, params = {}) => this.request(__spreadValues({
        path: `/repos/${owner}/${repo}/pulls/${index}/requested_reviewers`,
        method: "DELETE",
        body,
        secure: true
      }, params)),
      /**
       * No description
       *
       * @tags repository
       * @name RepoListPullReviews
       * @summary List all reviews for a pull request
       * @request GET:/repos/{owner}/{repo}/pulls/{index}/reviews
       * @secure
       */
      repoListPullReviews: (owner, repo, index, query, params = {}) => this.request(__spreadValues({
        path: `/repos/${owner}/${repo}/pulls/${index}/reviews`,
        method: "GET",
        query,
        secure: true
      }, params)),
      /**
       * No description
       *
       * @tags repository
       * @name RepoCreatePullReview
       * @summary Create a review to an pull request
       * @request POST:/repos/{owner}/{repo}/pulls/{index}/reviews
       * @secure
       */
      repoCreatePullReview: (owner, repo, index, body, params = {}) => this.request(__spreadValues({
        path: `/repos/${owner}/${repo}/pulls/${index}/reviews`,
        method: "POST",
        body,
        secure: true,
        type: "application/json" /* Json */
      }, params)),
      /**
       * No description
       *
       * @tags repository
       * @name RepoGetPullReview
       * @summary Get a specific review for a pull request
       * @request GET:/repos/{owner}/{repo}/pulls/{index}/reviews/{id}
       * @secure
       */
      repoGetPullReview: (owner, repo, index, id, params = {}) => this.request(__spreadValues({
        path: `/repos/${owner}/${repo}/pulls/${index}/reviews/${id}`,
        method: "GET",
        secure: true
      }, params)),
      /**
       * No description
       *
       * @tags repository
       * @name RepoSubmitPullReview
       * @summary Submit a pending review to an pull request
       * @request POST:/repos/{owner}/{repo}/pulls/{index}/reviews/{id}
       * @secure
       */
      repoSubmitPullReview: (owner, repo, index, id, body, params = {}) => this.request(__spreadValues({
        path: `/repos/${owner}/${repo}/pulls/${index}/reviews/${id}`,
        method: "POST",
        body,
        secure: true,
        type: "application/json" /* Json */
      }, params)),
      /**
       * No description
       *
       * @tags repository
       * @name RepoDeletePullReview
       * @summary Delete a specific review from a pull request
       * @request DELETE:/repos/{owner}/{repo}/pulls/{index}/reviews/{id}
       * @secure
       */
      repoDeletePullReview: (owner, repo, index, id, params = {}) => this.request(__spreadValues({
        path: `/repos/${owner}/${repo}/pulls/${index}/reviews/${id}`,
        method: "DELETE",
        secure: true
      }, params)),
      /**
       * No description
       *
       * @tags repository
       * @name RepoGetPullReviewComments
       * @summary Get a specific review for a pull request
       * @request GET:/repos/{owner}/{repo}/pulls/{index}/reviews/{id}/comments
       * @secure
       */
      repoGetPullReviewComments: (owner, repo, index, id, params = {}) => this.request(__spreadValues({
        path: `/repos/${owner}/${repo}/pulls/${index}/reviews/${id}/comments`,
        method: "GET",
        secure: true
      }, params)),
      /**
       * No description
       *
       * @tags repository
       * @name RepoDismissPullReview
       * @summary Dismiss a review for a pull request
       * @request POST:/repos/{owner}/{repo}/pulls/{index}/reviews/{id}/dismissals
       * @secure
       */
      repoDismissPullReview: (owner, repo, index, id, body, params = {}) => this.request(__spreadValues({
        path: `/repos/${owner}/${repo}/pulls/${index}/reviews/${id}/dismissals`,
        method: "POST",
        body,
        secure: true,
        type: "application/json" /* Json */
      }, params)),
      /**
       * No description
       *
       * @tags repository
       * @name RepoUnDismissPullReview
       * @summary Cancel to dismiss a review for a pull request
       * @request POST:/repos/{owner}/{repo}/pulls/{index}/reviews/{id}/undismissals
       * @secure
       */
      repoUnDismissPullReview: (owner, repo, index, id, params = {}) => this.request(__spreadValues({
        path: `/repos/${owner}/${repo}/pulls/${index}/reviews/${id}/undismissals`,
        method: "POST",
        secure: true
      }, params)),
      /**
       * No description
       *
       * @tags repository
       * @name RepoUpdatePullRequest
       * @summary Merge PR's baseBranch into headBranch
       * @request POST:/repos/{owner}/{repo}/pulls/{index}/update
       * @secure
       */
      repoUpdatePullRequest: (owner, repo, index, query, params = {}) => this.request(__spreadValues({
        path: `/repos/${owner}/${repo}/pulls/${index}/update`,
        method: "POST",
        query,
        secure: true
      }, params)),
      /**
       * No description
       *
       * @tags repository
       * @name RepoListPushMirrors
       * @summary Get all push mirrors of the repository
       * @request GET:/repos/{owner}/{repo}/push_mirrors
       * @secure
       */
      repoListPushMirrors: (owner, repo, query, params = {}) => this.request(__spreadValues({
        path: `/repos/${owner}/${repo}/push_mirrors`,
        method: "GET",
        query,
        secure: true
      }, params)),
      /**
       * No description
       *
       * @tags repository
       * @name RepoAddPushMirror
       * @summary add a push mirror to the repository
       * @request POST:/repos/{owner}/{repo}/push_mirrors
       * @secure
       */
      repoAddPushMirror: (owner, repo, body, params = {}) => this.request(__spreadValues({
        path: `/repos/${owner}/${repo}/push_mirrors`,
        method: "POST",
        body,
        secure: true,
        type: "application/json" /* Json */
      }, params)),
      /**
       * No description
       *
       * @tags repository
       * @name RepoPushMirrorSync
       * @summary Sync all push mirrored repository
       * @request POST:/repos/{owner}/{repo}/push_mirrors-sync
       * @secure
       */
      repoPushMirrorSync: (owner, repo, params = {}) => this.request(__spreadValues({
        path: `/repos/${owner}/${repo}/push_mirrors-sync`,
        method: "POST",
        secure: true
      }, params)),
      /**
       * No description
       *
       * @tags repository
       * @name RepoGetPushMirrorByRemoteName
       * @summary Get push mirror of the repository by remoteName
       * @request GET:/repos/{owner}/{repo}/push_mirrors/{name}
       * @secure
       */
      repoGetPushMirrorByRemoteName: (owner, repo, name, params = {}) => this.request(__spreadValues({
        path: `/repos/${owner}/${repo}/push_mirrors/${name}`,
        method: "GET",
        secure: true
      }, params)),
      /**
       * No description
       *
       * @tags repository
       * @name RepoDeletePushMirror
       * @summary deletes a push mirror from a repository by remoteName
       * @request DELETE:/repos/{owner}/{repo}/push_mirrors/{name}
       * @secure
       */
      repoDeletePushMirror: (owner, repo, name, params = {}) => this.request(__spreadValues({
        path: `/repos/${owner}/${repo}/push_mirrors/${name}`,
        method: "DELETE",
        secure: true
      }, params)),
      /**
       * No description
       *
       * @tags repository
       * @name RepoGetRawFile
       * @summary Get a file from a repository
       * @request GET:/repos/{owner}/{repo}/raw/{filepath}
       * @secure
       */
      repoGetRawFile: (owner, repo, filepath, query, params = {}) => this.request(__spreadValues({
        path: `/repos/${owner}/${repo}/raw/${filepath}`,
        method: "GET",
        query,
        secure: true
      }, params)),
      /**
       * No description
       *
       * @tags repository
       * @name RepoListReleases
       * @summary List a repo's releases
       * @request GET:/repos/{owner}/{repo}/releases
       * @secure
       */
      repoListReleases: (owner, repo, query, params = {}) => this.request(__spreadValues({
        path: `/repos/${owner}/${repo}/releases`,
        method: "GET",
        query,
        secure: true
      }, params)),
      /**
       * No description
       *
       * @tags repository
       * @name RepoCreateRelease
       * @summary Create a release
       * @request POST:/repos/{owner}/{repo}/releases
       * @secure
       */
      repoCreateRelease: (owner, repo, body, params = {}) => this.request(__spreadValues({
        path: `/repos/${owner}/${repo}/releases`,
        method: "POST",
        body,
        secure: true,
        type: "application/json" /* Json */
      }, params)),
      /**
       * No description
       *
       * @tags repository
       * @name RepoGetLatestRelease
       * @summary Gets the most recent non-prerelease, non-draft release of a repository, sorted by created_at
       * @request GET:/repos/{owner}/{repo}/releases/latest
       * @secure
       */
      repoGetLatestRelease: (owner, repo, params = {}) => this.request(__spreadValues({
        path: `/repos/${owner}/${repo}/releases/latest`,
        method: "GET",
        secure: true
      }, params)),
      /**
       * No description
       *
       * @tags repository
       * @name RepoGetReleaseByTag
       * @summary Get a release by tag name
       * @request GET:/repos/{owner}/{repo}/releases/tags/{tag}
       * @secure
       */
      repoGetReleaseByTag: (owner, repo, tag, params = {}) => this.request(__spreadValues({
        path: `/repos/${owner}/${repo}/releases/tags/${tag}`,
        method: "GET",
        secure: true
      }, params)),
      /**
       * No description
       *
       * @tags repository
       * @name RepoDeleteReleaseByTag
       * @summary Delete a release by tag name
       * @request DELETE:/repos/{owner}/{repo}/releases/tags/{tag}
       * @secure
       */
      repoDeleteReleaseByTag: (owner, repo, tag, params = {}) => this.request(__spreadValues({
        path: `/repos/${owner}/${repo}/releases/tags/${tag}`,
        method: "DELETE",
        secure: true
      }, params)),
      /**
       * No description
       *
       * @tags repository
       * @name RepoGetRelease
       * @summary Get a release
       * @request GET:/repos/{owner}/{repo}/releases/{id}
       * @secure
       */
      repoGetRelease: (owner, repo, id, params = {}) => this.request(__spreadValues({
        path: `/repos/${owner}/${repo}/releases/${id}`,
        method: "GET",
        secure: true
      }, params)),
      /**
       * No description
       *
       * @tags repository
       * @name RepoDeleteRelease
       * @summary Delete a release
       * @request DELETE:/repos/{owner}/{repo}/releases/{id}
       * @secure
       */
      repoDeleteRelease: (owner, repo, id, params = {}) => this.request(__spreadValues({
        path: `/repos/${owner}/${repo}/releases/${id}`,
        method: "DELETE",
        secure: true
      }, params)),
      /**
       * No description
       *
       * @tags repository
       * @name RepoEditRelease
       * @summary Update a release
       * @request PATCH:/repos/{owner}/{repo}/releases/{id}
       * @secure
       */
      repoEditRelease: (owner, repo, id, body, params = {}) => this.request(__spreadValues({
        path: `/repos/${owner}/${repo}/releases/${id}`,
        method: "PATCH",
        body,
        secure: true,
        type: "application/json" /* Json */
      }, params)),
      /**
       * No description
       *
       * @tags repository
       * @name RepoListReleaseAttachments
       * @summary List release's attachments
       * @request GET:/repos/{owner}/{repo}/releases/{id}/assets
       * @secure
       */
      repoListReleaseAttachments: (owner, repo, id, params = {}) => this.request(__spreadValues({
        path: `/repos/${owner}/${repo}/releases/${id}/assets`,
        method: "GET",
        secure: true
      }, params)),
      /**
       * No description
       *
       * @tags repository
       * @name RepoCreateReleaseAttachment
       * @summary Create a release attachment
       * @request POST:/repos/{owner}/{repo}/releases/{id}/assets
       * @secure
       */
      repoCreateReleaseAttachment: (owner, repo, id, data, query, params = {}) => this.request(__spreadValues({
        path: `/repos/${owner}/${repo}/releases/${id}/assets`,
        method: "POST",
        query,
        body: data,
        secure: true,
        type: "multipart/form-data" /* FormData */
      }, params)),
      /**
       * No description
       *
       * @tags repository
       * @name RepoGetReleaseAttachment
       * @summary Get a release attachment
       * @request GET:/repos/{owner}/{repo}/releases/{id}/assets/{attachment_id}
       * @secure
       */
      repoGetReleaseAttachment: (owner, repo, id, attachmentId, params = {}) => this.request(__spreadValues({
        path: `/repos/${owner}/${repo}/releases/${id}/assets/${attachmentId}`,
        method: "GET",
        secure: true
      }, params)),
      /**
       * No description
       *
       * @tags repository
       * @name RepoDeleteReleaseAttachment
       * @summary Delete a release attachment
       * @request DELETE:/repos/{owner}/{repo}/releases/{id}/assets/{attachment_id}
       * @secure
       */
      repoDeleteReleaseAttachment: (owner, repo, id, attachmentId, params = {}) => this.request(__spreadValues({
        path: `/repos/${owner}/${repo}/releases/${id}/assets/${attachmentId}`,
        method: "DELETE",
        secure: true
      }, params)),
      /**
       * No description
       *
       * @tags repository
       * @name RepoEditReleaseAttachment
       * @summary Edit a release attachment
       * @request PATCH:/repos/{owner}/{repo}/releases/{id}/assets/{attachment_id}
       * @secure
       */
      repoEditReleaseAttachment: (owner, repo, id, attachmentId, body, params = {}) => this.request(__spreadValues({
        path: `/repos/${owner}/${repo}/releases/${id}/assets/${attachmentId}`,
        method: "PATCH",
        body,
        secure: true,
        type: "application/json" /* Json */
      }, params)),
      /**
       * No description
       *
       * @tags repository
       * @name RepoGetReviewers
       * @summary Return all users that can be requested to review in this repo
       * @request GET:/repos/{owner}/{repo}/reviewers
       * @secure
       */
      repoGetReviewers: (owner, repo, params = {}) => this.request(__spreadValues({
        path: `/repos/${owner}/${repo}/reviewers`,
        method: "GET",
        secure: true
      }, params)),
      /**
       * No description
       *
       * @tags repository
       * @name RepoGetRunnerRegistrationToken
       * @summary Get a repository's actions runner registration token
       * @request GET:/repos/{owner}/{repo}/runners/registration-token
       * @secure
       */
      repoGetRunnerRegistrationToken: (owner, repo, params = {}) => this.request(__spreadValues({
        path: `/repos/${owner}/${repo}/runners/registration-token`,
        method: "GET",
        secure: true
      }, params)),
      /**
       * No description
       *
       * @tags repository
       * @name RepoSigningKey
       * @summary Get signing-key.gpg for given repository
       * @request GET:/repos/{owner}/{repo}/signing-key.gpg
       * @secure
       */
      repoSigningKey: (owner, repo, params = {}) => this.request(__spreadValues({
        path: `/repos/${owner}/${repo}/signing-key.gpg`,
        method: "GET",
        secure: true
      }, params)),
      /**
       * No description
       *
       * @tags repository
       * @name RepoListStargazers
       * @summary List a repo's stargazers
       * @request GET:/repos/{owner}/{repo}/stargazers
       * @secure
       */
      repoListStargazers: (owner, repo, query, params = {}) => this.request(__spreadValues({
        path: `/repos/${owner}/${repo}/stargazers`,
        method: "GET",
        query,
        secure: true
      }, params)),
      /**
       * No description
       *
       * @tags repository
       * @name RepoListStatuses
       * @summary Get a commit's statuses
       * @request GET:/repos/{owner}/{repo}/statuses/{sha}
       * @secure
       */
      repoListStatuses: (owner, repo, sha, query, params = {}) => this.request(__spreadValues({
        path: `/repos/${owner}/${repo}/statuses/${sha}`,
        method: "GET",
        query,
        secure: true
      }, params)),
      /**
       * No description
       *
       * @tags repository
       * @name RepoCreateStatus
       * @summary Create a commit status
       * @request POST:/repos/{owner}/{repo}/statuses/{sha}
       * @secure
       */
      repoCreateStatus: (owner, repo, sha, body, params = {}) => this.request(__spreadValues({
        path: `/repos/${owner}/${repo}/statuses/${sha}`,
        method: "POST",
        body,
        secure: true,
        type: "application/json" /* Json */
      }, params)),
      /**
       * No description
       *
       * @tags repository
       * @name RepoListSubscribers
       * @summary List a repo's watchers
       * @request GET:/repos/{owner}/{repo}/subscribers
       * @secure
       */
      repoListSubscribers: (owner, repo, query, params = {}) => this.request(__spreadValues({
        path: `/repos/${owner}/${repo}/subscribers`,
        method: "GET",
        query,
        secure: true
      }, params)),
      /**
       * No description
       *
       * @tags repository
       * @name UserCurrentCheckSubscription
       * @summary Check if the current user is watching a repo
       * @request GET:/repos/{owner}/{repo}/subscription
       * @secure
       */
      userCurrentCheckSubscription: (owner, repo, params = {}) => this.request(__spreadValues({
        path: `/repos/${owner}/${repo}/subscription`,
        method: "GET",
        secure: true
      }, params)),
      /**
       * No description
       *
       * @tags repository
       * @name UserCurrentPutSubscription
       * @summary Watch a repo
       * @request PUT:/repos/{owner}/{repo}/subscription
       * @secure
       */
      userCurrentPutSubscription: (owner, repo, params = {}) => this.request(__spreadValues({
        path: `/repos/${owner}/${repo}/subscription`,
        method: "PUT",
        secure: true
      }, params)),
      /**
       * No description
       *
       * @tags repository
       * @name UserCurrentDeleteSubscription
       * @summary Unwatch a repo
       * @request DELETE:/repos/{owner}/{repo}/subscription
       * @secure
       */
      userCurrentDeleteSubscription: (owner, repo, params = {}) => this.request(__spreadValues({
        path: `/repos/${owner}/${repo}/subscription`,
        method: "DELETE",
        secure: true
      }, params)),
      /**
       * No description
       *
       * @tags repository
       * @name RepoListTags
       * @summary List a repository's tags
       * @request GET:/repos/{owner}/{repo}/tags
       * @secure
       */
      repoListTags: (owner, repo, query, params = {}) => this.request(__spreadValues({
        path: `/repos/${owner}/${repo}/tags`,
        method: "GET",
        query,
        secure: true
      }, params)),
      /**
       * No description
       *
       * @tags repository
       * @name RepoCreateTag
       * @summary Create a new git tag in a repository
       * @request POST:/repos/{owner}/{repo}/tags
       * @secure
       */
      repoCreateTag: (owner, repo, body, params = {}) => this.request(__spreadValues({
        path: `/repos/${owner}/${repo}/tags`,
        method: "POST",
        body,
        secure: true,
        type: "application/json" /* Json */
      }, params)),
      /**
       * No description
       *
       * @tags repository
       * @name RepoGetTag
       * @summary Get the tag of a repository by tag name
       * @request GET:/repos/{owner}/{repo}/tags/{tag}
       * @secure
       */
      repoGetTag: (owner, repo, tag, params = {}) => this.request(__spreadValues({
        path: `/repos/${owner}/${repo}/tags/${tag}`,
        method: "GET",
        secure: true
      }, params)),
      /**
       * No description
       *
       * @tags repository
       * @name RepoDeleteTag
       * @summary Delete a repository's tag by name
       * @request DELETE:/repos/{owner}/{repo}/tags/{tag}
       * @secure
       */
      repoDeleteTag: (owner, repo, tag, params = {}) => this.request(__spreadValues({
        path: `/repos/${owner}/${repo}/tags/${tag}`,
        method: "DELETE",
        secure: true
      }, params)),
      /**
       * No description
       *
       * @tags repository
       * @name RepoListTeams
       * @summary List a repository's teams
       * @request GET:/repos/{owner}/{repo}/teams
       * @secure
       */
      repoListTeams: (owner, repo, params = {}) => this.request(__spreadValues({
        path: `/repos/${owner}/${repo}/teams`,
        method: "GET",
        secure: true
      }, params)),
      /**
       * No description
       *
       * @tags repository
       * @name RepoCheckTeam
       * @summary Check if a team is assigned to a repository
       * @request GET:/repos/{owner}/{repo}/teams/{team}
       * @secure
       */
      repoCheckTeam: (owner, repo, team, params = {}) => this.request(__spreadValues({
        path: `/repos/${owner}/${repo}/teams/${team}`,
        method: "GET",
        secure: true
      }, params)),
      /**
       * No description
       *
       * @tags repository
       * @name RepoAddTeam
       * @summary Add a team to a repository
       * @request PUT:/repos/{owner}/{repo}/teams/{team}
       * @secure
       */
      repoAddTeam: (owner, repo, team, params = {}) => this.request(__spreadValues({
        path: `/repos/${owner}/${repo}/teams/${team}`,
        method: "PUT",
        secure: true
      }, params)),
      /**
       * No description
       *
       * @tags repository
       * @name RepoDeleteTeam
       * @summary Delete a team from a repository
       * @request DELETE:/repos/{owner}/{repo}/teams/{team}
       * @secure
       */
      repoDeleteTeam: (owner, repo, team, params = {}) => this.request(__spreadValues({
        path: `/repos/${owner}/${repo}/teams/${team}`,
        method: "DELETE",
        secure: true
      }, params)),
      /**
       * No description
       *
       * @tags repository
       * @name RepoTrackedTimes
       * @summary List a repo's tracked times
       * @request GET:/repos/{owner}/{repo}/times
       * @secure
       */
      repoTrackedTimes: (owner, repo, query, params = {}) => this.request(__spreadValues({
        path: `/repos/${owner}/${repo}/times`,
        method: "GET",
        query,
        secure: true
      }, params)),
      /**
       * No description
       *
       * @tags repository
       * @name UserTrackedTimes
       * @summary List a user's tracked times in a repo
       * @request GET:/repos/{owner}/{repo}/times/{user}
       * @deprecated
       * @secure
       */
      userTrackedTimes: (owner, repo, user, params = {}) => this.request(__spreadValues({
        path: `/repos/${owner}/${repo}/times/${user}`,
        method: "GET",
        secure: true
      }, params)),
      /**
       * No description
       *
       * @tags repository
       * @name RepoListTopics
       * @summary Get list of topics that a repository has
       * @request GET:/repos/{owner}/{repo}/topics
       * @secure
       */
      repoListTopics: (owner, repo, query, params = {}) => this.request(__spreadValues({
        path: `/repos/${owner}/${repo}/topics`,
        method: "GET",
        query,
        secure: true
      }, params)),
      /**
       * No description
       *
       * @tags repository
       * @name RepoUpdateTopics
       * @summary Replace list of topics for a repository
       * @request PUT:/repos/{owner}/{repo}/topics
       * @secure
       */
      repoUpdateTopics: (owner, repo, body, params = {}) => this.request(__spreadValues({
        path: `/repos/${owner}/${repo}/topics`,
        method: "PUT",
        body,
        secure: true,
        type: "application/json" /* Json */
      }, params)),
      /**
       * No description
       *
       * @tags repository
       * @name RepoAddTopic
       * @summary Add a topic to a repository
       * @request PUT:/repos/{owner}/{repo}/topics/{topic}
       * @secure
       */
      repoAddTopic: (owner, repo, topic, params = {}) => this.request(__spreadValues({
        path: `/repos/${owner}/${repo}/topics/${topic}`,
        method: "PUT",
        secure: true
      }, params)),
      /**
       * No description
       *
       * @tags repository
       * @name RepoDeleteTopic
       * @summary Delete a topic from a repository
       * @request DELETE:/repos/{owner}/{repo}/topics/{topic}
       * @secure
       */
      repoDeleteTopic: (owner, repo, topic, params = {}) => this.request(__spreadValues({
        path: `/repos/${owner}/${repo}/topics/${topic}`,
        method: "DELETE",
        secure: true
      }, params)),
      /**
       * No description
       *
       * @tags repository
       * @name RepoTransfer
       * @summary Transfer a repo ownership
       * @request POST:/repos/{owner}/{repo}/transfer
       * @secure
       */
      repoTransfer: (owner, repo, body, params = {}) => this.request(__spreadValues({
        path: `/repos/${owner}/${repo}/transfer`,
        method: "POST",
        body,
        secure: true,
        type: "application/json" /* Json */
      }, params)),
      /**
       * No description
       *
       * @tags repository
       * @name AcceptRepoTransfer
       * @summary Accept a repo transfer
       * @request POST:/repos/{owner}/{repo}/transfer/accept
       * @secure
       */
      acceptRepoTransfer: (owner, repo, params = {}) => this.request(__spreadValues({
        path: `/repos/${owner}/${repo}/transfer/accept`,
        method: "POST",
        secure: true
      }, params)),
      /**
       * No description
       *
       * @tags repository
       * @name RejectRepoTransfer
       * @summary Reject a repo transfer
       * @request POST:/repos/{owner}/{repo}/transfer/reject
       * @secure
       */
      rejectRepoTransfer: (owner, repo, params = {}) => this.request(__spreadValues({
        path: `/repos/${owner}/${repo}/transfer/reject`,
        method: "POST",
        secure: true
      }, params)),
      /**
       * No description
       *
       * @tags repository
       * @name RepoCreateWikiPage
       * @summary Create a wiki page
       * @request POST:/repos/{owner}/{repo}/wiki/new
       * @secure
       */
      repoCreateWikiPage: (owner, repo, body, params = {}) => this.request(__spreadValues({
        path: `/repos/${owner}/${repo}/wiki/new`,
        method: "POST",
        body,
        secure: true,
        type: "application/json" /* Json */
      }, params)),
      /**
       * No description
       *
       * @tags repository
       * @name RepoGetWikiPage
       * @summary Get a wiki page
       * @request GET:/repos/{owner}/{repo}/wiki/page/{pageName}
       * @secure
       */
      repoGetWikiPage: (owner, repo, pageName, params = {}) => this.request(__spreadValues({
        path: `/repos/${owner}/${repo}/wiki/page/${pageName}`,
        method: "GET",
        secure: true
      }, params)),
      /**
       * No description
       *
       * @tags repository
       * @name RepoDeleteWikiPage
       * @summary Delete a wiki page
       * @request DELETE:/repos/{owner}/{repo}/wiki/page/{pageName}
       * @secure
       */
      repoDeleteWikiPage: (owner, repo, pageName, params = {}) => this.request(__spreadValues({
        path: `/repos/${owner}/${repo}/wiki/page/${pageName}`,
        method: "DELETE",
        secure: true
      }, params)),
      /**
       * No description
       *
       * @tags repository
       * @name RepoEditWikiPage
       * @summary Edit a wiki page
       * @request PATCH:/repos/{owner}/{repo}/wiki/page/{pageName}
       * @secure
       */
      repoEditWikiPage: (owner, repo, pageName, body, params = {}) => this.request(__spreadValues({
        path: `/repos/${owner}/${repo}/wiki/page/${pageName}`,
        method: "PATCH",
        body,
        secure: true,
        type: "application/json" /* Json */
      }, params)),
      /**
       * No description
       *
       * @tags repository
       * @name RepoGetWikiPages
       * @summary Get all wiki pages
       * @request GET:/repos/{owner}/{repo}/wiki/pages
       * @secure
       */
      repoGetWikiPages: (owner, repo, query, params = {}) => this.request(__spreadValues({
        path: `/repos/${owner}/${repo}/wiki/pages`,
        method: "GET",
        query,
        secure: true
      }, params)),
      /**
       * No description
       *
       * @tags repository
       * @name RepoGetWikiPageRevisions
       * @summary Get revisions of a wiki page
       * @request GET:/repos/{owner}/{repo}/wiki/revisions/{pageName}
       * @secure
       */
      repoGetWikiPageRevisions: (owner, repo, pageName, query, params = {}) => this.request(__spreadValues({
        path: `/repos/${owner}/${repo}/wiki/revisions/${pageName}`,
        method: "GET",
        query,
        secure: true
      }, params)),
      /**
       * No description
       *
       * @tags repository
       * @name GenerateRepo
       * @summary Create a repository using a template
       * @request POST:/repos/{template_owner}/{template_repo}/generate
       * @secure
       */
      generateRepo: (templateOwner, templateRepo, body, params = {}) => this.request(__spreadValues({
        path: `/repos/${templateOwner}/${templateRepo}/generate`,
        method: "POST",
        body,
        secure: true,
        type: "application/json" /* Json */
      }, params))
    };
    this.repositories = {
      /**
       * No description
       *
       * @tags repository
       * @name RepoGetById
       * @summary Get a repository by id
       * @request GET:/repositories/{id}
       * @secure
       */
      repoGetById: (id, params = {}) => this.request(__spreadValues({
        path: `/repositories/${id}`,
        method: "GET",
        secure: true
      }, params))
    };
    this.settings = {
      /**
       * No description
       *
       * @tags settings
       * @name GetGeneralApiSettings
       * @summary Get instance's global settings for api
       * @request GET:/settings/api
       * @secure
       */
      getGeneralApiSettings: (params = {}) => this.request(__spreadValues({
        path: `/settings/api`,
        method: "GET",
        secure: true
      }, params)),
      /**
       * No description
       *
       * @tags settings
       * @name GetGeneralAttachmentSettings
       * @summary Get instance's global settings for Attachment
       * @request GET:/settings/attachment
       * @secure
       */
      getGeneralAttachmentSettings: (params = {}) => this.request(__spreadValues({
        path: `/settings/attachment`,
        method: "GET",
        secure: true
      }, params)),
      /**
       * No description
       *
       * @tags settings
       * @name GetGeneralRepositorySettings
       * @summary Get instance's global settings for repositories
       * @request GET:/settings/repository
       * @secure
       */
      getGeneralRepositorySettings: (params = {}) => this.request(__spreadValues({
        path: `/settings/repository`,
        method: "GET",
        secure: true
      }, params)),
      /**
       * No description
       *
       * @tags settings
       * @name GetGeneralUiSettings
       * @summary Get instance's global settings for ui
       * @request GET:/settings/ui
       * @secure
       */
      getGeneralUiSettings: (params = {}) => this.request(__spreadValues({
        path: `/settings/ui`,
        method: "GET",
        secure: true
      }, params))
    };
    this.signingKeyGpg = {
      /**
       * No description
       *
       * @tags miscellaneous
       * @name GetSigningKey
       * @summary Get default signing-key.gpg
       * @request GET:/signing-key.gpg
       * @secure
       */
      getSigningKey: (params = {}) => this.request(__spreadValues({
        path: `/signing-key.gpg`,
        method: "GET",
        secure: true
      }, params))
    };
    this.teams = {
      /**
       * No description
       *
       * @tags organization
       * @name OrgGetTeam
       * @summary Get a team
       * @request GET:/teams/{id}
       * @secure
       */
      orgGetTeam: (id, params = {}) => this.request(__spreadValues({
        path: `/teams/${id}`,
        method: "GET",
        secure: true
      }, params)),
      /**
       * No description
       *
       * @tags organization
       * @name OrgDeleteTeam
       * @summary Delete a team
       * @request DELETE:/teams/{id}
       * @secure
       */
      orgDeleteTeam: (id, params = {}) => this.request(__spreadValues({
        path: `/teams/${id}`,
        method: "DELETE",
        secure: true
      }, params)),
      /**
       * No description
       *
       * @tags organization
       * @name OrgEditTeam
       * @summary Edit a team
       * @request PATCH:/teams/{id}
       * @secure
       */
      orgEditTeam: (id, body, params = {}) => this.request(__spreadValues({
        path: `/teams/${id}`,
        method: "PATCH",
        body,
        secure: true,
        type: "application/json" /* Json */
      }, params)),
      /**
       * No description
       *
       * @tags organization
       * @name OrgListTeamActivityFeeds
       * @summary List a team's activity feeds
       * @request GET:/teams/{id}/activities/feeds
       * @secure
       */
      orgListTeamActivityFeeds: (id, query, params = {}) => this.request(__spreadValues({
        path: `/teams/${id}/activities/feeds`,
        method: "GET",
        query,
        secure: true
      }, params)),
      /**
       * No description
       *
       * @tags organization
       * @name OrgListTeamMembers
       * @summary List a team's members
       * @request GET:/teams/{id}/members
       * @secure
       */
      orgListTeamMembers: (id, query, params = {}) => this.request(__spreadValues({
        path: `/teams/${id}/members`,
        method: "GET",
        query,
        secure: true
      }, params)),
      /**
       * No description
       *
       * @tags organization
       * @name OrgListTeamMember
       * @summary List a particular member of team
       * @request GET:/teams/{id}/members/{username}
       * @secure
       */
      orgListTeamMember: (id, username, params = {}) => this.request(__spreadValues({
        path: `/teams/${id}/members/${username}`,
        method: "GET",
        secure: true
      }, params)),
      /**
       * No description
       *
       * @tags organization
       * @name OrgAddTeamMember
       * @summary Add a team member
       * @request PUT:/teams/{id}/members/{username}
       * @secure
       */
      orgAddTeamMember: (id, username, params = {}) => this.request(__spreadValues({
        path: `/teams/${id}/members/${username}`,
        method: "PUT",
        secure: true
      }, params)),
      /**
       * No description
       *
       * @tags organization
       * @name OrgRemoveTeamMember
       * @summary Remove a team member
       * @request DELETE:/teams/{id}/members/{username}
       * @secure
       */
      orgRemoveTeamMember: (id, username, params = {}) => this.request(__spreadValues({
        path: `/teams/${id}/members/${username}`,
        method: "DELETE",
        secure: true
      }, params)),
      /**
       * No description
       *
       * @tags organization
       * @name OrgListTeamRepos
       * @summary List a team's repos
       * @request GET:/teams/{id}/repos
       * @secure
       */
      orgListTeamRepos: (id, query, params = {}) => this.request(__spreadValues({
        path: `/teams/${id}/repos`,
        method: "GET",
        query,
        secure: true
      }, params)),
      /**
       * No description
       *
       * @tags organization
       * @name OrgListTeamRepo
       * @summary List a particular repo of team
       * @request GET:/teams/{id}/repos/{org}/{repo}
       * @secure
       */
      orgListTeamRepo: (id, org, repo, params = {}) => this.request(__spreadValues({
        path: `/teams/${id}/repos/${org}/${repo}`,
        method: "GET",
        secure: true
      }, params)),
      /**
       * No description
       *
       * @tags organization
       * @name OrgAddTeamRepository
       * @summary Add a repository to a team
       * @request PUT:/teams/{id}/repos/{org}/{repo}
       * @secure
       */
      orgAddTeamRepository: (id, org, repo, params = {}) => this.request(__spreadValues({
        path: `/teams/${id}/repos/${org}/${repo}`,
        method: "PUT",
        secure: true
      }, params)),
      /**
       * @description This does not delete the repository, it only removes the repository from the team.
       *
       * @tags organization
       * @name OrgRemoveTeamRepository
       * @summary Remove a repository from a team
       * @request DELETE:/teams/{id}/repos/{org}/{repo}
       * @secure
       */
      orgRemoveTeamRepository: (id, org, repo, params = {}) => this.request(__spreadValues({
        path: `/teams/${id}/repos/${org}/${repo}`,
        method: "DELETE",
        secure: true
      }, params))
    };
    this.topics = {
      /**
       * No description
       *
       * @tags repository
       * @name TopicSearch
       * @summary search topics via keyword
       * @request GET:/topics/search
       * @secure
       */
      topicSearch: (query, params = {}) => this.request(__spreadValues({
        path: `/topics/search`,
        method: "GET",
        query,
        secure: true
      }, params))
    };
    this.user = {
      /**
       * No description
       *
       * @tags user
       * @name UserGetCurrent
       * @summary Get the authenticated user
       * @request GET:/user
       * @secure
       */
      userGetCurrent: (params = {}) => this.request(__spreadValues({
        path: `/user`,
        method: "GET",
        secure: true
      }, params)),
      /**
       * No description
       *
       * @tags user
       * @name UserGetRunnerRegistrationToken
       * @summary Get an user's actions runner registration token
       * @request GET:/user/actions/runners/registration-token
       * @secure
       */
      userGetRunnerRegistrationToken: (params = {}) => this.request(__spreadValues({
        path: `/user/actions/runners/registration-token`,
        method: "GET",
        secure: true
      }, params)),
      /**
       * No description
       *
       * @tags user
       * @name UpdateUserSecret
       * @summary Create or Update a secret value in a user scope
       * @request PUT:/user/actions/secrets/{secretname}
       * @secure
       */
      updateUserSecret: (secretname, body, params = {}) => this.request(__spreadValues({
        path: `/user/actions/secrets/${secretname}`,
        method: "PUT",
        body,
        secure: true,
        type: "application/json" /* Json */
      }, params)),
      /**
       * No description
       *
       * @tags user
       * @name DeleteUserSecret
       * @summary Delete a secret in a user scope
       * @request DELETE:/user/actions/secrets/{secretname}
       * @secure
       */
      deleteUserSecret: (secretname, params = {}) => this.request(__spreadValues({
        path: `/user/actions/secrets/${secretname}`,
        method: "DELETE",
        secure: true,
        type: "application/json" /* Json */
      }, params)),
      /**
       * No description
       *
       * @tags user
       * @name GetUserVariablesList
       * @summary Get the user-level list of variables which is created by current doer
       * @request GET:/user/actions/variables
       * @secure
       */
      getUserVariablesList: (query, params = {}) => this.request(__spreadValues({
        path: `/user/actions/variables`,
        method: "GET",
        query,
        secure: true
      }, params)),
      /**
       * No description
       *
       * @tags user
       * @name GetUserVariable
       * @summary Get a user-level variable which is created by current doer
       * @request GET:/user/actions/variables/{variablename}
       * @secure
       */
      getUserVariable: (variablename, params = {}) => this.request(__spreadValues({
        path: `/user/actions/variables/${variablename}`,
        method: "GET",
        secure: true
      }, params)),
      /**
       * No description
       *
       * @tags user
       * @name UpdateUserVariable
       * @summary Update a user-level variable which is created by current doer
       * @request PUT:/user/actions/variables/{variablename}
       * @secure
       */
      updateUserVariable: (variablename, body, params = {}) => this.request(__spreadValues({
        path: `/user/actions/variables/${variablename}`,
        method: "PUT",
        body,
        secure: true,
        type: "application/json" /* Json */
      }, params)),
      /**
       * No description
       *
       * @tags user
       * @name CreateUserVariable
       * @summary Create a user-level variable
       * @request POST:/user/actions/variables/{variablename}
       * @secure
       */
      createUserVariable: (variablename, body, params = {}) => this.request(__spreadValues({
        path: `/user/actions/variables/${variablename}`,
        method: "POST",
        body,
        secure: true,
        type: "application/json" /* Json */
      }, params)),
      /**
       * No description
       *
       * @tags user
       * @name DeleteUserVariable
       * @summary Delete a user-level variable which is created by current doer
       * @request DELETE:/user/actions/variables/{variablename}
       * @secure
       */
      deleteUserVariable: (variablename, params = {}) => this.request(__spreadValues({
        path: `/user/actions/variables/${variablename}`,
        method: "DELETE",
        secure: true
      }, params)),
      /**
       * No description
       *
       * @tags user
       * @name UserGetOauth2Application
       * @summary List the authenticated user's oauth2 applications
       * @request GET:/user/applications/oauth2
       * @secure
       */
      userGetOauth2Application: (query, params = {}) => this.request(__spreadValues({
        path: `/user/applications/oauth2`,
        method: "GET",
        query,
        secure: true
      }, params)),
      /**
       * No description
       *
       * @tags user
       * @name UserCreateOAuth2Application
       * @summary creates a new OAuth2 application
       * @request POST:/user/applications/oauth2
       * @secure
       */
      userCreateOAuth2Application: (body, params = {}) => this.request(__spreadValues({
        path: `/user/applications/oauth2`,
        method: "POST",
        body,
        secure: true
      }, params)),
      /**
       * No description
       *
       * @tags user
       * @name UserGetOAuth2Application
       * @summary get an OAuth2 Application
       * @request GET:/user/applications/oauth2/{id}
       * @secure
       */
      userGetOAuth2Application: (id, params = {}) => this.request(__spreadValues({
        path: `/user/applications/oauth2/${id}`,
        method: "GET",
        secure: true
      }, params)),
      /**
       * No description
       *
       * @tags user
       * @name UserDeleteOAuth2Application
       * @summary delete an OAuth2 Application
       * @request DELETE:/user/applications/oauth2/{id}
       * @secure
       */
      userDeleteOAuth2Application: (id, params = {}) => this.request(__spreadValues({
        path: `/user/applications/oauth2/${id}`,
        method: "DELETE",
        secure: true
      }, params)),
      /**
       * No description
       *
       * @tags user
       * @name UserUpdateOAuth2Application
       * @summary update an OAuth2 Application, this includes regenerating the client secret
       * @request PATCH:/user/applications/oauth2/{id}
       * @secure
       */
      userUpdateOAuth2Application: (id, body, params = {}) => this.request(__spreadValues({
        path: `/user/applications/oauth2/${id}`,
        method: "PATCH",
        body,
        secure: true
      }, params)),
      /**
       * No description
       *
       * @tags user
       * @name UserUpdateAvatar
       * @summary Update Avatar
       * @request POST:/user/avatar
       * @secure
       */
      userUpdateAvatar: (body, params = {}) => this.request(__spreadValues({
        path: `/user/avatar`,
        method: "POST",
        body,
        secure: true
      }, params)),
      /**
       * No description
       *
       * @tags user
       * @name UserDeleteAvatar
       * @summary Delete Avatar
       * @request DELETE:/user/avatar
       * @secure
       */
      userDeleteAvatar: (params = {}) => this.request(__spreadValues({
        path: `/user/avatar`,
        method: "DELETE",
        secure: true
      }, params)),
      /**
       * No description
       *
       * @tags user
       * @name UserListBlocks
       * @summary List users blocked by the authenticated user
       * @request GET:/user/blocks
       * @secure
       */
      userListBlocks: (query, params = {}) => this.request(__spreadValues({
        path: `/user/blocks`,
        method: "GET",
        query,
        secure: true
      }, params)),
      /**
       * No description
       *
       * @tags user
       * @name UserCheckUserBlock
       * @summary Check if a user is blocked by the authenticated user
       * @request GET:/user/blocks/{username}
       * @secure
       */
      userCheckUserBlock: (username, params = {}) => this.request(__spreadValues({
        path: `/user/blocks/${username}`,
        method: "GET",
        secure: true
      }, params)),
      /**
       * No description
       *
       * @tags user
       * @name UserBlockUser
       * @summary Block a user
       * @request PUT:/user/blocks/{username}
       * @secure
       */
      userBlockUser: (username, query, params = {}) => this.request(__spreadValues({
        path: `/user/blocks/${username}`,
        method: "PUT",
        query,
        secure: true
      }, params)),
      /**
       * No description
       *
       * @tags user
       * @name UserUnblockUser
       * @summary Unblock a user
       * @request DELETE:/user/blocks/{username}
       * @secure
       */
      userUnblockUser: (username, params = {}) => this.request(__spreadValues({
        path: `/user/blocks/${username}`,
        method: "DELETE",
        secure: true
      }, params)),
      /**
       * No description
       *
       * @tags user
       * @name UserListEmails
       * @summary List the authenticated user's email addresses
       * @request GET:/user/emails
       * @secure
       */
      userListEmails: (params = {}) => this.request(__spreadValues({
        path: `/user/emails`,
        method: "GET",
        secure: true
      }, params)),
      /**
       * No description
       *
       * @tags user
       * @name UserAddEmail
       * @summary Add email addresses
       * @request POST:/user/emails
       * @secure
       */
      userAddEmail: (body, params = {}) => this.request(__spreadValues({
        path: `/user/emails`,
        method: "POST",
        body,
        secure: true,
        type: "application/json" /* Json */
      }, params)),
      /**
       * No description
       *
       * @tags user
       * @name UserDeleteEmail
       * @summary Delete email addresses
       * @request DELETE:/user/emails
       * @secure
       */
      userDeleteEmail: (body, params = {}) => this.request(__spreadValues({
        path: `/user/emails`,
        method: "DELETE",
        body,
        secure: true,
        type: "application/json" /* Json */
      }, params)),
      /**
       * No description
       *
       * @tags user
       * @name UserCurrentListFollowers
       * @summary List the authenticated user's followers
       * @request GET:/user/followers
       * @secure
       */
      userCurrentListFollowers: (query, params = {}) => this.request(__spreadValues({
        path: `/user/followers`,
        method: "GET",
        query,
        secure: true
      }, params)),
      /**
       * No description
       *
       * @tags user
       * @name UserCurrentListFollowing
       * @summary List the users that the authenticated user is following
       * @request GET:/user/following
       * @secure
       */
      userCurrentListFollowing: (query, params = {}) => this.request(__spreadValues({
        path: `/user/following`,
        method: "GET",
        query,
        secure: true
      }, params)),
      /**
       * No description
       *
       * @tags user
       * @name UserCurrentCheckFollowing
       * @summary Check whether a user is followed by the authenticated user
       * @request GET:/user/following/{username}
       * @secure
       */
      userCurrentCheckFollowing: (username, params = {}) => this.request(__spreadValues({
        path: `/user/following/${username}`,
        method: "GET",
        secure: true
      }, params)),
      /**
       * No description
       *
       * @tags user
       * @name UserCurrentPutFollow
       * @summary Follow a user
       * @request PUT:/user/following/{username}
       * @secure
       */
      userCurrentPutFollow: (username, params = {}) => this.request(__spreadValues({
        path: `/user/following/${username}`,
        method: "PUT",
        secure: true
      }, params)),
      /**
       * No description
       *
       * @tags user
       * @name UserCurrentDeleteFollow
       * @summary Unfollow a user
       * @request DELETE:/user/following/{username}
       * @secure
       */
      userCurrentDeleteFollow: (username, params = {}) => this.request(__spreadValues({
        path: `/user/following/${username}`,
        method: "DELETE",
        secure: true
      }, params)),
      /**
       * No description
       *
       * @tags user
       * @name GetVerificationToken
       * @summary Get a Token to verify
       * @request GET:/user/gpg_key_token
       * @secure
       */
      getVerificationToken: (params = {}) => this.request(__spreadValues({
        path: `/user/gpg_key_token`,
        method: "GET",
        secure: true
      }, params)),
      /**
       * No description
       *
       * @tags user
       * @name UserVerifyGpgKey
       * @summary Verify a GPG key
       * @request POST:/user/gpg_key_verify
       * @secure
       */
      userVerifyGpgKey: (params = {}) => this.request(__spreadValues({
        path: `/user/gpg_key_verify`,
        method: "POST",
        secure: true,
        type: "application/json" /* Json */
      }, params)),
      /**
       * No description
       *
       * @tags user
       * @name UserCurrentListGpgKeys
       * @summary List the authenticated user's GPG keys
       * @request GET:/user/gpg_keys
       * @secure
       */
      userCurrentListGpgKeys: (query, params = {}) => this.request(__spreadValues({
        path: `/user/gpg_keys`,
        method: "GET",
        query,
        secure: true
      }, params)),
      /**
       * No description
       *
       * @tags user
       * @name UserCurrentPostGpgKey
       * @summary Create a GPG key
       * @request POST:/user/gpg_keys
       * @secure
       */
      userCurrentPostGpgKey: (Form, params = {}) => this.request(__spreadValues({
        path: `/user/gpg_keys`,
        method: "POST",
        body: Form,
        secure: true,
        type: "application/json" /* Json */
      }, params)),
      /**
       * No description
       *
       * @tags user
       * @name UserCurrentGetGpgKey
       * @summary Get a GPG key
       * @request GET:/user/gpg_keys/{id}
       * @secure
       */
      userCurrentGetGpgKey: (id, params = {}) => this.request(__spreadValues({
        path: `/user/gpg_keys/${id}`,
        method: "GET",
        secure: true
      }, params)),
      /**
       * No description
       *
       * @tags user
       * @name UserCurrentDeleteGpgKey
       * @summary Remove a GPG key
       * @request DELETE:/user/gpg_keys/{id}
       * @secure
       */
      userCurrentDeleteGpgKey: (id, params = {}) => this.request(__spreadValues({
        path: `/user/gpg_keys/${id}`,
        method: "DELETE",
        secure: true
      }, params)),
      /**
       * No description
       *
       * @tags user
       * @name UserListHooks
       * @summary List the authenticated user's webhooks
       * @request GET:/user/hooks
       * @secure
       */
      userListHooks: (query, params = {}) => this.request(__spreadValues({
        path: `/user/hooks`,
        method: "GET",
        query,
        secure: true
      }, params)),
      /**
       * No description
       *
       * @tags user
       * @name UserCreateHook
       * @summary Create a hook
       * @request POST:/user/hooks
       * @secure
       */
      userCreateHook: (body, params = {}) => this.request(__spreadValues({
        path: `/user/hooks`,
        method: "POST",
        body,
        secure: true,
        type: "application/json" /* Json */
      }, params)),
      /**
       * No description
       *
       * @tags user
       * @name UserGetHook
       * @summary Get a hook
       * @request GET:/user/hooks/{id}
       * @secure
       */
      userGetHook: (id, params = {}) => this.request(__spreadValues({
        path: `/user/hooks/${id}`,
        method: "GET",
        secure: true
      }, params)),
      /**
       * No description
       *
       * @tags user
       * @name UserDeleteHook
       * @summary Delete a hook
       * @request DELETE:/user/hooks/{id}
       * @secure
       */
      userDeleteHook: (id, params = {}) => this.request(__spreadValues({
        path: `/user/hooks/${id}`,
        method: "DELETE",
        secure: true
      }, params)),
      /**
       * No description
       *
       * @tags user
       * @name UserEditHook
       * @summary Update a hook
       * @request PATCH:/user/hooks/{id}
       * @secure
       */
      userEditHook: (id, body, params = {}) => this.request(__spreadValues({
        path: `/user/hooks/${id}`,
        method: "PATCH",
        body,
        secure: true,
        type: "application/json" /* Json */
      }, params)),
      /**
       * No description
       *
       * @tags user
       * @name UserCurrentListKeys
       * @summary List the authenticated user's public keys
       * @request GET:/user/keys
       * @secure
       */
      userCurrentListKeys: (query, params = {}) => this.request(__spreadValues({
        path: `/user/keys`,
        method: "GET",
        query,
        secure: true
      }, params)),
      /**
       * No description
       *
       * @tags user
       * @name UserCurrentPostKey
       * @summary Create a public key
       * @request POST:/user/keys
       * @secure
       */
      userCurrentPostKey: (body, params = {}) => this.request(__spreadValues({
        path: `/user/keys`,
        method: "POST",
        body,
        secure: true,
        type: "application/json" /* Json */
      }, params)),
      /**
       * No description
       *
       * @tags user
       * @name UserCurrentGetKey
       * @summary Get a public key
       * @request GET:/user/keys/{id}
       * @secure
       */
      userCurrentGetKey: (id, params = {}) => this.request(__spreadValues({
        path: `/user/keys/${id}`,
        method: "GET",
        secure: true
      }, params)),
      /**
       * No description
       *
       * @tags user
       * @name UserCurrentDeleteKey
       * @summary Delete a public key
       * @request DELETE:/user/keys/{id}
       * @secure
       */
      userCurrentDeleteKey: (id, params = {}) => this.request(__spreadValues({
        path: `/user/keys/${id}`,
        method: "DELETE",
        secure: true
      }, params)),
      /**
       * No description
       *
       * @tags organization
       * @name OrgListCurrentUserOrgs
       * @summary List the current user's organizations
       * @request GET:/user/orgs
       * @secure
       */
      orgListCurrentUserOrgs: (query, params = {}) => this.request(__spreadValues({
        path: `/user/orgs`,
        method: "GET",
        query,
        secure: true
      }, params)),
      /**
       * No description
       *
       * @tags user
       * @name UserCurrentListRepos
       * @summary List the repos that the authenticated user owns
       * @request GET:/user/repos
       * @secure
       */
      userCurrentListRepos: (query, params = {}) => this.request(__spreadValues({
        path: `/user/repos`,
        method: "GET",
        query,
        secure: true
      }, params)),
      /**
       * No description
       *
       * @tags repository, user
       * @name CreateCurrentUserRepo
       * @summary Create a repository
       * @request POST:/user/repos
       * @secure
       */
      createCurrentUserRepo: (body, params = {}) => this.request(__spreadValues({
        path: `/user/repos`,
        method: "POST",
        body,
        secure: true,
        type: "application/json" /* Json */
      }, params)),
      /**
       * No description
       *
       * @tags user
       * @name GetUserSettings
       * @summary Get user settings
       * @request GET:/user/settings
       * @secure
       */
      getUserSettings: (params = {}) => this.request(__spreadValues({
        path: `/user/settings`,
        method: "GET",
        secure: true
      }, params)),
      /**
       * No description
       *
       * @tags user
       * @name UpdateUserSettings
       * @summary Update user settings
       * @request PATCH:/user/settings
       * @secure
       */
      updateUserSettings: (body, params = {}) => this.request(__spreadValues({
        path: `/user/settings`,
        method: "PATCH",
        body,
        secure: true,
        type: "application/json" /* Json */
      }, params)),
      /**
       * No description
       *
       * @tags user
       * @name UserCurrentListStarred
       * @summary The repos that the authenticated user has starred
       * @request GET:/user/starred
       * @secure
       */
      userCurrentListStarred: (query, params = {}) => this.request(__spreadValues({
        path: `/user/starred`,
        method: "GET",
        query,
        secure: true
      }, params)),
      /**
       * No description
       *
       * @tags user
       * @name UserCurrentCheckStarring
       * @summary Whether the authenticated is starring the repo
       * @request GET:/user/starred/{owner}/{repo}
       * @secure
       */
      userCurrentCheckStarring: (owner, repo, params = {}) => this.request(__spreadValues({
        path: `/user/starred/${owner}/${repo}`,
        method: "GET",
        secure: true
      }, params)),
      /**
       * No description
       *
       * @tags user
       * @name UserCurrentPutStar
       * @summary Star the given repo
       * @request PUT:/user/starred/{owner}/{repo}
       * @secure
       */
      userCurrentPutStar: (owner, repo, params = {}) => this.request(__spreadValues({
        path: `/user/starred/${owner}/${repo}`,
        method: "PUT",
        secure: true
      }, params)),
      /**
       * No description
       *
       * @tags user
       * @name UserCurrentDeleteStar
       * @summary Unstar the given repo
       * @request DELETE:/user/starred/{owner}/{repo}
       * @secure
       */
      userCurrentDeleteStar: (owner, repo, params = {}) => this.request(__spreadValues({
        path: `/user/starred/${owner}/${repo}`,
        method: "DELETE",
        secure: true
      }, params)),
      /**
       * No description
       *
       * @tags user
       * @name UserGetStopWatches
       * @summary Get list of all existing stopwatches
       * @request GET:/user/stopwatches
       * @secure
       */
      userGetStopWatches: (query, params = {}) => this.request(__spreadValues({
        path: `/user/stopwatches`,
        method: "GET",
        query,
        secure: true,
        type: "application/json" /* Json */
      }, params)),
      /**
       * No description
       *
       * @tags user
       * @name UserCurrentListSubscriptions
       * @summary List repositories watched by the authenticated user
       * @request GET:/user/subscriptions
       * @secure
       */
      userCurrentListSubscriptions: (query, params = {}) => this.request(__spreadValues({
        path: `/user/subscriptions`,
        method: "GET",
        query,
        secure: true
      }, params)),
      /**
       * No description
       *
       * @tags user
       * @name UserListTeams
       * @summary List all the teams a user belongs to
       * @request GET:/user/teams
       * @secure
       */
      userListTeams: (query, params = {}) => this.request(__spreadValues({
        path: `/user/teams`,
        method: "GET",
        query,
        secure: true
      }, params)),
      /**
       * No description
       *
       * @tags user
       * @name UserCurrentTrackedTimes
       * @summary List the current user's tracked times
       * @request GET:/user/times
       * @secure
       */
      userCurrentTrackedTimes: (query, params = {}) => this.request(__spreadValues({
        path: `/user/times`,
        method: "GET",
        query,
        secure: true
      }, params))
    };
    this.users = {
      /**
       * No description
       *
       * @tags user
       * @name UserSearch
       * @summary Search for users
       * @request GET:/users/search
       * @secure
       */
      userSearch: (query, params = {}) => this.request(__spreadValues({
        path: `/users/search`,
        method: "GET",
        query,
        secure: true,
        format: "json"
      }, params)),
      /**
       * No description
       *
       * @tags user
       * @name UserGet
       * @summary Get a user
       * @request GET:/users/{username}
       * @secure
       */
      userGet: (username, params = {}) => this.request(__spreadValues({
        path: `/users/${username}`,
        method: "GET",
        secure: true
      }, params)),
      /**
       * No description
       *
       * @tags user
       * @name UserListActivityFeeds
       * @summary List a user's activity feeds
       * @request GET:/users/{username}/activities/feeds
       * @secure
       */
      userListActivityFeeds: (username, query, params = {}) => this.request(__spreadValues({
        path: `/users/${username}/activities/feeds`,
        method: "GET",
        query,
        secure: true
      }, params)),
      /**
       * No description
       *
       * @tags user
       * @name UserListFollowers
       * @summary List the given user's followers
       * @request GET:/users/{username}/followers
       * @secure
       */
      userListFollowers: (username, query, params = {}) => this.request(__spreadValues({
        path: `/users/${username}/followers`,
        method: "GET",
        query,
        secure: true
      }, params)),
      /**
       * No description
       *
       * @tags user
       * @name UserListFollowing
       * @summary List the users that the given user is following
       * @request GET:/users/{username}/following
       * @secure
       */
      userListFollowing: (username, query, params = {}) => this.request(__spreadValues({
        path: `/users/${username}/following`,
        method: "GET",
        query,
        secure: true
      }, params)),
      /**
       * No description
       *
       * @tags user
       * @name UserCheckFollowing
       * @summary Check if one user is following another user
       * @request GET:/users/{username}/following/{target}
       * @secure
       */
      userCheckFollowing: (username, target, params = {}) => this.request(__spreadValues({
        path: `/users/${username}/following/${target}`,
        method: "GET",
        secure: true
      }, params)),
      /**
       * No description
       *
       * @tags user
       * @name UserListGpgKeys
       * @summary List the given user's GPG keys
       * @request GET:/users/{username}/gpg_keys
       * @secure
       */
      userListGpgKeys: (username, query, params = {}) => this.request(__spreadValues({
        path: `/users/${username}/gpg_keys`,
        method: "GET",
        query,
        secure: true
      }, params)),
      /**
       * No description
       *
       * @tags user
       * @name UserGetHeatmapData
       * @summary Get a user's heatmap
       * @request GET:/users/{username}/heatmap
       * @secure
       */
      userGetHeatmapData: (username, params = {}) => this.request(__spreadValues({
        path: `/users/${username}/heatmap`,
        method: "GET",
        secure: true
      }, params)),
      /**
       * No description
       *
       * @tags user
       * @name UserListKeys
       * @summary List the given user's public keys
       * @request GET:/users/{username}/keys
       * @secure
       */
      userListKeys: (username, query, params = {}) => this.request(__spreadValues({
        path: `/users/${username}/keys`,
        method: "GET",
        query,
        secure: true
      }, params)),
      /**
       * No description
       *
       * @tags organization
       * @name OrgListUserOrgs
       * @summary List a user's organizations
       * @request GET:/users/{username}/orgs
       * @secure
       */
      orgListUserOrgs: (username, query, params = {}) => this.request(__spreadValues({
        path: `/users/${username}/orgs`,
        method: "GET",
        query,
        secure: true
      }, params)),
      /**
       * No description
       *
       * @tags organization
       * @name OrgGetUserPermissions
       * @summary Get user permissions in organization
       * @request GET:/users/{username}/orgs/{org}/permissions
       * @secure
       */
      orgGetUserPermissions: (username, org, params = {}) => this.request(__spreadValues({
        path: `/users/${username}/orgs/${org}/permissions`,
        method: "GET",
        secure: true
      }, params)),
      /**
       * No description
       *
       * @tags user
       * @name UserListRepos
       * @summary List the repos owned by the given user
       * @request GET:/users/{username}/repos
       * @secure
       */
      userListRepos: (username, query, params = {}) => this.request(__spreadValues({
        path: `/users/${username}/repos`,
        method: "GET",
        query,
        secure: true
      }, params)),
      /**
       * No description
       *
       * @tags user
       * @name UserListStarred
       * @summary The repos that the given user has starred
       * @request GET:/users/{username}/starred
       * @secure
       */
      userListStarred: (username, query, params = {}) => this.request(__spreadValues({
        path: `/users/${username}/starred`,
        method: "GET",
        query,
        secure: true
      }, params)),
      /**
       * No description
       *
       * @tags user
       * @name UserListSubscriptions
       * @summary List the repositories watched by a user
       * @request GET:/users/{username}/subscriptions
       * @secure
       */
      userListSubscriptions: (username, query, params = {}) => this.request(__spreadValues({
        path: `/users/${username}/subscriptions`,
        method: "GET",
        query,
        secure: true
      }, params)),
      /**
       * No description
       *
       * @tags user
       * @name UserGetTokens
       * @summary List the authenticated user's access tokens
       * @request GET:/users/{username}/tokens
       * @secure
       */
      userGetTokens: (username, query, params = {}) => this.request(__spreadValues({
        path: `/users/${username}/tokens`,
        method: "GET",
        query,
        secure: true
      }, params)),
      /**
       * No description
       *
       * @tags user
       * @name UserCreateToken
       * @summary Create an access token
       * @request POST:/users/{username}/tokens
       * @secure
       */
      userCreateToken: (username, body, params = {}) => this.request(__spreadValues({
        path: `/users/${username}/tokens`,
        method: "POST",
        body,
        secure: true,
        type: "application/json" /* Json */
      }, params)),
      /**
       * No description
       *
       * @tags user
       * @name UserDeleteAccessToken
       * @summary delete an access token
       * @request DELETE:/users/{username}/tokens/{token}
       * @secure
       */
      userDeleteAccessToken: (username, token, params = {}) => this.request(__spreadValues({
        path: `/users/${username}/tokens/${token}`,
        method: "DELETE",
        secure: true
      }, params))
    };
    this.version = {
      /**
       * No description
       *
       * @tags miscellaneous
       * @name GetVersion
       * @summary Returns the version of the Gitea application
       * @request GET:/version
       * @secure
       */
      getVersion: (params = {}) => this.request(__spreadValues({
        path: `/version`,
        method: "GET",
        secure: true
      }, params))
    };
  }
};

// src/index.ts
function giteaApi(baseUrl, options) {
  return new Api(__spreadProps(__spreadValues({}, options), {
    baseUrl: `${baseUrl}/api/v1`,
    baseApiParams: {
      format: "json"
    },
    securityWorker: (securityData) => {
      if (!(options == null ? void 0 : options.token)) {
        return;
      }
      return {
        secure: true,
        headers: {
          Authorization: `Bearer ${options.token}`
        }
      };
    }
  }));
}
// Annotate the CommonJS export names for ESM import in node:
0 && (0);
/**
 * @title Gitea API
 * @version 1.22.0
 * @license MIT (http://opensource.org/licenses/MIT)
 * @baseUrl /api/v1
 *
 * This documentation describes the Gitea API.
 */


/***/ }),

/***/ 294:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

module.exports = __nccwpck_require__(219);


/***/ }),

/***/ 219:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";


var net = __nccwpck_require__(808);
var tls = __nccwpck_require__(404);
var http = __nccwpck_require__(685);
var https = __nccwpck_require__(687);
var events = __nccwpck_require__(361);
var assert = __nccwpck_require__(491);
var util = __nccwpck_require__(837);


exports.httpOverHttp = httpOverHttp;
exports.httpsOverHttp = httpsOverHttp;
exports.httpOverHttps = httpOverHttps;
exports.httpsOverHttps = httpsOverHttps;


function httpOverHttp(options) {
  var agent = new TunnelingAgent(options);
  agent.request = http.request;
  return agent;
}

function httpsOverHttp(options) {
  var agent = new TunnelingAgent(options);
  agent.request = http.request;
  agent.createSocket = createSecureSocket;
  agent.defaultPort = 443;
  return agent;
}

function httpOverHttps(options) {
  var agent = new TunnelingAgent(options);
  agent.request = https.request;
  return agent;
}

function httpsOverHttps(options) {
  var agent = new TunnelingAgent(options);
  agent.request = https.request;
  agent.createSocket = createSecureSocket;
  agent.defaultPort = 443;
  return agent;
}


function TunnelingAgent(options) {
  var self = this;
  self.options = options || {};
  self.proxyOptions = self.options.proxy || {};
  self.maxSockets = self.options.maxSockets || http.Agent.defaultMaxSockets;
  self.requests = [];
  self.sockets = [];

  self.on('free', function onFree(socket, host, port, localAddress) {
    var options = toOptions(host, port, localAddress);
    for (var i = 0, len = self.requests.length; i < len; ++i) {
      var pending = self.requests[i];
      if (pending.host === options.host && pending.port === options.port) {
        // Detect the request to connect same origin server,
        // reuse the connection.
        self.requests.splice(i, 1);
        pending.request.onSocket(socket);
        return;
      }
    }
    socket.destroy();
    self.removeSocket(socket);
  });
}
util.inherits(TunnelingAgent, events.EventEmitter);

TunnelingAgent.prototype.addRequest = function addRequest(req, host, port, localAddress) {
  var self = this;
  var options = mergeOptions({request: req}, self.options, toOptions(host, port, localAddress));

  if (self.sockets.length >= this.maxSockets) {
    // We are over limit so we'll add it to the queue.
    self.requests.push(options);
    return;
  }

  // If we are under maxSockets create a new one.
  self.createSocket(options, function(socket) {
    socket.on('free', onFree);
    socket.on('close', onCloseOrRemove);
    socket.on('agentRemove', onCloseOrRemove);
    req.onSocket(socket);

    function onFree() {
      self.emit('free', socket, options);
    }

    function onCloseOrRemove(err) {
      self.removeSocket(socket);
      socket.removeListener('free', onFree);
      socket.removeListener('close', onCloseOrRemove);
      socket.removeListener('agentRemove', onCloseOrRemove);
    }
  });
};

TunnelingAgent.prototype.createSocket = function createSocket(options, cb) {
  var self = this;
  var placeholder = {};
  self.sockets.push(placeholder);

  var connectOptions = mergeOptions({}, self.proxyOptions, {
    method: 'CONNECT',
    path: options.host + ':' + options.port,
    agent: false,
    headers: {
      host: options.host + ':' + options.port
    }
  });
  if (options.localAddress) {
    connectOptions.localAddress = options.localAddress;
  }
  if (connectOptions.proxyAuth) {
    connectOptions.headers = connectOptions.headers || {};
    connectOptions.headers['Proxy-Authorization'] = 'Basic ' +
        new Buffer(connectOptions.proxyAuth).toString('base64');
  }

  debug('making CONNECT request');
  var connectReq = self.request(connectOptions);
  connectReq.useChunkedEncodingByDefault = false; // for v0.6
  connectReq.once('response', onResponse); // for v0.6
  connectReq.once('upgrade', onUpgrade);   // for v0.6
  connectReq.once('connect', onConnect);   // for v0.7 or later
  connectReq.once('error', onError);
  connectReq.end();

  function onResponse(res) {
    // Very hacky. This is necessary to avoid http-parser leaks.
    res.upgrade = true;
  }

  function onUpgrade(res, socket, head) {
    // Hacky.
    process.nextTick(function() {
      onConnect(res, socket, head);
    });
  }

  function onConnect(res, socket, head) {
    connectReq.removeAllListeners();
    socket.removeAllListeners();

    if (res.statusCode !== 200) {
      debug('tunneling socket could not be established, statusCode=%d',
        res.statusCode);
      socket.destroy();
      var error = new Error('tunneling socket could not be established, ' +
        'statusCode=' + res.statusCode);
      error.code = 'ECONNRESET';
      options.request.emit('error', error);
      self.removeSocket(placeholder);
      return;
    }
    if (head.length > 0) {
      debug('got illegal response body from proxy');
      socket.destroy();
      var error = new Error('got illegal response body from proxy');
      error.code = 'ECONNRESET';
      options.request.emit('error', error);
      self.removeSocket(placeholder);
      return;
    }
    debug('tunneling connection has established');
    self.sockets[self.sockets.indexOf(placeholder)] = socket;
    return cb(socket);
  }

  function onError(cause) {
    connectReq.removeAllListeners();

    debug('tunneling socket could not be established, cause=%s\n',
          cause.message, cause.stack);
    var error = new Error('tunneling socket could not be established, ' +
                          'cause=' + cause.message);
    error.code = 'ECONNRESET';
    options.request.emit('error', error);
    self.removeSocket(placeholder);
  }
};

TunnelingAgent.prototype.removeSocket = function removeSocket(socket) {
  var pos = this.sockets.indexOf(socket)
  if (pos === -1) {
    return;
  }
  this.sockets.splice(pos, 1);

  var pending = this.requests.shift();
  if (pending) {
    // If we have pending requests and a socket gets closed a new one
    // needs to be created to take over in the pool for the one that closed.
    this.createSocket(pending, function(socket) {
      pending.request.onSocket(socket);
    });
  }
};

function createSecureSocket(options, cb) {
  var self = this;
  TunnelingAgent.prototype.createSocket.call(self, options, function(socket) {
    var hostHeader = options.request.getHeader('host');
    var tlsOptions = mergeOptions({}, self.options, {
      socket: socket,
      servername: hostHeader ? hostHeader.replace(/:.*$/, '') : options.host
    });

    // 0 is dummy port for v0.6
    var secureSocket = tls.connect(0, tlsOptions);
    self.sockets[self.sockets.indexOf(socket)] = secureSocket;
    cb(secureSocket);
  });
}


function toOptions(host, port, localAddress) {
  if (typeof host === 'string') { // since v0.10
    return {
      host: host,
      port: port,
      localAddress: localAddress
    };
  }
  return host; // for v0.11 or later
}

function mergeOptions(target) {
  for (var i = 1, len = arguments.length; i < len; ++i) {
    var overrides = arguments[i];
    if (typeof overrides === 'object') {
      var keys = Object.keys(overrides);
      for (var j = 0, keyLen = keys.length; j < keyLen; ++j) {
        var k = keys[j];
        if (overrides[k] !== undefined) {
          target[k] = overrides[k];
        }
      }
    }
  }
  return target;
}


var debug;
if (process.env.NODE_DEBUG && /\btunnel\b/.test(process.env.NODE_DEBUG)) {
  debug = function() {
    var args = Array.prototype.slice.call(arguments);
    if (typeof args[0] === 'string') {
      args[0] = 'TUNNEL: ' + args[0];
    } else {
      args.unshift('TUNNEL:');
    }
    console.error.apply(console, args);
  }
} else {
  debug = function() {};
}
exports.debug = debug; // for test


/***/ }),

/***/ 840:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
Object.defineProperty(exports, "v1", ({
  enumerable: true,
  get: function () {
    return _v.default;
  }
}));
Object.defineProperty(exports, "v3", ({
  enumerable: true,
  get: function () {
    return _v2.default;
  }
}));
Object.defineProperty(exports, "v4", ({
  enumerable: true,
  get: function () {
    return _v3.default;
  }
}));
Object.defineProperty(exports, "v5", ({
  enumerable: true,
  get: function () {
    return _v4.default;
  }
}));
Object.defineProperty(exports, "NIL", ({
  enumerable: true,
  get: function () {
    return _nil.default;
  }
}));
Object.defineProperty(exports, "version", ({
  enumerable: true,
  get: function () {
    return _version.default;
  }
}));
Object.defineProperty(exports, "validate", ({
  enumerable: true,
  get: function () {
    return _validate.default;
  }
}));
Object.defineProperty(exports, "stringify", ({
  enumerable: true,
  get: function () {
    return _stringify.default;
  }
}));
Object.defineProperty(exports, "parse", ({
  enumerable: true,
  get: function () {
    return _parse.default;
  }
}));

var _v = _interopRequireDefault(__nccwpck_require__(628));

var _v2 = _interopRequireDefault(__nccwpck_require__(409));

var _v3 = _interopRequireDefault(__nccwpck_require__(122));

var _v4 = _interopRequireDefault(__nccwpck_require__(120));

var _nil = _interopRequireDefault(__nccwpck_require__(332));

var _version = _interopRequireDefault(__nccwpck_require__(595));

var _validate = _interopRequireDefault(__nccwpck_require__(900));

var _stringify = _interopRequireDefault(__nccwpck_require__(950));

var _parse = _interopRequireDefault(__nccwpck_require__(746));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ }),

/***/ 569:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = void 0;

var _crypto = _interopRequireDefault(__nccwpck_require__(113));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function md5(bytes) {
  if (Array.isArray(bytes)) {
    bytes = Buffer.from(bytes);
  } else if (typeof bytes === 'string') {
    bytes = Buffer.from(bytes, 'utf8');
  }

  return _crypto.default.createHash('md5').update(bytes).digest();
}

var _default = md5;
exports["default"] = _default;

/***/ }),

/***/ 332:
/***/ ((__unused_webpack_module, exports) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = void 0;
var _default = '00000000-0000-0000-0000-000000000000';
exports["default"] = _default;

/***/ }),

/***/ 746:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = void 0;

var _validate = _interopRequireDefault(__nccwpck_require__(900));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function parse(uuid) {
  if (!(0, _validate.default)(uuid)) {
    throw TypeError('Invalid UUID');
  }

  let v;
  const arr = new Uint8Array(16); // Parse ########-....-....-....-............

  arr[0] = (v = parseInt(uuid.slice(0, 8), 16)) >>> 24;
  arr[1] = v >>> 16 & 0xff;
  arr[2] = v >>> 8 & 0xff;
  arr[3] = v & 0xff; // Parse ........-####-....-....-............

  arr[4] = (v = parseInt(uuid.slice(9, 13), 16)) >>> 8;
  arr[5] = v & 0xff; // Parse ........-....-####-....-............

  arr[6] = (v = parseInt(uuid.slice(14, 18), 16)) >>> 8;
  arr[7] = v & 0xff; // Parse ........-....-....-####-............

  arr[8] = (v = parseInt(uuid.slice(19, 23), 16)) >>> 8;
  arr[9] = v & 0xff; // Parse ........-....-....-....-############
  // (Use "/" to avoid 32-bit truncation when bit-shifting high-order bytes)

  arr[10] = (v = parseInt(uuid.slice(24, 36), 16)) / 0x10000000000 & 0xff;
  arr[11] = v / 0x100000000 & 0xff;
  arr[12] = v >>> 24 & 0xff;
  arr[13] = v >>> 16 & 0xff;
  arr[14] = v >>> 8 & 0xff;
  arr[15] = v & 0xff;
  return arr;
}

var _default = parse;
exports["default"] = _default;

/***/ }),

/***/ 490:
/***/ ((__unused_webpack_module, exports) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = void 0;
var _default = /^(?:[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}|00000000-0000-0000-0000-000000000000)$/i;
exports["default"] = _default;

/***/ }),

/***/ 807:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = rng;

var _crypto = _interopRequireDefault(__nccwpck_require__(113));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const rnds8Pool = new Uint8Array(256); // # of random values to pre-allocate

let poolPtr = rnds8Pool.length;

function rng() {
  if (poolPtr > rnds8Pool.length - 16) {
    _crypto.default.randomFillSync(rnds8Pool);

    poolPtr = 0;
  }

  return rnds8Pool.slice(poolPtr, poolPtr += 16);
}

/***/ }),

/***/ 274:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = void 0;

var _crypto = _interopRequireDefault(__nccwpck_require__(113));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function sha1(bytes) {
  if (Array.isArray(bytes)) {
    bytes = Buffer.from(bytes);
  } else if (typeof bytes === 'string') {
    bytes = Buffer.from(bytes, 'utf8');
  }

  return _crypto.default.createHash('sha1').update(bytes).digest();
}

var _default = sha1;
exports["default"] = _default;

/***/ }),

/***/ 950:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = void 0;

var _validate = _interopRequireDefault(__nccwpck_require__(900));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Convert array of 16 byte values to UUID string format of the form:
 * XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX
 */
const byteToHex = [];

for (let i = 0; i < 256; ++i) {
  byteToHex.push((i + 0x100).toString(16).substr(1));
}

function stringify(arr, offset = 0) {
  // Note: Be careful editing this code!  It's been tuned for performance
  // and works in ways you may not expect. See https://github.com/uuidjs/uuid/pull/434
  const uuid = (byteToHex[arr[offset + 0]] + byteToHex[arr[offset + 1]] + byteToHex[arr[offset + 2]] + byteToHex[arr[offset + 3]] + '-' + byteToHex[arr[offset + 4]] + byteToHex[arr[offset + 5]] + '-' + byteToHex[arr[offset + 6]] + byteToHex[arr[offset + 7]] + '-' + byteToHex[arr[offset + 8]] + byteToHex[arr[offset + 9]] + '-' + byteToHex[arr[offset + 10]] + byteToHex[arr[offset + 11]] + byteToHex[arr[offset + 12]] + byteToHex[arr[offset + 13]] + byteToHex[arr[offset + 14]] + byteToHex[arr[offset + 15]]).toLowerCase(); // Consistency check for valid UUID.  If this throws, it's likely due to one
  // of the following:
  // - One or more input array values don't map to a hex octet (leading to
  // "undefined" in the uuid)
  // - Invalid input values for the RFC `version` or `variant` fields

  if (!(0, _validate.default)(uuid)) {
    throw TypeError('Stringified UUID is invalid');
  }

  return uuid;
}

var _default = stringify;
exports["default"] = _default;

/***/ }),

/***/ 628:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = void 0;

var _rng = _interopRequireDefault(__nccwpck_require__(807));

var _stringify = _interopRequireDefault(__nccwpck_require__(950));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// **`v1()` - Generate time-based UUID**
//
// Inspired by https://github.com/LiosK/UUID.js
// and http://docs.python.org/library/uuid.html
let _nodeId;

let _clockseq; // Previous uuid creation time


let _lastMSecs = 0;
let _lastNSecs = 0; // See https://github.com/uuidjs/uuid for API details

function v1(options, buf, offset) {
  let i = buf && offset || 0;
  const b = buf || new Array(16);
  options = options || {};
  let node = options.node || _nodeId;
  let clockseq = options.clockseq !== undefined ? options.clockseq : _clockseq; // node and clockseq need to be initialized to random values if they're not
  // specified.  We do this lazily to minimize issues related to insufficient
  // system entropy.  See #189

  if (node == null || clockseq == null) {
    const seedBytes = options.random || (options.rng || _rng.default)();

    if (node == null) {
      // Per 4.5, create and 48-bit node id, (47 random bits + multicast bit = 1)
      node = _nodeId = [seedBytes[0] | 0x01, seedBytes[1], seedBytes[2], seedBytes[3], seedBytes[4], seedBytes[5]];
    }

    if (clockseq == null) {
      // Per 4.2.2, randomize (14 bit) clockseq
      clockseq = _clockseq = (seedBytes[6] << 8 | seedBytes[7]) & 0x3fff;
    }
  } // UUID timestamps are 100 nano-second units since the Gregorian epoch,
  // (1582-10-15 00:00).  JSNumbers aren't precise enough for this, so
  // time is handled internally as 'msecs' (integer milliseconds) and 'nsecs'
  // (100-nanoseconds offset from msecs) since unix epoch, 1970-01-01 00:00.


  let msecs = options.msecs !== undefined ? options.msecs : Date.now(); // Per 4.2.1.2, use count of uuid's generated during the current clock
  // cycle to simulate higher resolution clock

  let nsecs = options.nsecs !== undefined ? options.nsecs : _lastNSecs + 1; // Time since last uuid creation (in msecs)

  const dt = msecs - _lastMSecs + (nsecs - _lastNSecs) / 10000; // Per 4.2.1.2, Bump clockseq on clock regression

  if (dt < 0 && options.clockseq === undefined) {
    clockseq = clockseq + 1 & 0x3fff;
  } // Reset nsecs if clock regresses (new clockseq) or we've moved onto a new
  // time interval


  if ((dt < 0 || msecs > _lastMSecs) && options.nsecs === undefined) {
    nsecs = 0;
  } // Per 4.2.1.2 Throw error if too many uuids are requested


  if (nsecs >= 10000) {
    throw new Error("uuid.v1(): Can't create more than 10M uuids/sec");
  }

  _lastMSecs = msecs;
  _lastNSecs = nsecs;
  _clockseq = clockseq; // Per 4.1.4 - Convert from unix epoch to Gregorian epoch

  msecs += 12219292800000; // `time_low`

  const tl = ((msecs & 0xfffffff) * 10000 + nsecs) % 0x100000000;
  b[i++] = tl >>> 24 & 0xff;
  b[i++] = tl >>> 16 & 0xff;
  b[i++] = tl >>> 8 & 0xff;
  b[i++] = tl & 0xff; // `time_mid`

  const tmh = msecs / 0x100000000 * 10000 & 0xfffffff;
  b[i++] = tmh >>> 8 & 0xff;
  b[i++] = tmh & 0xff; // `time_high_and_version`

  b[i++] = tmh >>> 24 & 0xf | 0x10; // include version

  b[i++] = tmh >>> 16 & 0xff; // `clock_seq_hi_and_reserved` (Per 4.2.2 - include variant)

  b[i++] = clockseq >>> 8 | 0x80; // `clock_seq_low`

  b[i++] = clockseq & 0xff; // `node`

  for (let n = 0; n < 6; ++n) {
    b[i + n] = node[n];
  }

  return buf || (0, _stringify.default)(b);
}

var _default = v1;
exports["default"] = _default;

/***/ }),

/***/ 409:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = void 0;

var _v = _interopRequireDefault(__nccwpck_require__(998));

var _md = _interopRequireDefault(__nccwpck_require__(569));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const v3 = (0, _v.default)('v3', 0x30, _md.default);
var _default = v3;
exports["default"] = _default;

/***/ }),

/***/ 998:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = _default;
exports.URL = exports.DNS = void 0;

var _stringify = _interopRequireDefault(__nccwpck_require__(950));

var _parse = _interopRequireDefault(__nccwpck_require__(746));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function stringToBytes(str) {
  str = unescape(encodeURIComponent(str)); // UTF8 escape

  const bytes = [];

  for (let i = 0; i < str.length; ++i) {
    bytes.push(str.charCodeAt(i));
  }

  return bytes;
}

const DNS = '6ba7b810-9dad-11d1-80b4-00c04fd430c8';
exports.DNS = DNS;
const URL = '6ba7b811-9dad-11d1-80b4-00c04fd430c8';
exports.URL = URL;

function _default(name, version, hashfunc) {
  function generateUUID(value, namespace, buf, offset) {
    if (typeof value === 'string') {
      value = stringToBytes(value);
    }

    if (typeof namespace === 'string') {
      namespace = (0, _parse.default)(namespace);
    }

    if (namespace.length !== 16) {
      throw TypeError('Namespace must be array-like (16 iterable integer values, 0-255)');
    } // Compute hash of namespace and value, Per 4.3
    // Future: Use spread syntax when supported on all platforms, e.g. `bytes =
    // hashfunc([...namespace, ... value])`


    let bytes = new Uint8Array(16 + value.length);
    bytes.set(namespace);
    bytes.set(value, namespace.length);
    bytes = hashfunc(bytes);
    bytes[6] = bytes[6] & 0x0f | version;
    bytes[8] = bytes[8] & 0x3f | 0x80;

    if (buf) {
      offset = offset || 0;

      for (let i = 0; i < 16; ++i) {
        buf[offset + i] = bytes[i];
      }

      return buf;
    }

    return (0, _stringify.default)(bytes);
  } // Function#name is not settable on some platforms (#270)


  try {
    generateUUID.name = name; // eslint-disable-next-line no-empty
  } catch (err) {} // For CommonJS default export support


  generateUUID.DNS = DNS;
  generateUUID.URL = URL;
  return generateUUID;
}

/***/ }),

/***/ 122:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = void 0;

var _rng = _interopRequireDefault(__nccwpck_require__(807));

var _stringify = _interopRequireDefault(__nccwpck_require__(950));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function v4(options, buf, offset) {
  options = options || {};

  const rnds = options.random || (options.rng || _rng.default)(); // Per 4.4, set bits for version and `clock_seq_hi_and_reserved`


  rnds[6] = rnds[6] & 0x0f | 0x40;
  rnds[8] = rnds[8] & 0x3f | 0x80; // Copy bytes to buffer, if provided

  if (buf) {
    offset = offset || 0;

    for (let i = 0; i < 16; ++i) {
      buf[offset + i] = rnds[i];
    }

    return buf;
  }

  return (0, _stringify.default)(rnds);
}

var _default = v4;
exports["default"] = _default;

/***/ }),

/***/ 120:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = void 0;

var _v = _interopRequireDefault(__nccwpck_require__(998));

var _sha = _interopRequireDefault(__nccwpck_require__(274));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const v5 = (0, _v.default)('v5', 0x50, _sha.default);
var _default = v5;
exports["default"] = _default;

/***/ }),

/***/ 900:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = void 0;

var _regex = _interopRequireDefault(__nccwpck_require__(490));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function validate(uuid) {
  return typeof uuid === 'string' && _regex.default.test(uuid);
}

var _default = validate;
exports["default"] = _default;

/***/ }),

/***/ 595:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = void 0;

var _validate = _interopRequireDefault(__nccwpck_require__(900));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function version(uuid) {
  if (!(0, _validate.default)(uuid)) {
    throw TypeError('Invalid UUID');
  }

  return parseInt(uuid.substr(14, 1), 16);
}

var _default = version;
exports["default"] = _default;

/***/ }),

/***/ 491:
/***/ ((module) => {

"use strict";
module.exports = require("assert");

/***/ }),

/***/ 113:
/***/ ((module) => {

"use strict";
module.exports = require("crypto");

/***/ }),

/***/ 361:
/***/ ((module) => {

"use strict";
module.exports = require("events");

/***/ }),

/***/ 147:
/***/ ((module) => {

"use strict";
module.exports = require("fs");

/***/ }),

/***/ 685:
/***/ ((module) => {

"use strict";
module.exports = require("http");

/***/ }),

/***/ 687:
/***/ ((module) => {

"use strict";
module.exports = require("https");

/***/ }),

/***/ 808:
/***/ ((module) => {

"use strict";
module.exports = require("net");

/***/ }),

/***/ 37:
/***/ ((module) => {

"use strict";
module.exports = require("os");

/***/ }),

/***/ 17:
/***/ ((module) => {

"use strict";
module.exports = require("path");

/***/ }),

/***/ 404:
/***/ ((module) => {

"use strict";
module.exports = require("tls");

/***/ }),

/***/ 837:
/***/ ((module) => {

"use strict";
module.exports = require("util");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __nccwpck_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		var threw = true;
/******/ 		try {
/******/ 			__webpack_modules__[moduleId].call(module.exports, module, module.exports, __nccwpck_require__);
/******/ 			threw = false;
/******/ 		} finally {
/******/ 			if(threw) delete __webpack_module_cache__[moduleId];
/******/ 		}
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat */
/******/ 	
/******/ 	if (typeof __nccwpck_require__ !== 'undefined') __nccwpck_require__.ab = __dirname + "/";
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __nccwpck_require__(109);
/******/ 	module.exports = __webpack_exports__;
/******/ 	
/******/ })()
;
//# sourceMappingURL=index.js.map