// pongjs is kiwi-framework's pong app; its browser suite lives in the framework
// (test/e2e/pong.mjs) and runs here against Armory's own site.
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { run } from 'kiwi-framework/test/e2e/env.mjs';
import { pongSuite } from 'kiwi-framework/test/e2e/pong.mjs';
import { assemble } from 'kiwi-framework/scripts/build-site.mjs';

const root = path.resolve(path.dirname(new URL(import.meta.url).pathname), '../..');
const { out: site } = await assemble({ distribution: root, out: fs.mkdtempSync(path.join(os.tmpdir(), 'armory-site-')), legacy: false });

await run('pong', (env) => pongSuite(env, { app: `${env.base}pongjs/` }), { webRoot: site });
