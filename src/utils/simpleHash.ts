export function simpleHash(input: string) {
  let hash = 0;
  if (input.length === 0) {
    return hash;
  }
  for (var i = 0; i < input.length; i++) {
    const char = input.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash;
  }
  return Math.abs(hash).toString();
}
