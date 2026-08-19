# HTML Tools

A collection of single-file HTML tools. Each tool is a standalone `.html` file with inline CSS and JavaScript — no build step, no frameworks.

Inspired by [Simon Willison's HTML tools](https://simonwillison.net/2025/Dec/10/html-tools/).

## Tools

- [BMI Calculator](bmi-calculator.html) — Calculate your Body Mass Index with metric or imperial units. Shows your BMI, category (Underweight / Normal / Overweight / Obese) on a color-coded bar with a position marker, and the healthy weight range for your height.
- [CSV to JSON](csv-to-json.html) — Paste CSV and get a JSON array of objects. Auto-detects comma, tab, and semicolon delimiters. First row is used as keys.
- [Interval Timer](interval-timer.html) — A full-screen interval timer for EMOM, Tabata, AMRAP, and HIIT workouts. Build a sequence of named intervals with custom durations and colors. The entire background changes color with each interval so you can read it from across the room. Includes presets, drag-and-drop reordering, audio cues, screen wake lock, and a shareable URL.
- [JSON to Table](json-to-table.html) — Paste a JSON array and get a minimal, scrollable table.
- [JWT Decoder](jwt-decoder.html) — Decode, encode, edit, and verify JSON Web Tokens. Paste a JWT to see the decoded header, payload, and claims table with human-readable timestamps. Edit any claim inline — timestamps get datetime pickers with quick offsets, other fields edit in place. Tokens are automatically re-signed with your secret after edits. Switch to Encode mode to create new JWTs from a JSON payload. Supports HS256, HS384, and HS512 algorithms. All decoded and encoded tokens are saved to a history log with auto-generated labels.
- [List Deduplicator](list-deduplicator.html) — Paste a space- or newline-separated list and get back a deduplicated, alphabetically sorted result — handy for merging new OAuth scopes into an existing scope string, or cleaning up tags and keyword lists.
- [Measurement Sense](measurement-learning.html) — Build intuition for metric units — no math required.
- [Meeting Talk Time Tracker](meeting-talk-time.html) — Track how long each participant speaks during a meeting. Entirely keyboard-driven: type a name prefix to switch the active speaker, Space to pause/resume, Ctrl+Z to undo a mis-switch, and Esc to end. Live leaderboard shows total time and share-of-meeting for each participant.
- [Party Host](party-host.html) — Enter player names, then start. The first turn is randomly assigned. After that, turns rotate in order. Use +1 / −1 to track scores and tap "Next Player" when the current turn is done. Game state persists across browser refreshes.
- [Retirement Calculator](retirement-calculator.html) — A retirement calculator that projects your savings growth and compares it against what you'll need. Inputs include income, savings, contributions, and retirement budget. Outputs an area chart from current age to life expectancy showing projected savings vs. target balance, with US retirement milestone markers.
- [Sleep Calculator](sleep-calculator.html) — A sleep calculator that helps you find optimal sleep and wake times based on 90-minute sleep cycles. Enter a desired wake-up time to see when to fall asleep, or enter a sleep time (or tap "Sleep Now") to see when to set your alarm. Shows 5-6 cycles as recommended, with lower cycle options available. Cycle length and fall-asleep time are customizable via Settings.
- [TDEE Calculator](tdee-calculator.html) — Calculate your Total Daily Energy Expenditure using the Mifflin-St Jeor equation. Enter your sex, age, height, weight, and activity level to instantly see your BMR, TDEE, and calorie targets for cutting, maintenance, and bulking — in imperial or metric.
- [Username Generator](username-generator.html) — Generate random usernames by combining words from selectable categories: adjective, color, and animal. Supports multiple casing styles (PascalCase, camelCase, snake_case, kebab-case), optional number suffix, and batch generation of 10–100 usernames at a time.
