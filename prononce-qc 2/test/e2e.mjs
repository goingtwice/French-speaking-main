/* ============================================================================
   End-to-end test. Runs the real app in Chromium with the network stubbed, so
   the parsing, the Québec IPA derivation and the rendering are all exercised
   against realistic Wiktionary wikitext without touching the internet.
   ========================================================================= */

import { chromium } from 'playwright';
import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';

const ROOT = path.resolve(import.meta.dirname, '..');
const PORT = 8321;
const MIME = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css' };

const server = http.createServer((req, res) => {
  const p = path.join(ROOT, decodeURIComponent(req.url.split('?')[0]) === '/' ? 'index.html' : req.url.split('?')[0]);
  if (!p.startsWith(ROOT) || !fs.existsSync(p)) { res.writeHead(404); return res.end('nope'); }
  res.writeHead(200, { 'Content-Type': MIME[path.extname(p)] || 'application/octet-stream' });
  res.end(fs.readFileSync(p));
});
await new Promise(r => server.listen(PORT, r));

/* ------------------------------------------------- realistic fixture data */

const WT_BONJOUR = `
== {{langue|fr}} ==
=== {{S|étymologie}} ===
: De {{compos|m=1|bon|jour|lang=fr}}.

=== {{S|interjection|fr}} ===
'''bonjour''' {{pron|bɔ̃.ʒuʁ|fr}}
# Formule de [[salutation]] employée pendant la journée.
#* ''Il m'a dit bonjour.''

=== {{S|prononciation}} ===
* {{pron|bɔ̃.ʒuʁ|fr}}
* {{écouter|France|bɔ̃.ʒuʁ|audio=Fr-bonjour.ogg|lang=fr}}
* {{écouter|Canada (Québec)|bɔ̃.ʒuːʁ|audio=LL-Q150 (fra)-Simon Villeneuve-bonjour.wav|lang=fr}}
* {{écouter|lang=fr|France (Paris)||audio=LL-Q150 (fra)-0x010C-bonjour.wav}}
* {{écouter|Suisse (Genève)||audio=LL-Q150 (fra)-Fhala.K-bonjour.wav|lang=fr}}
* {{écouter|Belgique (Liège)||audio=LL-Q150 (fra)-Lepticed7-bonjour.wav|lang=fr}}
* {{écouter|Sénégal (Dakar)||audio=LL-Q150 (fra)-Adelaide-bonjour.wav|lang=fr}}
`;

const WT_PETITE = `
== {{langue|fr}} ==
=== {{S|adjectif|fr}} ===
'''petite''' {{pron|pə.tit|fr}}
# Féminin singulier de [[petit]].
=== {{S|prononciation}} ===
* {{pron|pə.tit|fr}}
* {{écouter|Canada (Shawinigan)|pt͡sɪt|audio=LL-Q150 (fra)-Simon Villeneuve-petite.wav|lang=fr}}
`;

const WT_NOAUDIO = `
== {{langue|fr}} ==
=== {{S|nom|fr}} ===
'''courriel''' {{pron|ku.ʁjɛl|fr}}
# {{Québec|fr}} [[courrier|Courrier]] électronique.
`;

const WT_EN_CAR = `
==English==
===Noun===
{{en-noun}}
# A wheeled vehicle.
{{trans-top|automobile}}
* French: {{t+|fr|voiture|f}}, {{t+|fr|automobile|f}}, {{t+|fr|char|m}} {{qualifier|Quebec}}
{{trans-bottom}}
{{trans-top|railway carriage}}
* French: {{t+|fr|wagon|m}}
{{trans-bottom}}
`;

/* --------------------------------------------------------------- the stub */

const STUB = `
window.__calls = [];
const realFetch = window.fetch;
window.fetch = async (input, init) => {
  const url = String(input && input.url ? input.url : input);
  window.__calls.push(url);
  const j = (o) => new Response(JSON.stringify(o), { status: 200, headers: { 'Content-Type': 'application/json' } });

  if (url.includes('fr.wiktionary.org')) {
    const page = decodeURIComponent(new URL(url).searchParams.get('page') || '');
    const map = ${JSON.stringify({ bonjour: WT_BONJOUR, petite: WT_PETITE, courriel: WT_NOAUDIO })};
    if (map[page]) return j({ parse: { title: page, wikitext: map[page] } });
    return j({ error: { code: 'missingtitle' }, parse: { wikitext: '' } });
  }
  if (url.includes('en.wiktionary.org')) {
    const page = decodeURIComponent(new URL(url).searchParams.get('page') || '');
    if (page === 'car') return j({ parse: { title: 'car', wikitext: ${JSON.stringify(WT_EN_CAR)} } });
    return j({ parse: { wikitext: '' } });
  }
  if (url.includes('commons.wikimedia.org') && url.includes('imageinfo')) {
    const titles = (new URL(url).searchParams.get('titles') || '').split('|');
    return j({ query: { pages: titles.map((t, i) => ({
      title: t,
      imageinfo: [{
        url: 'https://upload.wikimedia.org/wikipedia/commons/a/a' + i + '/' + encodeURIComponent(t.replace(/^File:/, '')),
        mime: /\\.wav$/i.test(t) ? 'audio/x-wav' : 'audio/ogg'
      }]
    })) } });
  }
  if (url.includes('commons.wikimedia.org') && url.includes('list=search')) {
    return j({ query: { search: [] } });
  }
  if (url.includes('mymemory')) {
    return j({ responseData: { translatedText: 'voiture' } });
  }
  return new Response('{}', { status: 200, headers: { 'Content-Type': 'application/json' } });
};
`;

/* ------------------------------------------------------------------ tests */

let pass = 0, fail = 0;
const ok  = (name, cond, extra = '') => {
  if (cond) { pass++; console.log('  \u001b[32m✓\u001b[0m ' + name); }
  else { fail++; console.log('  \u001b[31m✗\u001b[0m ' + name + (extra ? '  → ' + extra : '')); }
};
const eq = (name, got, want) => ok(name + `  (${JSON.stringify(got)})`, got === want, 'wanted ' + JSON.stringify(want));

const CHROME = process.env.CHROME_PATH || '/opt/pw-browsers/chromium-1194/chrome-linux/chrome';
const browser = await chromium.launch({
  executablePath: fs.existsSync(CHROME) ? CHROME : undefined,
  args: ['--no-sandbox', '--autoplay-policy=no-user-gesture-required']
});
const page = await browser.newPage({ viewport: { width: 420, height: 900 } });
page.on('console', m => { if (m.type() === 'error') console.log('    [console error] ' + m.text()); });
page.on('pageerror', e => { fail++; console.log('  \u001b[31m✗ page error:\u001b[0m ' + e.message); });
await page.addInitScript(STUB);
await page.goto(`http://127.0.0.1:${PORT}/index.html`);
await page.waitForFunction(() => !!window.__pq);

console.log('\n── unit: Québec IPA derivation ───────────────────────────────');

const d = await page.evaluate(() => ({
  tu:      window.__pq.deriveQC('ty'),
  dire:    window.__pq.deriveQC('diʁ'),
  petite:  window.__pq.deriveQC('pə.tit'),
  vite:    window.__pq.deriveQC('vit'),
  jupe:    window.__pq.deriveQC('ʒyp'),
  route:   window.__pq.deriveQC('ʁut'),
  tiens:   window.__pq.deriveQC('tjɛ̃'),
  bonjour: window.__pq.deriveQC('bɔ̃.ʒuʁ'),
  chat:    window.__pq.deriveQC('ʃa'),
  lune:    window.__pq.deriveQC('lyn'),
  six:     window.__pq.deriveQC('sis')
}));

eq('tu → affricated',            d.tu?.ipa,      't͡sy');
eq('dire → affricated + long',   d.dire?.ipa,    'd͡ziːʁ');
eq('petite → affricate + lax',   d.petite?.ipa,  'pə.t͡sɪt');
eq('vite → lax i',               d.vite?.ipa,    'vɪt');
eq('jupe → lax y',               d.jupe?.ipa,    'ʒʏp');
eq('route → lax u',              d.route?.ipa,   'ʁʊt');
eq('tiens → affricate before j', d.tiens?.ipa,   't͡sjɛ̃');
eq('lune → lax y',               d.lune?.ipa,    'lʏn');
eq('six → lax i',                d.six?.ipa,     'sɪs');
ok('bonjour → u lengthens before ʁ, no laxing', d.bonjour?.ipa === 'bɔ̃.ʒuːʁ', JSON.stringify(d.bonjour));
ok('chat → no rule fires (returns null)',       d.chat === null, JSON.stringify(d.chat));

console.log('\n── unit: wikitext parsing ────────────────────────────────────');

const p = await page.evaluate(wt => {
  const e = window.__pq.parseFrEntry(wt);
  return { ipas: e.ipas, n: e.recs.length, recs: e.recs.map(r => ({ f: r.file, reg: r.region, sp: r.speaker, l: r.label })), gloss: e.gloss };
}, WT_BONJOUR);

eq('one IPA extracted',        p.ipas.length, 1);
eq('IPA value',                p.ipas[0], 'bɔ̃.ʒuʁ');
eq('six recordings found',     p.n, 6);
eq('Québec recording tagged',  p.recs.find(r => /Simon Villeneuve/.test(r.f))?.reg, 'CA');
eq('plain "France" tagged FR', p.recs.find(r => r.f === 'Fr-bonjour.ogg')?.reg, 'FR');
eq('Paris tagged FR',          p.recs.find(r => /0x010C/.test(r.f))?.reg, 'FR');
eq('Genève tagged CH',         p.recs.find(r => /Fhala/.test(r.f))?.reg, 'CH');
eq('Liège tagged BE',          p.recs.find(r => /Lepticed7/.test(r.f))?.reg, 'BE');
eq('Dakar tagged AF',          p.recs.find(r => /Adelaide/.test(r.f))?.reg, 'AF');
eq('speaker name parsed',      p.recs.find(r => /Simon/.test(r.f))?.sp, 'Simon Villeneuve');
ok('gloss captured',           /salutation/i.test(p.gloss), p.gloss);

const misc = await page.evaluate(() => ({
  frSec:   window.__pq.hasFrenchSection('== {{langue|fr}} ==\\n'),
  noSec:   window.__pq.hasFrenchSection('== {{langue|en}} ==\\n'),
  mp3:     window.__pq.mp3Transcode('https://upload.wikimedia.org/wikipedia/commons/8/8a/Fr-bonjour.ogg'),
  regionQC: window.__pq.regionOf('Canada (Québec)'),
  regionUn: window.__pq.regionOf(''),
  named:   window.__pq.paramsOf('lang=fr|France (Paris)||audio=X.wav')
}));
ok('French section detected',        misc.frSec === true);
ok('non-French section rejected',    misc.noSec === false);
eq('mp3 transcode path',             misc.mp3, 'https://upload.wikimedia.org/wikipedia/commons/transcoded/8/8a/Fr-bonjour.ogg/Fr-bonjour.ogg.mp3');
eq('region from label',              misc.regionQC, 'CA');
eq('empty label → XX',               misc.regionUn, 'XX');
eq('named param picked up',          misc.named.named.audio, 'X.wav');
eq('positional params kept in order',misc.named.pos[0], 'France (Paris)');

console.log('\n── e2e: look up a French word ────────────────────────────────');

await page.click('nav.tabs button[data-view=look]');
await page.fill('#q', 'bonjour');
await page.click('#searchForm button[type=submit]');
await page.waitForSelector('#result .rec', { timeout: 8000 });

ok('headword rendered',  (await page.textContent('#result .word')).trim() === 'bonjour');
ok('France IPA shown',   (await page.textContent('#result')).includes('bɔ̃.ʒuʁ'));
eq('all six rows rendered', await page.locator('#result .rec').count(), 6);
ok('A/B trainer present', await page.locator('.ab-big').count() === 1);
ok('Québec group is first (accent priority works)',
  (await page.locator('#result .eyebrow .tag').first().textContent()).includes('Québec'));
ok('region tags rendered', await page.locator('#result .rec .tag.CA').count() >= 1);

console.log('\n── e2e: Québec IPA surfaces in the UI ────────────────────────');
await page.fill('#q', 'petite');
await page.click('#searchForm button[type=submit]');
await page.waitForSelector('#result .rec', { timeout: 8000 });
const petiteTxt = await page.textContent('#result');
ok('recording IPA from Québec speaker used', petiteTxt.includes('pt͡sɪt'), petiteTxt.slice(0, 200));

console.log('\n── e2e: English → French candidates ──────────────────────────');
await page.click('#langSeg button[data-lang=en]');
await page.fill('#q', 'car');
await page.click('#searchForm button[type=submit]');
await page.waitForSelector('#candidates .chip', { timeout: 8000 });
const chips = await page.locator('#candidates .chip').allTextContents();
ok('voiture offered',   chips.includes('voiture'), chips.join(','));
ok('char offered (QC)', chips.includes('char'),    chips.join(','));
ok('wagon offered from the second sense', chips.includes('wagon'), chips.join(','));

console.log('\n── e2e: word with no recordings degrades ─────────────────────');
await page.click('#langSeg button[data-lang=fr]');
await page.fill('#q', 'courriel');
await page.click('#searchForm button[type=submit]');
await page.waitForSelector('#result .card', { timeout: 8000 });
const cTxt = await page.textContent('#result');
ok('explains there is no recording', /No human recording/i.test(cTxt));
ok('still offers the device voice',  /Device voice/i.test(cTxt));
ok('still shows the IPA',            cTxt.includes('ku.ʁjɛl'));

console.log('\n── e2e: deck ─────────────────────────────────────────────────');
await page.click('#result .btn.sm:has-text("Save")');
await page.click('nav.tabs button[data-view=deck]');
await page.waitForSelector('#deckList .lst');
eq('one word in the deck', await page.locator('#deckList .lst > div').count(), 1);
ok('deck survives a reload', await (async () => {
  await page.reload();
  await page.waitForFunction(() => !!window.__pq);
  await page.click('nav.tabs button[data-view=deck]');
  await page.waitForTimeout(250);
  return (await page.locator('#deckList .lst > div').count()) === 1;
})());

console.log('\n── e2e: drills ───────────────────────────────────────────────');
await page.click('nav.tabs button[data-view=drill]');
await page.waitForSelector('#drillBox .drill-opt');
ok('minimal-pair drill renders two options', await page.locator('#drillBox .drill-opt').count() === 2);
await page.locator('#drillBox .drill-opt').first().click();
await page.waitForSelector('#drillBox .note');
ok('answering shows feedback and a Next button', await page.locator('#drillBox .btn:has-text("Next")').count() === 1);
for (const k of ['qc', 'reduced', 'vocab']) {
  await page.click(`#drillPick button[data-drill=${k}]`);
  await page.waitForTimeout(160);
  ok(`${k} drill renders`, (await page.locator('#drillBox .card').count()) === 1);
}

console.log('\n── e2e: guide + speak ───────────────────────────────────────');
await page.click('nav.tabs button[data-view=guide]');
await page.waitForTimeout(200);
const g = await page.textContent('#view-guide');
ok('all seven Québec rules rendered', await page.locator('#rulesBox .card').count() === 7);
ok('reduced-form list populated',     await page.locator('#reducedBox > div').count() >= 20);
ok('CLB 7 row highlighted',           await page.locator('#examBox tr.hl').count() === 2);
ok('TEF listening CLB 7 figure present', g.includes('434–461'));
ok('CRS +50 explained',               g.includes('+50'));
ok('exam accent fact shown',          /France, Belgium, Switzerland, Québec and Africa/.test(g));

await page.click('nav.tabs button[data-view=speak]');
await page.waitForSelector('#phraseList .lst');
ok('phrase bank rendered', await page.locator('#phraseList .lst > div').count() >= 10);

console.log('\n── screenshots ──────────────────────────────────────────────');
await page.click('nav.tabs button[data-view=look]');
await page.click('#langSeg button[data-lang=fr]');
await page.fill('#q', 'bonjour');
await page.click('#searchForm button[type=submit]');
await page.waitForSelector('#result .rec');
await page.waitForTimeout(350);
await page.screenshot({ path: path.join(ROOT, 'test/shot-lookup.png'), fullPage: true });
await page.click('nav.tabs button[data-view=guide]');
await page.waitForTimeout(250);
await page.screenshot({ path: path.join(ROOT, 'test/shot-guide.png'), fullPage: true });
await page.emulateMedia({ colorScheme: 'dark' });
await page.click('nav.tabs button[data-view=drill]');
await page.waitForTimeout(250);
await page.screenshot({ path: path.join(ROOT, 'test/shot-drill-dark.png'), fullPage: true });
console.log('  wrote test/shot-lookup.png, test/shot-guide.png, test/shot-drill-dark.png');

await browser.close();
server.close();

console.log(`\n${'─'.repeat(62)}`);
console.log(fail === 0
  ? `\u001b[32mAll ${pass} checks passed.\u001b[0m`
  : `\u001b[31m${fail} failed\u001b[0m, ${pass} passed.`);
process.exit(fail ? 1 : 0);
