import { interfaces } from "@action-runner/common";
import { MissingRequiredParametersError } from "@action-runner/errors";
import YAML from "yaml";
import * as fs from "fs";
import { ActionJob } from "./action_job";

interface Props {
  yamlFilePath?: string;
  yamlFileContent?: string;
}

export class ActionParser {
  actionConfig!: interfaces.githubAction.GithubAction;

  constructor({ yamlFileContent, yamlFilePath }: Props) {
    if (yamlFilePath) {
      const fileContent = fs.readFileSync(yamlFilePath, "utf-8");
      this.actionConfig = YAML.parse(fileContent);
      return;
    }

    if (yamlFileContent) {
      this.actionConfig = YAML.parse(yamlFileContent);
      return;
    }

    throw new MissingRequiredParametersError([
      "yamlFileContent",
      "yamlFilePath",
    ]);
  }

  parse() {
    const newJobMap: { [key: string]: ActionJob } = {};
    for (const [key, value] of Object.entries(this.actionConfig.jobs)) {
      const actionJob = new ActionJob(key, value);
      actionJob.parse();
      newJobMap[key] = actionJob;
    }
  }
}
