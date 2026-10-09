import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { LANGUAGES } from 'kiwi-framework/shared/i18n.js';
import { DISTRIBUTION } from '../../distribution.js';

const root = path.resolve(path.dirname(new URL(import.meta.url).pathname), '../..');
// This distribution's catalogs: the hub card texts in locales/ and each app's strings.
// The framework tests its own (shared/ and hub/).
const DIRS = ['locales', ...DISTRIBUTION.apps.map((a) => `apps/${a.id}/locales`).filter((d) => fs.existsSync(path.join(root, d)))];
const read = (dir, lang) => JSON.parse(fs.readFileSync(path.join(root, dir, `${lang}.json`), 'utf8'));
const placeholders = (s) => [...String(s).matchAll(/\{(\w+)\}/g)].map((m) => m[1]).sort().join(',');
const tags = (s) => [...String(s).matchAll(/<\/?[a-z]+/g)].map((m) => m[0]).sort().join(',');
const forms = (v) => (typeof v === 'object' ? Object.values(v) : [v]);

test('every language has every key of the English catalog, with the same placeholders and markup', () => {
  assert.ok(DIRS.length > 1, 'the apps have catalogs');
  for (const dir of DIRS) {
    const en = read(dir, 'en');
    for (const lang of Object.keys(LANGUAGES)) {
      const cat = read(dir, lang);
      assert.deepEqual(Object.keys(cat).filter((k) => !(k in en)), [], `${dir}/${lang}.json has keys English lacks`);
      assert.deepEqual(Object.keys(en).filter((k) => !(k in cat)), [], `${dir}/${lang}.json misses keys`);
      const categories = new Intl.PluralRules(lang).resolvedOptions().pluralCategories;
      for (const [key, value] of Object.entries(en)) {
        const other = cat[key];
        assert.equal(typeof other, typeof value, `${dir}/${lang}.json ${key}: plural object vs string`);
        if (typeof value === 'object') {
          assert.deepEqual(categories.filter((c) => !(c in other)), [], `${dir}/${lang}.json ${key} lacks plural forms`);
        }
        for (const form of forms(other)) {
          assert.equal(placeholders(form), placeholders(forms(value)[0]), `${dir}/${lang}.json ${key}: placeholders differ`);
          assert.equal(tags(form), tags(forms(value)[0]), `${dir}/${lang}.json ${key}: markup differs`);
          assert.ok(String(form).trim().length, `${dir}/${lang}.json ${key} is empty`);
        }
      }
    }
  }
});
