import fs from "fs";
import { generate } from "../generator";

jest.mock("fs", () => ({
  writeFileSync: jest.fn(),
  readdirSync: jest
    .fn()
    .mockReturnValue(["mock_a.json", "mock_b.json", "index.ts"]),
}));

jest.mock("json-schema-to-typescript", () => ({
  compileFromFile: jest.fn().mockResolvedValue("interface a {}"),
}));

describe("Given a generator", () => {
  beforeEach(() => {
    (fs.writeFileSync as any).mockClear();
  });

  test("Should return no error", async () => {
    await generate();
    expect(fs.writeFileSync).toBeCalledTimes(2);
    expect(fs.writeFileSync).toHaveBeenCalledWith(
      "src/interfaces/mock_a.ts",
      "interface a {}"
    );

    expect(fs.writeFileSync).toHaveBeenCalledWith(
      "src/interfaces/mock_b.ts",
      "interface a {}"
    );
  });
});
