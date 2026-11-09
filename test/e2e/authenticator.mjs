// Authenticator is kiwi-framework's authenticator app; its browser suite lives in the framework
// (test/e2e/authenticator.mjs) and runs here against Armory's own site.
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { assemble } from 'kiwi-framework/scripts/build-site.mjs';
import { authenticatorSuite } from 'kiwi-framework/test/e2e/authenticator.mjs';
import { run } from 'kiwi-framework/test/e2e/env.mjs';

const root = path.resolve(path.dirname(new URL(import.meta.url).pathname), '../..');
const { out: site } = await assemble({ distribution: root, out: fs.mkdtempSync(path.join(os.tmpdir(), 'armory-site-')), legacy: false });

await run('authenticator', (env) => authenticatorSuite(env, { app: `${env.base}authenticator/` }), { webRoot: site });
