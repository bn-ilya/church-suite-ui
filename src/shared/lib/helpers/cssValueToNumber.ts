export function cssValueToNumber(cssValue: string): number {
  return Number(cssValue.replaceAll(/[px|em|rem]/g, ""));
}