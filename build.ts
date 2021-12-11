import HandlebarsJS from "https://dev.jspm.io/handlebars@4.7.6";
import { getTableFromData, readFileData } from "./utils.ts";

async function main() {
  const source = await Deno.readTextFile("data/template.hbs");

  // Context
  let videos = await readFileData("data/videos.txt");
  let people = (await readFileData("data/people.txt")).sort((a, b) =>
    a.col2.localeCompare(b.col2)
  );

  const table = getTableFromData(people);

  // Render with context
  const render = (HandlebarsJS as any).compile(source);
  const text = render({
    videos,
    table,
  });

  await Deno.writeTextFile("./README.md", text);
}

await main();
