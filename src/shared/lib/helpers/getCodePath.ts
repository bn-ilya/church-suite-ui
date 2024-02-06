export function getCodePath(path: string) {
  return path.split('/').at(2);
}