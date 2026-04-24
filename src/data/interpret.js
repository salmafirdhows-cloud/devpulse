export function interpret(metric, developer) {
  if (!metric || !developer) return null;

  const { avg_cycle_time_days, avg_lead_time_days, bug_rate_pct, merged_prs, prod_deployments, pattern_hint } = metric;

  const insights = [];
  const nextSteps = [];
  let summary = "";

  // --- Build narrative summary ---
  if (pattern_hint === "Healthy flow") {
    summary = `${developer.developer_name} is in a solid rhythm this month. Tickets move through development quickly, code ships without dragging through review, and quality is holding steady. This is what sustainable delivery looks like.`;
  } else if (pattern_hint === "Quality watch") {
    summary = `${developer.developer_name} is shipping consistently, but a bug escaped to production this month. That's worth paying attention to — not as a judgment, but as a signal that something in the test or review process may need a small adjustment.`;
  } else if (pattern_hint === "Needs review") {
    summary = `${developer.developer_name}'s cycle time is elevated this month, meaning work is taking longer once it's picked up. This doesn't necessarily mean low output — it may point to ticket complexity, context switching, or waiting on dependencies.`;
  }

  // --- Cycle time insight ---
  if (avg_cycle_time_days > 5.5) {
    insights.push({
      icon: "⏱",
      label: "Slow cycle time",
      detail: `Avg ${avg_cycle_time_days.toFixed(1)} days in-progress. Work is spending a lot of time in development. This often points to large tickets, frequent context switches, or unclear acceptance criteria.`,
      severity: "warn",
    });
    nextSteps.push("Break down large tickets into smaller, independently shippable pieces. Aim for tickets completable in 2–3 days.");
  } else if (avg_cycle_time_days > 4) {
    insights.push({
      icon: "⏱",
      label: "Moderate cycle time",
      detail: `Avg ${avg_cycle_time_days.toFixed(1)} days in-progress. Slightly above ideal but not alarming. Worth watching if it trends upward.`,
      severity: "info",
    });
  } else {
    insights.push({
      icon: "⏱",
      label: "Fast cycle time",
      detail: `Avg ${avg_cycle_time_days.toFixed(1)} days in-progress. Work is moving efficiently from start to done.`,
      severity: "good",
    });
  }

  // --- Lead time insight ---
  if (avg_lead_time_days > 4.5) {
    insights.push({
      icon: "🚀",
      label: "High lead time",
      detail: `Avg ${avg_lead_time_days.toFixed(1)} days PR to production. Changes are taking a while to reach users. This could be review wait, staging pipeline delays, or deployment scheduling.`,
      severity: "warn",
    });
    nextSteps.push("Investigate where time is being lost: is it review wait, CI pipeline, or deployment scheduling? Tackle the biggest slice first.");
  } else if (avg_lead_time_days > 3) {
    insights.push({
      icon: "🚀",
      label: "Moderate lead time",
      detail: `Avg ${avg_lead_time_days.toFixed(1)} days PR to production. Acceptable, but there's room to tighten the pipeline.`,
      severity: "info",
    });
  } else {
    insights.push({
      icon: "🚀",
      label: "Fast lead time",
      detail: `Avg ${avg_lead_time_days.toFixed(1)} days PR to production. Changes are reaching users quickly — a healthy delivery pipeline.`,
      severity: "good",
    });
  }

  // --- Bug rate insight ---
  if (bug_rate_pct >= 0.5) {
    insights.push({
      icon: "🐛",
      label: "Bug escaped to prod",
      detail: `Bug rate: ${(bug_rate_pct * 100).toFixed(0)}%. At least one bug made it past review and testing. This is a quality signal worth addressing before it becomes a pattern.`,
      severity: "warn",
    });
    nextSteps.push("Review the root cause of the escaped bug. Was it an edge case, a test gap, or a config issue? Add one targeted test or checklist item to prevent recurrence.");
    if (avg_cycle_time_days > 4) {
      nextSteps.push("High cycle time combined with an escaped bug can mean rushed final stages. Consider adding a brief self-review checklist before PR submission.");
    }
  } else {
    insights.push({
      icon: "🐛",
      label: "Clean quality",
      detail: `Bug rate: 0%. No escaped bugs this month. Quality is solid.`,
      severity: "good",
    });
  }

  // --- PR & Deployment throughput ---
  insights.push({
    icon: "📦",
    label: "Throughput",
    detail: `${merged_prs} PRs merged, ${prod_deployments} deployments shipped. Consistent output — the pipeline is active and flowing.`,
    severity: "good",
  });

  // Default next step if none added
  if (nextSteps.length === 0) {
    nextSteps.push("Keep the current rhythm going. Watch for cycle time creep if ticket scope increases.");
    nextSteps.push("Share what's working with the team — consistent flow is worth documenting as a practice.");
  }

  return { summary, insights, nextSteps };
}

export function getSignalColor(signal) {
  if (signal === "Healthy flow") return "good";
  if (signal === "Watch bottlenecks") return "warn";
  if (signal === "Needs review") return "critical";
  if (signal === "Quality watch") return "warn";
  return "info";
}

export function formatMonth(month) {
  const [year, m] = month.split("-");
  const names = ["", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  return `${names[parseInt(m)]} ${year}`;
}
