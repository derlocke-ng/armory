// DevBoard is kiwi-framework's notices app; its browser suite lives in the framework
// (test/e2e/notices.mjs) and runs here against Armory's own site.
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { run } from 'kiwi-framework/test/e2e/env.mjs';
import { noticesSuite } from 'kiwi-framework/test/e2e/notices.mjs';
import { assemble } from 'kiwi-framework/scripts/build-site.mjs';

const root = path.resolve(path.dirname(new URL(import.meta.url).pathname), '../..');
const { out: site } = await assemble({ distribution: root, out: fs.mkdtempSync(path.join(os.tmpdir(), 'armory-site-')), legacy: false });

await run('devboard', (env) => noticesSuite(env, { app: `${env.base}devboard/`, settings: `${env.base}settings.html`, name: 'DevBoard' }), { webRoot: site });
