/* ============================================================================
   Tests for the Course and Tests tabs, plus a data-integrity sweep over all
   the curriculum content (the part most likely to contain a silent typo).
   ========================================================================= */

import { chromium } from 'playwright';
import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';

const ROOT = path.resolve(import.meta.dirname, '..');
const PORT = 8322;
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
const browser = await chromium.launch({
  executablePath: fs.existsSync(CHROME) ? CHROME : undefined,
  args: ['--no-sandbox']
});
const page = await browser.newPage({ viewport: { width: 420, height: 900 } });
page.on('pageerror', e => { fail++; console.log('  \u001b[31m✗ page error:\u001b[0m ' + e.message); });
page.on('console', m => { if (m.type() === 'error') console.log('    [console] ' + m.text()); });
// Nothing here needs the network; stub it so a slow lookup cannot hang a test.
await page.addInitScript(`window.fetch = async () => new Response('{}', {status:200, headers:{'Content-Type':'application/json'}});`);
await page.goto(`http://127.0.0.1:${PORT}/index.html`);
await page.waitForFunction(() => !!window.__pqc);

/* ------------------------------------------------- data integrity ------ */

console.log('\n── content integrity ────────────────────────────────────────');

const audit = await page.evaluate(() => {
  const errs = [];
  const ids = new Set();
  const M = window.__pqc.MODULES;

  for (const m of M) {
    const at = `module ${m.id || '(no id)'}`;
    if (!m.id) errs.push('module without id');
    if (ids.has(m.id)) errs.push(`duplicate id ${m.id}`);
    ids.add(m.id);
    for (const f of ['stage', 'title', 'goal', 'mins', 'blocks', 'ex', 'drill'])
      if (m[f] === undefined) errs.push(`${at}: missing ${f}`);
    if (!['A1', 'A2', 'B1', 'B2', 'EXAM'].includes(m.stage)) errs.push(`${at}: bad stage ${m.stage}`);
    if (!(m.blocks || []).length) errs.push(`${at}: no teaching blocks`);
    if (!(m.drill || []).length) errs.push(`${at}: no drill`);

    for (const b of m.blocks || []) {
      if (!b.h || !b.p) errs.push(`${at}: block missing h or p`);
      // only <b> and <i> are allowed in block text
      const tags = [...String(b.p).matchAll(/<\/?([a-z]+)[^>]*>/gi)].map(x => x[1].toLowerCase());
      for (const t of tags) if (!['b', 'i'].includes(t)) errs.push(`${at}: disallowed tag <${t}>`);
    }
    if (m.table) {
      const w = m.table.head.length;
      m.table.rows.forEach((r, i) => { if (r.length !== w) errs.push(`${at}: table row ${i} has ${r.length} cells, head has ${w}`); });
    }
    for (const e of m.ex || []) if (!e.fr || !e.en) errs.push(`${at}: example missing fr or en`);

    (m.drill || []).forEach((q, i) => {
      const qat = `${at} drill[${i}]`;
      if (!q.q) errs.push(`${qat}: no question`);
      if (!q.why) errs.push(`${qat}: no explanation`);
      if (q.t === 'mc') {
        if (!Array.isArray(q.opts) || q.opts.length < 2) errs.push(`${qat}: mc needs 2+ options`);
        if (typeof q.a !== 'number' || q.a < 0 || q.a >= (q.opts || []).length) errs.push(`${qat}: answer index ${q.a} out of range`);
      } else if (q.t === 'fill' || q.t === 'trans') {
        const a = Array.isArray(q.a) ? q.a : [q.a];
        if (!a.length || a.some(x => typeof x !== 'string' || !x.trim())) errs.push(`${qat}: bad accepted answers`);
      } else errs.push(`${qat}: unknown type ${q.t}`);
    });
  }

  // exam banks
  const bankErr = (name, arr, need) => {
    arr.forEach((it, i) => {
      for (const f of need) if (it[f] === undefined) errs.push(`${name}[${i}] missing ${f}`);
      if (it.opts && (typeof it.a !== 'number' || it.a < 0 || it.a >= it.opts.length))
        errs.push(`${name}[${i}] answer index out of range`);
    });
  };
  bankErr('LISTEN_BANK', LISTEN_BANK, ['id', 'lvl', 'voice', 'text', 'q', 'opts', 'a', 'why']);
  bankErr('READ_BANK', READ_BANK, ['id', 'lvl', 'text', 'q', 'opts', 'a', 'why']);
  bankErr('PLACEMENT', PLACEMENT, ['lvl', 'q', 'opts', 'a']);
  for (const t of [...WRITE_TEMPLATES, ...SPEAK_TEMPLATES]) {
    for (const f of ['id', 'exam', 'title', 'brief', 'specs', 'structure', 'phrases', 'trap'])
      if (t[f] === undefined) errs.push(`template ${t.id}: missing ${f}`);
    for (const s of t.structure || []) if (!s.step || !s.how || !s.model) errs.push(`template ${t.id}: bad structure step`);
  }
  for (const p of WRITE_PROMPTS) for (const f of ['id', 'exam', 'section', 'min', 'mins', 'prompt', 'check'])
    if (p[f] === undefined) errs.push(`write prompt ${p.id}: missing ${f}`);

  return {
    errs,
    modules: M.length,
    stages: ['A1', 'A2', 'B1', 'B2', 'EXAM'].map(s => [s, M.filter(m => m.stage === s).length]),
    drills: M.reduce((a, m) => a + m.drill.length, 0),
    listen: LISTEN_BANK.length, read: READ_BANK.length, place: PLACEMENT.length,
    tmpl: WRITE_TEMPLATES.length + SPEAK_TEMPLATES.length
  };
});

ok(`no content errors across ${audit.modules} modules / ${audit.drills} drill items`,
  audit.errs.length === 0, audit.errs.slice(0, 8).join(' | '));
console.log('    stages: ' + audit.stages.map(([s, n]) => `${s}:${n}`).join('  ') +
  `   listen:${audit.listen} read:${audit.read} placement:${audit.place} templates:${audit.tmpl}`);
ok('every stage has modules', audit.stages.every(([, n]) => n > 0));
ok('at least 25 modules', audit.modules >= 25, String(audit.modules));

/* -------------------------------------------------- answer judging ----- */

console.log('\n── unit: answer checking ────────────────────────────────────');
const j = await page.evaluate(() => ({
  exact:   window.__pqc.judge('au', 'au'),
  spaced:  window.__pqc.judge('  AU  ', 'au'),
  punct:   window.__pqc.judge('je suis étudiant.', 'je suis étudiant'),
  curly:   window.__pqc.judge("de l’", ["de l'"]),
  accent:  window.__pqc.judge('etes', 'êtes'),
  list:    window.__pqc.judge('on est', ['il est', 'on est']),
  wrong:   window.__pqc.judge('de', 'au'),
  empty:   window.__pqc.judge('   ', 'au'),
  n7:      window.__pqc.nclcFromPct(65),
  n9:      window.__pqc.nclcFromPct(82),
  n3:      window.__pqc.nclcFromPct(10)
}));
eq('exact match', j.exact, 'exact');
eq('case and whitespace forgiven', j.spaced, 'exact');
eq('trailing punctuation forgiven', j.punct, 'exact');
eq('curly apostrophe forgiven', j.curly, 'exact');
eq('missing accent flagged but accepted', j.accent, 'accents');
eq('any accepted variant matches', j.list, 'exact');
eq('wrong answer rejected', j.wrong, 'no');
eq('empty answer rejected', j.empty, 'no');
eq('65% → NCLC 7', j.n7, 7);
eq('82% → NCLC 9', j.n9, 9);
eq('10% → NCLC 3', j.n3, 3);

/* ------------------------------------------------------- course tab ---- */

console.log('\n── e2e: course ──────────────────────────────────────────────');
await page.click('nav.tabs button[data-view=course]');
await page.waitForTimeout(150);
ok('course tab opens', await page.locator('#view-course').getAttribute('class') === 'view on');
await page.waitForSelector('#courseBox .lst > div');
ok('five stage chips', await page.locator('#courseBox .chips .chip').count() === 5);
const a1count = await page.locator('#courseBox .lst > div').count();
ok('A1 modules listed', a1count >= 10, String(a1count));

await page.locator('#courseBox .lst > div button.grow').first().click();
await page.waitForSelector('#courseBox .drill-opt, #courseBox input[type=text]');
const modTxt = await page.textContent('#courseBox');
ok('module opens with teaching content', modTxt.includes('Final consonants are usually silent'));
ok('examples rendered', modTxt.includes('Vous êtes étudiant'));
ok('back button present', await page.locator('#courseBox .btn:has-text("All modules")').count() === 1);

/* answer the whole first drill correctly and check completion */
console.log('\n── e2e: drill engine ────────────────────────────────────────');
// a module's drill now includes its PRACTICE items, so answer all of them
const first = await page.evaluate(() => {
  const m = window.__pqc.MODULES[0];
  const extra = (typeof PRACTICE !== 'undefined' && PRACTICE[m.id]) || [];
  return m.drill.concat(extra).map(q => ({ t: q.t, a: q.a }));
});
for (let k = 0; k < first.length; k++) {
  const q = first[k];
  if (q.t === 'mc') {
    await page.locator('#courseBox .drill-opt').nth(q.a).click();
  } else {
    const want = Array.isArray(q.a) ? q.a[0] : q.a;
    await page.fill('#courseBox input[type=text]', want);
    await page.click('#courseBox .btn:has-text("Check")');
  }
  await page.waitForSelector('#courseBox .note');
  await page.click('#courseBox .btn.primary.sm:has-text("Next"), #courseBox .btn.primary.sm:has-text("See score")');
  await page.waitForTimeout(90);
}
const scoreTxt = await page.textContent('#courseBox');
ok('drill reports a perfect score', scoreTxt.includes(`${first.length} / ${first.length}`), scoreTxt.slice(0, 140));
ok('module marked complete at 100%', await page.evaluate(() => !!S.course.done[window.__pqc.MODULES[0].id]));

await page.click('#courseBox .btn:has-text("Back to modules")');
await page.waitForSelector('#courseBox .chips');
ok('completion tick shows in the list', (await page.textContent('#courseBox .lst > div')).includes('✓'));

/* a deliberately wrong answer must not mark complete */
await page.evaluate(() => { S.course.done = {}; S.course.drill = {}; save(); });
await page.reload();
await page.waitForFunction(() => !!window.__pqc);
await page.click('nav.tabs button[data-view=course]');
await page.waitForSelector('#courseBox .lst > div');
await page.locator('#courseBox .lst > div button.grow').first().click();
await page.waitForSelector('#courseBox .drill-opt');
for (let k = 0; k < first.length; k++) {
  const q = first[k];
  if (q.t === 'mc') {
    const n = await page.locator('#courseBox .drill-opt').count();
    await page.locator('#courseBox .drill-opt').nth((q.a + 1) % n).click();
  } else {
    await page.fill('#courseBox input[type=text]', 'zzz');
    await page.click('#courseBox .btn:has-text("Check")');
  }
  await page.waitForSelector('#courseBox .note');
  await page.click('#courseBox .btn.primary.sm:has-text("Next"), #courseBox .btn.primary.sm:has-text("See score")');
  await page.waitForTimeout(90);
}
ok('failing the drill does NOT mark the module complete',
  await page.evaluate(() => !S.course.done[window.__pqc.MODULES[0].id]));

/* persistence */
await page.evaluate(() => { S.course.done['a1-sounds'] = true; S.course.stage = 'B1'; save(); });
await page.reload();
await page.waitForFunction(() => !!window.__pqc);
await page.click('nav.tabs button[data-view=course]');
await page.waitForTimeout(200);
ok('progress and stage survive a reload',
  await page.evaluate(() => S.course.done['a1-sounds'] === true && S.course.stage === 'B1'));
ok('B1 stage shown after reload', (await page.textContent('#courseBox')).includes('B1 · Structure'));

/* ------------------------------------------------------- tests tab ----- */

console.log('\n── e2e: tests tab ───────────────────────────────────────────');
await page.click('nav.tabs button[data-view=tests]');
await page.waitForSelector('#testsBox .lst');
const menu = await page.textContent('#testsBox');
for (const label of ['Listening practice', 'Reading practice', 'Writing practice', 'Speaking practice', 'Templates', 'Study plan']) {
  ok(`"${label}" listed`, menu.includes(label));
}

/* placement */
await page.click('#testsBox .btn.primary');
await page.waitForSelector('#testsBox .drill-opt');
const placeN = await page.evaluate(() => PLACEMENT.length);
for (let k = 0; k < placeN; k++) {
  const a = await page.evaluate(i => PLACEMENT[i].a, k);
  await page.locator('#testsBox .drill-opt').nth(a).click();
  await page.waitForTimeout(60);
}
const pTxt = await page.textContent('#testsBox');
ok('placement completes and scores', pTxt.includes(`${placeN} / ${placeN}`), pTxt.slice(0, 120));
ok('placement suggests a stage', /Start the course at stage/.test(pTxt));
ok('all-correct placement suggests B2 level', /stage B2/.test(pTxt), pTxt.slice(0, 260));
ok('placement saved', await page.evaluate(() => !!S.tests.placement));

/* listening */
await page.click('#testsBox .btn:has-text("All practice")');
await page.waitForSelector('#testsBox .lst');
await page.click('#testsBox .lst > div:has-text("Listening practice") button');
await page.waitForSelector('#testsBox .drill-opt');
ok('listening item shows question but NOT the transcript',
  await page.evaluate(() => {
    const B = window.__pqt ? window.__pqt.LISTEN_ALL : LISTEN_BANK;
    const t = document.querySelector('#testsBox').textContent;
    return t.includes(B[0].q) && !t.includes(B[0].text.slice(0, 40));
  }));
ok('play buttons present', await page.locator('#testsBox .btn:has-text("Play")').count() === 1);
const l0 = await page.evaluate(() => (window.__pqt ? window.__pqt.LISTEN_ALL : LISTEN_BANK)[0].a);
await page.locator('#testsBox .drill-opt').nth(l0).click();
await page.waitForSelector('#testsBox details');
ok('transcript revealed only after answering', await page.locator('#testsBox details').count() === 1);
ok('explanation shown', (await page.textContent('#testsBox .note')).length > 10);

/* answer the rest, then check scoring + logging */
const lN = await page.evaluate(() => (window.__pqt ? window.__pqt.LISTEN_ALL : LISTEN_BANK).length);
await page.click('#testsBox .btn.primary.sm:has-text("Next")');
for (let k = 1; k < lN; k++) {
  await page.waitForSelector('#testsBox .drill-opt');
  const a = await page.evaluate(i => (window.__pqt ? window.__pqt.LISTEN_ALL : LISTEN_BANK)[i].a, k);
  await page.locator('#testsBox .drill-opt').nth(a).click();
  await page.waitForTimeout(60);
  if (k < lN - 1) await page.click('#testsBox .btn.primary.sm:has-text("Next")');
  else await page.click('#testsBox .btn.primary.sm:has-text("Next")');
  await page.waitForTimeout(60);
}
const lTxt = await page.textContent('#testsBox');
ok('listening set scores out of the full bank', lTxt.includes(`${lN} / ${lN}`), lTxt.slice(0, 140));
ok('perfect listening maps to NCLC 10', /NCLC 10/.test(lTxt), lTxt.slice(0, 200));
ok('result logged', await page.evaluate(() => S.tests.results.some(r => r.what === 'Listening practice')));

/* reading */
await page.click('#testsBox .btn:has-text("All practice")');
await page.click('#testsBox .lst > div:has-text("Reading practice") button');
await page.waitForSelector('#testsBox .drill-opt');
ok('reading passage is visible', (await page.textContent('#testsBox')).includes('AVIS AUX RÉSIDENTS'));

/* writing */
await page.click('#testsBox .btn:has-text("All practice")');
await page.click('#testsBox .lst > div:has-text("Writing practice") button');
await page.waitForSelector('#testsBox textarea');
ok('writing prompt chips for both exams',
  await page.locator('#testsBox .chips').first().locator('.chip').count() === 5);
await page.fill('#testsBox textarea', 'un deux trois quatre cinq');
await page.waitForTimeout(120);
ok('live word count', (await page.textContent('#testsBox')).includes('5 words'));
ok('checklist rendered', await page.locator('#testsBox .lst > div').count() >= 4);
ok('draft is saved', await page.evaluate(() => Object.values(S.tests.drafts).some(v => v.includes('quatre'))));
await page.reload();
await page.waitForFunction(() => !!window.__pqc);
ok('draft survives a reload', await page.evaluate(() => Object.values(S.tests.drafts).some(v => v.includes('quatre'))));

/* templates */
await page.click('nav.tabs button[data-view=tests]');
await page.waitForSelector('#testsBox .lst');
await page.click('#testsBox .lst > div:has-text("Templates") button');
await page.waitForSelector('#testsBox .card');
const tTxt = await page.textContent('#testsBox');
ok('template skeleton steps shown', /1\.\s/.test(tTxt));
ok('memorisable phrases shown', tTxt.includes('Ce matin-là'));
ok('the trap is called out', tTxt.includes('The trap:'));
const tmplCount = await page.evaluate(() => WRITE_TEMPLATES.length + SPEAK_TEMPLATES.length);
ok('one chip per template',
  await page.locator('#testsBox .chips').first().locator('.chip').count() === tmplCount,
  'counted ' + await page.locator('#testsBox .chips').first().locator('.chip').count() + ' of ' + tmplCount);

/* study plan */
await page.click('#testsBox .btn:has-text("All practice")');
await page.click('#testsBox .lst > div:has-text("Study plan") button');
await page.waitForSelector('#testsBox .card');
const planTxt = await page.textContent('#testsBox');
ok('plan states the hour count honestly', planTxt.includes('650'));
ok('plan gives per-window daily maths', planTxt.includes('6 months'));
ok('all five phases rendered', await page.locator('#testsBox .card.flat').count() === 5);
ok('plan warns about booking too early', /book the test later/i.test(planTxt));

/* speaking */
await page.click('#testsBox .btn:has-text("All practice")');
await page.click('#testsBox .lst > div:has-text("Speaking practice") button');
await page.waitForSelector('#testsBox .card');
ok('speaking prompts rendered', (await page.textContent('#testsBox')).includes('Cours de français intensif'));

/* the older tabs must still work */
console.log('\n── e2e: nothing regressed ───────────────────────────────────');
for (const v of ['look', 'speak', 'guide']) {
  await page.click(`nav.tabs button[data-view=${v}]`);
  await page.waitForTimeout(120);
  ok(`${v} tab still opens`, await page.locator(`#view-${v}.on`).count() === 1);
}
for (const v of ['deck', 'drill']) {
  await page.evaluate(x => go(x), v);
  await page.waitForTimeout(120);
  ok(`${v} view still reachable`, await page.locator(`#view-${v}.on`).count() === 1);
}

/* screenshots */
console.log('\n── screenshots ──────────────────────────────────────────────');
await page.click('nav.tabs button[data-view=course]');
await page.evaluate(() => { S.course.stage = 'A1'; save(); renderCourse(); });
await page.waitForTimeout(250);
await page.screenshot({ path: path.join(ROOT, 'test/shot-course.png'), fullPage: true });
await page.locator('#courseBox .lst > div button.grow').nth(2).click();
await page.waitForTimeout(250);
await page.screenshot({ path: path.join(ROOT, 'test/shot-module.png'), fullPage: true });
await page.click('nav.tabs button[data-view=tests]');
await page.waitForTimeout(200);
await page.evaluate(() => window.__pqc.showPanel(null));
await page.waitForSelector('#testsBox .lst > div:has-text("Templates")');
await page.click('#testsBox .lst > div:has-text("Templates") button');
await page.waitForTimeout(250);
await page.emulateMedia({ colorScheme: 'dark' });
await page.screenshot({ path: path.join(ROOT, 'test/shot-template-dark.png'), fullPage: true });
console.log('  wrote test/shot-course.png, test/shot-module.png, test/shot-template-dark.png');

await browser.close();
server.close();
console.log(`\n${'─'.repeat(62)}`);
console.log(fail === 0 ? `\u001b[32mAll ${pass} checks passed.\u001b[0m`
                       : `\u001b[31m${fail} failed\u001b[0m, ${pass} passed.`);
process.exit(fail ? 1 : 0);
