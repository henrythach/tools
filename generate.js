#!/usr/bin/env node
'use strict';

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const ROOT = __dirname;
const EXCLUDED_MD = new Set(['README.md', 'CLAUDE.md']);

function extractTitle(mdContent, htmlPath) {
  const h1 = mdContent.match(/^#\s+(.+)$/m);
  if (h1) return h1[1].trim();

  try {
    const html = fs.readFileSync(htmlPath, 'utf8');
    const title = html.match(/<title>([^<]+)<\/title>/i);
    if (title) return title[1].trim();
  } catch {}

  return path.basename(htmlPath, '.html');
}

function extractDescription(mdContent) {
  const lines = mdContent.split('\n');
  const paragraph = [];
  let started = false;

  for (const line of lines) {
    if (line.startsWith('# ')) { started = true; continue; }
    if (!line.trim()) {
      if (paragraph.length) break;
      if (started) continue;
      continue;
    }
    started = true;
    paragraph.push(line.trim());
  }

  return paragraph
    .join(' ')
    .replace(/\*\*([^*]+)\*\*/g, '$1')
    .replace(/\*([^*]+)\*/g, '$1')
    .replace(/`([^`]+)`/g, '$1')
    .replace(/^[-*]\s+/gm, '')
    .trim();
}

function escapeHtml(str) {
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

const tools = fs.readdirSync(ROOT)
  .filter(f => f.endsWith('.md') && !EXCLUDED_MD.has(f))
  .sort()
  .map(mdFile => {
    const base = path.basename(mdFile, '.md');
    const mdContent = fs.readFileSync(path.join(ROOT, mdFile), 'utf8');
    return {
      base,
      title: extractTitle(mdContent, path.join(ROOT, base + '.html')),
      description: extractDescription(mdContent),
    };
  });

function main() {
  // README.md
  const readmeTools = tools.map(t => `- [${t.title}](${t.base}.html) — ${t.description}`).join('\n');
  const readmeRaw = [
    '# HTML Tools',
    '',
    'A collection of single-file HTML tools. Each tool is a standalone `.html` file with inline CSS and JavaScript — no build step, no frameworks.',
    '',
    "Inspired by [Simon Willison's HTML tools](https://simonwillison.net/2025/Dec/10/html-tools/).",
    '',
    '## Tools',
    '',
    readmeTools,
    '',
  ].join('\n');
  fs.writeFileSync(path.join(ROOT, 'README.md'), readmeRaw);

  // index.html
  const toolCards = tools
    .map(
      t =>
        `<a class="tool-card" href="${t.base}.html"><div class="name">${escapeHtml(t.title)}</div><div class="desc">${escapeHtml(t.description)}</div></a>`,
    )
    .join('\n');

  const indexRaw = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>HTML Tools</title>
    <style>
      * {
        box-sizing: border-box;
        margin: 0;
        padding: 0;
      }

      :root {
        --bg: #fff;
        --text: #1a1a1a;
        --text-muted: #666;
        --border: #ccc;
        --border-footer: #eee;
        --accent: #4a90d9;
        --accent-hover: #3a7bc8;
        --card-bg: #f8f9fa;
        --card-border: #e0e0e0;
      }

      @media (prefers-color-scheme: dark) {
        :root {
          --bg: #1a1a1a;
          --text: #e8e8e8;
          --text-muted: #999;
          --border: #444;
          --border-footer: #2e2e2e;
          --accent: #5a9fd4;
          --accent-hover: #4a8fc4;
          --card-bg: #252525;
          --card-border: #333;
        }
      }

      body {
        font-family:
          -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica,
          Arial, sans-serif;
        padding: 2rem 1.5rem;
        color: var(--text);
        background: var(--bg);
        line-height: 1.5;
        max-width: 600px;
        margin: 0 auto;
      }

      h1 {
        font-size: 1.5rem;
        font-weight: 700;
        margin-bottom: 0.5rem;
      }

      .subtitle {
        color: var(--text-muted);
        font-size: 0.9rem;
        margin-bottom: 2rem;
      }

      .subtitle a {
        color: var(--accent);
        text-decoration: none;
      }

      .subtitle a:hover {
        color: var(--accent-hover);
        text-decoration: underline;
      }

      .tools {
        display: flex;
        flex-direction: column;
        gap: 0.75rem;
      }

      .tool-card {
        display: block;
        padding: 1rem 1.25rem;
        background: var(--card-bg);
        border: 1px solid var(--card-border);
        border-radius: 6px;
        text-decoration: none;
        color: var(--text);
        transition: border-color 0.15s;
      }

      .tool-card:hover {
        border-color: var(--accent);
      }

      .tool-card .name {
        font-weight: 600;
        color: var(--accent);
        margin-bottom: 0.2rem;
      }

      .tool-card:hover .name {
        color: var(--accent-hover);
      }

      .tool-card .desc {
        font-size: 0.875rem;
        color: var(--text-muted);
      }

      footer {
        margin-top: 2.5rem;
        padding-top: 1rem;
        border-top: 1px solid var(--border-footer);
        font-size: 0.8rem;
        color: var(--text-muted);
      }

      footer a {
        color: var(--accent);
        text-decoration: none;
      }

      footer a:hover {
        color: var(--accent-hover);
        text-decoration: underline;
      }
    </style>
  </head>
  <body>
    <h1>HTML Tools</h1>
    <p class="subtitle">
      Single-file tools — no build step, no frameworks. Inspired by
      <a href="https://simonwillison.net/2025/Dec/10/html-tools/" target="_blank" rel="noopener">Simon Willison's HTML tools</a>.
    </p>

    <div class="tools">
${toolCards}
    </div>

    <footer>
      <a href="https://github.com/henrythach/tools" target="_blank" rel="noopener">github.com/henrythach/tools</a>
    </footer>
  </body>
</html>
`;
  fs.writeFileSync(path.join(ROOT, 'index.html'), indexRaw);

  execSync('npx prettier --write README.md index.html', { cwd: ROOT, stdio: 'inherit' });

  console.log(`Generated README.md and index.html with ${tools.length} tools:`);
  tools.forEach(t => console.log(`  [${t.base}] ${t.title}`));
}

main();
