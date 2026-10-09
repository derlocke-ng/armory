# Loadout

Shared lists, inventories and markdown notes that sync across your devices and with the people you share them with, end-to-end encrypted, over nostr. **Live:** <https://derlocke-ng.github.io/armory/loadout/>

Loadout is kiwi-framework's **boards** app, mounted here under Armory's name (`framework: 'boards'` in [`distribution.js`](../../distribution.js)). Its code, strings, browser suite and documentation live in the framework: [`apps/boards`](https://github.com/derlocke-ng/kiwi-framework/tree/main/apps/boards). This folder holds only what Armory lays over it: the PNG icons, the favicon and the web app manifest, and its catalog entry (`kiwi.manifest`).

`node test/e2e/loadout.mjs` runs the framework's boards suite against Armory's own site.
