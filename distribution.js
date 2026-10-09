// The distribution: everything a fork changes and the framework never
// hardcodes. Armory is derlocke-ng's hub and the template to fork; the
// framework (kiwi-framework) reads this file for the hub's name and mark,
// its default relays, its policy, the apps it ships and the mounts it shows.
// The model is in the framework's docs/architecture.md, "Framework,
// distributions, apps".
//
//   apps     the code this distribution ships, once each: id is the folder
//            under apps/ and the URL path, icon a symbol in the framework's
//            sprite (or this repository's icons.svg), tags what it runs on,
//            legacy marks an app built elsewhere (Vite) that is not precached,
//            framework names one of the framework's own apps (Loadout is its
//            boards app); files in apps/<id>/ are laid over it (icons, manifest)
//   mounts   what the start page and the switcher show: an app mounted on a
//            space. A mount may rename the app and change its icon; the id
//            is this hub's route (<id>/) and the i18n key of its card text
//            (hub.<id>.text in locales/). `space` is the community a feed or
//            market serves; null until spaces exist.
//   media    the default media (Blossom) servers for photos, first choice
//            first, until a user picks their own in the settings (Network,
//            Media servers, where each one can be checked)
//   policy   userMounts: may a user follow a space this hub does not ship?
export const DISTRIBUTION = {
  id: 'armory',
  name: 'Armory',
  shortName: 'Armory',
  brandHtml: 'Armory',
  description: 'Peer-to-peer webtools on nostr: shared lists, file drops, a noticeboard and games. Everything runs in your browser and syncs over relays you choose.',
  homepage: 'https://derlocke-ng.github.io/armory/',
  repo: 'https://github.com/derlocke-ng/armory',
  relays: ['wss://nos.lol', 'wss://relay.damus.io', 'wss://nostr.mom', 'wss://relay.primal.net'],
  // Checked October 2026: the first two take any file (so encrypted photos), blossom.band takes
  // photos only (the unencrypted fallback), primal did not answer a page.
  media: ['https://nostr.download', 'https://blossom.yakihonne.com', 'https://blossom.band', 'https://blossom.primal.net'],
  policy: { userMounts: false },
  apps: [
    { id: 'loadout', name: 'Loadout', icon: 'list-checks', tags: ['nostr', 'E2EE', 'offline-first', 'markdown'], framework: 'boards' },
    { id: 'payload', name: 'Payload', icon: 'send', tags: ['gun', 'WebRTC', 'SHA-256'] },
    { id: 'pongjs', name: 'pongjs', icon: 'gamepad-2', tags: ['gun', 'WebRTC', 'canvas'] },
    { id: 'devboard', name: 'DevBoard', icon: 'sticky-note', tags: ['nostr', 'proof of work', 'signed notes'] },
    { id: 'enigmajs', name: 'EnigmaJS', icon: 'message-square-lock', tags: ['gun', 'SEA', 'Vue'], legacy: true },
  ],
  mounts: [
    { id: 'loadout', app: 'loadout', featured: true, isNew: true },
    { id: 'payload', app: 'payload' },
    { id: 'pongjs', app: 'pongjs' },
    { id: 'devboard', app: 'devboard', space: null, isNew: true },
    { id: 'enigmajs', app: 'enigmajs' },
  ],
};
