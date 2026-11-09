// Trading Post is kiwi-framework's market app; its browser suite lives in the framework (test/e2e/market.mjs)
// and runs here against Armory's own site, on Armory's tradingpost space, with Uplink as the chat.
// Sellers need Outpost posts or a moderator's approval; Armory's moderator is the owner's own key, so the
// test site names a moderator of its own where a host would, in hub.local.json.
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { run } from 'kiwi-framework/test/e2e/env.mjs';
import { marketSuite } from 'kiwi-framework/test/e2e/market.mjs';
import { assemble } from 'kiwi-framework/scripts/build-site.mjs';
import { bytesToHex, generateSecretKey, getPublicKey, hexToBytes } from 'kiwi-framework/shared/nostr.mjs';

const root = path.resolve(path.dirname(new URL(import.meta.url).pathname), '../..');
const { out: site } = await assemble({ distribution: root, out: fs.mkdtempSync(path.join(os.tmpdir(), 'armory-site-')), legacy: false });
const space = JSON.parse(fs.readFileSync(path.join(site, 'hub.json'), 'utf8')).spaces.find((s) => s.id === 'tradingpost').address;
const sk = bytesToHex(generateSecretKey());
const moderator = { sk, pk: getPublicKey(hexToBytes(sk)) };
fs.writeFileSync(path.join(site, 'hub.local.json'), JSON.stringify({ moderators: [moderator.pk] }));

await run(
  'tradingpost',
  (env) => marketSuite(env, { app: `${env.base}tradingpost/`, chat: `${env.base}uplink/`, settings: `${env.base}settings.html`, space, moderator }),
  { webRoot: site },
);
