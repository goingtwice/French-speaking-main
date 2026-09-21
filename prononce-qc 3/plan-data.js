/* ============================================================================
   plan-data.js — the 26-week course spine
   ---------------------------------------------------------------------------
   Every week is authored, not generated: which modules, which vocabulary
   batch, which skills get worked, and why that order. Days inside a week are
   then laid out by buildDay(), which scales the workload to the hours the
   learner actually has.

   Sequencing decisions worth knowing:
     · Sounds come before everything. You cannot learn a word you cannot say.
     · Listening happens every single day from day 1. It is the slowest skill
       to build and the one that decides your listening score six months later.
     · Speaking aloud starts on day 1 too. Learners who delay it until they
       "feel ready" arrive at the speaking test having never heard their own
       French, and it shows.
     · Writing waits until week 5 — you need a verb system first.
     · Exam technique waits until week 20. Technique on top of no language is
       worthless; technique on top of B1 is worth a whole band.
     · Every new module is revisited twice at widening intervals.
   ========================================================================= */

const WEEKS = [
/* ---------------- BLOCK 1 — Sound and survival (weeks 1–4) ------------- */
{ w: 1, block: 1, title: 'The sound system',
  aim: 'Read any French word aloud and be understood. Hear where words end.',
  modules: ['a1-sounds'], review: [], vocab: 1,
  skills: { listen: 'Listen to 10 minutes of Québec radio daily. Understand nothing. That is expected — you are training your ear to find word boundaries.',
            speak: 'Read every example in the module aloud, ten times each. Record one and listen back.',
            read: 'Read the A1 vocabulary batch aloud, not silently.', write: '—' },
  note: 'This week feels unproductive and is the most important of the 26. Everything later sits on it. Do not skip ahead because it feels slow.' },

{ w: 2, block: 1, title: 'Naming things',
  aim: 'Put the right article in front of any noun and say who you are.',
  modules: ['a1-gender', 'a1-etre'], review: ['a1-sounds'], vocab: 2,
  skills: { listen: '15 min daily. Start counting how many words you catch — that number is your progress metric.',
            speak: 'Say your name, nationality, job and city aloud every morning. Twenty repetitions.',
            read: 'Vocabulary batch aloud. Say the article with every noun, always.', write: '—' },
  note: 'Learn "une table", never "table". This one habit prevents hundreds of agreement errors at B1.' },

{ w: 3, block: 1, title: 'Having, doing, being',
  aim: 'Use the three verbs that carry a third of all French sentences.',
  modules: ['a1-avoir', 'a1-er'], review: ['a1-etre'], vocab: 3,
  skills: { listen: '15 min daily. Try to catch just the verbs.',
            speak: 'Conjugate être, avoir and parler aloud, from memory, daily until instant.',
            read: 'Vocabulary batch plus the module examples.', write: '—' },
  note: 'French "has" hunger, age and cold. Getting avoir expressions automatic now saves you an obvious beginner error later.' },

{ w: 4, block: 1, title: 'The irregulars and saying no',
  aim: 'Handle aller, faire, prendre, venir, pouvoir, vouloir, devoir — and negate anything.',
  modules: ['a1-irregular', 'a1-neg'], review: ['a1-avoir', 'a1-er'], vocab: 4,
  skills: { listen: '20 min daily. Listen for "pas" — spoken French drops "ne", so "pas" is the only negative marker you will hear.',
            speak: 'Build ten sentences a day using aller + infinitive.',
            read: 'Vocabulary batch, plus reading practice item r1.', write: '—' },
  note: 'je voudrais, not je veux. Start the polite habit now so it is automatic in the speaking test.' },

/* ---------------- BLOCK 2 — Full A1 and first checkpoint (weeks 5–8) --- */
{ w: 5, block: 2, title: 'Asking for things',
  aim: 'Ask ten good questions in a row — literally the speaking Section A task.',
  modules: ['a1-questions'], review: ['a1-irregular', 'a1-neg'], vocab: 5,
  skills: { listen: '20 min daily plus listening items l1–l2.',
            speak: 'Pick a scenario. Ask ten questions aloud. Record. Count the different question forms you used.',
            read: 'Reading item r1.', write: 'First writing: five sentences about your day. Rough is fine.' },
  note: 'Writing starts this week. It will be bad. Write it anyway — the errors are the curriculum.' },

{ w: 6, block: 2, title: 'Numbers and description',
  aim: 'Catch prices, dates and times at speed. Describe things with correct agreement.',
  modules: ['a1-numbers', 'a1-adj'], review: ['a1-questions', 'a1-gender'], vocab: 6,
  skills: { listen: 'Listening items l1–l4. Write down every number you hear before answering.',
            speak: 'Read the time aloud every time you check your phone. All week.',
            read: 'Reading items r1–r2.', write: 'Describe your flat in eight sentences.' },
  checkpoint: 1,
  note: 'Checkpoint 1 at the end of this week. It will feel early. That is the point — an early honest score beats a late optimistic guess.' },

{ w: 7, block: 2, title: 'Prepositions, and the depuis trap',
  aim: 'Stop making the most common written error in beginner French.',
  modules: ['a1-prep'], review: ['a1-numbers', 'a1-adj'], vocab: 7,
  skills: { listen: '20 min daily plus items l3–l5.',
            speak: 'Describe your route to work aloud, using au, à la, en, depuis.',
            read: 'Reading items r1–r3.', write: 'Where you live, how long, how you got there. 80 words.' },
  note: '"J\'habite ici depuis trois ans" — present tense. English speakers say this wrong for years. Fix it in week 7 instead.' },

{ w: 8, block: 2, title: 'Consolidation',
  aim: 'Every A1 module scoring above 80% cold, with no notes.',
  modules: [], review: ['a1-sounds', 'a1-gender', 'a1-etre', 'a1-avoir', 'a1-er', 'a1-irregular', 'a1-neg', 'a1-questions', 'a1-numbers', 'a1-adj', 'a1-prep'],
  vocab: 8,
  skills: { listen: 'All listening items at A1 and A2 level.', speak: 'Five minutes of unbroken French daily, on any subject, recorded.',
            read: 'All A1 and A2 reading items.', write: 'Two 80-word texts.' },
  note: 'No new grammar this week. Consolidation weeks are where the previous seven actually stick. Resist the urge to push forward.' },

/* ---------------- BLOCK 3 — A2, the past, checkpoint 2 (weeks 9–13) ---- */
{ w: 9, block: 3, title: 'The past, part one',
  aim: 'Say what happened, using avoir.',
  modules: ['a2-pc-avoir'], review: ['a1-irregular'], vocab: 9,
  skills: { listen: '25 min daily. Listen for "j\'ai" and "il a" followed by a participle.',
            speak: 'Narrate yesterday aloud, every evening, all week.',
            read: 'Reading items r2–r3.', write: 'What you did yesterday. 80 words.' },
  note: 'The irregular participles — pris, fait, mis, dit, vu, eu, été — are a memorisation job. Do twenty a day until they are automatic.' },

{ w: 10, block: 3, title: 'The past, part two',
  aim: 'Get être verbs and their agreement right.',
  modules: ['a2-pc-etre', 'a2-reflexive'], review: ['a2-pc-avoir'], vocab: 10,
  skills: { listen: '25 min daily plus items l3–l6.', speak: 'Narrate your morning routine using reflexive verbs in the past.',
            read: 'Reading items r3–r4.', write: 'A day that went wrong. 100 words.' },
  note: 'Agreement is mostly silent but always written. Markers check it specifically — it is a cheap band.' },

{ w: 11, block: 3, title: 'The other past — and the real skill',
  aim: 'Choose between imparfait and passé composé without thinking.',
  modules: ['a2-imparfait'], review: ['a2-pc-etre'], vocab: 11,
  skills: { listen: '25 min daily. Listen for "était", "avait", "faisait" — background information.',
            speak: 'Describe your childhood in the imparfait for three minutes, recorded.',
            read: 'Reading items r3–r4.', write: 'A childhood memory, deliberately mixing both tenses. 120 words.' },
  note: 'This distinction alone separates NCLC 5 writing from NCLC 7 writing. Give it the whole week and then some.' },

{ w: 12, block: 3, title: 'Pronouns and the future',
  aim: 'Stop repeating nouns. Talk about plans.',
  modules: ['a2-pronouns', 'a2-futur'], review: ['a2-imparfait'], vocab: 12,
  skills: { listen: '25 min daily plus all A2 listening items.', speak: 'Describe your plans for the next year. Three minutes, recorded, no notes.',
            read: 'All A1 and A2 reading items.', write: 'Your plans after arriving in Canada. 120 words.' },
  checkpoint: 2,
  note: 'Checkpoint 2 at the end of this week, and it carries a real decision: whether to sit an actual exam for a baseline score.' },

{ w: 13, block: 3, title: 'Comparison and joining ideas',
  aim: 'Stop writing lists of short sentences.',
  modules: ['a2-compare', 'a2-connect'], review: ['a2-pronouns', 'a2-futur'], vocab: 13,
  skills: { listen: '25 min daily. Listen for connectors — they carry the logic.',
            speak: 'Compare two cities aloud for three minutes.',
            read: 'Reading item r3, marking every connector.', write: 'Compare life in two countries. 150 words with at least six connectors.' },
  note: 'Coherence is a separately scored criterion. Twenty connectors learned properly move your band more than two hundred new nouns.' },

/* ---------------- BLOCK 4 — B1, the NCLC 7 machinery (weeks 14–19) ----- */
{ w: 14, block: 4, title: 'Politeness and hypothesis',
  aim: 'Sound like an adult rather than a phrasebook.',
  modules: ['b1-conditionnel'], review: ['a2-connect'], vocab: 14,
  skills: { listen: '30 min daily. Listen for conditional forms in news reports — they signal unverified claims.',
            speak: 'Speaking prompt s1, fully, recorded. Count your polite forms.',
            read: 'Reading item r4.', write: 'A formal request email. 120 words.' },
  note: 'Every "je veux" you replace with "je voudrais" is a sociolinguistic mark. It is scored separately from grammar.' },

{ w: 15, block: 4, title: 'If, then',
  aim: 'Build conditional arguments without the tenses slipping.',
  modules: ['b1-si'], review: ['b1-conditionnel'], vocab: 15,
  skills: { listen: '30 min daily plus B1 listening items.', speak: 'Argue for something using "si nous faisions X, nous pourrions Y". Five minutes.',
            read: 'Reading items r4–r5.', write: 'What you would do with a year off. 150 words.' },
  note: 'Never si + conditional. "Si j\'aurais" is the single most recognisable English-speaker error in French.' },

{ w: 16, block: 4, title: 'Subjunctive — forms',
  aim: 'Produce the six irregulars without pausing.',
  modules: ['b1-subj-form'], review: ['b1-si'], vocab: 16,
  skills: { listen: '30 min daily. Listen for "soit", "ait", "puisse", "fasse".',
            speak: 'Ten "il faut que je…" sentences aloud, daily.',
            read: 'Reading item r5.', write: 'What has to change in your city. 150 words.' },
  note: 'sois, aie, aille, fasse, puisse, sache. Six forms. Drill them like a times table.' },

{ w: 17, block: 4, title: 'Subjunctive — use, and relatives',
  aim: 'Deploy it correctly a few times, and build long sentences that stay grammatical.',
  modules: ['b1-subj-use', 'b1-relative'], review: ['b1-subj-form'], vocab: 17,
  skills: { listen: '30 min daily plus all B1 items.', speak: 'Speaking prompt s3, recorded, then listen back for errors.',
            read: 'Reading items r5–r6.', write: 'An opinion piece. 180 words, with one correct subjunctive.' },
  note: 'One clean subjunctive is worth more than five forced ones. Accuracy beats frequency here.' },

{ w: 18, block: 4, title: 'Register and impersonal structures',
  aim: 'Write in the neutral-formal register the exam expects.',
  modules: ['b1-passive', 'b1-register'], review: ['b1-subj-use', 'b1-relative'], vocab: 18,
  skills: { listen: '30 min daily, alternating formal news and casual Québec speech.',
            speak: 'Speaking prompt s2. vous throughout. Recorded.',
            read: 'Reading item r2, noting every formal phrase.', write: 'A formal complaint letter with the full opening and closing formulas. 200 words.' },
  note: 'Memorise "Je vous prie d\'agréer, Madame, Monsieur, mes salutations distinguées." exactly. It is free marks.' },

{ w: 19, block: 4, title: 'B1 consolidation',
  aim: 'Every B1 module above 80% cold.',
  modules: [], review: ['b1-conditionnel', 'b1-si', 'b1-subj-form', 'b1-subj-use', 'b1-relative', 'b1-passive', 'b1-register'],
  vocab: 19,
  skills: { listen: 'Every listening item, timed, one play only.', speak: 'One full speaking prompt daily, recorded and reviewed.',
            read: 'Every reading item, timed.', write: 'Two 200-word opinion pieces.' },
  checkpoint: 3,
  note: 'Checkpoint 3 at the end of this week. This is where you find out whether NCLC 7 is in range for your date.' },

/* ---------------- BLOCK 5 — B2 and technique (weeks 20–24) ------------- */
{ w: 20, block: 5, title: 'Arguing like a native',
  aim: 'Concede and rebut — the move that marks a B2 answer.',
  modules: ['b2-argument'], review: ['a2-connect', 'b1-register'], vocab: 20,
  skills: { listen: '30 min daily, focused on debate and opinion content.',
            speak: 'Practise "Certes… néanmoins…" aloud until it is reflex.',
            read: 'Reading items r5–r6, identifying the concession in each.', write: 'TEF Section B prompt w2, timed at 35 minutes.' },
  note: 'Certes… mais. Learn to give ground before you take it. Markers reward it explicitly.' },

{ w: 21, block: 5, title: 'Nuance, and clearing the errors',
  aim: 'Stop sounding absolute. Remove the mistakes that quietly cap your band.',
  modules: ['b2-nuance', 'b2-errors'], review: ['b2-argument'], vocab: 21,
  skills: { listen: '30 min daily plus every B2 listening item.', speak: 'Speaking prompt s5, timed and recorded.',
            read: 'Reading items r5–r6, timed.', write: 'TCF task 3 prompt w5, timed.' },
  note: 'actuellement, éventuellement, sensible, librairie, passer un examen. Faux amis are graded errors, not charming slips.' },

{ w: 22, block: 5, title: 'Complex structures',
  aim: 'Compress three sentences into one that reads well.',
  modules: ['b2-complex', 'b2-pqp'], review: ['b2-nuance', 'b2-errors'], vocab: 22,
  skills: { listen: '30 min daily, timed items only.', speak: 'Speaking prompt s3, handling the objection directly.',
            read: 'All reading items, timed.', write: 'A 200-word piece using a gérondif and one type-3 si clause.' },
  note: '"Si j\'avais su, je ne serais pas venu." Get one of these into your essay and the marker sees B2.' },

{ w: 23, block: 5, title: 'Exam format and listening technique',
  aim: 'Stop losing questions you actually understood.',
  modules: ['x-choose', 'x-co'], review: ['b2-complex', 'b2-pqp'], vocab: 23,
  skills: { listen: 'Every listening item, one play, timed, no exceptions.', speak: 'Speaking prompt s4 — your self-introduction, twenty repetitions until flawless.',
            read: 'All reading items under time pressure.', write: 'TEF Section A prompt w1, timed at 25 minutes.' },
  note: 'Decide TEF or TCF this week and stop reconsidering. Format familiarity is worth real marks and you only get it by committing.' },

{ w: 24, block: 5, title: 'Reading technique and the templates',
  aim: 'Finish every section in time, with the writing and speaking skeletons automatic.',
  modules: ['x-ce'], review: ['x-co', 'b1-register'], vocab: 24,
  skills: { listen: 'Full timed listening sets, twice this week.', speak: 'Both speaking sections for your chosen exam, timed, recorded, reviewed.',
            read: 'Full timed reading sets, twice.', write: 'Both writing sections for your chosen exam, timed.' },
  note: 'Templates should now be muscle memory. If you are still thinking about structure during a timed write, drill the skeleton more.' },

/* ---------------- BLOCK 6 — Mocks and taper (weeks 25–26) -------------- */
{ w: 25, block: 6, title: 'Full mocks',
  aim: 'NCLC 7 in all four, twice in a row, under exam conditions.',
  modules: [], review: ['x-co', 'x-ce', 'b2-argument', 'b1-register'], vocab: 25,
  skills: { listen: 'Full section, exam timing, one play.', speak: 'Full speaking test simulated end to end, recorded.',
            read: 'Full section, exam timing.', write: 'Full writing section, exam timing, handwritten if your test is on paper.' },
  checkpoint: 4,
  note: 'Checkpoint 4: the full mock. Book the exam only if two consecutive mocks clear NCLC 7 in every skill. Not three out of four.' },

{ w: 26, block: 6, title: 'Taper',
  aim: 'Arrive sharp, not exhausted.',
  modules: [], review: ['b2-errors', 'b1-register', 'x-co'], vocab: 26,
  skills: { listen: '30 min daily of enjoyable French. No timed sets.', speak: 'Your self-introduction and one role-play daily. Keep the mouth warm.',
            read: 'Light reading only.', write: 'Review your own past essays. Do not write new ones.' },
  note: 'Do not cram. Review only your own errors. Sleep is worth more than another mock in the final week.' }
];

/* ------------------------------------------------------- checkpoints --- */

const CHECKPOINTS = [
{ id: 1, week: 6, day: 42, name: 'Checkpoint 1 — the honest baseline', target: 'NCLC 3–4',
  why: 'Six weeks in, you cannot pass anything yet. The point is not the score — it is finding out whether your listening is tracking, because listening is the skill that will still be behind in month five if it is behind now.',
  sections: ['listen-a1', 'read-a1', 'write-short'],
  verdict: {
    good: 'Listening at or above 50% this early means your ear is developing. Keep the daily habit exactly as it is.',
    bad: 'Below 40% on listening at week 6 is the one result worth acting on. Double your daily listening from 20 to 40 minutes for the next block, even at the cost of grammar time.'
  }},

{ id: 2, week: 12, day: 84, name: 'Checkpoint 2 — the decision point', target: 'NCLC 4–5',
  why: 'Twelve weeks in with the past tenses done. This is where you decide whether to sit a real exam for a baseline. A real attempt costs the fee and about six weeks of turnaround, but it puts a score on record, gives you exam-day experience with nothing at stake, and produces diagnostic data no practice test can match.',
  sections: ['listen-a2', 'read-a2', 'write-short', 'speak-intro'],
  verdict: {
    good: 'NCLC 5 in range. Sitting a real exam now is defensible — you will likely score 5, which is useful for some provincial streams and removes exam-day nerves from your real attempt.',
    bad: 'Below NCLC 4 overall. Do not book anything. Push to checkpoint 3 and reassess — an early failed attempt buys nothing but a receipt.'
  }},

{ id: 3, week: 19, day: 133, name: 'Checkpoint 3 — is NCLC 7 in range', target: 'NCLC 6–7',
  why: 'B1 is done. This is the checkpoint that tells you whether your exam date is realistic. There is still time to move the date if it is not — in seven weeks there is not.',
  sections: ['listen-b1', 'read-b1', 'write-long', 'speak-argue'],
  verdict: {
    good: 'NCLC 6 or better across the board with seven weeks left is on pace. Shift the emphasis to B2 language and timed practice.',
    bad: 'NCLC 5 or below in any skill means NCLC 7 in seven weeks is unlikely for that skill. Decide now: move the date, or accept a lower band. Both are better than sitting it and failing.'
  }},

{ id: 4, week: 25, day: 175, name: 'Checkpoint 4 — book or delay', target: 'NCLC 7+',
  why: 'Full mock under exam conditions. This is a go/no-go, not a progress check.',
  sections: ['listen-full', 'read-full', 'write-long', 'speak-argue'],
  verdict: {
    good: 'NCLC 7 in all four. Do it again next week under the same conditions. Two consecutive clears means book.',
    bad: 'Any skill below 7. Delaying costs weeks; failing costs the fee, six weeks of turnaround, and the weeks anyway. Delay.'
  }}
];

/* ------------------------------------------------------ day builder ---- */

/* Fixed daily habits, in minutes, at the reference load of 3 h/day. */
const DAILY_BASE = [
  { kind: 'vocab',  label: 'Vocabulary — new batch and review',       mins: 20 },
  { kind: 'listen', label: 'Listening — the non-negotiable daily one', mins: 30 },
  { kind: 'speak',  label: 'Speak aloud and record',                   mins: 20 }
];

const REF_MINUTES = 180;   // the plan is authored against 3 h a day

/**
 * Lay out one day.
 * @param {number} dayNum 1-based day of the course
 * @param {number} minsPerDay the learner's real budget
 */
function buildDay(dayNum, minsPerDay = REF_MINUTES) {
  const wIdx = Math.floor((dayNum - 1) / 7);
  const week = WEEKS[Math.min(wIdx, WEEKS.length - 1)];
  const dow = ((dayNum - 1) % 7) + 1;          // 1..7
  const scale = Math.max(0.35, Math.min(2, minsPerDay / REF_MINUTES));
  const m = x => Math.max(5, Math.round(x * scale / 5) * 5);

  const cp = week.checkpoint && dow === 7 ? CHECKPOINTS.find(c => c.id === week.checkpoint) : null;
  const tasks = [];

  if (cp) {
    tasks.push({ kind: 'checkpoint', ref: cp.id, label: cp.name, mins: m(90) });
    tasks.push({ kind: 'vocab', label: 'Vocabulary review only', mins: m(15) });
    return { day: dayNum, week: week.w, dow, rest: false, checkpoint: cp, week_: week, tasks };
  }

  // day 7 of a normal week is deliberately light — recovery is part of the plan
  if (dow === 7) {
    tasks.push({ kind: 'vocab',  label: 'Vocabulary review — no new words', mins: m(20) });
    tasks.push({ kind: 'listen', label: 'Listening for pleasure. No exercises.', mins: m(30) });
    return { day: dayNum, week: week.w, dow, rest: true, week_: week, tasks };
  }

  const mods = week.modules || [];
  const revs = week.review || [];

  // New modules are introduced on days 1 and 3; their drills repeat on 2 and 4.
  if (mods[0] && (dow === 1 || dow === 2)) {
    tasks.push({ kind: dow === 1 ? 'module' : 'drill', ref: mods[0],
                 label: (dow === 1 ? 'Study: ' : 'Re-drill: '), mins: m(dow === 1 ? 45 : 25) });
  }
  if (mods[1] && (dow === 3 || dow === 4)) {
    tasks.push({ kind: dow === 3 ? 'module' : 'drill', ref: mods[1],
                 label: (dow === 3 ? 'Study: ' : 'Re-drill: '), mins: m(dow === 3 ? 45 : 25) });
  } else if (mods[0] && !mods[1] && (dow === 3 || dow === 4)) {
    tasks.push({ kind: 'drill', ref: mods[0], label: 'Re-drill: ', mins: m(25) });
  }

  // Spaced review of earlier material, spread across the week
  if (revs.length) {
    const r = revs[(dow - 1) % revs.length];
    tasks.push({ kind: 'review', ref: r, label: 'Spaced review: ', mins: m(20) });
  }

  // Days 5 and 6 are practice-heavy
  if (dow === 5) tasks.push({ kind: 'practice', label: 'Mixed practice — this week and last', mins: m(30) });
  if (dow === 6) tasks.push({ kind: 'practice', label: 'Week consolidation — every module from this week', mins: m(40) });

  // Fixed habits
  for (const b of DAILY_BASE) tasks.push({ ...b, mins: m(b.mins) });

  // Skill work: reading midweek, writing at the end of the week
  if (week.skills.read && week.skills.read !== '—' && (dow === 2 || dow === 5))
    tasks.push({ kind: 'read', label: 'Reading practice', mins: m(20), detail: week.skills.read });
  if (week.skills.write && week.skills.write !== '—' && (dow === 4 || dow === 6))
    tasks.push({ kind: 'write', label: 'Writing practice', mins: m(35), detail: week.skills.write });

  // A day must genuinely add up to the budget the learner set. Anything left
  // over becomes named work rather than vanishing — a plan that quietly
  // schedules two hours while claiming three is how people arrive short.
  const used = tasks.reduce((a, t) => a + t.mins, 0);
  const gap = minsPerDay - used;
  if (gap >= 15) {
    const fillers = [
      { kind: 'listen', label: 'Extra listening — same sources, longer',
        detail: 'The single highest-return use of spare time. Volume beats technique here.' },
      { kind: 'vocab',  label: 'Extra vocabulary — work ahead into the next batch',
        detail: 'Vocabulary is the ceiling on your reading and listening scores.' },
      { kind: 'speak',  label: 'Extra speaking — read aloud and record',
        detail: 'Read any French text aloud for the full time. Record the last two minutes and listen back.' },
      { kind: 'read',   label: 'Extra reading — untimed, for volume',
        detail: 'Read anything French. Do not look up every word; guess from context and keep going.' },
      { kind: 'practice', label: 'Extra practice — mixed items from earlier weeks',
        detail: 'Retrieval beats rereading. Always.' }
    ];
    const f = fillers[(dayNum + dow) % fillers.length];
    tasks.push({ ...f, mins: Math.round(gap / 5) * 5 });
  }

  return { day: dayNum, week: week.w, dow, rest: false, week_: week, tasks };
}

const PLAN_DAYS = WEEKS.length * 7;   // 182

/* Blocks, for the overview screen */
const BLOCKS = [
  { b: 1, name: 'Sound and survival',    weeks: '1–4',   aim: 'Read French aloud, name things, use the three core verbs.' },
  { b: 2, name: 'Complete A1',           weeks: '5–8',   aim: 'Ask questions, handle numbers and description. First checkpoint.' },
  { b: 3, name: 'The past, and A2',      weeks: '9–13',  aim: 'Narrate. Pronouns, futures, connectors. The decision-point checkpoint.' },
  { b: 4, name: 'B1 — the NCLC 7 machinery', weeks: '14–19', aim: 'Conditional, subjunctive, relatives, register. Is 7 in range?' },
  { b: 5, name: 'B2 and technique',      weeks: '20–24', aim: 'Argumentation, nuance, exam format, templates automatic.' },
  { b: 6, name: 'Mocks and taper',       weeks: '25–26', aim: 'Two clean mocks, then arrive sharp.' }
];
