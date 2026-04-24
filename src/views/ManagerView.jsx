import { useState } from "react";
import { managerSummary, months, getTeamMembers } from "../data/data.js";
import { formatMonth } from "../data/interpret.js";
import MetricCard from "../components/MetricCard.jsx";
import SignalPill from "../components/SignalPill.jsx";
import PatternBadge from "../components/PatternBadge.jsx";

const managers = [
  { id: "MGR-01", name: "Rina Kapoor", team: "Payments API" },
  { id: "MGR-02", name: "Samir Gupta", team: "Checkout Web" },
  { id: "MGR-03", name: "Priya Nair", team: "Mobile Growth" },
];

function DevRow({ m }) {
  const patternColor = {
    "Healthy flow":  "#4ade80",
    "Quality watch": "#fbbf24",
    "Needs review":  "#f87171",
  };
  const col = patternColor[m.pattern_hint] || "#9ca3af";

  return (
    <tr style={{ borderBottom: "1px solid #1f2937" }}>
      <td style={{ padding: "12px 14px", color: "#f9fafb", fontSize: "14px" }}>{m.developer_name}</td>
      <td style={{ padding: "12px 14px", color: "#9ca3af", fontSize: "13px", fontFamily: "'DM Mono', monospace" }}>{m.avg_cycle_time_days.toFixed(1)}d</td>
      <td style={{ padding: "12px 14px", color: "#9ca3af", fontSize: "13px", fontFamily: "'DM Mono', monospace" }}>{m.avg_lead_time_days.toFixed(1)}d</td>
      <td style={{ padding: "12px 14px", color: "#9ca3af", fontSize: "13px", fontFamily: "'DM Mono', monospace" }}>{(m.bug_rate_pct * 100).toFixed(0)}%</td>
      <td style={{ padding: "12px 14px", color: "#9ca3af", fontSize: "13px", fontFamily: "'DM Mono', monospace" }}>{m.merged_prs}</td>
      <td style={{ padding: "12px 14px" }}>
        <span style={{ color: col, fontSize: "12px", fontWeight: "600", display: "flex", alignItems: "center", gap: "5px" }}>
          <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: col, flexShrink: 0 }} />
          {m.pattern_hint}
        </span>
      </td>
    </tr>
  );
}

export default function ManagerView() {
  const [selectedMgr, setSelectedMgr] = useState("MGR-01");
  const [selectedMonth, setSelectedMonth] = useState("2026-04");

  const summary = managerSummary.find(m => m.manager_id === selectedMgr && m.month === selectedMonth);
  const teamMetrics = getTeamMembers(selectedMgr, selectedMonth);
  const manager = managers.find(m => m.id === selectedMgr);

  const teamInsight = () => {
    if (!summary) return null;
    if (summary.signal === "Healthy flow") return "The team is delivering consistently with no major blockers. Cycle time and lead time are within healthy ranges.";
    if (summary.signal === "Watch bottlenecks") return `Avg bug rate is ${(summary.avg_bug_rate_pct * 100).toFixed(0)}% — worth checking which individuals are affected and whether it's concentrated or spread across the team.`;
    if (summary.signal === "Needs review") return "Cycle time is elevated across the team. This could point to large tickets, review bottlenecks, or external dependencies. Worth a quick retro to surface blockers.";
    return "Review individual metrics below to identify patterns.";
  };

  return (
    <div style={{ maxWidth: "880px", margin: "0 auto", padding: "0 24px 80px" }}>
      {/* Selectors */}
      <div style={{ display: "flex", gap: "14px", marginBottom: "36px", flexWrap: "wrap" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
          <label style={{ fontSize: "10px", color: "#6b7280", textTransform: "uppercase", letterSpacing: "0.09em", fontFamily: "'DM Mono', monospace" }}>Manager</label>
          <select value={selectedMgr} onChange={e => setSelectedMgr(e.target.value)}
            style={{ background: "#111827", border: "1px solid #374151", color: "#f9fafb", padding: "9px 14px", borderRadius: "8px", fontSize: "14px", cursor: "pointer", minWidth: "220px" }}>
            {managers.map(m => <option key={m.id} value={m.id}>{m.name} · {m.team}</option>)}
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

      {summary && manager && (
        <>
          {/* Manager header */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "28px", flexWrap: "wrap", gap: "12px" }}>
            <div>
              <h2 style={{ margin: "0 0 4px", fontSize: "22px", fontWeight: "700", color: "#f9fafb", fontFamily: "'Syne', sans-serif" }}>{manager.name}</h2>
              <div style={{ fontSize: "13px", color: "#6b7280" }}>{manager.team} · {summary.team_size} engineers · {formatMonth(selectedMonth)}</div>
            </div>
            <SignalPill signal={summary.signal} />
          </div>

          {/* Team summary stats */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))", gap: "12px", marginBottom: "24px" }}>
            <MetricCard icon="⏱" label="Avg Cycle Time" value={summary.avg_cycle_time_days.toFixed(1)} unit="days" severity="neutral" />
            <MetricCard icon="🚀" label="Avg Lead Time" value={summary.avg_lead_time_days.toFixed(1)} unit="days" severity="neutral" />
            <MetricCard icon="🐛" label="Avg Bug Rate" value={`${(summary.avg_bug_rate_pct * 100).toFixed(0)}%`} severity={summary.avg_bug_rate_pct === 0 ? "good" : "warn"} />
            <MetricCard icon="👥" label="Team Size" value={summary.team_size} unit="devs" severity="info" />
          </div>

          {/* Team insight */}
          <div style={{ background: "#0c1420", border: "1px solid #1e3a5f", borderRadius: "14px", padding: "20px 24px", marginBottom: "24px" }}>
            <div style={{ fontSize: "10px", color: "#3b82f6", textTransform: "uppercase", letterSpacing: "0.1em", fontFamily: "'DM Mono', monospace", marginBottom: "10px" }}>
              ✦ Team read
            </div>
            <p style={{ margin: 0, color: "#d1d5db", fontSize: "14px", lineHeight: "1.7" }}>{teamInsight()}</p>
          </div>

          {/* Per-developer table */}
          <div style={{ background: "#111827", border: "1px solid #1f2937", borderRadius: "14px", overflow: "hidden" }}>
            <div style={{ padding: "16px 20px", borderBottom: "1px solid #1f2937" }}>
              <span style={{ fontSize: "10px", color: "#6b7280", textTransform: "uppercase", letterSpacing: "0.08em", fontFamily: "'DM Mono', monospace" }}>Individual breakdown</span>
            </div>
            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                  <tr style={{ borderBottom: "1px solid #1f2937" }}>
                    {["Developer", "Cycle", "Lead", "Bug %", "PRs", "Pattern"].map(h => (
                      <th key={h} style={{ padding: "10px 14px", textAlign: "left", fontSize: "10px", color: "#6b7280", textTransform: "uppercase", letterSpacing: "0.08em", fontFamily: "'DM Mono', monospace" }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {teamMetrics.map((m, i) => <DevRow key={i} m={m} />)}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
