#!/usr/bin/env bash
# Runs inside the `changesets/action` release-branch worktree as the `version:`
# command. Normalizes "-ueX.Y" suffixes in changeset files so that changesets
# authored on master (which reference the current-latest suffix, e.g.
# "-ue5.7") are accepted on older UE release branches after auto-backport.
#
# Using the action's `version:` hook rather than a pre-step is deliberate: the
# action performs `git reset --hard <sha>` inside a fresh `changeset-release/*`
# branch right before running this command, which would wipe any working-tree
# edits made earlier in the workflow.
#
# The normalization is idempotent — a branch whose changesets already have the
# correct suffix is a no-op — and only touches .changeset/*.md (not README).
# Branches that do not match `UEX.Y` skip the rewrite entirely.
set -euo pipefail

branch="${GITHUB_REF_NAME:-}"
if [[ "$branch" =~ ^UE([0-9]+\.[0-9]+)$ ]]; then
    ver="${BASH_REMATCH[1]}"
    echo "Normalizing -ue* suffixes in .changeset/*.md to ue${ver}"
    shopt -s nullglob
    rewrote=0
    for f in .changeset/*.md; do
        [[ "$(basename "$f")" == "README.md" ]] && continue
        before="$(cat "$f")"
        after="$(sed -E "s|(-ue)[0-9]+\.[0-9]+|\1${ver}|g" "$f")"
        if [[ "$before" != "$after" ]]; then
            printf '%s' "$after" > "$f"
            echo "  rewrote $f"
            rewrote=$((rewrote + 1))
        fi
    done
    echo "Normalized ${rewrote} file(s)."
else
    echo "Branch '$branch' is not UEx.y; skipping suffix normalization."
fi

npx changeset version
