export function camelToKebab(str: string): string {
  return str.trim().replace(/[A-Z]/g, l => `-${l.toLowerCase()}`);
}
