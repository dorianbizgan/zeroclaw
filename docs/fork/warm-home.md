# Warm Home presentation branch

This fork keeps the upstream dashboard and adds a restrained warm presentation layer. No gateway, tool, permission, pairing, channel, scheduling or inference behavior changes belong in this branch.

- Warm Light: cream surfaces, charcoal text, terracotta actions and muted olive status colors.
- Warm Dark: warm charcoal surfaces, parchment text and clay accents.
- Local Avenir/system typography; serif page titles. The new defaults request no external fonts.
- Fewer decorative icons in statistics and agent rows. Navigation and action affordances remain available.
- Original default Operator palettes migrate to their matching warm mode when the original cyan accent was selected. Other saved palettes, custom fonts and text sizes remain intact. Both upstream and warm themes remain selectable in Settings.

The theme catalogue (`web/src/contexts/themes.json`) owns palette values. `ThemeContext.tsx` owns preferences, migration and theme application. The `data-warm-home` selector scopes visual refinements in `web/src/index.css`. Keep changes here rather than editing generated assets.

## Upstream updates

This branch starts at upstream v0.8.6 to match the installed backend. Keep the public upstream as `upstream` and this fork as `origin`. Fetch upstream tags, then merge a reviewed target release into a separate integration branch based on this design branch. Resolve presentation conflicts in favor of this fork's warm defaults while incorporating upstream features and fixes. Build and test the frontend against the matching backend before activation. Do not replace this branch with a hard reset to upstream: that would discard the design commits.

Build using upstream's `cargo web` workflow, which generates frontend types from the gateway schema. On the local installed-release preview, generated ignored build inputs were derived from that exact running backend's public OpenAPI schema because no Rust toolchain was installed. These generated files and built assets are intentionally not committed.

## Validation

From `web/`:

```sh
npm run build
npm run test:warm
npm run test:navigation
npm test
```

Warm-theme checks cover normal-text contrast on the primary surfaces, saved preference migration, mode switching, preservation of non-default preferences, and cleanup when returning to an upstream palette. Inspect desktop and narrow layouts, both schemes, chat history/composer and configuration forms through the running gateway. Screenshot evidence stays in the private local task artifacts; never upload pairing credentials, configuration or household conversations to this public fork.

Rollback: revert the presentation commit or choose an upstream palette in Settings. Local deployments retain the original immutable frontend release so they can change only `gateway.web_dist_dir` and restart the isolated gateway. This branch does not replace any live household backend.
