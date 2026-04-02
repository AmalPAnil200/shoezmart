import { useEffect, useRef, useState } from "react";
import { Chart, registerables } from "chart.js";
import axios from "axios";
import AdminLayout from "../../layouts/AdminLayout";

Chart.register(...registerables);

const FinancialPerformance = () => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  // ── States ──
  const [range, setRange] = useState(0);
  const [rawData, setRawData] = useState({
    labels: [],
    sales: [],
    profit: [],
    loss: [],
  });
  const [metrics, setMetrics] = useState({ sales: 0, profit: 0, loss: 0 });
  const [loading, setLoading] = useState(true);

  const isDark =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-color-scheme: dark)").matches;

  // ── 1. Fetch & Transform Data ──
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/api/admin/sales-stats`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          },
        );
        const data = res.data; // Expected: [{name: "Jan", sales: 100, profit: 20, loss: 5}, ...]

        // Transform array of objects into arrays for Chart.js
        const transformed = {
          labels: data.map((d) => d.name),
          sales: data.map((d) => d.sales),
          profit: data.map((d) => d.profit),
          loss: data.map((d) => d.loss),
        };

        setRawData(transformed);
        setLoading(false);
      } catch (err) {
        console.error("Stats fetch failed", err);
      }
    };
    fetchData();
  }, []);

  // ── 2. Handle Slicing & Chart Updates ──
  useEffect(() => {
    if (loading || rawData.labels.length === 0) return;

    // Slice based on range (e.g., last 6 months)
    const n = range === 0 ? rawData.labels.length : range;
    const d = {
      labels: rawData.labels.slice(-n),
      sales: rawData.sales.slice(-n),
      profit: rawData.profit.slice(-n),
      loss: rawData.loss.slice(-n),
    };

    // Calculate Metric Totals
    const sum = (arr) => arr.reduce((a, b) => a + b, 0);
    setMetrics({
      sales: sum(d.sales),
      profit: sum(d.profit),
      loss: sum(d.loss),
    });

    // Update or Create Chart
    if (chartInstance.current) {
      chartInstance.current.data.labels = d.labels;
      chartInstance.current.data.datasets[0].data = d.sales;
      chartInstance.current.data.datasets[1].data = d.profit;
      chartInstance.current.data.datasets[2].data = d.loss;
      chartInstance.current.update();
    } else {
      const ctx = chartRef.current?.getContext("2d");
      if (!ctx) return;

      const gridColor = isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.05)";
      const tickColor = isDark ? "#888" : "#aaa";

      chartInstance.current = new Chart(ctx, {
        type: "line",
        data: {
          labels: d.labels,
          datasets: [
            {
              label: "Sales",
              data: d.sales,
              borderColor: "#e87722",
              backgroundColor: isDark
                ? "rgba(232,119,34,0.08)"
                : "rgba(232,119,34,0.07)",
              borderWidth: 2.5,
              tension: 0.4,
              fill: true,
            },
            {
              label: "Profit",
              data: d.profit,
              borderColor: "#2d8f5f",
              backgroundColor: "transparent",
              borderWidth: 2,
              tension: 0.4,
            },
            {
              label: "Loss",
              data: d.loss,
              borderColor: "#c0392b",
              backgroundColor: "transparent",
              borderWidth: 2,
              borderDash: [5, 4],
              tension: 0.4,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: { display: false },
            tooltip: {
              callbacks: {
                label: (ctx) =>
                  ` ${ctx.dataset.label}: ₹${ctx.parsed.y.toLocaleString()}`,
              },
            },
          },
          scales: {
            x: { grid: { display: false }, ticks: { color: tickColor } },
            y: {
              grid: { color: gridColor },
              ticks: {
                color: tickColor,
                callback: (v) =>
                  "₹" + (v >= 1000 ? (v / 1000).toFixed(0) + "k" : v),
              },
            },
          },
        },
      });
    }

    return () => {
      // chartInstance.current?.destroy();
    };
  }, [range, rawData, loading, isDark]);

  const fmtTotal = (n) => "₹" + (n >= 1000 ? (n / 1000).toFixed(1) + "k" : n);

  if (loading)
    return (
      <AdminLayout>
        <div className="h-64 flex items-center justify-center text-zinc-400 font-bold uppercase tracking-widest animate-pulse">
          Loading Analytics...
        </div>
      </AdminLayout>
    );

  return (
    <AdminLayout>
      <div className="bg-white dark:bg-zinc-900 rounded-[32px] border border-zinc-100 dark:border-zinc-800 p-8 shadow-sm">
        {/* Metric Cards */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          {[
            {
              label: "Total sales",
              value: fmtTotal(metrics.sales),
              color: "text-zinc-900 dark:text-zinc-100",
            },
            {
              label: "Net profit",
              value: fmtTotal(metrics.profit),
              color: "text-emerald-600",
            },
            {
              label: "Total loss",
              value: fmtTotal(metrics.loss),
              color: "text-red-500",
            },
          ].map(({ label, value, color }) => (
            <div
              key={label}
              className="bg-zinc-50 dark:bg-zinc-800/50 p-5 rounded-3xl border border-zinc-100 dark:border-zinc-800"
            >
              <p className="text-[10px] font-black uppercase text-zinc-400 tracking-widest mb-2">
                {label}
              </p>
              <p className={`text-2xl font-black italic ${color}`}>{value}</p>
            </div>
          ))}
        </div>

        {/* Chart Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex gap-4">
            {[
              { l: "Sales", c: "#e87722" },
              { l: "Profit", c: "#2d8f5f" },
              { l: "Loss", c: "#c0392b", d: true },
            ].map((i) => (
              <div
                key={i.l}
                className="flex items-center gap-2 text-[10px] font-bold uppercase text-zinc-500"
              >
                <div
                  className="w-3 h-1 rounded-full"
                  style={{
                    backgroundColor: i.c,
                    borderStyle: i.d ? "dashed" : "solid",
                  }}
                />
                {i.l}
              </div>
            ))}
          </div>
          <div className="flex bg-zinc-100 dark:bg-zinc-800 p-1 rounded-xl">
            {[6, 12, 0].map((v) => (
              <button
                key={v}
                onClick={() => setRange(v)}
                className={`px-4 py-1.5 rounded-lg text-[10px] font-black uppercase transition-all ${range === v ? "bg-white dark:bg-zinc-700 text-zinc-900 shadow-sm" : "text-zinc-400 hover:text-zinc-600"}`}
              >
                {v === 0 ? "All" : `${v}M`}
              </button>
            ))}
          </div>
        </div>

        <div className="h-64">
          <canvas ref={chartRef} />
        </div>
      </div>
    </AdminLayout>
  );
};

export default FinancialPerformance;
