export const linspace = (a: number, b: number, n: number) => {
  const step = (b - a) / (n - 1);
  return [...Array(n)].map((_, i) => a + i * step);
};
