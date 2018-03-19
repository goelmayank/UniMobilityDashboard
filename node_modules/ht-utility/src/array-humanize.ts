export function ArrayHumanize(array: string[]): string {
  return array.reduce((acc, string, i) => {
    let connector = ", ";
    if (i == 0) connector = "";
    if (i == array.length - 1) connector = " and ";
    return acc + connector + string;
  }, "");
}
