// Vault is kiwi-framework's password manager; its browser suite lives in the framework (test/e2e/vault.mjs)
// and runs here against Armory's own site, with Armory's Authenticator opening the same vault.
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { assemble } from 'kiwi-framework/scripts/build-site.mjs';
import { run } from 'kiwi-framework/test/e2e/env.mjs';
import { vaultSuite } from 'kiwi-framework/test/e2e/vault.mjs';

const root = path.resolve(path.dirname(new URL(import.meta.url).pathname), '../..');
const { out: site } = await assemble({ distribution: root, out: fs.mkdtempSync(path.join(os.tmpdir(), 'armory-site-')), legacy: false });

await run('vault', (env) => vaultSuite(env, { app: `${env.base}vault/`, authenticator: `${env.base}authenticator/` }), { webRoot: site });
