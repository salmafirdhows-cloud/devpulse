# DevPulse — Miro Board + Video Script

---

## 🗂️ MIRO BOARD: User Journey Map

Use the **"User Journey"** free template on Miro. Fill it in like this:

---

### Journey Title: IC Developer checking their monthly productivity pulse

---

### STAGES (columns across the top):

| Stage | 1. Awareness | 2. Entry | 3. Select | 4. Read metrics | 5. Understand | 6. Act |
|-------|-------------|---------|-----------|----------------|--------------|--------|

---

### USER ACTIONS (what the user does):

1. **Awareness** — Manager mentions a productivity review is coming, or dev is curious about their own output
2. **Entry** — Opens DevPulse, lands on Developer View
3. **Select** — Picks their name and current month from dropdowns
4. **Read metrics** — Sees 5 metric cards: cycle time, lead time, bug rate, PRs, deployments
5. **Understand** — Reads "What's the story" + signal breakdown — gets context, not just numbers
6. **Act** — Reads next steps, takes one specific action (e.g. breaks down a large ticket, reviews a test gap)

---

### THOUGHTS / FEELINGS (sticky notes in each column):

1. "I wonder if my output looks good this month"
2. "Okay this looks clean and simple"
3. "Easy — I can see my data immediately"
4. "Hmm, bug rate is flagged. That's the prod issue from last week."
5. "Oh — it explains WHY cycle time is high, not just that it is"
6. "I know exactly what to do differently next sprint"

---

### PAIN POINTS (red stickies):

- Most tools show metrics without context — devs don't know what to do with a number
- Bug rate without root cause is just blame, not insight
- No month-over-month comparison = can't see if you're improving

---

### OPPORTUNITIES (green stickies):

- Interpretation layer turns metrics into narrative
- Next steps make it actionable, not just observational
- MoM trend arrows show direction of travel at a glance

---

## 🎬 VIDEO SCRIPT (5-7 min)

---

### [0:00 – 0:45] The Problem

"Hi, I'm [your name], and this is DevPulse — my submission for the developer productivity MVP assignment.

Let me start with the problem. Developers and managers already have dashboards showing lead time, cycle time, bug rate. But those dashboards don't answer the question that actually matters: **what should I do about this?**

A number like '5.4 days cycle time' is meaningless without context. Is that bad? Is it getting better? What's causing it? That's the gap I wanted to close."

---

### [0:45 – 1:30] The Data

"The data comes from the provided workbook — 8 developers across 3 teams, 2 months of data. I modeled it as a flat JS data layer with a helper that derives the 5 assignment metrics: lead time, cycle time, bug rate, deployment frequency, and PR throughput.

I deliberately skipped a backend for this MVP. With 16 data points, adding a server would've been infrastructure for its own sake. The interesting engineering problem here is the interpretation layer — not data fetching."

---

### [1:30 – 3:30] Demo — Developer View

[Switch to browser, show the app]

"So this is the Developer View. I've selected Noah Patel in April 2026 — he's the most interesting case because he's got a bug that escaped to production.

You can see the 5 metric cards up top. Cycle time is 5.4 days — that's flagged in yellow. Lead time is 3.8 days — moderate. Bug rate is 50% — that's one bug out of two completed issues.

Below that is where the product thinking kicks in. 'What's the story' gives a one-paragraph human read of what's happening. It's not just restating the numbers — it's giving context. Then the signal breakdown breaks each metric down with a severity level and an explanation.

And finally — next steps. Two concrete, actionable suggestions. Not generic advice. Based on the combination of signals Noah's showing."

[Switch developer to Ava Chen — Healthy flow]

"Compare that to Ava Chen — healthy flow, clean metrics, the story reads completely differently. The tool adapts."

---

### [3:30 – 4:30] Demo — Manager View

"Now the manager view. I've picked Rina Kapoor, Payments API team, April.

Team-level stats at the top — average cycle time, lead time, bug rate, team size. Signal badge says 'Watch bottlenecks' — and the team read explains why: bug rate is elevated at 33%.

Below that is the per-developer breakdown. You can see at a glance that Ava Chen is healthy, but Noah Patel and Ishan Mehta are both on quality watch. That tells a manager where to focus a conversation without needing to dig into individual tickets."

---

### [4:30 – 5:30] Design Decisions

"Three decisions I want to call out:

**One — Interpretation over display.** I could have built a fancier chart. Instead I spent the time on the interpretation engine in interpret.js — the logic that maps metric combinations to stories and next steps. That's the actual product value.

**Two — Focused scope.** The assignment says a focused MVP beats a broad unfinished one. I built two views that tell a complete story. I didn't add charts, filters, or trend graphs — those are v2.

**Three — Responsible AI use.** I used AI to understand the workbook, scaffold the initial structure, and debug layout issues. But the interpretation thresholds, the data model, the routing — I understand all of it and I can defend every decision."

---

### [5:30 – 6:00] What I'd do next

"If I had more time: real API integration pulling from Jira and GitHub, a 3-month trend chart so you can see direction of travel, and a team comparison view for managers to spot outliers across teams.

Thanks for watching — happy to walk through anything in more detail in the interview."

---

## ✅ Submission Checklist

- [ ] Video uploaded to Google Drive (5-10 min, clear audio + lighting)
- [ ] Google Drive link tested in incognito
- [ ] Miro board created using "User Journey" template
- [ ] Code pushed to GitHub (README explains how to run it)
- [ ] App running at localhost:5173 for demo
