# Armory

Peer-to-peer webtools over [nostr](https://nostr.com). Every tool runs entirely in the browser and syncs over relays you choose: no sign-up needed, no server of ours, no tracking, and everything is encrypted before it leaves your device. Install it as a web app from the landing page.

Armory is a **distribution** of [kiwi-framework](https://github.com/derlocke-ng/kiwi-framework): the framework is the engine, the hub pages and the app kit; this repository is one hub built with it, and the template to fork for your own. It is part of the [Kiwi Network](https://kiwi-network.eu). It used to be called weaponized.js.

**Live:** <https://derlocke-ng.github.io/armory/>

| Tool | What it does | Built with |
|---|---|---|
| [**Loadout**](apps/loadout) · [open](https://derlocke-ng.github.io/armory/loadout/) | Shared grocery/to-do lists, household inventory and markdown notes across devices; end-to-end encrypted, rentry-style links, survives relays forgetting. The framework's boards app, mounted under Armory's name | nostr, AES-GCM, React |
| [**Payload**](apps/payload) · [open](https://derlocke-ng.github.io/armory/payload/) | Send files straight to another online browser; every 64 KB piece checked with SHA-256. The framework's payload app | gun signaling, WebRTC (moving to nostr), React |
| [**pongjs**](apps/pongjs) · [open](https://derlocke-ng.github.io/armory/pongjs/) | Two-player Pong between browsers: link, QR or open-games lobby. The framework's pong app | gun signaling, WebRTC (moving to nostr), React, canvas |
| [EnigmaJS](apps/enigmajs) · [open](https://derlocke-ng.github.io/armory/enigmajs/) | Encrypted, ephemeral group chat rooms | gun, SEA, Vue + Vite |
| [DevBoard](apps/devboard) · [open](https://derlocke-ng.github.io/armory/devboard/) | Freelancer noticeboard: signed notes with proof of work, votes, reports, expiry; the hub's account and block list. The framework's notices app | nostr, NIP-13, NIP-25, NIP-56, React |

Coming, as framework apps under Armory's own names: **Uplink** (the framework's `chat`: messages between accounts and ephemeral rooms), **Outpost** (`feed`: grow reports with an Instagram-style feed) and **Trading Post** (`market`: seeds, cuttings and gear), later a blog. The framework names its apps plainly; a distribution shows them under its names through its mounts. EnigmaJS is legacy and goes once Uplink exists.

**One account, one settings page.** Sign in or create an account on the landing page (username + password, or a nostr key) and every tool uses it; boards made on a device before signing in are carried over. Without an account each device simply uses its own key. The hub's settings page holds everything that is not specific to one tool, in four tabs: account, people, circles and blocks; language, appearance, the apps (show, hide, drag into your order) and proof of work; relays with live status and media servers for photos, each of which can be checked; backup and restore of everything your devices know, and wiping the device. Language, appearance, app order and media servers follow your account. Each tool keeps only its own settings.

Every page is translated: English, German, French, Spanish, Italian, Dutch, Polish and Portuguese, picked from the browser's language with a one-time prompt. Adding a language is one JSON file per app plus one in `locales/`.

## Layout

```
distribution.js      what this hub is: name and mark, default relays and media servers, policy, the apps
                     it ships and the mounts it shows (the one file a fork changes)
kiwi.manifest        this hub's entry for kiwi-web-catalog; every app has one too
locales/<lang>.json  this hub's own strings: title, lead, footer, one card text per mount
apps/<id>/           one folder per tool (served at /<id>/): an app of our own (React on kiwi-framework/ui,
                     built by Vite), or for a framework app only what is laid over it: icons, catalog entry
public/              optional: files copied over the site root (favicon, CNAME)
icons.svg            optional: lucide symbols added to the framework's sprite
test/                unit tests (node --test) and end-to-end tests per app
.github/workflows/   test, build and deploy to GitHub Pages
```

Everything else comes from the framework in `node_modules/kiwi-framework`: the start page, the settings and account pages, Loadout, DevBoard, Payload and pongjs (all React and TypeScript, built with Vite), the React layer apps use (`ui/`), the library underneath (`shared/`), the service worker, the icon sprite, the dev server, the build and the scaffolder. `npm run build` assembles `_site/`: the hub at the root, the library in `shared/`, this file's config in place of the framework's, the strings merged, every app built for its route (the framework's apps under Armory's names, our own React apps the same way, EnigmaJS with its own Vite and Vue), and a service worker whose version is a hash of what it precaches.

## Adding an app

```sh
npm run new-app -- outpost "Outpost" sprout     # id, name, a lucide symbol id from the sprite
```

That scaffolds `apps/outpost/` as a React app on the framework's React layer (`kiwi-framework/ui`): page, `App.tsx` with the app shell, a home and a settings page, its stylesheet and strings in every language. It registers and mounts the app in `distribution.js`, adds its card text to `locales/` and draws its favicon. The build compiles it with Vite for every route it is mounted at, like the framework's own apps, and `npm run dev` rebuilds it on save. The start page, the switcher, the Apps toggles, the top bar and the service worker then know it, and the app gets the account (`useIdentity`), its own settings in the account (`useAppSettings`), friends, circles and sharing (`usePeople`, `pickPeople`), the block list (`useBlocks`), nostr events (`useEvents`) and the widgets. What remains is the app itself, its translations and a browser test; `npm run icons` redraws favicons after an icon change, and `npm test` tells you when something is stale.

## Forking

Armory is a GitHub template repository: **Use this template** gives you a copy without Armory's history, a fork keeps it; both work. Then:

1. `distribution.js`: id, name, mark, description, homepage and repository, relays, media servers (`npm run probe` checks what each one does with an upload), the apps you keep and the mounts you show. One app can be mounted several times under different ids and names (two markets, two feeds); each mount gets its own route, card and switcher entry, and a card text `hub.<mount id>.text` in `locales/`.
2. `locales/*.json`: title, lead, footer and one card text per mount, in the languages you care about (English is the fallback).
3. `kiwi.manifest`: your hub's name and description. Add a line for it to [kiwi-web-catalog](https://github.com/derlocke-ng/kiwi-web-catalog) if you want other hubs to find your apps.
4. In the repository settings set **Pages → Source** to **GitHub Actions**, then push: the workflow builds and deploys your hub. Users of your hub and of this one share nothing by default but the protocol; they meet on the relays they both use. The model (framework, distributions, apps; spaces and mounts; federation) is in the framework's [`docs/architecture.md`](https://github.com/derlocke-ng/kiwi-framework/blob/main/docs/architecture.md).

## Development

```sh
npm install
npm test                       # unit tests (they assemble the site into a temp folder)
npm run dev                    # the hub with hot reload on http://localhost:5173/, apps under /<id>/
npm run build && npm run serve # the full site, as deployed
npm run relay:nostr            # local nostr relay on ws://localhost:7777 (data in .nostr/)
npm run relay                  # local gun relay on http://localhost:8765/gun (Payload, pongjs)
npm run test:e2e               # Loadout, the hub, DevBoard, Payload and pongjs in real browsers (needs Chromium)
```

In the hub's settings (*Network*), add `ws://localhost:7777` to work against the local relay.

The framework is pinned in `package.json` to one commit or release tag of kiwi-framework (`github:derlocke-ng/kiwi-framework#<tag or sha>`); bump it deliberately and run the tests. To work on both at once, point it at a checkout: `npm install ../kiwi-framework`.

## Deployment

GitHub Pages, built by `.github/workflows/deploy.yml` on every push to `main` (pull requests only run the tests and the build). In the repository settings set **Pages → Source** to **GitHub Actions**.

## License

[GPL-3.0-or-later](LICENSE). EnigmaJS, the one legacy app, keeps its own license: PolyForm Noncommercial 1.0.0 (see its folder). Third-party code is listed in the framework's `shared/LICENSES.md`.
