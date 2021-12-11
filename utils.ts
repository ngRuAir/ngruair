// Reader
export async function readFileData(
  path: string,
): Promise<{ col1: string; col2: string }[]> {
  let data = await Deno.readTextFile(path);
  data = data.split("\n").map((row) => row.split(" | "));
  data.pop();
  return data.map((row) => ({ col1: row[0], col2: row[1] }));
}

// Single array to table
export function getTableFromData(
  data: any[],
  numberOfCols = 5,
): { cols: any[] }[] {
  const table = [];
  let cols = [];

  for (let i = 0; i < data.length; i++) {
    if (cols.length < numberOfCols) {
      cols.push(data[i]);
    } else {
      table.push({ cols });
      cols = [data[i]];
    }
  }
  if (cols.length > 0) {
    table.push({ cols });
  }
  return table;
}
