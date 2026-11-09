# Authenticator

**Live:** <https://derlocke-ng.github.io/armory/authenticator/>

Authenticator is kiwi-framework's **authenticator** app, mounted here (`framework: 'authenticator'` in [`distribution.js`](../../distribution.js)): two-factor codes (TOTP) for your accounts elsewhere, on every device you sign in on. Add an account with the QR code a service shows (the camera, or a screenshot of it), its `otpauth://` link or its secret, or bring all of them from a Google Authenticator export; a tap copies a code.

The secrets are kept in your account's settings, sealed a second time with a passphrase of their own: the relays, the hub, and someone who learns your account's password see nothing of them. The passphrase cannot be recovered, so the settings save a backup (still sealed with it) or export plain links for another app. The codes lock again when you press the lock, after the page has been away for a while, and when you leave. Its code, browser suite and documentation live in the framework: [`apps/authenticator`](https://github.com/derlocke-ng/kiwi-framework/tree/main/apps/authenticator). This folder holds only what Armory lays over it (the favicon) and its catalog entry (`kiwi.manifest`).

`node test/e2e/authenticator.mjs` runs the framework's suite against Armory's own site.
