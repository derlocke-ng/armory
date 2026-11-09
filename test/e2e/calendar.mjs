// Calendar is kiwi-framework's calendar app; its browser suite lives in the framework (test/e2e/calendar.mjs) and
// runs here against Armory's own site, with a local CalDAV server laid out like Nextcloud on another origin,
// answering CORS as a server that allows Armory must.
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { startCalDav } from 'kiwi-framework/scripts/caldav-server.mjs';
import { assemble } from 'kiwi-framework/scripts/build-site.mjs';
import { calendarSuite } from 'kiwi-framework/test/e2e/calendar.mjs';
import { run } from 'kiwi-framework/test/e2e/env.mjs';

const root = path.resolve(path.dirname(new URL(import.meta.url).pathname), '../..');
const { out: site } = await assemble({ distribution: root, out: fs.mkdtempSync(path.join(os.tmpdir(), 'armory-site-')), legacy: false });
const dav = await startCalDav({ users: { alice: 'app-password' }, calendars: [{ id: 'personal', name: 'Personal', color: '#0082c9' }] });

await run('calendar', (env) => calendarSuite(env, { app: `${env.base}calendar/`, dav }), { webRoot: site }).finally(() => dav.close());
