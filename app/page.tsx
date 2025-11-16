"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
const Plot = dynamic(() => import("react-plotly.js"), { ssr: false });

import { linspace } from "@/lib/interpolation/utils";
import lagrange_interpolation from "@/lib/interpolation/interpolation";

export default function Home() {
  const [a, setA] = useState(-4);
  const [b, setB] = useState(4);
  const [N, setN] = useState(5);

  const M = 1000;
  const f = (x: number) => 2.5 * Math.sin(x);

  const safeN = Math.max(2, N); // avoid degenerate interpolation

  const x_points = linspace(a, b, safeN);
  const y_points = x_points.map((v) => f(v));

  const f_interpolation = lagrange_interpolation(x_points, y_points);

  const original_x = linspace(a, b, M);
  const original_y = original_x.map((v) => f(v));

  const interp_x = linspace(a, b, M);
  const interp_y = interp_x.map((v) => f_interpolation(v));

  return (
    <div style={{ padding: 16 }}>
      <div style={{ display: "flex", gap: 12, marginBottom: 16 }}>
        <label>
          a:{" "}
          <input
            type="number"
            value={a}
            onChange={(e) => setA(Number(e.target.value))}
          />
        </label>
        <label>
          b:{" "}
          <input
            type="number"
            value={b}
            onChange={(e) => setB(Number(e.target.value))}
          />
        </label>
        <label>
          N (nodes):{" "}
          <input
            type="number"
            min={2}
            value={N}
            onChange={(e) => setN(Number(e.target.value))}
          />
        </label>
      </div>

      <Plot
        data={[
          {
            x: x_points,
            y: y_points,
            mode: "markers",
            name: "nodes",
          },
          {
            x: original_x,
            y: original_y,
            mode: "lines",
            name: "f(x)",
            line: { color: "orange" },
          },
          {
            x: interp_x,
            y: interp_y,
            mode: "lines",
            name: "interpolation",
            line: { color: "blue" },
          },
        ]}
        layout={{ margin: { t: 20, r: 20, b: 40, l: 40 } }}
        style={{ width: "100%", height: "500px" }}
      />
    </div>
  );
}
