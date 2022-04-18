import { interfaces } from "@action-runner/common";
import { Node } from "./node";

export class ActionJob extends Node {
  job:
    | interfaces.githubAction.NormalJob
    | interfaces.githubAction.ReusableWorkflowCallJob;

  constructor(
    name: string,
    job:
      | interfaces.githubAction.NormalJob
      | interfaces.githubAction.ReusableWorkflowCallJob
  ) {
    super(job.name ?? name);
    this.job = job;
  }

  parse() {}
}
