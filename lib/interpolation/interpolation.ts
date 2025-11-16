const g = (x: number) => x ** 2;

function lagrange_interpolation(
  X: number[],
  Y: number[]
): (x: number) => number {
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
}

export default lagrange_interpolation;
