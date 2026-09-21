/* ============================================================================
   bank-extra.js — the practice volume
   ---------------------------------------------------------------------------
   · PRACTICE  extra drill items keyed by module id, for spaced re-testing
   · LISTEN_X  20 more listening items, graded A1 → B2
   · READ_X    14 more reading passages in exam formats
   Merged into the main banks at load time by course.js.
   ========================================================================= */

/* ===================================================== EXTRA DRILL ITEMS */

const PRACTICE = {

'a1-sounds': [
  { t: 'mc', q: 'Which pair rhymes?', opts: ['beau / bureau', 'beau / beaucoup', 'vous / vu'], a: 0, why: 'au and eau are both [o]. "beaucoup" ends in [u], and vous/vu is the [u]/[y] contrast.' },
  { t: 'mc', q: 'How many syllables do you hear in "gouvernement"?', opts: ['3', '4', '5'], a: 1, why: 'gou-ver-ne-ment. The final -ent is silent but the e before it is pronounced here.' },
  { t: 'mc', q: '"les hommes" is pronounced…', opts: ['lay om', 'lay zom', 'less hom'], a: 1, why: 'Liaison before a vowel, and the s becomes [z]. The h is silent.' },
  { t: 'mc', q: 'Which has a nasal vowel?', opts: ['année', 'an', 'animal'], a: 1, why: 'In "an" the n closes the syllable. In "année" and "animal" a vowel follows, so no nasalisation.' },
  { t: 'mc', q: '"eu" in "deux" sounds closest to…', opts: ['the "u" in "but"', 'the "ur" in "burn" without the r', 'the "oo" in "food"'], a: 1, why: '[ø] — rounded lips, tongue forward. Nothing in English matches exactly.' },
  { t: 'fill', q: 'Write the missing liaison consonant sound: "un grand homme" → un gran-___-omme', a: ['t'], why: 'A final d liaises as [t]. Same in "quand est-ce que".' }
],

'a1-gender': [
  { t: 'fill', q: 'Je voudrais ___ café. (some coffee)', a: ['du'], why: 'Partitive, masculine: du.' },
  { t: 'fill', q: 'Elle n\'a pas ___ frères.', a: ['de', "d'"], why: 'des becomes de after a negative.' },
  { t: 'mc', q: 'Which is feminine?', opts: ['le message', 'la liberté', 'le village'], a: 1, why: '-té is feminine. -age and -ment are masculine.' },
  { t: 'mc', q: '"J\'aime ___ musique." (I like music in general)', opts: ['de la', 'la', 'une'], a: 1, why: 'General categories take the definite article in French.' },
  { t: 'fill', q: 'Il y a ___ problème. (a problem)', a: ['un'], why: 'problème is masculine despite the final e.' },
  { t: 'trans', q: 'I do not drink coffee.', a: ['je ne bois pas de café'], why: 'du → de after the negative.' }
],

'a1-etre': [
  { t: 'fill', q: 'Nous ___ prêts.', a: ['sommes'], why: 'nous sommes.' },
  { t: 'fill', q: 'Ils ___ en retard.', a: ['sont'], why: 'ils sont. Compare "ils ont" (they have) — the liaison differs: [sɔ̃] vs [zɔ̃].' },
  { t: 'mc', q: 'Which is right for "It is difficult"?', opts: ['Il est difficile', "C'est difficile", 'Both, depending on context'], a: 2, why: "C'est difficile is the general statement; il est difficile refers to a specific thing already mentioned." },
  { t: 'mc', q: 'You hear [ilz‿ɔ̃]. This is…', opts: ['ils sont', 'ils ont'], a: 1, why: 'The [z] liaison signals "ont". "ils sont" has an [s]. A classic listening trap.' },
  { t: 'trans', q: 'We are ready to start.', a: ['nous sommes prêts à commencer', 'on est prêts à commencer'], why: 'prêt à + infinitive.' }
],

'a1-avoir': [
  { t: 'fill', q: 'Ils ___ trois enfants.', a: ['ont'], why: 'ils ont.' },
  { t: 'fill', q: "Nous ___ besoin d'aide.", a: ['avons'], why: 'avoir besoin de.' },
  { t: 'mc', q: '"I am cold" is…', opts: ['Je suis froid', "J'ai froid", 'Il fait froid'], a: 1, why: 'avoir froid for a person. "Il fait froid" is the weather.' },
  { t: 'fill', q: "Il n'y ___ plus de places.", a: ['a'], why: 'il y a → il n\'y a plus de.' },
  { t: 'trans', q: 'There are too many people.', a: ['il y a trop de monde', 'il y a trop de gens'], why: 'trop de + noun, never "trop des".' }
],

'a1-er': [
  { t: 'fill', q: 'Nous ___ (commencer) à neuf heures.', a: ['commençons'], why: 'Cedilla keeps the soft c before -ons.' },
  { t: 'fill', q: "J'___ (acheter) du pain.", a: ['achète'], why: 'Accent shift in the singular: j\'achète.' },
  { t: 'fill', q: 'Ils ___ (chercher) un logement.', a: ['cherchent'], why: 'Standard, and it sounds identical to "il cherche".' },
  { t: 'mc', q: '"I am working right now" is best as…', opts: ['Je travaille', 'Je suis travaillant', 'Je suis en train de travailler'], a: 2, why: 'French has no continuous form; "en train de" stresses the ongoing action. "Je travaille" is also fine.' },
  { t: 'trans', q: 'We eat at noon.', a: ['nous mangeons à midi', 'on mange à midi'], why: 'mangeons keeps the e.' }
],

'a1-irregular': [
  { t: 'fill', q: 'Nous ___ (faire) attention.', a: ['faisons'], why: 'nous faisons — pronounced [fəzɔ̃], not [fɛzɔ̃].' },
  { t: 'fill', q: 'Vous ___ (pouvoir) répéter ?', a: ['pouvez'], why: 'vous pouvez. The polite version is "pourriez-vous".' },
  { t: 'fill', q: 'Elle ___ (prendre) le métro.', a: ['prend'], why: 'No t added — prendre already ends in d.' },
  { t: 'mc', q: '"Je sais nager" vs "Je connais Paris" — why the difference?', opts: ['No rule, just idiom', 'savoir for skills and facts, connaître for people and places', 'connaître is more formal'], a: 1, why: 'A reliable distinction that English collapses into one verb.' },
  { t: 'fill', q: 'Ils ___ (devoir) partir.', a: ['doivent'], why: 'doivent — the stem changes in the plural.' },
  { t: 'trans', q: 'You must fill in this form.', a: ['vous devez remplir ce formulaire'], why: 'devoir + infinitive, no preposition.' }
],

'a1-neg': [
  { t: 'fill', q: 'Je n\'ai ___ compris. (not yet)', a: ['pas encore'], why: 'ne … pas encore.' },
  { t: 'mc', q: '"Il n\'y a que deux places" means…', opts: ['There are not two places', 'There are only two places', 'There are no places'], a: 1, why: 'ne … que = only. Not a negative at all, which catches people out.' },
  { t: 'fill', q: 'Elle ne travaille ___ ici. (no longer)', a: ['plus'], why: 'ne … plus.' },
  { t: 'mc', q: 'Where does "pas" go in the passé composé?', opts: ['After the participle', 'Between the auxiliary and the participle'], a: 1, why: "Je n'ai pas compris, never je n'ai compris pas." },
  { t: 'trans', q: 'I never go there.', a: ["je n'y vais jamais"], why: 'y + ne … jamais.' }
],

'a1-questions': [
  { t: 'fill', q: '___ coûte ce billet ? (how much)', a: ['combien'], why: 'Combien coûte…' },
  { t: 'fill', q: '___ documents faut-il apporter ?', a: ['quels'], why: 'quel agrees with the masculine plural noun.' },
  { t: 'mc', q: 'Most formal:', opts: ['Vous venez ?', 'Est-ce que vous venez ?', 'Venez-vous ?'], a: 2, why: 'Inversion is the most formal. est-ce que is neutral and always safe.' },
  { t: 'fill', q: '___ est-ce que ça commence ? (when)', a: ['quand'], why: 'Question word + est-ce que.' },
  { t: 'trans', q: 'Which documents do I need?', a: ["de quels documents ai-je besoin", "quels documents est-ce qu'il me faut", "quels documents faut-il"], why: 'Several correct forms — variety is explicitly scored in speaking Section A.' }
],

'a1-numbers': [
  { t: 'mc', q: '"soixante-quinze" is…', opts: ['65', '75', '95'], a: 1, why: '60 + 15.' },
  { t: 'mc', q: '"quatre-vingt-un" is…', opts: ['81', '91', '84'], a: 0, why: '4×20 + 1. Note: no s on vingt when a number follows.' },
  { t: 'mc', q: '"dix-neuf heures quinze" is…', opts: ['7:15 pm', '9:15 pm', '7:50 pm'], a: 0, why: '19h15.' },
  { t: 'fill', q: 'Mon rendez-vous est ___ 3 mars.', a: ['le'], why: 'Dates take le.' },
  { t: 'mc', q: 'You hear "nonante". The speaker is probably…', opts: ['Québécois', 'Belgian or Swiss', 'Parisian'], a: 1, why: 'nonante = 90 in Belgium and Switzerland.' },
  { t: 'mc', q: '"une quinzaine de jours" means…', opts: ['15 days exactly', 'about two weeks', '50 days'], a: 1, why: 'The -aine suffix means "roughly". Also dizaine, vingtaine, centaine.' }
],

'a1-adj': [
  { t: 'fill', q: 'Une décision ___ (important).', a: ['importante'], why: 'Add -e for the feminine.' },
  { t: 'fill', q: 'Des résultats ___ (nouveau).', a: ['nouveaux'], why: 'nouveau → nouveaux in the masculine plural.' },
  { t: 'fill', q: 'Une situation ___ (difficile).', a: ['difficile'], why: 'Already ends in -e, so no change.' },
  { t: 'mc', q: 'Correct order:', opts: ['une maison belle', 'une belle maison'], a: 1, why: 'beau/belle is a BAGS adjective and comes before the noun.' },
  { t: 'mc', q: '"un homme grand" means…', opts: ['a great man', 'a tall man'], a: 1, why: 'After the noun, grand is literal. Before it, figurative.' },
  { t: 'trans', q: 'These are very interesting results.', a: ['ce sont des résultats très intéressants', 'ce sont des résultats très intéressants.'], why: 'Plural agreement on the adjective.' }
],

'a1-prep': [
  { t: 'fill', q: 'Je reviens ___ Canada. (from)', a: ['du'], why: 'de + le Canada = du Canada.' },
  { t: 'fill', q: 'Il habite ___ France.', a: ['en'], why: 'Feminine country → en.' },
  { t: 'fill', q: 'Nous allons ___ États-Unis.', a: ['aux'], why: 'Plural country → aux.' },
  { t: 'fill', q: "J'ai travaillé là-bas ___ deux ans, puis je suis parti. (a finished duration)", a: ['pendant'], why: 'pendant for a completed period, depuis for one still going.' },
  { t: 'mc', q: '"Je cherche ___ un appartement."', opts: ['pour', 'à', 'nothing'], a: 2, why: 'chercher takes a direct object. Adding "pour" is a direct translation from English.' },
  { t: 'trans', q: 'I have been waiting for an answer for two weeks.', a: ["j'attends une réponse depuis deux semaines"], why: 'Present + depuis, and attendre needs no preposition.' }
],

'a2-pc-avoir': [
  { t: 'fill', q: "Nous avons ___ (voir) le film.", a: ['vu'], why: 'voir → vu.' },
  { t: 'fill', q: "Ils ont ___ (mettre) du temps.", a: ['mis'], why: 'mettre → mis.' },
  { t: 'fill', q: "J'ai ___ (devoir) partir tôt.", a: ['dû', 'du'], why: 'devoir → dû, with the circumflex to distinguish it from "du".' },
  { t: 'fill', q: "Elle a ___ (écrire) une lettre.", a: ['écrit'], why: 'écrire → écrit.' },
  { t: 'mc', q: 'Which participle is wrong?', opts: ['pris', 'compris', 'prendu'], a: 2, why: 'prendre → pris. There is no "prendu".' },
  { t: 'trans', q: 'We did not understand the question.', a: ["nous n'avons pas compris la question", "on n'a pas compris la question"], why: 'Negative wraps the auxiliary.' }
],

'a2-pc-etre': [
  { t: 'fill', q: 'Elles sont ___ (arriver) hier.', a: ['arrivées'], why: 'Feminine plural: -ées.' },
  { t: 'fill', q: 'Il est ___ (naître) en 1995.', a: ['né'], why: 'naître → né. An être verb.' },
  { t: 'fill', q: 'Nous nous sommes ___ (lever) tôt.', a: ['levés', 'levées'], why: 'Reflexive, so être, with agreement.' },
  { t: 'mc', q: 'Which uses avoir?', opts: ['Je suis monté au bureau', "J'ai monté les valises"], a: 1, why: 'With a direct object, monter takes avoir and means "to carry up".' },
  { t: 'mc', q: '"Elle est retournée" vs "Elle a retourné le document" —', opts: ['Both mean she went back', 'The first is "went back", the second is "sent back"'], a: 1, why: 'The auxiliary changes the meaning, not just the grammar.' },
  { t: 'trans', q: 'She arrived in Canada in 2023.', a: ['elle est arrivée au canada en 2023'], why: 'arriver takes être; feminine agreement.' }
],

'a2-imparfait': [
  { t: 'mc', q: 'Tous les étés, nous ___ à la mer.', opts: ['sommes allés', 'allions'], a: 1, why: '"Tous les étés" signals a habit → imparfait.' },
  { t: 'mc', q: 'Soudain, il ___ .', opts: ['partait', 'est parti'], a: 1, why: '"Soudain" signals a single event → passé composé.' },
  { t: 'fill', q: 'Il ___ (être) trois heures du matin.', a: ['était'], why: 'Setting the scene → imparfait. être is the one irregular stem.' },
  { t: 'fill', q: "Pendant que je ___ (travailler), le téléphone a sonné.", a: ['travaillais'], why: 'Ongoing action interrupted.' },
  { t: 'mc', q: "Which pairing is correct for 'I was reading when he came in'?", opts: ['imparfait + passé composé', 'passé composé + imparfait'], a: 0, why: 'Background first, then the interrupting event.' },
  { t: 'trans', q: 'I used to take the metro every day.', a: ['je prenais le métro tous les jours'], why: 'Habit in the past → imparfait.' }
],

'a2-futur': [
  { t: 'fill', q: 'Il ___ (falloir) plus de temps.', a: ['faudra'], why: 'falloir → faudr- + a.' },
  { t: 'fill', q: 'Vous ___ (voir) la différence.', a: ['verrez'], why: 'voir → verr-.' },
  { t: 'fill', q: 'Dès que je ___ (recevoir) la réponse, je vous préviens.', a: ['recevrai'], why: 'dès que takes the future, like quand.' },
  { t: 'mc', q: '"When I arrive, I will call you" —', opts: ["Quand j'arrive, je vous appellerai", "Quand j'arriverai, je vous appellerai"], a: 1, why: 'French uses the future after quand where English uses the present.' },
  { t: 'trans', q: 'We will be ready next week.', a: ['nous serons prêts la semaine prochaine', 'on sera prêts la semaine prochaine'], why: 'être → ser-.' }
],

'a2-pronouns': [
  { t: 'fill', q: 'Tu connais Marie ? — Oui, je ___ connais.', a: ['la'], why: 'connaître takes a direct object → la.' },
  { t: 'fill', q: 'Tu as téléphoné à Paul ? — Oui, je ___ ai téléphoné.', a: ['lui'], why: 'téléphoner à → indirect → lui.' },
  { t: 'fill', q: 'Tu vas au bureau ? — Oui, j\'___ vais.', a: ['y'], why: 'y replaces à + place.' },
  { t: 'fill', q: 'Tu veux du café ? — Oui, j\'___ veux bien.', a: ['en'], why: 'en replaces a partitive quantity.' },
  { t: 'mc', q: 'Les lettres ? Je les ai ___ .', opts: ['envoyé', 'envoyées'], a: 1, why: 'Preceding direct object (les = les lettres, feminine plural) → agreement.' },
  { t: 'mc', q: 'Where does the pronoun go in "je vais le faire"?', opts: ['Before the conjugated verb', 'Before the infinitive'], a: 1, why: 'When there is an infinitive, the pronoun attaches to it.' },
  { t: 'trans', q: 'I told them yesterday.', a: ['je leur ai dit hier'], why: 'dire à → leur.' }
],

'a2-reflexive': [
  { t: 'fill', q: 'Vous ___ souvenez de lui ?', a: ['vous'], why: 'se souvenir de → vous vous souvenez.' },
  { t: 'fill', q: 'Ils ___ sont rencontrés à Montréal.', a: ['se'], why: 'Reciprocal use: they met each other.' },
  { t: 'mc', q: '"Le bureau se trouve près de la gare" means…', opts: ['The office finds itself', 'The office is located'], a: 1, why: 'se trouver = to be located. Very common in directions.' },
  { t: 'fill', q: "Je ___ suis inscrit au cours.", a: ["me"], why: "s'inscrire → je me suis inscrit." },
  { t: 'trans', q: 'What is happening?', a: ["qu'est-ce qui se passe", "que se passe-t-il"], why: 'se passer = to happen.' }
],

'a2-compare': [
  { t: 'fill', q: 'Ce logement est ___ cher que l\'autre. (more)', a: ['plus'], why: 'plus … que.' },
  { t: 'mc', q: 'Which is right?', opts: ['Ce résultat est plus bon', 'Ce résultat est meilleur'], a: 1, why: 'bon → meilleur. Never "plus bon".' },
  { t: 'mc', q: '"Il chante ___ que moi."', opts: ['meilleur', 'mieux'], a: 1, why: 'mieux modifies a verb; meilleur modifies a noun.' },
  { t: 'fill', q: "Il y a ___ de travail cette année qu'en 2024. (as much)", a: ['autant'], why: 'autant de + noun.' },
  { t: 'trans', q: 'It is the most effective solution.', a: ["c'est la solution la plus efficace"], why: 'Adjective after the noun, so the article repeats.' }
],

'a2-connect': [
  { t: 'mc', q: 'Which signals a formal contrast?', opts: ['et', 'cependant', 'aussi'], a: 1, why: 'cependant, toutefois, néanmoins — all formal "however".' },
  { t: 'fill', q: '___ à votre aide, j\'ai réussi. (positive cause)', a: ['grâce'], why: 'grâce à for a positive cause.' },
  { t: 'fill', q: 'Le train était en retard ; ___ , j\'ai manqué la réunion. (consequence)', a: ['par conséquent', 'donc'], why: 'par conséquent is the formal register.' },
  { t: 'mc', q: 'Best opening for the second point in an essay:', opts: ['Aussi', 'De plus', 'Et'], a: 1, why: 'De plus / En outre / Par ailleurs. "Et" at the start of a sentence reads as weak in formal writing.' },
  { t: 'trans', q: 'On one hand it is cheaper, on the other it takes longer.', a: ["d'une part c'est moins cher, d'autre part c'est plus long"], why: 'The balanced pair examiners look for.' }
],

'b1-conditionnel': [
  { t: 'fill', q: 'Je ___ (vouloir) réserver une table.', a: ['voudrais'], why: 'The polite standard.' },
  { t: 'fill', q: 'Vous ___ (devoir) vérifier votre dossier. (you should)', a: ['devriez'], why: 'devoir → devr- + iez.' },
  { t: 'fill', q: 'Il ___ (être) préférable d\'attendre.', a: ['serait'], why: 'Hedged suggestion.' },
  { t: 'mc', q: 'A news report says "le ministre démissionnerait". This means…', opts: ['The minister will resign', 'The minister is reportedly going to resign'], a: 1, why: 'Conditional = unverified claim in journalism. A B2 recognition point.' },
  { t: 'mc', q: 'With the examiner, the best request is…', opts: ['Je veux savoir', "J'aimerais savoir", 'Dites-moi'], a: 1, why: "J'aimerais / je voudrais / pourriez-vous. Register is scored separately." },
  { t: 'trans', q: 'In your position, I would wait.', a: ['à votre place, j\'attendrais', 'à votre place j\'attendrais'], why: 'A useful persuasion frame for speaking Section B.' }
],

'b1-si': [
  { t: 'mc', q: "S'il ___ demain, nous annulerons.", opts: ['pleuvra', 'pleut', 'pleuvrait'], a: 1, why: 'Type 1: si + present, main clause future.' },
  { t: 'fill', q: "Si nous ___ (avoir) plus de budget, nous embaucherions.", a: ['avions'], why: 'Type 2: si + imparfait.' },
  { t: 'fill', q: "Si tu m'avais prévenu, je ___ (venir).", a: ['serais venu', 'serais venue'], why: 'Type 3: conditionnel passé in the main clause.' },
  { t: 'mc', q: 'Which is impossible in French?', opts: ["si j'avais", "si j'aurais", "si j'ai"], a: 1, why: 'Never a conditional directly after si.' },
  { t: 'trans', q: 'If I had more time, I would study more.', a: ["si j'avais plus de temps, j'étudierais davantage", "si j'avais plus de temps, j'étudierais plus"], why: 'Type 2 throughout.' }
],

'b1-subj-form': [
  { t: 'fill', q: 'Il faut que tu ___ (savoir) la vérité.', a: ['saches'], why: 'savoir → que je sache.' },
  { t: 'fill', q: 'Je veux qu\'il ___ (aller) à la réunion.', a: ['aille'], why: 'aller → que j\'aille.' },
  { t: 'fill', q: 'Il est possible que nous ___ (avoir) un retard.', a: ['ayons'], why: 'avoir → que nous ayons.' },
  { t: 'fill', q: 'Bien qu\'ils ___ (être) prêts, ils attendent.', a: ['soient'], why: "être → qu'ils soient." },
  { t: 'mc', q: 'How is the regular subjunctive stem formed?', opts: ['From the infinitive', 'From the nous form', 'From the ils form of the present'], a: 2, why: 'Drop -ent from the ils form, add the endings.' }
],

'b1-subj-use': [
  { t: 'mc', q: 'Je pense qu\'il ___ raison.', opts: ['ait', 'a'], a: 1, why: 'Positive penser takes the indicative. Only the negative or question form triggers the subjunctive.' },
  { t: 'mc', q: 'Il est important que vous ___ présent.', opts: ['êtes', 'soyez'], a: 1, why: 'Impersonal judgement → subjunctive.' },
  { t: 'fill', q: "Avant que tu ___ (partir), signe ici.", a: ['partes'], why: 'avant que always takes the subjunctive.' },
  { t: 'mc', q: 'Which does NOT take the subjunctive?', opts: ['bien que', 'espérer que', 'pour que'], a: 1, why: 'espérer que takes the indicative — the classic trap.' },
  { t: 'mc', q: '"I want to leave" is…', opts: ['Je veux que je parte', 'Je veux partir'], a: 1, why: 'Same subject → infinitive, no subordinate clause.' },
  { t: 'trans', q: 'It is important that newcomers have access to classes.', a: ["il est important que les nouveaux arrivants aient accès à des cours"], why: 'avoir → aient.' }
],

'b1-relative': [
  { t: 'fill', q: "C'est le collègue ___ m'a aidé.", a: ['qui'], why: 'A verb follows directly → qui.' },
  { t: 'fill', q: "Voici le rapport ___ j'ai rédigé.", a: ['que', "qu'"], why: 'A subject follows → que.' },
  { t: 'fill', q: "Le jour ___ je suis arrivé, il neigeait.", a: ['où'], why: 'où covers time as well as place.' },
  { t: 'fill', q: "C'est un problème ___ la cause est claire.", a: ['dont'], why: 'Possession: la cause du problème → dont.' },
  { t: 'fill', q: "___ je veux, c'est une réponse claire.", a: ['ce que'], why: 'No antecedent, and it is the object of veux.' },
  { t: 'mc', q: 'Which is never correct?', opts: ["qu'il", "qui il", "qui a"], a: 1, why: 'qui never elides and never precedes a subject pronoun that way.' }
],

'b1-passive': [
  { t: 'fill', q: 'La réunion a été ___ (reporter).', a: ['reportée'], why: 'Agreement with la réunion.' },
  { t: 'mc', q: 'Most natural French for "Mistakes were made":', opts: ['Des erreurs ont été faites', 'On a fait des erreurs'], a: 1, why: 'on is the idiomatic solution; the passive sounds translated.' },
  { t: 'fill', q: 'Ce mot ___ prononce différemment au Québec.', a: ['se'], why: 'Pronominal passive.' },
  { t: 'mc', q: '"Il s\'agit de" can take a personal subject —', opts: ['True', 'False'], a: 1, why: 'It is strictly impersonal. "Je m\'agis de" does not exist.' },
  { t: 'trans', q: 'A significant rise has been observed.', a: ['on constate une hausse importante', 'une hausse importante a été constatée'], why: 'Both work; the first is more idiomatic.' }
],

'b1-register': [
  { t: 'mc', q: 'Closing a formal letter:', opts: ['Bisous', 'Cordialement', 'Salut'], a: 1, why: 'Cordialement is the safe neutral-formal close. The full formula is more formal still.' },
  { t: 'mc', q: 'Which is soutenu?', opts: ['un truc', 'une chose', 'un élément'], a: 2, why: 'familier / courant / soutenu.' },
  { t: 'mc', q: 'In a formal essay you should write…', opts: ['ça', 'cela'], a: 1, why: 'ça is spoken register; cela belongs in formal writing.' },
  { t: 'mc', q: 'The prompt says you are writing to a friend. You use…', opts: ['vous', 'tu'], a: 1, why: 'Match the relationship the prompt names — markers check this specifically.' },
  { t: 'trans', q: 'Thank you in advance for your attention.', a: ['je vous remercie par avance de votre attention'], why: 'A fixed formula. Memorise it exactly.' }
],

'b2-argument': [
  { t: 'mc', q: 'Which stacks a second reason onto the first?', opts: ['En revanche', "D'autant plus que", 'Toutefois'], a: 1, why: "d'autant plus que reinforces; the others contrast." },
  { t: 'mc', q: '"Actuellement" belongs in which slot: "___, les loyers augmentent."', opts: ['Actually', 'Currently'], a: 1, why: 'A faux ami. "Actually" is en fait.' },
  { t: 'fill', q: '___ , les avantages l\'emportent. (ultimately)', a: ['en définitive', 'en somme'], why: 'Formal concluding markers.' },
  { t: 'mc', q: 'Which pair is the B2 concession move?', opts: ['et … aussi', 'certes … néanmoins', 'donc … alors'], a: 1, why: 'Acknowledge, then rebut. Explicitly rewarded.' },
  { t: 'mc', q: '"En effet" and "en fait" —', opts: ['Interchangeable', 'en effet confirms, en fait corrects'], a: 1, why: 'A graded distinction at B2.' },
  { t: 'trans', q: 'Admittedly the cost is high; nevertheless the measure is necessary.', a: ["certes le coût est élevé ; néanmoins la mesure est nécessaire", "certes, le coût est élevé ; néanmoins, la mesure est nécessaire"], why: 'The exact structure Section B rewards.' }
],

'b2-nuance': [
  { t: 'fill', q: 'Il ___ (sembler) que la situation soit complexe. (conditional)', a: ['semblerait'], why: 'il semblerait que + subjunctive — a strong hedging frame.' },
  { t: 'mc', q: 'Which is the stronger essay claim?', opts: ['Tout le monde est contre', 'Une majorité semble y être opposée'], a: 1, why: 'Hedged and quantified beats absolute.' },
  { t: 'fill', q: 'Un nombre ___ de jeunes quittent la région. (growing)', a: ['croissant'], why: 'un nombre croissant de.' },
  { t: 'mc', q: '"tend à" means…', opts: ['must', 'tends to', 'tries to'], a: 1, why: 'avoir tendance à / tendre à — useful hedges.' },
  { t: 'trans', q: 'To a certain extent, both positions are defensible.', a: ['dans une certaine mesure, les deux positions se défendent'], why: 'A high-register balancing sentence.' }
],

'b2-complex': [
  { t: 'fill', q: '___ lisant beaucoup, on enrichit son vocabulaire.', a: ['en'], why: 'Gérondif expressing means.' },
  { t: 'fill', q: 'Les personnes ___ (souhaiter) participer doivent s\'inscrire.', a: ['souhaitant'], why: 'Participe présent replacing "qui souhaitent".' },
  { t: 'mc', q: 'Which is wrong?', opts: ["En arrivant, j'ai vu l'affiche", "En arrivant, l'affiche était visible"], a: 1, why: 'The gérondif must share the subject of the main clause. The poster did not arrive.' },
  { t: 'fill', q: '___ reconnaissant les difficultés, je reste optimiste. (while)', a: ['tout en'], why: 'tout en + participle = simultaneity with contrast.' },
  { t: 'trans', q: 'By working evenings, he funded his studies.', a: ['en travaillant le soir, il a financé ses études'], why: 'Gérondif of means.' }
],

'b2-pqp': [
  { t: 'fill', q: "Quand je suis arrivé, ils ___ (partir) déjà.", a: ['étaient partis'], why: 'Plus-que-parfait with être.' },
  { t: 'fill', q: "Vous ___ (pouvoir) me prévenir ! (reproach)", a: ['auriez pu'], why: 'Conditionnel passé for reproach.' },
  { t: 'mc', q: '"Il a dit qu\'il viendrait" reports which original?', opts: ['Je viens', 'Je viendrai', 'Je venais'], a: 1, why: 'Future shifts to conditional in reported speech.' },
  { t: 'fill', q: "J'___ (devoir) accepter cette offre. (I should have)", a: ['aurais dû', 'aurais du'], why: "j'aurais dû + infinitive." },
  { t: 'trans', q: 'I had already sent the file when they called.', a: ["j'avais déjà envoyé le dossier quand ils ont appelé"], why: 'Past before past.' }
],

'b2-errors': [
  { t: 'mc', q: '"Assister à une réunion" means…', opts: ['to help at a meeting', 'to attend a meeting'], a: 1, why: 'To help is aider.' },
  { t: 'mc', q: '"Une librairie" is…', opts: ['a library', 'a bookshop'], a: 1, why: 'Library = une bibliothèque.' },
  { t: 'mc', q: 'Correct:', opts: ['Je réponds la question', 'Je réponds à la question'], a: 1, why: 'répondre à.' },
  { t: 'mc', q: '"Il est sensible" means…', opts: ['He is sensible', 'He is sensitive'], a: 1, why: 'Sensible = raisonnable.' },
  { t: 'mc', q: 'In French typography, what precedes a question mark?', opts: ['Nothing', 'A space'], a: 1, why: 'A space before : ; ? ! — markers notice.' },
  { t: 'mc', q: 'Which is capitalised in French?', opts: ['le Français (the language)', 'un Canadien (the person)', 'Lundi'], a: 1, why: 'Nationality as a noun is capitalised; as an adjective and for languages and days, lowercase.' },
  { t: 'trans', q: 'I hope to pass the exam in March.', a: ["j'espère réussir l'examen en mars"], why: 'réussir = to pass. passer = to sit.' }
],

'x-co': [
  { t: 'mc', q: 'You hear "Le cours coûte 250 dollars — pardon, 350." The answer is…', opts: ['250', '350'], a: 1, why: 'Self-correction always supersedes. Listen for pardon, non, plutôt, en fait, finalement.' },
  { t: 'mc', q: 'Best use of the pause before a recording:', opts: ['Clear your mind', 'Read the options and decide what kind of information you need'], a: 1, why: 'Prediction converts comprehension into marks.' },
  { t: 'mc', q: 'You hear two numbers and can only note one. Note…', opts: ['The first', 'The one matching the question type you predicted'], a: 1, why: 'This is exactly why you read the question first.' },
  { t: 'mc', q: 'Questions left blank score…', opts: ['Zero, but avoid guessing penalties', 'Zero — and there are no penalties, so always guess'], a: 1, why: 'No negative marking in either exam.' }
],

'x-ce': [
  { t: 'mc', q: 'In the reading section you may…', opts: ['Move freely between questions', 'Only go forward'], a: 0, why: 'Unlike listening. Bank the easy marks first.' },
  { t: 'mc', q: 'An answer option repeating the text word for word is…', opts: ['Probably correct', 'Often a distractor'], a: 1, why: 'Correct options paraphrase.' },
  { t: 'mc', q: 'To find the author\'s opinion, look…', opts: ['In the first sentence', 'After the concession marker'], a: 1, why: 'certes … mais, il est vrai que … toutefois. The real view follows the pivot.' },
  { t: 'mc', q: '40 questions in 60 minutes averages…', opts: ['60 seconds each', '90 seconds each', '2 minutes each'], a: 1, why: 'But short notices take 30 seconds, so bank time early for the long texts.' }
]

};

/* ======================================================= MORE LISTENING */

const LISTEN_X = [
{ id: 'x1', lvl: 'A1', voice: 'CA',
  text: "Bonjour, ici la bibliothèque municipale. Nous sommes ouverts du mardi au samedi, de dix heures à dix-huit heures. Le prêt est gratuit pour les résidents du quartier.",
  q: 'When is the library open?', opts: ['Monday to Friday', 'Tuesday to Saturday', 'Every day', 'Weekends only'], a: 1,
  why: '"du mardi au samedi". Listen for the pair of day names, not the times.' },

{ id: 'x2', lvl: 'A1', voice: 'FR',
  text: "Attention, le magasin fermera ses portes dans quinze minutes. Merci de vous présenter en caisse.",
  q: 'What is happening?', opts: ['The shop is opening', 'The shop closes in 15 minutes', 'The tills are broken', 'There is a sale'], a: 1,
  why: '"fermera … dans quinze minutes" — future plus a duration.' },

{ id: 'x3', lvl: 'A1', voice: 'CA',
  text: "Salut, c'est moi. Je suis au dépanneur, tu veux quelque chose ? J'en ai pour cinq minutes.",
  q: 'Where is the caller?', opts: ['At home', 'At the corner shop', 'At work', 'At the station'], a: 1,
  why: 'dépanneur is Québec for a convenience store. "J\'en ai pour cinq minutes" = I\'ll be five minutes.' },

{ id: 'x4', lvl: 'A1', voice: 'FR',
  text: "Le rendez-vous de madame Dubois est reporté de mardi à jeudi, même heure.",
  q: 'What changed?', opts: ['The time', 'The day', 'The doctor', 'Nothing'], a: 1,
  why: '"même heure" tells you the time is unchanged. Only the day moved.' },

{ id: 'x5', lvl: 'A2', voice: 'CA',
  text: "J'ai essayé de vous joindre trois fois ce matin, sans succès. Rappelez-moi avant seize heures, sinon je serai en réunion jusqu'à demain.",
  q: 'By when should you call back?', opts: ['Before 4 pm today', 'Tomorrow morning', 'Within three hours', 'After the meeting'], a: 0,
  why: '"avant seize heures" = before 4pm. "sinon" introduces the consequence.' },

{ id: 'x6', lvl: 'A2', voice: 'FR',
  text: "Pour bénéficier du tarif réduit, il faut présenter une pièce justificative. Sans ce document, le plein tarif s'applique, sans exception.",
  q: 'What happens without the document?', opts: ['You get the discount anyway', 'You pay full price', 'You are refused entry', 'You can pay later'], a: 1,
  why: '"le plein tarif s\'applique". "sans exception" closes off the alternative.' },

{ id: 'x7', lvl: 'A2', voice: 'CA',
  text: "On a visité l'appartement hier. Il est bien situé, proche du métro, mais il est plus petit que sur les photos. Et le loyer a augmenté depuis l'annonce.",
  q: 'What are the two problems?', opts: ['Location and noise', 'Size and price', 'Price and distance from the metro', 'Size and the neighbourhood'], a: 1,
  why: '"plus petit que sur les photos" and "le loyer a augmenté". The location is described positively.' },

{ id: 'x8', lvl: 'A2', voice: 'FR',
  text: "Votre colis a bien été expédié lundi. Cependant, en raison des conditions météo, la livraison est retardée de deux jours.",
  q: 'Why is the delivery late?', opts: ['The parcel was not sent', 'Bad weather', 'A wrong address', 'A strike'], a: 1,
  why: '"en raison des conditions météo". "Cependant" signals the problem is coming.' },

{ id: 'x9', lvl: 'A2', voice: 'CA',
  text: "Le cours de francisation commence le douze septembre. Il y a encore des places le soir, mais les groupes de jour sont complets.",
  q: 'Which groups still have space?', opts: ['Daytime', 'Evening', 'Both', 'Neither'], a: 1,
  why: '"encore des places le soir" but "les groupes de jour sont complets".' },

{ id: 'x10', lvl: 'B1', voice: 'FR',
  text: "Les résultats de l'enquête sont plus nuancés qu'il n'y paraît. Si la satisfaction globale progresse, elle recule nettement chez les moins de trente ans.",
  q: 'What do the results show?', opts: ['Satisfaction is up across the board', 'Satisfaction is down across the board', 'Up overall but down among under-30s', 'No change'], a: 2,
  why: '"Si … elle recule" — here "si" means "while/although", not "if". A B1 comprehension point.' },

{ id: 'x11', lvl: 'B1', voice: 'CA',
  text: "Le conseil municipal a voté le projet, mais son application dépendra du budget provincial, qui ne sera connu qu'en mars.",
  q: 'What is the status of the project?', opts: ['Approved and starting now', 'Rejected', 'Approved but conditional on funding', 'Postponed indefinitely'], a: 2,
  why: '"dépendra du budget" — the conditional element. "ne … qu\'en mars" = not until March.' },

{ id: 'x12', lvl: 'B1', voice: 'FR',
  text: "Contrairement à ce qu'on entend souvent, le nombre de candidatures n'a pas diminué. Ce qui a changé, c'est le profil des candidats.",
  q: 'What is the speaker correcting?', opts: ['That applications fell', 'That applications rose', 'That profiles are identical', 'That nothing changed'], a: 0,
  why: '"Contrairement à ce qu\'on entend souvent" flags that a common belief is about to be contradicted.' },

{ id: 'x13', lvl: 'B1', voice: 'CA',
  text: "Écoute, j'suis pas contre l'idée, mais faudrait qu'on en parle avec l'équipe avant de décider quoi que ce soit.",
  q: "What is the speaker's position?", opts: ['Opposed to the idea', 'In favour but wants to consult first', 'Already decided', 'Indifferent'], a: 1,
  why: '"j\'suis pas contre" — note the dropped ne. "faudrait qu\'on en parle" is the condition.' },

{ id: 'x14', lvl: 'B1', voice: 'FR',
  text: "La formation dure six mois, à raison de deux soirs par semaine. Elle est financée à hauteur de soixante-dix pour cent par la région, le reste étant à la charge du participant.",
  q: 'What does the participant pay?', opts: ['Nothing', '30%', '70%', 'The full cost'], a: 1,
  why: 'Funded at 70%, "le reste" = the remaining 30%. The question asks the opposite of the number stated.' },

{ id: 'x15', lvl: 'B2', voice: 'FR',
  text: "Loin de régler le problème, cette réforme risque de le déplacer. Les files d'attente ne disparaîtront pas ; elles se reporteront simplement sur d'autres services, déjà saturés.",
  q: "What is the speaker's view?", opts: ['The reform solves the problem', 'The reform shifts the problem elsewhere', 'The reform is too expensive', 'Waiting lists will disappear'], a: 1,
  why: '"Loin de … risque de le déplacer". "Loin de" + infinitive is a strong negation of the premise.' },

{ id: 'x16', lvl: 'B2', voice: 'CA',
  text: "On aurait pu penser que le télétravail favoriserait l'équilibre entre vie privée et vie professionnelle. Or, les données recueillies suggèrent plutôt l'inverse chez les jeunes employés.",
  q: 'What do the data suggest?', opts: ['Remote work improves balance', 'Remote work worsens balance for young employees', 'The data are inconclusive', 'Young employees prefer the office'], a: 1,
  why: '"Or" signals the contradiction, and "l\'inverse" reverses the expectation stated first.' },

{ id: 'x17', lvl: 'B2', voice: 'FR',
  text: "Il serait imprudent de généraliser à partir d'un seul échantillon. Cela dit, la tendance observée mérite qu'on s'y attarde, ne serait-ce que par précaution.",
  q: "What is the speaker's attitude?", opts: ['Dismissive of the finding', 'Cautious but thinks it deserves attention', 'Certain the trend is real', 'Hostile to the research'], a: 1,
  why: '"Cela dit" pivots from the caution to the concession. "ne serait-ce que" = if only.' },

{ id: 'x18', lvl: 'B2', voice: 'CA',
  text: "Le ministre aurait annoncé un réinvestissement massif, selon des sources proches du dossier. Aucune confirmation officielle n'a toutefois été obtenue à ce stade.",
  q: 'What is the status of this announcement?', opts: ['Officially confirmed', 'Reported but unconfirmed', 'Officially denied', 'Scheduled for next week'], a: 1,
  why: '"aurait annoncé" — conditional for an unverified report, plus the explicit "aucune confirmation officielle".' },

{ id: 'x19', lvl: 'A2', voice: 'CA',
  text: "Pour l'inscription, vous avez jusqu'au trente et un octobre. Passé ce délai, il faudra attendre la session suivante, soit janvier.",
  q: 'What happens after 31 October?', opts: ['You pay more', 'You wait until January', 'Registration is still open', 'You need a new form'], a: 1,
  why: '"Passé ce délai" = after that deadline. "soit" here means "that is".' },

{ id: 'x20', lvl: 'B1', voice: 'FR',
  text: "Je vous rappelle que les places sont attribuées par ordre d'arrivée, et non selon le niveau. Autrement dit, mieux vaut s'inscrire tôt que d'attendre d'être prêt.",
  q: 'How are places allocated?', opts: ['By level', 'First come, first served', 'By lottery', 'By interview'], a: 1,
  why: '"par ordre d\'arrivée, et non selon le niveau". "Autrement dit" restates it.' }
];

/* ========================================================= MORE READING */

const READ_X = [
{ id: 'rx1', lvl: 'A1',
  text: "HORAIRES D'OUVERTURE\n\nLundi — fermé\nMardi à vendredi — 9 h à 17 h\nSamedi — 10 h à 13 h\nDimanche — fermé\n\nFermeture exceptionnelle le 24 juin.",
  q: 'When can you come on a Saturday?', opts: ['9 am to 5 pm', '10 am to 1 pm', 'Not at all', 'Only on 24 June'], a: 1,
  why: 'Read the row, not the block. Saturday has its own hours.' },

{ id: 'rx2', lvl: 'A1',
  text: "Cherche colocataire pour appartement 4½ à Rosemont. Chambre meublée, 650 $ par mois, chauffage et internet inclus. Non-fumeur. Libre le 1er juillet.",
  q: 'What is NOT included?', opts: ['Heating', 'Internet', 'Furniture', 'Electricity'], a: 3,
  why: 'Heating, internet and furniture are all listed. Electricity is not mentioned, so it is not included.' },

{ id: 'rx3', lvl: 'A2',
  text: "Objet : confirmation d'inscription\n\nBonjour,\n\nNous confirmons votre inscription au cours du soir débutant le 15 septembre. Merci de vous présenter dix minutes à l'avance le premier jour, muni d'une pièce d'identité.\n\nEn cas d'empêchement, prévenez-nous au moins 48 heures à l'avance.",
  q: 'What must you bring on the first day?', opts: ['The confirmation email', 'Photo ID', 'Payment', 'A textbook'], a: 1,
  why: '"muni d\'une pièce d\'identité" — muni de means "carrying".' },

{ id: 'rx4', lvl: 'A2',
  text: "AVIS\n\nEn raison de travaux, l'ascenseur sera hors service du 3 au 7 avril. Les résidents à mobilité réduite sont priés de contacter la gestion pour organiser une assistance.\n\nNous vous remercions de votre patience.",
  q: 'What should residents with reduced mobility do?', opts: ['Use the stairs', 'Move out temporarily', 'Contact management', 'Wait until 7 April'], a: 2,
  why: '"sont priés de contacter la gestion" — a polite imperative.' },

{ id: 'rx5', lvl: 'A2',
  text: "Le covoiturage connaît une forte progression dans la région. Selon l'organisme responsable, le nombre d'inscrits a doublé en deux ans. Les trajets domicile-travail représentent désormais la majorité des déplacements enregistrés.",
  q: 'What do most recorded journeys involve?', opts: ['Holidays', 'Commuting', 'Shopping', 'Long distance'], a: 1,
  why: '"trajets domicile-travail" = home-to-work, i.e. commuting.' },

{ id: 'rx6', lvl: 'B1',
  text: "La pénurie de main-d'œuvre touche désormais des secteurs jusque-là épargnés. Si la restauration et la construction restent les plus affectées, le secteur public commence lui aussi à peiner à recruter, notamment dans les régions éloignées des grands centres.",
  q: 'What is new about the labour shortage?', opts: ['It now affects the public sector too', 'It only affects restaurants', 'It has ended', 'It affects only big cities'], a: 0,
  why: '"des secteurs jusque-là épargnés" then "le secteur public commence lui aussi". "Si" here means "while".' },

{ id: 'rx7', lvl: 'B1',
  text: "Madame,\n\nSuite à votre réclamation du 12 mai, nous avons procédé à une vérification de votre dossier. Il apparaît qu'une erreur de facturation a effectivement été commise. Un remboursement de 143,50 $ sera effectué sur votre prochaine facture.\n\nNous vous prions de nous excuser pour ce désagrément.",
  q: 'How will the refund be made?', opts: ['By cheque', 'In cash', 'As a credit on the next bill', 'By bank transfer'], a: 2,
  why: '"sera effectué sur votre prochaine facture" — applied to the next invoice, not paid out.' },

{ id: 'rx8', lvl: 'B1',
  text: "De plus en plus d'employeurs proposent des horaires flexibles. Si cette formule séduit les salariés, elle soulève des difficultés d'organisation pour les équipes qui doivent travailler ensemble. Certaines entreprises imposent donc des plages de présence obligatoire.",
  q: 'Why do some firms impose core hours?', opts: ['To reduce salaries', 'Because flexible hours complicate teamwork', 'Because employees dislike flexibility', 'To comply with the law'], a: 1,
  why: '"difficultés d\'organisation pour les équipes" is the cause; "donc" introduces the consequence.' },

{ id: 'rx9', lvl: 'B1',
  text: "Le programme d'aide au logement a été prolongé d'un an. Toutefois, les critères d'admissibilité ont été resserrés : le plafond de revenu a été abaissé et la durée de résidence exigée passe de six à douze mois.",
  q: 'What has changed about eligibility?', opts: ['It is easier to qualify', 'It is harder to qualify', 'Nothing has changed', 'The programme has ended'], a: 1,
  why: '"resserrés", "abaissé", "passe de six à douze mois" — all point to tighter criteria. "Toutefois" warns you the good news is qualified.' },

{ id: 'rx10', lvl: 'B2',
  text: "Il est tentant d'attribuer la hausse des inscriptions au seul effet de la campagne publicitaire. Une lecture plus attentive des données invite cependant à la prudence : la progression s'est amorcée plusieurs mois avant le lancement de celle-ci, et s'observe également dans des régions où la campagne n'a pas été diffusée.",
  q: 'What does the author conclude about the advertising campaign?', opts: ['It caused the rise', 'It probably did not cause the rise', 'It reduced enrolments', 'It was too expensive'], a: 1,
  why: 'Two pieces of evidence — the rise started earlier, and it happened where the campaign did not run. "invite à la prudence" is the signal.' },

{ id: 'rx11', lvl: 'B2',
  text: "Certes, l'ouverture de nouvelles places répond à une demande pressante. Il n'en demeure pas moins que, sans le recrutement d'enseignants qualifiés, cette mesure risque de se traduire par une dégradation de la qualité de l'enseignement plutôt que par une amélioration réelle de l'accès.",
  q: "What is the author's concern?", opts: ['There are too many places', 'More places without more teachers may lower quality', 'Demand is falling', 'Teachers are overqualified'], a: 1,
  why: 'Concession then the real point. "se traduire par" = to result in.' },

{ id: 'rx12', lvl: 'B2',
  text: "L'argument selon lequel la technologie détruirait massivement l'emploi mérite d'être replacé dans son contexte historique. Chaque vague d'automatisation a suscité des craintes comparables, et chacune s'est accompagnée, à terme, de la création de métiers inédits. Cela n'exonère pas les pouvoirs publics de leur responsabilité d'accompagner les transitions, souvent brutales pour les travailleurs concernés.",
  q: "What is the author's position?", opts: ['Technology will destroy employment', 'Historical fears were overblown, but transition support is still needed', 'Governments should not intervene', 'Automation creates no new jobs'], a: 1,
  why: 'Two moves: relativise the fear, then refuse to let government off the hook. "Cela n\'exonère pas" is the pivot.' },

{ id: 'rx13', lvl: 'B2',
  text: "Note de service\n\nÀ compter du 1er novembre, l'accès aux locaux en dehors des heures ouvrables sera soumis à autorisation préalable. Cette mesure, motivée par des impératifs de sécurité, ne concerne pas le personnel d'entretien, dont les horaires demeurent inchangés.",
  q: 'Who is exempt from the new rule?', opts: ['Nobody', 'Cleaning staff', 'Managers', 'Visitors'], a: 1,
  why: '"ne concerne pas le personnel d\'entretien". Watch for the negative exclusion clause.' },

{ id: 'rx14', lvl: 'B2',
  text: "Si l'on en croit les projections démographiques, la population active de la province diminuera de près de 8 % d'ici 2040. Encore faut-il rappeler que ces modèles reposent sur des hypothèses d'immigration constantes, ce que rien ne garantit.",
  q: 'What caveat does the author add?', opts: ['The projections are certainly correct', 'The projections assume immigration stays constant, which is not guaranteed', 'The population will grow', 'Immigration will definitely fall'], a: 1,
  why: '"Encore faut-il rappeler que" introduces a qualification. "ce que rien ne garantit" is the caveat.' }
];
