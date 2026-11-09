# Working on Armory

Armory is a distribution of [kiwi-framework](https://github.com/derlocke-ng/kiwi-framework): this repository holds `distribution.js` (the one file a fork changes), the hub's strings in `locales/`, what is laid over the framework's apps in `apps/<id>/`, and the tests that run the framework's suites against Armory's own site. Everything else comes from `node_modules/kiwi-framework`, pinned to one commit in `package.json`. The framework's `CLAUDE.md` has the conventions (commit messages, strings in eight languages, the pin procedure, the invariants); read it first.

## Commands

```sh
npm ci && npm run build        # assembles _site/ (the hub at the root, apps below, hub.json)
npm test                       # unit tests: the site assembles, registry consistent, strings complete
node test/e2e/hub.mjs          # Armory's own suite: one account for the whole suite
node test/e2e/loadout.mjs && node test/e2e/devboard.mjs && node test/e2e/outpost.mjs && node test/e2e/tradingpost.mjs && node test/e2e/payload.mjs && node test/e2e/pong.mjs && node test/e2e/uplink.mjs && node test/e2e/calendar.mjs
```

The eight app suites are the framework's, run against Armory's build under Armory's mount names. Run suites one after another. `npm run dev` serves the hub with hot reload.

## Updating the framework

Pin by commit, never by branch: `npm install git+https://github.com/derlocke-ng/kiwi-framework.git#<sha>`, then put the `git+https://…git#<sha>` form back into `package.json` and `package-lock.json` (npm rewrites it to `github:…`), `npm ci`, `npm run build`, `npm test`, the nine suites, commit (`Pin kiwi-framework <version>; …`), push `main`. `.github/workflows/deploy.yml` builds and deploys GitHub Pages; `https://derlocke-ng.github.io/armory/hub.json` shows the deployed `framework` version. The container image (`ghcr.io/derlocke-ng/armory`, `.github/workflows/image.yml`) builds on the same push.

## What Armory is

A public hub: public relays a person may replace, `purplepag.es` as the directory for relay lists, no public area (its own network is public already). Mounts: Loadout (`boards`), Outpost (`feed`, on the space `outpost`), Trading Post (`market`, on the space `tradingpost`, `requireAccount: true`, the reason in `hub.tradingpost.account`: a hemp-related marketplace; the owner decided no age check; `sellers: { space: 'outpost', posts: 3, likes: 3 }`, the owner's rule: sellers show up in Outpost first or a moderator approves them; `test/e2e/tradingpost.mjs` names a test moderator in the test site's `hub.local.json`), Payload, pongjs, DevBoard (`notices`, on the space `devboard`), Uplink (`chat`), Calendar (`calendar`: the person's own CalDAV server, Nextcloud first; Armory on GitHub Pages reaches it directly, so the server must allow Armory's origin, CORS; nothing of it on nostr). A new or retired app also changes kiwi-web-catalog's `apps.list`. The card text of a mount is `hub.<mount id>.text` in `locales/*.json`; a new mount needs it in every language.

## Spaces

`moderators` in `distribution.js` names Armory's moderators (npubs): the owner's account (derlocke-ng). They moderate every space Armory defines: a report of theirs folds a post, they mark posts 18+ or as an ad, the feed shows them a Reported tab. Add or remove one only when the owner says so.

`spaces` in `distribution.js` lists the communities Armory's boards serve; a mount names one with `space`. Armory's spaces have no owner, so their keys derive from Armory's id and theirs and their definitions are published by Armory's own devices (framework `docs/protocol.md` §12). A fork that wants to serve the same space copies its address from Armory's `hub.json` as `owner` + `id`; a fork that wants its own simply lists its own.
