/* ============================================================================
   course.js — the Course and Tests tabs
   Depends on: app.js (S, save, el, $, $$, say, pickVoice, go)
               course-a.js, course-b.js, exam-data.js
   ========================================================================= */

'use strict';

const MODULES = [].concat(
  typeof COURSE_A !== 'undefined' ? COURSE_A : [],
  typeof COURSE_B !== 'undefined' ? COURSE_B : []
);

const STAGES = [
  { k: 'A1',   label: 'A1 · Foundations', blurb: 'Sounds, articles, present tense, questions. Start here if French is new.' },
  { k: 'A2',   label: 'A2 · Past & future', blurb: 'The two past tenses, pronouns, connectors. Where real sentences begin.' },
  { k: 'B1',   label: 'B1 · Structure', blurb: 'Conditional, subjunctive, relatives, register. The NCLC 7 machinery.' },
  { k: 'B2',   label: 'B2 · Exam grade', blurb: 'Argumentation, nuance, and clearing the errors that cap your score.' },
  { k: 'EXAM', label: 'Exam technique', blurb: 'Format, timing, traps, and what each section actually rewards.' }
];

/* ------------------------------------------------------------ state ---- */

function cstate() {
  S.course = S.course || { done: {}, drill: {}, stage: 'A1' };
  S.tests  = S.tests  || { placement: null, results: [], drafts: {} };
  return S;
}

/* ------------------------------------------------- answer normalising -- */

const stripAccents = s => s.normalize('NFD').replace(/[̀-ͯ]/g, '');

function norm(s) {
  return String(s || '')
    .toLowerCase()
    .replace(/[’‘]/g, "'")
    .replace(/[«»"]/g, '')
    .replace(/\s+/g, ' ')
    .replace(/[.!?;:]+$/, '')
    .trim();
}

/** returns 'exact' | 'accents' | 'no' */
function judge(input, accepted) {
  const list = Array.isArray(accepted) ? accepted : [accepted];
  const g = norm(input);
  if (!g) return 'no';
  for (const a of list) if (g === norm(a)) return 'exact';
  for (const a of list) if (stripAccents(g) === stripAccents(norm(a))) return 'accents';
  return 'no';
}

/* ====================================================== COURSE RENDERING */

let openModule = null;

function openModuleById(id) {
  const m = MODULES.find(x => x.id === id);
  if (!m) return;
  openModule = m;
  renderCourse();
  window.scrollTo({ top: 0 });
}

function renderCourse() {
  cstate();
  const box = $('#courseBox');
  if (!box) return;
  box.innerHTML = '';

  if (typeof mixed !== 'undefined' && mixed) { box.append(mixedView()); return; }
  if (openModule) { box.append(moduleView(openModule)); return; }

  /* progress */
  const total = MODULES.length;
  const done = MODULES.filter(m => S.course.done[m.id]).length;
  const mins = MODULES.filter(m => !S.course.done[m.id]).reduce((a, m) => a + m.mins, 0);

  const head = el('div', { class: 'card' });
  head.append(el('div', { class: 'between' },
    el('div', {}, el('h2', {}, 'Your course'),
      el('div', { class: 'sub', style: 'margin:0' },
        `${done} of ${total} modules done · about ${Math.round(mins / 60)} h of first-pass study left`)),
    el('button', { class: 'btn sm', onclick: () => { go('tests'); showPanel('plan'); } }, 'Study plan')));
  head.append(el('div', { class: 'bar', style: 'margin-top:12px' },
    el('i', { style: 'width:' + Math.round(100 * done / total) + '%' })));
  box.append(head);

  /* stage chips */
  const chips = el('div', { class: 'chips', style: 'margin-bottom:14px' });
  for (const s of STAGES) {
    const n = MODULES.filter(m => m.stage === s.k).length;
    const d = MODULES.filter(m => m.stage === s.k && S.course.done[m.id]).length;
    chips.append(el('button', {
      class: 'chip', 'aria-pressed': String(S.course.stage === s.k),
      onclick: () => { S.course.stage = s.k; save(); renderCourse(); }
    }, `${s.k}  ${d}/${n}`));
  }
  box.append(chips);

  const st = STAGES.find(s => s.k === S.course.stage) || STAGES[0];
  box.append(el('div', { class: 'card flat' },
    el('h2', {}, st.label), el('p', { class: 'sub', style: 'margin:0' }, st.blurb)));

  /* module list */
  const list = el('div', { class: 'lst' });
  for (const m of MODULES.filter(x => x.stage === S.course.stage)) {
    const isDone = !!S.course.done[m.id];
    const sc = S.course.drill[m.id];
    list.append(el('div', {},
      el('span', {
        class: 'play', style: 'width:30px;height:30px;font-size:13px;flex:none;' +
          (isDone ? '' : 'background:var(--surface-2);color:var(--ink-3)')
      }, isDone ? '✓' : '·'),
      el('button', {
        class: 'grow', style: 'text-align:left;background:none;border:0;padding:0;font:inherit;color:inherit;cursor:pointer',
        onclick: () => { openModule = m; renderCourse(); window.scrollTo({ top: 0 }); }
      },
        el('div', { class: 't1' }, m.title),
        el('div', { class: 't2' }, m.goal)),
      el('span', { class: 'score' }, sc ? `${sc.ok}/${sc.n}` : m.mins + 'm')));
  }
  box.append(list);
}

function moduleView(m) {
  const wrap = el('div');

  wrap.append(el('div', { class: 'row', style: 'margin-bottom:12px' },
    el('button', { class: 'btn sm', onclick: () => { openModule = null; renderCourse(); } }, '← All modules'),
    el('div', { class: 'spacer' }),
    el('span', { class: 'tag ' + (m.stage === 'EXAM' ? 'CA' : 'FR') }, m.stage)));

  const head = el('div', { class: 'card' });
  head.append(el('h2', { style: 'font-size:21px' }, m.title));
  head.append(el('p', { class: 'sub', style: 'margin:6px 0 0' }, m.goal));
  head.append(el('p', { class: 'muted', style: 'margin:8px 0 0' }, 'About ' + m.mins + ' minutes for a first pass.'));
  wrap.append(head);

  for (const b of m.blocks) {
    wrap.append(el('div', { class: 'card flat' },
      el('h2', {}, b.h),
      el('p', { class: 'sub', style: 'margin:0', html: b.p })));
  }

  if (m.table) {
    const t = el('table', { class: 'tbl' });
    t.append(el('thead', {}, el('tr', {}, ...m.table.head.map(h => el('th', {}, h)))));
    const tb = el('tbody');
    for (const r of m.table.rows) tb.append(el('tr', {}, ...r.map(c => el('td', {}, c))));
    t.append(tb);
    wrap.append(el('div', { class: 'card flat' }, el('div', { class: 'scroll-x' }, t)));
  }

  if (m.ex && m.ex.length) {
    wrap.append(el('div', { class: 'eyebrow' }, 'Examples — tap to hear'));
    const lst = el('div', { class: 'lst' });
    for (const e of m.ex) {
      lst.append(el('div', {},
        el('button', {
          class: 'play', style: 'width:32px;height:32px;font-size:11px',
          onclick: () => say(e.fr, { voice: pickVoice('CA'), rate: 0.85 })
        }, '▶'),
        el('div', { class: 'grow' }, el('div', { class: 't1' }, e.fr), el('div', { class: 't2' }, e.en))));
    }
    wrap.append(lst);
  }

  wrap.append(el('div', { class: 'eyebrow' }, 'Check yourself'));
  wrap.append(drillView(m));
  return wrap;
}

/* ------------------------------------------------- mixed practice ------ */

function mixedView() {
  const box = el('div', { class: 'card' });

  function paint() {
    box.innerHTML = '';
    if (!mixed) return;
    if (mixed.i >= mixed.pool.length) {
      const pct = Math.round(100 * mixed.ok / mixed.pool.length);
      box.append(el('h2', {}, `${mixed.ok} / ${mixed.pool.length}`),
        el('p', { class: 'sub' }, pct >= 80
          ? 'Solid retention. Keep moving.'
          : pct >= 60
            ? 'Shaky in places. Reopen the modules you missed rather than pushing ahead.'
            : 'Below 60% on material you have already covered means it has not stuck. Redo those modules before new ones.'),
        el('div', { class: 'row' },
          el('button', { class: 'btn sm', onclick: () => { startMixed(); } }, 'Another set'),
          el('button', { class: 'btn primary sm', onclick: () => { mixed = null; renderCourse(); } }, 'Back')));
      return;
    }
    const q = mixed.pool[mixed.i];
    box.append(el('div', { class: 'between', style: 'margin-bottom:10px' },
      el('span', { class: 'score' }, `${mixed.i + 1} / ${mixed.pool.length}`),
      el('span', { class: 'muted' }, q.from || '')));
    box.append(el('p', { style: 'font-size:16px;font-weight:540;margin:0 0 14px;white-space:pre-wrap' }, q.q));

    const after = el('div');
    const settle = (right, extra) => {
      if (right) mixed.ok++;
      after.innerHTML = '';
      after.append(el('div', { class: right ? 'note' : 'note warn' },
        (right ? '✓ ' : '✕ ') + (extra ? extra + ' ' : '') + q.why));
      after.append(el('div', { class: 'row' }, el('div', { class: 'spacer' }),
        el('button', { class: 'btn primary sm', onclick: () => { mixed.i++; paint(); } }, 'Next →')));
    };

    if (q.t === 'mc') {
      q.opts.forEach((o, k) => {
        const b = el('button', { class: 'drill-opt' }, el('span', { style: 'font-size:15px' }, o));
        b.addEventListener('click', () => {
          const right = k === q.a;
          b.classList.add(right ? 'right' : 'wrong');
          if (!right) $$('.drill-opt', box)[q.a]?.classList.add('right');
          $$('.drill-opt', box).forEach(x => x.disabled = true);
          settle(right);
        });
        box.append(b);
      });
    } else {
      const inp = el('input', { type: 'text', autocapitalize: 'off', autocorrect: 'off', spellcheck: 'false', placeholder: 'Type your answer…' });
      const want = Array.isArray(q.a) ? q.a[0] : q.a;
      const check = () => {
        const v = judge(inp.value, q.a);
        inp.disabled = true; btn.disabled = true;
        if (v === 'exact') settle(true);
        else if (v === 'accents') settle(true, `Right, but mind the accents — "${want}".`);
        else settle(false, `The answer is "${want}".`);
      };
      inp.addEventListener('keydown', e => { if (e.key === 'Enter') check(); });
      const btn = el('button', { class: 'btn primary sm', onclick: check }, 'Check');
      box.append(inp, el('div', { class: 'row', style: 'margin-top:10px' }, btn,
        el('button', { class: 'btn sm', onclick: () => { inp.disabled = true; btn.disabled = true; settle(false, `The answer is "${want}".`); } }, 'Skip')));
    }
    box.append(after);
  }

  paint();
  return box;
}

/* ------------------------------------------------------------- drills -- */

function drillView(m) {
  const box = el('div', { class: 'card' });
  const extra = (typeof PRACTICE !== 'undefined' && PRACTICE[m.id]) || [];
  const items = m.drill.concat(extra);
  let i = 0, ok = 0;

  function paint() {
    box.innerHTML = '';
    if (i >= items.length) {
      const pct = Math.round(100 * ok / items.length);
      S.course.drill[m.id] = { ok, n: items.length };
      if (pct >= 70) S.course.done[m.id] = true;
      save();
      box.append(el('h2', {}, `${ok} / ${items.length}`),
        el('p', { class: 'sub' }, pct >= 70
          ? 'Solid. Module marked complete — come back in a few days and redo it cold.'
          : 'Below 70%, so this one stays open. Reread the explanations above and run it again.'),
        el('div', { class: 'row' },
          el('button', { class: 'btn sm', onclick: () => { i = 0; ok = 0; paint(); } }, 'Again'),
          el('button', { class: 'btn primary sm', onclick: () => { openModule = null; renderCourse(); } }, 'Back to modules')));
      return;
    }

    const q = items[i];
    box.append(el('div', { class: 'between', style: 'margin-bottom:10px' },
      el('span', { class: 'score' }, `${i + 1} / ${items.length}`),
      el('span', { class: 'score' }, `${ok} right`)));
    box.append(el('p', { style: 'font-size:16px;font-weight:540;margin:0 0 14px;white-space:pre-wrap' }, q.q));

    const after = el('div');
    const settle = (right, extra) => {
      if (right) ok++;
      after.innerHTML = '';
      after.append(el('div', { class: right ? 'note' : 'note warn' },
        (right ? '✓ ' : '✕ ') + (extra ? extra + ' ' : '') + q.why));
      after.append(el('div', { class: 'row' }, el('div', { class: 'spacer' }),
        el('button', { class: 'btn primary sm', onclick: () => { i++; paint(); } },
          i + 1 >= items.length ? 'See score →' : 'Next →')));
    };

    if (q.t === 'mc') {
      q.opts.forEach((o, k) => {
        const b = el('button', { class: 'drill-opt' }, el('span', { style: 'font-size:15px' }, o));
        b.addEventListener('click', () => {
          const right = k === q.a;
          b.classList.add(right ? 'right' : 'wrong');
          if (!right) $$('.drill-opt', box)[q.a]?.classList.add('right');
          $$('.drill-opt', box).forEach(x => x.disabled = true);
          settle(right);
        });
        box.append(b);
      });
    } else {
      const inp = el('input', { type: 'text', autocapitalize: 'off', autocorrect: 'off', spellcheck: 'false', placeholder: 'Type your answer…' });
      const go2 = () => {
        const v = judge(inp.value, q.a);
        inp.disabled = true; btn.disabled = true;
        const want = (Array.isArray(q.a) ? q.a[0] : q.a);
        if (v === 'exact') settle(true);
        else if (v === 'accents') settle(true, `Right, but mind the accents — "${want}".`);
        else settle(false, `The answer is "${want}".`);
      };
      inp.addEventListener('keydown', e => { if (e.key === 'Enter') go2(); });
      const btn = el('button', { class: 'btn primary sm', onclick: go2 }, 'Check');
      box.append(inp, el('div', { class: 'row', style: 'margin-top:10px' }, btn,
        el('button', { class: 'btn sm', onclick: () => { inp.disabled = true; btn.disabled = true; settle(false, `The answer is "${Array.isArray(q.a) ? q.a[0] : q.a}".`); } }, 'Skip')));
      setTimeout(() => inp.focus(), 60);
    }
    box.append(after);
  }

  paint();
  return box;
}

/* ======================================================= TESTS RENDERING */

let panel = null;

function showPanel(p) { panel = p; renderTests(); window.scrollTo({ top: 0 }); }

function renderTests() {
  cstate();
  const box = $('#testsBox');
  if (!box) return;
  box.innerHTML = '';

  if (panel) {
    box.append(el('div', { class: 'row', style: 'margin-bottom:12px' },
      el('button', { class: 'btn sm', onclick: () => { panel = null; renderTests(); } }, '← All practice')));
    const fn = { place: panelPlacement, listen: panelListen, read: panelRead,
                 write: panelWrite, speak: panelSpeak, tmpl: panelTemplates, plan: panelPlan,
                 checkpoint: (typeof panelCheckpoint === 'function' ? panelCheckpoint : null) }[panel];
    if (fn) box.append(fn());
    return;
  }

  const p = S.tests.placement;
  const head = el('div', { class: 'card' });
  head.append(el('h2', {}, 'Practice & mocks'),
    el('p', { class: 'sub' }, p
      ? `Last placement check: about ${p.level}. ${p.ok}/${p.n} correct.`
      : 'Start with the placement check so the course points you at the right stage.'));
  head.append(el('button', { class: 'btn primary', style: 'width:100%', onclick: () => showPanel('place') },
    p ? 'Redo placement check' : 'Take the placement check'));
  box.append(head);

  const cards = [
    { k: 'listen', t: 'Listening practice', d: `${(typeof LISTEN_ALL !== 'undefined' ? LISTEN_ALL : LISTEN_BANK).length} items read aloud by your device voice, across A1 to B2. Transcript hidden until you answer.` },
    { k: 'read',   t: 'Reading practice',   d: `${(typeof READ_ALL !== 'undefined' ? READ_ALL : READ_BANK).length} passages in exam format — notices, letters, articles, argument texts.` },
    { k: 'write',  t: 'Writing practice',   d: 'Real prompts with a timer, live word count and the marker\'s checklist.' },
    { k: 'speak',  t: 'Speaking practice',  d: 'Role-play cards with a countdown and a recorder, for both exams.' },
    { k: 'tmpl',   t: 'Templates',          d: 'Fill-in frameworks for every writing and speaking task in both exams.' },
    { k: 'plan',   t: 'Study plan',         d: 'The honest hour count from zero to NCLC 7, phase by phase.' }
  ];
  const lst = el('div', { class: 'lst' });
  for (const c of cards) {
    lst.append(el('div', {},
      el('button', {
        class: 'grow', style: 'text-align:left;background:none;border:0;padding:0;font:inherit;color:inherit;cursor:pointer',
        onclick: () => showPanel(c.k)
      }, el('div', { class: 't1' }, c.t), el('div', { class: 't2' }, c.d)),
      el('span', { class: 'muted' }, '›')));
  }
  box.append(lst);

  if (S.tests.results.length) {
    box.append(el('div', { class: 'eyebrow' }, 'Recent practice'));
    const r = el('div', { class: 'lst' });
    for (const x of S.tests.results.slice(-8).reverse()) {
      r.append(el('div', {},
        el('div', { class: 'grow' }, el('div', { class: 't1' }, x.what),
          el('div', { class: 't2' }, new Date(x.at).toLocaleDateString())),
        el('span', { class: 'tag ' + (x.nclc >= 7 ? 'AF' : 'XX') }, 'NCLC ~' + x.nclc),
        el('span', { class: 'score' }, `${x.ok}/${x.n}`)));
    }
    box.append(r);
    box.append(el('div', { class: 'note warn' }, BANDS.note));
  }
}

function logResult(what, ok, n) {
  const pct = Math.round(100 * ok / n);
  const nclc = nclcFromPct(pct);
  S.tests.results.push({ what, ok, n, pct, nclc, at: Date.now() });
  if (S.tests.results.length > 60) S.tests.results.shift();
  save();
  return nclc;
}

/* --------------------------------------------------------- placement --- */

function panelPlacement() {
  const box = el('div', { class: 'card' });
  let i = 0, ok = 0; const byLvl = {};

  function paint() {
    box.innerHTML = '';
    if (i >= PLACEMENT.length) {
      // highest level where at least 3 of 5 correct
      let level = 'A1 — start at the beginning';
      const order = ['A1', 'A2', 'B1', 'B2'];
      let best = null;
      for (const L of order) {
        const s = byLvl[L] || { ok: 0, n: 0 };
        if (s.n && s.ok / s.n >= 0.6) best = L;
      }
      if (best === 'A1') level = 'A2';
      else if (best === 'A2') level = 'B1';
      else if (best === 'B1') level = 'B2';
      else if (best === 'B2') level = 'B2+ — go straight to exam technique';
      else level = 'A1';

      S.tests.placement = { ok, n: PLACEMENT.length, level, at: Date.now() };
      save();

      box.append(el('h2', {}, `${ok} / ${PLACEMENT.length} correct`));
      const t = el('table', { class: 'tbl' });
      t.append(el('thead', {}, el('tr', {}, el('th', {}, 'Level'), el('th', {}, 'Score'))));
      const tb = el('tbody');
      for (const L of order) {
        const s = byLvl[L] || { ok: 0, n: 0 };
        tb.append(el('tr', {}, el('td', {}, L), el('td', { class: 'num' }, `${s.ok}/${s.n}`)));
      }
      t.append(tb);
      box.append(el('div', { class: 'scroll-x' }, t));
      box.append(el('div', { class: 'note' }, 'Start the course at stage ' + level + '. If in doubt, start one stage lower — foundations are cheap to redo and expensive to skip.'));
      box.append(el('div', { class: 'row' },
        el('button', { class: 'btn primary sm', onclick: () => { panel = null; S.course.stage = level.slice(0, 2); save(); go('course'); renderCourse(); renderTests(); } }, 'Go to that stage'),
        el('button', { class: 'btn sm', onclick: () => { i = 0; ok = 0; for (const k in byLvl) delete byLvl[k]; paint(); } }, 'Redo')));
      return;
    }

    const q = PLACEMENT[i];
    box.append(el('div', { class: 'between', style: 'margin-bottom:10px' },
      el('span', { class: 'score' }, `${i + 1} / ${PLACEMENT.length}`),
      el('span', { class: 'tag XX' }, q.lvl)));
    box.append(el('p', { style: 'font-size:17px;font-weight:540;margin:0 0 14px' }, q.q));
    q.opts.forEach((o, k) => {
      const b = el('button', { class: 'drill-opt' }, el('span', { style: 'font-size:15px' }, o));
      b.addEventListener('click', () => {
        byLvl[q.lvl] = byLvl[q.lvl] || { ok: 0, n: 0 };
        byLvl[q.lvl].n++;
        const right = k === q.a;
        if (right) { ok++; byLvl[q.lvl].ok++; }
        i++; paint();
      });
      box.append(b);
    });
  }
  paint();
  return box;
}

/* ---------------------------------------------------------- listening -- */

function panelListen() {
  const wrap = el('div');
  let pool = (typeof LISTEN_ALL !== 'undefined' ? LISTEN_ALL : LISTEN_BANK).slice(), i = 0, ok = 0;

  const box = el('div', { class: 'card' });
  wrap.append(box);

  function paint() {
    box.innerHTML = '';
    if (i >= pool.length) {
      const n = nclcFromPct(Math.round(100 * ok / pool.length));
      logResult('Listening practice', ok, pool.length);
      box.append(el('h2', {}, `${ok} / ${pool.length}`),
        el('p', { class: 'sub' }, 'Rough indication: NCLC ' + n + '.'),
        el('div', { class: 'note warn' }, BANDS.note),
        el('button', { class: 'btn primary sm', onclick: () => { i = 0; ok = 0; pool = pool.slice().sort(() => Math.random() - .5); paint(); } }, 'Again, shuffled'));
      return;
    }
    const it = pool[i];
    box.append(el('div', { class: 'between', style: 'margin-bottom:12px' },
      el('span', { class: 'score' }, `${i + 1} / ${pool.length}`),
      el('span', { class: 'tag ' + (it.voice === 'CA' ? 'CA' : 'FR') }, it.voice === 'CA' ? 'Québec voice' : 'France voice')));

    box.append(el('p', { class: 'muted', style: 'margin:0 0 10px' }, 'Level ' + it.lvl + '. Read the question first, then play. Try to answer on one listen — that is the exam.'));
    box.append(el('p', { style: 'font-size:16px;font-weight:560;margin:0 0 12px' }, it.q));
    box.append(el('div', { class: 'row', style: 'margin-bottom:14px' },
      el('button', { class: 'btn primary sm', onclick: () => say(it.text, { voice: pickVoice(it.voice), rate: 1 }) }, '▶ Play'),
      el('button', { class: 'btn sm', onclick: () => say(it.text, { voice: pickVoice(it.voice), rate: 0.75 }) }, '▶ Slow')));

    const after = el('div');
    it.opts.forEach((o, k) => {
      const b = el('button', { class: 'drill-opt' }, el('span', { style: 'font-size:15px' }, o));
      b.addEventListener('click', () => {
        const right = k === it.a;
        if (right) ok++;
        b.classList.add(right ? 'right' : 'wrong');
        if (!right) $$('.drill-opt', box)[it.a]?.classList.add('right');
        $$('.drill-opt', box).forEach(x => x.disabled = true);
        after.append(el('div', { class: right ? 'note' : 'note warn' }, it.why));
        after.append(el('details', {}, el('summary', {}, 'Show transcript'),
          el('p', { class: 'sub', style: 'margin:8px 0 0;white-space:pre-wrap' }, it.text)));
        after.append(el('div', { class: 'row' }, el('div', { class: 'spacer' }),
          el('button', { class: 'btn primary sm', onclick: () => { i++; paint(); } }, 'Next →')));
      });
      box.append(b);
    });
    box.append(after);
    if (!voices.length) box.append(el('div', { class: 'note warn' },
      'No French voice is installed on this device, so nothing will play. Settings ⚙ → Run check explains how to add one.'));
  }
  paint();
  return wrap;
}

/* ------------------------------------------------------------ reading -- */

function panelRead() {
  const wrap = el('div');
  const rpool = (typeof READ_ALL !== 'undefined' ? READ_ALL : READ_BANK);
  let i = 0, ok = 0;
  const box = el('div', { class: 'card' });
  wrap.append(box);

  function paint() {
    box.innerHTML = '';
    if (i >= rpool.length) {
      const n = nclcFromPct(Math.round(100 * ok / rpool.length));
      logResult('Reading practice', ok, rpool.length);
      box.append(el('h2', {}, `${ok} / ${rpool.length}`),
        el('p', { class: 'sub' }, 'Rough indication: NCLC ' + n + '.'),
        el('div', { class: 'note warn' }, BANDS.note),
        el('button', { class: 'btn primary sm', onclick: () => { i = 0; ok = 0; paint(); } }, 'Again'));
      return;
    }
    const it = rpool[i];
    box.append(el('div', { class: 'between', style: 'margin-bottom:12px' },
      el('span', { class: 'score' }, `${i + 1} / ${rpool.length}`),
      el('span', { class: 'tag XX' }, it.lvl)));
    box.append(el('div', {
      style: 'background:var(--surface-2);border-radius:12px;padding:14px;white-space:pre-wrap;font-size:15px;line-height:1.6;margin-bottom:14px'
    }, it.text));
    box.append(el('p', { style: 'font-size:16px;font-weight:560;margin:0 0 12px' }, it.q));

    const after = el('div');
    it.opts.forEach((o, k) => {
      const b = el('button', { class: 'drill-opt' }, el('span', { style: 'font-size:15px' }, o));
      b.addEventListener('click', () => {
        const right = k === it.a;
        if (right) ok++;
        b.classList.add(right ? 'right' : 'wrong');
        if (!right) $$('.drill-opt', box)[it.a]?.classList.add('right');
        $$('.drill-opt', box).forEach(x => x.disabled = true);
        after.append(el('div', { class: right ? 'note' : 'note warn' }, it.why));
        after.append(el('div', { class: 'row' }, el('div', { class: 'spacer' }),
          el('button', { class: 'btn primary sm', onclick: () => { i++; paint(); } }, 'Next →')));
      });
      box.append(b);
    });
    box.append(after);
  }
  paint();
  return wrap;
}

/* ------------------------------------------------------------ writing -- */

let timerId = null;
function countdown(seconds, onTick, onDone) {
  if (timerId) clearInterval(timerId);
  let left = seconds;
  onTick(left);
  timerId = setInterval(() => {
    left--; onTick(left);
    if (left <= 0) { clearInterval(timerId); timerId = null; onDone && onDone(); }
  }, 1000);
}
const mmss = s => `${Math.floor(Math.max(0, s) / 60)}:${String(Math.max(0, s) % 60).padStart(2, '0')}`;

function panelWrite() {
  const wrap = el('div');
  const sel = el('div', { class: 'chips', style: 'margin-bottom:14px' });
  const host = el('div');

  WRITE_PROMPTS.forEach((p, k) => {
    sel.append(el('button', {
      class: 'chip', 'aria-pressed': String(k === 0),
      onclick: e => {
        $$('button', sel).forEach(b => b.setAttribute('aria-pressed', String(b === e.currentTarget)));
        host.innerHTML = ''; host.append(writeTask(p));
      }
    }, `${p.exam} ${p.section}`));
  });
  wrap.append(sel, host);
  host.append(writeTask(WRITE_PROMPTS[0]));
  return wrap;
}

function writeTask(p) {
  const box = el('div', { class: 'card' });
  box.append(el('div', { class: 'between' },
    el('h2', {}, `${p.exam} — Section ${p.section}`),
    el('span', { class: 'score', id: 'wClock' }, mmss(p.mins * 60))));
  box.append(el('p', { class: 'sub', style: 'white-space:pre-wrap;margin-top:8px' }, p.prompt));
  box.append(el('div', { class: 'note' }, `${p.min} words minimum · aim for ${p.target} · ${p.mins} minutes`));

  const ta = el('textarea', { style: 'min-height:220px', placeholder: 'Écrivez ici…' });
  const draftKey = 'w:' + p.id;
  ta.value = S.tests.drafts[draftKey] || '';

  const count = el('span', { class: 'score' });
  const upd = () => {
    const w = ta.value.trim() ? ta.value.trim().split(/\s+/).length : 0;
    count.textContent = `${w} words`;
    count.style.color = w >= p.min ? 'var(--ok)' : 'var(--ink-3)';
    S.tests.drafts[draftKey] = ta.value; save();
  };
  ta.addEventListener('input', upd);

  box.append(ta);
  box.append(el('div', { class: 'row', style: 'margin-top:10px' },
    count, el('div', { class: 'spacer' }),
    el('button', {
      class: 'btn sm', onclick: e => {
        const clock = $('#wClock');
        countdown(p.mins * 60, s => { if (clock) clock.textContent = mmss(s); },
          () => { if (clock) clock.textContent = 'time'; });
        e.currentTarget.textContent = '⏱ running';
      }
    }, '⏱ Start timer'),
    el('button', { class: 'btn sm', onclick: () => { ta.value = ''; upd(); } }, 'Clear')));
  upd();

  box.append(el('div', { class: 'eyebrow' }, "The marker's checklist"));
  const lst = el('div', { class: 'lst' });
  for (const c of p.check) {
    const cb = el('input', { type: 'checkbox', style: 'width:auto;flex:none;transform:scale(1.2);margin-right:4px' });
    lst.append(el('div', {}, cb, el('div', { class: 'grow t2' }, c)));
  }
  box.append(lst);

  box.append(el('div', { class: 'row', style: 'margin-top:12px' },
    el('button', { class: 'btn sm', onclick: () => showPanel('tmpl') }, 'Open the template →')));
  return box;
}

/* ----------------------------------------------------------- speaking -- */

function panelSpeak() {
  const wrap = el('div');
  const sel = el('div', { class: 'chips', style: 'margin-bottom:14px' });
  const host = el('div');
  SPEAK_PROMPTS.forEach((p, k) => {
    sel.append(el('button', {
      class: 'chip', 'aria-pressed': String(k === 0),
      onclick: e => {
        $$('button', sel).forEach(b => b.setAttribute('aria-pressed', String(b === e.currentTarget)));
        host.innerHTML = ''; host.append(speakTask(p));
      }
    }, `${p.exam} ${p.section}`));
  });
  wrap.append(sel, host);
  host.append(speakTask(SPEAK_PROMPTS[0]));
  return wrap;
}

function speakTask(p) {
  const box = el('div', { class: 'card' });
  const clock = el('span', { class: 'score' }, mmss(p.mins * 60));
  box.append(el('div', { class: 'between' }, el('h2', {}, `${p.exam} — Section ${p.section}`), clock));
  box.append(el('p', { class: 'sub', style: 'white-space:pre-wrap;margin-top:8px' }, p.prompt));

  box.append(el('div', { class: 'row', style: 'margin:12px 0' },
    el('button', {
      class: 'btn primary sm',
      onclick: () => countdown(p.mins * 60, s => clock.textContent = mmss(s), () => clock.textContent = 'time')
    }, '⏱ Start'),
    el('button', { class: 'btn sm', onclick: () => { $('#phraseText').value = p.prompt; go('speak'); } }, 'Recorder →')));

  box.append(el('div', { class: 'note' },
    'Speak out loud for the full time. Use the recorder in the Speak tab and listen back — you will hear your own hesitations far more clearly than you feel them.'));

  box.append(el('div', { class: 'eyebrow' }, 'What the examiner is listening for'));
  const lst = el('div', { class: 'lst' });
  for (const c of p.check) lst.append(el('div', {}, el('div', { class: 'grow t2' }, c)));
  box.append(lst);
  return box;
}

/* ---------------------------------------------------------- templates -- */

function panelTemplates() {
  const wrap = el('div');
  const all = [...WRITE_TEMPLATES, ...SPEAK_TEMPLATES];
  const sel = el('div', { class: 'chips', style: 'margin-bottom:14px' });
  const host = el('div');
  all.forEach((t, k) => {
    sel.append(el('button', {
      class: 'chip', 'aria-pressed': String(k === 0),
      onclick: e => {
        $$('button', sel).forEach(b => b.setAttribute('aria-pressed', String(b === e.currentTarget)));
        host.innerHTML = ''; host.append(templateView(t));
      }
    }, t.title.replace(/^(TEF|TCF) (Expression )?/, '').replace('écrite — ', 'EE ').replace('orale — ', 'EO ')));
  });
  wrap.append(sel, host);
  host.append(templateView(all[0]));
  return wrap;
}

function templateView(t) {
  const box = el('div');
  const head = el('div', { class: 'card' });
  head.append(el('h2', {}, t.title), el('p', { class: 'sub' }, t.brief));
  const lst = el('div', { class: 'lst' });
  for (const s of t.specs) lst.append(el('div', {}, el('div', { class: 'grow t2' }, s)));
  head.append(lst);
  box.append(head);

  box.append(el('div', { class: 'eyebrow' }, 'The skeleton'));
  t.structure.forEach((s, k) => {
    const c = el('div', { class: 'card flat' });
    c.append(el('div', { class: 'between' },
      el('h2', {}, `${k + 1}. ${s.step}`),
      el('button', { class: 'pick', onclick: () => say(s.model, { voice: pickVoice('CA'), rate: 0.9 }) }, '▶')));
    c.append(el('p', { class: 'sub', style: 'margin:4px 0 8px' }, s.how));
    c.append(el('p', {
      style: 'background:var(--surface-2);border-radius:10px;padding:11px 13px;margin:0;font-size:14.5px;line-height:1.6'
    }, s.model));
    box.append(c);
  });

  box.append(el('div', { class: 'eyebrow' }, 'Phrases to memorise'));
  const ph = el('div', { class: 'card flat' });
  const chips = el('div', { class: 'chips' });
  for (const p of t.phrases) {
    chips.append(el('button', { class: 'chip', onclick: () => say(p, { voice: pickVoice('CA'), rate: 0.9 }) }, p));
  }
  ph.append(chips);
  box.append(ph);

  box.append(el('div', { class: 'note warn' }, el('b', {}, 'The trap: '), t.trap));
  return box;
}

/* --------------------------------------------------------------- plan -- */

function panelPlan() {
  const box = el('div');
  const head = el('div', { class: 'card' });
  head.append(el('h2', {}, PLAN.headline), el('p', { class: 'sub' }, PLAN.hours));
  const t = el('table', { class: 'tbl' });
  t.append(el('thead', {}, el('tr', {}, el('th', {}, 'If you have'), el('th', {}, 'You need'))));
  const tb = el('tbody');
  for (const m of PLAN.maths) tb.append(el('tr', {}, el('td', {}, m.window), el('td', {}, m.daily)));
  t.append(tb);
  head.append(el('div', { class: 'scroll-x' }, t));
  head.append(el('div', { class: 'note warn' }, PLAN.honest));
  box.append(head);

  box.append(el('div', { class: 'eyebrow' }, 'A day that works'));
  const d = el('div', { class: 'lst' });
  for (const x of PLAN.daily) {
    d.append(el('div', {}, el('span', { class: 'score', style: 'width:56px;flex:none' }, x.t),
      el('div', { class: 'grow t2' }, x.what)));
  }
  box.append(d);

  box.append(el('div', { class: 'eyebrow' }, 'The phases'));
  for (const p of PLAN.phases) {
    const c = el('div', { class: 'card flat' });
    c.append(el('div', { class: 'between' }, el('h2', {}, p.name), el('span', { class: 'muted' }, p.weeks)));
    const ul = el('div', { class: 'lst', style: 'margin:10px 0' });
    for (const x of p.do) ul.append(el('div', {}, el('div', { class: 'grow t2' }, x)));
    c.append(ul);
    c.append(el('div', { class: 'note' }, el('b', {}, 'Milestone: '), p.milestone));
    c.append(el('div', { class: 'row', style: 'margin-top:10px' },
      ...p.stages.map(s => el('button', {
        class: 'btn sm',
        onclick: () => { S.course.stage = s; save(); go('course'); renderCourse(); }
      }, 'Go to ' + s))));
    box.append(c);
  }
  return box;
}

/* --------------------------------------------------------------- init -- */

function initCourse() {
  cstate();
  renderCourse();
  renderTests();
}

if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', initCourse);
else initCourse();

window.__pqc = { judge, norm, nclcFromPct, MODULES, showPanel, openModuleById,
  get mixedOn() { return typeof mixed !== 'undefined' && !!mixed; } };
