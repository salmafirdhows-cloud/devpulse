export default function MetricCard({ icon, label, value, unit, severity, trend }) {
  const colors = {
    good:     { bg: "#0d2b1a", border: "#1a5c33", text: "#4ade80" },
    warn:     { bg: "#2b1f0a", border: "#92400e", text: "#fbbf24" },
    critical: { bg: "#2b0a0a", border: "#991b1b", text: "#f87171" },
    info:     { bg: "#0f1f35", border: "#1e40af", text: "#60a5fa" },
    neutral:  { bg: "#1a1a2e", border: "#374151", text: "#9ca3af" },
  };
  const c = colors[severity] || colors.neutral;
  const trendIcon = trend === "up" ? "↑" : trend === "down" ? "↓" : null;
  const trendColor = trend === "down" ? "#4ade80" : "#f87171";

  return (
    <div
      style={{
        background: c.bg, border: `1px solid ${c.border}`,
        borderRadius: "12px", padding: "18px 20px",
        display: "flex", flexDirection: "column", gap: "6px",
        transition: "transform 0.15s ease, box-shadow 0.15s ease", cursor: "default",
      }}
      onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = `0 8px 24px ${c.border}55`; }}
      onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "none"; }}
    >
      <div style={{ fontSize: "20px" }}>{icon}</div>
      <div style={{ fontSize: "10px", color: "#6b7280", textTransform: "uppercase", letterSpacing: "0.09em", fontFamily: "'DM Mono', monospace" }}>{label}</div>
      <div style={{ display: "flex", alignItems: "baseline", gap: "4px" }}>
        <span style={{ fontSize: "26px", fontWeight: "700", color: c.text, fontFamily: "'DM Mono', monospace", lineHeight: 1 }}>{value}</span>
        {unit && <span style={{ fontSize: "12px", color: "#6b7280" }}>{unit}</span>}
        {trendIcon && <span style={{ fontSize: "13px", color: trendColor, marginLeft: "2px" }}>{trendIcon}</span>}
      </div>
    </div>
  );
}
