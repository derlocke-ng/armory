# Working on Armory

Armory is a distribution of [kiwi-framework](https://github.com/derlocke-ng/kiwi-framework): this repository holds `distribution.js` (the one file a fork changes), the hub's strings in `locales/`, what is laid over the framework's apps in `apps/<id>/`, and the tests that run the framework's suites against Armory's own site. Everything else comes from `node_modules/kiwi-framework`, pinned to one commit in `package.json`. The framework's `CLAUDE.md` has the conventions (commit messages, strings in eight languages, the pin procedure, the invariants); read it first.

## Commands

```sh
npm ci && npm run build        # assembles _site/ (the hub at the root, apps below, hub.json)
npm test                       # unit tests: the site assembles, registry consistent, strings complete
node test/e2e/hub.mjs          # Armory's own suite: one account for the whole suite
node test/e2e/loadout.mjs && node test/e2e/devboard.mjs && node test/e2e/outpost.mjs && node test/e2e/payload.mjs && node test/e2e/pong.mjs && node test/e2e/uplink.mjs
```

The six app suites are the framework's, run against Armory's build under Armory's mount names. Run suites one after another. `npm run dev` serves the hub with hot reload.

## Updating the framework

Pin by commit, never by branch: `npm install git+https://github.com/derlocke-ng/kiwi-framework.git#<sha>`, then put the `git+https://…git#<sha>` form back into `package.json` and `package-lock.json` (npm rewrites it to `github:…`), `npm ci`, `npm run build`, `npm test`, the seven suites, commit (`Pin kiwi-framework <version>; …`), push `main`. `.github/workflows/deploy.yml` builds and deploys GitHub Pages; `https://derlocke-ng.github.io/armory/hub.json` shows the deployed `framework` version. The container image (`ghcr.io/derlocke-ng/armory`, `.github/workflows/image.yml`) builds on the same push.

## What Armory is

A public hub: public relays a person may replace, `purplepag.es` as the directory for relay lists, no public area (its own network is public already). Mounts: Loadout (`boards`), Outpost (`feed`, on the space `outpost`), Payload, pongjs, DevBoard (`notices`, on the space `devboard`), Uplink (`chat`). Coming: Trading Post (`market`) on a space of its own, mounted with `requireAccount: true` and a `hub.tradingpost.account` text in every language saying why (the owner decided: no age check, accounts instead). The card text of a mount is `hub.<mount id>.text` in `locales/*.json`; a new mount needs it in every language.

## Spaces

`spaces` in `distribution.js` lists the communities Armory's boards serve; a mount names one with `space`. Armory's spaces have no owner, so their keys derive from Armory's id and theirs and their definitions are published by Armory's own devices (framework `docs/protocol.md` §12). A fork that wants to serve the same space copies its address from Armory's `hub.json` as `owner` + `id`; a fork that wants its own simply lists its own.
