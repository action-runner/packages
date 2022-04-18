import { interfaces } from "@action-runner/common";

export class ActionStep {
  step: interfaces.githubAction.Step;

  constructor(step: interfaces.githubAction.Step) {
    this.step = step;
  }
}
