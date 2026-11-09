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
//   spaces   the communities this hub's boards, feeds and markets serve (the
//            framework's docs/protocol.md §12): id, name, description, and
//            optionally owner (a hex pubkey; none: the space is Armory's, its
//            key derived from Armory's id and its own), relays (the space's
//            own network; none: the mount's), moderators, adult, langs,
//            region, rules. Another hub serves the same space by naming its
//            address (from hub.json) as owner + id.
//   mounts   what the start page and the switcher show: an app mounted on a
//            space. A mount may rename the app and change its icon; the id
//            is this hub's route (<id>/) and the i18n key of its card text
//            (hub.<id>.text in locales/). `space` names one of the spaces
//            above; an app that serves no community (Loadout, Payload, pong,
//            the chat) is mounted without one. `requireAccount: true` makes a
//            mount ask for an account (username and password), not only a key,
//            and say why (hub.<id>.account in locales/); no age is asked.
//   media    the default media (Blossom) servers for photos, first choice
//            first, until a user picks their own in the settings (Network,
//            Media servers, where each one can be checked)
//   relays   the hub's own network. Armory is a public hub: public relays,
//            and a user may replace them. A company's private hub names
//            relays inside its VPN here instead, locks them (policy.relays:
//            'locked') and makes its pages wait while none is reachable
//            (policy.requireHub: true); its apps then work only from inside.
//   publicRelays  a public area: relays anyone reaches, used by the mounts
//            marked network: 'public' (a semi-public hub puts its chat there,
//            so its people can talk to outsiders). Armory has no need for one:
//            its own network is public already.
//   policy   userMounts: may a user follow a space this hub does not ship?
//            relays: 'open' or 'locked'; requireHub: true or false (see relays)
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
  publicRelays: [],
  // Where relay lists are published and found, so Armory's people reach people on hubs that share no
  // relay with it. purplepag.es is the common nostr directory for relay lists. What goes there is what
  // Armory's public relays hold already: each person's relay and inbox lists, nothing else.
  directoryRelays: ['wss://purplepag.es'],
  policy: { userMounts: false, relays: 'open', requireHub: false },
  // Armory's moderators: they moderate every space below (Outpost, Trading Post, DevBoard): their report folds a
  // post for everyone, they mark posts 18+ or as an ad, and they see what people reported. derlocke-ng's account.
  moderators: ['npub1u8deaf2dp524mjkg42qulxry7ltjcma7s3rmrxqln5f5nwfhxezqee93gu'],
  spaces: [
    {
      id: 'outpost',
      name: 'Outpost',
      description: 'Grow reports: photos and notes from people’s grows, week by week.',
      relays: [],
    },
    {
      id: 'tradingpost',
      name: 'Trading Post',
      description: 'A hemp marketplace: seeds, cuttings and gear, from people with an account on Armory.',
      relays: [],
    },
    {
      id: 'devboard',
      name: 'DevBoard',
      description: 'Freelance work: who is hiring, who is available. Signed notes with proof of work; three live notes per person; notes expire.',
      relays: [],
    },
  ],
  apps: [
    { id: 'loadout', name: 'Loadout', icon: 'list-checks', tags: ['nostr', 'E2EE', 'offline-first', 'markdown'], framework: 'boards' },
    { id: 'outpost', name: 'Outpost', icon: 'sprout', tags: ['nostr', 'E2EE', 'photos', 'NIP-72'], framework: 'feed' },
    { id: 'tradingpost', name: 'Trading Post', icon: 'store', tags: ['nostr', 'E2EE', 'photos', 'account'], framework: 'market' },
    { id: 'payload', name: 'Payload', icon: 'send', tags: ['Blossom', 'E2EE', 'WebRTC'], framework: 'payload' },
    { id: 'pongjs', name: 'pongjs', icon: 'gamepad-2', tags: ['nostr', 'WebRTC', 'canvas'], framework: 'pong' },
    { id: 'devboard', name: 'DevBoard', icon: 'sticky-note', tags: ['nostr', 'proof of work', 'signed notes'], framework: 'notices' },
    { id: 'uplink', name: 'Uplink', icon: 'message-circle', tags: ['nostr', 'NIP-17', 'E2EE', 'ephemeral'], framework: 'chat' },
    { id: 'calendar', name: 'Calendar', icon: 'calendar-days', tags: ['CalDAV', 'Nextcloud', 'iCalendar'], framework: 'calendar' },
  ],
  mounts: [
    { id: 'loadout', app: 'loadout', featured: true, isNew: true },
    { id: 'outpost', app: 'outpost', space: 'outpost', isNew: true },
    // a hemp marketplace: for people with an account here (the reason is hub.tradingpost.account in locales/); no age check.
    // Sellers have shown up in Outpost first (three posts, each liked by three other people), or a moderator approves them.
    {
      id: 'tradingpost',
      app: 'tradingpost',
      space: 'tradingpost',
      requireAccount: true,
      sellers: { space: 'outpost', posts: 3, likes: 3 },
      isNew: true,
    },
    { id: 'payload', app: 'payload' },
    { id: 'pongjs', app: 'pongjs' },
    { id: 'devboard', app: 'devboard', space: 'devboard', isNew: true },
    { id: 'uplink', app: 'uplink' },
    // a person's own calendar on their Nextcloud (or any CalDAV server that allows Armory's origin); nothing of it on nostr
    { id: 'calendar', app: 'calendar', isNew: true },
  ],
};
