# Payload

**Live:** <https://derlocke-ng.github.io/armory/payload/>

Payload is kiwi-framework's **payload** app, mounted here under Armory's name (`framework: 'payload'` in [`distribution.js`](../../distribution.js)): Armory's file share. Drop files and send them as a link that waits on your media servers, encrypted, until you delete it; to friends and groups in Uplink; or straight from your browser to theirs, stored nowhere. Files that came in Uplink are listed too. Its code, browser suite and documentation live in the framework: [`apps/payload`](https://github.com/derlocke-ng/kiwi-framework/tree/main/apps/payload). This folder holds only what Armory lays over it (the favicon) and its catalog entry (`kiwi.manifest`).

`node test/e2e/payload.mjs` runs the framework's suite against Armory's own site.
