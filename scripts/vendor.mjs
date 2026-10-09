// Builds Loadout's own icon sprite from lucide-static. Run `npm install && npm
// run vendor` after bumping lucide-static or changing the list, then commit the
// result. Everything else third-party (nostr, marked, DOMPurify, the QR
// encoder, gun) comes from the framework's shared/.
import fs from 'node:fs';
import path from 'node:path';

const root = path.dirname(path.dirname(new URL(import.meta.url).pathname));
const nm = (p) => path.join(root, 'node_modules', p);

// Loadout's sprite: <svg><use href="icons.svg#name"/></svg>
const ICONS = [
  'plus', 'minus', 'check', 'x', 'share-2', 'ellipsis', 'trash-2', 'lock', 'globe', 'list-checks',
  'notebook-pen', 'package', 'user', 'settings', 'copy', 'qr-code', 'grip-vertical', 'chevron-left',
  'cloud', 'cloud-off', 'download', 'upload', 'key-round', 'eye', 'pencil', 'link', 'sun', 'moon',
  'log-out', 'shield', 'refresh-cw', 'external-link', 'pin', 'pin-off', 'search', 'file-text', 'languages',
  'layout-grid', 'send', 'gamepad-2', 'message-square-lock', 'sticky-note', 'radio-tower',
  'users', 'user-plus', 'user-check', 'users-round',
];
const symbols = ICONS.map((name) => {
  const svg = fs.readFileSync(nm(`lucide-static/icons/${name}.svg`), 'utf8');
  const body = svg.replace(/^[\s\S]*?<svg[^>]*>/, '').replace(/<\/svg>\s*$/, '').replace(/\s*\n\s*/g, '');
  return `<symbol id="${name}" viewBox="0 0 24 24">${body}</symbol>`;
});
fs.writeFileSync(
  path.join(root, 'apps/loadout/icons.svg'),
  `<svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">\n<!-- Lucide icons (ISC) -->\n${symbols.join('\n')}\n</svg>\n`,
);
console.log(`apps/loadout/icons.svg: ${ICONS.length} icons`);
