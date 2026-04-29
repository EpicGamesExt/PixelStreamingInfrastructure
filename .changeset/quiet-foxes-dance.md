---
"@epicgames-ps/lib-pixelstreamingcommon-ue5.7": patch
"@epicgames-ps/lib-pixelstreamingsignalling-ue5.7": patch
"@epicgames-ps/wilbur": patch
"@epicgames-ps/lib-pixelstreamingfrontend-ue5.7": patch
"@epicgames-ps/lib-pixelstreamingfrontend-ui-ue5.7": patch
---

Make `npm run lint` work regardless of the directory it's invoked from. Each workspace's `eslint.config.mjs` now pins `parserOptions.tsconfigRootDir` to `import.meta.dirname`, so `parserOptions.project` resolves relative to the config file's own directory rather than whichever CWD `typescript-eslint` happens to pick by default. Previously the six workspace configs prefixed `project` with the workspace directory (e.g. `'Common/tsconfig.cjs.json'`), which only worked under one specific `typescript-eslint` version's resolution behavior and broke CI when run from within the workspace.
