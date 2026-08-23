---
project: FAANG INTERVIEW
name: Interview Prep
status: live
updated: 2026-07-30
health: dormant
todos:
  - id: reconcile-dirty-file
    priority: P3
    title: "Commit or discard the one modified file"
    why: "The site is live and the repo has been untouched since 2026-03-19 except for one uncommitted change. Either it belongs in the deploy or it should go; leaving it means the live site and the tree disagree."
    owner: claude
  - id: dependency-refresh
    priority: P3
    title: "Refresh dependencies on a live-but-dormant Next.js site"
    why: "Four months without a bump on a publicly reachable site. Nothing is known broken; this is just the interval where a Next or transitive CVE lands and nobody is looking."
    owner: claude
completed: []
shipped_recently:
  - "Mastery title clipping and light-mode colour fixed."
---

# Interview Prep backlog

Machine-readable state is the front matter above; the dashboard reads that. Prose below is
context for humans and never repeats a to-do.

## Where things stand

Live at `interviewprep.devxgroup.io` and stable. No commits since 2026-03-19, and that is fine:
an EM/SDM interview prep app does not rot on a schedule. `health: dormant` means nobody is working
on it, not that anything is wrong.

The only standing obligation for a live-but-unattended site is dependency hygiene. Everything else
waits for a reason to come back.
