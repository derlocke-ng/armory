# Outpost

**Live:** <https://derlocke-ng.github.io/armory/outpost/>

Outpost is kiwi-framework's **feed** app, mounted here under Armory's name on Armory's `outpost` space (`framework: 'feed'` in [`distribution.js`](../../distribution.js)): grow reports, with photos, for everyone in the space, for friends, a circle or only yourself, and grow diaries (a series of entries, "Week 1", "Week 2", with a cover; since kiwi-framework 0.32), sealed on the device before anything leaves it. Its code, browser suite and documentation live in the framework: [`apps/feed`](https://github.com/derlocke-ng/kiwi-framework/tree/main/apps/feed). This folder holds only what Armory lays over it (the favicon) and its catalog entry (`kiwi.manifest`).

`node test/e2e/outpost.mjs` runs the framework's suite against Armory's own site.
