// The site as the build assembles it, once per test process: the hub from
// the framework, this distribution's config and apps, no Vite builds.
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { assemble } from 'kiwi-framework/scripts/build-site.mjs';

export const root = path.resolve(path.dirname(new URL(import.meta.url).pathname), '../..');
let built;
export async function site() {
  if (!built) {
    const out = fs.mkdtempSync(path.join(os.tmpdir(), 'armory-site-'));
    built = await assemble({ distribution: root, out, legacy: false });
    process.on('exit', () => fs.rmSync(out, { recursive: true, force: true }));
  }
  return built;
}
