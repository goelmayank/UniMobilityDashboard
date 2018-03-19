export function DotString(value: any, dot: any = "--"): string {
  return value || value === 0 || value === "" ? value : dot;
}
