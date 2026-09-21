/* ============================================================================
   Prononce QC — app.js
   No build step, no backend, no framework. Open index.html and it works.

   Live sources (all CORS-enabled, no key):
     fr.wiktionary.org  → IPA + region-labelled human recordings
     en.wiktionary.org  → English → French translations
     commons.wikimedia.org → resolves audio file URLs
   Optional: Forvo (key), MyMemory (translation fallback).
   ========================================================================= */

'use strict';

/* ---------------------------------------------------------------- storage */

const KEY = 'prononce-qc.v1';

const DEFAULTS = {
  deck: [],            // {fr, en, ipa, ipaQC, added, seen, ok, box}
  prio: 'CA',
  speed: 1,
  forvoKey: '',
  proxy: '',
  theme: '',
  drillStats: {}
};

let S = { ...DEFAULTS };

function load() {
  try {
    const raw = localStorage.getItem(KEY);
    if (raw) S = { ...DEFAULTS, ...JSON.parse(raw) };
  } catch (e) {
    console.warn('storage unavailable, running in memory', e);
  }
}
function save() {
  try { localStorage.setItem(KEY, JSON.stringify(S)); }
  catch (e) { /* private mode, blocked storage — keep going in memory */ }
}

/* ------------------------------------------------------------------- dom */

const $  = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];

function el(tag, attrs = {}, ...kids) {
  const n = document.createElement(tag);
  for (const [k, v] of Object.entries(attrs)) {
    if (v === false || v == null) continue;
    if (k === 'class') n.className = v;
    else if (k === 'html') n.innerHTML = v;
    else if (k.startsWith('on')) n.addEventListener(k.slice(2), v);
    else n.setAttribute(k, v === true ? '' : v);
  }
  for (const k of kids.flat()) {
    if (k == null || k === false) continue;
    n.append(k.nodeType ? k : document.createTextNode(String(k)));
  }
  return n;
}
const esc = s => String(s == null ? '' : s).replace(/[&<>"']/g,
  c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

/* -------------------------------------------------------------- regions */

const REGION_NAME = {
  CA: 'Québec / Canada', FR: 'France', BE: 'Belgium',
  CH: 'Switzerland', AF: 'Africa', XX: 'Unlabelled'
};
const REGION_ORDER = ['CA', 'FR', 'BE', 'CH', 'AF', 'XX'];

const RX = {
  CA: /qu[ée]bec|canada|montr[ée]al|shawinigan|saguenay|chicoutimi|gatineau|sherbrooke|trois-rivi|laval|acadie|acadien|nouveau-brunswick|moncton|manitoba|ontario|joliette|rimouski|jonqui|beauce|gasp[ée]sie|lac-saint-jean/i,
  BE: /belgi|bruxelles|brussel|li[èe]ge|wallon|namur|charleroi|mons|hainaut|brabant|tournai/i,
  CH: /suisse|switzerland|gen[èe]ve|geneva|lausanne|vaud|valais|fribourg|neuch[âa]tel|jura suisse|z[üu]rich/i,
  AF: /afrique|african|s[ée]n[ée]gal|dakar|cameroun|yaound|douala|c[ôo]te d.?ivoire|abidjan|b[ée]nin|cotonou|togo|lom[ée]|mali|bamako|burkina|ouagadougou|niger|congo|kinshasa|brazzaville|gabon|libreville|tchad|guin[ée]e|conakry|madagascar|maurice|alg[ée]rie|alger|maroc|rabat|casablanca|tunis|liban|beyrouth/i,
  FR: /france|paris|lyon|marseille|toulouse|nantes|bordeaux|lille|strasbourg|nice|montpellier|rennes|dijon|orl[ée]ans|grenoble|bretagne|normandie|alsace|lorraine|vosges|picardie|occitanie|provence|savoie|auvergne|aquitaine|bourgogne|champagne|corr[èe]ze|h[ée]rault|yvelines|essonne|vaucluse|gironde|is[èe]re|loire|rh[ôo]ne|nord|moselle|finist[èe]re|ard[èe]che|dr[ôo]me|vend[ée]e|sarthe|somme|aube|gard|var|ain|aude|cher|jura|indre|creuse|charente|dordogne|landes|manche|mayenne|meuse|oise|orne|tarn|eure|aisne|allier|cantal|corse|doubs|marne|nièvre|is[eé]re|haute-|seine|saint-[ée]tienne|le mans|reims|toulon|angers|brest|limoges|amiens|metz|perpignan|besan[çc]on|caen|rouen|nancy|avignon|poitiers|pau|annecy|massy|cesson|muntzenheim|colmar|mulhouse|belfort|vannes|quimper|lorient|troyes|nimes|n[îi]mes/i
};

function regionOf(label, filename) {
  const s = ((label || '') + ' ' + (filename || '')).replace(/_/g, ' ');
  if (!s.trim()) return 'XX';
  for (const r of ['CA', 'BE', 'CH', 'AF', 'FR']) if (RX[r].test(s)) return r;
  return 'XX';
}

/* ----------------------------------------------- MediaWiki + net helpers */

const NET = { fr: null, en: null, commons: null, forvo: null, mymemory: null };

async function mwGet(host, params, signal) {
  const u = new URL(`https://${host}/w/api.php`);
  const p = { format: 'json', formatversion: '2', origin: '*', ...params };
  for (const [k, v] of Object.entries(p)) u.searchParams.set(k, v);
  const r = await fetch(u.toString(), { signal, credentials: 'omit' });
  // A missing page comes back as 404 with a perfectly good JSON error body —
  // that is "no such word", not "the source is down". Only a real transport or
  // server failure should count against the source.
  let body = null;
  try { body = await r.json(); } catch (e) { /* not JSON */ }
  if (body) return body;
  throw new Error('HTTP ' + r.status);
}

/* ---------------------------------------------- wiktionary: pronunciation */

// Split "a|b|c=d" respecting {{nested|templates}} and [[links]].
function splitParams(body) {
  const out = []; let depth = 0, cur = '';
  for (let i = 0; i < body.length; i++) {
    const two = body.slice(i, i + 2);
    if (two === '{{' || two === '[[') { depth++; cur += two; i++; continue; }
    if (two === '}}' || two === ']]') { depth--; cur += two; i++; continue; }
    if (body[i] === '|' && depth === 0) { out.push(cur); cur = ''; continue; }
    cur += body[i];
  }
  out.push(cur);
  return out;
}

// Pull every {{name|...}} occurrence, returning the raw parameter bodies.
function grabTemplates(wikitext, name) {
  const res = [];
  const needle = '{{' + name;
  let i = 0;
  while ((i = wikitext.indexOf(needle, i)) !== -1) {
    const after = wikitext[i + needle.length];
    if (after !== '|' && after !== '}') { i += needle.length; continue; }
    let depth = 0, j = i;
    for (; j < wikitext.length; j++) {
      if (wikitext.slice(j, j + 2) === '{{') { depth++; j++; continue; }
      if (wikitext.slice(j, j + 2) === '}}') { depth--; j++; if (depth === 0) { j++; break; } continue; }
    }
    // Drop the separator that follows the template name, so the first real
    // argument lands at positional index 0 rather than after an empty string.
    res.push(wikitext.slice(i + needle.length, j - 2).replace(/^\|/, ''));
    i = j;
  }
  return res;
}

function paramsOf(body) {
  const pos = [], named = {};
  for (const raw of splitParams(body)) {
    const p = raw.trim();
    if (!p) { pos.push(''); continue; }
    const m = p.match(/^([A-Za-z0-9_-]+)\s*=\s*([\s\S]*)$/);
    if (m) named[m[1].toLowerCase()] = m[2].trim();
    else pos.push(p);
  }
  return { pos, named };
}

const cleanIPA = s => String(s || '')
  .replace(/\[\[([^\]|]*\|)?([^\]]*)\]\]/g, '$2')
  .replace(/[\/\[\]]/g, '').replace(/<[^>]*>/g, '').trim();

/** Does this fr.wiktionary page actually have a French section? */
function hasFrenchSection(wikitext) {
  return /==\s*\{\{langue\|fr\}\}\s*==/.test(wikitext) || /\{\{S\|[^}]*\|fr[|}]/.test(wikitext);
}

function parseFrEntry(wikitext) {
  // IPA from {{pron|…|fr}}
  const ipas = [];
  for (const body of grabTemplates(wikitext, 'pron')) {
    const { pos, named } = paramsOf(body);
    const lang = (named.lang || pos[1] || '').toLowerCase();
    if (lang && lang !== 'fr') continue;
    const v = cleanIPA(pos[0]);
    if (v && !ipas.includes(v)) ipas.push(v);
  }

  // Recordings from {{écouter|region|pron|audio=File.ogg}}
  const recs = [];
  for (const body of grabTemplates(wikitext, 'écouter')) {
    const { pos, named } = paramsOf(body);
    const file = named.audio || named.fichier;
    if (!file) continue;
    const label = cleanIPA(pos[0] || named.titre || '');
    const pron = cleanIPA(pos[1] || '');
    recs.push({
      file: file.replace(/^File:|^Fichier:/i, '').trim(),
      label, ipa: pron,
      region: regionOf(label, file),
      src: 'wiktionary',
      speaker: speakerFromLL(file)
    });
  }

  // Short definition: first line of the first {{S|nom|fr}} style sense
  let gloss = '';
  const gm = wikitext.match(/^#\s*(?!\*)([^\n]{4,160})/m);
  if (gm) {
    gloss = gm[1]
      .replace(/\{\{[^}]*\}\}/g, '')
      .replace(/\[\[([^\]|]*\|)?([^\]]*)\]\]/g, '$2')
      .replace(/''+/g, '').replace(/\s{2,}/g, ' ').trim();
  }
  return { ipas, recs, gloss };
}

function speakerFromLL(file) {
  const m = String(file).match(/^LL-Q\d+\s*\([a-z]{3}\)-(.+?)-/i);
  return m ? m[1].replace(/_/g, ' ') : '';
}

/* --------------------------------------------- commons: resolve file URLs */

const urlCache = new Map();

async function resolveFiles(files, signal) {
  const need = files.filter(f => !urlCache.has(f));
  for (let i = 0; i < need.length; i += 40) {
    const batch = need.slice(i, i + 40);
    try {
      const d = await mwGet('commons.wikimedia.org', {
        action: 'query',
        titles: batch.map(f => 'File:' + f).join('|'),
        prop: 'imageinfo',
        iiprop: 'url|mime'
      }, signal);
      NET.commons = 'ok';
      for (const p of (d.query?.pages || [])) {
        const name = p.title.replace(/^File:/, '');
        const info = p.imageinfo?.[0];
        urlCache.set(name, info ? { url: info.url, mime: info.mime } : null);
      }
    } catch (e) {
      if (e.name === 'AbortError') throw e;
      NET.commons = 'bad';
      // Fall back to Special:FilePath, which redirects to the real file.
      for (const f of batch) {
        urlCache.set(f, {
          url: 'https://commons.wikimedia.org/wiki/Special:FilePath/' + encodeURIComponent(f),
          mime: ''
        });
      }
    }
  }
  return files.map(f => urlCache.get(f) || null);
}

/** Wikimedia keeps mp3 transcodes beside the original — Safari needs them for .ogg. */
function mp3Transcode(url) {
  if (!url || !/upload\.wikimedia\.org/.test(url)) return null;
  if (/\.mp3$/i.test(url)) return null;
  const base = url.split('/').pop();
  return url.replace('/commons/', '/commons/transcoded/') + '/' + base + '.mp3';
}

/* ------------------------------------------------------ commons fallback */

async function commonsSearch(word, signal) {
  try {
    const d = await mwGet('commons.wikimedia.org', {
      action: 'query', list: 'search', srnamespace: 6, srlimit: 20,
      srsearch: `intitle:"LL-Q150 (fra)" intitle:"${word}"`
    }, signal);
    NET.commons = 'ok';
    const rx = new RegExp('-' + word.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '\\.(wav|ogg|flac|mp3)$', 'i');
    return (d.query?.search || [])
      .map(h => h.title.replace(/^File:/, ''))
      .filter(f => rx.test(f))
      .map(f => ({
        file: f, label: '', ipa: '', region: 'XX',
        src: 'commons', speaker: speakerFromLL(f)
      }));
  } catch (e) {
    if (e.name === 'AbortError') throw e;
    NET.commons = 'bad';
    return [];
  }
}

/* --------------------------------------------------------------- forvo */

async function forvo(word, signal) {
  const key = S.forvoKey.trim();
  if (!key) return [];
  const path = `key/${encodeURIComponent(key)}/format/json/action/word-pronunciations/word/${encodeURIComponent(word)}/language/fr/order/rate-desc/limit/12`;
  const url = S.proxy.trim()
    ? S.proxy.trim().replace(/\/$/, '') + '/' + path
    : 'https://apifree.forvo.com/' + path;
  try {
    const r = await fetch(url, { signal });
    if (!r.ok) throw new Error('HTTP ' + r.status);
    const d = await r.json();
    NET.forvo = 'ok';
    return (d.items || []).map(it => ({
      file: null,
      directUrl: it.pathmp3 || it.pathogg,
      label: it.country || '',
      ipa: '',
      region: regionOf(it.country || it.code || ''),
      src: 'forvo',
      speaker: it.username || '',
      votes: it.num_positive_votes ?? it.rate ?? null
    }));
  } catch (e) {
    if (e.name === 'AbortError') throw e;
    NET.forvo = 'bad';
    return [];
  }
}

/* ------------------------------------------------- english → french */

async function translate(word, signal) {
  const out = [];

  // 1. en.wiktionary translation templates — dictionary quality, sense-aware.
  try {
    const d = await mwGet('en.wiktionary.org', {
      action: 'parse', page: word, prop: 'wikitext', redirects: 1
    }, signal);
    NET.en = 'ok';
    const wt = d.parse?.wikitext || '';
    let sense = '';
    const lines = wt.split('\n');
    for (const line of lines) {
      const tt = line.match(/\{\{trans-top\|(?:id=[^|}]*\|)?([^}|]*)/);
      if (tt) sense = tt[1].trim();
      for (const m of line.matchAll(/\{\{t[+\-]?(?:-check)?\|fr\|([^|}]+)/g)) {
        const w = m[1].trim();
        if (w && !out.some(o => o.fr === w)) out.push({ fr: w, sense });
      }
    }
  } catch (e) {
    if (e.name === 'AbortError') throw e;
    NET.en = 'bad';
  }

  if (out.length) return out.slice(0, 10);

  // 2. MyMemory — machine translation, no key, CORS-open.
  try {
    const u = new URL('https://api.mymemory.translated.net/get');
    u.searchParams.set('q', word);
    u.searchParams.set('langpair', 'en|fr-CA');
    const r = await fetch(u, { signal });
    const d = await r.json();
    NET.mymemory = 'ok';
    const t = (d.responseData?.translatedText || '').trim();
    if (t && t.toLowerCase() !== word.toLowerCase()) out.push({ fr: t, sense: 'machine translation' });
  } catch (e) {
    if (e.name === 'AbortError') throw e;
    NET.mymemory = 'bad';
  }
  return out;
}

/* ============================================================================
   Québec IPA derivation
   Applies the two mechanical rules — affrication and high-vowel laxing — to a
   metropolitan transcription. Clearly an approximation; the recordings decide.
   ========================================================================= */

const VSET      = new Set(['a','ɑ','e','ɛ','i','o','ɔ','ø','œ','u','y','ə','æ','ɐ','ɨ']);
const GLIDES    = new Set(['j','w','ɥ']);
const LENGTHEN  = new Set(['ʁ','v','z','ʒ']);
const LAXMAP    = { i: 'ɪ', y: 'ʏ', u: 'ʊ' };
const MARKS     = '̃ːˑ̰̩';

function tokenize(s) {
  const t = [];
  for (let i = 0; i < s.length; i++) {
    const c = s[i];
    if (c === '.' || c === ' ' || c === '‿' || c === '-') { t.push({ k: 'sep', c }); continue; }
    if (VSET.has(c)) {
      let v = c;
      while (i + 1 < s.length && MARKS.includes(s[i + 1])) v += s[++i];
      t.push({ k: 'v', c: v, base: c, nasal: v.includes('̃'), long: v.includes('ː') });
      continue;
    }
    let cc = c;
    while (i + 1 < s.length && (s[i + 1] === '͡' || s[i + 1] === '͜')) {
      cc += s[++i]; if (i + 1 < s.length) cc += s[++i];
    }
    while (i + 1 < s.length && MARKS.includes(s[i + 1])) cc += s[++i];
    t.push({ k: GLIDES.has(c) ? 'g' : 'c', c: cc, base: c });
  }
  return t;
}

function deriveQC(ipa) {
  if (!ipa) return null;
  const src = String(ipa).replace(/[\/\[\]]/g, '').trim();
  if (!src) return null;
  const t = tokenize(src);
  const fired = new Set();

  // Rule 1 — affrication of /t d/ before /i y j ɥ/
  for (let i = 0; i < t.length; i++) {
    if (t[i].k !== 'c' || (t[i].base !== 't' && t[i].base !== 'd')) continue;
    let j = i + 1;
    while (j < t.length && t[j].k === 'sep') j++;
    const nx = t[j];
    if (!nx) continue;
    const trigger = (nx.k === 'v' && (nx.base === 'i' || nx.base === 'y') && !nx.nasal)
                 || (nx.k === 'g' && (nx.base === 'j' || nx.base === 'ɥ'));
    if (!trigger) continue;
    t[i].c = t[i].base === 't' ? 't͡s' : 'd͡z';
    fired.add('affrication');
  }

  // Rule 2 — laxing of /i y u/ in short closed syllables
  const syls = [[]];
  for (const tok of t) { if (tok.k === 'sep') syls.push([]); else syls[syls.length - 1].push(tok); }
  for (const syl of syls) {
    const vi = syl.findIndex(x => x.k === 'v');
    if (vi === -1) continue;
    const v = syl[vi];
    if (v.nasal || v.long || !(v.base in LAXMAP)) continue;
    const coda = syl.slice(vi + 1).filter(x => x.k === 'c' || x.k === 'g');
    if (!coda.length) continue;
    if (LENGTHEN.has(coda[0].base)) { v.c = v.base + 'ː'; fired.add('lengthening'); continue; }
    v.c = LAXMAP[v.base];
    fired.add('laxing');
  }

  // Rebuild, preserving the original separators
  let out = '', si = 0;
  for (const tok of t) out += tok.k === 'sep' ? tok.c : tok.c;
  out = t.map(x => x.c).join('');

  if (!fired.size) return null;
  return { ipa: out, rules: [...fired] };
}

const RULE_BLURB = {
  affrication: 't → ts, d → dz before i / y / j / ɥ',
  laxing: 'i y u relax to ɪ ʏ ʊ in a closed syllable',
  lengthening: 'vowel lengthens before ʁ v z ʒ — often diphthongised too'
};

/* ============================================================================
   Audio
   ========================================================================= */

let current = null;   // live HTMLAudioElement
let abTimer = null;

function stopAudio() {
  if (abTimer) { clearTimeout(abTimer); abTimer = null; }
  if (current) { try { current.pause(); } catch (e) {} current = null; }
  $$('.play.playing').forEach(b => b.classList.remove('playing'));
  $('#abLoop')?.setAttribute('aria-pressed', 'false');
}

function makeAudio(rec) {
  const a = new Audio();
  a.preload = 'none';
  const sources = [];
  if (rec.directUrl) sources.push(rec.directUrl);
  if (rec._url) {
    sources.push(rec._url);
    const mp3 = mp3Transcode(rec._url);
    if (mp3) sources.push(mp3);
  }
  a._sources = sources;
  a._si = 0;
  a.src = sources[0] || '';
  a.addEventListener('error', () => {
    if (a._si < a._sources.length - 1) { a._si++; a.src = a._sources[a._si]; a.play().catch(() => {}); }
  });
  return a;
}

async function play(rec, btn, speed) {
  stopAudio();
  if (!rec) return;
  const a = makeAudio(rec);
  current = a;
  a.playbackRate = speed ?? (Number(S.speed) || 1);
  if ('preservesPitch' in a) a.preservesPitch = true;
  if (btn) {
    btn.classList.add('playing');
    a.addEventListener('ended', () => btn.classList.remove('playing'));
  }
  try { await a.play(); }
  catch (e) {
    btn?.classList.remove('playing');
    btn?.classList.add('err');
    setTimeout(() => btn?.classList.remove('err'), 1600);
  }
  return new Promise(res => {
    a.addEventListener('ended', res, { once: true });
    a.addEventListener('error', res, { once: true });
    setTimeout(res, 9000);
  });
}

/* --------------------------------------------------------- speech synth */

let voices = [];
function refreshVoices() {
  try { voices = (speechSynthesis.getVoices() || []).filter(v => /^fr/i.test(v.lang)); }
  catch (e) { voices = []; }
  const sel = $('#voiceSel');
  if (!sel) return;
  const prev = sel.value;
  sel.innerHTML = '';
  if (!voices.length) {
    sel.append(el('option', { value: '' }, 'No French voice found'));
    const n = $('#voiceNote');
    if (n) {
      n.hidden = false;
      n.textContent = 'Your device has no French voice installed, so the speaking and drill tabs stay silent. ' +
        'On Android: Settings → System → Languages → Text-to-speech → install French (Canada). ' +
        'On iOS: Settings → Accessibility → Spoken Content → Voices → French (Canada), "Amélie".';
    }
    return;
  }
  $('#voiceNote') && ($('#voiceNote').hidden = true);
  const sorted = [...voices].sort((a, b) => {
    const s = v => (/fr[-_]CA/i.test(v.lang) ? 0 : /fr[-_]FR/i.test(v.lang) ? 1 : 2);
    return s(a) - s(b) || a.name.localeCompare(b.name);
  });
  for (const v of sorted) {
    sel.append(el('option', { value: v.name },
      `${v.name} · ${v.lang}${/fr[-_]CA/i.test(v.lang) ? '  ✦ Canadian' : ''}`));
  }
  if (prev && sorted.some(v => v.name === prev)) sel.value = prev;
}

function pickVoice(prefer) {
  if (!voices.length) return null;
  const want = prefer || $('#voiceSel')?.value;
  if (want === 'CA') return voices.find(v => /fr[-_]CA/i.test(v.lang)) || voices[0];
  if (want === 'FR') return voices.find(v => /fr[-_]FR/i.test(v.lang)) || voices[0];
  return voices.find(v => v.name === want)
      || voices.find(v => /fr[-_]CA/i.test(v.lang))
      || voices[0];
}

function say(text, { rate = 1, voice = null } = {}) {
  return new Promise(res => {
    if (!('speechSynthesis' in window)) return res(false);
    try { speechSynthesis.cancel(); } catch (e) {}
    const u = new SpeechSynthesisUtterance(text);
    const v = voice || pickVoice();
    if (v) { u.voice = v; u.lang = v.lang; } else { u.lang = 'fr-CA'; }
    u.rate = rate;
    u.onend = () => res(true);
    u.onerror = () => res(false);
    try { speechSynthesis.speak(u); } catch (e) { res(false); }
    setTimeout(() => res(true), 1200 + text.length * 90);
  });
}

/* ============================================================================
   LOOK UP
   ========================================================================= */

let searchAbort = null;

function looksFrench(w) {
  if (/[àâçéèêëîïôùûüœæ]/i.test(w)) return true;
  if (/(tion|ment|eux|euse|ique|aire|oir|ais|ez|er)$/i.test(w) && w.length > 4) return true;
  return false;
}

async function doSearch(raw) {
  const word = raw.trim().replace(/\s+/g, ' ');
  if (!word) return;
  searchAbort?.abort();
  searchAbort = new AbortController();
  const sig = searchAbort.signal;

  $('#starter').hidden = true;
  $('#candidates').innerHTML = '';
  $('#result').innerHTML = '';
  $('#srcStatus').innerHTML = '<span class="spin"></span>';

  const mode = $$('#langSeg button').find(b => b.getAttribute('aria-pressed') === 'true')?.dataset.lang || 'auto';

  try {
    if (mode === 'en') return void await showCandidates(word, sig);

    if (mode === 'fr') return void await showWord(word, sig);

    // auto: check the French Wiktionary and the English translations at once
    const [frRes, enRes] = await Promise.allSettled([
      fetchFrPage(word, sig),
      looksFrench(word) ? Promise.resolve([]) : translate(word, sig)
    ]);
    const frOk = frRes.status === 'fulfilled' && frRes.value && hasFrenchSection(frRes.value);
    const cands = enRes.status === 'fulfilled' ? enRes.value : [];

    if (frOk) {
      await renderWord(word, frRes.value, sig);
      if (cands.length) {
        $('#candidates').append(candCard(
          `"${word}" is also an English word — French equivalents:`, cands));
      }
    } else if (cands.length) {
      await showCandidates(word, sig, cands);
    } else {
      $('#result').append(el('div', { class: 'card' },
        el('h2', {}, 'Nothing found'),
        el('p', { class: 'sub', style: 'margin:0' },
          `No French Wiktionary entry and no English→French match for "${word}". ` +
          `Check the spelling, or switch the toggle to force English or French.`)));
    }
  } catch (e) {
    if (e.name === 'AbortError') return;
    $('#result').append(el('div', { class: 'card' },
      el('h2', {}, 'Lookup failed'),
      el('p', { class: 'sub', style: 'margin:0' }, String(e.message || e)),
      el('div', { class: 'note warn' },
        'If this keeps happening you are probably offline, or the page is being served from a ' +
        'context that blocks cross-origin requests. Open Settings → Run check to see which sources respond.')));
  } finally {
    paintSrcStatus();
  }
}

async function fetchFrPage(word, sig) {
  try {
    const d = await mwGet('fr.wiktionary.org', {
      action: 'parse', page: word, prop: 'wikitext', redirects: 1
    }, sig);
    NET.fr = 'ok';
    return d.parse?.wikitext || '';
  } catch (e) {
    if (e.name === 'AbortError') throw e;
    NET.fr = 'bad';
    return '';
  }
}

function candCard(title, cands) {
  const box = el('div', { class: 'card' }, el('h2', {}, title));
  const chips = el('div', { class: 'chips', style: 'margin-top:10px' });
  for (const c of cands) {
    chips.append(el('button', {
      class: 'chip',
      title: c.sense || '',
      onclick: () => { $('#q').value = c.fr; setLang('fr'); doSearch(c.fr); }
    }, c.fr));
  }
  box.append(chips);
  const senses = [...new Set(cands.map(c => c.sense).filter(Boolean))];
  if (senses.length) box.append(el('p', { class: 'muted', style: 'margin:10px 0 0' },
    'Senses: ' + senses.slice(0, 4).join(' · ')));
  return box;
}

async function showCandidates(word, sig, pre) {
  const cands = pre || await translate(word, sig);
  if (!cands.length) {
    $('#result').append(el('div', { class: 'card' },
      el('h2', {}, 'No translation found'),
      el('p', { class: 'sub', style: 'margin:0' },
        `Neither Wiktionary nor MyMemory had a French equivalent for "${word}".`)));
    return;
  }
  $('#candidates').append(candCard(`"${word}" in French — pick one:`, cands));
  // Auto-open the first, since that is usually what you wanted
  await showWord(cands[0].fr, sig);
}

async function showWord(word, sig) {
  const wt = await fetchFrPage(word, sig);
  await renderWord(word, wt, sig);
}

async function renderWord(word, wikitext, sig) {
  const entry = wikitext ? parseFrEntry(wikitext) : { ipas: [], recs: [], gloss: '' };
  let recs = entry.recs;

  // Widen the net when Wiktionary has nothing
  if (!recs.length) {
    const extra = await commonsSearch(word, sig);
    recs = recs.concat(extra);
  }
  const fromForvo = await forvo(word, sig);
  recs = recs.concat(fromForvo);

  // Resolve Commons filenames to real URLs
  const files = recs.filter(r => r.file).map(r => r.file);
  if (files.length) {
    const info = await resolveFiles(files, sig);
    let k = 0;
    for (const r of recs) if (r.file) { const i = info[k++]; r._url = i?.url || null; r._mime = i?.mime || ''; }
  }
  recs = recs.filter(r => r._url || r.directUrl);

  // Group and order by your accent priority
  const order = S.prio === 'all'
    ? REGION_ORDER
    : [S.prio, ...REGION_ORDER.filter(r => r !== S.prio)];
  recs.sort((a, b) => order.indexOf(a.region) - order.indexOf(b.region));

  const ipaFR  = entry.ipas[0] || '';
  const derived = deriveQC(ipaFR);
  const ipaQCfromRec = recs.find(r => r.region === 'CA' && r.ipa)?.ipa || '';

  const out = $('#result');
  out.innerHTML = '';

  /* --- headword card --- */
  const head = el('div', { class: 'card' });
  const hr = el('div', { class: 'headword' }, el('div', { class: 'word' }, word));
  const star = el('button', {
    class: 'btn sm',
    onclick: e => {
      toggleDeck({ fr: word, en: entry.gloss || '', ipa: ipaFR, ipaQC: ipaQCfromRec || derived?.ipa || '' });
      e.currentTarget.textContent = inDeck(word) ? '★ Saved' : '☆ Save';
    }
  }, inDeck(word) ? '★ Saved' : '☆ Save');
  head.append(el('div', { class: 'between' }, hr, star));
  if (entry.gloss) head.append(el('div', { class: 'gloss', style: 'margin-top:6px;font-size:14px;color:var(--ink-2)' }, entry.gloss));

  const ib = el('div', { class: 'ipa-block' });
  if (ipaFR) {
    ib.append(el('span', { class: 'lbl fr' }, 'France'), el('span', { class: 'ipa' }, '[' + ipaFR + ']'));
  }
  if (ipaQCfromRec) {
    ib.append(el('span', { class: 'lbl qc' }, 'Québec'), el('span', { class: 'ipa' }, '[' + ipaQCfromRec + ']'));
  } else if (derived) {
    ib.append(el('span', { class: 'lbl qc' }, 'Québec'),
      el('span', {}, el('span', { class: 'ipa' }, '[' + derived.ipa + ']'),
        el('span', { class: 'derived' }, '  derived')));
  }
  if (ib.children.length) head.append(ib);
  if (derived && !ipaQCfromRec) {
    head.append(el('p', { class: 'muted', style: 'margin:8px 0 0' },
      'Derived by rule (' + derived.rules.map(r => RULE_BLURB[r]).join('; ') + '). The recordings are the truth — this is a hint for your eyes.'));
  }
  if (!ipaFR && !recs.length) {
    head.append(el('div', { class: 'note warn' },
      'No transcription and no recording for this word. Try the base form — "parlé" is under "parler", plurals under the singular.'));
  }
  out.append(head);

  /* --- A/B trainer --- */
  const ca = recs.find(r => r.region === 'CA');
  const fr = recs.find(r => r.region === 'FR');
  if (ca && fr) out.append(abCard(ca, fr, word));

  /* --- recordings by region --- */
  if (recs.length) {
    const seen = new Set();
    for (const reg of order) {
      const group = recs.filter(r => r.region === reg);
      if (!group.length) continue;
      out.append(el('div', { class: 'eyebrow' },
        el('span', { class: 'tag ' + reg }, REGION_NAME[reg]),
        ' ', String(group.length) + (group.length === 1 ? ' recording' : ' recordings')));
      const box = el('div');
      for (const r of group) box.append(recRow(r));
      out.append(box);
      group.forEach(r => seen.add(r));
    }
  } else {
    out.append(el('div', { class: 'card' },
      el('h2', {}, 'No human recording yet'),
      el('p', { class: 'sub' }, 'Nobody has recorded this word on Wikimedia. You can still hear it with your device voice — less authentic, but it will do.'),
      el('button', { class: 'btn primary sm', onclick: () => say(word, { voice: pickVoice('CA') }) }, '▶ Device voice (fr-CA)')));
  }

  /* --- speed + device voice row --- */
  out.append(el('div', { class: 'card flat' },
    el('div', { class: 'row' },
      el('span', { class: 'muted' }, 'Speed'),
      speedSeg(),
      el('div', { class: 'spacer' }),
      el('button', { class: 'btn sm', onclick: () => say(word, { voice: pickVoice('CA'), rate: 0.85 }) }, '▶ fr-CA voice'),
      el('button', { class: 'btn sm', onclick: () => say(word, { voice: pickVoice('FR'), rate: 0.85 }) }, '▶ fr-FR voice'))));

  out.append(el('p', { class: 'muted', style: 'text-align:center;margin:14px 0 0' },
    'Recordings: Wikimedia Commons / Lingua Libre contributors, CC BY-SA. ',
    el('a', {
      href: 'https://fr.wiktionary.org/wiki/' + encodeURIComponent(word),
      target: '_blank', rel: 'noopener'
    }, 'Full entry on fr.wiktionary →')));
}

function recRow(r) {
  const row = el('div', { class: 'rec' });
  const btn = el('button', { class: 'play', 'aria-label': 'Play' }, '▶');
  btn.addEventListener('click', () => play(r, btn));
  const who = r.speaker || (r.src === 'forvo' ? 'Forvo speaker' : 'Unknown speaker');
  const where = [r.label, r.ipa && '[' + r.ipa + ']', r.src].filter(Boolean).join(' · ');
  row.append(btn, el('div', { class: 'meta' },
    el('div', { class: 'who' }, who),
    el('div', { class: 'where' }, where || '—')),
    el('span', { class: 'tag ' + r.region }, r.region));
  return row;
}

function abCard(ca, fr, word) {
  const card = el('div', { class: 'ab' });
  const now = el('div', { class: 'now' }, 'A/B trainer — Québec against France');
  const big = el('button', { class: 'ab-big' }, '▶  Québec  →  France');
  const loop = el('button', { class: 'btn sm', id: 'abLoop', 'aria-pressed': 'false' }, '↻ Loop');
  const slow = el('button', { class: 'btn sm' }, '0.6× both');

  async function runOnce(rate) {
    now.textContent = '◉ Québec';
    await play(ca, null, rate);
    await new Promise(r => abTimer = setTimeout(r, 420));
    now.textContent = '◉ France';
    await play(fr, null, rate);
    now.textContent = 'A/B trainer — Québec against France';
  }
  big.addEventListener('click', () => runOnce());
  slow.addEventListener('click', () => runOnce(0.6));
  loop.addEventListener('click', async () => {
    const on = loop.getAttribute('aria-pressed') === 'true';
    if (on) { loop.setAttribute('aria-pressed', 'false'); stopAudio(); return; }
    loop.setAttribute('aria-pressed', 'true');
    while (loop.getAttribute('aria-pressed') === 'true') {
      await runOnce();
      await new Promise(r => abTimer = setTimeout(r, 700));
    }
  });

  card.append(now, big, el('div', { class: 'row', style: 'margin-top:10px' },
    loop, slow, el('div', { class: 'spacer' }),
    el('span', { class: 'muted' }, word)));
  return card;
}

function speedSeg() {
  const seg = el('div', { class: 'seg' });
  for (const sp of [1, 0.75, 0.5]) {
    seg.append(el('button', {
      type: 'button', 'aria-pressed': String(Number(S.speed) === sp),
      onclick: e => {
        S.speed = sp; save();
        $$('button', seg).forEach(b => b.setAttribute('aria-pressed', String(Number(b.textContent.replace('×', '')) === sp)));
        syncSpeedPickers();
      }
    }, sp + '×'));
  }
  return seg;
}
function syncSpeedPickers() {
  $$('#speedPick button').forEach(b =>
    b.setAttribute('aria-pressed', String(Number(b.dataset.speed) === Number(S.speed))));
}

function paintSrcStatus() {
  const bits = [];
  const mark = (k, name) => { if (NET[k]) bits.push((NET[k] === 'ok' ? '✓ ' : '✕ ') + name); };
  mark('fr', 'wiktionary'); mark('commons', 'commons');
  mark('en', 'translations'); mark('forvo', 'forvo');
  $('#srcStatus').textContent = bits.join('  ');
}

/* ============================================================================
   DECK
   ========================================================================= */

const inDeck = w => S.deck.some(d => d.fr === w);

function toggleDeck(item) {
  const i = S.deck.findIndex(d => d.fr === item.fr);
  if (i >= 0) S.deck.splice(i, 1);
  else S.deck.unshift({ ...item, added: Date.now(), seen: 0, ok: 0, box: 1 });
  save(); renderDeck();
}

function renderDeck() {
  const n = S.deck.length;
  $('#deckCount').textContent = n
    ? `${n} word${n === 1 ? '' : 's'} · ${S.deck.filter(d => d.box >= 3).length} solid`
    : 'Nothing saved yet. Star a word from Look up, or add one from the Guide.';
  const solid = n ? Math.round(100 * S.deck.filter(d => d.box >= 3).length / n) : 0;
  $('#deckBar').style.width = solid + '%';

  const box = $('#deckList');
  box.innerHTML = '';
  if (!n) {
    box.append(el('div', { class: 'card flat' }, el('div', { class: 'empty' },
      'Words you save show up here with their pronunciation, ready to replay.')));
    return;
  }
  const lst = el('div', { class: 'lst' });
  for (const d of S.deck) {
    lst.append(el('div', {},
      el('button', { class: 'play', style: 'width:34px;height:34px;font-size:12px', onclick: () => say(d.fr, { voice: pickVoice('CA'), rate: 0.9 }) }, '▶'),
      el('div', { class: 'grow' },
        el('div', { class: 't1' }, d.fr),
        el('div', { class: 't2' }, [d.en, d.ipaQC && '[' + d.ipaQC + ']'].filter(Boolean).join(' · ') || '—')),
      el('span', { class: 'score' }, 'box ' + d.box),
      el('button', {
        class: 'pick', title: 'Look up again',
        onclick: () => { $('#q').value = d.fr; setLang('fr'); go('look'); doSearch(d.fr); }
      }, '↗'),
      el('button', { class: 'pick', title: 'Remove', onclick: () => toggleDeck(d) }, '✕')));
  }
  box.append(lst);
}

let review = null;
function startReview() {
  const pool = [...S.deck].sort((a, b) => a.box - b.box || a.seen - b.seen).slice(0, 12);
  if (!pool.length) return;
  review = { pool, i: 0, shown: false };
  paintReview();
}
function paintReview() {
  const box = $('#reviewBox');
  box.innerHTML = '';
  if (!review) return;
  if (review.i >= review.pool.length) {
    box.append(el('div', { class: 'card' }, el('h2', {}, 'Round done'),
      el('p', { class: 'sub', style: 'margin:0' }, 'Come back later — spacing is what makes it stick.')));
    review = null; renderDeck(); return;
  }
  const d = review.pool[review.i];
  const card = el('div', { class: 'card' });
  card.append(el('div', { class: 'between' },
    el('span', { class: 'muted' }, `${review.i + 1} / ${review.pool.length}`),
    el('button', { class: 'pick', onclick: () => { review = null; paintReview(); } }, 'stop')));
  card.append(el('div', { class: 'word', style: 'font-size:28px;font-weight:640;margin:10px 0 4px' }, d.fr));

  if (!review.shown) {
    card.append(el('div', { class: 'row', style: 'margin-top:12px' },
      el('button', { class: 'btn sm', onclick: () => say(d.fr, { voice: pickVoice('CA'), rate: 0.9 }) }, '▶ Hear it'),
      el('button', { class: 'btn primary sm', onclick: () => { review.shown = true; paintReview(); } }, 'Reveal')));
  } else {
    if (d.ipa)   card.append(el('div', { class: 'ipa' }, 'FR  [' + d.ipa + ']'));
    if (d.ipaQC) card.append(el('div', { class: 'ipa', style: 'color:var(--qc)' }, 'QC  [' + d.ipaQC + ']'));
    if (d.en)    card.append(el('div', { class: 'sub', style: 'margin:8px 0 0' }, d.en));
    card.append(el('div', { class: 'row', style: 'margin-top:14px' },
      el('button', { class: 'btn sm', onclick: () => grade(d, false) }, 'Again'),
      el('button', { class: 'btn primary sm', onclick: () => grade(d, true) }, 'Got it')));
  }
  box.append(card);
}
function grade(d, ok) {
  d.seen++; if (ok) { d.ok++; d.box = Math.min(5, d.box + 1); } else { d.box = 1; }
  save();
  review.i++; review.shown = false;
  paintReview(); renderDeck();
}

/* ============================================================================
   DRILLS
   ========================================================================= */

let drill = { kind: 'pairs', q: null, score: { n: 0, ok: 0 } };

const rand  = a => a[Math.floor(Math.random() * a.length)];
const shuffle = a => a.map(v => [Math.random(), v]).sort((x, y) => x[0] - y[0]).map(v => v[1]);

function nextDrill() {
  const k = drill.kind;
  if (k === 'pairs') {
    const p = rand(PAIRS);
    const target = Math.random() < .5 ? 'a' : 'b';
    drill.q = { kind: k, p, target };
  } else if (k === 'qc') {
    const rule = rand(QC_RULES.filter(r => r.id !== 'contrasts'));
    drill.q = { kind: k, rule, ex: rand(rule.examples) };
  } else if (k === 'reduced') {
    const r = rand(REDUCED);
    const others = shuffle(REDUCED.filter(x => x !== r)).slice(0, 3);
    drill.q = { kind: k, r, opts: shuffle([r, ...others]) };
  } else {
    const v = rand(VOCAB);
    const others = shuffle(VOCAB.filter(x => x !== v && x.theme === v.theme)).slice(0, 3);
    const pad = shuffle(VOCAB.filter(x => x !== v)).slice(0, 3);
    drill.q = { kind: k, v, opts: shuffle([v, ...(others.length >= 3 ? others : pad)].slice(0, 4)) };
  }
  paintDrill();
}

function drillHead() {
  const s = drill.score;
  return el('div', { class: 'between', style: 'margin-bottom:12px' },
    el('span', { class: 'score' }, s.n ? `${s.ok} / ${s.n}  ·  ${Math.round(100 * s.ok / s.n)}%` : 'no answers yet'),
    el('button', { class: 'pick', onclick: () => { drill.score = { n: 0, ok: 0 }; nextDrill(); } }, 'reset'));
}

function answer(ok, then) {
  drill.score.n++; if (ok) drill.score.ok++;
  S.drillStats[drill.kind] = S.drillStats[drill.kind] || { n: 0, ok: 0 };
  S.drillStats[drill.kind].n++; if (ok) S.drillStats[drill.kind].ok++;
  save();
  then?.();
}

function paintDrill() {
  const box = $('#drillBox');
  box.innerHTML = '';
  const q = drill.q;
  if (!q) return;
  const card = el('div', { class: 'card' });
  card.append(drillHead());

  /* ---- minimal pairs ---- */
  if (q.kind === 'pairs') {
    const word = q.p[q.target];
    card.append(el('h2', {}, 'Which one did you hear?'),
      el('p', { class: 'sub' }, q.p.focus + (voices.length ? '' : ' — no French voice on this device, so this drill is silent')));
    card.append(el('button', {
      class: 'btn primary', style: 'width:100%;margin-bottom:14px',
      onclick: () => say(word, { voice: pickVoice(), rate: 0.85 })
    }, '▶  Play again'));
    say(word, { voice: pickVoice(), rate: 0.85 });

    for (const side of ['a', 'b']) {
      const b = el('button', { class: 'drill-opt' },
        el('span', { class: 'big' }, q.p[side]),
        el('span', { class: 'ipa' }, '[' + q.p['ipa' + side.toUpperCase()] + ']'));
      b.addEventListener('click', () => {
        const ok = side === q.target;
        b.classList.add(ok ? 'right' : 'wrong');
        $$('.drill-opt', card).forEach(x => x.disabled = true);
        answer(ok);
        const tail = el('div', {},
          el('div', { class: ok ? 'note' : 'note warn' },
            (ok ? 'Right — ' : 'It was "' + word + '". ') + (q.p.tip || q.p.focus)),
          el('div', { class: 'row' },
            el('button', { class: 'btn sm', onclick: () => say(q.p.a, { rate: 0.7 }) }, '▶ ' + q.p.a),
            el('button', { class: 'btn sm', onclick: () => say(q.p.b, { rate: 0.7 }) }, '▶ ' + q.p.b),
            el('div', { class: 'spacer' }),
            el('button', { class: 'btn primary sm', onclick: nextDrill }, 'Next →')));
        card.append(tail);
      });
      card.append(b);
    }
  }

  /* ---- Québec sounds ---- */
  if (q.kind === 'qc') {
    card.append(el('h2', {}, 'How does a Québécois say this?'),
      el('p', { class: 'sub' }, q.rule.title));
    card.append(el('div', { style: 'font-size:30px;font-weight:640;letter-spacing:-.025em;margin:6px 0 4px' }, q.ex.fr));
    card.append(el('div', { class: 'ipa', style: 'color:var(--fr)' }, 'France  [' + q.ex.ipaFR + ']'));
    const revealBox = el('div');
    card.append(el('div', { class: 'row', style: 'margin-top:14px' },
      el('button', {
        class: 'btn primary sm', onclick: e => {
          e.currentTarget.disabled = true;
          revealBox.append(
            el('div', { class: 'ipa', style: 'color:var(--qc);margin-top:10px' }, 'Québec  [' + q.ex.ipaQC + ']'),
            el('div', { class: 'note' }, q.rule.plain),
            el('div', { class: 'row' },
              el('button', { class: 'btn sm', onclick: () => say(q.ex.fr, { voice: pickVoice('CA'), rate: .8 }) }, '▶ fr-CA voice'),
              el('button', { class: 'btn sm', onclick: () => { $('#q').value = q.ex.fr; setLang('fr'); go('look'); doSearch(q.ex.fr); } }, 'Real recordings ↗'),
              el('div', { class: 'spacer' }),
              el('button', { class: 'btn primary sm', onclick: () => { answer(true); nextDrill(); } }, 'Next →')));
        }
      }, 'Reveal'),
      el('button', { class: 'btn sm', onclick: nextDrill }, 'Skip')));
    card.append(revealBox);
  }

  /* ---- reduced speech ---- */
  if (q.kind === 'reduced') {
    card.append(el('h2', {}, 'You hear this. What is it in writing?'));
    card.append(el('div', { style: 'font-size:27px;font-weight:640;margin:8px 0 2px' }, q.r.spoken));
    if (q.r.ipa) card.append(el('div', { class: 'ipa', style: 'color:var(--ink-3)' }, '[' + q.r.ipa + ']'));
    card.append(el('div', { class: 'row', style: 'margin:12px 0' },
      el('button', { class: 'btn sm', onclick: () => say(q.r.spoken.split('/')[0].trim(), { voice: pickVoice('CA'), rate: .9 }) }, '▶ Hear it')));
    for (const o of q.opts) {
      const b = el('button', { class: 'drill-opt' }, el('span', { class: 'big', style: 'font-size:16px' }, o.written));
      b.addEventListener('click', () => {
        const ok = o === q.r;
        b.classList.add(ok ? 'right' : 'wrong');
        $$('.drill-opt', card).forEach(x => x.disabled = true);
        answer(ok);
        card.append(el('div', { class: ok ? 'note' : 'note warn' },
          (ok ? '' : 'It was "' + q.r.written + '". ') + (q.r.note || '')),
          el('div', { class: 'row' }, el('div', { class: 'spacer' }),
            el('button', { class: 'btn primary sm', onclick: nextDrill }, 'Next →')));
      });
      card.append(b);
    }
  }

  /* ---- exam vocab ---- */
  if (q.kind === 'vocab') {
    card.append(el('h2', {}, q.v.theme),
      el('p', { class: 'sub' }, 'What does this mean?'));
    card.append(el('div', { style: 'font-size:24px;font-weight:620;margin:6px 0 2px' }, q.v.fr));
    card.append(el('div', { class: 'ipa', style: 'color:var(--ink-3)' }, '[' + q.v.ipa + ']'));
    card.append(el('div', { class: 'row', style: 'margin:12px 0' },
      el('button', { class: 'btn sm', onclick: () => say(q.v.fr, { voice: pickVoice('CA'), rate: .85 }) }, '▶ Hear it'),
      el('button', {
        class: 'btn sm', onclick: () => {
          toggleDeck({ fr: q.v.fr, en: q.v.en, ipa: q.v.ipa, ipaQC: deriveQC(q.v.ipa)?.ipa || '' });
        }
      }, '☆ Save')));
    for (const o of q.opts) {
      const b = el('button', { class: 'drill-opt' }, el('span', { style: 'font-size:15px' }, o.en));
      b.addEventListener('click', () => {
        const ok = o === q.v;
        b.classList.add(ok ? 'right' : 'wrong');
        $$('.drill-opt', card).forEach(x => x.disabled = true);
        answer(ok);
        card.append(el('div', { class: 'row', style: 'margin-top:10px' },
          el('span', { class: 'muted' }, ok ? 'Correct' : q.v.fr + ' = ' + q.v.en),
          el('div', { class: 'spacer' }),
          el('button', { class: 'btn primary sm', onclick: nextDrill }, 'Next →')));
      });
      card.append(b);
    }
  }

  box.append(card);
}

/* ============================================================================
   SPEAK — TTS + record yourself
   ========================================================================= */

let rec = { mr: null, chunks: [], url: null };

async function startRec() {
  const btn = $('#btnRec');
  if (rec.mr && rec.mr.state === 'recording') {
    rec.mr.stop();
    return;
  }
  if (!navigator.mediaDevices?.getUserMedia) {
    $('#recStatus').textContent = 'This browser will not give us the microphone. Recording needs an https page (GitHub Pages is fine) or localhost.';
    return;
  }
  try {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    const types = ['audio/webm', 'audio/mp4', 'audio/ogg', ''];
    const mime = types.find(t => !t || (window.MediaRecorder?.isTypeSupported?.(t))) ?? '';
    rec.chunks = [];
    rec.mr = new MediaRecorder(stream, mime ? { mimeType: mime } : undefined);
    rec.mr.ondataavailable = e => e.data.size && rec.chunks.push(e.data);
    rec.mr.onstop = () => {
      stream.getTracks().forEach(t => t.stop());
      if (rec.url) URL.revokeObjectURL(rec.url);
      rec.url = URL.createObjectURL(new Blob(rec.chunks, { type: mime || 'audio/webm' }));
      $('#btnPlayRec').disabled = false;
      $('#btnCompare').disabled = false;
      btn.textContent = '● Record';
      btn.classList.add('primary');
      $('#recStatus').textContent = 'Recorded. Play yours, then compare against the voice.';
    };
    rec.mr.start();
    btn.textContent = '■ Stop';
    btn.classList.remove('primary');
    $('#recStatus').textContent = 'Recording… say the phrase, then press stop.';
  } catch (e) {
    $('#recStatus').textContent = 'Microphone blocked: ' + (e.message || e);
  }
}

function playRec() {
  if (!rec.url) return;
  const a = new Audio(rec.url);
  a.play().catch(() => {});
  return new Promise(r => { a.onended = r; a.onerror = r; setTimeout(r, 12000); });
}

async function compare() {
  const txt = $('#phraseText').value.trim();
  if (!txt) return;
  $('#recStatus').textContent = 'Reference…';
  await say(txt, { voice: pickVoice(), rate: .9 });
  await new Promise(r => setTimeout(r, 400));
  $('#recStatus').textContent = 'You…';
  await playRec();
  $('#recStatus').textContent = 'Again? Listen for vowel length and where the stress lands.';
}

function renderPhrases() {
  const box = $('#phraseList');
  box.innerHTML = '';
  const lst = el('div', { class: 'lst' });
  for (const p of PHRASES) {
    lst.append(el('div', {},
      el('button', { class: 'play', style: 'width:34px;height:34px;font-size:12px', onclick: () => say(p.fr, { voice: pickVoice('CA'), rate: .9 }) }, '▶'),
      el('div', { class: 'grow' },
        el('div', { class: 't1' }, p.fr),
        el('div', { class: 't2' }, p.en)),
      el('button', {
        class: 'pick', title: 'Load for shadowing',
        onclick: () => { $('#phraseText').value = p.fr; window.scrollTo({ top: 0, behavior: 'smooth' }); }
      }, 'use')));
  }
  box.append(lst);
}

/* ============================================================================
   GUIDE
   ========================================================================= */

function renderGuide() {
  $('#accentFact').textContent = EXAM.accentFact;

  /* rules */
  const rb = $('#rulesBox');
  rb.innerHTML = '';
  for (const r of QC_RULES) {
    const card = el('div', { class: 'card' });
    card.append(el('h2', {}, r.title), el('p', { class: 'sub' }, r.plain));
    const t = el('table', { class: 'tbl' });
    t.append(el('thead', {}, el('tr', {},
      el('th', {}, 'Word'), el('th', {}, 'France'), el('th', {}, 'Québec'), el('th', {}, ''))));
    const tb = el('tbody');
    for (const ex of r.examples) {
      tb.append(el('tr', {},
        el('td', {}, el('strong', {}, ex.fr), ex.gloss ? el('div', { class: 'muted' }, ex.gloss) : null),
        el('td', { class: 'ipa', style: 'font-size:14px;color:var(--fr)' }, ex.ipaFR),
        el('td', { class: 'ipa', style: 'font-size:14px;color:var(--qc)' }, ex.ipaQC),
        el('td', {}, el('button', {
          class: 'pick',
          onclick: () => { $('#q').value = ex.fr.split(' / ')[0]; setLang('fr'); go('look'); doSearch(ex.fr.split(' / ')[0]); }
        }, 'hear'))));
    }
    t.append(tb);
    card.append(el('div', { class: 'scroll-x' }, t));
    rb.append(card);
  }

  /* reduced */
  const rd = $('#reducedBox');
  rd.innerHTML = '';
  for (const r of REDUCED) {
    rd.append(el('div', {},
      el('button', { class: 'play', style: 'width:32px;height:32px;font-size:11px', onclick: () => say(r.spoken.split('/')[0].trim(), { voice: pickVoice('CA'), rate: .95 }) }, '▶'),
      el('div', { class: 'grow' },
        el('div', { class: 't1' }, r.spoken, r.ipa ? el('span', { class: 'ipa', style: 'font-size:13px;color:var(--ink-3)' }, '  [' + r.ipa + ']') : null),
        el('div', { class: 't2' }, r.written + (r.note ? ' — ' + r.note : '')))));
  }

  /* qc vocab */
  const tv = $('#qcVocabTbl');
  tv.innerHTML = '';
  tv.append(el('thead', {}, el('tr', {},
    el('th', {}, 'English'), el('th', {}, 'France'), el('th', {}, 'Québec'))));
  const tb = el('tbody');
  for (const v of QC_VOCAB) {
    tb.append(el('tr', {},
      el('td', {}, v.en),
      el('td', { style: 'color:var(--fr)' }, v.fr),
      el('td', { style: 'color:var(--qc);font-weight:560' }, v.qc)));
  }
  tv.append(tb);

  /* exam */
  const eb = $('#examBox');
  eb.innerHTML = '';
  eb.append(el('h2', {}, 'Express Entry — what French buys you'));
  const crs = el('div', { class: 'lst', style: 'margin:10px 0 14px' });
  for (const c of EXAM.crs) {
    crs.append(el('div', {},
      el('span', { class: 'tag CA', style: 'font-size:13px' }, c.pts + ' CRS'),
      el('div', { class: 'grow t2' }, c.cond)));
  }
  eb.append(crs);

  for (const t of [EXAM.tef, EXAM.tcf]) {
    eb.append(el('div', { class: 'eyebrow' }, t.name, ' — ', el('span', { style: 'text-transform:none;letter-spacing:0' }, t.scale)));
    const sl = el('div', { class: 'lst', style: 'margin-bottom:10px' });
    for (const s of t.sections) {
      sl.append(el('div', {}, el('div', { class: 'grow t1' }, s.key), el('span', { class: 't2' }, s.detail)));
    }
    eb.append(sl);
    const tb2 = el('table', { class: 'tbl' });
    tb2.append(el('thead', {}, el('tr', {},
      el('th', {}, 'NCLC'), el('th', {}, 'Listening'), el('th', {}, 'Reading'), el('th', {}, 'Writing'), el('th', {}, 'Speaking'))));
    const body = el('tbody');
    for (const lvl of Object.keys(t.table).sort((a, b) => b - a)) {
      const [l, r, w, sp] = t.table[lvl];
      body.append(el('tr', { class: lvl === '7' ? 'hl' : '' },
        el('td', {}, el('strong', {}, lvl)),
        el('td', { class: 'num' }, l), el('td', { class: 'num' }, r),
        el('td', { class: 'num' }, w), el('td', { class: 'num' }, sp)));
    }
    tb2.append(body);
    eb.append(el('div', { class: 'scroll-x' }, tb2));
  }
  eb.append(el('div', { class: 'note warn' }, EXAM.note, ' ',
    el('a', { href: EXAM.irccUrl, target: '_blank', rel: 'noopener' }, 'IRCC language testing →')));
}

/* ============================================================================
   SETTINGS + self test
   ========================================================================= */

function paintDiag(rows) {
  const box = $('#diagBox');
  box.innerHTML = '';
  for (const r of rows) {
    box.append(el('div', {},
      el('span', { class: 'dot ' + r.state }),
      el('span', { class: 'grow' }, r.name),
      el('span', { class: 'muted' }, r.msg || '')));
  }
}

async function selfTest() {
  const rows = [
    { name: 'fr.wiktionary (IPA + recordings)', state: 'wait', msg: 'checking…' },
    { name: 'commons.wikimedia (audio files)', state: 'wait', msg: '' },
    { name: 'en.wiktionary (EN→FR)', state: 'wait', msg: '' },
    { name: 'Audio playback', state: 'wait', msg: '' },
    { name: 'French voice on device', state: 'wait', msg: '' },
    { name: 'Local storage', state: 'wait', msg: '' },
    { name: 'Forvo', state: 'wait', msg: '' }
  ];
  paintDiag(rows);
  const set = (i, state, msg) => { rows[i] = { ...rows[i], state, msg }; paintDiag(rows); };

  try {
    const wt = await fetchFrPage('bonjour');
    const e = parseFrEntry(wt);
    set(0, e.recs.length || e.ipas.length ? 'ok' : 'bad',
      `${e.ipas.length} IPA, ${e.recs.length} recordings for "bonjour"`);
    if (e.recs.length) {
      const info = await resolveFiles([e.recs[0].file]);
      set(1, info[0]?.url ? 'ok' : 'bad', info[0]?.url ? 'resolves file URLs' : 'no URL returned');
      const a = new Audio(info[0]?.url || '');
      a.preload = 'metadata';
      await new Promise(res => {
        a.addEventListener('loadedmetadata', () => { set(3, 'ok', a.duration.toFixed(2) + 's loaded'); res(); }, { once: true });
        a.addEventListener('error', () => { set(3, 'bad', 'could not load — try the mp3 fallback'); res(); }, { once: true });
        setTimeout(() => { set(3, 'bad', 'timed out'); res(); }, 7000);
      });
    } else { set(1, 'bad', 'nothing to resolve'); set(3, 'bad', 'no file to test'); }
  } catch (e) { set(0, 'bad', String(e.message || e)); }

  try {
    const t = await translate('car');
    set(2, t.length ? 'ok' : 'bad', t.length ? t.slice(0, 4).map(x => x.fr).join(', ') : 'no result');
  } catch (e) { set(2, 'bad', String(e.message || e)); }

  refreshVoices();
  const ca = voices.filter(v => /fr[-_]CA/i.test(v.lang));
  set(4, voices.length ? 'ok' : 'bad',
    voices.length ? `${voices.length} French voice${voices.length > 1 ? 's' : ''}${ca.length ? `, ${ca.length} Canadian` : ', none Canadian'}` : 'none installed');

  try {
    localStorage.setItem(KEY + '.t', '1'); localStorage.removeItem(KEY + '.t');
    set(5, 'ok', 'deck will persist');
  } catch (e) { set(5, 'bad', 'blocked — your deck will vanish on reload'); }

  if (!S.forvoKey.trim()) set(6, 'wait', 'no key set (optional)');
  else {
    const r = await forvo('bonjour');
    set(6, r.length ? 'ok' : 'bad',
      r.length ? r.length + ' recordings' : 'failed — likely CORS. Deploy worker/forvo-proxy.js and paste its URL below.');
  }
}

/* ============================================================================
   NAV + INIT
   ========================================================================= */

function go(view) {
  $$('nav.tabs button').forEach(b => b.setAttribute('aria-selected', String(b.dataset.view === view)));
  $$('section.view').forEach(s => s.classList.toggle('on', s.id === 'view-' + view));
  stopAudio();
  window.scrollTo({ top: 0 });
  if (view === 'deck') renderDeck();
  if (view === 'drill' && !drill.q) nextDrill();
  if (view === 'speak') { refreshVoices(); renderPhrases(); }
}

function setLang(l) {
  $$('#langSeg button').forEach(b => b.setAttribute('aria-pressed', String(b.dataset.lang === l)));
}

const STARTERS = ['tu', 'dire', 'petite', 'vite', 'lune', 'route', 'moi', 'père',
  'pâte', 'brun', 'quatre', 'dur', 'jupe', 'six', 'treize', 'Canada', 'samedi', 'tiens'];

function init() {
  load();
  if (S.theme) document.documentElement.setAttribute('data-theme', S.theme);

  /* tabs */
  $$('nav.tabs button').forEach(b => b.addEventListener('click', () => go(b.dataset.view)));

  /* search */
  $('#searchForm').addEventListener('submit', e => { e.preventDefault(); $('#q').blur(); doSearch($('#q').value); });
  $$('#langSeg button').forEach(b => b.addEventListener('click', () => setLang(b.dataset.lang)));

  const sc = $('#starterChips');
  for (const w of STARTERS) {
    sc.append(el('button', {
      class: 'chip',
      onclick: () => { $('#q').value = w; setLang('fr'); doSearch(w); }
    }, w));
  }

  /* deck */
  $('#btnReview').addEventListener('click', startReview);
  $('#btnExport').addEventListener('click', () => {
    const blob = new Blob([JSON.stringify({ deck: S.deck, drillStats: S.drillStats }, null, 2)], { type: 'application/json' });
    const a = el('a', { href: URL.createObjectURL(blob), download: 'prononce-qc-deck.json' });
    document.body.append(a); a.click(); a.remove();
  });
  $('#btnImport').addEventListener('click', () => $('#fileImport').click());
  $('#fileImport').addEventListener('change', async e => {
    const f = e.target.files?.[0]; if (!f) return;
    try {
      const d = JSON.parse(await f.text());
      if (Array.isArray(d.deck)) {
        const have = new Set(S.deck.map(x => x.fr));
        S.deck = S.deck.concat(d.deck.filter(x => x && x.fr && !have.has(x.fr)));
        S.drillStats = { ...S.drillStats, ...(d.drillStats || {}) };
        save(); renderDeck();
      }
    } catch (err) { alert('That file was not a deck export.'); }
    e.target.value = '';
  });
  $('#btnWipe').addEventListener('click', () => {
    if (confirm('Delete every saved word? This cannot be undone.')) { S.deck = []; save(); renderDeck(); }
  });

  /* drills */
  $$('#drillPick button').forEach(b => b.addEventListener('click', () => {
    $$('#drillPick button').forEach(x => x.setAttribute('aria-pressed', String(x === b)));
    drill.kind = b.dataset.drill; drill.score = { n: 0, ok: 0 }; nextDrill();
  }));

  /* speak */
  $('#btnSpeak').addEventListener('click', () => say($('#phraseText').value.trim() || 'Bonjour', { rate: 1 }));
  $('#btnSpeakSlow').addEventListener('click', () => say($('#phraseText').value.trim() || 'Bonjour', { rate: 0.65 }));
  $('#btnRec').addEventListener('click', startRec);
  $('#btnPlayRec').addEventListener('click', playRec);
  $('#btnCompare').addEventListener('click', compare);
  if ('speechSynthesis' in window) {
    speechSynthesis.addEventListener?.('voiceschanged', refreshVoices);
    speechSynthesis.onvoiceschanged = refreshVoices;
  }
  refreshVoices();
  setTimeout(refreshVoices, 700);

  /* settings */
  const dlg = $('#dlgSettings');
  $('#btnSettings').addEventListener('click', () => {
    $('#forvoKey').value = S.forvoKey || '';
    $$('#prioPick button').forEach(b => b.setAttribute('aria-pressed', String(b.dataset.prio === S.prio)));
    syncSpeedPickers();
    paintDiag([{ name: 'Press "Run check" to test every source from this device.', state: '', msg: '' }]);
    dlg.showModal();
  });
  $('#btnCloseSettings').addEventListener('click', () => dlg.close());
  $('#btnSaveSettings').addEventListener('click', () => {
    S.forvoKey = $('#forvoKey').value.trim(); save(); dlg.close();
  });
  $('#btnSelfTest').addEventListener('click', selfTest);
  $$('#prioPick button').forEach(b => b.addEventListener('click', () => {
    S.prio = b.dataset.prio; save();
    $$('#prioPick button').forEach(x => x.setAttribute('aria-pressed', String(x === b)));
  }));
  $$('#speedPick button').forEach(b => b.addEventListener('click', () => {
    S.speed = Number(b.dataset.speed); save(); syncSpeedPickers();
  }));
  $('#btnTheme').addEventListener('click', () => {
    const cur = document.documentElement.getAttribute('data-theme');
    const next = cur === 'dark' ? 'light' : cur === 'light' ? '' : 'dark';
    if (next) document.documentElement.setAttribute('data-theme', next);
    else document.documentElement.removeAttribute('data-theme');
    S.theme = next; save();
  });

  /* guide */
  renderGuide();
  renderDeck();

  /* deep link: index.html#mot */
  const h = decodeURIComponent(location.hash.replace(/^#/, ''));
  if (h) { $('#q').value = h; doSearch(h); }

  document.addEventListener('keydown', e => { if (e.key === 'Escape') stopAudio(); });
}

if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
else init();

/* expose a little surface for the test harness */
window.__pq = { deriveQC, parseFrEntry, regionOf, tokenize, grabTemplates, paramsOf, hasFrenchSection, mp3Transcode };
