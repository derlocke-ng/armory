// Outpost is kiwi-framework's feed app; its browser suite lives in the framework (test/e2e/feed.mjs) and
// runs here against Armory's own site, on Armory's outpost space (its address from the built hub.json).
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { run } from 'kiwi-framework/test/e2e/env.mjs';
import { feedSuite } from 'kiwi-framework/test/e2e/feed.mjs';
import { assemble } from 'kiwi-framework/scripts/build-site.mjs';

const root = path.resolve(path.dirname(new URL(import.meta.url).pathname), '../..');
const { out: site } = await assemble({ distribution: root, out: fs.mkdtempSync(path.join(os.tmpdir(), 'armory-site-')), legacy: false });
const space = JSON.parse(fs.readFileSync(path.join(site, 'hub.json'), 'utf8')).spaces.find((s) => s.id === 'outpost').address;

await run('outpost', (env) => feedSuite(env, { app: `${env.base}outpost/`, settings: `${env.base}settings.html`, space }), { webRoot: site });
