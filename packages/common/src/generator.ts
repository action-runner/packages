/**
 * Generate interfaces from json schema
 */
import fs from "fs";
import { compileFromFile } from "json-schema-to-typescript";
import path from "path";

const schemaPath = "./src/schemas";

export async function generate() {
  const outputPath = "./src/interfaces";

  const files = fs.readdirSync(schemaPath);
  for (const file of files) {
    if (path.parse(file).ext !== ".json") {
      continue;
    }
    console.log(`parsing ${file}`);
    const inputFilePath = path.join(schemaPath, file);
    const outputFilePath = path.join(outputPath, path.parse(file).name + ".ts");

    const outputInterface = await compileFromFile(inputFilePath, {
      format: true,
    });
    fs.writeFileSync(outputFilePath, outputInterface);
  }
}

(async () => {
  await generate();
})();
