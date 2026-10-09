import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { root, site } from './_site.mjs';

function walk(dir, filter) {
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((e) => {
    const abs = path.join(dir, e.name);
    return e.isDirectory() ? walk(abs, filter) : filter(abs) ? [abs] : [];
  });
}

const shellOf = (file) => {
  const sw = fs.readFileSync(file, 'utf8');
  return JSON.parse(sw.match(/const SHELL = (\[[\s\S]*?\]);/)[1].replace(/'/g, '"').replace(/,\s*\]/, ']'));
};
const code = (f) => /\.(m?js|css|html|svg|webmanifest)$/.test(f);

test('Loadout’s service worker caches every script, style and vendor file, and the shared files it lists exist', async () => {
  const { out } = await site();
  const app = path.join(root, 'apps/loadout');
  const shell = shellOf(path.join(app, 'sw.js'));
  const shared = ['nostr.mjs', 'util.js', 'events.js', 'store.js', 'relays.js', 'account.js', 'sync.js', 'i18n.js', 'theme.js', 'settings.js', 'switcher.js', 'switcher.css', 'topbar.js', 'topbar.css', 'moderation.js', 'ui.css', 'ui.js', 'appshell.js', 'status.js', 'widgets.css', 'items.js', 'mdtasks.js', 'markdown.js', 'marked.esm.js', 'purify.es.mjs', 'qrcode.mjs'].map((f) => `../shared/${f}`);
  const needed = [...walk(path.join(app, 'js'), code), ...walk(path.join(app, 'css'), code), ...walk(path.join(app, 'vendor'), (f) => /\.m?js$/.test(f))].map((f) => path.relative(app, f)).concat(shared);
  assert.deepEqual(needed.filter((f) => !shell.includes(f)), [], 'add these to SHELL in apps/loadout/sw.js');
  // in the site, loadout/ sits next to shared/, so ../shared/x resolves against the framework's library
  assert.deepEqual(shell.filter((f) => f !== './' && !fs.existsSync(path.join(out, 'loadout', f))), [], 'SHELL lists files that do not exist');
});
