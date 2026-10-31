// Uplink on Armory's site: the framework's chat suite at uplink/.
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { run } from 'kiwi-framework/test/e2e/env.mjs';
import { chatSuite } from 'kiwi-framework/test/e2e/chat.mjs';
import { assemble } from 'kiwi-framework/scripts/build-site.mjs';

const root = path.resolve(path.dirname(new URL(import.meta.url).pathname), '../..');
const { out: site } = await assemble({ distribution: root, out: fs.mkdtempSync(path.join(os.tmpdir(), 'armory-site-')), legacy: false });
await run('uplink', (env) => chatSuite(env, { app: `${env.base}uplink/`, settings: `${env.base}settings.html`, boards: `${env.base}loadout/` }), { webRoot: site });
