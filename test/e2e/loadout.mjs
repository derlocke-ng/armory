// Loadout is the framework's boards app; its browser suite lives in the
// framework (test/e2e/boards.mjs) and runs here against Armory's own site,
// with the hub at the root and the app mounted at loadout/.
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { run } from 'kiwi-framework/test/e2e/env.mjs';
import { boardsSuite } from 'kiwi-framework/test/e2e/boards.mjs';
import { assemble } from 'kiwi-framework/scripts/build-site.mjs';

const root = path.resolve(path.dirname(new URL(import.meta.url).pathname), '../..');
const { out: site } = await assemble({ distribution: root, out: fs.mkdtempSync(path.join(os.tmpdir(), 'armory-site-')), legacy: false });

await run('loadout', (env) => boardsSuite(env, { app: `${env.base}loadout/`, settings: `${env.base}settings.html`, name: 'Loadout' }), { webRoot: site });
