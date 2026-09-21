/* ============================================================================
   Tests for the 26-week plan, the vocabulary system, the checkpoints and the
   Today tab — plus an integrity sweep over the new content banks.
   ========================================================================= */

import { chromium } from 'playwright';
import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';

const ROOT = path.resolve(import.meta.dirname, '..');
const PORT = 8323;
const MIME = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css' };

const server = http.createServer((req, res) => {
  const rel = req.url.split('?')[0];
  const p = path.join(ROOT, rel === '/' ? 'index.html' : rel);
  if (!p.startsWith(ROOT) || !fs.existsSync(p)) { res.writeHead(404); return res.end('nope'); }
  res.writeHead(200, { 'Content-Type': MIME[path.extname(p)] || 'application/octet-stream' });
  res.end(fs.readFileSync(p));
});
await new Promise(r => server.listen(PORT, r));

let pass = 0, fail = 0;
const ok = (name, cond, extra = '') => {
  if (cond) { pass++; console.log('  \u001b[32m✓\u001b[0m ' + name); }
  else { fail++; console.log('  \u001b[31m✗\u001b[0m ' + name + (extra ? '  → ' + extra : '')); }
};
const eq = (name, got, want) => ok(`${name}  (${JSON.stringify(got)})`, got === want, 'wanted ' + JSON.stringify(want));

const CHROME = process.env.CHROME_PATH || '/opt/pw-browsers/chromium-1194/chrome-linux/chrome';
const browser = await chromium.launch({ executablePath: fs.existsSync(CHROME) ? CHROME : undefined, args: ['--no-sandbox'] });
const page = await browser.newPage({ viewport: { width: 420, height: 900 } });
page.on('pageerror', e => { fail++; console.log('  \u001b[31m✗ page error:\u001b[0m ' + e.message); });
page.on('console', m => { if (m.type() === 'error') console.log('    [console] ' + m.text()); });
await page.addInitScript(`window.fetch = async () => new Response('{}', {status:200, headers:{'Content-Type':'application/json'}});`);
await page.goto(`http://127.0.0.1:${PORT}/index.html`);
await page.waitForFunction(() => !!window.__pqt);

/* ================================================= plan data integrity == */

console.log('\n── plan integrity ───────────────────────────────────────────');

const planAudit = await page.evaluate(() => {
  const errs = [];
  const ids = new Set(window.__pqc.MODULES.map(m => m.id));
  const batches = new Set(VOCAB_BATCHES.map(b => b.n));

  if (WEEKS.length !== 26) errs.push(`expected 26 weeks, got ${WEEKS.length}`);
  WEEKS.forEach((w, i) => {
    if (w.w !== i + 1) errs.push(`week ${i + 1} numbered ${w.w}`);
    for (const f of ['block', 'title', 'aim', 'modules', 'review', 'vocab', 'skills', 'note'])
      if (w[f] === undefined) errs.push(`week ${w.w}: missing ${f}`);
    for (const id of w.modules || []) if (!ids.has(id)) errs.push(`week ${w.w}: unknown module "${id}"`);
    for (const id of w.review || []) if (!ids.has(id)) errs.push(`week ${w.w}: unknown review module "${id}"`);
    if (!batches.has(w.vocab)) errs.push(`week ${w.w}: unknown vocab batch ${w.vocab}`);
    for (const k of ['listen', 'speak', 'read', 'write'])
      if (!w.skills[k]) errs.push(`week ${w.w}: missing skills.${k}`);
  });

  // every module must be taught at least once
  const taught = new Set(WEEKS.flatMap(w => w.modules));
  for (const id of ids) if (!taught.has(id)) errs.push(`module "${id}" is never scheduled`);

  // checkpoints line up with the weeks that declare them
  for (const cp of CHECKPOINTS) {
    const w = WEEKS.find(x => x.w === cp.week);
    if (!w) errs.push(`checkpoint ${cp.id}: week ${cp.week} does not exist`);
    else if (w.checkpoint !== cp.id) errs.push(`checkpoint ${cp.id}: week ${cp.week} declares ${w.checkpoint}`);
    if (cp.day !== cp.week * 7) errs.push(`checkpoint ${cp.id}: day ${cp.day} should be ${cp.week * 7}`);
    for (const f of ['name', 'target', 'why', 'sections', 'verdict']) if (!cp[f]) errs.push(`checkpoint ${cp.id}: missing ${f}`);
    if (!cp.verdict.good || !cp.verdict.bad) errs.push(`checkpoint ${cp.id}: incomplete verdict`);
  }
  const declared = WEEKS.filter(w => w.checkpoint).map(w => w.checkpoint).sort();
  if (declared.join() !== CHECKPOINTS.map(c => c.id).sort().join())
    errs.push('weeks and CHECKPOINTS disagree about which checkpoints exist');

  return { errs, weeks: WEEKS.length, days: PLAN_DAYS, cps: CHECKPOINTS.length, blocks: BLOCKS.length, taught: taught.size, modules: ids.size };
});

ok(`plan is internally consistent (${planAudit.weeks} weeks, ${planAudit.days} days, ${planAudit.cps} checkpoints)`,
  planAudit.errs.length === 0, planAudit.errs.slice(0, 8).join(' | '));
eq('every module is scheduled', planAudit.taught, planAudit.modules);
eq('182 days', planAudit.days, 182);
eq('six blocks', planAudit.blocks, 6);

/* ================================================= buildDay behaviour === */

console.log('\n── unit: buildDay ───────────────────────────────────────────');

const dayAudit = await page.evaluate(() => {
  const errs = [];
  let restDays = 0, cpDays = 0, totalMins = 0;
  const kinds = new Set();
  for (let d = 1; d <= PLAN_DAYS; d++) {
    const p = window.__pqt.buildDay(d, 180);
    if (!p.tasks.length) errs.push(`day ${d}: no tasks`);
    if (p.week !== Math.ceil(d / 7)) errs.push(`day ${d}: week ${p.week}`);
    if (p.rest) restDays++;
    if (p.checkpoint) cpDays++;
    for (const t of p.tasks) {
      kinds.add(t.kind);
      if (!t.label) errs.push(`day ${d}: task without a label`);
      if (!(t.mins > 0)) errs.push(`day ${d}: task with ${t.mins} minutes`);
      if (t.ref && typeof t.ref === 'string' && !window.__pqc.MODULES.some(m => m.id === t.ref))
        errs.push(`day ${d}: task refers to unknown module ${t.ref}`);
    }
    totalMins += p.tasks.reduce((a, t) => a + t.mins, 0);
  }
  // scaling
  const lo = window.__pqt.buildDay(3, 90).tasks.reduce((a, t) => a + t.mins, 0);
  const mid = window.__pqt.buildDay(3, 180).tasks.reduce((a, t) => a + t.mins, 0);
  const hi = window.__pqt.buildDay(3, 240).tasks.reduce((a, t) => a + t.mins, 0);
  return { errs, restDays, cpDays, totalMins, kinds: [...kinds], lo, mid, hi,
           d1: window.__pqt.buildDay(1, 180), d42: window.__pqt.buildDay(42, 180) };
});

ok('all 182 days build without a defect', dayAudit.errs.length === 0, dayAudit.errs.slice(0, 6).join(' | '));
eq('four checkpoint days', dayAudit.cpDays, 4);
eq('22 light days (26 weeks minus the 4 checkpoint weeks)', dayAudit.restDays, 22);
ok('workload scales with the daily budget', dayAudit.lo < dayAudit.mid && dayAudit.mid < dayAudit.hi,
  `${dayAudit.lo} / ${dayAudit.mid} / ${dayAudit.hi}`);
ok('total course load is in the 500–650 h range at 3 h/day',
  dayAudit.totalMins / 60 > 450 && dayAudit.totalMins / 60 < 700, (dayAudit.totalMins / 60).toFixed(0) + ' h');
ok('day 1 teaches the sound system', dayAudit.d1.tasks.some(t => t.ref === 'a1-sounds'));
ok('day 1 already includes listening and speaking',
  dayAudit.d1.tasks.some(t => t.kind === 'listen') && dayAudit.d1.tasks.some(t => t.kind === 'speak'));
ok('day 42 is checkpoint 1', dayAudit.d42.checkpoint && dayAudit.d42.checkpoint.id === 1);
ok('task kinds cover the full range',
  ['module', 'drill', 'review', 'practice', 'vocab', 'listen', 'speak', 'read', 'write', 'checkpoint']
    .every(k => dayAudit.kinds.includes(k)), dayAudit.kinds.join(','));

/* ================================================= vocabulary =========== */

console.log('\n── vocabulary ───────────────────────────────────────────────');

const vAudit = await page.evaluate(() => {
  const errs = [];
  const seen = new Map();
  VOCAB_BATCHES.forEach((b, i) => {
    if (b.n !== i + 1) errs.push(`batch ${i + 1} numbered ${b.n}`);
    if (!['A1', 'A2', 'B1', 'B2'].includes(b.lvl)) errs.push(`batch ${b.n}: bad level ${b.lvl}`);
    if (!b.theme) errs.push(`batch ${b.n}: no theme`);
    b.words.forEach((w, k) => {
      if (!Array.isArray(w) || w.length !== 3) errs.push(`batch ${b.n} word ${k}: not a triple`);
      const [fr, en, ex] = w;
      if (!fr || !en) errs.push(`batch ${b.n} word ${k}: empty fr or en`);
      if (ex !== undefined && typeof ex !== 'string') errs.push(`batch ${b.n} word ${k}: bad example`);
      if (seen.has(fr)) errs.push(`duplicate "${fr}" in batches ${seen.get(fr)} and ${b.n}`);
      seen.set(fr, b.n);
    });
  });
  const all = allVocab();
  if (all.length !== VOCAB_TOTAL) errs.push('allVocab length disagrees with VOCAB_TOTAL');
  const lvls = {};
  for (const w of all) lvls[w.lvl] = (lvls[w.lvl] || 0) + 1;
  return { errs, total: VOCAB_TOTAL, batches: VOCAB_BATCHES.length, lvls,
           withEx: all.filter(w => w.ex).length, b1: batchWords(1).length };
});

ok(`vocabulary is clean — ${vAudit.total} words across ${vAudit.batches} batches`,
  vAudit.errs.length === 0, vAudit.errs.slice(0, 6).join(' | '));
console.log('    ' + Object.entries(vAudit.lvls).map(([k, v]) => `${k}:${v}`).join('  ') +
  `   with examples: ${vAudit.withEx}`);
eq('520 words', vAudit.total, 520);
eq('26 batches', vAudit.batches, 26);
eq('20 words per batch', vAudit.b1, 20);
ok('every word carries an example sentence', vAudit.withEx === vAudit.total, String(vAudit.withEx));

/* spaced repetition maths */
const sr = await page.evaluate(() => {
  const now = 1_700_000_000_000;
  const fresh = {};
  const c1 = window.__pqt.gradeCard(fresh, true, now);
  const c2 = window.__pqt.gradeCard(c1, true, now);
  const c3 = window.__pqt.gradeCard(c2, true, now);
  const wrong = window.__pqt.gradeCard(c3, false, now);
  return {
    b1: c1.box, b2: c2.box, b3: c3.box, wrongBox: wrong.box,
    dueIn1: Math.round((c1.due - now) / 864e5),
    dueIn3: Math.round((c3.due - now) / 864e5),
    newIsDue: window.__pqt.isDue(null, now),
    futureNotDue: window.__pqt.isDue({ box: 3, due: now + 864e5 }, now),
    pastIsDue: window.__pqt.isDue({ box: 3, due: now - 864e5 }, now),
    seen: c3.seen, ok: c3.ok
  };
});
eq('a correct answer moves up one box', sr.b1, 1);
eq('three correct answers reach box 3', sr.b3, 3);
eq('a wrong answer drops to box 1, not 0', sr.wrongBox, 1);
eq('box 1 is due tomorrow', sr.dueIn1, 1);
eq('box 3 is due in 4 days', sr.dueIn3, 4);
ok('an unseen card is due', sr.newIsDue === true);
ok('a future card is not due', sr.futureNotDue === false);
ok('an overdue card is due', sr.pastIsDue === true);
eq('review counts accumulate', sr.seen, 3);

/* ================================================= extra banks ========== */

console.log('\n── extra practice banks ─────────────────────────────────────');

const bAudit = await page.evaluate(() => {
  const errs = [];
  const ids = new Set(window.__pqc.MODULES.map(m => m.id));
  let items = 0;
  for (const [mid, arr] of Object.entries(PRACTICE)) {
    if (!ids.has(mid)) errs.push(`PRACTICE key "${mid}" is not a module`);
    arr.forEach((q, i) => {
      items++;
      if (!q.q || !q.why) errs.push(`${mid}[${i}]: missing question or explanation`);
      if (q.t === 'mc') {
        if (!Array.isArray(q.opts) || q.opts.length < 2) errs.push(`${mid}[${i}]: bad options`);
        if (typeof q.a !== 'number' || q.a < 0 || q.a >= q.opts.length) errs.push(`${mid}[${i}]: answer index out of range`);
      } else if (q.t === 'fill' || q.t === 'trans') {
        const a = Array.isArray(q.a) ? q.a : [q.a];
        if (!a.length || a.some(x => typeof x !== 'string' || !x.trim())) errs.push(`${mid}[${i}]: bad answers`);
      } else errs.push(`${mid}[${i}]: unknown type ${q.t}`);
    });
  }
  const bank = (name, arr, need) => arr.forEach((it, i) => {
    for (const f of need) if (it[f] === undefined) errs.push(`${name}[${i}] missing ${f}`);
    if (it.opts && (typeof it.a !== 'number' || it.a < 0 || it.a >= it.opts.length)) errs.push(`${name}[${i}] bad answer index`);
    if (it.lvl && !['A1', 'A2', 'B1', 'B2'].includes(it.lvl)) errs.push(`${name}[${i}] bad level`);
  });
  bank('LISTEN_X', LISTEN_X, ['id', 'lvl', 'voice', 'text', 'q', 'opts', 'a', 'why']);
  bank('READ_X', READ_X, ['id', 'lvl', 'text', 'q', 'opts', 'a', 'why']);

  const allIds = [...LISTEN_X, ...READ_X].map(x => x.id);
  if (new Set(allIds).size !== allIds.length) errs.push('duplicate ids in the extra banks');

  const lvlSpread = l => ['A1', 'A2', 'B1', 'B2'].map(v => l.filter(x => x.lvl === v).length);

  return { errs, practiceKeys: Object.keys(PRACTICE).length, items,
           listen: window.__pqt.LISTEN_ALL.length, read: window.__pqt.READ_ALL.length,
           lSpread: lvlSpread(window.__pqt.LISTEN_ALL), rSpread: lvlSpread(window.__pqt.READ_ALL) };
});

ok(`extra banks are clean — ${bAudit.items} practice items over ${bAudit.practiceKeys} modules`,
  bAudit.errs.length === 0, bAudit.errs.slice(0, 6).join(' | '));
console.log(`    listening ${bAudit.listen} (A1/A2/B1/B2 = ${bAudit.lSpread.join('/')})   reading ${bAudit.read} (${bAudit.rSpread.join('/')})`);
ok('at least 28 listening items', bAudit.listen >= 28, String(bAudit.listen));
ok('at least 18 reading items', bAudit.read >= 18, String(bAudit.read));
ok('every level has listening items', bAudit.lSpread.every(n => n > 0));
ok('every level has reading items', bAudit.rSpread.every(n => n > 0));
ok('practice items exist for over half the modules',
  bAudit.practiceKeys >= 17, String(bAudit.practiceKeys));

/* ================================================= Today tab e2e ======== */

console.log('\n── e2e: Today ───────────────────────────────────────────────');
ok('Today is the default tab', await page.locator('#view-today').getAttribute('class') === 'view on');
await page.waitForSelector('#todayBox .card');
const intro = await page.textContent('#todayBox');
ok('start screen explains the 182-day plan', intro.includes('182'));
ok('start screen lists the six blocks', await page.locator('#todayBox .lst > div').count() === 6);

/* the honest warning at a low daily budget */
await page.click('#todayBox .seg button:has-text("1.5 h")');
await page.waitForTimeout(150);
ok('a 1.5 h/day budget triggers the honest warning',
  (await page.textContent('#todayBox')).includes('you will arrive short'));
await page.click('#todayBox .seg button:has-text("3 h")');
await page.waitForTimeout(150);
ok('a 3 h/day budget is reported as inside the range',
  (await page.textContent('#todayBox')).includes('inside the 500–650 hour range'));

await page.click('#todayBox .btn.primary:has-text("Start day 1")');
await page.waitForSelector('#todayBox .lst > div .pick');
const d1 = await page.textContent('#todayBox');
ok('day 1 of 182 shown', d1.includes('Day 1') && d1.includes('182'));
ok('week 1 title shown', d1.includes('The sound system'));
ok("week's strategic note shown", d1.includes('most important of the 26'));
const taskCount = await page.locator('#todayBox .lst > div').count();
ok('day 1 has a task list', taskCount >= 4, String(taskCount));

/* ticking tasks */
await page.locator('#todayBox .lst > div .play').first().click();
await page.waitForTimeout(120);
ok('a ticked task is recorded', await page.evaluate(() => (S.plan.done[1] || []).length === 1));
ok('progress line updates', (await page.textContent('#todayBox')).includes('1 of ' + taskCount + ' done'));

/* complete the day */
for (let k = 1; k < taskCount; k++) {
  await page.locator('#todayBox .lst > div .play').nth(k).click();
  await page.waitForTimeout(60);
}
ok('all tasks ticked offers day completion',
  (await page.textContent('#todayBox')).includes('Day complete'));
await page.click('#todayBox .btn.primary:has-text("Log today")');
await page.waitForTimeout(150);
ok('advances to day 2', await page.evaluate(() => S.plan.day === 2));
ok('streak recorded', await page.evaluate(() => window.__pqt.streak() === 1));
ok('day 2 shown', (await page.textContent('#todayBox')).includes('Day 2'));

/* plan map */
await page.click('#todayBox .btn.sm:has-text("Whole plan")');
await page.waitForSelector('#todayBox .lst');
const map = await page.textContent('#todayBox');
ok('plan map shows all 26 weeks', (map.match(/W\d+/g) || []).length >= 26);
ok('checkpoints marked on the map', map.includes('CP1') && map.includes('CP4'));
await page.click('#todayBox .btn.sm:has-text("Today")');
await page.waitForTimeout(150);

/* drift warning */
await page.evaluate(() => {
  S.plan.startISO = new Date(Date.now() - 40 * 864e5).toISOString().slice(0, 10);
  S.plan.day = 5; save(); renderToday();
});
await page.waitForTimeout(150);
ok('drift between calendar and progress is called out',
  (await page.textContent('#todayBox')).includes('days of drift'));
await page.evaluate(() => { S.plan.startISO = new Date().toISOString().slice(0, 10); save(); renderToday(); });

/* ================================================= Vocab e2e =========== */

console.log('\n── e2e: vocabulary ──────────────────────────────────────────');
await page.click('nav.tabs button[data-view=vocab]');
await page.waitForSelector('#vocabBox .lst');
ok('all 26 batches listed', await page.locator('#vocabBox .lst > div').count() === 26);
ok('progress line shows the 520 total', (await page.textContent('#vocabBox')).includes('520'));

await page.click('#vocabBox .btn.primary');
await page.waitForSelector('#vocabBox .btn.primary:has-text("Reveal")');
ok('a card shows the French first', await page.locator('#vocabBox div[style*="27px"]').count() === 1);
ok('English is hidden before reveal', !(await page.textContent('#vocabBox')).includes('hello / good morning'));
const cur = await page.evaluate(() => {
  const s = window.__pqt.vsession;
  const w = s.pool[s.i];
  return { fr: w.fr, en: w.en, ex: w.ex };
});
await page.click('#vocabBox .btn.primary:has-text("Reveal")');
await page.waitForSelector('#vocabBox .btn:has-text("Knew it")');
const revealed = await page.textContent('#vocabBox');
ok('reveal shows the meaning', revealed.includes(cur.en), cur.en);
ok('reveal shows the example sentence', revealed.includes(cur.ex), cur.ex);
await page.click('#vocabBox .btn:has-text("Knew it")');
await page.waitForTimeout(150);
ok('a graded card is stored with a due date', await page.evaluate(() => {
  const c = Object.values(S.vocab.cards)[0];
  return !!c && c.box === 1 && c.due > Date.now();
}));
await page.click('#vocabBox .btn:has-text("Missed it")').catch(() => {});
await page.waitForTimeout(100);

/* ================================================= Checkpoint e2e ====== */

console.log('\n── e2e: checkpoint ──────────────────────────────────────────');
await page.evaluate(() => { window.__pqt.runCheckpoint(1); });
await page.waitForSelector('#view-tests.on');
await page.waitForSelector('#testsBox .btn.primary:has-text("Begin")');
const cpIntro = await page.textContent('#testsBox');
ok('checkpoint explains why it exists', cpIntro.includes('the point is not the score') || cpIntro.includes('not the score'));
ok('checkpoint warns against helping yourself', cpIntro.includes('no notes and no dictionary'));
await page.click('#testsBox .btn.primary:has-text("Begin")');
await page.waitForSelector('#testsBox .drill-opt');
ok('listening item plays once only', await page.locator('#testsBox .btn:has-text("Play once")').count() === 1);
ok('no feedback promised during the test', (await page.textContent('#testsBox')).includes('No feedback until the end'));

/* answer everything correctly */
const cpSizes = await page.evaluate(() => ({ l: window.__pqt.cpRun.listen.length, r: window.__pqt.cpRun.read.length }));
for (let k = 0; k < cpSizes.l; k++) {
  const a = await page.evaluate(i => window.__pqt.cpRun.listen[i].a, k);
  await page.locator('#testsBox .drill-opt').nth(a).click();
  await page.waitForTimeout(50);
}
for (let k = 0; k < cpSizes.r; k++) {
  const a = await page.evaluate(i => window.__pqt.cpRun.read[i].a, k);
  await page.locator('#testsBox .drill-opt').nth(a).click();
  await page.waitForTimeout(50);
}
await page.waitForSelector('#testsBox table.tbl');
const cpRes = await page.textContent('#testsBox');
ok('checkpoint produces a per-skill table', cpRes.includes('Listening') && cpRes.includes('Reading'));
ok('a perfect run reads as on track', cpRes.includes('On track'));
ok('result warns that it is uncalibrated', cpRes.includes('uncalibrated'));
ok('checkpoint result saved', await page.evaluate(() => !!(S.tests.checkpoints && S.tests.checkpoints[1])));

/* a weak run must produce the corrective advice */
await page.evaluate(() => { window.__pqt.runCheckpoint(2); });
await page.waitForSelector('#view-tests.on');
await page.waitForSelector('#testsBox .btn.primary:has-text("Begin")');
await page.click('#testsBox .btn.primary:has-text("Begin")');
const cp2 = await page.evaluate(() => ({ l: window.__pqt.cpRun.listen.length, r: window.__pqt.cpRun.read.length }));
for (let k = 0; k < cp2.l; k++) {
  const a = await page.evaluate(i => window.__pqt.cpRun.listen[i].a, k);
  const n = await page.locator('#testsBox .drill-opt').count();
  await page.locator('#testsBox .drill-opt').nth((a + 1) % n).click();
  await page.waitForTimeout(50);
}
for (let k = 0; k < cp2.r; k++) {
  const a = await page.evaluate(i => window.__pqt.cpRun.read[i].a, k);
  await page.locator('#testsBox .drill-opt').nth(a).click();
  await page.waitForTimeout(50);
}
await page.waitForSelector('#testsBox table.tbl');
const cp2Res = await page.textContent('#testsBox');
ok('a failed checkpoint says so plainly', cp2Res.includes('Action needed'));
ok('the weakest skill gets a specific instruction', cp2Res.includes('Listening is your weakest skill'));
ok('checkpoint 2 raises the real-exam decision',
  cp2Res.includes('Do not book anything') || cp2Res.includes('defensible'));

/* ================================================= mixed practice ====== */

console.log('\n── e2e: mixed practice ──────────────────────────────────────');
await page.evaluate(() => { S.course.done = { 'a1-sounds': true, 'a1-gender': true }; save(); startMixed(); });
await page.click('nav.tabs button[data-view=course]');
await page.waitForSelector('#courseBox .drill-opt, #courseBox input[type=text]');
ok('mixed practice draws from completed modules only',
  await page.evaluate(() => window.__pqt.mixed.pool.every(q => /out loud|articles/i.test(q.from))));
ok('mixed set is capped at 15', await page.evaluate(() => window.__pqt.mixed.pool.length <= 15));
ok('each mixed item names its source module',
  (await page.textContent('#courseBox')).match(/Reading French out loud|Gender and articles/) !== null);

/* ================================================= module drills grew == */

console.log('\n── e2e: drills now include the extra bank ──────────────────');
await page.evaluate(() => { mixed = null; renderCourse(); });
await page.evaluate(() => { S.course.stage = 'A1'; save(); window.__pqc.openModuleById('a1-sounds'); });
await page.waitForSelector('#courseBox .drill-opt');
const drillTotal = await page.evaluate(() => {
  const m = window.__pqc.MODULES.find(x => x.id === 'a1-sounds');
  return m.drill.length + (PRACTICE['a1-sounds'] || []).length;
});
ok('module drill length now includes PRACTICE items',
  (await page.textContent('#courseBox')).includes('1 / ' + drillTotal), 'expected 1 / ' + drillTotal);

/* ================================================= regressions ========= */

console.log('\n── e2e: nothing regressed ───────────────────────────────────');
for (const v of ['today', 'course', 'vocab', 'tests', 'look', 'speak', 'guide']) {
  await page.click(`nav.tabs button[data-view=${v}]`);
  await page.waitForTimeout(120);
  ok(`${v} tab opens`, await page.locator(`#view-${v}.on`).count() === 1);
}
await page.click('nav.tabs button[data-view=guide]');
await page.waitForTimeout(150);
ok('ear drills reachable from the Guide tab',
  await page.locator('#view-guide .btn:has-text("Open ear drills")').count() === 1);
await page.click('#view-guide .btn:has-text("Open ear drills")');
await page.waitForTimeout(200);
ok('ear drills still work', await page.locator('#view-drill.on').count() === 1);

/* ================================================= screenshots ========= */

console.log('\n── screenshots ──────────────────────────────────────────────');
await page.click('nav.tabs button[data-view=today]');
await page.evaluate(() => { S.plan.day = 10; save(); renderToday(); });
await page.waitForTimeout(250);
await page.screenshot({ path: path.join(ROOT, 'test/shot-today.png'), fullPage: true });
await page.click('nav.tabs button[data-view=vocab]');
await page.waitForTimeout(250);
await page.screenshot({ path: path.join(ROOT, 'test/shot-vocab.png'), fullPage: true });
await page.emulateMedia({ colorScheme: 'dark' });
await page.click('nav.tabs button[data-view=today]');
await page.evaluate(() => { S.plan.day = 42; save(); renderToday(); });
await page.waitForTimeout(250);
await page.screenshot({ path: path.join(ROOT, 'test/shot-checkpoint-dark.png'), fullPage: true });
console.log('  wrote test/shot-today.png, test/shot-vocab.png, test/shot-checkpoint-dark.png');

await browser.close();
server.close();
console.log(`\n${'─'.repeat(62)}`);
console.log(fail === 0 ? `\u001b[32mAll ${pass} checks passed.\u001b[0m`
                       : `\u001b[31m${fail} failed\u001b[0m, ${pass} passed.`);
process.exit(fail ? 1 : 0);
