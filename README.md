# DevPulse — Developer Productivity MVP

A focused full-stack MVP that helps developers move from raw DORA-style metrics to understanding and action.

---

## 🚀 Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173)

---

## 📁 Project Structure

```
src/
├── data/
│   ├── data.js          # All sample data as JS (replaces backend/DB for MVP)
│   └── interpret.js     # Interpretation engine — metric → story + next steps
├── views/
│   ├── ICView.jsx       # Individual Contributor profile page
│   └── ManagerView.jsx  # Manager team summary page
├── App.jsx              # Routing + nav
└── main.jsx             # Entry point
```

---

## 🏗️ Architecture Decisions

### Why no backend?
For this MVP, all data lives in `src/data/data.js` as structured JS objects derived directly from the provided workbook. This keeps the stack simple, removes infra overhead, and lets me focus on the product layer — which is where the actual value is in this assignment.

In a real product, this data would come from a REST or GraphQL API aggregating Jira, GitHub, and CI/CD data.

### Why React + Vite?
- React is specified in the assignment
- Vite gives instant HMR with zero config
- No unnecessary dependencies — just react-router-dom for routing

### The interpretation engine
`interpret.js` is the core of the MVP. It takes raw metric values and outputs:
1. A **narrative summary** — a human-readable story about what's happening
2. **Signal breakdown** — per-metric analysis with severity levels
3. **Next steps** — 1–2 actionable suggestions based on the pattern

This is the key product insight: metrics without context are noise. The interpretation layer is what turns a dashboard into a tool.

---

## 📊 The 5 Metrics (per assignment spec)

| Metric | Definition used |
|--------|----------------|
| **Lead Time for Changes** | Avg time from PR opened to successful production deployment |
| **Cycle Time** | Avg time from issue moved to In Progress to Done |
| **Bug Rate** | Escaped prod bugs ÷ issues completed in the month |
| **Deployment Frequency** | Count of successful prod deployments in the month |
| **PR Throughput** | Count of merged pull requests in the month |

---

## 🧠 Interpretation Logic

| Condition | Story angle | Suggested action |
|-----------|-------------|-----------------|
| All healthy | Solid rhythm, sustainable delivery | Keep going, watch for scope creep |
| Bug rate > 0 | Quality signal, not a judgment | Root cause the bug, add one test |
| Cycle time > 5.5d | Work staying active too long | Break down ticket size |
| Lead time > 4.5d | Changes slow to reach users | Find where delay is concentrated |
| Bug + high cycle | Speed/quality tradeoff showing | Self-review checklist before PR |

---

## 📦 Data Source

Based on the workbook: `intern_assignment_support_pack_dev_only_v3.xlsx`
- 8 developers across 3 teams
- 2 months of data: March and April 2026
- Metrics calculated per assignment spec definitions
