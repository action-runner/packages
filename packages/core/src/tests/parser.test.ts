import * as fs from "fs";
import { ActionParser } from "../core/parser";

jest.mock("fs", () => ({
  readFileSync: jest.fn().mockReturnValue("name: mock_name"),
}));

describe("Given a parser", () => {
  describe("When calling constructor", () => {
    test("Should return no error", () => {
      const parser = new ActionParser({ yamlFilePath: "mock_path" });
      expect(parser).toBeDefined();
      expect(fs.readFileSync).toBeCalledTimes(1);
      expect(parser.actionConfig).toBeDefined();
    });

    test("Should return no error", () => {
      const parser = new ActionParser({ yamlFileContent: "mock_path" });
      expect(parser).toBeDefined();
      expect(parser.actionConfig).toBeDefined();
    });

    test("Should return an error", () => {
      expect(() => new ActionParser({})).toThrow();
    });
  });
});
