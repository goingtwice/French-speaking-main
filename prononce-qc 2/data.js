/* ============================================================================
   data.js — offline content for Prononce QC
   Everything here works with no network. The live lookup layer (app.js) adds
   real human recordings on top.

   IPA convention: standard metropolitan French transcription. The Québec
   column is given where the difference is systematic and well documented.
   Sources for the phonology rules are listed in README.md.
   ========================================================================= */

/* --------------------------------------------------------------------------
   1. Exam reference — TEF Canada / TCF Canada
   -------------------------------------------------------------------------- */

const EXAM = {
  note: "Scales and thresholds change. Always confirm against the IRCC page before you book.",
  irccUrl: "https://www.canada.ca/en/immigration-refugees-citizenship/services/immigrate-canada/express-entry/documents/language-requirements/language-testing.html",

  crs: [
    { pts: "+25", cond: "NCLC 7+ in all four French skills, and English CLB 4 or lower (or no English test)" },
    { pts: "+50", cond: "NCLC 7+ in all four French skills, and CLB 5 or higher in all four English skills" }
  ],

  tef: {
    name: "TEF Canada",
    scale: "0–699 per section",
    sections: [
      { key: "Compréhension orale", detail: "40 questions · 40 min" },
      { key: "Compréhension écrite", detail: "40 questions · 60 min" },
      { key: "Expression écrite", detail: "2 tasks · 60 min" },
      { key: "Expression orale", detail: "2 role-plays · 15 min" }
    ],
    // NCLC/CLB : [listening, reading, writing, speaking]
    table: {
      10: ["546–699", "546–699", "558–699", "556–699"],
      9:  ["503–545", "503–545", "512–557", "518–555"],
      8:  ["462–502", "462–502", "472–511", "494–517"],
      7:  ["434–461", "434–461", "428–471", "456–493"],
      6:  ["393–433", "393–433", "379–427", "422–455"],
      5:  ["352–392", "352–392", "330–378", "387–421"],
      4:  ["306–351", "306–351", "268–329", "328–386"]
    }
  },

  tcf: {
    name: "TCF Canada",
    scale: "Listening & reading 0–699 · writing & speaking 0–20",
    sections: [
      { key: "Compréhension orale", detail: "39 questions · 35 min" },
      { key: "Compréhension écrite", detail: "39 questions · 60 min" },
      { key: "Expression écrite", detail: "3 tasks · 60 min" },
      { key: "Expression orale", detail: "3 tasks · 12 min" }
    ],
    table: {
      10: ["549–699", "549–699", "16–20", "16–20"],
      9:  ["523–548", "524–548", "14–15", "14–15"],
      7:  ["458–502", "453–498", "10–11", "10–11"],
      5:  ["369–397", "375–405", "6", "6"]
    }
  },

  // Why this app exists, in the exam's own words.
  accentFact: "TEF Canada listening uses speakers with accents from France, Belgium, " +
              "Switzerland, Québec and Africa — and you usually hear each clip once. " +
              "The variation you are frustrated by is the thing being tested."
};

/* --------------------------------------------------------------------------
   2. Québec phonology — the systematic rules
   -------------------------------------------------------------------------- */

const QC_RULES = [
  {
    id: "affrication",
    title: "Affrication of t and d",
    plain: "Before the sounds i, y (the 'u' of tu), and the glides j/ɥ, a t becomes ts and a d becomes dz. This is the single loudest marker of a Québec accent.",
    examples: [
      { fr: "tu",      ipaFR: "ty",       ipaQC: "t͡sy" },
      { fr: "tuer",    ipaFR: "tɥe",      ipaQC: "t͡sɥe" },
      { fr: "tiens",   ipaFR: "tjɛ̃",      ipaQC: "t͡sjɛ̃" },
      { fr: "dire",    ipaFR: "diʁ",      ipaQC: "d͡ziːʁ" },
      { fr: "dur",     ipaFR: "dyʁ",      ipaQC: "d͡zyːʁ" },
      { fr: "petite",  ipaFR: "pətit",    ipaQC: "pt͡sɪt" },
      { fr: "diction", ipaFR: "diksjɔ̃",   ipaQC: "d͡ziksjɔ̃" }
    ]
  },
  {
    id: "laxing",
    title: "Lax high vowels in closed syllables",
    plain: "In a short closed syllable, i → ɪ (as in English 'bit'), y → ʏ, u → ʊ (as in English 'book'). Metropolitan French keeps them tense. This is why 'vite' can sound like 'vit' with an English short i.",
    examples: [
      { fr: "vite",  ipaFR: "vit",  ipaQC: "vɪt" },
      { fr: "six",   ipaFR: "sis",  ipaQC: "sɪs" },
      { fr: "lutte", ipaFR: "lyt",  ipaQC: "lʏt" },
      { fr: "jupe",  ipaFR: "ʒyp",  ipaQC: "ʒʏp" },
      { fr: "lune",  ipaFR: "lyn",  ipaQC: "lʏn" },
      { fr: "route", ipaFR: "ʁut",  ipaQC: "ʁʊt" },
      { fr: "douce", ipaFR: "dus",  ipaQC: "d͡zʊs" }
    ]
  },
  {
    id: "diphthong",
    title: "Long vowels break into diphthongs",
    plain: "Long and nasal vowels in closed syllables glide. ɛː → ɛɪ̯, oː → oʊ̯, ɑː → ɑʊ̯. To an English ear the vowel sounds like it is falling over.",
    examples: [
      { fr: "pâte",   ipaFR: "pɑt",   ipaQC: "pɑʊ̯t" },
      { fr: "cause",  ipaFR: "koz",   ipaQC: "koʊ̯z" },
      { fr: "treize", ipaFR: "tʁɛz",  ipaQC: "tʁɛɪ̯z" },
      { fr: "père",   ipaFR: "pɛʁ",   ipaQC: "pɛɪ̯ʁ" },
      { fr: "fête",   ipaFR: "fɛt",   ipaQC: "fɛɪ̯t" }
    ]
  },
  {
    id: "contrasts",
    title: "Four contrasts Québec keeps that Paris has lost",
    plain: "Metropolitan French has merged these pairs. Québec has not, so a pair that sounds identical in a Paris recording is two different words in a Montréal one.",
    examples: [
      { fr: "brin / brun",     ipaFR: "bʁɛ̃ / bʁɛ̃",  ipaQC: "bʁɛ̃ / bʁœ̃",  gloss: "ɛ̃ vs œ̃" },
      { fr: "patte / pâte",    ipaFR: "pat / pat",   ipaQC: "pat / pɑʊ̯t", gloss: "a vs ɑ" },
      { fr: "mettre / maître", ipaFR: "mɛtʁ / mɛtʁ", ipaQC: "mɛtʁ / mɛːtʁ", gloss: "ɛ vs ɛː" },
      { fr: "jeune / jeûne",   ipaFR: "ʒœn / ʒøn",   ipaQC: "ʒœn / ʒøːn",  gloss: "œ vs ø" }
    ]
  },
  {
    id: "oi",
    title: "The 'oi' sound",
    plain: "Standard Québec keeps /wa/, but before ʁ or z it is /wɑ/, and in casual speech (joual) it slides to we or wɛ. 'Moi' from a relaxed speaker sounds closer to 'mwé'.",
    examples: [
      { fr: "trois", ipaFR: "tʁwa", ipaQC: "tʁwɑ" },
      { fr: "moi",   ipaFR: "mwa",  ipaQC: "mwe",  gloss: "casual" },
      { fr: "soir",  ipaFR: "swaʁ", ipaQC: "swɑːʁ" },
      { fr: "froid", ipaFR: "fʁwa", ipaQC: "fʁwɑ" }
    ]
  },
  {
    id: "finala",
    title: "Final 'a' darkens",
    plain: "A word-final a is often backed toward ɑ or even ɔ. 'Canada' can come out as ka-na-DAW.",
    examples: [
      { fr: "Canada", ipaFR: "kanada", ipaQC: "kanadɔ" },
      { fr: "chocolat", ipaFR: "ʃɔkɔla", ipaQC: "ʃɔkɔlɑ" },
      { fr: "là",     ipaFR: "la",     ipaQC: "lɑ" }
    ]
  },
  {
    id: "r",
    title: "The R",
    plain: "Both accents mostly use the uvular fricative ʁ. In Québec a uvular trill ʀ turns up in clusters, and older Montréal speakers use an apical r. Do not chase a 'perfect' R — any uvular ʁ passes.",
    examples: [
      { fr: "brun",   ipaFR: "bʁɛ̃",  ipaQC: "bʀœ̃" },
      { fr: "quatre", ipaFR: "katʁ", ipaQC: "katʀ" },
      { fr: "Paris",  ipaFR: "paʁi", ipaQC: "paʀi" }
    ]
  }
];

/* --------------------------------------------------------------------------
   3. Reduced forms — what people actually say
   The exam warns you will hear shortened forms. These are them.
   -------------------------------------------------------------------------- */

const REDUCED = [
  { written: "je ne sais pas",   spoken: "ch'sais pas / chépa",  ipa: "ʃɛ pa",      note: "Universal. Almost never said in full." },
  { written: "je suis",          spoken: "chuis / j'suis",       ipa: "ʃɥi",        note: "" },
  { written: "il y a",           spoken: "y'a",                  ipa: "ja",         note: "" },
  { written: "il / ils",         spoken: "y",                    ipa: "i",          note: "'Y vient' = il vient. Very common in Québec." },
  { written: "elle",             spoken: "è",                    ipa: "ɛ",          note: "" },
  { written: "tu es",            spoken: "t'es",                 ipa: "tɛ",         note: "" },
  { written: "tu as",            spoken: "t'as",                 ipa: "ta",         note: "" },
  { written: "qu'est-ce que",    spoken: "qu'est-c'que / kès'k",  ipa: "kɛs kə",     note: "Often just [kɛs]." },
  { written: "parce que",        spoken: "pasque / pisque",       ipa: "pas kə",     note: "" },
  { written: "il faut",          spoken: "faut",                 ipa: "fo",         note: "Subject dropped entirely." },
  { written: "ne … pas",         spoken: "… pas",                ipa: "",           note: "The 'ne' is gone in speech. 'J'sais pas', not 'je ne sais pas'." },
  { written: "peut-être",        spoken: "p'têt'",               ipa: "ptɛt",       note: "" },
  { written: "maintenant",       spoken: "main'nant",            ipa: "mɛ̃tnɑ̃",      note: "" },
  { written: "puis",             spoken: "pis",                  ipa: "pi",         note: "Used as 'and then' — constant in Québec speech." },
  { written: "je te",            spoken: "j'te",                 ipa: "ʃtə",        note: "The j devoices before t." },
  { written: "celui-là",         spoken: "çui-là",               ipa: "sɥi la",     note: "" },
  { written: "tu sais",          spoken: "tsé",                  ipa: "t͡se",        note: "Québec filler, like English 'y'know'." },
  { written: "à cette heure",    spoken: "astheure",             ipa: "astœʁ",      note: "Québec for 'now'." },
  { written: "pas du tout",      spoken: "pantoute",             ipa: "pɑ̃tʊt",      note: "Québec only." },
  { written: "bien",             spoken: "ben",                  ipa: "bɛ̃",         note: "Intensifier: 'ben correct', 'ben trop'." },
  { written: "sur la",           spoken: "s'a",                  ipa: "sa",         note: "Québec. 'S'a table' = sur la table." },
  { written: "dans les",         spoken: "dins",                 ipa: "dɛ̃",         note: "Québec, casual." },
  { written: "est-ce que tu…?",  spoken: "…-tu ?",               ipa: "",           note: "Québec yes/no particle: 'Tu viens-tu ?' = Are you coming?" }
];

/* --------------------------------------------------------------------------
   4. Minimal pairs — the contrasts English ears miss
   -------------------------------------------------------------------------- */

const PAIRS = [
  { a: "tu",     b: "tout",   ipaA: "ty",    ipaB: "tu",    focus: "y vs u", tip: "y = say 'ee' then round your lips without moving your tongue." },
  { a: "rue",    b: "roue",   ipaA: "ʁy",    ipaB: "ʁu",    focus: "y vs u" },
  { a: "vu",     b: "vous",   ipaA: "vy",    ipaB: "vu",    focus: "y vs u" },
  { a: "bu",     b: "boue",   ipaA: "by",    ipaB: "bu",    focus: "y vs u" },
  { a: "peu",    b: "peur",   ipaA: "pø",    ipaB: "pœʁ",   focus: "ø vs œ", tip: "ø is closed and tense; œ is open, as if you were about to say 'er'." },
  { a: "ceux",   b: "sœur",   ipaA: "sø",    ipaB: "sœʁ",   focus: "ø vs œ" },
  { a: "pré",    b: "prêt",   ipaA: "pʁe",   ipaB: "pʁɛ",   focus: "e vs ɛ", tip: "é is tight, like 'ay' with no glide; è is open, like 'e' in 'bed'." },
  { a: "été",    b: "était",  ipaA: "ete",   ipaB: "etɛ",   focus: "e vs ɛ" },
  { a: "pain",   b: "pan",    ipaA: "pɛ̃",    ipaB: "pɑ̃",    focus: "ɛ̃ vs ɑ̃", tip: "Nasal vowels: the air goes through the nose, no n sound at the end." },
  { a: "pan",    b: "pont",   ipaA: "pɑ̃",    ipaB: "pɔ̃",    focus: "ɑ̃ vs ɔ̃" },
  { a: "brin",   b: "brun",   ipaA: "bʁɛ̃",   ipaB: "bʁœ̃",   focus: "ɛ̃ vs œ̃", tip: "Merged in Paris, kept in Québec. Worth training if you want Canadian audio." },
  { a: "patte",  b: "pâte",   ipaA: "pat",   ipaB: "pɑt",   focus: "a vs ɑ", tip: "Kept in Québec: â is further back and longer." },
  { a: "poisson",b: "poison", ipaA: "pwasɔ̃", ipaB: "pwazɔ̃", focus: "s vs z" },
  { a: "dessert",b: "désert", ipaA: "desɛʁ", ipaB: "dezɛʁ", focus: "s vs z" },
  { a: "cache",  b: "cage",   ipaA: "kaʃ",   ipaB: "kaʒ",   focus: "ʃ vs ʒ" },
  { a: "vite",   b: "vide",   ipaA: "vit",   ipaB: "vid",   focus: "t vs d", tip: "In Québec both affricate: [vɪt] vs [vɪd]. Listen to the release." },
  { a: "sans",   b: "cent",   ipaA: "sɑ̃",    ipaB: "sɑ̃",    focus: "homophone", tip: "These really are identical. Context is the only clue — good practice for the exam." }
];

/* --------------------------------------------------------------------------
   5. Québec vs France vocabulary
   -------------------------------------------------------------------------- */

const QC_VOCAB = [
  { en: "car",               fr: "une voiture",        qc: "un char" },
  { en: "breakfast",         fr: "le petit-déjeuner",  qc: "le déjeuner" },
  { en: "lunch",             fr: "le déjeuner",        qc: "le dîner" },
  { en: "dinner",            fr: "le dîner",           qc: "le souper" },
  { en: "weekend",           fr: "le week-end",        qc: "la fin de semaine" },
  { en: "email",             fr: "un mail / e-mail",   qc: "un courriel" },
  { en: "to go shopping",    fr: "faire du shopping",  qc: "magasiner" },
  { en: "car park",          fr: "un parking",         qc: "un stationnement" },
  { en: "corner shop",       fr: "une supérette",      qc: "un dépanneur" },
  { en: "job interview",     fr: "un entretien",       qc: "une entrevue" },
  { en: "trainers/sneakers", fr: "des baskets",        qc: "des espadrilles" },
  { en: "jumper/sweater",    fr: "un pull",            qc: "un chandail" },
  { en: "mobile phone",      fr: "un portable",        qc: "un cellulaire" },
  { en: "cash machine",      fr: "un distributeur",    qc: "un guichet automatique" },
  { en: "you're welcome",    fr: "de rien",            qc: "bienvenue" },
  { en: "boyfriend",         fr: "un copain",          qc: "un chum" },
  { en: "girlfriend",        fr: "une copine",         qc: "une blonde" },
  { en: "air conditioning",  fr: "la climatisation",   qc: "l'air climatisé" },
  { en: "blueberries",       fr: "des myrtilles",      qc: "des bleuets" },
  { en: "winter hat",        fr: "un bonnet",          qc: "une tuque" },
  { en: "mittens",           fr: "des moufles",        qc: "des mitaines" },
  { en: "stop sign",         fr: "un stop",            qc: "un arrêt" },
  { en: "blowing snow",      fr: "—",                 qc: "la poudrerie" },
  { en: "to have fun",       fr: "s'amuser",           qc: "avoir du fun" },
  { en: "to grab / catch",   fr: "attraper",           qc: "pogner" }
];

/* --------------------------------------------------------------------------
   6. Themed exam vocabulary
   Themes follow the topic areas TEF/TCF draw on: everyday life, work,
   housing, health, admin, transport, environment, news, education, money.
   -------------------------------------------------------------------------- */

const VOCAB = [
  /* --- Administration & immigration (highest value for your situation) --- */
  { fr: "une demande de résidence permanente", en: "permanent residence application", ipa: "yn dəmɑ̃d də ʁezidɑ̃s pɛʁmanɑ̃t", theme: "Admin" },
  { fr: "un permis de travail",        en: "work permit",             ipa: "œ̃ pɛʁmi də tʁavaj",      theme: "Admin" },
  { fr: "un dossier",                  en: "file, case",              ipa: "œ̃ dosje",                theme: "Admin" },
  { fr: "une pièce d'identité",        en: "piece of ID",             ipa: "yn pjɛs didɑ̃tite",       theme: "Admin" },
  { fr: "un justificatif",             en: "supporting document",     ipa: "œ̃ ʒystifikatif",        theme: "Admin" },
  { fr: "une attestation",             en: "certificate, attestation",ipa: "yn atɛstasjɔ̃",          theme: "Admin" },
  { fr: "le délai de traitement",      en: "processing time",         ipa: "lə delɛ də tʁɛtmɑ̃",      theme: "Admin" },
  { fr: "remplir un formulaire",       en: "to fill in a form",       ipa: "ʁɑ̃pliʁ œ̃ fɔʁmylɛʁ",     theme: "Admin" },
  { fr: "les démarches",               en: "the steps/paperwork",     ipa: "le demaʁʃ",              theme: "Admin" },
  { fr: "un rendez-vous",              en: "appointment",             ipa: "œ̃ ʁɑ̃devu",              theme: "Admin" },
  { fr: "le numéro d'assurance sociale", en: "social insurance number (Canada)", ipa: "lə nymeʁo dasyʁɑ̃s sɔsjal", theme: "Admin" },
  { fr: "la carte d'assurance maladie", en: "health insurance card (Canada)", ipa: "la kaʁt dasyʁɑ̃s maladi", theme: "Admin" },

  /* --- Work --- */
  { fr: "un emploi",                   en: "a job",                   ipa: "œ̃n ɑ̃plwa",              theme: "Work" },
  { fr: "postuler",                    en: "to apply",                ipa: "pɔstyle",                theme: "Work" },
  { fr: "une entrevue",                en: "interview (Québec)",      ipa: "yn ɑ̃tʁəvy",             theme: "Work" },
  { fr: "l'embauche",                  en: "hiring",                  ipa: "lɑ̃boʃ",                 theme: "Work" },
  { fr: "un collègue",                 en: "colleague",               ipa: "œ̃ kɔlɛɡ",               theme: "Work" },
  { fr: "le salaire",                  en: "salary",                  ipa: "lə salɛʁ",               theme: "Work" },
  { fr: "les horaires",                en: "working hours",           ipa: "le zɔʁɛʁ",               theme: "Work" },
  { fr: "une réunion",                 en: "meeting",                 ipa: "yn ʁeynjɔ̃",             theme: "Work" },
  { fr: "le télétravail",              en: "remote work",             ipa: "lə teletʁavaj",          theme: "Work" },
  { fr: "démissionner",                en: "to resign",               ipa: "demisjɔne",              theme: "Work" },
  { fr: "une formation",               en: "training course",         ipa: "yn fɔʁmasjɔ̃",           theme: "Work" },
  { fr: "un stage",                    en: "internship",              ipa: "œ̃ staʒ",                theme: "Work" },

  /* --- Housing --- */
  { fr: "un logement",                 en: "housing, a place to live",ipa: "œ̃ lɔʒmɑ̃",              theme: "Housing" },
  { fr: "le loyer",                    en: "rent",                    ipa: "lə lwaje",               theme: "Housing" },
  { fr: "un bail",                     en: "lease",                   ipa: "œ̃ baj",                 theme: "Housing" },
  { fr: "le propriétaire",             en: "landlord, owner",         ipa: "lə pʁɔpʁijetɛʁ",         theme: "Housing" },
  { fr: "un locataire",                en: "tenant",                  ipa: "œ̃ lɔkatɛʁ",             theme: "Housing" },
  { fr: "les charges",                 en: "utilities/service charges",ipa: "le ʃaʁʒ",               theme: "Housing" },
  { fr: "déménager",                   en: "to move house",           ipa: "demenaʒe",               theme: "Housing" },
  { fr: "meublé",                      en: "furnished",               ipa: "mœble",                  theme: "Housing" },
  { fr: "un quartier",                 en: "neighbourhood",           ipa: "œ̃ kaʁtje",              theme: "Housing" },
  { fr: "le chauffage",                en: "heating",                 ipa: "lə ʃofaʒ",               theme: "Housing" },

  /* --- Health --- */
  { fr: "prendre rendez-vous",         en: "to make an appointment",  ipa: "pʁɑ̃dʁ ʁɑ̃devu",         theme: "Health" },
  { fr: "une ordonnance",              en: "prescription",            ipa: "yn ɔʁdɔnɑ̃s",            theme: "Health" },
  { fr: "les urgences",                en: "A&E / emergency room",    ipa: "le zyʁʒɑ̃s",             theme: "Health" },
  { fr: "un médecin de famille",       en: "family doctor",           ipa: "œ̃ metsɛ̃ də famij",     theme: "Health" },
  { fr: "avoir mal à…",                en: "to have a pain in…",      ipa: "avwaʁ mal a",            theme: "Health" },
  { fr: "une pharmacie",               en: "pharmacy",                ipa: "yn faʁmasi",             theme: "Health" },
  { fr: "se faire vacciner",           en: "to get vaccinated",       ipa: "sə fɛʁ vaksine",         theme: "Health" },
  { fr: "l'assurance maladie",         en: "health insurance",        ipa: "lasyʁɑ̃s maladi",        theme: "Health" },

  /* --- Transport --- */
  { fr: "les transports en commun",    en: "public transport",        ipa: "le tʁɑ̃spɔʁ ɑ̃ kɔmœ̃",   theme: "Transport" },
  { fr: "un abonnement",               en: "season pass, subscription",ipa: "œ̃n abɔnmɑ̃",           theme: "Transport" },
  { fr: "une correspondance",          en: "connection, transfer",    ipa: "yn kɔʁɛspɔ̃dɑ̃s",        theme: "Transport" },
  { fr: "le trajet",                   en: "journey, commute",        ipa: "lə tʁaʒɛ",               theme: "Transport" },
  { fr: "un retard",                   en: "a delay",                 ipa: "œ̃ ʁətaʁ",               theme: "Transport" },
  { fr: "le permis de conduire",       en: "driving licence",         ipa: "lə pɛʁmi də kɔ̃dɥiʁ",    theme: "Transport" },
  { fr: "un embouteillage",            en: "traffic jam",             ipa: "œ̃n ɑ̃butɛjaʒ",          theme: "Transport" },
  { fr: "faire le plein",              en: "to fill up (fuel)",       ipa: "fɛʁ lə plɛ̃",            theme: "Transport" },

  /* --- Money --- */
  { fr: "un compte bancaire",          en: "bank account",            ipa: "œ̃ kɔ̃t bɑ̃kɛʁ",         theme: "Money" },
  { fr: "un virement",                 en: "bank transfer",           ipa: "œ̃ viʁmɑ̃",              theme: "Money" },
  { fr: "les frais",                   en: "fees",                    ipa: "le fʁɛ",                 theme: "Money" },
  { fr: "économiser",                  en: "to save money",           ipa: "ekɔnɔmize",              theme: "Money" },
  { fr: "une facture",                 en: "bill, invoice",           ipa: "yn faktyʁ",              theme: "Money" },
  { fr: "rembourser",                  en: "to refund, pay back",     ipa: "ʁɑ̃buʁse",               theme: "Money" },
  { fr: "le pourboire",                en: "tip",                     ipa: "lə puʁbwaʁ",             theme: "Money" },
  { fr: "les impôts",                  en: "taxes",                   ipa: "le zɛ̃po",               theme: "Money" },

  /* --- Environment (a named TEF/TCF topic) --- */
  { fr: "le réchauffement climatique", en: "global warming",          ipa: "lə ʁeʃofmɑ̃ klimatik",   theme: "Environment" },
  { fr: "le tri des déchets",          en: "waste sorting",           ipa: "lə tʁi de deʃɛ",         theme: "Environment" },
  { fr: "le gaspillage",               en: "waste (of resources)",    ipa: "lə ɡaspijaʒ",            theme: "Environment" },
  { fr: "les énergies renouvelables",  en: "renewable energy",        ipa: "le zenɛʁʒi ʁənuvlabl",   theme: "Environment" },
  { fr: "polluer",                     en: "to pollute",              ipa: "pɔlɥe",                  theme: "Environment" },
  { fr: "le covoiturage",              en: "car sharing",             ipa: "lə kɔvwatyʁaʒ",          theme: "Environment" },
  { fr: "une canicule",                en: "heatwave",                ipa: "yn kanikyl",             theme: "Environment" },
  { fr: "recycler",                    en: "to recycle",              ipa: "ʁəsikle",                theme: "Environment" },

  /* --- Everyday life --- */
  { fr: "faire les courses",           en: "to do the grocery shopping", ipa: "fɛʁ le kuʁs",        theme: "Daily life" },
  { fr: "une caisse",                  en: "checkout, till",          ipa: "yn kɛs",                 theme: "Daily life" },
  { fr: "la fin de semaine",           en: "weekend (Québec)",        ipa: "la fɛ̃ də səmɛn",        theme: "Daily life" },
  { fr: "se dépêcher",                 en: "to hurry",                ipa: "sə depeʃe",              theme: "Daily life" },
  { fr: "avoir hâte",                  en: "to look forward to",      ipa: "avwaʁ ɑt",               theme: "Daily life" },
  { fr: "tout à l'heure",              en: "in a little while / earlier", ipa: "tu ta lœʁ",          theme: "Daily life" },
  { fr: "n'importe quoi",              en: "anything / nonsense",     ipa: "nɛ̃pɔʁt kwa",            theme: "Daily life" },
  { fr: "ça vaut la peine",            en: "it's worth it",           ipa: "sa vo la pɛn",           theme: "Daily life" },
  { fr: "du coup",                     en: "so, as a result",         ipa: "dy ku",                  theme: "Daily life" },
  { fr: "quand même",                  en: "still, all the same",     ipa: "kɑ̃ mɛm",                theme: "Daily life" },

  /* --- News & opinion (needed for expression orale) --- */
  { fr: "à mon avis",                  en: "in my opinion",           ipa: "a mɔ̃n avi",             theme: "Opinion" },
  { fr: "il me semble que",            en: "it seems to me that",     ipa: "il mə sɑ̃bl kə",         theme: "Opinion" },
  { fr: "en revanche",                 en: "on the other hand",       ipa: "ɑ̃ ʁəvɑ̃ʃ",              theme: "Opinion" },
  { fr: "d'une part… d'autre part",    en: "on one hand… on the other",ipa: "dyn paʁ dotʁə paʁ",     theme: "Opinion" },
  { fr: "je suis convaincu que",       en: "I'm convinced that",      ipa: "ʒə sɥi kɔ̃vɛ̃ky kə",     theme: "Opinion" },
  { fr: "cela dit",                    en: "that said",               ipa: "səla di",                theme: "Opinion" },
  { fr: "au fond",                     en: "fundamentally, deep down",ipa: "o fɔ̃",                  theme: "Opinion" },
  { fr: "force est de constater que",  en: "one has to admit that",   ipa: "fɔʁs ɛ də kɔ̃state kə",  theme: "Opinion" },
  { fr: "mettre l'accent sur",         en: "to emphasise",            ipa: "mɛtʁ laksɑ̃ syʁ",        theme: "Opinion" },
  { fr: "remettre en question",        en: "to call into question",   ipa: "ʁəmɛtʁ ɑ̃ kɛstjɔ̃",      theme: "Opinion" },

  /* --- Numbers & time traps --- */
  { fr: "quatre-vingt-dix",            en: "ninety (France)",         ipa: "katʁə vɛ̃ dis",          theme: "Numbers" },
  { fr: "soixante-dix",                en: "seventy (France)",        ipa: "swasɑ̃t dis",            theme: "Numbers" },
  { fr: "deux mille vingt-six",        en: "two thousand twenty-six", ipa: "dø mil vɛ̃t sis",        theme: "Numbers" },
  { fr: "le quinze août",              en: "the fifteenth of August", ipa: "lə kɛ̃z ut",             theme: "Numbers" },
  { fr: "huit heures et demie",        en: "half past eight",         ipa: "ɥi tœʁ e dəmi",          theme: "Numbers" },
  { fr: "un quart d'heure",            en: "a quarter of an hour",    ipa: "œ̃ kaʁ dœʁ",             theme: "Numbers" },
  { fr: "une quinzaine",               en: "about fifteen / a fortnight", ipa: "yn kɛ̃zɛn",          theme: "Numbers" },
  { fr: "la veille",                   en: "the day before",          ipa: "la vɛj",                 theme: "Numbers" },
  { fr: "le surlendemain",             en: "two days later",          ipa: "lə syʁlɑ̃dmɛ̃",          theme: "Numbers" }
];

/* --------------------------------------------------------------------------
   7. Practice phrases for shadowing (TTS + record yourself)
   -------------------------------------------------------------------------- */

const PHRASES = [
  { fr: "Bonjour, j'aimerais prendre rendez-vous pour la semaine prochaine.", en: "Hello, I'd like to make an appointment for next week.", theme: "Admin" },
  { fr: "Est-ce que vous pourriez répéter plus lentement, s'il vous plaît ?", en: "Could you repeat that more slowly, please?", theme: "Admin" },
  { fr: "Je n'ai pas bien compris la dernière partie.", en: "I didn't quite understand the last part.", theme: "Admin" },
  { fr: "Il me manque un justificatif de domicile pour compléter mon dossier.", en: "I'm missing proof of address to complete my file.", theme: "Admin" },
  { fr: "À mon avis, les transports en commun devraient être gratuits.", en: "In my opinion, public transport should be free.", theme: "Opinion" },
  { fr: "D'une part c'est plus écologique, d'autre part ça coûte cher à la ville.", en: "On one hand it's greener, on the other it's expensive for the city.", theme: "Opinion" },
  { fr: "Je travaille dans le domaine de l'informatique depuis cinq ans.", en: "I've worked in IT for five years.", theme: "Work" },
  { fr: "Pourriez-vous me dire où se trouve le guichet automatique le plus proche ?", en: "Could you tell me where the nearest cash machine is?", theme: "Daily life" },
  { fr: "On se rejoint en fin de semaine pour magasiner ?", en: "Shall we meet up at the weekend to go shopping? (Québec phrasing)", theme: "Québec" },
  { fr: "Y fait frette en tabarnouche à matin, mets ta tuque.", en: "It's freezing cold this morning, put your hat on. (broad Québec)", theme: "Québec" },
  { fr: "Tsé, j'sais pas si ça vaut la peine, mais on peut essayer pareil.", en: "Y'know, I don't know if it's worth it, but we can try anyway. (Québec, reduced)", theme: "Québec" },
  { fr: "Le réchauffement climatique touche déjà nos hivers.", en: "Global warming is already affecting our winters.", theme: "Environment" }
];

const THEMES = [...new Set(VOCAB.map(v => v.theme))];
