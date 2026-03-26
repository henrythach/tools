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
- **Persist state in the URL hash** when useful (bookmarkable/shareable).
- **Use localStorage** for secrets (API keys) or larger ephemeral state.
- **Client-side only.** No server needed — all processing happens in the browser.

## Creating a New Tool

1. Create a new `.html` file in the repo root with a descriptive kebab-case name (e.g., `json-to-table.html`).
2. Include a `<title>` and an `<h1>` matching the tool's purpose.
3. Add a footer linking back to the GitHub source.
4. Create a matching `.md` file with the same base name (e.g., `json-to-table.md`) that briefly describes what the tool does.
5. Update `README.md` to list the new tool.

## Code Style

- Use `const`/`let`, never `var`.
- Use modern JS (template literals, arrow functions, destructuring).
- Keep functions short and focused.
- Use semantic HTML elements where appropriate.
- Inline `<style>` in `<head>`, inline `<script>` before `</body>`.
