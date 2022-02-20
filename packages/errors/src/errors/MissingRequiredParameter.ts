import { ErrorNames } from "../enums/names";

export class MissingRequiredParametersError extends Error {
  constructor(parameters: string[]) {
    const message = `Missing required parameter (${parameters})`;
    super(message);
    this.name = ErrorNames.MissingRequiredParametersError;
  }
}
