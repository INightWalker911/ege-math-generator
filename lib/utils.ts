/** Random integer from min to max (inclusive) */
export function randInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/** Random non-zero integer from -max to max */
export function randNonZero(max: number): number {
  let n = 0;
  while (n === 0) {
    n = randInt(-max, max);
  }
  return n;
}

/** Pick random element from array */
export function pick<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

/** Format a number with sign: +3, -5, etc. */
export function withSign(n: number): string {
  return n >= 0 ? `+ ${n}` : `- ${Math.abs(n)}`;
}

/** Format coefficient before x: 2x, -x, x */
export function formatCoeff(n: number, variable = 'x'): string {
  if (n === 1) return variable;
  if (n === -1) return `-${variable}`;
  return `${n}${variable}`;
}

/** Format a number, showing fractions as decimals */
export function formatNumber(n: number): string {
  if (Number.isInteger(n)) return String(n);
  // Round to avoid floating-point issues
  const rounded = Math.round(n * 10000) / 10000;
  return String(rounded);
}

/** Greatest common divisor */
export function gcd(a: number, b: number): number {
  a = Math.abs(a);
  b = Math.abs(b);
  while (b) {
    [a, b] = [b, a % b];
  }
  return a;
}
