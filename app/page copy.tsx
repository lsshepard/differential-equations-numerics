"use client";

import { Scatter } from "react-chartjs-2";
import {
  Chart as ChartJS,
  PointElement,
  LinearScale,
  Tooltip,
  LineElement,
} from "chart.js";

import { linspace } from "@/lib/utils";

import lagrange_interpolation from "@/lib/interpolation";

export default function Home() {
  const a = -4;
  const b = 4;
  const N = 5;
  const M = 1000;
  const f = (x: number) => 2.5 * Math.sin(x);

  const x_points = linspace(a, b, N);
  const y_points = x_points.map((v) => f(v));

  const f_interpolation = lagrange_interpolation(x_points, y_points);

  const points = x_points.map((v, i) => ({ x: v, y: y_points[i] }));
  const original = linspace(a, b, M).map((v) => ({
    x: v,
    y: f(v),
  }));
  const interpolation = linspace(a, b, M).map((v) => ({
    x: v,
    y: f_interpolation(v),
  }));

  ChartJS.register(LinearScale, PointElement, LineElement);

  return (
    <Scatter
      data={{
        datasets: [
          { data: points },
          { data: original, showLine: true, borderColor: "orange" },
          { data: interpolation, showLine: true, borderColor: "blue" },
        ],
      }}
    />
  );
}
