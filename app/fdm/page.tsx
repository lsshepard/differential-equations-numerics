"use client";

import dynamic from "next/dynamic";
const Plot = dynamic(() => import("react-plotly.js"), { ssr: false });

import { forward_euler } from "@/lib/fdm";

export default function interpolation() {
  const k = 0.1;
  const N = 18;
  const L = 10;
  const c = -5;
  const U = forward_euler(L, c, (x: number) => Math.cos(x), N, k, 100);

  const z = U;
  const y = [...Array(z.length).keys()].map((i) => i * (L / (N - 1)));
  const x = [...Array(z[0].length).keys()].map((j) => j * k);

  return (
    <Plot
      data={[
        {
          type: "surface",
          z,
          x,
          y,
        },
      ]}
      layout={{
        autosize: true,
        margin: { l: 0, r: 0, b: 0, t: 0 },
      }}
      style={{ width: "100%", height: "100%" }}
      useResizeHandler
    />
  );
}
