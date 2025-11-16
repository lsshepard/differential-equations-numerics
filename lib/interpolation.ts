const g = (x: number) => x ** 2;

export const lagrange_interpolation = (
  X: number[],
  Y: number[]
): ((x: number) => number) => {
  const l: ((x: number) => number)[] = [];
  for (let i = 0; i < X.length; i++) {
    let l_i = (x: number) => Y[i];
    for (const x_j of X) {
      if (X[i] != x_j) {
        const prev = l_i;
        l_i = (x) => (prev(x) * (x - x_j)) / (X[i] - x_j);
      }
    }
    l.push(l_i);
  }

  const interpolation = (x: number) => {
    let y = 0;
    for (const l_i of l) y += l_i(x);
    return y;
  };

  return interpolation;
};

export const newton_interpolation = (X: number[], Y: number[]) => {
  const divided_differences: number[][] = Array.from({ length: Y.length }, () =>
    Array(Y.length).fill(0)
  );
  divided_differences[0] = [...Y];

  let w = (x: number) => 1;
  const p: ((x: number) => number)[] = [(x: number) => Y[0]];

  for (let i = 1; i < Y.length; i++) {
    for (let j = i; j < Y.length; j++) {
      divided_differences[i][j] =
        (divided_differences[i - 1][j] - divided_differences[i - 1][j - 1]) /
        (X[j] - X[j - i]);
    }
    const old_w = w;
    w = (x: number) => old_w(x) * (x - X[i - 1]);
    const w_i = w;
    p.push((x: number) => w_i(x) * divided_differences[i][i]);
  }

  console.log(divided_differences);

  const interpolation = (x: number) => {
    let y = 0;
    for (const p_i of p) y += p_i(x);
    return y;
  };

  return interpolation;
};
