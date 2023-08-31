const used = new Set<string>();

export function random(): string {
  const result = Math.random().toString(36).substring(2);
  return used.has(result) ? random() : result;
}
