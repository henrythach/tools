# Claude Code Instructions for HTML Tools

## Repository

- **GitHub:** https://github.com/henrythach/tools
- **Owner:** henrythach

## What This Repo Is

A collection of single-file HTML tools, inspired by [Simon Willison's approach](https://simonwillison.net/2025/Dec/10/html-tools/). Each tool is a standalone `.html` file with inline CSS and JavaScript — no build step, no frameworks, no React.

## Conventions

- **One tool per HTML file** in the repo root. Keep tools small (a few hundred lines max).
- **No React, no JSX, no build tools.** Vanilla HTML + CSS + JS only.
- **No separate CSS/JS files.** Everything is inline in the single HTML file.
- **Load dependencies from CDNs** (cdnjs, jsDelivr) if needed — never npm.
- **Copy/paste as primary I/O.** Tools should accept pasted input and provide "Copy" buttons for output.
- **Minimal, clean UI.** Use system fonts, light styling, and responsive layout. No heavy CSS frameworks.
- **Support dark mode.** Use CSS custom properties (`--var`) for all colors and a `@media (prefers-color-scheme: dark)` block to redefine them. Never hardcode colors outside of `:root`.
- **Persist state in the URL hash** when useful (bookmarkable/shareable).
- **Use localStorage** for secrets (API keys) or larger ephemeral state.
- **Client-side only.** No server needed — all processing happens in the browser.

## Creating a New Tool

1. Create a new `.html` file in the repo root with a descriptive kebab-case name (e.g., `json-to-table.html`).
2. Include a `<title>` and an `<h1>` matching the tool's purpose.
3. Add a footer with two links: one back to the main tools page (`./`) and one to the source of the HTML file on GitHub (e.g. `https://github.com/henrythach/tools/blob/main/json-to-table.html`).
4. Create a matching `.md` file with the same base name (e.g., `json-to-table.md`) that briefly describes what the tool does. The first line (or first paragraph after an H1) becomes the card description in `index.html` and the one-liner in `README.md`.
5. Run `node generate.js` to regenerate `README.md` and `index.html`. Both files are generated outputs — never edit them by hand.

## CSS Theming

All tools share the same CSS variable system. Copy this block into `:root` and the dark mode override — never hardcode colors.

**Core variables (use in every tool):**

```css
:root {
  --bg: #fff;
  --text: #1a1a1a;
  --text-muted: #666;
  --border: #ccc;
  --border-subtle: #e0e0e0;
  --border-footer: #eee;
  --input-bg: #fff;
  --btn-bg: #fff;
  --btn-hover: #f5f5f5;
  --accent: #4a90d9;
  --accent-hover: #3a7bc8;
}

@media (prefers-color-scheme: dark) {
  :root {
    --bg: #1a1a1a;
    --text: #e8e8e8;
    --text-muted: #999;
    --border: #444;
    --border-subtle: #333;
    --border-footer: #2e2e2e;
    --input-bg: #252525;
    --btn-bg: #2a2a2a;
    --btn-hover: #333;
    --accent: #5a9fd4;
    --accent-hover: #4a8fc4;
  }
}
```

**Optional variables — add only if the tool uses them:**

| Variable          | Light     | Dark      | Use when                                |
| ----------------- | --------- | --------- | --------------------------------------- |
| `--border-strong` | `#ccc`    | `#555`    | Table header borders, stronger dividers |
| `--card-bg`       | `#f8f9fa` | `#252525` | Card/panel backgrounds                  |
| `--muted-bg`      | `#f0f0f0` | `#222`    | Secondary card rows                     |
| `--error`         | `#c0392b` | `#e05c4b` | Error text                              |
| `--error-bg`      | `#f8d7da` | `#3a1a1a` | Error banners                           |
| `--success`       | `#27ae60` | `#2ecc71` | Success text                            |
| `--success-bg`    | `#d4edda` | `#1a3a2a` | Success banners                         |
| `--warning-bg`    | `#fff3cd` | `#3a3520` | Warning banners                         |
| `--warning-text`  | `#856404` | `#f0d060` | Warning text                            |
| `--danger`        | `#dc2626` | `#f87171` | Destructive action text                 |
| `--danger-bg`     | `#fee2e2` | `#450a0a` | Destructive action hover bg             |
| `--code-bg`       | `#f5f5f5` | `#2a2a2a` | Code block backgrounds                  |
| `--th-bg`         | `#fff`    | `#1a1a1a` | Sticky table header bg                  |
| `--tr-hover`      | `#f8f8f8` | `#242424` | Table row hover                         |

**Standard base styles:**

```css
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
  padding: 1.5rem;
  color: var(--text);
  background: var(--bg);
  line-height: 1.5;
  max-width: 700px; /* or 600px for narrower tools */
  margin: 0 auto;
}

h1 {
  font-size: 1.4rem;
  margin-bottom: 0.25rem;
}
.subtitle {
  color: var(--text-muted);
  font-size: 0.9rem;
  margin-bottom: 1.25rem;
}
```

**Buttons:**

```css
/* Default button */
button {
  font-family: inherit;
  font-size: 0.85rem;
  padding: 0.5rem 1rem;
  border: 1px solid var(--border);
  border-radius: 6px;
  background: var(--btn-bg);
  color: var(--text);
  cursor: pointer;
}
button:hover {
  background: var(--btn-hover);
}

/* Primary (accent-filled) */
button.primary {
  background: var(--accent);
  color: #fff;
  border-color: var(--accent);
}
button.primary:hover {
  background: var(--accent-hover);
}
```

**Segmented toggle (two-mode switcher):**

```css
.mode-toggle {
  display: flex;
  gap: 0;
  margin-bottom: 1.25rem;
}
.mode-toggle button {
  flex: 1;
  border: 1px solid var(--border);
  background: var(--btn-bg);
  color: var(--text);
  cursor: pointer;
}
.mode-toggle button:first-child {
  border-radius: 6px 0 0 6px;
  border-right: none;
}
.mode-toggle button:last-child {
  border-radius: 0 6px 6px 0;
}
.mode-toggle button.active {
  background: var(--accent);
  color: #fff;
  border-color: var(--accent);
}
.mode-toggle button:not(.active):hover {
  background: var(--btn-hover);
}
```

**Inputs / textareas:**

```css
textarea,
input[type="text"],
input[type="number"],
input[type="time"] {
  font-family: inherit;
  font-size: 0.85rem;
  padding: 0.5rem 0.75rem;
  border: 1px solid var(--border);
  border-radius: 6px;
  background: var(--input-bg);
  color: var(--text);
}
textarea:focus,
input:focus {
  outline: 2px solid var(--accent);
  outline-offset: -1px;
}

/* Monospace textarea (for code/tokens/JSON) */
textarea.mono {
  font-family: "SF Mono", "Fira Code", "Fira Mono", Menlo, Consolas, monospace;
  font-size: 0.8rem;
  resize: vertical;
}
```

**Cards:**

```css
.card {
  background: var(--card-bg);
  border: 1px solid var(--border-subtle);
  border-radius: 6px;
  padding: 0.75rem;
}
```

**Footer:**

```css
footer {
  margin-top: 2rem;
  padding-top: 1rem;
  border-top: 1px solid var(--border-footer);
  font-size: 0.8rem;
  color: var(--text-muted);
}
footer a {
  color: var(--text-muted);
  text-decoration: none;
}
footer a:hover {
  color: var(--text);
}
```

## Code Style

- Use `const`/`let`, never `var`.
- Use modern JS (template literals, arrow functions, destructuring).
- Keep functions short and focused.
- Use semantic HTML elements where appropriate.
- Inline `<style>` in `<head>`, inline `<script>` before `</body>`.

## Formatting

Prettier is configured with `printWidth: 120`. A pre-commit hook (husky + lint-staged) auto-formats staged `.html` and `.md` files on every commit.

**After modifying any `.html` or `.md` file, run:**

```sh
npx prettier --write <changed-files>
```

**After running `node generate.js`**, prettier runs automatically — no extra step needed.

**First-time setup** (after cloning): run `npm install` to install prettier and activate the pre-commit hook.
