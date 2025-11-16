export const forward_euler = (
  L: number,
  c: number,
  f: (x: number) => number,
  N: number,
  k: number,
  I: number
) => {
  const h = L / (N - 1);
  const U: number[][] = [Array(N).fill(0)];
  for (let i = 1; i < N - 1; i++) U[0][i] = f(i * h);
  U[0][0] = c;
  U[0][N - 1] = c;

  for (let i = 1; i <= I; i += 1) {
    U.push(Array(N).fill(0));
    U[i][0] = c;
    U[i][N - 1] = c;
    for (let j = 1; j < N - 1; j++) {
      U[i][j] =
        U[i - 1][j] +
        (k / h ** 2) * (U[i - 1][j + 1] - 2 * U[i - 1][j] + U[i - 1][j - 1]);
    }
  }

  return U;
};
