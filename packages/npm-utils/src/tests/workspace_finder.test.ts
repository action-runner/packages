import { interfaces } from "@action-runner/common";
import glob from "glob";
import fs from "fs";
import { findWorkspacePackageJSONs } from "..";

jest.mock("fs");
jest.mock("glob");

describe("Given a workspace finder", () => {
  test("When package.json contains no workspace field", () => {
    // mock package.json
    const packageJSON: interfaces.npm.PackageJSON = {
      name: "test",
      version: "1.0.0",
      description: "test",
      main: "index.js",
      workspaces: [],
    };
    (fs.readFileSync as jest.Mock).mockReturnValue(JSON.stringify(packageJSON));
    const results = findWorkspacePackageJSONs("/path/to/package.json");
    expect(results).toEqual([]);
  });

  test("When package.json contains a workspace field", () => {
    // mock package.json
    const packageJSON: interfaces.npm.PackageJSON = {
      name: "test",
      version: "1.0.0",
      description: "test",
      main: "index.js",
      workspaces: ["packages/*"],
    };
    (fs.readFileSync as jest.Mock).mockReturnValue(JSON.stringify(packageJSON));
    (glob.sync as jest.Mock).mockReturnValue([
      "/path/to/packages/package.json",
    ]);

    const results = findWorkspacePackageJSONs("/path/to/package.json");
    expect(results).toEqual(["/path/to/packages/package.json"]);
  });

  test("When package.json contains multiple workspaces", () => {
    // mock package.json
    const packageJSON: interfaces.npm.PackageJSON = {
      name: "test",
      version: "1.0.0",
      description: "test",
      main: "index.js",
      workspaces: ["packages/*", "packages/test/*"],
    };
    (fs.readFileSync as jest.Mock).mockReturnValue(JSON.stringify(packageJSON));
    (glob.sync as jest.Mock).mockReturnValue([
      "/path/to/packages/package.json",
      "/path/to/packages/test/package.json",
    ]);

    const results = findWorkspacePackageJSONs("/path/to/package.json");
    expect(results).toEqual([
      "/path/to/packages/package.json",
      "/path/to/packages/test/package.json",
    ]);
  });

  test("When package.json contains a workspace field with a glob", () => {
    // mock package.json
    const packageJSON: interfaces.npm.PackageJSON = {
      name: "test",
      version: "1.0.0",
      description: "test",
      main: "index.js",
      workspaces: ["packages/*"],
    };
    (fs.readFileSync as jest.Mock).mockReturnValue(JSON.stringify(packageJSON));
    (glob.sync as jest.Mock).mockReturnValue([
      "/path/to/packages/package.json",
    ]);

    const results = findWorkspacePackageJSONs("/path/to/package.json");
    expect(results).toEqual(["/path/to/packages/package.json"]);
  });
});
