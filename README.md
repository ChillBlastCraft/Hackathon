# Mathematics Hub

A web-based mathematics learning platform built for a hackathon. Covers subject pages, exercises, and a scientific calculator.

---

## Features

### Homepage (`index.html`)
- Landing page with navigation to Subjects, Exercises, and Tests & Exams.
- Header includes a search bar UI and a Math 1 / Math 2 chapter dropdown nav.
- **Search bar is present in the UI but not yet functional** — filtering/results logic is not implemented.

### User Authentication (`user_profile/`)
- Login and registration system backed entirely by **`localStorage`** (no server/backend).
  - Accounts stored under `mh_accounts` key.
  - Active session stored under `mh_session` key.
- Features: tab switching between Login / Register, username availability check, password show/hide toggle, inline field validation.
- Redirects to `profile.html` automatically if already logged in.

### Theming — CSS Variables (`data/data-themes.css`)
- All colors are defined as **CSS custom properties** on `:root`, making restyling trivial.
- Key variables: `--main`, `--bg`, `--text`, `--accent`, `--highlight`, `--header-bg`, `--shadow-10`, `--shadow-25`, etc.
- Architecture is ready for a **dark mode** implementation via a `[theme="dark"]` attribute selector — no variables defined yet.

### Exercises Page (`exercises/exercises.html`)
- Lists exercise topic cards grouped by subject (Math 1, Math 2) and chapter.
- **In-page search** filters cards by topic name or chapter in real time.
- Progress badge shows done / total count (login required to persist progress).
- **Exercise questions do not exist yet** — cards link to placeholder destinations. Only Math 1, Chapter 1 (Numbers) content exists under `subjects/math1/ch1/`.

### Subject Pages (`subjects/math1/ch1/`)
- `number.html` — Math 1, Chapter 1: Numbers content page.
- `algebra.html` — Math 1, Chapter 2: Algebra content page.
- All other chapters (Geometry, Math 2 chapters) are linked but **not yet created**.

### Scientific Calculator (`subjects/math1/ch1/calculator.js`)
- Embedded in the Numbers subject page.
- Supports: basic arithmetic, trig functions (sin, cos, tan + inverses), angle modes (Deg / Rad), factorial, memory (M+, MR, MC), sign toggle, and backspace.
- **Semi-functional** — core arithmetic and trig work; some edge cases and advanced functions may not be fully implemented.

---

## What's Missing / Not Yet Implemented

| Feature | Status |
|---|---|
| Subjects pages (Math 2, Ch 2+) | Not created |
| Tests & Exams page | Link exists, page does not |
| Exercise questions / answer checking | Not implemented |
| Homepage search functionality | UI only, no logic |
| Dark mode theme | Architecture ready, variables not defined |
| Progress tracking (exercises) | Requires login; persistence not implemented |

