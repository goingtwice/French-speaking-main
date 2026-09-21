/* ============================================================================
   course-a.js — Stage A1 and A2 modules
   ---------------------------------------------------------------------------
   Module shape:
     id      unique slug
     stage   'A1' | 'A2' | 'B1' | 'B2' | 'EXAM'
     title   short name
     goal    what you can do once this is solid
     mins    honest study estimate, first pass only
     blocks  [{h, p}]  teaching text. p may contain <b> and <i> only.
     table   optional {head:[], rows:[[]]}
     ex      [{fr, en}] read aloud with the device voice
     drill   [{t:'mc'|'fill'|'trans', q, opts?, a, why}]
             mc   → a = index of correct option
             fill → a = string or [accepted strings], answer typed in
             trans→ a = [accepted strings]
   ========================================================================= */

const COURSE_A = [

/* ========================= A1 ========================= */
{
  id: 'a1-sounds', stage: 'A1', title: 'Reading French out loud', mins: 45,
  goal: 'Look at any French word and produce a defensible pronunciation.',
  blocks: [
    { h: 'Final consonants are usually silent',
      p: 'In <b>petit</b>, <b>grand</b>, <b>vous</b>, <b>parlez</b>, the last letter is not pronounced. The exception is easy to remember with the word <b>CaReFuL</b>: c, r, f, l are usually sounded — <b>avec</b>, <b>bonjour</b>, <b>actif</b>, <b>seul</b>. The <b>-ent</b> ending on a verb is always silent: <b>ils parlent</b> sounds exactly like <b>il parle</b>.' },
    { h: 'Vowel pairs are single sounds',
      p: '<b>ou</b> = [u] as in "soup". <b>u</b> = [y], which English does not have: say "ee" then round your lips without moving your tongue. <b>eu</b> = [ø]. <b>au</b>/<b>eau</b> = [o]. <b>ai</b>/<b>ei</b> = [ɛ]. <b>oi</b> = [wa]. These never change.' },
    { h: 'Nasal vowels',
      p: 'A vowel followed by <b>n</b> or <b>m</b> at the end of a syllable becomes nasal, and the n/m itself is <i>not</i> pronounced. <b>an/en</b> = [ɑ̃], <b>in/ain/ein</b> = [ɛ̃], <b>on</b> = [ɔ̃], <b>un</b> = [œ̃]. But a doubled n or a following vowel cancels it: <b>bonne</b> is [bɔn], not nasal.' },
    { h: 'Liaison',
      p: 'A normally-silent final consonant wakes up before a vowel. <b>vous avez</b> → "vou-zavez". <b>les enfants</b> → "lé-zanfants". <b>un grand homme</b> → "un gran-tomme". This is why spoken French sounds like one long word — you are not mishearing, the word boundaries genuinely move.' },
    { h: 'Stress is flat',
      p: 'English stresses one syllable per word. French gives every syllable equal weight and puts a slight rise only on the <i>last</i> syllable of a group. Saying "PAR-is" instead of "pa-RI" is the single most English-sounding mistake.' }
  ],
  ex: [
    { fr: 'Vous êtes étudiant ?', en: 'Are you a student? (liaison: vou-zêtes)' },
    { fr: 'Les enfants ont un grand appétit.', en: 'The children have a big appetite. (three liaisons)' },
    { fr: 'Ils parlent français.', en: 'They speak French. (-ent silent)' },
    { fr: 'Un bon vin blanc.', en: 'A good white wine. (four nasals in a row)' }
  ],
  drill: [
    { t: 'mc', q: 'How many sounds do you pronounce at the end of "parlent"?', opts: ['The -ent as "ahn"', 'Nothing — it ends on the l sound', 'A soft t'], a: 1, why: 'Verb -ent is always silent. "Ils parlent" and "il parle" are identical to the ear.' },
    { t: 'mc', q: 'Which word does NOT contain a nasal vowel?', opts: ['pain', 'bonne', 'grand'], a: 1, why: 'The double n in "bonne" cancels nasalisation: [bɔn].' },
    { t: 'mc', q: '"ou" in "vous" is pronounced…', opts: ['like the u in "but"', 'like "oo" in "soup"', 'like "ow" in "how"'], a: 1, why: 'ou = [u] always. The tricky one is the bare u = [y].' },
    { t: 'mc', q: 'In "nous avons", what happens to the s of "nous"?', opts: ['Stays silent', 'Is pronounced as a z', 'Is pronounced as an s'], a: 1, why: 'Liaison, and the s becomes [z]: "nou-zavons".' },
    { t: 'mc', q: 'Which final consonant is usually pronounced?', opts: ['t in "petit"', 'r in "bonjour"', 's in "trois"'], a: 1, why: 'Remember CaReFuL — c, r, f, l usually sound.' }
  ]
},

{
  id: 'a1-gender', stage: 'A1', title: 'Gender and articles', mins: 50,
  goal: 'Put the right little word in front of every noun.',
  blocks: [
    { h: 'Every noun has a gender',
      p: 'Not logical, just memorised. <b>Learn the article with the noun, always.</b> Never memorise "table" — memorise <b>une table</b>. This one habit saves you hundreds of errors later, because adjectives and past participles agree with gender.' },
    { h: 'Endings that predict gender',
      p: 'Usually <b>feminine</b>: -tion, -sion, -té, -ée, -ie, -ure, -ence, -ette. Usually <b>masculine</b>: -age, -ment, -eau, -isme, -oir, -ier, -in. These cover a large share of the vocabulary you will meet on the exam: <b>la situation</b>, <b>la société</b>, <b>le gouvernement</b>, <b>le logement</b>.' },
    { h: 'Definite vs indefinite',
      p: '<b>le / la / les</b> = the, and also the whole category ("j\'aime le café" = I like coffee in general). <b>un / une / des</b> = a, some. Note that French needs an article where English drops it: "Children like sweets" → <b>Les enfants aiment les bonbons.</b>' },
    { h: 'The partitive — some of an uncountable thing',
      p: '<b>du</b> (masc), <b>de la</b> (fem), <b>de l\'</b> (before vowel): <b>je bois du café</b>, <b>je mange de la viande</b>. After a negative, all of it collapses to <b>de</b>: <b>je ne bois pas de café</b>. This trips up nearly every beginner.' }
  ],
  table: {
    head: ['', 'masculine', 'feminine', 'plural'],
    rows: [
      ['the', 'le livre', 'la table', 'les livres'],
      ['a / some', 'un livre', 'une table', 'des livres'],
      ['some (uncountable)', 'du pain', 'de la viande', '—'],
      ['after negation', 'pas de pain', 'pas de viande', 'pas de livres']
    ]
  },
  ex: [
    { fr: "J'aime le café, mais je bois du thé le matin.", en: 'I like coffee, but I drink tea in the morning.' },
    { fr: "Il n'y a pas de place dans le bus.", en: 'There is no room on the bus.' },
    { fr: 'La situation du logement est difficile.', en: 'The housing situation is difficult.' }
  ],
  drill: [
    { t: 'fill', q: 'Je voudrais ___ eau, s\'il vous plaît. (some water — eau is feminine)', a: ["de l'", "de l’"], why: "Before a vowel the partitive becomes de l' regardless of gender." },
    { t: 'fill', q: 'Elle ne mange pas ___ viande.', a: ['de', "d'"], why: 'Any partitive turns into plain "de" after a negative.' },
    { t: 'mc', q: 'Which is correct?', opts: ['le nation', 'la nation', 'un nation'], a: 1, why: '-tion is reliably feminine.' },
    { t: 'mc', q: '"Le gouvernement" is masculine because…', opts: ['it ends in -ment', 'it is about politics', 'no reason'], a: 0, why: '-ment is a strong masculine marker, as is -age and -eau.' },
    { t: 'trans', q: 'Children like sweets. (general statement)', a: ['les enfants aiment les bonbons', 'les enfants aiment les bonbons.'], why: 'French uses the definite article for general categories where English uses none.' }
  ]
},

{
  id: 'a1-etre', stage: 'A1', title: 'être — and subject pronouns', mins: 40,
  goal: 'Say who you are, where you are, and how things are.',
  blocks: [
    { h: 'The pronouns',
      p: '<b>je, tu, il/elle/on, nous, vous, ils/elles</b>. <b>vous</b> is both plural "you" and singular polite "you" — and in the exam you use <b>vous</b> with the examiner, always. <b>on</b> officially means "one" but in real speech it replaces <b>nous</b>: "on y va" = let\'s go. It takes the <i>il</i> form of the verb.' },
    { h: 'être is irregular and unavoidable',
      p: 'It is the verb "to be", it is used in the past tense of many verbs, and it builds the passive. There is no way round learning it cold.' },
    { h: 'c\'est vs il est',
      p: '<b>C\'est</b> + article/noun or a standalone adjective: <b>c\'est un médecin</b>, <b>c\'est difficile</b>. <b>Il est</b> + profession with no article or + adjective about a specific thing: <b>il est médecin</b>, <b>il est difficile</b> (this specific one). Note that French drops the article for professions: never "il est un médecin".' }
  ],
  table: {
    head: ['', 'être (to be)', 'meaning'],
    rows: [
      ['je', 'suis', 'I am'], ['tu', 'es', 'you are (informal)'],
      ['il / elle / on', 'est', 'he / she / one is'],
      ['nous', 'sommes', 'we are'], ['vous', 'êtes', 'you are (polite/plural)'],
      ['ils / elles', 'sont', 'they are']
    ]
  },
  ex: [
    { fr: 'Je suis ingénieur et je suis originaire de l\'Inde.', en: 'I am an engineer and I am originally from India.' },
    { fr: 'Nous sommes en retard, le bus est parti.', en: 'We are late, the bus has left.' },
    { fr: 'C\'est difficile mais ce n\'est pas impossible.', en: "It's difficult but it's not impossible." }
  ],
  drill: [
    { t: 'fill', q: 'Vous ___ en retard.', a: ['êtes', 'etes'], why: 'vous êtes — and watch the liaison, "vou-zêtes".' },
    { t: 'fill', q: 'On ___ prêts à commencer.', a: ['est'], why: 'on always takes the il/elle form, even when it means "we".' },
    { t: 'mc', q: 'How do you say "She is a teacher"?', opts: ['Elle est une professeure', 'Elle est professeure', "C'est professeure"], a: 1, why: 'No article before a profession after être. But "c\'est une professeure" would also be fine.' },
    { t: 'trans', q: 'I am originally from India.', a: ["je suis originaire de l'inde", "je suis originaire de l'inde."], why: 'Useful for the speaking test introduction.' }
  ]
},

{
  id: 'a1-avoir', stage: 'A1', title: 'avoir — and what French "has"', mins: 35,
  goal: 'Talk about age, needs, feelings and possession.',
  blocks: [
    { h: 'avoir = to have',
      p: 'Second essential irregular verb. It also builds most of the past tense, so it must be automatic.' },
    { h: 'French "has" what English "is"',
      p: 'Age, hunger, thirst, fear, heat, cold and need all use <b>avoir</b>, not être. <b>J\'ai trente ans</b> (I am thirty). <b>J\'ai faim</b> (I am hungry). <b>J\'ai besoin de</b> (I need). Saying "je suis trente ans" is an immediate beginner flag.' },
    { h: 'il y a',
      p: '"There is / there are" — one form for both. <b>Il y a un problème.</b> <b>Il y a deux problèmes.</b> Negative: <b>il n\'y a pas de…</b>. In speech it collapses to "y a".' }
  ],
  table: {
    head: ['', 'avoir', 'expression', 'meaning'],
    rows: [
      ['j\'', 'ai', 'avoir … ans', 'to be … years old'],
      ['tu', 'as', 'avoir faim / soif', 'to be hungry / thirsty'],
      ['il / elle / on', 'a', 'avoir froid / chaud', 'to be cold / hot'],
      ['nous', 'avons', 'avoir besoin de', 'to need'],
      ['vous', 'avez', 'avoir envie de', 'to feel like'],
      ['ils / elles', 'ont', 'avoir raison / tort', 'to be right / wrong']
    ]
  },
  ex: [
    { fr: "J'ai besoin d'un justificatif de domicile.", en: 'I need a proof of address.' },
    { fr: "Il y a trop de monde, j'ai envie de partir.", en: 'There are too many people, I feel like leaving.' },
    { fr: 'Vous avez raison, mais il y a un autre problème.', en: 'You are right, but there is another problem.' }
  ],
  drill: [
    { t: 'fill', q: "J'___ vingt-huit ans.", a: ['ai'], why: 'Age uses avoir. Never "je suis … ans".' },
    { t: 'fill', q: "Il n'y ___ pas de solution simple.", a: ['a'], why: 'il y a → il n\'y a pas de.' },
    { t: 'mc', q: '"I am hungry" is…', opts: ['Je suis faim', "J'ai faim", 'Je fais faim'], a: 1, why: 'avoir faim. Same pattern for soif, froid, chaud, peur.' },
    { t: 'trans', q: 'We need more time.', a: ['nous avons besoin de plus de temps', "on a besoin de plus de temps"], why: 'avoir besoin de is one of the highest-frequency structures on the exam.' }
  ]
},

{
  id: 'a1-er', stage: 'A1', title: 'Present tense: -er verbs', mins: 45,
  goal: 'Use about 80% of all French verbs in the present.',
  blocks: [
    { h: 'One pattern, thousands of verbs',
      p: 'Roughly 90% of French verbs end in <b>-er</b> and all but one behave identically. Drop the -er, add the endings. <b>parler</b> → parl- → <b>je parle, tu parles, il parle, nous parlons, vous parlez, ils parlent</b>.' },
    { h: 'Four of the six sound the same',
      p: '<b>parle, parles, parle, parlent</b> are pronounced identically. Only <b>nous parlons</b> and <b>vous parlez</b> differ. This is a gift when speaking and a trap when writing — the listening test will not tell you whether it is singular or plural, so you rely on the pronoun.' },
    { h: 'Small spelling adjustments',
      p: 'Verbs in <b>-ger</b> add an e before -ons (<b>nous mangeons</b>). Verbs in <b>-cer</b> take a cedilla (<b>nous commençons</b>). Verbs like <b>acheter</b> and <b>préférer</b> shift their accent in the singular: <b>j\'achète, je préfère</b>.' },
    { h: 'French has one present tense',
      p: '<b>Je travaille</b> covers "I work", "I am working" and "I do work". There is no continuous form. To stress that it is happening right now: <b>je suis en train de travailler</b>.' }
  ],
  table: {
    head: ['', 'parler', 'travailler', 'habiter'],
    rows: [
      ['je', 'parle', 'travaille', 'habite'], ['tu', 'parles', 'travailles', 'habites'],
      ['il/elle/on', 'parle', 'travaille', 'habite'], ['nous', 'parlons', 'travaillons', 'habitons'],
      ['vous', 'parlez', 'travaillez', 'habitez'], ['ils/elles', 'parlent', 'travaillent', 'habitent']
    ]
  },
  ex: [
    { fr: "J'habite à Toronto et je travaille dans l'informatique.", en: 'I live in Toronto and I work in IT.' },
    { fr: 'Nous commençons à huit heures et nous mangeons à midi.', en: 'We start at eight and we eat at noon.' },
    { fr: 'Ils cherchent un logement depuis trois mois.', en: 'They have been looking for a place for three months.' }
  ],
  drill: [
    { t: 'fill', q: 'Nous ___ (manger) au restaurant ce soir.', a: ['mangeons'], why: '-ger verbs keep the e before -ons to hold the soft g sound.' },
    { t: 'fill', q: 'Vous ___ (habiter) où ?', a: ['habitez'], why: 'Standard -er ending for vous.' },
    { t: 'mc', q: 'Which two forms sound different from the rest?', opts: ['je and tu', 'nous and vous', 'il and ils'], a: 1, why: 'Only -ons and -ez are audible. The other four are identical.' },
    { t: 'trans', q: 'I work in IT.', a: ["je travaille dans l'informatique", "je travaille en informatique"], why: 'Core sentence for the speaking introduction.' }
  ]
},

{
  id: 'a1-irregular', stage: 'A1', title: 'The irregular verbs you cannot avoid', mins: 60,
  goal: 'Handle aller, faire, prendre, venir, pouvoir, vouloir, devoir, savoir.',
  blocks: [
    { h: 'Eight verbs, most of the language',
      p: 'These appear in nearly every sentence you will hear. They are irregular, they are frequent, and there is no shortcut. Drill them until they are reflex.' },
    { h: 'aller builds the near future',
      p: '<b>aller</b> + infinitive = going to do. <b>Je vais partir.</b> This is how spoken French mostly expresses the future — far more common than the real future tense.' },
    { h: 'The three modals',
      p: '<b>pouvoir</b> (can), <b>vouloir</b> (want), <b>devoir</b> (must) are followed directly by an infinitive with no preposition: <b>je peux venir</b>, <b>je veux partir</b>, <b>je dois travailler</b>. Their polite conditional forms — <b>je pourrais</b>, <b>je voudrais</b> — are what you actually use with the examiner.' },
    { h: 'savoir vs connaître',
      p: '<b>savoir</b> = to know a fact or how to do something. <b>connaître</b> = to be familiar with a person or place. <b>Je sais nager</b> but <b>je connais Montréal</b>.' }
  ],
  table: {
    head: ['', 'aller', 'faire', 'prendre', 'venir', 'pouvoir', 'vouloir', 'devoir'],
    rows: [
      ['je', 'vais', 'fais', 'prends', 'viens', 'peux', 'veux', 'dois'],
      ['tu', 'vas', 'fais', 'prends', 'viens', 'peux', 'veux', 'dois'],
      ['il/elle', 'va', 'fait', 'prend', 'vient', 'peut', 'veut', 'doit'],
      ['nous', 'allons', 'faisons', 'prenons', 'venons', 'pouvons', 'voulons', 'devons'],
      ['vous', 'allez', 'faites', 'prenez', 'venez', 'pouvez', 'voulez', 'devez'],
      ['ils/elles', 'vont', 'font', 'prennent', 'viennent', 'peuvent', 'veulent', 'doivent']
    ]
  },
  ex: [
    { fr: 'Je voudrais savoir si je peux prendre rendez-vous.', en: 'I would like to know whether I can make an appointment.' },
    { fr: 'Nous allons déménager le mois prochain.', en: 'We are going to move next month.' },
    { fr: 'Vous devez remplir ce formulaire avant de venir.', en: 'You must fill in this form before coming.' }
  ],
  drill: [
    { t: 'fill', q: 'Vous ___ (faire) quoi comme travail ?', a: ['faites'], why: 'vous faites — irregular, not "faisez".' },
    { t: 'fill', q: 'Ils ___ (venir) demain matin.', a: ['viennent'], why: 'Double n in the ils form.' },
    { t: 'mc', q: 'Which is the polite way to ask for something?', opts: ['Je veux un café', 'Je voudrais un café', 'Je peux un café'], a: 1, why: 'je voudrais is the conditional of vouloir — essential register for the speaking test.' },
    { t: 'mc', q: '"I know Montréal" uses…', opts: ['je sais', 'je connais'], a: 1, why: 'connaître for places and people, savoir for facts and skills.' },
    { t: 'trans', q: 'We are going to move next month.', a: ['nous allons déménager le mois prochain', 'on va déménager le mois prochain'], why: 'aller + infinitive is the everyday future.' }
  ]
},

{
  id: 'a1-neg', stage: 'A1', title: 'Negation', mins: 30,
  goal: 'Say no precisely, and understand it at speed.',
  blocks: [
    { h: 'The sandwich',
      p: 'French negation wraps the verb: <b>ne</b> + verb + <b>pas</b>. <b>Je ne travaille pas.</b> Before a vowel, ne becomes n\': <b>je n\'ai pas</b>.' },
    { h: 'The other second halves',
      p: '<b>ne … jamais</b> (never), <b>ne … plus</b> (no longer), <b>ne … rien</b> (nothing), <b>ne … personne</b> (nobody), <b>ne … que</b> (only — not actually a negative), <b>ne … pas encore</b> (not yet).' },
    { h: 'In speech the ne vanishes',
      p: 'Real French drops <b>ne</b> almost entirely: <b>je sais pas</b>, <b>j\'ai rien vu</b>, <b>c\'est pas grave</b>. You must recognise this instantly in the listening test, because the only negative marker left is the second word. But <b>write</b> the full form — dropping ne in the writing test costs marks.' },
    { h: 'With the near future and past',
      p: 'The sandwich goes round the <i>conjugated</i> verb only: <b>je ne vais pas partir</b>, <b>je n\'ai pas compris</b>.' }
  ],
  ex: [
    { fr: "Je n'ai pas encore reçu de réponse.", en: 'I have not yet received a reply.' },
    { fr: 'Elle ne travaille plus ici depuis janvier.', en: 'She no longer works here since January.' },
    { fr: "Il n'y a que deux places libres.", en: 'There are only two free seats.' }
  ],
  drill: [
    { t: 'fill', q: 'Je ___ comprends pas.', a: ['ne'], why: 'ne + verb + pas. In speech you would hear just "je comprends pas".' },
    { t: 'mc', q: '"Je n\'ai rien vu" means…', opts: ['I saw nothing', 'I did not see him', 'I have never seen'], a: 0, why: 'rien = nothing. personne = nobody. jamais = never.' },
    { t: 'mc', q: 'You hear "c\'est pas grave". The full written form is…', opts: ["ce n'est pas grave", 'ce est pas grave', "c'est ne pas grave"], a: 0, why: "Spoken French drops ne; written French must restore it." },
    { t: 'trans', q: 'I no longer live in Paris.', a: ["je n'habite plus à paris", "je ne vis plus à paris"], why: 'ne … plus for "no longer".' }
  ]
},

{
  id: 'a1-questions', stage: 'A1', title: 'Asking questions', mins: 40,
  goal: 'Ask ten good questions in five minutes — literally the speaking Section A task.',
  blocks: [
    { h: 'Three registers of yes/no question',
      p: 'Casual: raise your voice — <b>Vous venez ?</b> Neutral: <b>Est-ce que vous venez ?</b> Formal: invert — <b>Venez-vous ?</b> The exam rewards <b>est-ce que</b> and inversion. Intonation alone reads as too casual with an examiner.' },
    { h: 'Question words',
      p: '<b>qui</b> who, <b>que/quoi</b> what, <b>où</b> where, <b>quand</b> when, <b>comment</b> how, <b>pourquoi</b> why, <b>combien</b> how much/many, <b>quel(le)</b> which/what + noun.' },
    { h: 'Building them',
      p: 'Question word + est-ce que + subject + verb: <b>Quand est-ce que vous partez ?</b> Or question word + inversion: <b>Quand partez-vous ?</b> Both are correct and both score.' },
    { h: 'quel agrees',
      p: '<b>quel</b> is an adjective, so it matches its noun: <b>quel jour</b>, <b>quelle heure</b>, <b>quels documents</b>, <b>quelles conditions</b>. "Quelle est la date ?" not "Qu\'est-ce que la date ?".' }
  ],
  table: {
    head: ['English', 'est-ce que form', 'inversion form'],
    rows: [
      ['Where do you live?', 'Où est-ce que vous habitez ?', 'Où habitez-vous ?'],
      ['When does it start?', 'Quand est-ce que ça commence ?', 'Quand cela commence-t-il ?'],
      ['How much does it cost?', "Combien est-ce que ça coûte ?", 'Combien cela coûte-t-il ?'],
      ['Why is it closed?', "Pourquoi est-ce que c'est fermé ?", 'Pourquoi est-ce fermé ?'],
      ['Which documents?', 'Quels documents est-ce qu\'il faut ?', 'Quels documents faut-il ?']
    ]
  },
  ex: [
    { fr: 'Est-ce que vous pourriez me dire où se trouve le bureau ?', en: 'Could you tell me where the office is?' },
    { fr: "Quels documents est-ce qu'il faut apporter ?", en: 'Which documents do I need to bring?' },
    { fr: 'Combien de temps faut-il compter ?', en: 'How long should I allow?' }
  ],
  drill: [
    { t: 'fill', q: '___ est-ce que vous partez ? (when)', a: ['quand'], why: 'Question word first, then est-ce que.' },
    { t: 'fill', q: '___ heure est-il ? (what)', a: ['quelle'], why: 'quel agrees with heure, which is feminine.' },
    { t: 'mc', q: 'Most appropriate with an examiner:', opts: ['Vous partez quand ?', 'Quand est-ce que vous partez ?', 'Quand tu pars ?'], a: 1, why: 'est-ce que is neutral-formal and always safe. The third uses tu, which is wrong with an examiner.' },
    { t: 'trans', q: 'Could you tell me the price?', a: ['pourriez-vous me dire le prix', 'est-ce que vous pourriez me dire le prix'], why: 'Pourriez-vous + infinitive is the workhorse polite request.' }
  ]
},

{
  id: 'a1-numbers', stage: 'A1', title: 'Numbers, dates, time', mins: 40,
  goal: 'Catch prices, dates and times in fast speech — a guaranteed listening question.',
  blocks: [
    { h: 'The awkward ones',
      p: '70 = <b>soixante-dix</b> (60+10), 80 = <b>quatre-vingts</b> (4×20), 90 = <b>quatre-vingt-dix</b> (4×20+10). So 97 is <b>quatre-vingt-dix-sept</b>. Belgium and Switzerland use septante and nonante — you may hear these in the listening section and should recognise them.' },
    { h: 'Dates',
      p: '<b>le</b> + number + month: <b>le 15 août</b>. Only the first is ordinal: <b>le 1er mai</b>. Months are lowercase. Years are read as a whole number: <b>2026 = deux mille vingt-six</b>.' },
    { h: 'Time',
      p: 'Official and exam contexts use the 24-hour clock: <b>14h30 = quatorze heures trente</b>. Conversation uses <b>et quart</b>, <b>et demie</b>, <b>moins le quart</b>. Note <b>midi</b> and <b>minuit</b> take <b>et demi</b> without the e.' },
    { h: 'Listen for the trap',
      p: 'Listening questions love near-misses: <b>deux</b> vs <b>douze</b>, <b>soixante</b> vs <b>soixante-dix</b>, <b>cent</b> vs <b>cinq cents</b>. Write the number down the instant you hear it rather than holding it in your head.' }
  ],
  ex: [
    { fr: "Le rendez-vous est le 15 août à quatorze heures trente.", en: 'The appointment is on 15 August at 2:30 pm.' },
    { fr: 'Ça coûte quatre-vingt-dix-sept dollars et soixante-quinze cents.', en: 'It costs ninety-seven dollars seventy-five.' },
    { fr: 'Il faut compter une quinzaine de jours.', en: 'You should allow about a fortnight.' }
  ],
  drill: [
    { t: 'mc', q: '"quatre-vingt-dix-sept" is…', opts: ['87', '97', '77'], a: 1, why: '4×20 + 10 + 7 = 97.' },
    { t: 'mc', q: '"seize heures quarante-cinq" is…', opts: ['4:45 pm', '6:45 pm', '4:15 pm'], a: 0, why: '16h45. Subtract 12 for pm times.' },
    { t: 'fill', q: 'Le rendez-vous est ___ 1er mai.', a: ['le'], why: 'Dates take le, and only the first of the month is ordinal.' },
    { t: 'mc', q: 'You hear "septante" in a recording. The speaker is likely from…', opts: ['France', 'Belgium or Switzerland', 'Québec'], a: 1, why: 'Belgium and Switzerland use septante/nonante. Québec uses the French forms.' }
  ]
},

{
  id: 'a1-adj', stage: 'A1', title: 'Adjectives: agreement and position', mins: 40,
  goal: 'Describe things without the grammar errors examiners flag first.',
  blocks: [
    { h: 'They agree',
      p: 'Add <b>-e</b> for feminine, <b>-s</b> for plural, <b>-es</b> for both: <b>un grand homme</b>, <b>une grande femme</b>, <b>des grandes femmes</b>. Adjectives already ending in -e do not double it: <b>un problème difficile</b>, <b>une situation difficile</b>.' },
    { h: 'Irregular feminines',
      p: '-eux → -euse (<b>heureux/heureuse</b>), -f → -ve (<b>actif/active</b>), -er → -ère (<b>cher/chère</b>), -en → -enne (<b>canadien/canadienne</b>), -al → -ale, plural -aux.' },
    { h: 'Most go after the noun',
      p: 'Opposite of English: <b>une voiture rouge</b>, <b>un problème important</b>. The exceptions form the mnemonic <b>BAGS</b> — Beauty, Age, Goodness, Size: <b>beau, joli, jeune, vieux, nouveau, bon, mauvais, grand, petit, gros</b>. These come before: <b>une belle maison</b>, <b>un jeune homme</b>.' },
    { h: 'Position can change meaning',
      p: '<b>un ancien collègue</b> = a former colleague; <b>un collègue ancien</b> = an old (aged) colleague. <b>un grand homme</b> = a great man; <b>un homme grand</b> = a tall man. Worth knowing, occasionally tested in reading.' }
  ],
  ex: [
    { fr: 'C\'est une situation très difficile pour les nouveaux arrivants.', en: 'It is a very difficult situation for newcomers.' },
    { fr: 'Elle est canadienne et elle est très active dans sa communauté.', en: 'She is Canadian and very active in her community.' },
    { fr: 'Ils cherchent un petit appartement pas trop cher.', en: 'They are looking for a small flat that is not too expensive.' }
  ],
  drill: [
    { t: 'fill', q: 'Une femme ___ (heureux).', a: ['heureuse'], why: '-eux becomes -euse in the feminine.' },
    { t: 'fill', q: 'Des solutions ___ (nouveau).', a: ['nouvelles'], why: 'nouveau → nouvelle → nouvelles. Irregular.' },
    { t: 'mc', q: 'Which word order is right?', opts: ['une rouge voiture', 'une voiture rouge'], a: 1, why: 'Colour adjectives follow the noun. Only BAGS adjectives come first.' },
    { t: 'mc', q: '"un ancien collègue" means…', opts: ['an elderly colleague', 'a former colleague'], a: 1, why: 'Before the noun, ancien means former.' },
    { t: 'trans', q: 'It is a very difficult situation.', a: ["c'est une situation très difficile"], why: 'Adjective after, agreeing with the feminine noun.' }
  ]
},

{
  id: 'a1-prep', stage: 'A1', title: 'Prepositions and contractions', mins: 35,
  goal: 'Stop making the single most common written error.',
  blocks: [
    { h: 'à and de contract',
      p: '<b>à + le = au</b>, <b>à + les = aux</b>, <b>de + le = du</b>, <b>de + les = des</b>. <b>à la</b> and <b>de la</b> never contract. Writing "à le bureau" instead of "au bureau" is an instant marker of a beginner.' },
    { h: 'Countries and cities',
      p: 'Cities take <b>à</b>: <b>à Montréal</b>. Feminine countries (most ending in -e) take <b>en</b>: <b>en France</b>, <b>en Inde</b>. Masculine take <b>au</b>: <b>au Canada</b>, <b>au Japon</b>. Plural take <b>aux</b>: <b>aux États-Unis</b>.' },
    { h: 'Time prepositions',
      p: '<b>depuis</b> = since/for, with the <i>present</i> tense for ongoing situations: <b>j\'habite ici depuis trois ans</b> (I have lived here for three years — not the past tense, this catches every English speaker). <b>pendant</b> = for a finished duration. <b>dans</b> = in (future). <b>il y a</b> = ago.' },
    { h: 'Verbs that demand a preposition',
      p: 'Memorise these with the verb: <b>penser à</b>, <b>parler de</b>, <b>avoir besoin de</b>, <b>commencer à</b>, <b>essayer de</b>, <b>réussir à</b>, <b>décider de</b>, <b>s\'occuper de</b>, <b>dépendre de</b>.' }
  ],
  table: {
    head: ['', 'à', 'de'],
    rows: [
      ['+ le', 'au bureau', 'du bureau'],
      ['+ la', 'à la maison', 'de la maison'],
      ["+ l'", "à l'hôpital", "de l'hôpital"],
      ['+ les', 'aux enfants', 'des enfants']
    ]
  },
  ex: [
    { fr: "Je travaille au Canada depuis deux ans.", en: 'I have been working in Canada for two years.' },
    { fr: "Elle parle des problèmes de l'entreprise.", en: 'She is talking about the company\'s problems.' },
    { fr: "J'ai déménagé il y a six mois, et dans un mois je change de travail.", en: 'I moved six months ago, and in a month I am changing job.' }
  ],
  drill: [
    { t: 'fill', q: 'Je vais ___ bureau. (à + le)', a: ['au'], why: 'à + le always contracts to au.' },
    { t: 'fill', q: "Il parle ___ enfants. (de + les)", a: ['des'], why: 'de + les = des.' },
    { t: 'fill', q: "J'habite ici ___ trois ans.", a: ['depuis'], why: 'depuis + present tense for something still going on.' },
    { t: 'mc', q: 'Which is correct?', opts: ['Je vis en Canada', 'Je vis au Canada', 'Je vis à Canada'], a: 1, why: 'Canada is a masculine country, so au.' },
    { t: 'trans', q: 'I have been living here for three years.', a: ["j'habite ici depuis trois ans", "je vis ici depuis trois ans"], why: 'Present tense with depuis. English uses a perfect, French does not.' }
  ]
},

/* ========================= A2 ========================= */
{
  id: 'a2-pc-avoir', stage: 'A2', title: 'Passé composé with avoir', mins: 50,
  goal: 'Talk about what happened — the backbone of the writing test.',
  blocks: [
    { h: 'Two pieces',
      p: 'Auxiliary <b>avoir</b> in the present + past participle. <b>J\'ai parlé.</b> <b>Nous avons fini.</b> That is the whole structure for most verbs.' },
    { h: 'Forming the participle',
      p: '-er verbs → <b>-é</b> (parlé, mangé). -ir verbs → <b>-i</b> (fini, choisi). -re verbs → <b>-u</b> (vendu, attendu). Then there is a list of irregulars you simply learn.' },
    { h: 'The irregulars that matter',
      p: '<b>avoir→eu</b>, <b>être→été</b>, <b>faire→fait</b>, <b>prendre→pris</b>, <b>voir→vu</b>, <b>pouvoir→pu</b>, <b>vouloir→voulu</b>, <b>devoir→dû</b>, <b>savoir→su</b>, <b>mettre→mis</b>, <b>dire→dit</b>, <b>écrire→écrit</b>, <b>lire→lu</b>, <b>boire→bu</b>, <b>recevoir→reçu</b>, <b>ouvrir→ouvert</b>, <b>offrir→offert</b>, <b>comprendre→compris</b>.' },
    { h: 'Negation wraps the auxiliary',
      p: '<b>Je n\'ai pas compris.</b> Not "je n\'ai compris pas". Same for jamais, rien, plus: <b>je n\'ai rien fait</b>.' }
  ],
  ex: [
    { fr: "J'ai reçu votre courriel mais je n'ai pas eu le temps de répondre.", en: 'I received your email but I did not have time to reply.' },
    { fr: 'Nous avons pris la décision ensemble.', en: 'We took the decision together.' },
    { fr: 'Elle a compris tout de suite ce qui se passait.', en: 'She immediately understood what was happening.' }
  ],
  drill: [
    { t: 'fill', q: "J'ai ___ (prendre) le bus.", a: ['pris'], why: 'prendre → pris. Also applies to comprendre → compris, apprendre → appris.' },
    { t: 'fill', q: 'Nous avons ___ (faire) une erreur.', a: ['fait'], why: 'faire → fait.' },
    { t: 'mc', q: 'Correct negative:', opts: ["Je n'ai compris pas", "Je n'ai pas compris", 'Je ne compris pas'], a: 1, why: 'pas sits between the auxiliary and the participle.' },
    { t: 'trans', q: 'I received your email.', a: ["j'ai reçu votre courriel", "j'ai reçu votre email", "j'ai reçu ton courriel"], why: 'recevoir → reçu, with the cedilla.' }
  ]
},

{
  id: 'a2-pc-etre', stage: 'A2', title: 'Passé composé with être', mins: 45,
  goal: 'Get agreement right — a visible, heavily-marked error.',
  blocks: [
    { h: 'A small set of verbs uses être',
      p: 'Mostly verbs of movement and change of state. The classic mnemonic is <b>DR MRS VANDERTRAMP</b>: devenir, revenir, monter, rester, sortir, venir, aller, naître, descendre, entrer, rentrer, tomber, retourner, arriver, mourir, partir. Plus all reflexive verbs.' },
    { h: 'The participle agrees with the subject',
      p: 'Like an adjective. <b>Il est allé</b>, <b>elle est allée</b>, <b>ils sont allés</b>, <b>elles sont allées</b>. The agreement is mostly silent but must be written. Examiners look for it.' },
    { h: 'Some verbs switch',
      p: '<b>monter, descendre, sortir, rentrer, retourner, passer</b> take <b>avoir</b> when they have a direct object, and the meaning shifts: <b>je suis sorti</b> (I went out) vs <b>j\'ai sorti les poubelles</b> (I took the bins out).' },
    { h: 'Reflexives always take être',
      p: '<b>Je me suis levé.</b> <b>Elle s\'est levée.</b> <b>Nous nous sommes rencontrés.</b>' }
  ],
  ex: [
    { fr: 'Elle est arrivée au Canada en 2023 et elle est restée à Montréal.', en: 'She arrived in Canada in 2023 and stayed in Montréal.' },
    { fr: 'Nous nous sommes rencontrés pendant la formation.', en: 'We met during the training course.' },
    { fr: "Je suis sorti à huit heures, puis j'ai sorti les poubelles.", en: 'I went out at eight, then I took out the bins.' }
  ],
  drill: [
    { t: 'fill', q: 'Elle est ___ (aller) à Québec.', a: ['allée'], why: 'être verb, feminine subject, so add -e.' },
    { t: 'fill', q: 'Ils sont ___ (partir) tôt.', a: ['partis'], why: 'Masculine plural, add -s.' },
    { t: 'mc', q: 'Which takes avoir?', opts: ["Je ___ arrivé", "J'___ sorti les poubelles"], a: 1, why: 'With a direct object, sortir switches to avoir and means "to take out".' },
    { t: 'trans', q: 'We met during the training course.', a: ['nous nous sommes rencontrés pendant la formation', 'on s\'est rencontrés pendant la formation'], why: 'Reflexive, so être, with agreement.' }
  ]
},

{
  id: 'a2-imparfait', stage: 'A2', title: 'Imparfait, and choosing between the two pasts', mins: 55,
  goal: 'Narrate properly — this distinction alone separates NCLC 5 from NCLC 7 in writing.',
  blocks: [
    { h: 'Forming it is easy',
      p: 'Take the <b>nous</b> form of the present, drop <b>-ons</b>, add <b>-ais, -ais, -ait, -ions, -iez, -aient</b>. <b>nous parlons</b> → <b>je parlais</b>. One exception: <b>être</b> → <b>j\'étais</b>.' },
    { h: 'What each past is for',
      p: '<b>Passé composé</b> = a completed event that moves the story forward. <b>Imparfait</b> = background, description, habit, state, ongoing action interrupted by something else.' },
    { h: 'The film metaphor',
      p: 'Imparfait is the set, the weather, the mood, what was already happening. Passé composé is the action that occurs. <b>Il pleuvait</b> (background) <b>quand je suis sorti</b> (event).' },
    { h: 'Trigger words',
      p: 'Imparfait: <b>souvent, toujours, d\'habitude, chaque jour, tous les ans, pendant que</b>. Passé composé: <b>soudain, tout à coup, hier, une fois, en 2023, puis</b>.' }
  ],
  table: {
    head: ['Use', 'Tense', 'Example'],
    rows: [
      ['Habit', 'imparfait', "Quand j'étais jeune, je jouais au cricket."],
      ['Description / state', 'imparfait', 'Il faisait froid et il n\'y avait personne.'],
      ['Single completed event', 'passé composé', 'Hier, j\'ai reçu une réponse.'],
      ['Interrupted action', 'imp. + PC', 'Je dormais quand le téléphone a sonné.'],
      ['Sequence of events', 'passé composé', "Je suis entré, j'ai vu l'affiche, j'ai compris."]
    ]
  },
  ex: [
    { fr: "Quand je suis arrivé, il pleuvait et il n'y avait personne dans la rue.", en: 'When I arrived, it was raining and there was nobody in the street.' },
    { fr: "D'habitude je prenais le métro, mais ce jour-là j'ai pris un taxi.", en: 'I usually took the metro, but that day I took a taxi.' },
    { fr: 'Elle travaillait depuis deux heures quand elle a compris son erreur.', en: 'She had been working for two hours when she realised her mistake.' }
  ],
  drill: [
    { t: 'mc', q: 'Quand j\'étais petit, je ___ souvent au parc.', opts: ['suis allé', 'allais'], a: 1, why: '"souvent" + childhood habit = imparfait.' },
    { t: 'mc', q: 'Hier, je ___ une lettre importante.', opts: ['recevais', 'ai reçu'], a: 1, why: '"Hier" + single completed event = passé composé.' },
    { t: 'fill', q: 'Je ___ (dormir) quand le téléphone a sonné.', a: ['dormais'], why: 'Ongoing action interrupted → imparfait.' },
    { t: 'fill', q: "Il ___ (faire) froid ce matin-là.", a: ['faisait'], why: 'Weather and description are always imparfait.' },
    { t: 'trans', q: 'It was raining when I arrived.', a: ['il pleuvait quand je suis arrivé', 'il pleuvait quand je suis arrivée'], why: 'Background imparfait + event passé composé. The exact pattern Section A of the TEF writing test wants.' }
  ]
},

{
  id: 'a2-futur', stage: 'A2', title: 'The futures', mins: 40,
  goal: 'Talk about plans and predictions.',
  blocks: [
    { h: 'Futur proche — what people actually say',
      p: '<b>aller</b> + infinitive. <b>Je vais chercher un emploi.</b> Use it for anything planned or imminent. In speech it far outweighs the simple future.' },
    { h: 'Futur simple — writing and formality',
      p: 'Add <b>-ai, -as, -a, -ons, -ez, -ont</b> to the infinitive (dropping a final -e): <b>je parlerai, je finirai, je vendrai</b>. The endings are the present tense of avoir — a useful memory hook.' },
    { h: 'Irregular stems',
      p: 'Learn the stem once, the endings never change: <b>être→ser-</b>, <b>avoir→aur-</b>, <b>aller→ir-</b>, <b>faire→fer-</b>, <b>venir→viendr-</b>, <b>pouvoir→pourr-</b>, <b>vouloir→voudr-</b>, <b>devoir→devr-</b>, <b>savoir→saur-</b>, <b>voir→verr-</b>, <b>falloir→faudr-</b>.' },
    { h: 'quand takes the future',
      p: 'Where English uses the present after "when", French uses the future: <b>Quand j\'aurai mon permis, je chercherai un emploi.</b> Not "quand j\'ai". Same for <b>dès que</b> and <b>lorsque</b>.' }
  ],
  ex: [
    { fr: "Je vais passer l'examen au printemps.", en: 'I am going to take the exam in the spring.' },
    { fr: "Quand j'aurai le niveau requis, je déposerai ma demande.", en: 'When I have the required level, I will submit my application.' },
    { fr: 'Il faudra prévoir plusieurs mois de préparation.', en: 'Several months of preparation will be needed.' }
  ],
  drill: [
    { t: 'fill', q: "Quand j'___ (avoir) mon permis, je partirai.", a: ['aurai'], why: 'After quand, French uses the future where English uses the present.' },
    { t: 'fill', q: 'Nous ___ (être) prêts demain.', a: ['serons'], why: 'être → ser- + ons.' },
    { t: 'mc', q: 'Most natural in conversation:', opts: ['Je partirai demain', 'Je vais partir demain'], a: 1, why: 'Futur proche dominates speech. Both are correct, but the second sounds more natural.' },
    { t: 'trans', q: 'I am going to take the exam in the spring.', a: ["je vais passer l'examen au printemps"], why: 'Note: "passer un examen" means to sit it, not to pass it. To pass is "réussir".' }
  ]
},

{
  id: 'a2-pronouns', stage: 'A2', title: 'Object pronouns, y and en', mins: 55,
  goal: 'Stop repeating nouns — a marked feature of higher-level writing.',
  blocks: [
    { h: 'Direct vs indirect',
      p: 'Direct objects (no preposition) → <b>me, te, le/la, nous, vous, les</b>. Indirect objects (introduced by <b>à</b>) → <b>me, te, lui, nous, vous, leur</b>. <b>Je vois Marie</b> → <b>je la vois</b>. <b>Je parle à Marie</b> → <b>je lui parle</b>.' },
    { h: 'They go before the verb',
      p: 'Always before the conjugated verb, or before the infinitive if there is one: <b>je le vois</b>, <b>je ne le vois pas</b>, <b>je vais le voir</b>, <b>je l\'ai vu</b>.' },
    { h: 'y replaces à + place or thing',
      p: '<b>Je vais à Montréal</b> → <b>j\'y vais</b>. <b>Je pense à mon avenir</b> → <b>j\'y pense</b>.' },
    { h: 'en replaces de + something, or a quantity',
      p: '<b>Je parle de mon travail</b> → <b>j\'en parle</b>. <b>J\'ai deux frères</b> → <b>j\'en ai deux</b>. <b>Je veux du café</b> → <b>j\'en veux</b>.' },
    { h: 'Agreement with a preceding direct object',
      p: 'When a direct object pronoun comes before <b>avoir</b>, the participle agrees with it: <b>la lettre ? Je l\'ai reçue.</b> This is a classic higher-level marker.' }
  ],
  table: {
    head: ['Replaces', 'Pronoun', 'Example'],
    rows: [
      ['direct object', 'le / la / les', 'Je les connais.'],
      ['indirect (à + person)', 'lui / leur', 'Je lui ai téléphoné.'],
      ['à + thing or place', 'y', "J'y pense souvent."],
      ['de + thing', 'en', "Nous en avons parlé."],
      ['a quantity', 'en', "J'en ai trois."]
    ]
  },
  ex: [
    { fr: "J'ai reçu la lettre hier — je l'ai lue tout de suite.", en: 'I got the letter yesterday — I read it straight away.' },
    { fr: "Le dossier ? Je m'en occupe cette semaine.", en: 'The file? I am dealing with it this week.' },
    { fr: 'Je leur ai expliqué la situation, mais ils ne m\'ont pas répondu.', en: 'I explained the situation to them, but they did not reply.' }
  ],
  drill: [
    { t: 'fill', q: 'Je parle à mes collègues → Je ___ parle.', a: ['leur'], why: 'parler à + people = indirect, plural = leur.' },
    { t: 'fill', q: 'Il va à Ottawa → Il ___ va.', a: ['y'], why: 'y replaces à + a place.' },
    { t: 'fill', q: "J'ai besoin de repos → J'___ ai besoin.", a: ['en'], why: 'en replaces de + noun.' },
    { t: 'mc', q: 'La lettre ? Je l\'ai ___.', opts: ['reçu', 'reçue'], a: 1, why: 'The direct object (la lettre, feminine) comes before avoir, so the participle agrees.' },
    { t: 'trans', q: 'The file? I am dealing with it.', a: ["le dossier ? je m'en occupe", "le dossier, je m'en occupe"], why: "s'occuper de → en." }
  ]
},

{
  id: 'a2-reflexive', stage: 'A2', title: 'Reflexive verbs', mins: 35,
  goal: 'Describe routines and feelings the way French does.',
  blocks: [
    { h: 'The verb acts on the subject',
      p: '<b>se lever</b> (to get up), <b>se coucher</b>, <b>s\'habiller</b>, <b>se laver</b>. The pronoun changes with the subject: <b>je me lève, tu te lèves, il se lève, nous nous levons, vous vous levez, ils se lèvent</b>.' },
    { h: 'Many are not reflexive in meaning at all',
      p: 'French just uses this form for many everyday verbs: <b>s\'appeler</b> (to be called), <b>se souvenir de</b> (to remember), <b>se rendre compte de</b> (to realise), <b>s\'inquiéter</b> (to worry), <b>se passer</b> (to happen), <b>s\'occuper de</b> (to deal with), <b>se trouver</b> (to be located).' },
    { h: 'Always être in the past',
      p: '<b>Je me suis levé tôt.</b> <b>Elle s\'est rendu compte.</b> Agreement follows the subject when the reflexive pronoun is the direct object.' },
    { h: 'Reciprocal use',
      p: 'With a plural subject it can mean "each other": <b>nous nous sommes rencontrés</b> (we met each other), <b>ils se parlent</b> (they talk to each other).' }
  ],
  ex: [
    { fr: 'Je me lève à six heures et je me prépare en vingt minutes.', en: 'I get up at six and get ready in twenty minutes.' },
    { fr: "Je me suis rendu compte que je m'étais trompé.", en: 'I realised I had made a mistake.' },
    { fr: 'Le bureau se trouve à côté de la gare.', en: 'The office is next to the station.' }
  ],
  drill: [
    { t: 'fill', q: 'Nous ___ levons à sept heures.', a: ['nous'], why: 'The reflexive pronoun matches the subject: nous nous levons.' },
    { t: 'fill', q: 'Elle ___ est couchée tard.', a: ["s'"], why: "se + est → s'est." },
    { t: 'mc', q: '"Qu\'est-ce qui se passe ?" means…', opts: ['Who is passing?', "What's happening?", 'What passes?'], a: 1, why: 'se passer = to happen. A high-frequency listening phrase.' },
    { t: 'trans', q: 'I realised I had made a mistake.', a: ["je me suis rendu compte que je m'étais trompé", "je me suis rendu compte que je m'étais trompée"], why: 'Note "rendu" does not agree here — compte is the direct object.' }
  ]
},

{
  id: 'a2-compare', stage: 'A2', title: 'Comparing things', mins: 30,
  goal: 'Build the comparisons the writing and speaking tasks demand.',
  blocks: [
    { h: 'The three comparatives',
      p: '<b>plus … que</b> (more than), <b>moins … que</b> (less than), <b>aussi … que</b> (as … as). <b>Le loyer est plus cher à Toronto qu\'à Montréal.</b>' },
    { h: 'Superlative',
      p: '<b>le/la/les plus</b> or <b>le/la/les moins</b> + adjective. If the adjective follows the noun, repeat the article: <b>la solution la plus efficace</b>.' },
    { h: 'The irregulars',
      p: '<b>bon → meilleur</b> (better), <b>bien → mieux</b> (better, adverb), <b>mauvais → pire</b>. Confusing meilleur and mieux is very common: meilleur describes a noun, mieux describes a verb. <b>Un meilleur résultat</b>, but <b>il travaille mieux</b>.' },
    { h: 'With quantities',
      p: '<b>plus de / moins de / autant de</b> + noun: <b>plus de temps</b>, <b>moins de stress</b>, <b>autant de travail</b>.' }
  ],
  ex: [
    { fr: "Le coût de la vie est moins élevé à Montréal qu'à Vancouver.", en: 'The cost of living is lower in Montréal than in Vancouver.' },
    { fr: "C'est la solution la plus efficace à long terme.", en: 'It is the most effective solution in the long run.' },
    { fr: 'Il y a plus de possibilités mais autant de concurrence.', en: 'There are more opportunities but just as much competition.' }
  ],
  drill: [
    { t: 'fill', q: 'Montréal est ___ cher que Toronto.', a: ['moins'], why: 'moins … que for "less … than".' },
    { t: 'mc', q: 'Which is correct?', opts: ['Il parle meilleur français', 'Il parle mieux français'], a: 1, why: 'mieux modifies the verb parler. meilleur would modify a noun.' },
    { t: 'fill', q: "C'est ___ solution ___ plus simple.", a: ['la la'], why: 'When the adjective follows the noun, the article repeats: la solution la plus simple.' },
    { t: 'trans', q: 'There are more opportunities.', a: ['il y a plus de possibilités', "il y a plus d'opportunités"], why: 'plus de + noun, never "plus des".' }
  ]
},

{
  id: 'a2-connect', stage: 'A2', title: 'Connectors and first opinions', mins: 40,
  goal: 'Stop writing lists of short sentences — the fastest visible upgrade.',
  blocks: [
    { h: 'Why this matters more than vocabulary',
      p: 'Examiners score <b>coherence and thematic development</b> as a separate criterion. Three simple sentences joined well score better than three complex ones dropped side by side. Learn twenty connectors properly and your writing band moves.' },
    { h: 'Adding and sequencing',
      p: '<b>d\'abord</b> (first), <b>ensuite / puis</b> (then), <b>de plus / en outre</b> (moreover), <b>enfin</b> (finally), <b>d\'une part … d\'autre part</b> (on one hand … on the other).' },
    { h: 'Contrast',
      p: '<b>mais</b> (but), <b>cependant / pourtant</b> (however), <b>en revanche / par contre</b> (on the other hand), <b>malgré</b> + noun (despite), <b>bien que</b> + subjunctive (although).' },
    { h: 'Cause and consequence',
      p: '<b>parce que</b> (because), <b>car</b> (for — written), <b>puisque</b> (since, known reason), <b>grâce à</b> (thanks to), <b>à cause de</b> (because of — negative), <b>donc</b> (so), <b>par conséquent</b> (consequently), <b>c\'est pourquoi</b> (that is why).' },
    { h: 'Giving an opinion',
      p: '<b>à mon avis</b>, <b>selon moi</b>, <b>je pense que</b>, <b>je trouve que</b>, <b>il me semble que</b>, <b>personnellement</b>. Vary them — repeating "je pense que" six times is penalised.' }
  ],
  ex: [
    { fr: "D'abord, le loyer est élevé. De plus, les transports coûtent cher. C'est pourquoi beaucoup de gens partent.", en: 'First, rent is high. Moreover, transport is expensive. That is why many people leave.' },
    { fr: "Le télétravail est pratique ; en revanche, il isole.", en: 'Remote work is convenient; on the other hand, it isolates you.' },
    { fr: "Grâce à cette formation, j'ai pu trouver un emploi.", en: 'Thanks to this course, I was able to find a job.' }
  ],
  drill: [
    { t: 'mc', q: '"___ à la pluie, le match a été annulé." (negative cause)', opts: ['Grâce', 'À cause de'], a: 1, why: 'grâce à = positive cause, à cause de = negative.' },
    { t: 'mc', q: 'Best connector for a contrast in formal writing:', opts: ['mais', 'cependant', 'et'], a: 1, why: 'cependant and néanmoins read as more formal than mais.' },
    { t: 'fill', q: "___ mon avis, cette décision est juste.", a: ['à', 'a'], why: 'à mon avis. Also: selon moi, pour ma part.' },
    { t: 'trans', q: 'First, rent is high. Moreover, transport is expensive.', a: ["d'abord, le loyer est élevé. de plus, les transports coûtent cher", "d'abord le loyer est élevé. de plus les transports coûtent cher"], why: 'Exactly the structure Section B of the writing test rewards.' }
  ]
}

];
