/* ============================================================================
   exam-data.js — templates, practice banks and scoring
   ---------------------------------------------------------------------------
   Listening items are TEXT read aloud by the device voice. The transcript is
   hidden until the candidate has answered, which is the point.
   ========================================================================= */

/* ------------------------------------------------------------ NCLC bands */

const BANDS = {
  note: 'A practice score is an indication, not a calibrated result. The real exams weight questions by difficulty; this one does not.',
  // raw % correct → rough NCLC for the multiple-choice sections
  mcq: [
    { pct: 88, nclc: 10 }, { pct: 80, nclc: 9 }, { pct: 72, nclc: 8 },
    { pct: 62, nclc: 7 },  { pct: 50, nclc: 6 }, { pct: 38, nclc: 5 },
    { pct: 25, nclc: 4 },  { pct: 0,  nclc: 3 }
  ]
};

function nclcFromPct(pct) {
  for (const b of BANDS.mcq) if (pct >= b.pct) return b.nclc;
  return 3;
}

/* ====================================================== WRITING TEMPLATES */

const WRITE_TEMPLATES = [
{
  id: 'tef-ee-a', exam: 'TEF', title: 'TEF Expression écrite — Section A',
  brief: 'You are given a 30–50 word news brief (a fait divers) that stops mid-story. You continue it.',
  specs: ['Minimum 80 words — aim for 90–100', 'About 25 minutes including 3 minutes planning', 'Neutral or informal register, past tenses, journalistic tone', 'Going past 110 words wastes time without earning marks'],
  structure: [
    { step: 'Set the scene', how: 'Imparfait — weather, time, who was there, what was normal.', model: "Ce matin-là, il pleuvait et la rue était presque déserte." },
    { step: 'The event', how: 'Passé composé — what actually happened, in sequence.', model: "Vers huit heures, un automobiliste a perdu le contrôle de son véhicule et a heurté un lampadaire." },
    { step: 'The reaction', how: 'Passé composé — who intervened, what they did.', model: "Les témoins ont immédiatement prévenu les secours, qui sont arrivés en quelques minutes." },
    { step: 'The outcome', how: 'Passé composé / présent — result and current state.', model: "Le conducteur, légèrement blessé, a été transporté à l'hôpital. Une enquête est en cours." }
  ],
  phrases: ['Ce matin-là / Ce jour-là', 'Vers huit heures', 'Selon les témoins', 'Peu après', 'Les secours sont intervenus', 'Aucun blessé grave n\'est à déplorer', 'Une enquête a été ouverte', 'Les circonstances restent à déterminer'],
  trap: 'The single biggest error is writing the whole thing in the passé composé. The marker is looking for imparfait for background and passé composé for events. Mix them deliberately.'
},
{
  id: 'tef-ee-b', exam: 'TEF', title: 'TEF Expression écrite — Section B',
  brief: 'You are given a statement or short extract and must take a clear position, in a formal letter or opinion piece.',
  specs: ['Minimum 200 words — aim for 200–230', 'About 35 minutes: 5 planning, 20 writing, 10 checking', 'Below 180 words is a serious problem', 'Formal register throughout — vous, no dropped ne'],
  structure: [
    { step: 'Opening + position', how: 'State the topic and your stance in two sentences. Do not keep the marker guessing.', model: "La question de l'usage du téléphone au travail fait débat. Pour ma part, je considère qu'un encadrement souple est préférable à une interdiction totale." },
    { step: 'Argument 1 + example', how: 'One idea, then a concrete illustration.', model: "D'abord, une interdiction stricte nuit à la confiance. En effet, dans l'entreprise où je travaillais, une mesure de ce type a provoqué une nette démotivation." },
    { step: 'Argument 2 + example', how: 'Second idea, reinforced.', model: "De plus, le téléphone est devenu un outil de travail, d'autant plus que de nombreuses tâches se font désormais sur mobile." },
    { step: 'Concession', how: 'Acknowledge the other side then rebut. This is the B2 move.', model: "Certes, les abus existent et nuisent à la productivité. Néanmoins, ils relèvent davantage d'un problème de management que de technologie." },
    { step: 'Conclusion', how: 'Restate and propose.', model: "En définitive, il me semble préférable de fixer des règles claires plutôt que d'interdire. Une charte interne, négociée avec les employés, permettrait de concilier les deux exigences." }
  ],
  phrases: ['La question de … fait débat', 'Pour ma part, je considère que', "D'abord / De plus / Par ailleurs", 'En effet, …', "D'autant plus que", 'Certes, … néanmoins …', 'Il n\'en demeure pas moins que', 'En définitive / En somme', 'Il conviendrait de'],
  trap: 'Candidates run out of time and abandon the conclusion. Write the conclusion at minute 25 whatever state the body is in — an unfinished argument scores better than a missing structure.'
},
{
  id: 'tcf-ee-1', exam: 'TCF', title: 'TCF Expression écrite — Task 1',
  brief: 'A short message describing a situation, to a specific reader (a friend, a colleague, a service).',
  specs: ['60–120 words', 'About 10–12 minutes', 'Register follows the reader named in the prompt — check tu vs vous'],
  structure: [
    { step: 'Greeting', how: 'Match the relationship.', model: "Bonjour Camille," },
    { step: 'Why you are writing', how: 'One sentence.', model: "Je t'écris pour te parler de l'appartement que j'ai visité hier." },
    { step: 'The description', how: 'Three or four concrete details.', model: "Il se trouve près du métro, il y a deux chambres et une grande cuisine. Le loyer est de 1 200 dollars par mois, charges comprises." },
    { step: 'Close', how: 'A question or a next step.', model: "Qu'en penses-tu ? Dis-moi si tu veux le visiter avec moi. À bientôt," }
  ],
  phrases: ['Je t\'écris pour', 'Il se trouve …', 'Ce qui m\'a plu, c\'est …', 'En revanche, …', "Qu'en penses-tu ?", 'Dis-moi ce que tu en penses'],
  trap: 'Under 60 words is automatically penalised. Count roughly — four sentences of 15–20 words gets you there safely.'
},
{
  id: 'tcf-ee-2', exam: 'TCF', title: 'TCF Expression écrite — Task 2',
  brief: 'Recount an experience, usually for a blog, a forum or a magazine.',
  specs: ['120–150 words', 'About 20 minutes', 'Past tenses are the whole point of this task'],
  structure: [
    { step: 'Set up', how: 'Imparfait — context, when, where, mood.', model: "L'an dernier, je venais d'arriver au Canada et je ne connaissais personne." },
    { step: 'What happened', how: 'Passé composé — the sequence.', model: "Un jour, j'ai décidé de m'inscrire à un cours de français. J'y ai rencontré des gens venus du monde entier." },
    { step: 'The turning point', how: 'The moment it changed.', model: "Au bout de quelques semaines, j'ai réalisé que je comprenais enfin les conversations autour de moi." },
    { step: 'What you took from it', how: 'Présent — the lesson, now.', model: "Aujourd'hui, je continue à étudier et je recommande vivement cette expérience à toute personne qui vient de s'installer ici." }
  ],
  phrases: ["L'an dernier / Il y a deux ans", 'À cette époque, …', 'Un jour, …', 'Au bout de quelques semaines', "Ce qui m'a le plus marqué, c'est …", 'Avec le recul', 'Je recommande vivement'],
  trap: 'Same as TEF Section A — do not write it all in one tense. The imparfait/passé composé alternation is the graded skill.'
},
{
  id: 'tcf-ee-3', exam: 'TCF', title: 'TCF Expression écrite — Task 3',
  brief: 'Two short texts give opposing views. You summarise both, then give your own reasoned position.',
  specs: ['120–180 words', 'About 25 minutes', 'You must do all three parts — summarise A, summarise B, then conclude'],
  structure: [
    { step: 'Summarise text A', how: 'Two sentences, reported, not copied.', model: "Le premier texte défend l'idée que le télétravail améliore la qualité de vie, en réduisant les trajets et le stress." },
    { step: 'Summarise text B', how: 'Two sentences, marking the contrast.', model: "Le second, en revanche, souligne l'isolement des salariés et la difficulté à séparer vie professionnelle et vie privée." },
    { step: 'Your position', how: 'Take a side, give one reason and one example.', model: "Pour ma part, je partage davantage le second point de vue. En effet, j'ai constaté qu'après plusieurs mois à distance, les échanges informels — pourtant essentiels — disparaissent presque totalement." },
    { step: 'Nuanced close', how: 'One sentence that concedes and resolves.', model: "Cela dit, une formule hybride me paraîtrait le meilleur compromis." }
  ],
  phrases: ['Le premier texte défend l\'idée que', 'Le second, en revanche, souligne', 'Les deux textes s\'opposent sur', 'Pour ma part, je partage davantage', "J'ai constaté que", 'Cela dit, …', 'me paraîtrait le meilleur compromis'],
  trap: 'Copying sentences from the source texts is heavily penalised. Reformulate — that is the skill being measured.'
}
];

/* ===================================================== SPEAKING TEMPLATES */

const SPEAK_TEMPLATES = [
{
  id: 'tef-eo-a', exam: 'TEF', title: 'TEF Expression orale — Section A',
  brief: 'You draw a card and must obtain information from the examiner, who plays a receptionist or clerk. You ask, they answer briefly.',
  specs: ['About 5 minutes', 'Target 10–12 questions', 'vous throughout', 'Variety of question forms is explicitly scored'],
  structure: [
    { step: 'Open politely', how: 'Greet and state your purpose.', model: "Bonjour Madame, je vous appelle au sujet de l'annonce pour le cours de français. Pourrais-je vous poser quelques questions ?" },
    { step: 'Rotate your question forms', how: 'Do not use est-ce que ten times. Alternate.', model: "Quels sont les horaires ? / Est-ce qu'il reste des places ? / Pourriez-vous me préciser le tarif ? / Le matériel est-il fourni ? / Combien de temps dure la formation ?" },
    { step: 'Ask a follow-up on their answer', how: 'This is what separates a good candidate from a list-reader.', model: "Vous dites deux fois par semaine — s'agit-il toujours des mêmes jours ?" },
    { step: 'Confirm and close', how: 'Recap, thank, sign off.', model: "Si je comprends bien, le cours commence le 12 et coûte 300 dollars. Je vous remercie beaucoup de ces précisions. Bonne journée !" }
  ],
  phrases: ['Je vous appelle au sujet de', 'Pourriez-vous me préciser …', "J'aurais aimé savoir si …", 'Serait-il possible de …', 'Quels sont les … ?', "Est-ce qu'il faut … ?", 'Si je comprends bien, …', 'Je vous remercie de ces précisions'],
  trap: 'Silence is the killer. If you cannot think of a question, ask about price, timing, location, documents needed, or cancellation policy — those five work for almost any scenario.'
},
{
  id: 'tef-eo-b', exam: 'TEF', title: 'TEF Expression orale — Section B',
  brief: 'You must persuade the examiner of something. They play a sceptic and will push back — you must answer the objection, not restart your speech.',
  specs: ['About 10 minutes, 1 minute preparation', 'Interaction quality is scored — a monologue scores badly', 'Conditional and hedging language is expected'],
  structure: [
    { step: 'State the proposal', how: 'Concrete and specific.', model: "Je voudrais te convaincre de partir en vacances en train plutôt qu'en avion cet été." },
    { step: 'Two arguments with benefit to them', how: 'Not why you want it — why they gain.', model: "D'abord, tu pourrais voir le paysage et te reposer vraiment. De plus, ce serait nettement moins cher, et on pourrait garder ce budget pour les activités sur place." },
    { step: 'Handle the objection', how: 'Name it, concede a little, then answer it.', model: "Je comprends que le temps de trajet t'inquiète. Certes, c'est plus long. Mais si on prend le train de nuit, on dort pendant le trajet et on ne perd pas une journée." },
    { step: 'Close with a concession', how: 'Offer a compromise so they can say yes.', model: "Et si on essayait cette fois ? Si ça ne te plaît pas, on reprendra l'avion l'année prochaine." }
  ],
  phrases: ["Je voudrais te convaincre de", "Ce serait l'occasion de", "Tu ne crois pas que … ?", "Je comprends ton point de vue, mais", "Certes, … mais", "Si on faisait …, on pourrait …", "Qu'est-ce que tu en penses ?", "Et si on essayait ?"],
  trap: 'Candidates prepare a speech and deliver it over the examiner\'s objections. The objection is the test. Stop, acknowledge it by name, answer it, then continue.'
},
{
  id: 'tcf-eo', exam: 'TCF', title: 'TCF Expression orale — the three tasks',
  brief: 'Task 1: introduce yourself. Task 2: ask for information. Task 3: express and defend a point of view.',
  specs: ['About 12 minutes total', 'Task 1 has no preparation — it starts immediately', 'Task 3 is the one that decides your band'],
  structure: [
    { step: 'Task 1 — introduce yourself', how: 'Prepare this cold. It is the same every time.', model: "Je m'appelle …, j'ai 28 ans et je suis originaire de l'Inde. Je travaille dans l'informatique depuis cinq ans. J'apprends le français parce que je souhaite m'installer au Canada. Dans mes temps libres, j'aime la randonnée et la cuisine." },
    { step: 'Task 2 — ask for information', how: 'Same skill as TEF Section A. Rotate question forms, aim for eight to ten.', model: "Pourriez-vous me dire quels sont les horaires ? Est-ce qu'il faut réserver à l'avance ?" },
    { step: 'Task 3 — defend a view', how: 'Position, two arguments with examples, concession, conclusion. Speak for the full time.', model: "À mon avis, les transports en commun devraient être gratuits. D'abord, cela réduirait la pollution … Certes, le financement pose question, mais …" },
    { step: 'Throughout', how: 'Fill hesitations in French, never in English or silence.', model: "Alors … disons que … c'est-à-dire que … comment dire … en fait …" }
  ],
  phrases: ["Je m'appelle … et je suis originaire de", "J'apprends le français parce que", 'Pourriez-vous me dire …', "À mon avis / Selon moi", "Prenons un exemple concret", "Certes, … cependant", "Pour conclure, je dirais que"],
  trap: 'Task 1 is free marks and most candidates waste it by improvising. Write it, rehearse it aloud twenty times, and deliver it smoothly — it sets the examiner\'s first impression.'
}
];

/* ======================================================== LISTENING BANK */
/* text = what the device voice reads. Kept hidden until answered.         */

const LISTEN_BANK = [
{ id: 'l1', lvl: 'A1', voice: 'CA',
  text: "Bonjour, vous êtes bien au cabinet du docteur Tremblay. Nos horaires sont du lundi au vendredi, de huit heures à seize heures. Le cabinet est fermé le mercredi après-midi. Pour une urgence, composez le huit-un-un.",
  q: 'When is the surgery closed?', opts: ['Monday morning', 'Wednesday afternoon', 'Friday afternoon', 'Every afternoon'], a: 1,
  why: 'Listen for "fermé le mercredi après-midi". The other days and times are distractors.' },

{ id: 'l2', lvl: 'A1', voice: 'FR',
  text: "Le train à destination de Montréal, départ prévu à quatorze heures dix, partira finalement de la voie sept à quatorze heures quarante.",
  q: 'What time does the train now leave?', opts: ['14:10', '14:40', '14:07', '17:40'], a: 1,
  why: '"finalement" signals the correction. The first time given is always the trap.' },

{ id: 'l3', lvl: 'A2', voice: 'CA',
  text: "Salut, c'est Marc. Écoute, je ne pourrai pas venir à la réunion de demain matin, j'ai un rendez-vous chez le dentiste. Est-ce qu'on pourrait la déplacer à jeudi ? Rappelle-moi quand tu peux.",
  q: 'What does Marc want?', opts: ['To cancel the meeting', 'To move the meeting to Thursday', 'To come later tomorrow', 'To see a dentist with you'], a: 1,
  why: '"déplacer à jeudi" is the request. The dentist is only the reason.' },

{ id: 'l4', lvl: 'A2', voice: 'FR',
  text: "Pour vous inscrire, vous devez présenter une pièce d'identité, un justificatif de domicile de moins de trois mois, et deux photos. Le formulaire, lui, peut être rempli sur place.",
  q: 'What do you NOT need to bring?', opts: ['ID', 'Proof of address', 'Two photos', 'The completed form'], a: 3,
  why: '"peut être rempli sur place" — the form can be filled in there, so you need not bring it done.' },

{ id: 'l5', lvl: 'B1', voice: 'CA',
  text: "On pensait que les loyers allaient se stabiliser cette année. En réalité, ils ont encore augmenté de près de huit pour cent dans la région de Montréal. Ce sont surtout les jeunes ménages qui en subissent les conséquences.",
  q: 'What actually happened to rents?', opts: ['They stabilised', 'They rose by about 8%', 'They fell by 8%', 'They rose by 18%'], a: 1,
  why: '"En réalité" overturns the expectation stated first. Then catch "près de huit pour cent".' },

{ id: 'l6', lvl: 'B1', voice: 'FR',
  text: "Le télétravail présente des avantages indéniables, notamment en matière de temps de trajet. Cela dit, plusieurs études montrent que l'isolement des salariés constitue un problème croissant, en particulier chez les nouveaux employés.",
  q: "What is the speaker's overall position?", opts: ['Entirely in favour of remote work', 'Entirely against it', 'Sees benefits but is concerned about isolation', 'Has no opinion'], a: 2,
  why: '"Cela dit" marks the pivot. The real emphasis comes after the concession.' },

{ id: 'l7', lvl: 'B1', voice: 'CA',
  text: "Tsé, moi j'trouve que c'est pas mal compliqué de trouver un logement à Montréal en ce moment. J'ai visité une dizaine d'appartements pis y'en a pas un qui était correct pour le prix demandé.",
  q: 'How many flats did the speaker view?', opts: ['One', 'About ten', 'None', 'A dozen and rented one'], a: 1,
  why: '"une dizaine" = about ten. Note the Québec markers: tsé, pas mal, pis, y\'en a.' },

{ id: 'l8', lvl: 'B2', voice: 'FR',
  text: "Certes, la réforme annoncée par le gouvernement répond à une demande ancienne des associations. Il n'en demeure pas moins que son financement reste à préciser, et que sa mise en œuvre supposerait une refonte complète du dispositif actuel.",
  q: 'What does the speaker think of the reform?', opts: ['It is well designed and funded', 'It answers a real need but raises serious practical doubts', 'It is unnecessary', 'It has already been implemented'], a: 1,
  why: '"Certes … il n\'en demeure pas moins que" is concession then the real point. Also note "supposerait" — conditional, so hypothetical.' },

{ id: 'l9', lvl: 'B2', voice: 'CA',
  text: "Selon une enquête publiée ce matin, un nombre croissant de travailleurs qualifiés quitteraient les grandes métropoles pour s'installer en région. Les auteurs nuancent toutefois ce constat : le phénomène toucherait surtout les secteurs où le télétravail est possible.",
  q: 'How certain is this information?', opts: ['Confirmed fact', 'Reported but unverified', 'Proven false', 'A prediction for next year'], a: 1,
  why: '"quitteraient" and "toucherait" are conditionals — journalistic hedging for unverified claims. A B2 recognition point.' },

{ id: 'l10', lvl: 'A2', voice: 'FR',
  text: "Votre commande sera livrée entre le douze et le quinze du mois prochain. Si vous n'êtes pas présent, le colis sera déposé au point relais le plus proche, où vous aurez quinze jours pour le récupérer.",
  q: 'What happens if you are not at home?', opts: ['The order is cancelled', 'It goes to a pickup point for 15 days', 'It is redelivered the next day', 'You must pay again'], a: 1,
  why: 'Two numbers here — 12/15 for delivery, 15 days for collection. Note them separately as you hear them.' }
];

/* ========================================================== READING BANK */

const READ_BANK = [
{ id: 'r1', lvl: 'A1',
  text: "AVIS AUX RÉSIDENTS\n\nEn raison de travaux sur la conduite d'eau, l'eau sera coupée le mardi 14 avril de 9 h à 16 h. Nous vous conseillons de faire une réserve d'eau la veille. Les ascenseurs resteront en service. Nous vous remercions de votre compréhension.\n\nLa direction",
  q: 'What should residents do?', opts: ['Avoid using the lifts', 'Store water the day before', 'Leave the building on 14 April', 'Contact the management'], a: 1,
  why: '"faire une réserve d\'eau la veille" — la veille = the day before.' },

{ id: 'r2', lvl: 'A2',
  text: "Objet : votre demande de carte d'assurance maladie\n\nMadame,\n\nNous avons bien reçu votre dossier le 3 mars. Cependant, il manque une copie de votre permis de travail. Merci de nous la faire parvenir dans un délai de trente jours, faute de quoi votre demande sera annulée.\n\nCordialement,",
  q: 'What is the problem with the application?', opts: ['It arrived too late', 'A document is missing', 'The fee was not paid', 'The form was not signed'], a: 1,
  why: '"il manque une copie de votre permis de travail". "faute de quoi" = failing which.' },

{ id: 'r3', lvl: 'B1',
  text: "Depuis quelques années, les dépanneurs de quartier connaissent un regain d'intérêt. Longtemps concurrencés par les grandes surfaces, ils attirent désormais une clientèle qui privilégie la proximité et les circuits courts. Toutefois, leurs marges restent faibles, et beaucoup peinent à recruter du personnel.",
  q: 'What does the text say about corner shops?', opts: ['They are disappearing', 'They are more popular again but still face difficulties', 'They have higher margins than supermarkets', 'They no longer need staff'], a: 1,
  why: '"regain d\'intérêt" then "Toutefois" introduces the difficulties. Both halves must be in the answer.' },

{ id: 'r4', lvl: 'B1',
  text: "Le gouvernement a annoncé une hausse du nombre de places dans les cours de francisation. Cette mesure, réclamée de longue date, devrait permettre de réduire les listes d'attente, qui atteignaient parfois six mois. Les organismes communautaires saluent l'annonce tout en regrettant qu'aucun financement supplémentaire n'ait été prévu pour le recrutement d'enseignants.",
  q: 'What is the community organisations\' position?', opts: ['They oppose the measure', 'They welcome it but note a funding gap', 'They say waiting lists are not a problem', 'They asked for fewer places'], a: 1,
  why: '"saluent … tout en regrettant que" — approve while regretting. "tout en + -ant" is the concession marker.' },

{ id: 'r5', lvl: 'B2',
  text: "L'idée selon laquelle la gratuité des transports en commun réduirait mécaniquement la circulation automobile mérite d'être nuancée. Les expériences menées dans plusieurs villes européennes montrent en effet que la hausse de fréquentation provient majoritairement d'anciens piétons et cyclistes, et non d'automobilistes convertis. Cela ne retire rien à l'intérêt social de la mesure, mais invite à en reconsidérer la justification écologique.",
  q: 'What is the author arguing?', opts: ['Free transport is a bad idea', 'Free transport helps the environment as claimed', 'The environmental case for it is weaker than claimed, though the social case stands', 'Cyclists should pay for transport'], a: 2,
  why: '"mérite d\'être nuancée" sets it up; "Cela ne retire rien à … mais invite à reconsidérer" is the precise position. Not a rejection — a qualification.' },

{ id: 'r6', lvl: 'B2',
  text: "Certes, l'apprentissage d'une langue à l'âge adulte présente des difficultés bien documentées, notamment sur le plan phonologique. Il n'en demeure pas moins que les adultes disposent d'avantages considérables : une meilleure compréhension des structures grammaticales, une capacité d'abstraction supérieure et, surtout, une motivation instrumentale souvent absente chez l'enfant.",
  q: "What is the author's main point?", opts: ['Adults cannot learn languages well', 'Children always learn faster', 'Despite real difficulties, adults have significant advantages', 'Pronunciation is the only thing that matters'], a: 2,
  why: 'Certes … Il n\'en demeure pas moins que. The emphasis is always on the second half.' }
];

/* ======================================================= WRITING PROMPTS */

const WRITE_PROMPTS = [
{ id: 'w1', exam: 'TEF', section: 'A', min: 80, target: 100, mins: 25,
  prompt: "Continuez cet article :\n\n« Samedi matin, un incendie s'est déclaré dans un immeuble du quartier Rosemont. Les pompiers sont intervenus rapidement… »",
  check: ['Background in the imparfait (weather, time, who was there)', 'Events in the passé composé', 'At least 80 words', 'Journalistic, neutral tone', 'A closing line about the outcome or investigation'] },

{ id: 'w2', exam: 'TEF', section: 'B', min: 200, target: 220, mins: 35,
  prompt: "« Les employeurs devraient avoir le droit d'interdire complètement l'usage du téléphone personnel pendant les heures de travail. »\n\nRédigez un texte argumenté dans lequel vous donnez votre opinion.",
  check: ['Clear position in the first two sentences', 'Two arguments, each with a concrete example', 'One concession (Certes… néanmoins…)', 'A conclusion that proposes something', 'At least 200 words', 'Formal register — vous, ne kept, no abbreviations'] },

{ id: 'w3', exam: 'TCF', section: '1', min: 60, target: 100, mins: 12,
  prompt: "Vous venez de visiter un appartement. Écrivez un message à un ami pour le lui décrire et lui demander son avis.",
  check: ['Greeting matched to a friend (tu)', 'Reason for writing', 'Three or four concrete details', 'A question to the reader', '60–120 words'] },

{ id: 'w4', exam: 'TCF', section: '2', min: 120, target: 140, mins: 20,
  prompt: "Racontez une expérience qui vous a aidé à progresser en français. Ce témoignage sera publié sur le blog d'une école de langues.",
  check: ['Context in the imparfait', 'Events in the passé composé', 'A turning point', 'A present-tense lesson or recommendation', '120–150 words'] },

{ id: 'w5', exam: 'TCF', section: '3', min: 120, target: 160, mins: 25,
  prompt: "Texte A : « Le télétravail améliore nettement la qualité de vie des salariés. »\nTexte B : « Le télétravail isole les employés et brouille la frontière entre vie privée et vie professionnelle. »\n\nRésumez les deux points de vue, puis donnez le vôtre.",
  check: ['Text A summarised in your own words', 'Text B summarised, with a contrast marker', 'Your own position, with a reason', 'A nuanced closing sentence', 'No sentences copied from the prompts', '120–180 words'] }
];

/* ====================================================== SPEAKING PROMPTS */

const SPEAK_PROMPTS = [
{ id: 's1', exam: 'TEF', section: 'A', mins: 5,
  prompt: "Vous avez vu cette annonce : « Cours de français intensif — inscriptions ouvertes ». Vous téléphonez pour obtenir des informations.",
  check: ['At least 10 questions', 'At least three different question forms', 'vous throughout', 'One follow-up question based on an answer', 'A recap and a polite close'] },

{ id: 's2', exam: 'TEF', section: 'A', mins: 5,
  prompt: "Vous souhaitez inscrire votre enfant à une activité sportive. Vous appelez le centre communautaire pour vous renseigner.",
  check: ['Price, schedule, location, required documents, cancellation', 'Politeness markers (pourriez-vous, j\'aurais aimé savoir)', 'No silences longer than a few seconds'] },

{ id: 's3', exam: 'TEF', section: 'B', mins: 10,
  prompt: "Votre ami veut acheter une voiture neuve. Vous pensez qu'une voiture d'occasion serait plus raisonnable. Convainquez-le.",
  check: ['Clear proposal stated early', 'Two arguments framed as benefits to him', 'You handle at least one objection directly', 'A compromise offered at the end', 'Conditional forms used'] },

{ id: 's4', exam: 'TCF', section: '1', mins: 2,
  prompt: "Présentez-vous : votre parcours, votre travail, pourquoi vous apprenez le français, vos loisirs.",
  check: ['Name, age, origin', 'Current work or study', 'Reason for learning French', 'One or two interests', 'Delivered fluently without long pauses'] },

{ id: 's5', exam: 'TCF', section: '3', mins: 5,
  prompt: "« Faut-il rendre les transports en commun gratuits ? » Donnez votre point de vue et défendez-le.",
  check: ['Position stated in the first sentence', 'Two arguments with examples', 'One concession', 'A conclusion', 'French fillers rather than silence'] }
];

/* ======================================================= PLACEMENT CHECK */

const PLACEMENT = [
  { lvl: 'A1', q: 'Je ___ étudiant.', opts: ['ai', 'suis', 'est', 'être'], a: 1 },
  { lvl: 'A1', q: 'Elle ___ vingt ans.', opts: ['est', 'a', 'fait', 'va'], a: 1 },
  { lvl: 'A1', q: 'Nous ___ à Montréal.', opts: ['habite', 'habitons', 'habitez', 'habitent'], a: 1 },
  { lvl: 'A1', q: 'Je vais ___ bureau.', opts: ['à le', 'au', 'le', 'du'], a: 1 },
  { lvl: 'A1', q: "Il n'y a pas ___ pain.", opts: ['du', 'de', 'le', 'des'], a: 1 },
  { lvl: 'A2', q: "Hier, j'___ le train.", opts: ['prends', 'ai pris', 'prenais', 'prendrai'], a: 1 },
  { lvl: 'A2', q: 'Elle est ___ à Québec.', opts: ['allé', 'allée', 'aller', 'allez'], a: 1 },
  { lvl: 'A2', q: "Quand j'étais petit, je ___ au parc.", opts: ['suis allé', 'allais', 'irai', 'aille'], a: 1 },
  { lvl: 'A2', q: 'Je parle à mes collègues → Je ___ parle.', opts: ['les', 'leur', 'y', 'en'], a: 1 },
  { lvl: 'A2', q: "J'habite ici ___ trois ans.", opts: ['pendant', 'depuis', 'pour', 'dans'], a: 1 },
  { lvl: 'B1', q: "Si j'avais le temps, je ___.", opts: ['viendrai', 'viendrais', 'viens', 'vienne'], a: 1 },
  { lvl: 'B1', q: 'Il faut que je ___ présent.', opts: ['suis', 'sois', 'serai', 'étais'], a: 1 },
  { lvl: 'B1', q: 'Le projet ___ je parle est urgent.', opts: ['que', 'qui', 'dont', 'où'], a: 2 },
  { lvl: 'B1', q: '___-vous m\'aider, s\'il vous plaît ?', opts: ['Pouvez', 'Pourriez', 'Pourrez', 'Puissiez'], a: 1 },
  { lvl: 'B1', q: "J'espère qu'il ___ demain.", opts: ['vienne', 'viendra', 'vient', 'viendrait'], a: 1 },
  { lvl: 'B2', q: '___ travaillant le soir, il a financé ses études.', opts: ['Pour', 'En', 'Par', 'Tout'], a: 1 },
  { lvl: 'B2', q: "Si j'avais su, je ne ___ pas venu.", opts: ['serais', 'serai', 'suis', 'sois'], a: 0 },
  { lvl: 'B2', q: '"Éventuellement" veut dire…', opts: ['finalement', 'possiblement', 'certainement', 'rarement'], a: 1 },
  { lvl: 'B2', q: '___, cette solution est coûteuse, mais elle reste la meilleure.', opts: ['Certes', 'Ainsi', 'Donc', 'Alors'], a: 0 },
  { lvl: 'B2', q: 'Il semblerait que la situation ___ plus complexe.', opts: ['est', 'soit', 'sera', 'était'], a: 1 }
];

/* ================================================= STUDY PLAN TO NCLC 7 */

const PLAN = {
  headline: 'Zero to NCLC 7 — what it actually takes',
  hours: 'Alliance Française de Vancouver puts zero to B2 at roughly 650 classroom hours. NCLC 7 is officially B1+ with elements of B2, so treat 500–650 hours as your realistic range, plus self-study on top.',
  maths: [
    { window: '4 months', daily: '≈ 5 h per day, every day' },
    { window: '6 months', daily: '≈ 3.5 h per day, every day' },
    { window: '9 months', daily: '≈ 2.5 h per day, every day' },
    { window: '12 months', daily: '≈ 1.8 h per day, every day' }
  ],
  honest: 'If you cannot find three hours a day, book the test later rather than sitting it twice. A failed attempt costs the fee and about six weeks.',
  phases: [
    { name: 'Phase 1 — Foundations', weeks: 'Weeks 1–8', stages: ['A1'],
      do: ['Work through every A1 module until the drills score above 80%', 'Learn 20 new words a day using the Deck tab', '15 minutes of listening daily even if you understand almost nothing', 'Read every French word aloud — never silently'],
      milestone: 'You can introduce yourself, ask basic questions, and read a short notice.' },
    { name: 'Phase 2 — Past and future', weeks: 'Weeks 9–16', stages: ['A2'],
      do: ['All A2 modules, with heavy repetition on passé composé vs imparfait', 'Start writing 80-word texts three times a week', 'Listening: short news items, Québec radio', 'Begin the TCF Task 1 writing prompt weekly'],
      milestone: 'You can tell a story in the past and hold a simple conversation.' },
    { name: 'Phase 3 — Structure', weeks: 'Weeks 17–24', stages: ['B1'],
      do: ['All B1 modules — conditional, subjunctive and relatives are the core', 'Write one 200-word opinion piece per week using the Section B template', 'Record yourself speaking for 3 minutes daily in the Speak tab', 'Start timed reading practice'],
      milestone: 'You can argue a position in writing and sustain a five-minute conversation.' },
    { name: 'Phase 4 — Exam shape', weeks: 'Weeks 25–30', stages: ['B2', 'EXAM'],
      do: ['B2 modules for connectors, nuance and error-clearing', 'Two full timed listening sections per week', 'Memorise the writing and speaking templates until automatic', 'Practise Task 1 self-introduction until it is flawless'],
      milestone: 'You score NCLC 7 consistently on practice sections.' },
    { name: 'Phase 5 — Sharpening', weeks: 'Final 4 weeks', stages: ['EXAM'],
      do: ['Full mock every weekend under exam conditions', 'Review only your wrong answers — do not re-learn what you know', 'Speak aloud daily, no exceptions', 'Book the test only once two consecutive mocks clear NCLC 7 in all four'],
      milestone: 'Ready.' }
  ],
  daily: [
    { t: '30 min', what: 'One course module or a review of yesterday\'s' },
    { t: '20 min', what: 'Vocabulary — Deck review plus 20 new words' },
    { t: '30 min', what: 'Listening. Anything, every day. This is the slowest skill to build.' },
    { t: '20 min', what: 'Speaking aloud — record and listen back' },
    { t: '30 min', what: 'Writing, or timed reading practice' },
    { t: '30 min', what: 'Passive exposure — Québec radio, podcasts, TV with French subtitles' }
  ]
};
