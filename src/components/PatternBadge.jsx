export default function PatternBadge({ hint }) {
  const config = {
    "Healthy flow":  { color: "#4ade80", bg: "#14532d", border: "#166534" },
    "Quality watch": { color: "#fbbf24", bg: "#78350f", border: "#92400e" },
    "Needs review":  { color: "#f87171", bg: "#7f1d1d", border: "#991b1b" },
  };
  const c = config[hint] || { color: "#9ca3af", bg: "#1f2937", border: "#374151" };

  return (
    <span style={{
      display: "inline-flex", alignItems: "center", gap: "6px",
      padding: "5px 14px", borderRadius: "30px",
      background: c.bg, border: `1px solid ${c.border}`, color: c.color,
      fontWeight: "600", fontSize: "13px",
    }}>
      <span style={{ width: "7px", height: "7px", borderRadius: "50%", background: c.color }} />
      {hint}
    </span>
  );
}
