/* ============================================================================
   course-b.js — Stage B1, B2 and exam-technique modules
   Same module shape as course-a.js.
   ========================================================================= */

const COURSE_B = [

/* ========================= B1 ========================= */
{
  id: 'b1-conditionnel', stage: 'B1', title: 'Conditionnel — politeness and hypothesis', mins: 40,
  goal: 'Sound polite instead of blunt. This alone lifts your speaking score.',
  blocks: [
    { h: 'Future stem + imparfait endings',
      p: 'Take the future stem, add <b>-ais, -ais, -ait, -ions, -iez, -aient</b>. <b>je parlerais, je serais, j\'aurais, je pourrais, je voudrais, je devrais, il faudrait</b>. If you know the future, you already know this.' },
    { h: 'Politeness is its main job in the exam',
      p: 'Direct requests sound rude. <b>Je veux</b> → <b>je voudrais</b>. <b>Pouvez-vous</b> → <b>pourriez-vous</b>. <b>Vous devez</b> → <b>vous devriez</b>. The examiner in speaking Section A is a receptionist; a candidate who says "je veux un rendez-vous" loses sociolinguistic marks.' },
    { h: 'Hypothesis and suggestion',
      p: '<b>À votre place, je ferais autrement.</b> <b>Ce serait une bonne idée.</b> <b>Il faudrait envisager une autre solution.</b> This is the register of speaking Section B, where you argue without being aggressive.' },
    { h: 'Reporting unconfirmed information',
      p: 'News French uses the conditional for anything unverified: <b>le gouvernement annoncerait une réforme</b> = the government is reportedly going to announce a reform. Recognise this in reading and listening — it is not a hypothetical, it is a hedge.' }
  ],
  table: {
    head: ['Blunt', 'Polite', 'English'],
    rows: [
      ['Je veux', 'Je voudrais', 'I would like'],
      ['Pouvez-vous ?', 'Pourriez-vous ?', 'Could you?'],
      ['Vous devez', 'Vous devriez', 'You should'],
      ['Il faut', 'Il faudrait', 'It would be necessary'],
      ['Je peux ?', 'Serait-il possible de… ?', 'Would it be possible to…?']
    ]
  },
  ex: [
    { fr: 'Je voudrais savoir si vous auriez un créneau cette semaine.', en: 'I would like to know whether you would have a slot this week.' },
    { fr: 'Serait-il possible de reporter le rendez-vous ?', en: 'Would it be possible to postpone the appointment?' },
    { fr: 'À votre place, je commencerais par vérifier le dossier.', en: 'In your position, I would start by checking the file.' }
  ],
  drill: [
    { t: 'fill', q: '___-vous m\'aider ? (polite form of pouvoir)', a: ['pourriez'], why: 'pouvoir → pourr- + -iez.' },
    { t: 'fill', q: 'Il ___ (falloir) trouver une autre solution.', a: ['faudrait'], why: 'falloir → faudr- + -ait. A very useful hedging phrase.' },
    { t: 'mc', q: 'With an examiner, which is best?', opts: ['Je veux un rendez-vous', 'Je voudrais prendre rendez-vous', 'Donnez-moi un rendez-vous'], a: 1, why: 'Conditional + the fixed phrase "prendre rendez-vous". Register is explicitly marked.' },
    { t: 'trans', q: 'Would it be possible to postpone?', a: ['serait-il possible de reporter', 'est-ce qu\'il serait possible de reporter'], why: 'Memorise this frame — it works for almost any speaking Section A request.' }
  ]
},

{
  id: 'b1-si', stage: 'B1', title: 'Si clauses — the three patterns', mins: 45,
  goal: 'Build conditional arguments without the tense slipping.',
  blocks: [
    { h: 'Three fixed combinations',
      p: 'These are mechanical. Learn the pairings and never mix them.' },
    { h: 'Never a conditional directly after si',
      p: 'This is the single most common error. <b>Si j\'aurais</b> is wrong — it is <b>si j\'avais</b>. English "if I would have" does not translate across.' },
    { h: 'Why it matters for the exam',
      p: 'Type 2 (<b>si + imparfait → conditionnel</b>) is the natural way to propose and persuade in speaking Section B: <b>Si nous choisissions cette option, nous gagnerions du temps.</b> Type 3 expresses regret and is a clear B2 marker in writing.' }
  ],
  table: {
    head: ['Type', 'si clause', 'main clause', 'Example'],
    rows: [
      ['1 — real', 'présent', 'futur / présent / impératif', "S'il pleut, je prendrai un taxi."],
      ['2 — hypothetical', 'imparfait', 'conditionnel présent', "Si j'avais le temps, je viendrais."],
      ['3 — regret', 'plus-que-parfait', 'conditionnel passé', "Si j'avais su, je serais venu."]
    ]
  },
  ex: [
    { fr: "Si j'obtiens le niveau requis, je déposerai ma demande en mars.", en: 'If I get the required level, I will submit my application in March.' },
    { fr: "Si nous choisissions cette option, nous gagnerions beaucoup de temps.", en: 'If we chose this option, we would save a lot of time.' },
    { fr: "Si j'avais commencé plus tôt, je n'aurais pas eu ce problème.", en: 'If I had started earlier, I would not have had this problem.' }
  ],
  drill: [
    { t: 'mc', q: "Si j'___ le temps, je viendrais.", opts: ['aurais', 'avais', 'aurai'], a: 1, why: 'Type 2: si + imparfait, main clause conditional. Never si + conditional.' },
    { t: 'fill', q: "S'il pleut demain, je ___ (prendre) un taxi.", a: ['prendrai'], why: 'Type 1: si + present, main clause future.' },
    { t: 'fill', q: "Si j'avais su, je ___ (venir) plus tôt.", a: ['serais venu', 'serais venue'], why: 'Type 3: plus-que-parfait + conditionnel passé.' },
    { t: 'trans', q: 'If we chose this option, we would save time.', a: ['si nous choisissions cette option, nous gagnerions du temps', 'si on choisissait cette option, on gagnerait du temps'], why: 'The persuasion structure for speaking Section B.' }
  ]
},

{
  id: 'b1-subj-form', stage: 'B1', title: 'Subjonctif — the forms', mins: 45,
  goal: 'Produce the forms automatically so you can focus on when to use them.',
  blocks: [
    { h: 'Built from the ils form',
      p: 'Take the <b>ils</b> form of the present, drop <b>-ent</b>, add <b>-e, -es, -e, -ions, -iez, -ent</b>. <b>ils parlent</b> → <b>que je parle</b>. <b>ils finissent</b> → <b>que je finisse</b>. For nous and vous, use the imparfait forms.' },
    { h: 'Six irregulars carry most of the weight',
      p: '<b>être</b> (que je sois), <b>avoir</b> (que j\'aie), <b>aller</b> (que j\'aille), <b>faire</b> (que je fasse), <b>pouvoir</b> (que je puisse), <b>savoir</b> (que je sache). Also <b>vouloir</b> (que je veuille) and <b>falloir</b> (qu\'il faille).' },
    { h: 'Good news for the listening test',
      p: 'For -er verbs the subjunctive sounds identical to the present in four of six persons. You mostly need it for <i>writing</i> and for recognising <b>soit, ait, aille, fasse, puisse</b> when you hear them.' }
  ],
  table: {
    head: ['', 'être', 'avoir', 'aller', 'faire', 'pouvoir', 'savoir'],
    rows: [
      ['que je', 'sois', 'aie', 'aille', 'fasse', 'puisse', 'sache'],
      ['que tu', 'sois', 'aies', 'ailles', 'fasses', 'puisses', 'saches'],
      ["qu'il", 'soit', 'ait', 'aille', 'fasse', 'puisse', 'sache'],
      ['que nous', 'soyons', 'ayons', 'allions', 'fassions', 'puissions', 'sachions'],
      ['que vous', 'soyez', 'ayez', 'alliez', 'fassiez', 'puissiez', 'sachiez'],
      ["qu'ils", 'soient', 'aient', 'aillent', 'fassent', 'puissent', 'sachent']
    ]
  },
  ex: [
    { fr: "Il faut que je sois présent à la réunion.", en: 'I have to be at the meeting.' },
    { fr: "Je doute qu'il puisse venir avant midi.", en: 'I doubt he can come before noon.' },
    { fr: "Bien que ce soit difficile, cela reste possible.", en: 'Although it is difficult, it remains possible.' }
  ],
  drill: [
    { t: 'fill', q: 'Il faut que je ___ (être) à l\'heure.', a: ['sois'], why: 'être → que je sois. Learn all six.' },
    { t: 'fill', q: "Je doute qu'il ___ (pouvoir) venir.", a: ['puisse'], why: 'pouvoir → que je puisse.' },
    { t: 'fill', q: "Bien que ce ___ (être) difficile…", a: ['soit'], why: 'bien que always takes the subjunctive.' },
    { t: 'mc', q: 'Subjunctive of "faire" after "il faut que je…"', opts: ['fais', 'fasse', 'ferai'], a: 1, why: 'que je fasse.' }
  ]
},

{
  id: 'b1-subj-use', stage: 'B1', title: 'Subjonctif — when to use it', mins: 45,
  goal: 'Deploy it correctly a few times in writing — a clear level marker.',
  blocks: [
    { h: 'The principle',
      p: 'The indicative states what <i>is</i>. The subjunctive appears when the clause is filtered through someone\'s will, emotion, doubt or a value judgement. It is about the <i>speaker\'s attitude</i>, not about the fact.' },
    { h: 'Reliable triggers',
      p: '<b>Will:</b> vouloir que, souhaiter que, exiger que, il faut que. <b>Emotion:</b> être content/triste/surpris que, avoir peur que, regretter que. <b>Doubt:</b> douter que, ne pas penser que, ne pas croire que. <b>Impersonal judgement:</b> il est important/nécessaire/dommage/possible que.' },
    { h: 'Conjunctions that always take it',
      p: '<b>bien que, quoique</b> (although), <b>pour que, afin que</b> (so that), <b>avant que</b> (before), <b>jusqu\'à ce que</b> (until), <b>à condition que</b> (provided that), <b>sans que</b> (without).' },
    { h: 'The traps',
      p: '<b>espérer que</b> takes the <i>indicative</i>: j\'espère qu\'il viendra. <b>après que</b> officially takes the indicative. <b>Penser/croire que</b> take the indicative when positive but the subjunctive when negative or questioned: <b>je pense qu\'il vient</b> vs <b>je ne pense pas qu\'il vienne</b>.' },
    { h: 'Same subject? Use the infinitive',
      p: 'If both clauses share a subject, drop the subjunctive: <b>je veux partir</b>, not "je veux que je parte". Similarly <b>avant de partir</b>, <b>pour réussir</b>.' }
  ],
  ex: [
    { fr: "Il est important que les nouveaux arrivants aient accès à des cours de français.", en: 'It is important that newcomers have access to French classes.' },
    { fr: "Je ne pense pas que ce soit la meilleure solution.", en: 'I do not think that is the best solution.' },
    { fr: "Bien que le coût soit élevé, l'investissement en vaut la peine.", en: 'Although the cost is high, the investment is worth it.' }
  ],
  drill: [
    { t: 'mc', q: "J'espère qu'il ___.", opts: ['vienne', 'viendra'], a: 1, why: 'espérer takes the indicative — a classic trap.' },
    { t: 'mc', q: 'Je ne pense pas que ce ___ vrai.', opts: ['est', 'soit'], a: 1, why: 'Negated penser triggers the subjunctive.' },
    { t: 'fill', q: 'Il faut que nous ___ (partir) maintenant.', a: ['partions'], why: 'il faut que + subjunctive. nous partions.' },
    { t: 'mc', q: 'Which is correct?', opts: ['Je veux que je parte', 'Je veux partir'], a: 1, why: 'Same subject, so infinitive — no subordinate clause at all.' },
    { t: 'trans', q: 'I do not think it is the best solution.', a: ["je ne pense pas que ce soit la meilleure solution"], why: 'One clean subjunctive in an essay is worth more than five forced ones.' }
  ]
},

{
  id: 'b1-relative', stage: 'B1', title: 'Relative pronouns', mins: 40,
  goal: 'Build long sentences that stay grammatical.',
  blocks: [
    { h: 'qui and que',
      p: '<b>qui</b> replaces the <i>subject</i> of the following verb: <b>le train qui part à huit heures</b>. <b>que</b> replaces the <i>object</i>: <b>le train que je prends</b>. Test: if a verb comes straight after, it is qui; if a subject comes after, it is que. Note qui never elides — never "qu\'il" when you mean qui.' },
    { h: 'où',
      p: 'For place and time: <b>la ville où j\'habite</b>, <b>le jour où je suis arrivé</b>. English says "the day that" — French requires où.' },
    { h: 'dont',
      p: 'Replaces <b>de</b> + something. Use it whenever the underlying verb takes de: <b>le projet dont je parle</b> (parler de), <b>la personne dont j\'ai besoin</b> (avoir besoin de), <b>un problème dont la cause est claire</b> (possession).' },
    { h: 'ce qui / ce que / ce dont',
      p: 'When there is no specific noun: <b>ce qui m\'inquiète</b> (what worries me), <b>ce que je veux</b> (what I want), <b>ce dont j\'ai besoin</b> (what I need). These open sentences elegantly and read well in an essay.' }
  ],
  ex: [
    { fr: "C'est une solution qui fonctionne et que tout le monde accepte.", en: 'It is a solution that works and that everyone accepts.' },
    { fr: "Le problème dont je parle touche surtout les jeunes.", en: 'The problem I am talking about mainly affects young people.' },
    { fr: "Ce qui m'inquiète, c'est le manque de logements abordables.", en: 'What worries me is the lack of affordable housing.' }
  ],
  drill: [
    { t: 'fill', q: "L'homme ___ parle est mon voisin.", a: ['qui'], why: 'A verb follows directly, so qui (subject).' },
    { t: 'fill', q: "Le livre ___ je lis est passionnant.", a: ['que', "qu'"], why: 'A subject (je) follows, so que (object).' },
    { t: 'fill', q: "Le projet ___ je vous ai parlé…", a: ['dont'], why: 'parler de → dont.' },
    { t: 'fill', q: "___ m'inquiète, c'est le coût.", a: ['ce qui'], why: 'No antecedent noun, and it is the subject of inquiète.' },
    { t: 'trans', q: 'What I need is more time.', a: ["ce dont j'ai besoin, c'est plus de temps", "ce dont j'ai besoin c'est plus de temps"], why: 'avoir besoin de → ce dont.' }
  ]
},

{
  id: 'b1-passive', stage: 'B1', title: 'on, the passive, and impersonal structures', mins: 35,
  goal: 'Write in the neutral, slightly formal register the exam expects.',
  blocks: [
    { h: 'French prefers on',
      p: 'Where English reaches for the passive, French often uses <b>on</b>: "It is said that…" → <b>on dit que…</b>. "The decision was made" → <b>on a pris la décision</b>. Using on rather than a heavy passive reads as more natural.' },
    { h: 'The real passive',
      p: '<b>être</b> + past participle, agreeing with the subject, with the agent introduced by <b>par</b>: <b>La loi a été adoptée par le parlement.</b> Reserve it for when the agent genuinely matters.' },
    { h: 'Pronominal passive',
      p: 'Very common and very French: <b>Ça se fait souvent.</b> <b>Le français se parle partout au Québec.</b> <b>Ce mot s\'écrit avec deux n.</b>' },
    { h: 'Impersonal frames worth memorising',
      p: '<b>il s\'agit de</b> (it is about), <b>il convient de</b> (it is appropriate to), <b>il est à noter que</b> (it should be noted that), <b>force est de constater que</b> (one is bound to note that), <b>il n\'en reste pas moins que</b> (the fact remains that). Two of these in an essay lift the register noticeably.' }
  ],
  ex: [
    { fr: "On constate une hausse importante des loyers depuis deux ans.", en: 'A significant rise in rents has been observed over the past two years.' },
    { fr: "Cette mesure a été adoptée par le gouvernement en janvier.", en: 'This measure was adopted by the government in January.' },
    { fr: "Il s'agit d'une question qui concerne toute la société.", en: 'It is a question that concerns the whole of society.' }
  ],
  drill: [
    { t: 'mc', q: 'Most natural French for "It is said that…"', opts: ['Il est dit que', 'On dit que'], a: 1, why: 'on is the everyday solution; the passive sounds translated.' },
    { t: 'fill', q: 'La décision a été ___ (prendre) hier.', a: ['prise'], why: 'Passive participle agrees with la décision, feminine.' },
    { t: 'fill', q: "Ce mot ___ écrit avec deux n. (pronominal passive)", a: ["s'"], why: "s'écrire — how you say a word 'is spelled'." },
    { t: 'trans', q: 'It is about a question that concerns everyone.', a: ["il s'agit d'une question qui concerne tout le monde"], why: "il s'agit de is impersonal — it never takes a personal subject." }
  ]
},

{
  id: 'b1-register', stage: 'B1', title: 'Register: who you are talking to', mins: 35,
  goal: 'Avoid the sociolinguistic penalty, which is scored separately.',
  blocks: [
    { h: 'tu or vous',
      p: 'With the examiner: <b>vous</b>, always, in both speaking sections. In writing, a formal letter is <b>vous</b>; a message to a friend may be <b>tu</b> — read the prompt carefully, because it tells you the relationship and the marker checks whether you matched it.' },
    { h: 'Three registers',
      p: '<b>Soutenu</b> (formal writing, official letters), <b>courant</b> (neutral — your default), <b>familier</b> (friends, and what you hear in listening recordings). Producing familier in a formal task costs marks; failing to <i>understand</i> familier costs you listening questions.' },
    { h: 'Formal letter conventions',
      p: 'Open with <b>Madame, Monsieur,</b> — never "Cher Monsieur" to a stranger. Close with <b>Je vous prie d\'agréer, Madame, Monsieur, mes salutations distinguées.</b> or the lighter <b>Cordialement</b>. These fixed phrases are free marks; memorise them exactly.' },
    { h: 'What to avoid in writing',
      p: 'Dropping <b>ne</b>, using <b>on</b> for <b>nous</b> throughout, text abbreviations, <b>ça</b> where <b>cela</b> fits, and English words when a French one exists (<b>courriel</b> not <b>email</b>, <b>fin de semaine</b> not <b>week-end</b> if you are writing for a Canadian context).' }
  ],
  table: {
    head: ['familier', 'courant', 'soutenu'],
    rows: [
      ['C\'est pas grave', "Ce n'est pas grave", "Cela n'a aucune importance"],
      ['Je sais pas', 'Je ne sais pas', "Je l'ignore"],
      ['bosser', 'travailler', 'exercer une activité'],
      ['un truc', 'une chose', 'un élément'],
      ['super', 'très bien', 'excellent'],
      ['les gens', 'les personnes', 'la population']
    ]
  },
  ex: [
    { fr: "Madame, Monsieur, je me permets de vous écrire au sujet de ma demande.", en: 'Dear Sir or Madam, I am writing to you regarding my application.' },
    { fr: "Je vous prie d'agréer, Madame, Monsieur, mes salutations distinguées.", en: 'Yours faithfully.' },
    { fr: "Je vous remercie par avance de votre attention.", en: 'Thank you in advance for your attention.' }
  ],
  drill: [
    { t: 'mc', q: 'Formal letter to an unknown official begins:', opts: ['Salut,', 'Cher Monsieur,', 'Madame, Monsieur,'], a: 2, why: 'Standard when you do not know the recipient.' },
    { t: 'mc', q: 'Which belongs in a formal essay?', opts: ["C'est pas normal", "Cela n'est pas acceptable"], a: 1, why: 'Keep ne, prefer cela over ça in formal writing.' },
    { t: 'mc', q: 'With the examiner in the speaking test you use…', opts: ['tu', 'vous'], a: 1, why: 'Always vous. Slipping into tu is explicitly penalised.' },
    { t: 'trans', q: 'I am writing to you regarding my application.', a: ["je me permets de vous écrire au sujet de ma demande", "je vous écris au sujet de ma demande"], why: '"Je me permets de" is a high-value formal opener.' }
  ]
},

/* ========================= B2 ========================= */
{
  id: 'b2-argument', stage: 'B2', title: 'Argumentation connectors', mins: 45,
  goal: 'Structure an argument that reads like a native essay.',
  blocks: [
    { h: 'The shape of a French argument',
      p: 'French essays are explicitly signposted. The marker should be able to see your plan without reading the content. Announce, develop, concede, conclude — and label each move with a connector.' },
    { h: 'Concession — the B2 move',
      p: 'Acknowledging the other side then rebutting is what separates a B2 answer from a B1 one. <b>Certes… mais</b>, <b>il est vrai que… toutefois</b>, <b>bien que… il n\'en demeure pas moins que</b>, <b>on peut comprendre que… cependant</b>.' },
    { h: 'Reinforcing',
      p: '<b>d\'autant plus que</b> (all the more so because), <b>non seulement… mais encore</b>, <b>en effet</b> (indeed — introduces proof, not a contrast), <b>qui plus est</b>, <b>par ailleurs</b>.' },
    { h: 'Careful with faux amis',
      p: '<b>éventuellement</b> means "possibly", not "eventually". <b>actuellement</b> means "currently", not "actually". <b>en effet</b> confirms; <b>en fait</b> corrects. Mixing these up is a marked error at B2.' }
  ],
  table: {
    head: ['Move', 'Connector', 'Use'],
    rows: [
      ['Announce', "Il convient d'abord d'examiner…", 'opening'],
      ['Add proof', 'En effet, …', 'supports what you just said'],
      ['Reinforce', "D'autant plus que…", 'stacks a second reason'],
      ['Concede', 'Certes, … mais…', 'acknowledge then rebut'],
      ['Contrast', 'En revanche / Néanmoins', 'formal but'],
      ['Nuance', 'Cela dit / Toutefois', 'soften a claim'],
      ['Conclude', 'En définitive / En somme', 'wrap up']
    ]
  },
  ex: [
    { fr: "Certes, le télétravail réduit les trajets ; néanmoins, il fragilise le lien social.", en: 'Admittedly remote work cuts commuting; nevertheless it weakens social ties.' },
    { fr: "Cette mesure paraît coûteuse, d'autant plus qu'elle ne règle qu'une partie du problème.", en: 'This measure seems costly, all the more so as it only solves part of the problem.' },
    { fr: "En définitive, il me semble que les avantages l'emportent sur les inconvénients.", en: 'Ultimately, it seems to me the advantages outweigh the drawbacks.' }
  ],
  drill: [
    { t: 'mc', q: '"Éventuellement" means…', opts: ['eventually', 'possibly'], a: 1, why: 'A classic faux ami. "Eventually" is finalement or à terme.' },
    { t: 'mc', q: 'Which introduces supporting evidence?', opts: ['En fait', 'En effet'], a: 1, why: 'en effet confirms and proves; en fait corrects a misconception.' },
    { t: 'fill', q: '___, cette solution est coûteuse, mais elle est efficace. (concession)', a: ['certes'], why: 'Certes … mais is the cleanest concession pair.' },
    { t: 'trans', q: 'Admittedly it is expensive; nevertheless it is necessary.', a: ["certes c'est cher ; néanmoins c'est nécessaire", "certes, c'est coûteux ; néanmoins, c'est nécessaire"], why: 'Concede-then-rebut is the single highest-value B2 structure.' }
  ]
},

{
  id: 'b2-nuance', stage: 'B2', title: 'Nuance and hedging', mins: 35,
  goal: 'Stop sounding absolute. Markers reward measured claims.',
  blocks: [
    { h: 'Absolute claims read as unsophisticated',
      p: '"Tout le monde pense que…" invites the marker to disagree. Hedged claims are safer and score higher.' },
    { h: 'Hedging frames',
      p: '<b>il semblerait que</b> + subj, <b>on pourrait penser que</b>, <b>dans une certaine mesure</b>, <b>a priori</b>, <b>en apparence</b>, <b>tend à</b>, <b>a tendance à</b>, <b>dans la plupart des cas</b>, <b>rien n\'indique que</b> + subj.' },
    { h: 'Quantifying honestly',
      p: '<b>la plupart des</b> (most), <b>une minorité de</b>, <b>un nombre croissant de</b>, <b>de plus en plus de</b>, <b>de moins en moins de</b>, <b>nombre de</b> (formal: many).' },
    { h: 'Taking a stance without shouting',
      p: '<b>Pour ma part, je considère que…</b>, <b>il me paraît essentiel de…</b>, <b>je suis enclin à penser que…</b>, <b>force est de constater que…</b>' }
  ],
  ex: [
    { fr: "Un nombre croissant de jeunes tend à quitter les grandes villes.", en: 'A growing number of young people tend to leave the big cities.' },
    { fr: "Il semblerait que cette politique n'ait pas produit les effets escomptés.", en: 'It would seem this policy has not produced the expected effects.' },
    { fr: "Dans une certaine mesure, les deux positions se défendent.", en: 'To a certain extent, both positions are defensible.' }
  ],
  drill: [
    { t: 'mc', q: 'Which is the stronger essay sentence?', opts: ['Tout le monde sait que le loyer est trop cher', 'Force est de constater que les loyers ont fortement augmenté'], a: 1, why: 'Hedged, specific and formal beats absolute and vague.' },
    { t: 'fill', q: 'Il semblerait que la situation ___ (être) plus complexe.', a: ['soit'], why: 'il semble que takes the subjunctive.' },
    { t: 'fill', q: '___ des étudiants travaillent à temps partiel. (most)', a: ['la plupart'], why: 'la plupart des + plural verb.' },
    { t: 'trans', q: 'A growing number of people are leaving the city.', a: ['un nombre croissant de personnes quittent la ville', 'de plus en plus de personnes quittent la ville'], why: 'Precise quantifiers are a B2 marker.' }
  ]
},

{
  id: 'b2-complex', stage: 'B2', title: 'Gérondif, participe présent, complex subordination', mins: 40,
  goal: 'Join ideas inside one sentence instead of across three.',
  blocks: [
    { h: 'Gérondif: en + -ant',
      p: 'Same subject as the main verb. Expresses simultaneity, means, or condition. <b>En travaillant le soir, j\'ai pu financer mes études</b> (by working). <b>Il lit en mangeant</b> (while eating). Built from the nous form: <b>nous parlons → en parlant</b>.' },
    { h: 'Participe présent',
      p: 'Without <b>en</b>, it works like a relative clause and is distinctly written: <b>Les candidats ayant obtenu NCLC 7 peuvent postuler</b> = les candidats qui ont obtenu. Useful for compressing an essay sentence.' },
    { h: 'Tout en + -ant',
      p: 'Simultaneity with a hint of contrast: <b>Tout en reconnaissant les difficultés, je reste optimiste</b> = while acknowledging the difficulties.' },
    { h: 'A rule worth knowing',
      p: 'The gérondif requires the same subject as the main clause. <b>En arrivant, j\'ai vu…</b> means <i>I</i> arrived. If the subjects differ you must use a full clause: <b>Quand il est arrivé, j\'ai vu…</b>' }
  ],
  ex: [
    { fr: "En suivant une formation le soir, j'ai pu changer de métier.", en: 'By taking an evening course, I was able to change career.' },
    { fr: "Tout en reconnaissant les avantages, je reste prudent.", en: 'While acknowledging the advantages, I remain cautious.' },
    { fr: "Les personnes souhaitant s'inscrire doivent fournir une pièce d'identité.", en: 'People wishing to register must provide ID.' }
  ],
  drill: [
    { t: 'fill', q: '___ travaillant le soir, il a financé ses études.', a: ['en'], why: 'en + participle = gérondif, expressing means.' },
    { t: 'fill', q: 'Nous parlons → en ___', a: ['parlant'], why: 'Gérondif is built from the nous stem.' },
    { t: 'mc', q: 'Which is correct?', opts: ["En arrivant, le train était parti", "Quand je suis arrivé, le train était parti"], a: 1, why: 'The gérondif needs the same subject. The train did not arrive — you did.' },
    { t: 'trans', q: 'While acknowledging the difficulties, I remain optimistic.', a: ['tout en reconnaissant les difficultés, je reste optimiste'], why: 'A compact, high-register concession.' }
  ]
},

{
  id: 'b2-pqp', stage: 'B2', title: 'Plus-que-parfait and conditionnel passé', mins: 35,
  goal: 'Express regret, reproach and layered time — strong B2 signals.',
  blocks: [
    { h: 'Plus-que-parfait — the past before the past',
      p: '<b>avoir/être</b> in the <i>imparfait</i> + past participle. <b>J\'avais déjà envoyé le dossier quand j\'ai reçu leur appel.</b> Same auxiliary rules and agreement as the passé composé.' },
    { h: 'Conditionnel passé — what would have happened',
      p: '<b>avoir/être</b> in the <i>conditional</i> + participle: <b>j\'aurais fait</b>, <b>je serais venu</b>. Expresses regret (<b>j\'aurais dû</b> = I should have), reproach (<b>vous auriez pu me prévenir</b>) and unrealised outcomes.' },
    { h: 'The pairing',
      p: 'Type 3 si clause: <b>Si j\'avais su, je ne serais pas venu.</b> Plus-que-parfait in the si clause, conditionnel passé in the main clause. One correct instance of this in your essay is a visible level marker.' },
    { h: 'Reported speech shifts',
      p: 'Present → imparfait, passé composé → plus-que-parfait, futur → conditionnel. <b>"Je viendrai" → il a dit qu\'il viendrait.</b>' }
  ],
  ex: [
    { fr: "J'avais déjà déposé ma demande quand la règle a changé.", en: 'I had already submitted my application when the rule changed.' },
    { fr: "J'aurais dû commencer à étudier plus tôt.", en: 'I should have started studying earlier.' },
    { fr: "Il a dit qu'il viendrait dès qu'il aurait terminé.", en: 'He said he would come as soon as he had finished.' }
  ],
  drill: [
    { t: 'fill', q: "J'___ (avoir) déjà envoyé le dossier quand ils ont appelé.", a: ['avais'], why: 'Plus-que-parfait: imparfait of avoir + participle.' },
    { t: 'fill', q: "J'___ (devoir) commencer plus tôt. (I should have)", a: ['aurais dû', 'aurais du'], why: "j'aurais dû + infinitive expresses regret." },
    { t: 'mc', q: '"Je viendrai" in reported speech becomes…', opts: ["il a dit qu'il viendra", "il a dit qu'il viendrait"], a: 1, why: 'Future shifts to conditional after a past reporting verb.' },
    { t: 'trans', q: 'If I had known, I would not have come.', a: ["si j'avais su, je ne serais pas venu", "si j'avais su je ne serais pas venu"], why: 'The full type-3 conditional. Worth practising until automatic.' }
  ]
},

{
  id: 'b2-errors', stage: 'B2', title: 'The errors English speakers keep making', mins: 40,
  goal: 'Clear out the mistakes that quietly cap your score.',
  blocks: [
    { h: 'Faux amis',
      p: '<b>actuellement</b> = currently (not actually → en fait). <b>éventuellement</b> = possibly. <b>sensible</b> = sensitive (sensible → raisonnable). <b>librairie</b> = bookshop (library → bibliothèque). <b>assister à</b> = to attend. <b>demander</b> = to ask (not to demand → exiger). <b>rester</b> = to stay. <b>attendre</b> = to wait for. <b>passer un examen</b> = to sit it (to pass → réussir).' },
    { h: 'Prepositions that do not map',
      p: '<b>chercher</b> and <b>attendre</b> and <b>écouter</b> and <b>regarder</b> take no preposition: <b>je cherche un emploi</b>, not "cherche pour". Conversely <b>téléphoner à</b>, <b>répondre à</b>, <b>obéir à</b>, <b>se souvenir de</b>, <b>avoir besoin de</b> require one where English does not.' },
    { h: 'depuis with the present',
      p: '"I have lived here for three years" is <b>j\'habite ici depuis trois ans</b> — present, not past. The action is still going on. Using the passé composé here is a reliable B1 ceiling marker.' },
    { h: 'Anglicisms to drop',
      p: 'In a Canadian French context prefer <b>courriel</b>, <b>fin de semaine</b>, <b>stationnement</b>, <b>magasiner</b>, <b>clavarder</b>. Québec French is, if anything, more protective of French vocabulary than France French.' },
    { h: 'Little things markers notice',
      p: 'Space before <b>: ; ? !</b> in French typography. Capitals: languages, nationalities as adjectives and days are lowercase — <b>le français</b>, <b>il est canadien</b>, <b>lundi</b>. Numbers use a comma for decimals: <b>3,5 %</b>.' }
  ],
  ex: [
    { fr: "Actuellement, je cherche un emploi dans le secteur public.", en: 'Currently, I am looking for a job in the public sector.' },
    { fr: "J'habite au Canada depuis deux ans et j'attends une réponse.", en: 'I have been living in Canada for two years and I am waiting for a reply.' },
    { fr: "Je vais passer l'examen en mars et j'espère le réussir.", en: 'I am going to sit the exam in March and I hope to pass it.' }
  ],
  drill: [
    { t: 'mc', q: '"Actuellement" means…', opts: ['actually', 'currently'], a: 1, why: '"Actually" is en fait or en réalité.' },
    { t: 'mc', q: 'Correct:', opts: ['Je cherche pour un emploi', 'Je cherche un emploi'], a: 1, why: 'chercher takes a direct object — no preposition.' },
    { t: 'mc', q: '"I have lived here for 3 years":', opts: ["j'ai habité ici depuis trois ans", "j'habite ici depuis trois ans"], a: 1, why: 'Ongoing situation = present tense with depuis.' },
    { t: 'mc', q: '"Je vais passer l\'examen" means…', opts: ['I am going to pass the exam', 'I am going to sit the exam'], a: 1, why: 'To pass is réussir. passer just means to take it.' },
    { t: 'trans', q: 'I am waiting for a reply.', a: ["j'attends une réponse"], why: 'attendre takes no preposition.' }
  ]
},

/* ========================= EXAM TECHNIQUE ========================= */
{
  id: 'x-choose', stage: 'EXAM', title: 'TEF or TCF — choosing', mins: 20,
  goal: 'Pick the exam that suits you and stop second-guessing.',
  blocks: [
    { h: 'Both are accepted by IRCC',
      p: 'For Express Entry, TEF Canada and TCF Canada are both valid. Neither is "better" in the eyes of the department. Pick on format fit and test-centre availability.' },
    { h: 'Where they differ',
      p: 'TEF listening is 40 questions in 40 minutes; TCF is 39 in 35 — slightly more time pressure on TCF. TEF writing is two longer pieces; TCF is three shorter ones. TEF speaking is two role-plays over 15 minutes; TCF is three tasks over about 12. TEF reports every section out of 699; TCF reports writing and speaking out of 20.' },
    { h: 'A practical way to decide',
      p: 'If you write better at length and like developing one argument, TEF suits you. If you prefer short, contained tasks and would rather not sustain a 200-word essay, TCF suits you. Many candidates simply take whichever has an earlier date at a nearby centre.' },
    { h: 'Before you book',
      p: 'Confirm current accepted tests, scale and thresholds on the IRCC page. These have changed before and this app is not an official source.' }
  ],
  ex: [
    { fr: "Je vais passer le TEF Canada au mois de mars.", en: 'I am going to sit the TEF Canada in March.' },
    { fr: "Il faut obtenir le NCLC 7 dans les quatre compétences.", en: 'You need NCLC 7 in all four skills.' }
  ],
  drill: [
    { t: 'mc', q: 'Which exam gives you three shorter writing tasks?', opts: ['TEF Canada', 'TCF Canada'], a: 1, why: 'TCF: 60–120, 120–150 and 120–180 words. TEF: one 80+ and one 200+.' },
    { t: 'mc', q: 'If you score NCLC 8 in three skills and NCLC 6 in one, your result is…', opts: ['NCLC 7 on average', 'Not sufficient — every skill must reach the threshold'], a: 1, why: 'Scores are never averaged. The weakest skill decides.' },
    { t: 'mc', q: 'TEF listening timing is…', opts: ['40 questions / 40 minutes', '39 questions / 35 minutes'], a: 0, why: 'The second is TCF.' }
  ]
},

{
  id: 'x-co', stage: 'EXAM', title: 'Listening strategy', mins: 35,
  goal: 'Stop losing questions you actually understood.',
  blocks: [
    { h: 'It plays once',
      p: 'In both exams most audio plays a single time and you cannot go back. So the game is not comprehension, it is <i>preparation</i>. Read the question and options in the gap before the audio starts, and know what you are listening for.' },
    { h: 'Predict before you hear',
      p: 'If the options are four times, you are listening for a number. If they are four places, listen for a location. Decide the <i>type</i> of information in advance and everything else becomes background.' },
    { h: 'Write as you listen',
      p: 'Numbers, times, prices and dates evaporate from working memory within seconds. Note them the instant you hear them. Do not try to hold two numbers at once.' },
    { h: 'The distractor pattern',
      p: 'Recordings routinely mention a wrong answer first, then correct it: "Le rendez-vous était prévu à 14 h… finalement, ce sera 16 h." Listen for <b>finalement, en fait, plutôt, non, en réalité, par contre</b> — the information after those words is the answer.' },
    { h: 'Never leave a blank',
      p: 'There is no negative marking. An unanswered question is a guaranteed zero; a guess is a 25% chance. If you lose the thread, pick something, mark it mentally and move on — dwelling costs you the next question too.' },
    { h: 'Accents',
      p: 'You will hear France, Belgian, Swiss, Québécois and African speakers. Train on all of them. The Look up tab in this app exists for exactly this.' }
  ],
  ex: [
    { fr: "Le rendez-vous était prévu à quatorze heures, mais finalement ce sera seize heures trente.", en: 'The appointment was scheduled for 2pm, but in the end it will be 4:30pm.' },
    { fr: "En fait, ce n'est pas le bureau principal, c'est l'annexe.", en: 'Actually, it is not the main office, it is the annexe.' }
  ],
  drill: [
    { t: 'mc', q: 'You hear: "C\'était 40 dollars, mais finalement c\'est 45." The answer is…', opts: ['40', '45'], a: 1, why: 'Information after finalement supersedes what came before. This is the most common distractor design.' },
    { t: 'mc', q: 'You did not understand a question at all. You should…', opts: ['Leave it blank', 'Guess and move on'], a: 1, why: 'No negative marking, so a blank is strictly worse than a guess.' },
    { t: 'mc', q: 'The best use of the seconds before the audio plays is…', opts: ['Relax', 'Read the options and decide what type of information you need'], a: 1, why: 'Prediction is what converts comprehension into marks.' }
  ]
},

{
  id: 'x-ce', stage: 'EXAM', title: 'Reading strategy', mins: 35,
  goal: 'Finish in time, which is the actual difficulty.',
  blocks: [
    { h: 'You can move freely',
      p: 'Unlike listening, you may navigate within the reading paper. So do the easy questions first and bank those marks before the long texts eat your clock.' },
    { h: 'Budget the clock',
      p: 'Roughly 40 questions in 60 minutes is 90 seconds each — but short notices take 30 seconds and long argumentative texts take three minutes. Move fast early to buy time later.' },
    { h: 'Question first, then text',
      p: 'Read the question before the passage so you are scanning for something specific rather than reading for general pleasure. For detail questions, locate the keyword in the text and read only the surrounding two sentences.' },
    { h: 'Answers are paraphrased',
      p: 'The correct option rarely repeats the text\'s words. The option that copies the text verbatim is often the trap. Look for meaning matches, not word matches.' },
    { h: 'Watch the logical connectors',
      p: 'Questions about the author\'s position usually hinge on <b>cependant, en revanche, certes… mais, toutefois</b>. Find the concession and the real opinion is on the other side of it.' }
  ],
  ex: [
    { fr: "Certes, cette réforme est ambitieuse ; toutefois, son financement reste incertain.", en: 'Admittedly this reform is ambitious; however, its funding remains uncertain.' },
    { fr: "L'auteur nuance son propos en évoquant les limites du dispositif.", en: 'The author qualifies his point by mentioning the limits of the scheme.' }
  ],
  drill: [
    { t: 'mc', q: 'A text says "Certes, c\'est coûteux, mais indispensable." The author\'s position is…', opts: ['Against it, because it is expensive', 'In favour, despite the cost'], a: 1, why: 'The real opinion always sits after mais in a certes…mais pair.' },
    { t: 'mc', q: 'An option that uses exactly the same words as the passage is…', opts: ['Usually correct', 'Often a distractor'], a: 1, why: 'Correct answers paraphrase. Verbatim repetition is a classic trap.' },
    { t: 'mc', q: 'Best reading order:', opts: ['Passage, then questions', 'Questions, then scan the passage'], a: 1, why: 'Targeted scanning is far faster and the section is time-limited.' }
  ]
}

];
