# Trading Post

**Live:** <https://derlocke-ng.github.io/armory/tradingpost/>

Trading Post is kiwi-framework's **market** app, mounted here under Armory's name on Armory's `tradingpost` space (`framework: 'market'` in [`distribution.js`](../../distribution.js)): a hemp marketplace for seeds, cuttings and gear. Listings are sealed on the device and found without plain words on the relays; buyers write to sellers in Uplink. Because it is hemp-related, Armory keeps it for people with an account (`requireAccount: true`, the reason in `hub.tradingpost.account`); there is no age check. Its code, browser suite and documentation live in the framework: [`apps/market`](https://github.com/derlocke-ng/kiwi-framework/tree/main/apps/market). This folder holds only what Armory lays over it (the favicon) and its catalog entry (`kiwi.manifest`).

`node test/e2e/tradingpost.mjs` runs the framework's suite against Armory's own site.
