# Armory

Peer-to-peer webtools over [nostr](https://nostr.com). Every tool runs entirely in the browser and syncs over relays you choose: no sign-up needed, no server of ours, no tracking, and everything is encrypted before it leaves your device. Install it as a web app from the landing page.

Armory is a **distribution** of [kiwi-framework](https://github.com/derlocke-ng/kiwi-framework): the framework is the engine, the hub pages and the app kit; this repository is one hub built with it, and the template to fork for your own. It is part of the [Kiwi Network](https://kiwi-network.eu). It used to be called weaponized.js.

**Live:** <https://derlocke-ng.github.io/armory/>

| Tool | What it does | Built with |
|---|---|---|
| [**Loadout**](apps/loadout) · [open](https://derlocke-ng.github.io/armory/loadout/) | Shared grocery/to-do lists, household inventory and markdown notes across devices; end-to-end encrypted, rentry-style links, survives relays forgetting. The framework's boards app, mounted under Armory's name | nostr, AES-GCM, React |
| [**Outpost**](apps/outpost) · [open](https://derlocke-ng.github.io/armory/outpost/) | Grow reports: entries with photos for everyone in Outpost, for your friends, a circle or only you; hashtags, likes and comments; sealed on your device, photos encrypted with keys inside the entry. Friends added later read what you shared with friends; someone you unfriend reads nothing new. The framework's feed app, on Armory's `outpost` space | nostr, NIP-72, NIP-59, Blossom, React |
| [**Trading Post**](apps/tradingpost) · [open](https://derlocke-ng.github.io/armory/tradingpost/) | A hemp marketplace: seeds, cuttings and gear with photos, filtered by category and by where you are (listings that ship there, or pickup), found without a plain word on the relays; "Message seller" opens Uplink with a message drafted. Sellers have shown up in Outpost first (three posts, each liked by three other people) or a moderator approves them. For people with an account on Armory (no age check). The framework's market app, on Armory's `tradingpost` space | nostr, NIP-72, NIP-32, NIP-40, Blossom, React |
| [**Payload**](apps/payload) · [open](https://derlocke-ng.github.io/armory/payload/) | The file share: drop files, then a link that waits on your media servers, encrypted, until you delete it (whoever has the link downloads, also when you are offline); files to friends and groups, sealed into Uplink; or straight from your browser to theirs, stored nowhere. Files people sent you in Uplink are listed too. The framework’s payload app | Blossom, NIP-17, nostr, WebRTC, React |
| [**pongjs**](apps/pongjs) · [open](https://derlocke-ng.github.io/armory/pongjs/) | Two-player Pong between browsers: link, QR or open-games lobby. The framework's pong app | nostr signaling, WebRTC, React, canvas |
| [**Uplink**](apps/uplink) · [open](https://derlocke-ng.github.io/armory/uplink/) | Messages and files to your friends (NIP-17, sealed on your device; files encrypted on your media servers, so they arrive even when your friend is away), groups that stay until their host closes them (friends are invited from inside and say yes or no in Uplink; a link only lets strangers knock), and live rooms anyone with the link can join, gone when they empty. Tap a message to react, reply, edit or delete your own, or pin it for both sides; pin conversations to the top, search everything on your device, and let messages disappear after a time you set. Voice and video calls with friends and in small groups, straight between the browsers. The framework's chat app | nostr, NIP-17, NIP-59, NIP-25, NIP-40, WebRTC, React |
| [**Calendar**](apps/calendar) · [open](https://derlocke-ng.github.io/armory/calendar/) | Your calendar from your own Nextcloud or any CalDAV server: the coming days or a month on the phone, events made, changed and deleted, repeating ones, reminders while a page is open. Nothing of it goes to relays; the login is sealed in your account, so every device you sign in on has it. Your server must allow Armory's origin (CORS). The framework's calendar app | CalDAV, iCalendar, tsdav, ical.js, React |
| [**Vault**](apps/vault) · [open](https://derlocke-ng.github.io/armory/vault/) | A password manager: logins, notes, cards and two-factor codes on every device you sign in on; a generator beside every password, a health report (weak, reused and old passwords, and known breaches if you turn that check on), imports from Bitwarden, KeePass, the browsers and other managers, exports for them; SSH keys, an SSH certificate authority for users and hosts, an X.509 CA for your own services, and TLS certificates in one step (host and *.host, self-signed, or for another CA; renewed in one tap). Sealed with a passphrase of its own; each entry its own event on the relays, unreadable there. Authenticator opens the same vault. The framework's vault app | scrypt, AES-GCM, OpenSSH, X.509, nostr, React |
| [**Authenticator**](apps/authenticator) · [open](https://derlocke-ng.github.io/armory/authenticator/) | Two-factor codes for your accounts elsewhere, on every device you sign in on: add one with the QR code a service shows (camera or screenshot), its link or secret, or a Google Authenticator export; a tap copies the code. The secrets are kept in your account sealed with a passphrase of their own, which even your account's password does not open; backups stay sealed. The framework's authenticator app | TOTP (RFC 6238), scrypt, AES-GCM, jsQR, React |
| [DevBoard](apps/devboard) · [open](https://derlocke-ng.github.io/armory/devboard/) | Freelancer noticeboard: signed notes with proof of work, votes, reports, expiry; the hub's account and block list. The framework's notices app, on Armory's `devboard` space | nostr, NIP-13, NIP-25, NIP-56, NIP-72, React |

Coming later: a blog. Outpost entries can be marked 18+ or as an ad, by their writer, by two reports, or by Armory's moderators; those show to people with an account only. Armory's moderators (`moderators` in `distribution.js`) moderate Outpost, Trading Post and DevBoard. The framework names its apps plainly; a distribution shows them under its names through its mounts. EnigmaJS, the old chat rooms on gun, is retired: Uplink's rooms do what it did, on nostr.

**One account, one settings page.** Sign in or create an account on the landing page (username + password, or a nostr key) and every tool uses it; boards made on a device before signing in are carried over. Without an account each device simply uses its own key, which can carry a name for friends to see; pasting a key on another device signs it in fully, name and all. In the settings, Your account changes the password (the old one stops opening the account everywhere, your key stays the same) and lists the devices signed in with the key, each with a sign-out. New messages, invitations, shares and friend requests show as a count on the start page and in the switcher, as a note in whatever tool is open, and, if you opt in, as browser notifications while a tab is open. The hub's settings page holds everything that is not specific to one tool, in four tabs: account, people, circles and blocks; language, appearance (light, dark or the system's, and an accent colour: lime, forest, sky, violet, amber, rose or graphite), the apps (show, hide, drag into your order) and proof of work; relays with live status and media servers for photos, each of which can be checked; backup and restore of everything your devices know, and wiping the device. Language, app order and media servers follow your account; appearance is each device's own. Each tool keeps only its own settings.

Every page is translated: English, German, French, Spanish, Italian, Dutch, Polish and Portuguese, picked from the browser's language with a one-time prompt. Adding a language is one JSON file per app plus one in `locales/`.

Armory is also a container image, `ghcr.io/derlocke-ng/armory` (the `Dockerfile` at the root is the framework's; `.github/workflows/image.yml` pushes it on `main` and on release tags). On a kiwi-node, [kiwi-modules](https://github.com/derlocke-ng/kiwi-modules)' `hub` module runs it behind the node's reverse proxy with the node's own relay (`nostr-relay`), and its `HUB_*` environment decides the relays and policy at start (`hub.local.json`), so this one image is a private hub inside a VPN, a semi-public one, or a public hub.

DevBoard is the first tool on a **space**: a named community (a NIP-72 definition on the relays, its address in `hub.json`) that every note names, so a board shows only its space's notes and another hub can serve the same space by naming its address; a note's link (⋯ → Copy link) opens on whichever hub serves the space. Outpost and Trading Post are on spaces of their own; the framework's `docs/protocol.md` §12 to §14 have the formats.

Armory is a public hub: public relays, open to change in the settings. A fork can be a **private hub** (relays inside its VPN, locked, pages that wait while the network is away) or a **semi-public** one (a chat on public relays beside the hub's own network, so its people talk to outsiders) by setting `relays`, `publicRelays` and `policy` in `distribution.js`; the framework's `docs/architecture.md`, *Hubs*, has the model.

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

Everything else comes from the framework in `node_modules/kiwi-framework`: the start page, the settings and account pages, Loadout, DevBoard, Payload and pongjs (all React and TypeScript, built with Vite), the React layer apps use (`ui/`), the library underneath (`shared/`), the service worker, the icon sprite, the dev server, the build and the scaffolder. `npm run build` assembles `_site/`: the hub at the root, the library in `shared/`, this file's config in place of the framework's, the strings merged, every app built for its route (the framework's apps under Armory's names, our own React apps the same way), and a service worker whose version is a hash of what it precaches.

## Adding an app

```sh
npm run new-app -- outpost "Outpost" sprout     # id, name, a lucide symbol id from the sprite
```

That scaffolds `apps/outpost/` as a React app on the framework's React layer (`kiwi-framework/ui`): page, `App.tsx` with the app shell, a home and a settings page, its stylesheet and strings in every language. It registers and mounts the app in `distribution.js`, adds its card text to `locales/` and draws its favicon. The build compiles it with Vite for every route it is mounted at, like the framework's own apps, and `npm run dev` rebuilds it on save. The start page, the switcher, the Apps toggles, the top bar and the service worker then know it, and the app gets the account (`useIdentity`), its own settings in the account (`useAppSettings`), friends, circles and sharing (`usePeople`, `pickPeople`), the block list (`useBlocks`), nostr events (`useEvents`) and the widgets. What remains is the app itself, its translations and a browser test; `npm run icons` redraws favicons after an icon change, and `npm test` tells you when something is stale.

## Forking

Armory is a GitHub template repository: **Use this template** gives you a copy without Armory's history, a fork keeps it; both work. Then:

1. `distribution.js`: id, name, mark, description, homepage and repository, relays, media servers (`npm run probe` checks what each one does with an upload), the spaces your boards serve, the apps you keep and the mounts you show. One app can be mounted several times under different ids and names (two markets, two feeds), each on a space of its own; each mount gets its own route, card and switcher entry, and a card text `hub.<mount id>.text` in `locales/`. To serve one of Armory's spaces too, copy its address from Armory's `hub.json` (`owner` and `id`); your own spaces are simply yours (their keys derive from your hub's id).
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
npm run test:e2e               # Loadout, the hub, DevBoard, Payload, pongjs, Uplink and Calendar in real browsers (needs Chromium)
```

In the hub's settings (*Network*), add `ws://localhost:7777` to work against the local relay.

The framework is pinned in `package.json` to one commit or release tag of kiwi-framework (`github:derlocke-ng/kiwi-framework#<tag or sha>`); bump it deliberately and run the tests. To work on both at once, point it at a checkout: `npm install ../kiwi-framework`.

## Deployment

GitHub Pages, built by `.github/workflows/deploy.yml` on every push to `main` (pull requests only run the tests and the build). In the repository settings set **Pages → Source** to **GitHub Actions**.

## License

[GPL-3.0-or-later](LICENSE). Third-party code is listed in the framework's `shared/LICENSES.md`.
