import fs from "fs";
import path from "path";
import { interfaces } from "@action-runner/common";
import glob from "glob";

/**
 * Given a package.json path, returns a list of package.json files listed
 * in the workspace section
 */
export function findWorkspacePackageJSONs(packageJSONPath: string): string[] {
  const packageJSON: interfaces.npm.PackageJSON = JSON.parse(
    fs.readFileSync(packageJSONPath, "utf8")
  );
  const workspace = packageJSON.workspaces;
  if (!workspace) {
    return [];
  }
  const workspacePath = path.dirname(packageJSONPath);
  const workspacePackageJSONs: string[] = [];
  for (const workspacePattern of workspace) {
    const globPattern = path.join(
      workspacePath,
      workspacePattern,
      "**/package.json"
    );
    // find matches but exclude the node_modules directory
    let matches = glob.sync(globPattern);
    matches = matches.filter((file) => !file.includes("node_modules"));
    workspacePackageJSONs.push(...matches);
  }

  // get unique package.json files
  return [...new Set(workspacePackageJSONs)];
}
