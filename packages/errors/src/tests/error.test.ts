import { MissingRequiredParametersError } from "../errors";
import { ErrorNames } from "../enums/names";

describe("Given a list of error", () => {
  test("When calling missing required parameter error", () => {
    const error = new MissingRequiredParametersError(["a", "b"]);
    expect(error.message).toBe("Missing required parameter (a,b)");
    expect(error.name).toBe(ErrorNames.MissingRequiredParametersError);
  });

  test("When calling missing required parameter error", () => {
    const error = new MissingRequiredParametersError(["a"]);
    expect(error.message).toBe("Missing required parameter (a)");
    expect(error.name).toBe(ErrorNames.MissingRequiredParametersError);
  });
});
