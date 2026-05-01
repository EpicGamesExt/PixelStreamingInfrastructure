#!/usr/bin/env node
// Aggregate the latest version section from every workspace's CHANGELOG.md
// into a single markdown blob suitable for the root CHANGELOG.md, a release
// body, or stdout. Issue #596.
//
// Usage:
//   node .github/scripts/aggregate-changelogs.mjs [--branch <name>] [--no-header]
//
// The script reads `package.json` to enumerate workspaces and pulls each
// workspace's most recent (top) section out of its CHANGELOG.md. It does NOT
// cross-reference per-version tags — workspace CHANGELOGs are produced by
// `changesets` and the top section is always the most recent release.

import { readFileSync, existsSync } from 'node:fs';
import { resolve, dirname, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const repoRoot = resolve(dirname(__filename), '..', '..');

function readWorkspaces() {
    const pkg = JSON.parse(readFileSync(resolve(repoRoot, 'package.json'), 'utf-8'));
    const patterns = Array.isArray(pkg.workspaces) ? pkg.workspaces : [];
    const dirs = new Set();
    for (const pattern of patterns) {
        // The repo's `workspaces` array contains explicit paths only — no
        // glob wildcards. If a wildcard is ever introduced this script will
        // need to be updated to resolve it.
        if (pattern.includes('*')) {
            console.error(
                `aggregate-changelogs: workspace pattern '${pattern}' contains a wildcard, which this script does not handle.`
            );
            process.exit(2);
        }
        const full = resolve(repoRoot, pattern);
        if (existsSync(resolve(full, 'package.json'))) {
            dirs.add(full);
        }
    }
    return [...dirs].sort();
}

/**
 * Extract the first version section of a CHANGELOG.md. The format produced
 * by `changesets` is:
 *
 *   # @scope/name
 *
 *   ## 1.2.3
 *
 *   ### Patch Changes
 *
 *   - foo
 *
 *   ## 1.2.2
 *
 *   ...
 *
 * We capture from the first `## ` heading up to (but not including) the next
 * `## ` heading. The leading `# name` heading is captured separately so we
 * can present the workspace name above its content.
 */
function extractLatest(changelogText) {
    const lines = changelogText.split(/\r?\n/);

    let nameHeading = null;
    let i = 0;
    for (; i < lines.length; i++) {
        if (lines[i].startsWith('# ')) {
            nameHeading = lines[i].slice(2).trim();
            i++;
            break;
        }
    }

    let firstStart = -1;
    for (; i < lines.length; i++) {
        if (lines[i].startsWith('## ')) {
            firstStart = i;
            break;
        }
    }
    if (firstStart === -1) {
        return null;
    }

    let secondStart = -1;
    for (let j = firstStart + 1; j < lines.length; j++) {
        if (lines[j].startsWith('## ')) {
            secondStart = j;
            break;
        }
    }

    const sectionLines =
        secondStart === -1
            ? lines.slice(firstStart)
            : lines.slice(firstStart, secondStart);

    const version = sectionLines[0].slice(3).trim();
    const body = sectionLines.slice(1).join('\n').trim();

    return { name: nameHeading, version, body };
}

function args() {
    const a = process.argv.slice(2);
    const out = { branch: null, header: true };
    for (let i = 0; i < a.length; i++) {
        if (a[i] === '--branch' && i + 1 < a.length) {
            out.branch = a[++i];
        } else if (a[i] === '--no-header') {
            out.header = false;
        }
    }
    return out;
}

function main() {
    const { branch, header } = args();
    const workspaces = readWorkspaces();
    const sections = [];

    for (const dir of workspaces) {
        const changelog = resolve(dir, 'CHANGELOG.md');
        if (!existsSync(changelog)) continue;
        const text = readFileSync(changelog, 'utf-8');
        const latest = extractLatest(text);
        if (!latest) continue;
        const rel = relative(repoRoot, dir).replace(/\\/g, '/');
        sections.push({ rel, ...latest });
    }

    if (sections.length === 0) {
        console.error('No workspace CHANGELOG.md files with releasable sections found.');
        process.exit(1);
    }

    const out = [];
    if (header) {
        const date = new Date().toISOString().slice(0, 10);
        const headerText = branch
            ? `## Aggregated workspace changelog — ${branch} — ${date}`
            : `## Aggregated workspace changelog — ${date}`;
        out.push(headerText, '');
    }

    for (const s of sections) {
        const title = s.name ? `${s.name} (${s.rel})` : s.rel;
        out.push(`### ${title} — ${s.version}`);
        out.push('');
        out.push(s.body);
        out.push('');
    }

    process.stdout.write(out.join('\n'));
}

main();
