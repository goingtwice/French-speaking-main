/* ============================================================================
   vocab-data.js — 26 graded batches, 520 words
   ---------------------------------------------------------------------------
   Compact format per entry: [french, english, example]
   Ordered by frequency and by exam utility, not alphabetically. Batch n is
   studied in week n of the plan.

   Nouns carry their article, always — learn "une table", never "table".
   IPA is deliberately not stored here: the Look up tab fetches real IPA and
   real human recordings from Wiktionary, which is more accurate than anything
   typed by hand.
   ========================================================================= */

const VOCAB_BATCHES = [

/* ===================== A1 — the words you cannot avoid ================== */
{ n: 1, lvl: 'A1', theme: 'First words and function words', words: [
  ['bonjour', 'hello / good morning', 'Bonjour, comment allez-vous ?'],
  ['bonsoir', 'good evening', 'Bonsoir, je suis en retard.'],
  ['merci', 'thank you', 'Merci beaucoup de votre aide.'],
  ['oui / non', 'yes / no', 'Oui, bien sûr. Non, pas du tout.'],
  ['s\'il vous plaît', 'please (formal)', 'Un café, s\'il vous plaît.'],
  ['excusez-moi', 'excuse me', 'Excusez-moi, je cherche la gare.'],
  ['pardon', 'sorry / pardon', 'Pardon, je n\'ai pas compris.'],
  ['et', 'and', 'Lui et moi.'],
  ['mais', 'but', 'C\'est cher, mais c\'est bon.'],
  ['ou', 'or', 'Thé ou café ?'],
  ['avec / sans', 'with / without', 'Avec du lait, sans sucre.'],
  ['pour', 'for / in order to', 'C\'est pour vous.'],
  ['dans', 'in', 'Dans la maison.'],
  ['sur / sous', 'on / under', 'Sur la table, sous la chaise.'],
  ['très', 'very', 'C\'est très important.'],
  ['aussi', 'also / too', 'Moi aussi.'],
  ['beaucoup', 'a lot', 'Merci beaucoup.'],
  ['un peu', 'a little', 'Je parle un peu français.'],
  ['ici / là', 'here / there', 'Il est ici, pas là.'],
  ['maintenant', 'now', 'Je pars maintenant.']
]},

{ n: 2, lvl: 'A1', theme: 'People and identity', words: [
  ['un homme / une femme', 'a man / a woman', 'C\'est une femme très compétente.'],
  ['un enfant', 'a child', 'Les enfants sont à l\'école.'],
  ['une personne / les gens', 'a person / people', 'Beaucoup de gens pensent cela.'],
  ['un ami / une amie', 'a friend', 'Je vais voir un ami.'],
  ['la famille', 'family', 'Toute ma famille vit en Inde.'],
  ['les parents', 'parents', 'Mes parents habitent loin.'],
  ['un frère / une sœur', 'a brother / a sister', 'J\'ai un frère et deux sœurs.'],
  ['le nom / le prénom', 'surname / first name', 'Quel est votre nom de famille ?'],
  ['l\'âge', 'age', 'Quel âge avez-vous ?'],
  ['le travail', 'work', 'Je cherche du travail.'],
  ['un collègue', 'a colleague', 'Mes collègues sont sympathiques.'],
  ['un voisin', 'a neighbour', 'Mon voisin est québécois.'],
  ['monsieur / madame', 'sir / madam', 'Madame, Monsieur,'],
  ['le pays', 'country', 'De quel pays venez-vous ?'],
  ['la ville', 'city / town', 'J\'habite dans une grande ville.'],
  ['la langue', 'language', 'Je parle trois langues.'],
  ['originaire de', 'originally from', 'Je suis originaire de l\'Inde.'],
  ['s\'appeler', 'to be called', 'Je m\'appelle Vamsi.'],
  ['habiter / vivre', 'to live', 'J\'habite à Toronto.'],
  ['venir de', 'to come from', 'Je viens d\'arriver.']
]},

{ n: 3, lvl: 'A1', theme: 'The highest-frequency verbs', words: [
  ['être', 'to be', 'Je suis prêt.'],
  ['avoir', 'to have', 'J\'ai un problème.'],
  ['faire', 'to do / to make', 'Qu\'est-ce que vous faites ?'],
  ['aller', 'to go', 'Je vais au bureau.'],
  ['dire', 'to say', 'Qu\'est-ce qu\'il a dit ?'],
  ['pouvoir', 'to be able to', 'Je ne peux pas venir.'],
  ['vouloir', 'to want', 'Je voudrais un rendez-vous.'],
  ['devoir', 'to have to', 'Vous devez remplir ce formulaire.'],
  ['savoir', 'to know (a fact)', 'Je ne sais pas.'],
  ['connaître', 'to know (a person/place)', 'Je connais bien Montréal.'],
  ['voir', 'to see', 'Je vois ce que vous voulez dire.'],
  ['prendre', 'to take', 'Je prends le métro.'],
  ['venir', 'to come', 'Il vient demain.'],
  ['donner', 'to give', 'Donnez-moi votre numéro.'],
  ['parler', 'to speak', 'Je parle un peu français.'],
  ['aimer', 'to like / love', 'J\'aime beaucoup cette ville.'],
  ['trouver', 'to find', 'Je n\'ai pas trouvé la réponse.'],
  ['penser', 'to think', 'Je pense que c\'est une bonne idée.'],
  ['croire', 'to believe', 'Je crois qu\'il a raison.'],
  ['mettre', 'to put', 'Mettez votre nom ici.']
]},

{ n: 4, lvl: 'A1', theme: 'More core verbs', words: [
  ['demander', 'to ask', 'Je vais leur demander.'],
  ['répondre', 'to answer', 'Ils n\'ont pas répondu.'],
  ['comprendre', 'to understand', 'Je n\'ai pas bien compris.'],
  ['apprendre', 'to learn', 'J\'apprends le français.'],
  ['travailler', 'to work', 'Je travaille en informatique.'],
  ['chercher', 'to look for', 'Je cherche un logement.'],
  ['attendre', 'to wait for', 'J\'attends une réponse.'],
  ['entendre', 'to hear', 'Je n\'entends rien.'],
  ['écouter', 'to listen to', 'Écoutez bien.'],
  ['regarder', 'to look at / watch', 'Je regarde les annonces.'],
  ['lire / écrire', 'to read / to write', 'J\'ai lu votre message.'],
  ['commencer', 'to begin', 'Le cours commence à huit heures.'],
  ['finir / terminer', 'to finish', 'J\'ai terminé mon dossier.'],
  ['partir', 'to leave', 'Je pars demain matin.'],
  ['arriver', 'to arrive / to happen', 'Qu\'est-ce qui est arrivé ?'],
  ['rester', 'to stay', 'Je reste à la maison.'],
  ['passer', 'to pass / spend (time)', 'J\'ai passé deux heures là-bas.'],
  ['payer', 'to pay', 'Comment est-ce que je peux payer ?'],
  ['acheter / vendre', 'to buy / to sell', 'J\'ai acheté une voiture d\'occasion.'],
  ['ouvrir / fermer', 'to open / to close', 'Le bureau est fermé le mercredi.']
]},

{ n: 5, lvl: 'A1', theme: 'Time', words: [
  ['le jour / la journée', 'day', 'Bonne journée !'],
  ['la semaine', 'week', 'La semaine prochaine.'],
  ['le mois / l\'année', 'month / year', 'Il y a deux ans.'],
  ['aujourd\'hui', 'today', 'Aujourd\'hui, il fait froid.'],
  ['hier / demain', 'yesterday / tomorrow', 'Hier soir, demain matin.'],
  ['le matin / le soir', 'morning / evening', 'Le matin, je pars tôt.'],
  ['l\'après-midi', 'afternoon', 'Fermé le mercredi après-midi.'],
  ['tôt / tard', 'early / late', 'Il est arrivé trop tard.'],
  ['toujours', 'always', 'Il est toujours en retard.'],
  ['souvent', 'often', 'Je prends souvent le bus.'],
  ['jamais', 'never', 'Je n\'y vais jamais.'],
  ['parfois / quelquefois', 'sometimes', 'Parfois, c\'est compliqué.'],
  ['déjà', 'already', 'J\'ai déjà envoyé le dossier.'],
  ['encore', 'still / again', 'Il n\'est pas encore arrivé.'],
  ['bientôt', 'soon', 'À bientôt !'],
  ['depuis', 'since / for', 'J\'habite ici depuis trois ans.'],
  ['pendant', 'during / for', 'Pendant deux heures.'],
  ['avant / après', 'before / after', 'Avant de partir.'],
  ['l\'heure', 'hour / time', 'À quelle heure ?'],
  ['en retard / à l\'heure', 'late / on time', 'Le train est à l\'heure.']
]},

{ n: 6, lvl: 'A1', theme: 'Quantity, place, direction', words: [
  ['combien', 'how much / many', 'Combien ça coûte ?'],
  ['plus / moins', 'more / less', 'Plus de temps, moins de stress.'],
  ['assez / trop', 'enough / too much', 'Il n\'y a pas assez de places.'],
  ['tout / tous', 'all / every', 'Tous les jours.'],
  ['quelque chose / rien', 'something / nothing', 'Je n\'ai rien vu.'],
  ['quelqu\'un / personne', 'someone / nobody', 'Il n\'y a personne.'],
  ['chaque', 'each', 'Chaque semaine.'],
  ['plusieurs', 'several', 'Plusieurs personnes.'],
  ['la plupart de', 'most of', 'La plupart des gens.'],
  ['environ', 'about / roughly', 'Environ trente minutes.'],
  ['à côté de', 'next to', 'À côté de la gare.'],
  ['en face de', 'opposite', 'En face du bureau.'],
  ['près de / loin de', 'near / far from', 'C\'est loin d\'ici ?'],
  ['à droite / à gauche', 'right / left', 'Tournez à droite.'],
  ['tout droit', 'straight ahead', 'Continuez tout droit.'],
  ['en haut / en bas', 'upstairs / downstairs', 'Le bureau est en haut.'],
  ['dehors / dedans', 'outside / inside', 'Attendez dehors.'],
  ['partout', 'everywhere', 'Le français se parle partout ici.'],
  ['l\'endroit', 'place / spot', 'C\'est un bon endroit.'],
  ['se trouver', 'to be located', 'Où se trouve le bureau ?']
]},

{ n: 7, lvl: 'A1', theme: 'Describing things', words: [
  ['grand / petit', 'big / small', 'Un grand appartement.'],
  ['bon / mauvais', 'good / bad', 'Une bonne idée.'],
  ['nouveau / ancien', 'new / old, former', 'Un ancien collègue.'],
  ['jeune / vieux', 'young / old', 'Les jeunes ménages.'],
  ['facile / difficile', 'easy / difficult', 'C\'est plus difficile que prévu.'],
  ['cher / pas cher', 'expensive / cheap', 'Le loyer est trop cher.'],
  ['important', 'important', 'C\'est très important pour moi.'],
  ['possible / impossible', 'possible / impossible', 'Ce n\'est pas impossible.'],
  ['long / court', 'long / short', 'Un long trajet.'],
  ['chaud / froid', 'hot / cold', 'Il fait froid dehors.'],
  ['ouvert / fermé', 'open / closed', 'Le magasin est ouvert.'],
  ['libre / occupé', 'free / busy', 'Je suis libre demain.'],
  ['prêt', 'ready', 'Je suis prêt à commencer.'],
  ['content / heureux', 'pleased / happy', 'Je suis content de vous voir.'],
  ['fatigué', 'tired', 'Je suis très fatigué.'],
  ['gratuit', 'free of charge', 'L\'entrée est gratuite.'],
  ['rapide / lent', 'fast / slow', 'Une réponse rapide.'],
  ['propre / sale', 'clean / dirty', 'Un logement propre.'],
  ['dernier / prochain', 'last / next', 'Le mois prochain.'],
  ['même / différent', 'same / different', 'C\'est la même chose.']
]},

{ n: 8, lvl: 'A1', theme: 'Home and daily objects', words: [
  ['la maison', 'house / home', 'Je rentre à la maison.'],
  ['un appartement', 'flat / apartment', 'Un appartement de deux chambres.'],
  ['une chambre', 'bedroom', 'Il y a deux chambres.'],
  ['la cuisine', 'kitchen / cooking', 'Une grande cuisine.'],
  ['la salle de bain', 'bathroom', 'La salle de bain est petite.'],
  ['la porte / la fenêtre', 'door / window', 'Fermez la porte.'],
  ['une clé', 'key', 'J\'ai perdu mes clés.'],
  ['la table / la chaise', 'table / chair', 'Sur la table.'],
  ['le lit', 'bed', 'Un grand lit.'],
  ['l\'eau', 'water', 'Un verre d\'eau, s\'il vous plaît.'],
  ['le pain', 'bread', 'J\'achète du pain.'],
  ['le café / le thé', 'coffee / tea', 'Un café, s\'il vous plaît.'],
  ['le téléphone', 'phone', 'Mon téléphone ne marche pas.'],
  ['l\'ordinateur', 'computer', 'Je travaille sur ordinateur.'],
  ['une voiture', 'car', 'Je n\'ai pas de voiture.'],
  ['un sac', 'bag', 'J\'ai oublié mon sac.'],
  ['l\'argent', 'money', 'Je n\'ai pas assez d\'argent.'],
  ['un papier / un document', 'paper / document', 'Apportez vos documents.'],
  ['un rendez-vous', 'appointment', 'Je voudrais prendre rendez-vous.'],
  ['le prix', 'price', 'Quel est le prix ?']
]},

/* ===================== A2 ============================================== */
{ n: 9, lvl: 'A2', theme: 'Shopping and food', words: [
  ['faire les courses', 'to do the grocery shopping', 'Je fais les courses le samedi.'],
  ['un magasin', 'shop', 'Le magasin ferme à 21 h.'],
  ['une caisse', 'checkout / till', 'Il y a la queue à la caisse.'],
  ['la monnaie', 'change (coins)', 'Gardez la monnaie.'],
  ['un billet', 'banknote / ticket', 'Un billet de vingt dollars.'],
  ['une carte bancaire', 'bank card', 'Vous acceptez la carte ?'],
  ['en espèces', 'in cash', 'Je paie en espèces.'],
  ['un rabais / une réduction', 'discount', 'Il y a un rabais de 20 %.'],
  ['une facture', 'bill / invoice', 'J\'ai reçu la facture.'],
  ['un reçu', 'receipt', 'Gardez le reçu.'],
  ['la viande / le poisson', 'meat / fish', 'Je ne mange pas de viande.'],
  ['les légumes / les fruits', 'vegetables / fruit', 'Des légumes frais.'],
  ['frais / périmé', 'fresh / expired', 'Le lait est périmé.'],
  ['goûter', 'to taste / try', 'Vous voulez goûter ?'],
  ['commander', 'to order', 'J\'ai commandé en ligne.'],
  ['livrer / la livraison', 'to deliver / delivery', 'La livraison est gratuite.'],
  ['échanger / rembourser', 'to exchange / refund', 'Je voudrais me faire rembourser.'],
  ['la taille', 'size', 'Vous avez une autre taille ?'],
  ['essayer', 'to try / try on', 'Je peux l\'essayer ?'],
  ['coûter', 'to cost', 'Ça coûte combien ?']
]},

{ n: 10, lvl: 'A2', theme: 'Work', words: [
  ['un emploi', 'a job', 'Je cherche un emploi.'],
  ['postuler', 'to apply', 'J\'ai postulé à trois postes.'],
  ['une candidature', 'application', 'Ma candidature a été retenue.'],
  ['un CV', 'CV / resumé', 'Envoyez votre CV.'],
  ['une entrevue', 'interview (Québec)', 'J\'ai une entrevue mardi.'],
  ['un entretien', 'interview (France)', 'Un entretien d\'embauche.'],
  ['l\'embauche', 'hiring', 'Le processus d\'embauche est long.'],
  ['le salaire', 'salary', 'Le salaire est négociable.'],
  ['les horaires', 'working hours', 'Les horaires sont flexibles.'],
  ['à temps plein / partiel', 'full-time / part-time', 'Je travaille à temps plein.'],
  ['une réunion', 'meeting', 'La réunion a été déplacée.'],
  ['un dossier', 'file / case', 'Je m\'occupe de ce dossier.'],
  ['une tâche', 'task', 'C\'est une tâche difficile.'],
  ['une équipe', 'team', 'Je travaille en équipe.'],
  ['un patron / un responsable', 'boss / manager', 'Mon responsable est absent.'],
  ['le télétravail', 'remote work', 'Je fais du télétravail.'],
  ['une formation', 'training course', 'J\'ai suivi une formation.'],
  ['un stage', 'internship', 'J\'ai fait un stage de six mois.'],
  ['démissionner', 'to resign', 'Il a démissionné en mars.'],
  ['un congé', 'leave / time off', 'Je prends un congé la semaine prochaine.']
]},

{ n: 11, lvl: 'A2', theme: 'Getting around', words: [
  ['les transports en commun', 'public transport', 'Je prends les transports en commun.'],
  ['un autobus / le métro', 'bus / metro', 'Le métro est plus rapide.'],
  ['une station / un arrêt', 'station / stop', 'Descendez au prochain arrêt.'],
  ['un abonnement', 'pass / subscription', 'J\'ai un abonnement mensuel.'],
  ['une correspondance', 'connection / transfer', 'Il y a une correspondance à Berri.'],
  ['le trajet', 'journey / commute', 'Le trajet dure une heure.'],
  ['un retard', 'delay', 'Il y a un retard de vingt minutes.'],
  ['un embouteillage', 'traffic jam', 'J\'étais dans un embouteillage.'],
  ['le permis de conduire', 'driving licence', 'J\'ai passé mon permis.'],
  ['faire le plein', 'to fill up with fuel', 'Je dois faire le plein.'],
  ['un vol', 'a flight / a theft', 'Mon vol est annulé.'],
  ['une valise / un bagage', 'suitcase / luggage', 'Ma valise est perdue.'],
  ['réserver', 'to book', 'Il faut réserver à l\'avance.'],
  ['annuler / reporter', 'to cancel / postpone', 'Je voudrais reporter mon rendez-vous.'],
  ['un aller simple / aller-retour', 'one-way / return', 'Un aller-retour, s\'il vous plaît.'],
  ['monter / descendre', 'to get on / get off', 'Descendez ici.'],
  ['se déplacer', 'to get around', 'Comment vous déplacez-vous ?'],
  ['un stationnement', 'car park (Québec)', 'Le stationnement est payant.'],
  ['la circulation', 'traffic', 'La circulation est dense le matin.'],
  ['à pied / à vélo', 'on foot / by bike', 'J\'y vais à pied.']
]},

{ n: 12, lvl: 'A2', theme: 'Health and the body', words: [
  ['la santé', 'health', 'La santé passe avant tout.'],
  ['un médecin', 'doctor', 'Je cherche un médecin de famille.'],
  ['un rendez-vous médical', 'medical appointment', 'J\'ai pris rendez-vous.'],
  ['les urgences', 'emergency room', 'Je suis allé aux urgences.'],
  ['une ordonnance', 'prescription', 'Le médecin m\'a fait une ordonnance.'],
  ['une pharmacie', 'pharmacy', 'La pharmacie est ouverte.'],
  ['un médicament', 'medicine', 'Je prends ce médicament le matin.'],
  ['avoir mal à', 'to have a pain in', 'J\'ai mal à la tête.'],
  ['être malade', 'to be ill', 'Je suis malade depuis lundi.'],
  ['se sentir', 'to feel', 'Je me sens mieux.'],
  ['guérir', 'to recover / heal', 'Il a guéri rapidement.'],
  ['la tête / le dos', 'head / back', 'J\'ai mal au dos.'],
  ['le ventre / la gorge', 'stomach / throat', 'J\'ai mal à la gorge.'],
  ['la fièvre', 'fever', 'J\'ai de la fièvre.'],
  ['fatigué / épuisé', 'tired / exhausted', 'Je suis épuisé.'],
  ['se reposer', 'to rest', 'Vous devez vous reposer.'],
  ['l\'assurance maladie', 'health insurance', 'Ma carte d\'assurance maladie.'],
  ['se faire vacciner', 'to get vaccinated', 'Je me suis fait vacciner.'],
  ['un examen médical', 'medical check-up', 'Un examen médical est obligatoire.'],
  ['le bien-être', 'wellbeing', 'Le bien-être au travail.']
]},

{ n: 13, lvl: 'A2', theme: 'Opinions and feelings', words: [
  ['à mon avis', 'in my opinion', 'À mon avis, c\'est une erreur.'],
  ['selon moi', 'according to me', 'Selon moi, il faut attendre.'],
  ['je trouve que', 'I find that', 'Je trouve que c\'est injuste.'],
  ['il me semble que', 'it seems to me that', 'Il me semble que c\'est faux.'],
  ['être d\'accord', 'to agree', 'Je suis tout à fait d\'accord.'],
  ['avoir raison / tort', 'to be right / wrong', 'Vous avez raison.'],
  ['préférer', 'to prefer', 'Je préfère le train.'],
  ['espérer', 'to hope', 'J\'espère qu\'il viendra.'],
  ['s\'inquiéter', 'to worry', 'Ne vous inquiétez pas.'],
  ['avoir peur de', 'to be afraid of', 'J\'ai peur de me tromper.'],
  ['avoir envie de', 'to feel like', 'J\'ai envie de partir.'],
  ['avoir besoin de', 'to need', 'J\'ai besoin de plus de temps.'],
  ['être surpris', 'to be surprised', 'J\'ai été surpris du résultat.'],
  ['être déçu', 'to be disappointed', 'Je suis déçu de la réponse.'],
  ['regretter', 'to regret', 'Je regrette de ne pas avoir insisté.'],
  ['se plaindre', 'to complain', 'Il se plaint tout le temps.'],
  ['remercier', 'to thank', 'Je vous remercie par avance.'],
  ['s\'excuser', 'to apologise', 'Je m\'excuse du retard.'],
  ['ça vaut la peine', 'it is worth it', 'Ça vaut vraiment la peine.'],
  ['ça me dérange', 'it bothers me', 'Ça ne me dérange pas du tout.']
]},

/* ===================== B1 ============================================== */
{ n: 14, lvl: 'B1', theme: 'Administration and immigration', words: [
  ['une démarche', 'a procedure / step', 'Les démarches sont longues.'],
  ['un formulaire', 'form', 'Remplissez ce formulaire.'],
  ['un justificatif', 'supporting document', 'Un justificatif de domicile.'],
  ['une attestation', 'certificate / statement', 'Une attestation de travail.'],
  ['une pièce d\'identité', 'identity document', 'Présentez une pièce d\'identité.'],
  ['un délai', 'deadline / processing time', 'Le délai est de trente jours.'],
  ['une demande', 'application / request', 'J\'ai déposé ma demande.'],
  ['déposer / soumettre', 'to submit', 'J\'ai soumis mon dossier en mars.'],
  ['la résidence permanente', 'permanent residence', 'Ma demande de résidence permanente.'],
  ['un permis de travail', 'work permit', 'Mon permis expire en juin.'],
  ['expirer / renouveler', 'to expire / renew', 'Je dois renouveler mon permis.'],
  ['être admissible', 'to be eligible', 'Vous êtes admissible à ce programme.'],
  ['une exigence', 'requirement', 'Les exigences ont changé.'],
  ['obligatoire / facultatif', 'compulsory / optional', 'Le test est obligatoire.'],
  ['traiter un dossier', 'to process a file', 'Votre dossier est en cours de traitement.'],
  ['refuser / accepter', 'to refuse / accept', 'Ma demande a été refusée.'],
  ['faire appel', 'to appeal', 'Vous pouvez faire appel de la décision.'],
  ['le numéro d\'assurance sociale', 'social insurance number', 'Votre NAS est requis.'],
  ['l\'immigration', 'immigration', 'Les politiques d\'immigration évoluent.'],
  ['un nouvel arrivant', 'newcomer', 'Un service pour les nouveaux arrivants.']
]},

{ n: 15, lvl: 'B1', theme: 'Housing', words: [
  ['un logement', 'housing / a place to live', 'Trouver un logement est difficile.'],
  ['le loyer', 'rent', 'Le loyer a augmenté de 8 %.'],
  ['un bail', 'lease', 'J\'ai signé un bail d\'un an.'],
  ['le propriétaire', 'landlord / owner', 'Le propriétaire refuse de réparer.'],
  ['un locataire', 'tenant', 'Les droits des locataires.'],
  ['les charges', 'utilities / service charges', 'Charges comprises.'],
  ['une caution / un dépôt', 'deposit', 'Il faut verser une caution.'],
  ['meublé / non meublé', 'furnished / unfurnished', 'Un appartement meublé.'],
  ['déménager / emménager', 'to move out / move in', 'Je déménage le 1er juillet.'],
  ['un quartier', 'neighbourhood', 'C\'est un quartier tranquille.'],
  ['le chauffage', 'heating', 'Le chauffage est inclus.'],
  ['une visite', 'viewing', 'J\'ai visité dix appartements.'],
  ['une annonce', 'listing / advert', 'J\'ai vu l\'annonce en ligne.'],
  ['abordable', 'affordable', 'Il manque de logements abordables.'],
  ['spacieux / exigu', 'spacious / cramped', 'Un salon spacieux.'],
  ['un voisinage', 'neighbourhood / neighbours', 'Le voisinage est calme.'],
  ['réparer / une réparation', 'to repair / repair', 'Les réparations sont urgentes.'],
  ['une fuite', 'a leak', 'Il y a une fuite d\'eau.'],
  ['la colocation', 'flat-sharing', 'Je vis en colocation.'],
  ['la pénurie', 'shortage', 'Une pénurie de logements.']
]},

{ n: 16, lvl: 'B1', theme: 'Money and administration', words: [
  ['un compte bancaire', 'bank account', 'J\'ai ouvert un compte bancaire.'],
  ['un virement', 'bank transfer', 'Faites un virement.'],
  ['les frais', 'fees', 'Des frais de dossier s\'appliquent.'],
  ['économiser / épargner', 'to save money', 'J\'essaie d\'économiser.'],
  ['dépenser', 'to spend', 'Je dépense trop.'],
  ['emprunter / prêter', 'to borrow / lend', 'J\'ai emprunté de l\'argent.'],
  ['un prêt', 'a loan', 'Un prêt étudiant.'],
  ['une dette', 'a debt', 'Rembourser ses dettes.'],
  ['rembourser', 'to refund / pay back', 'Ils m\'ont remboursé.'],
  ['les impôts', 'taxes', 'Déclarer ses impôts.'],
  ['le revenu', 'income', 'Un revenu stable.'],
  ['le coût de la vie', 'cost of living', 'Le coût de la vie a explosé.'],
  ['une augmentation / une baisse', 'increase / decrease', 'Une augmentation de 5 %.'],
  ['le budget', 'budget', 'Mon budget est serré.'],
  ['un pourboire', 'tip', 'Le pourboire n\'est pas inclus.'],
  ['une assurance', 'insurance', 'Une assurance habitation.'],
  ['un contrat', 'contract', 'Lisez bien le contrat.'],
  ['signer / résilier', 'to sign / cancel', 'J\'ai résilié mon abonnement.'],
  ['une amende', 'a fine', 'J\'ai reçu une amende.'],
  ['le pouvoir d\'achat', 'purchasing power', 'Le pouvoir d\'achat diminue.']
]},

{ n: 17, lvl: 'B1', theme: 'Education and learning', words: [
  ['les études', 'studies', 'J\'ai fait mes études en Inde.'],
  ['un diplôme', 'degree / diploma', 'Mon diplôme a été reconnu.'],
  ['une université / un collège', 'university / college', 'Je me suis inscrit au collège.'],
  ['s\'inscrire / une inscription', 'to enrol / enrolment', 'Les inscriptions sont ouvertes.'],
  ['un cours', 'a course / class', 'Un cours du soir.'],
  ['un enseignant', 'teacher', 'Les enseignants manquent.'],
  ['apprendre par cœur', 'to learn by heart', 'Il faut l\'apprendre par cœur.'],
  ['réviser', 'to revise', 'Je révise tous les soirs.'],
  ['passer un examen', 'to sit an exam', 'Je passe l\'examen en mars.'],
  ['réussir / échouer', 'to pass / to fail', 'J\'espère réussir.'],
  ['une note', 'a mark / grade', 'J\'ai eu une bonne note.'],
  ['un niveau', 'level', 'Quel est votre niveau ?'],
  ['progresser', 'to make progress', 'J\'ai beaucoup progressé.'],
  ['la francisation', 'French-language integration classes', 'Les cours de francisation sont gratuits.'],
  ['une compétence', 'a skill', 'Les quatre compétences.'],
  ['un acquis', 'acquired knowledge', 'La reconnaissance des acquis.'],
  ['une lacune', 'a gap / weakness', 'J\'ai des lacunes en grammaire.'],
  ['un manuel', 'textbook', 'Le manuel est fourni.'],
  ['une liste d\'attente', 'waiting list', 'Je suis sur liste d\'attente.'],
  ['une bourse', 'scholarship / grant', 'J\'ai obtenu une bourse.']
]},

{ n: 18, lvl: 'B1', theme: 'Society and current affairs', words: [
  ['la société', 'society', 'Une question qui concerne toute la société.'],
  ['le gouvernement', 'government', 'Le gouvernement a annoncé une réforme.'],
  ['une loi / une réforme', 'law / reform', 'La loi entre en vigueur en janvier.'],
  ['une mesure', 'measure / policy', 'Cette mesure est contestée.'],
  ['une enquête', 'survey / investigation', 'Selon une enquête récente.'],
  ['une étude', 'study', 'Plusieurs études le montrent.'],
  ['un sondage', 'poll', 'D\'après un sondage.'],
  ['la population', 'population', 'La population vieillit.'],
  ['une tendance', 'a trend', 'Une tendance inquiétante.'],
  ['un phénomène', 'phenomenon', 'Ce phénomène touche surtout les jeunes.'],
  ['les inégalités', 'inequalities', 'Les inégalités se creusent.'],
  ['la pauvreté', 'poverty', 'Lutter contre la pauvreté.'],
  ['le chômage', 'unemployment', 'Le taux de chômage a baissé.'],
  ['une grève', 'a strike', 'Une grève des transports.'],
  ['un syndicat', 'trade union', 'Le syndicat a réagi.'],
  ['un débat', 'debate', 'La question fait débat.'],
  ['une association', 'charity / association', 'Les associations réclament plus de moyens.'],
  ['le financement', 'funding', 'Le financement reste à préciser.'],
  ['une conséquence', 'consequence', 'Les conséquences sont lourdes.'],
  ['un enjeu', 'issue at stake', 'C\'est un enjeu majeur.']
]},

{ n: 19, lvl: 'B1', theme: 'Environment', words: [
  ['l\'environnement', 'environment', 'La protection de l\'environnement.'],
  ['le réchauffement climatique', 'global warming', 'Le réchauffement climatique s\'accélère.'],
  ['la pollution / polluer', 'pollution / to pollute', 'Réduire la pollution de l\'air.'],
  ['les déchets', 'waste', 'Le tri des déchets.'],
  ['recycler / le recyclage', 'to recycle / recycling', 'Le recyclage est obligatoire.'],
  ['le gaspillage', 'waste (of resources)', 'Le gaspillage alimentaire.'],
  ['les énergies renouvelables', 'renewable energy', 'Investir dans les énergies renouvelables.'],
  ['durable', 'sustainable', 'Un développement durable.'],
  ['une ressource', 'resource', 'Les ressources naturelles.'],
  ['consommer / la consommation', 'to consume / consumption', 'Réduire sa consommation.'],
  ['une empreinte carbone', 'carbon footprint', 'Réduire son empreinte carbone.'],
  ['le covoiturage', 'car sharing', 'Le covoiturage se développe.'],
  ['une canicule', 'heatwave', 'Une canicule exceptionnelle.'],
  ['une inondation', 'flood', 'Les inondations ont causé des dégâts.'],
  ['la biodiversité', 'biodiversity', 'La perte de biodiversité.'],
  ['préserver / protéger', 'to preserve / protect', 'Préserver les forêts.'],
  ['nuisible / nocif', 'harmful', 'Un produit nocif pour la santé.'],
  ['les dégâts', 'damage', 'Les dégâts sont considérables.'],
  ['une alternative', 'alternative', 'Il existe des alternatives.'],
  ['sensibiliser', 'to raise awareness', 'Sensibiliser le public.']
]},

/* ===================== B2 ============================================== */
{ n: 20, lvl: 'B2', theme: 'Technology and media', words: [
  ['le numérique', 'digital technology', 'La transition numérique.'],
  ['un réseau social', 'social network', 'Les réseaux sociaux influencent l\'opinion.'],
  ['un écran', 'screen', 'Le temps passé devant les écrans.'],
  ['une application', 'app', 'Une application mobile.'],
  ['un logiciel', 'software', 'Un logiciel libre.'],
  ['les données', 'data', 'La protection des données personnelles.'],
  ['la vie privée', 'privacy', 'Une atteinte à la vie privée.'],
  ['un courriel', 'email (Québec)', 'Je vous envoie un courriel.'],
  ['télécharger', 'to download', 'Téléchargez le formulaire.'],
  ['en ligne / hors ligne', 'online / offline', 'La démarche se fait en ligne.'],
  ['une panne', 'breakdown / outage', 'Il y a eu une panne de réseau.'],
  ['l\'intelligence artificielle', 'artificial intelligence', 'L\'IA transforme le marché du travail.'],
  ['une source fiable', 'reliable source', 'Vérifiez vos sources.'],
  ['la désinformation', 'disinformation', 'Lutter contre la désinformation.'],
  ['diffuser', 'to broadcast / spread', 'L\'information a été largement diffusée.'],
  ['un abonné', 'subscriber', 'Des millions d\'abonnés.'],
  ['la dépendance', 'addiction / dependence', 'La dépendance aux écrans.'],
  ['l\'accessibilité', 'accessibility', 'L\'accessibilité numérique.'],
  ['un outil', 'tool', 'Un outil de travail indispensable.'],
  ['évoluer', 'to evolve / change', 'Les usages évoluent rapidement.']
]},

{ n: 21, lvl: 'B2', theme: 'Arguing and reasoning', words: [
  ['soutenir / affirmer', 'to argue / assert', 'Les auteurs soutiennent que…'],
  ['prétendre', 'to claim', 'Certains prétendent le contraire.'],
  ['démontrer / prouver', 'to demonstrate / prove', 'Cela reste à démontrer.'],
  ['souligner', 'to emphasise / point out', 'Il souligne les limites du dispositif.'],
  ['mettre en évidence', 'to highlight', 'L\'étude met en évidence un écart.'],
  ['nuancer', 'to qualify / add nuance', 'Cette idée mérite d\'être nuancée.'],
  ['remettre en question', 'to call into question', 'Remettre en question cette approche.'],
  ['contester', 'to dispute', 'Une mesure vivement contestée.'],
  ['reconnaître', 'to acknowledge', 'Tout en reconnaissant les difficultés.'],
  ['constater', 'to observe / note', 'Force est de constater que…'],
  ['un argument', 'argument', 'Un argument convaincant.'],
  ['un exemple concret', 'a concrete example', 'Prenons un exemple concret.'],
  ['une preuve', 'evidence', 'Il n\'existe aucune preuve.'],
  ['un inconvénient / un avantage', 'drawback / advantage', 'Les avantages l\'emportent.'],
  ['l\'emporter sur', 'to outweigh', 'Les bénéfices l\'emportent sur les risques.'],
  ['dans une certaine mesure', 'to a certain extent', 'Dans une certaine mesure, c\'est vrai.'],
  ['au contraire', 'on the contrary', 'Au contraire, cela aggrave le problème.'],
  ['par ailleurs', 'moreover / incidentally', 'Par ailleurs, le coût reste élevé.'],
  ['en définitive', 'ultimately', 'En définitive, je reste convaincu.'],
  ['il n\'en demeure pas moins que', 'the fact remains that', 'Il n\'en demeure pas moins que c\'est coûteux.']
]},

{ n: 22, lvl: 'B2', theme: 'Abstract nouns', words: [
  ['une hausse / une baisse', 'rise / fall', 'Une forte hausse des loyers.'],
  ['un écart', 'gap / difference', 'Un écart important entre les régions.'],
  ['un constat', 'observation / finding', 'Un constat inquiétant.'],
  ['une contrainte', 'constraint', 'Les contraintes budgétaires.'],
  ['un obstacle / un frein', 'obstacle / brake', 'Un frein à l\'intégration.'],
  ['un levier', 'lever / means', 'Un levier efficace.'],
  ['un dispositif', 'scheme / system', 'Le dispositif actuel est insuffisant.'],
  ['une piste', 'lead / avenue', 'Une piste intéressante à explorer.'],
  ['un défi', 'challenge', 'Un défi de taille.'],
  ['un atout', 'an asset / strong point', 'Le bilinguisme est un atout majeur.'],
  ['la mise en œuvre', 'implementation', 'La mise en œuvre prendra des années.'],
  ['le recul', 'hindsight / decline', 'Avec le recul, je ferais autrement.'],
  ['l\'ampleur', 'scale / extent', 'L\'ampleur du phénomène surprend.'],
  ['un bilan', 'assessment / outcome', 'Le bilan est mitigé.'],
  ['une prise de conscience', 'growing awareness', 'Une réelle prise de conscience.'],
  ['un enjeu majeur', 'a major issue', 'Un enjeu majeur pour l\'avenir.'],
  ['une répercussion', 'repercussion', 'Les répercussions sont nombreuses.'],
  ['un compromis', 'compromise', 'Trouver un compromis acceptable.'],
  ['une exception', 'exception', 'À quelques exceptions près.'],
  ['une évolution', 'development / change', 'Une évolution encourageante.']
]},

{ n: 23, lvl: 'B2', theme: 'Precise verbs', words: [
  ['entraîner / provoquer', 'to lead to / cause', 'Cela a entraîné une hausse des prix.'],
  ['favoriser', 'to encourage / favour', 'Une mesure qui favorise les grandes entreprises.'],
  ['nuire à', 'to harm', 'Cela nuit à la qualité de vie.'],
  ['aggraver', 'to worsen', 'La crise aggrave les inégalités.'],
  ['atténuer / réduire', 'to lessen / reduce', 'Atténuer les effets négatifs.'],
  ['renforcer', 'to strengthen', 'Renforcer les services publics.'],
  ['accroître', 'to increase', 'Accroître la capacité d\'accueil.'],
  ['déplorer', 'to deplore / regret', 'Aucun blessé n\'est à déplorer.'],
  ['privilégier', 'to prioritise', 'Privilégier la proximité.'],
  ['envisager', 'to consider / contemplate', 'Il faudrait envisager une autre solution.'],
  ['permettre de', 'to make it possible to', 'Cela permettrait de gagner du temps.'],
  ['consister à / en', 'to consist of', 'La mesure consiste à réduire les délais.'],
  ['s\'agir de', 'to be about', 'Il s\'agit d\'un problème structurel.'],
  ['découler de', 'to stem from', 'Ces difficultés découlent d\'un manque de moyens.'],
  ['reposer sur', 'to rest on', 'L\'argument repose sur une erreur.'],
  ['tenir compte de', 'to take into account', 'Il faut tenir compte du contexte.'],
  ['faire face à', 'to face', 'Faire face à une pénurie.'],
  ['se heurter à', 'to run up against', 'Le projet se heurte à des obstacles.'],
  ['aboutir à', 'to result in', 'Les négociations n\'ont abouti à rien.'],
  ['veiller à', 'to ensure / see to it', 'Veiller à respecter les délais.']
]},

{ n: 24, lvl: 'B2', theme: 'Connectors and discourse markers', words: [
  ['d\'abord / tout d\'abord', 'first of all', 'Tout d\'abord, examinons les faits.'],
  ['ensuite / puis', 'then / next', 'Ensuite, il faut considérer le coût.'],
  ['enfin', 'finally', 'Enfin, la question du financement.'],
  ['de plus / en outre', 'moreover', 'En outre, le délai est trop court.'],
  ['d\'une part… d\'autre part', 'on one hand… on the other', 'D\'une part c\'est efficace, d\'autre part c\'est coûteux.'],
  ['cependant / toutefois', 'however', 'Toutefois, les résultats restent limités.'],
  ['néanmoins', 'nevertheless', 'Néanmoins, l\'effort mérite d\'être salué.'],
  ['en revanche', 'on the other hand', 'En revanche, le second texte insiste sur…'],
  ['certes… mais', 'admittedly… but', 'Certes, c\'est coûteux, mais indispensable.'],
  ['bien que + subj', 'although', 'Bien que ce soit difficile.'],
  ['malgré', 'despite', 'Malgré les difficultés.'],
  ['grâce à', 'thanks to', 'Grâce à cette formation.'],
  ['à cause de', 'because of (negative)', 'À cause du retard.'],
  ['puisque', 'since (known reason)', 'Puisque vous insistez.'],
  ['car', 'for (written because)', 'Il faut agir, car le temps presse.'],
  ['donc / par conséquent', 'so / consequently', 'Par conséquent, la mesure a été suspendue.'],
  ['c\'est pourquoi', 'that is why', 'C\'est pourquoi je m\'oppose à ce projet.'],
  ['d\'autant plus que', 'all the more so because', 'D\'autant plus que le budget est limité.'],
  ['en effet', 'indeed (introduces proof)', 'En effet, les chiffres le confirment.'],
  ['en fait', 'in fact (corrects)', 'En fait, ce n\'est pas tout à fait exact.']
]},

{ n: 25, lvl: 'B2', theme: 'Québec French you will actually hear', words: [
  ['un char', 'car', 'J\'ai laissé mon char au stationnement.'],
  ['une job', 'a job', 'Il s\'est trouvé une job à Laval.'],
  ['magasiner', 'to shop', 'On va magasiner en fin de semaine.'],
  ['la fin de semaine', 'weekend', 'Bonne fin de semaine !'],
  ['le déjeuner / dîner / souper', 'breakfast / lunch / dinner', 'On soupe à six heures.'],
  ['un dépanneur', 'corner shop', 'Je passe au dépanneur.'],
  ['présentement', 'currently', 'Je suis présentement en formation.'],
  ['tantôt', 'earlier / later today', 'Je t\'appelle tantôt.'],
  ['tsé', 'y\'know', 'Tsé, c\'est pas évident.'],
  ['pis', 'and then', 'Pis après, il est parti.'],
  ['ben', 'well / really', 'C\'est ben correct.'],
  ['pantoute', 'not at all', 'Ça me dérange pas pantoute.'],
  ['le frette', 'the cold (informal)', 'Il fait frette à matin.'],
  ['une tuque / des mitaines', 'winter hat / mittens', 'Mets ta tuque.'],
  ['la poudrerie', 'blowing snow', 'Il y a de la poudrerie sur l\'autoroute.'],
  ['un chum / une blonde', 'boyfriend / girlfriend', 'Ma blonde travaille à l\'hôpital.'],
  ['pogner', 'to catch / grab', 'J\'ai pogné le dernier autobus.'],
  ['niaiser', 'to mess about / joke', 'Arrête de niaiser.'],
  ['correct', 'fine / okay', 'C\'est correct, pas de problème.'],
  ['bienvenue', 'you\'re welcome', '— Merci ! — Bienvenue !']
]},

{ n: 26, lvl: 'B2', theme: 'Exam instructions and final review', words: [
  ['rédiger', 'to write / draft', 'Rédigez un texte argumenté.'],
  ['résumer', 'to summarise', 'Résumez les deux points de vue.'],
  ['décrire', 'to describe', 'Décrivez la situation.'],
  ['raconter', 'to recount', 'Racontez une expérience.'],
  ['justifier', 'to justify', 'Justifiez votre réponse.'],
  ['comparer', 'to compare', 'Comparez les deux approches.'],
  ['convaincre', 'to convince', 'Convainquez votre interlocuteur.'],
  ['défendre un point de vue', 'to defend a viewpoint', 'Défendez votre point de vue.'],
  ['exprimer', 'to express', 'Exprimez votre opinion.'],
  ['préciser', 'to specify', 'Pourriez-vous préciser ?'],
  ['reformuler', 'to rephrase', 'Reformulez sans recopier.'],
  ['un extrait', 'extract', 'Lisez l\'extrait ci-dessous.'],
  ['ci-dessous / ci-joint', 'below / attached', 'Veuillez trouver ci-joint mon CV.'],
  ['une consigne', 'instruction', 'Respectez les consignes.'],
  ['un énoncé', 'statement / prompt', 'Lisez attentivement l\'énoncé.'],
  ['environ … mots', 'about … words', 'Rédigez environ 200 mots.'],
  ['au moins / au plus', 'at least / at most', 'Au moins 80 mots.'],
  ['un interlocuteur', 'the person you are speaking to', 'Posez des questions à votre interlocuteur.'],
  ['une mise en situation', 'role-play scenario', 'Lisez la mise en situation.'],
  ['le temps imparti', 'the time allowed', 'Respectez le temps imparti.']
]}

];

/* ------------------------------------------------------------ helpers -- */

/** Flatten a batch into {fr, en, ex, lvl, theme, batch} objects. */
function batchWords(n) {
  const b = VOCAB_BATCHES.find(x => x.n === n);
  if (!b) return [];
  return b.words.map(([fr, en, ex]) => ({ fr, en, ex, lvl: b.lvl, theme: b.theme, batch: b.n }));
}

function allVocab() {
  return VOCAB_BATCHES.flatMap(b =>
    b.words.map(([fr, en, ex]) => ({ fr, en, ex, lvl: b.lvl, theme: b.theme, batch: b.n })));
}

const VOCAB_TOTAL = VOCAB_BATCHES.reduce((a, b) => a + b.words.length, 0);

/* ---------------------------------------------- spaced repetition ------ */
/* A cut-down SM-2. Box 0..5; each box has an interval in days. A correct
   answer moves up one box, a wrong answer drops to box 1 (not 0 — dropping
   all the way is demoralising and empirically unnecessary).                */

const BOX_DAYS = [0, 1, 2, 4, 9, 21];

function dueDate(box, fromMs) {
  return fromMs + BOX_DAYS[Math.min(box, BOX_DAYS.length - 1)] * 864e5;
}

function isDue(card, nowMs) {
  if (!card || card.box == null) return true;
  return (card.due || 0) <= nowMs;
}

function gradeCard(card, right, nowMs) {
  const box = right ? Math.min(5, (card.box || 0) + 1) : 1;
  return {
    ...card, box,
    due: dueDate(box, nowMs),
    seen: (card.seen || 0) + 1,
    ok: (card.ok || 0) + (right ? 1 : 0),
    last: nowMs
  };
}
