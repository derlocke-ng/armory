import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
import { root, site } from './_site.mjs';

const { out, config, shell } = await site();
const { APPS, MOUNTS, appById, mountById, mountsOf, appMark } = await import(pathToFileURL(path.join(out, 'shared/apps.js')).href);

test('the site assembles: hub, library, this distribution’s config, every app', () => {
  for (const f of ['index.html', 'settings.html', 'manifest.webmanifest', 'sw.js', 'icons.svg', 'shared/appshell.js', 'shared/distribution.js', 'locales/en.json', '.nojekyll']) {
    assert.ok(fs.existsSync(path.join(out, f)), `${f} is in the site`);
  }
  assert.equal(config.id, 'armory');
  assert.match(fs.readFileSync(path.join(out, 'index.html'), 'utf8'), /<title>Armory<\/title>/);
  assert.ok(fs.readFileSync(path.join(out, 'shared/distribution.js'), 'utf8').includes("id: 'armory'"), 'the site carries this distribution’s config');
  for (const app of APPS) if (!app.legacy) assert.ok(fs.existsSync(path.join(out, app.id, 'index.html')), `${app.id}/index.html is in the site`);
});

test('the registry is consistent: unique ids, folders, icons in the sprite, hub text in every language', () => {
  assert.equal(new Set(APPS.map((a) => a.id)).size, APPS.length, 'ids are unique');
  assert.equal(MOUNTS.filter((a) => a.featured).length, 1, 'one featured mount');
  assert.equal(new Set(MOUNTS.map((m) => m.id)).size, MOUNTS.length, 'mount ids are unique');
  for (const m of config.mounts) assert.ok(appById(m.app), `mount ${m.id} mounts a known app`);
  assert.match(config.name, /\S/);
  assert.ok(config.relays.every((r) => /^wss?:\/\//.test(r)), 'relays are websocket URLs');
  const sprite = fs.readFileSync(path.join(out, 'icons.svg'), 'utf8');
  for (const app of APPS) {
    assert.match(app.id, /^[a-z][a-z0-9-]*$/);
    assert.ok(fs.existsSync(path.join(root, 'apps', app.id)), `apps/${app.id} exists`);
    const manifest = fs.readFileSync(path.join(root, 'apps', app.id, 'kiwi.manifest'), 'utf8');
    assert.match(manifest, new RegExp(`^NAME=${app.id}$`, 'm'), `apps/${app.id}/kiwi.manifest names the app`);
    assert.match(manifest, /^CATEGORY=App$/m, `apps/${app.id}/kiwi.manifest is an App entry`);
    assert.ok(sprite.includes(`<symbol id="${app.icon}"`), `${app.id}: icon "${app.icon}" is in the sprite`);
  }
  for (const m of MOUNTS) {
    for (const file of fs.readdirSync(path.join(out, 'locales'))) {
      const cat = JSON.parse(fs.readFileSync(path.join(out, 'locales', file), 'utf8'));
      assert.ok(cat[`hub.${m.id}.text`], `${file} has hub.${m.id}.text`);
    }
  }
  assert.equal(appById('loadout').name, 'Loadout');
  assert.equal(mountById('devboard').app, 'devboard');
  assert.equal(mountsOf('loadout').length, 1);
  assert.match(appMark(appById('devboard'), '../icons.svg'), /wjs-app-mark.*\.\.\/icons\.svg#sticky-note/);
});

test('every app’s favicon is the registry icon (npm run icons)', async () => {
  process.chdir(root); // the framework's icon script works on the distribution in the current directory
  const { iconSvg, iconFile, appsWithIcons } = await import('kiwi-framework/scripts/app-icons.mjs');
  for (const app of appsWithIcons()) {
    assert.equal(fs.readFileSync(iconFile(app), 'utf8'), iconSvg(app), `apps/${app.id}/icon.svg is current — run \`npm run icons\``);
  }
});

test('the site service worker precaches the hub, shared/ and every app without a worker of its own', () => {
  const sw = fs.readFileSync(path.join(out, 'sw.js'), 'utf8');
  assert.match(sw, /const VERSION = 'armory-[0-9a-f]{10}'/, 'the version is the distribution id and a hash of the shell');
  const listed = JSON.parse(sw.match(/const SHELL = (\[[\s\S]*?\]);/)[1].replace(/'/g, '"'));
  assert.deepEqual(listed, shell);
  assert.deepEqual(shell.filter((f) => !f.endsWith('/') && !fs.existsSync(path.join(out, f))), [], 'SHELL lists files that do not exist');
  for (const f of ['./', 'index.html', 'settings.html', 'shared/appshell.js', 'shared/ui.css', 'locales/en.json', 'devboard/', 'devboard/devboard.js', 'payload/', 'pongjs/']) assert.ok(shell.includes(f), `${f} is precached`);
  assert.ok(!shell.some((f) => f.startsWith('loadout/')), 'Loadout has its own worker and is not precached by the site');
  assert.ok(!shell.some((f) => f.startsWith('enigmajs/')), 'legacy apps are not precached');
});
