export default function InsightRow({ insight }) {
  const severityColor = { good: "#4ade80", warn: "#fbbf24", critical: "#f87171", info: "#60a5fa" };

  return (
    <div style={{ display: "flex", gap: "14px", alignItems: "flex-start", padding: "14px 0", borderBottom: "1px solid #1f2937" }}>
      <span style={{ fontSize: "18px", flexShrink: 0, marginTop: "2px" }}>{insight.icon}</span>
      <div style={{ flex: 1 }}>
        <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "4px", flexWrap: "wrap" }}>
          <span style={{ fontWeight: "600", color: "#f9fafb", fontSize: "14px" }}>{insight.label}</span>
          <span style={{
            fontSize: "9px", padding: "2px 8px", borderRadius: "20px",
            background: insight.severity === "good" ? "#14532d" : insight.severity === "warn" ? "#78350f" : "#1e3a8a",
            color: severityColor[insight.severity] || "#9ca3af",
            textTransform: "uppercase", letterSpacing: "0.07em", fontFamily: "'DM Mono', monospace",
          }}>{insight.severity}</span>
        </div>
        <p style={{ margin: 0, color: "#9ca3af", fontSize: "13px", lineHeight: "1.65" }}>{insight.detail}</p>
      </div>
    </div>
  );
}
