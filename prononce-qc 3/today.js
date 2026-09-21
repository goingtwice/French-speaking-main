/* ============================================================================
   today.js — the daily driver, the vocabulary system, and the checkpoints
   Depends on: app.js, course.js, plan-data.js, vocab-data.js, bank-extra.js
   ========================================================================= */

'use strict';

const LISTEN_ALL = (typeof LISTEN_BANK !== 'undefined' ? LISTEN_BANK : [])
  .concat(typeof LISTEN_X !== 'undefined' ? LISTEN_X : []);
const READ_ALL = (typeof READ_BANK !== 'undefined' ? READ_BANK : [])
  .concat(typeof READ_X !== 'undefined' ? READ_X : []);

const DAY_MS = 864e5;
const todayISO = () => new Date().toISOString().slice(0, 10);
const isoToMs = s => new Date(s + 'T12:00:00').getTime();

function pstate() {
  S.plan = S.plan || { day: 0, mins: 180, startISO: null, done: {}, log: {}, examISO: null };
  S.vocab = S.vocab || { cards: {}, batch: 1 };
  if (S.plan.day == null) S.plan.day = 0;
  return S;
}

/* ------------------------------------------------------------ helpers -- */

function streak() {
  const log = S.plan.log || {};
  let n = 0;
  let d = new Date(todayISO() + 'T12:00:00').getTime();
  if (!log[new Date(d).toISOString().slice(0, 10)]) d -= DAY_MS;   // today not done yet is fine
  while (log[new Date(d).toISOString().slice(0, 10)]) { n++; d -= DAY_MS; }
  return n;
}

function elapsedDays() {
  if (!S.plan.startISO) return 0;
  return Math.floor((isoToMs(todayISO()) - isoToMs(S.plan.startISO)) / DAY_MS) + 1;
}

function dueCards() {
  const now = Date.now();
  return Object.entries(S.vocab.cards || {})
    .filter(([, c]) => isDue(c, now))
    .map(([fr]) => fr);
}

function vocabStats() {
  const cards = Object.values(S.vocab.cards || {});
  return {
    known: cards.length,
    solid: cards.filter(c => (c.box || 0) >= 4).length,
    due: dueCards().length,
    total: VOCAB_TOTAL
  };
}

/* ====================================================== TODAY RENDERING */

function renderToday() {
  pstate();
  const box = $('#todayBox');
  if (!box) return;
  box.innerHTML = '';

  if (!S.plan.day) { box.append(startCard()); return; }

  const dayNum = Math.min(S.plan.day, PLAN_DAYS);
  const plan = buildDay(dayNum, S.plan.mins);
  const wk = plan.week_;
  const blk = BLOCKS.find(b => b.b === wk.block);
  const doneList = S.plan.done[dayNum] || [];
  const allDone = doneList.length >= plan.tasks.length;

  /* --- header --- */
  const head = el('div', { class: 'card' });
  head.append(el('div', { class: 'between' },
    el('div', {},
      el('h2', { style: 'font-size:19px' }, `Day ${dayNum}`,
        el('span', { class: 'muted', style: 'font-weight:400' }, ` of ${PLAN_DAYS}`)),
      el('div', { class: 'sub', style: 'margin:2px 0 0' },
        `Week ${wk.w} · ${wk.title}`)),
    el('span', { class: 'tag ' + (plan.checkpoint ? 'CA' : plan.rest ? 'XX' : 'AF') },
      plan.checkpoint ? 'Checkpoint' : plan.rest ? 'Light day' : blk.name)));

  head.append(el('div', { class: 'bar', style: 'margin:12px 0 8px' },
    el('i', { style: 'width:' + Math.round(100 * dayNum / PLAN_DAYS) + '%' })));

  const st = streak();
  const vs = vocabStats();
  head.append(el('div', { class: 'row' },
    el('span', { class: 'score' }, st ? `${st} day streak` : 'no streak yet'),
    el('span', { class: 'score' }, `${vs.known}/${vs.total} words`),
    el('span', { class: 'score' }, `${Math.round(plan.tasks.reduce((a, t) => a + t.mins, 0))} min today`)));
  box.append(head);

  /* --- drift warning, honestly --- */
  const el_ = elapsedDays();
  if (el_ > dayNum + 6) {
    box.append(el('div', { class: 'note warn' },
      `You started ${el_} days ago and you are on day ${dayNum}. That is ${el_ - dayNum} days of drift. ` +
      `That is not a moral failing, but it does mean your finish date has moved by about the same amount — ` +
      `either raise your daily minutes in Settings or move your exam date.`));
  }

  /* --- checkpoint takes over the day --- */
  if (plan.checkpoint) {
    box.append(checkpointCard(plan.checkpoint));
  }

  /* --- the aim --- */
  box.append(el('div', { class: 'card flat' },
    el('h2', {}, 'This week'),
    el('p', { class: 'sub', style: 'margin:0 0 8px' }, wk.aim),
    el('div', { class: 'note' }, wk.note)));

  /* --- the tasks --- */
  box.append(el('div', { class: 'eyebrow' }, plan.rest ? 'Light day — do these and stop' : "Today's work"));
  const lst = el('div', { class: 'lst' });
  plan.tasks.forEach((t, i) => {
    const on = doneList.includes(i);
    const row = el('div', {});
    const cb = el('button', {
      class: 'play', style: 'width:30px;height:30px;font-size:13px;flex:none;' +
        (on ? '' : 'background:var(--surface-2);color:var(--ink-3)'),
      onclick: () => {
        const d = S.plan.done[dayNum] || [];
        S.plan.done[dayNum] = on ? d.filter(x => x !== i) : d.concat(i);
        save(); renderToday();
      }
    }, on ? '✓' : '·');

    const mod = t.ref && typeof t.ref === 'string' ? MODULES.find(m => m.id === t.ref) : null;
    const label = mod ? t.label + mod.title : t.label;

    row.append(cb, el('div', { class: 'grow' },
      el('div', { class: 't1', style: on ? 'text-decoration:line-through;opacity:.55' : '' }, label),
      el('div', { class: 't2' }, t.detail || taskHint(t, wk))));
    row.append(el('span', { class: 'score', style: 'flex:none' }, t.mins + 'm'));
    const goBtn = el('button', { class: 'pick', style: 'flex:none', onclick: () => openTask(t) }, 'go');
    row.append(goBtn);
    lst.append(row);
  });
  box.append(lst);

  /* --- finish the day --- */
  const fin = el('div', { class: 'card', style: 'margin-top:14px' });
  if (allDone) {
    fin.append(el('h2', {}, 'Day complete'),
      el('p', { class: 'sub' }, dayNum >= PLAN_DAYS
        ? 'That is the whole plan. Go and sit it.'
        : 'Log it and move to day ' + (dayNum + 1) + '.'));
    fin.append(el('button', {
      class: 'btn primary', style: 'width:100%',
      onclick: () => {
        S.plan.log[todayISO()] = dayNum;
        S.plan.day = Math.min(PLAN_DAYS, dayNum + 1);
        save(); renderToday(); window.scrollTo({ top: 0 });
      }
    }, dayNum >= PLAN_DAYS ? 'Finish the course' : 'Log today and go to day ' + (dayNum + 1)));
  } else {
    fin.append(el('h2', {}, `${doneList.length} of ${plan.tasks.length} done`),
      el('p', { class: 'sub', style: 'margin:0' }, 'Tick items as you finish them. The day logs when everything is ticked.'));
    fin.append(el('div', { class: 'row', style: 'margin-top:10px' },
      el('button', {
        class: 'btn sm', onclick: () => {
          S.plan.log[todayISO()] = dayNum;
          S.plan.day = Math.min(PLAN_DAYS, dayNum + 1);
          save(); renderToday(); window.scrollTo({ top: 0 });
        }
      }, 'Skip to next day'),
      el('div', { class: 'spacer' }),
      el('button', { class: 'btn sm', onclick: () => showWeekMap() }, 'Whole plan →')));
  }
  box.append(fin);
}

function taskHint(t, wk) {
  switch (t.kind) {
    case 'module':   return 'Read it properly, then do the drill.';
    case 'drill':    return 'Same module, drill only. Aim above 80% cold.';
    case 'review':   return 'Spaced review — do not reread, just drill it.';
    case 'practice': return 'Mixed items from everything you have covered.';
    case 'vocab':    return `Batch ${wk.vocab} plus everything due today.`;
    case 'listen':   return wk.skills.listen;
    case 'speak':    return wk.skills.speak;
    case 'read':     return wk.skills.read;
    case 'write':    return wk.skills.write;
    default:         return '';
  }
}

function openTask(t) {
  switch (t.kind) {
    case 'module': case 'drill': case 'review': {
      const m = MODULES.find(x => x.id === t.ref);
      if (m) { S.course.stage = m.stage; save(); openModuleById(m.id); go('course'); }
      break;
    }
    case 'practice':  startMixed(); go('course'); break;
    case 'vocab':     go('vocab'); startVocab(); break;
    case 'listen':    go('tests'); showPanel('listen'); break;
    case 'read':      go('tests'); showPanel('read'); break;
    case 'write':     go('tests'); showPanel('write'); break;
    case 'speak':     go('speak'); break;
    case 'checkpoint': go('tests'); runCheckpoint(t.ref); break;
  }
}

function startCard() {
  const c = el('div', { class: 'card' });
  c.append(el('h2', { style: 'font-size:20px' }, 'Zero to NCLC 7 — 26 weeks'));
  c.append(el('p', { class: 'sub' },
    'The plan is 182 days. Every day tells you exactly what to do and roughly how long it takes. ' +
    'Four checkpoints along the way tell you honestly whether you are on pace.'));

  c.append(el('div', { class: 'eyebrow', style: 'margin-top:14px' }, 'How much time do you really have each day?'));
  const seg = el('div', { class: 'seg' });
  for (const [mins, lbl] of [[90, '1.5 h'], [120, '2 h'], [180, '3 h'], [240, '4 h']]) {
    seg.append(el('button', {
      type: 'button', 'aria-pressed': String(S.plan.mins === mins),
      onclick: () => { S.plan.mins = mins; save(); renderToday(); }
    }, lbl));
  }
  c.append(seg);

  const est = Math.round(PLAN_DAYS * S.plan.mins / 60);
  c.append(el('div', { class: 'note' + (est < 450 ? ' warn' : '') },
    `At ${(S.plan.mins / 60).toFixed(1)} hours a day, 182 days gives you about ${est} hours. ` +
    (est < 450
      ? 'Zero to NCLC 7 usually needs 500–650. At this rate you will arrive short — either raise the daily time, or plan on a longer run than 26 weeks and set your exam date accordingly.'
      : 'That is inside the 500–650 hour range that zero to NCLC 7 normally needs. It is achievable if you actually do it every day.')));

  c.append(el('button', {
    class: 'btn primary', style: 'width:100%;margin-top:6px',
    onclick: () => {
      S.plan.day = 1; S.plan.startISO = todayISO(); save();
      renderToday(); window.scrollTo({ top: 0 });
    }
  }, 'Start day 1'));

  const wrap = el('div');
  wrap.append(c);
  wrap.append(el('div', { class: 'eyebrow' }, 'The six blocks'));
  const lst = el('div', { class: 'lst' });
  for (const b of BLOCKS) {
    lst.append(el('div', {},
      el('span', { class: 'score', style: 'width:44px;flex:none' }, 'W' + b.weeks),
      el('div', { class: 'grow' }, el('div', { class: 't1' }, b.name), el('div', { class: 't2' }, b.aim))));
  }
  wrap.append(lst);
  return wrap;
}

function showWeekMap() {
  const box = $('#todayBox');
  box.innerHTML = '';
  box.append(el('div', { class: 'row', style: 'margin-bottom:12px' },
    el('button', { class: 'btn sm', onclick: renderToday }, '← Today')));

  for (const b of BLOCKS) {
    box.append(el('div', { class: 'eyebrow' }, `Block ${b.b} · ${b.name} · weeks ${b.weeks}`));
    const lst = el('div', { class: 'lst' });
    for (const w of WEEKS.filter(x => x.block === b.b)) {
      const cur = Math.ceil(S.plan.day / 7) === w.w;
      const passed = Math.ceil(S.plan.day / 7) > w.w;
      lst.append(el('div', { style: cur ? 'background:var(--accent-bg)' : '' },
        el('span', { class: 'score', style: 'width:34px;flex:none' }, 'W' + w.w),
        el('div', { class: 'grow' },
          el('div', { class: 't1' }, w.title, w.checkpoint ? el('span', { class: 'tag CA', style: 'margin-left:6px' }, 'CP' + w.checkpoint) : null),
          el('div', { class: 't2' }, w.aim)),
        el('button', {
          class: 'pick', style: 'flex:none',
          onclick: () => { S.plan.day = (w.w - 1) * 7 + 1; save(); renderToday(); window.scrollTo({ top: 0 }); }
        }, passed ? 'redo' : 'jump')));
    }
    box.append(lst);
  }
}

/* ====================================================== VOCABULARY TAB */

let vsession = null;

function renderVocab() {
  pstate();
  const box = $('#vocabBox');
  if (!box) return;
  box.innerHTML = '';

  if (vsession) { box.append(vocabSession()); return; }

  const vs = vocabStats();
  const wk = WEEKS[Math.min(Math.ceil(Math.max(1, S.plan.day) / 7) - 1, WEEKS.length - 1)];
  const batchN = S.plan.day ? wk.vocab : S.vocab.batch;
  const batch = VOCAB_BATCHES.find(b => b.n === batchN) || VOCAB_BATCHES[0];

  const head = el('div', { class: 'card' });
  head.append(el('div', { class: 'between' },
    el('div', {}, el('h2', {}, 'Vocabulary'),
      el('div', { class: 'sub', style: 'margin:0' },
        `${vs.known} of ${vs.total} started · ${vs.solid} solid · ${vs.due} due now`)),
    el('span', { class: 'tag XX' }, batch.lvl)));
  head.append(el('div', { class: 'bar', style: 'margin:12px 0' },
    el('i', { style: 'width:' + Math.round(100 * vs.solid / vs.total) + '%' })));
  head.append(el('p', { class: 'sub', style: 'margin:0 0 10px' },
    `Batch ${batch.n} — ${batch.theme}`));
  head.append(el('button', {
    class: 'btn primary', style: 'width:100%',
    onclick: () => { startVocab(batch.n); }
  }, vs.due ? `Study — ${vs.due} due plus new` : 'Study batch ' + batch.n));
  box.append(head);

  box.append(el('div', { class: 'note' },
    'Cards you get right come back after 1, 2, 4, 9 then 21 days. Cards you get wrong come back tomorrow. ' +
    'Doing this daily is what moves your listening and reading scores — vocabulary is the ceiling on both.'));

  /* batch picker */
  box.append(el('div', { class: 'eyebrow' }, 'All 26 batches'));
  const lst = el('div', { class: 'lst' });
  for (const b of VOCAB_BATCHES) {
    const started = b.words.filter(([fr]) => S.vocab.cards[fr]).length;
    lst.append(el('div', { style: b.n === batch.n ? 'background:var(--accent-bg)' : '' },
      el('span', { class: 'score', style: 'width:30px;flex:none' }, b.n),
      el('div', { class: 'grow' },
        el('div', { class: 't1' }, b.theme),
        el('div', { class: 't2' }, `${b.lvl} · ${started}/${b.words.length} started`)),
      el('button', { class: 'pick', style: 'flex:none', onclick: () => startVocab(b.n) }, 'study')));
  }
  box.append(lst);

  box.append(el('div', { class: 'card flat', style: 'margin-top:14px' },
    el('h2', {}, 'Words you saved from Look up'),
    el('p', { class: 'sub', style: 'margin:0 0 10px' }, 'Your own list, separate from the course batches.'),
    el('button', { class: 'btn sm', onclick: () => go('deck') }, 'Open saved words →')));
}

function startVocab(batchN) {
  pstate();
  const now = Date.now();
  const due = dueCards().map(fr => allVocab().find(w => w.fr === fr)).filter(Boolean);
  const n = batchN || S.vocab.batch || 1;
  const fresh = batchWords(n).filter(w => !S.vocab.cards[w.fr]).slice(0, 12);
  const pool = shuffle([...due.slice(0, 25), ...fresh]);
  if (!pool.length) { vsession = { pool: batchWords(n), i: 0, ok: 0, done: [] }; }
  else vsession = { pool, i: 0, ok: 0, done: [] };
  S.vocab.batch = n; save();
  renderVocab();
}

function vocabSession() {
  const box = el('div', { class: 'card' });
  const s = vsession;

  if (s.i >= s.pool.length) {
    box.append(el('h2', {}, `${s.ok} / ${s.pool.length}`));
    box.append(el('p', { class: 'sub' }, 'Done. The ones you missed come back tomorrow; the rest are spaced out.'));
    box.append(el('div', { class: 'row' },
      el('button', { class: 'btn sm', onclick: () => { vsession = null; renderVocab(); } }, 'Back'),
      el('button', { class: 'btn primary sm', onclick: () => startVocab(S.vocab.batch) }, 'Another round')));
    return box;
  }

  const w = s.pool[s.i];
  const card = S.vocab.cards[w.fr] || {};
  box.append(el('div', { class: 'between', style: 'margin-bottom:14px' },
    el('span', { class: 'score' }, `${s.i + 1} / ${s.pool.length}`),
    el('span', { class: 'score' }, card.box ? 'box ' + card.box : 'new')));

  box.append(el('div', { style: 'font-size:27px;font-weight:640;letter-spacing:-.02em;margin-bottom:6px' }, w.fr));
  box.append(el('button', {
    class: 'btn sm', onclick: () => say(w.fr, { voice: pickVoice('CA'), rate: 0.85 })
  }, '▶ Hear it'));

  const reveal = el('div');
  box.append(el('div', { class: 'row', style: 'margin-top:16px' },
    el('button', {
      class: 'btn primary', style: 'flex:1',
      onclick: e => {
        e.currentTarget.parentElement.remove();
        reveal.append(
          el('div', { class: 'card flat', style: 'margin:0 0 12px' },
            el('div', { style: 'font-size:17px;font-weight:540' }, w.en),
            w.ex ? el('div', { class: 'sub', style: 'margin:8px 0 0' }, w.ex) : null,
            w.ex ? el('button', { class: 'pick', style: 'margin-top:6px', onclick: () => say(w.ex, { voice: pickVoice('CA'), rate: 0.85 }) }, '▶ example') : null),
          el('div', { class: 'row' },
            el('button', {
              class: 'btn sm', style: 'flex:1',
              onclick: () => grade(false)
            }, 'Missed it'),
            el('button', {
              class: 'btn primary sm', style: 'flex:1',
              onclick: () => grade(true)
            }, 'Knew it')));
      }
    }, 'Reveal')));
  box.append(reveal);

  function grade(right) {
    S.vocab.cards[w.fr] = gradeCard(S.vocab.cards[w.fr] || {}, right, Date.now());
    if (right) s.ok++;
    s.i++; save(); renderVocab();
  }
  return box;
}

/* ======================================================== CHECKPOINTS */

function checkpointCard(cp) {
  const c = el('div', { class: 'card', style: 'border-color:var(--qc)' });
  c.append(el('div', { class: 'between' },
    el('h2', { style: 'font-size:18px' }, cp.name),
    el('span', { class: 'tag CA' }, cp.target)));
  c.append(el('p', { class: 'sub', style: 'margin-top:8px' }, cp.why));
  const prev = (S.tests.checkpoints || {})[cp.id];
  if (prev) {
    c.append(el('div', { class: 'note' },
      `Last attempt: listening ${prev.listen}/${prev.listenN}, reading ${prev.read}/${prev.readN} — about NCLC ${prev.nclc}.`));
  }
  c.append(el('button', {
    class: 'btn primary', style: 'width:100%;margin-top:6px',
    onclick: () => { go('tests'); runCheckpoint(cp.id); }
  }, prev ? 'Retake checkpoint' : 'Start checkpoint'));
  return c;
}

const CP_LEVELS = {
  'listen-a1': ['A1'], 'listen-a2': ['A1', 'A2'], 'listen-b1': ['A2', 'B1'], 'listen-full': ['A1', 'A2', 'B1', 'B2'],
  'read-a1': ['A1'], 'read-a2': ['A1', 'A2'], 'read-b1': ['A2', 'B1'], 'read-full': ['A1', 'A2', 'B1', 'B2']
};

let cpRun = null;

function runCheckpoint(id) {
  const cp = CHECKPOINTS.find(c => c.id === id);
  if (!cp) return;
  const lKey = cp.sections.find(s => s.startsWith('listen'));
  const rKey = cp.sections.find(s => s.startsWith('read'));
  cpRun = {
    cp,
    listen: LISTEN_ALL.filter(x => (CP_LEVELS[lKey] || ['A1']).includes(x.lvl)),
    read: READ_ALL.filter(x => (CP_LEVELS[rKey] || ['A1']).includes(x.lvl)),
    phase: 'intro', i: 0, lOk: 0, rOk: 0
  };
  if (typeof go === 'function') go('tests');
  showPanel('checkpoint');
}

function panelCheckpoint() {
  const box = el('div');
  if (!cpRun) { box.append(el('div', { class: 'card' }, el('p', { class: 'sub' }, 'No checkpoint running.'))); return box; }
  const { cp } = cpRun;

  /* ---- intro ---- */
  if (cpRun.phase === 'intro') {
    const c = el('div', { class: 'card' });
    c.append(el('h2', { style: 'font-size:19px' }, cp.name), el('p', { class: 'sub' }, cp.why));
    const l = el('div', { class: 'lst', style: 'margin:12px 0' });
    l.append(el('div', {}, el('div', { class: 'grow t1' }, 'Listening'), el('span', { class: 't2' }, `${cpRun.listen.length} items, one play each`)));
    l.append(el('div', {}, el('div', { class: 'grow t1' }, 'Reading'), el('span', { class: 't2' }, `${cpRun.read.length} passages`)));
    if (cp.sections.includes('write-short') || cp.sections.includes('write-long'))
      l.append(el('div', {}, el('div', { class: 'grow t1' }, 'Writing'), el('span', { class: 't2' }, 'self-assessed against the checklist')));
    if (cp.sections.some(s => s.startsWith('speak')))
      l.append(el('div', {}, el('div', { class: 'grow t1' }, 'Speaking'), el('span', { class: 't2' }, 'recorded and self-assessed')));
    c.append(l);
    c.append(el('div', { class: 'note warn' },
      'Do this in one sitting, with no notes and no dictionary. A checkpoint you help yourself through tells you nothing.'));
    c.append(el('button', {
      class: 'btn primary', style: 'width:100%',
      onclick: () => { cpRun.phase = 'listen'; cpRun.i = 0; renderTests(); }
    }, 'Begin'));
    box.append(c);
    return box;
  }

  /* ---- listening / reading ---- */
  if (cpRun.phase === 'listen' || cpRun.phase === 'read') {
    const isL = cpRun.phase === 'listen';
    const pool = isL ? cpRun.listen : cpRun.read;
    if (cpRun.i >= pool.length) {
      cpRun.phase = isL ? 'read' : 'result';
      cpRun.i = 0;
      return panelCheckpoint();
    }
    const it = pool[cpRun.i];
    const c = el('div', { class: 'card' });
    c.append(el('div', { class: 'between', style: 'margin-bottom:12px' },
      el('span', { class: 'score' }, `${isL ? 'Listening' : 'Reading'} ${cpRun.i + 1} / ${pool.length}`),
      el('span', { class: 'tag XX' }, it.lvl)));

    if (isL) {
      c.append(el('button', {
        class: 'btn primary sm', style: 'margin-bottom:12px',
        onclick: e => { say(it.text, { voice: pickVoice(it.voice), rate: 1 }); e.currentTarget.disabled = true; e.currentTarget.textContent = 'played'; }
      }, '▶ Play once'));
    } else {
      c.append(el('div', {
        style: 'background:var(--surface-2);border-radius:12px;padding:14px;white-space:pre-wrap;font-size:15px;line-height:1.6;margin-bottom:14px'
      }, it.text));
    }
    c.append(el('p', { style: 'font-size:16px;font-weight:560;margin:0 0 12px' }, it.q));
    it.opts.forEach((o, k) => {
      c.append(el('button', {
        class: 'drill-opt',
        onclick: () => {
          if (k === it.a) { if (isL) cpRun.lOk++; else cpRun.rOk++; }
          cpRun.i++; renderTests();
        }
      }, el('span', { style: 'font-size:15px' }, o)));
    });
    c.append(el('div', { class: 'muted', style: 'margin-top:10px' }, 'No feedback until the end — this is a test, not practice.'));
    box.append(c);
    return box;
  }

  /* ---- result ---- */
  const lPct = Math.round(100 * cpRun.lOk / Math.max(1, cpRun.listen.length));
  const rPct = Math.round(100 * cpRun.rOk / Math.max(1, cpRun.read.length));
  const lN = nclcFromPct(lPct), rN = nclcFromPct(rPct);
  const overall = Math.min(lN, rN);
  const target = parseInt(String(cp.target).replace(/\D+/, ''), 10) || 5;
  const good = overall >= target;

  S.tests.checkpoints = S.tests.checkpoints || {};
  S.tests.checkpoints[cp.id] = {
    listen: cpRun.lOk, listenN: cpRun.listen.length,
    read: cpRun.rOk, readN: cpRun.read.length,
    lN, rN, nclc: overall, at: Date.now()
  };
  save();

  const c = el('div', { class: 'card' });
  c.append(el('h2', { style: 'font-size:19px' }, cp.name + ' — result'));
  const t = el('table', { class: 'tbl' });
  t.append(el('thead', {}, el('tr', {}, el('th', {}, 'Skill'), el('th', {}, 'Score'), el('th', {}, '%'), el('th', {}, '~NCLC'))));
  const tb = el('tbody');
  tb.append(el('tr', { class: lN >= target ? 'hl' : '' },
    el('td', {}, 'Listening'), el('td', { class: 'num' }, `${cpRun.lOk}/${cpRun.listen.length}`),
    el('td', { class: 'num' }, lPct + '%'), el('td', { class: 'num' }, String(lN))));
  tb.append(el('tr', { class: rN >= target ? 'hl' : '' },
    el('td', {}, 'Reading'), el('td', { class: 'num' }, `${cpRun.rOk}/${cpRun.read.length}`),
    el('td', { class: 'num' }, rPct + '%'), el('td', { class: 'num' }, String(rN))));
  t.append(tb);
  c.append(el('div', { class: 'scroll-x' }, t));

  c.append(el('div', { class: good ? 'note' : 'note warn' },
    el('b', {}, good ? 'On track. ' : 'Action needed. '), good ? cp.verdict.good : cp.verdict.bad));

  /* the weakest skill gets a specific instruction */
  if (lN < rN) c.append(el('div', { class: 'note warn' },
    'Listening is your weakest skill and it is the slowest to build. Add 15 minutes of daily listening from tomorrow, ' +
    'and take it from your grammar time rather than adding it on top — a plan you cannot sustain is not a plan.'));
  else if (rN < lN) c.append(el('div', { class: 'note' },
    'Reading is behind listening, which usually means vocabulary rather than comprehension. Push the vocabulary batches harder.'));

  c.append(el('div', { class: 'note' },
    'Remember this is uncalibrated. The real exams weight questions by difficulty; this converts a raw percentage. ' +
    'Treat it as a direction, not a grade.'));

  /* production sections are self-assessed */
  if (cp.sections.some(s => s.startsWith('write') || s.startsWith('speak'))) {
    c.append(el('div', { class: 'eyebrow' }, 'Now the production half'));
    c.append(el('p', { class: 'sub' },
      'Multiple choice cannot measure writing or speaking. Do these under time, then judge yourself against the checklist honestly — ' +
      'or better, get a French speaker to look at them.'));
    const row = el('div', { class: 'row' });
    if (cp.sections.some(s => s.startsWith('write')))
      row.append(el('button', { class: 'btn sm', onclick: () => showPanel('write') }, 'Writing task →'));
    if (cp.sections.some(s => s.startsWith('speak')))
      row.append(el('button', { class: 'btn sm', onclick: () => showPanel('speak') }, 'Speaking task →'));
    c.append(row);
  }

  c.append(el('div', { class: 'row', style: 'margin-top:14px' },
    el('button', { class: 'btn sm', onclick: () => { cpRun = null; showPanel(null); } }, 'Done'),
    el('button', { class: 'btn sm', onclick: () => { go('today'); renderToday(); } }, 'Back to today')));
  box.append(c);
  return box;
}

/* ============================================ mixed practice across modules */

function startMixed() {
  const pool = [];
  const upTo = MODULES.filter(m => S.course.done[m.id] || (S.course.drill[m.id]));
  const src = upTo.length ? upTo : MODULES.slice(0, 3);
  for (const m of src) {
    const extra = (typeof PRACTICE !== 'undefined' && PRACTICE[m.id]) || [];
    for (const q of [...m.drill, ...extra]) pool.push({ ...q, from: m.title });
  }
  mixed = { pool: shuffle(pool).slice(0, 15), i: 0, ok: 0 };
  openModule = null;
  renderCourse();
}

let mixed = null;

/* --------------------------------------------------------------- init -- */

function initToday() {
  pstate();
  renderToday();
  renderVocab();
}

if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', initToday);
else initToday();

window.__pqt = {
  buildDay, streak, vocabStats, startVocab, runCheckpoint, renderToday, renderVocab,
  gradeCard, isDue, dueDate, batchWords, allVocab, LISTEN_ALL, READ_ALL,
  get mixed() { return mixed; }, get cpRun() { return cpRun; },
  get vsession() { return vsession; }
};
