import { useState } from "react";
import { developers, months, getMetric, getDeveloper } from "../data/data.js";
import { interpret, formatMonth } from "../data/interpret.js";
import MetricCard from "../components/MetricCard.jsx";
import PatternBadge from "../components/PatternBadge.jsx";
import InsightRow from "../components/InsightRow.jsx";

export default function ICView() {
  const [selectedDevId, setSelectedDevId] = useState("DEV-002");
  const [selectedMonth, setSelectedMonth] = useState("2026-04");

  const developer = getDeveloper(selectedDevId);
  const metric = getMetric(selectedDevId, selectedMonth);

  const monthIdx = months.indexOf(selectedMonth);
  const prevMonth = monthIdx > 0 ? months[monthIdx - 1] : null;
  const prevMetric = prevMonth ? getMetric(selectedDevId, prevMonth) : null;

  const interpretation = interpret(metric, developer);

  const getSeverity = (val, thresholds) => {
    if (val <= thresholds.good) return "good";
    if (val <= thresholds.warn) return "warn";
    return "critical";
  };

  const getTrend = (curr, prev, field) => {
    if (!prev) return null;
    return curr[field] < prev[field] ? "down" : "up";
  };

  return (
    <div style={{ maxWidth: "880px", margin: "0 auto", padding: "0 24px 80px" }}>
      {/* Selectors */}
      <div style={{ display: "flex", gap: "14px", marginBottom: "36px", flexWrap: "wrap" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
          <label style={{ fontSize: "10px", color: "#6b7280", textTransform: "uppercase", letterSpacing: "0.09em", fontFamily: "'DM Mono', monospace" }}>Developer</label>
          <select value={selectedDevId} onChange={e => setSelectedDevId(e.target.value)}
            style={{ background: "#111827", border: "1px solid #374151", color: "#f9fafb", padding: "9px 14px", borderRadius: "8px", fontSize: "14px", cursor: "pointer", minWidth: "260px" }}>
            {developers.map(d => <option key={d.developer_id} value={d.developer_id}>{d.developer_name} · {d.level} · {d.team_name}</option>)}
          </select>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
          <label style={{ fontSize: "10px", color: "#6b7280", textTransform: "uppercase", letterSpacing: "0.09em", fontFamily: "'DM Mono', monospace" }}>Month</label>
          <select value={selectedMonth} onChange={e => setSelectedMonth(e.target.value)}
            style={{ background: "#111827", border: "1px solid #374151", color: "#f9fafb", padding: "9px 14px", borderRadius: "8px", fontSize: "14px", cursor: "pointer" }}>
            {months.map(m => <option key={m} value={m}>{formatMonth(m)}</option>)}
          </select>
        </div>
      </div>

      {!metric && (
        <div style={{ color: "#6b7280", padding: "40px", textAlign: "center", border: "1px dashed #374151", borderRadius: "12px" }}>
          No data available for this selection.
        </div>
      )}

      {metric && developer && interpretation && (
        <>
          {/* Profile header */}
          <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: "20px", flexWrap: "wrap", gap: "16px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
              <div style={{
                width: "46px", height: "46px", borderRadius: "50%",
                background: "linear-gradient(135deg, #1d4ed8, #7c3aed)",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: "17px", fontWeight: "700", color: "#fff", flexShrink: 0,
                fontFamily: "'Syne', sans-serif",
              }}>
                {developer.developer_name.split(" ").map(n => n[0]).join("")}
              </div>
              <div>
                <h2 style={{ margin: "0 0 3px", fontSize: "21px", fontWeight: "700", color: "#f9fafb", fontFamily: "'Syne', sans-serif" }}>
                  {developer.developer_name}
                </h2>
                <div style={{ fontSize: "12px", color: "#6b7280" }}>
                  {developer.level} · {developer.team_name} · {developer.service_type}
                  <span style={{ color: "#374151", margin: "0 6px" }}>·</span>
                  Manager: <span style={{ color: "#9ca3af" }}>{developer.manager_name}</span>
                </div>
              </div>
            </div>
            <PatternBadge hint={metric.pattern_hint} />
          </div>

          {/* MoM comparison chips */}
          {prevMetric && (
            <div style={{ display: "flex", gap: "16px", flexWrap: "wrap", marginBottom: "20px" }}>
              {(() => {
                const cycDiff = metric.avg_cycle_time_days - prevMetric.avg_cycle_time_days;
                const ldDiff = metric.avg_lead_time_days - prevMetric.avg_lead_time_days;
                return (
                  <>
                    {Math.abs(cycDiff) >= 0.1 && (
                      <span style={{ fontSize: "12px", color: cycDiff < 0 ? "#4ade80" : "#f87171", fontFamily: "'DM Mono', monospace" }}>
                        {cycDiff < 0 ? "↓" : "↑"} Cycle time {Math.abs(cycDiff).toFixed(1)}d vs {formatMonth(prevMonth)}
                      </span>
                    )}
                    {Math.abs(ldDiff) >= 0.1 && (
                      <span style={{ fontSize: "12px", color: ldDiff < 0 ? "#4ade80" : "#f87171", fontFamily: "'DM Mono', monospace" }}>
                        {ldDiff < 0 ? "↓" : "↑"} Lead time {Math.abs(ldDiff).toFixed(1)}d vs {formatMonth(prevMonth)}
                      </span>
                    )}
                  </>
                );
              })()}
            </div>
          )}

          {/* 5 Metric Cards */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(155px, 1fr))", gap: "12px", marginBottom: "28px" }}>
            <MetricCard icon="⏱" label="Cycle Time" value={metric.avg_cycle_time_days.toFixed(1)} unit="days"
              severity={getSeverity(metric.avg_cycle_time_days, { good: 4, warn: 5.5 })}
              trend={getTrend(metric, prevMetric, "avg_cycle_time_days")} />
            <MetricCard icon="🚀" label="Lead Time" value={metric.avg_lead_time_days.toFixed(1)} unit="days"
              severity={getSeverity(metric.avg_lead_time_days, { good: 3, warn: 4.5 })}
              trend={getTrend(metric, prevMetric, "avg_lead_time_days")} />
            <MetricCard icon="🐛" label="Bug Rate" value={`${(metric.bug_rate_pct * 100).toFixed(0)}%`}
              severity={metric.bug_rate_pct === 0 ? "good" : "warn"} />
            <MetricCard icon="🔀" label="PR Throughput" value={metric.merged_prs} unit="PRs" severity="info" />
            <MetricCard icon="🛳" label="Deployments" value={metric.prod_deployments} unit="deploys" severity="info" />
          </div>

          {/* What's the story */}
          <div style={{ background: "#0c1420", border: "1px solid #1e3a5f", borderRadius: "14px", padding: "22px 24px", marginBottom: "18px" }}>
            <div style={{ fontSize: "10px", color: "#3b82f6", textTransform: "uppercase", letterSpacing: "0.1em", fontFamily: "'DM Mono', monospace", marginBottom: "12px" }}>
              ✦ What's the story
            </div>
            <p style={{ margin: 0, color: "#d1d5db", fontSize: "14px", lineHeight: "1.8" }}>{interpretation.summary}</p>
          </div>

          {/* Signal breakdown */}
          <div style={{ background: "#111827", border: "1px solid #1f2937", borderRadius: "14px", padding: "22px 24px", marginBottom: "18px" }}>
            <div style={{ fontSize: "10px", color: "#6b7280", textTransform: "uppercase", letterSpacing: "0.1em", fontFamily: "'DM Mono', monospace", marginBottom: "4px" }}>
              Signal breakdown
            </div>
            {interpretation.insights.map((ins, i) => <InsightRow key={i} insight={ins} />)}
          </div>

          {/* Next steps */}
          <div style={{ background: "#0a1a0a", border: "1px solid #1a3a1a", borderRadius: "14px", padding: "22px 24px" }}>
            <div style={{ fontSize: "10px", color: "#4ade80", textTransform: "uppercase", letterSpacing: "0.1em", fontFamily: "'DM Mono', monospace", marginBottom: "16px" }}>
              → Suggested next steps
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
              {interpretation.nextSteps.map((step, i) => (
                <div key={i} style={{ display: "flex", gap: "14px", alignItems: "flex-start" }}>
                  <span style={{
                    width: "24px", height: "24px", borderRadius: "50%",
                    background: "#14532d", color: "#4ade80",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: "11px", fontWeight: "700", flexShrink: 0, fontFamily: "'DM Mono', monospace",
                  }}>{i + 1}</span>
                  <p style={{ margin: 0, color: "#d1d5db", fontSize: "14px", lineHeight: "1.7" }}>{step}</p>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
