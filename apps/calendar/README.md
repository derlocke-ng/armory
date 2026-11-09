# Calendar

**Live:** <https://derlocke-ng.github.io/armory/calendar/>

Calendar is kiwi-framework's **calendar** app, mounted here (`framework: 'calendar'` in [`distribution.js`](../../distribution.js)): your calendars from your own Nextcloud, or any CalDAV server, on the phone as the coming days or a month; events made, changed and deleted, repeating ones, reminders while a page is open. Nothing of the calendar goes to relays; the login (server, username, an app password) is kept in your account's settings, sealed to your key, so every device you sign in on has it.

Armory is a static site on GitHub Pages, so it reaches your server directly: the server must allow Armory's origin (`https://derlocke-ng.github.io`, CORS). kiwi's Nextcloud does it with the `cloud` module's `cors_origins` (kiwi-framework `handoffs/kiwi-modules-hub-calendar.md`); a hub run as a container forwards to its own Nextcloud instead (`HUB_CALDAV`). Its code, browser suite and documentation live in the framework: [`apps/calendar`](https://github.com/derlocke-ng/kiwi-framework/tree/main/apps/calendar). This folder holds only what Armory lays over it (the favicon) and its catalog entry (`kiwi.manifest`).

`node test/e2e/calendar.mjs` runs the framework's suite against Armory's own site, with a local CalDAV server laid out like Nextcloud.
