# Prononce QC

A complete, free course for **TEF Canada / TCF Canada**, aimed at NCLC 7.

Thirty-four grammar and technique modules from absolute beginner to exam level,
timed practice sections that score you against NCLC bands, fill-in templates for
every writing and speaking task in both exams, and a pronunciation tool that
plays the same word in Québécois, French, Belgian, Swiss and African accents
side by side.

No backend. No build step. No account. No API keys. One static folder you drop
on GitHub Pages and open from your phone.

---

## What's in it

**Course** — 34 modules, roughly 24 hours of first-pass study:

| Stage | Modules | Covers |
|---|---|---|
| A1 | 11 | Reading French aloud, gender, être/avoir, present tense, negation, questions, numbers, adjectives, prepositions |
| A2 | 8 | Both past tenses and when to use which, futures, object pronouns, reflexives, comparison, connectors |
| B1 | 7 | Conditional, si clauses, subjunctive forms and triggers, relatives, passive and impersonal, register |
| B2 | 5 | Argumentation connectors, hedging, gérondif, plus-que-parfait, and the errors English speakers keep making |
| Exam | 3 | TEF vs TCF, listening strategy, reading strategy |

Each module has teaching blocks, a reference table, examples read aloud by your
device's French voice, and a drill that will not mark the module complete until
you score 70%.

**Tests** — a 20-question placement check that routes you to the right stage,
10 listening items (transcript hidden until you answer), 6 reading passages in
exam format, writing prompts with a live word count and the marker's checklist,
speaking role-play cards with a countdown, and a study plan with honest hour
counts.

**Templates** — the skeleton for TEF Expression écrite A and B, TCF tasks 1–3,
TEF Expression orale A and B, and the TCF speaking tasks. Each one gives the
step-by-step structure, model sentences you can hear, phrases to memorise, and
the specific trap that sinks most candidates.

---

## The pronunciation side

The original problem this app solved is usually framed as *"I can't find a source with the correct French
pronunciation."* That framing is the trap. From the TEF Canada listening spec:

> TEF Canada includes speakers with various French accents from **France,
> Belgium, Switzerland, Québec, and Africa** — and most audio plays **once**.

The variation is the exam. There is no single correct recording to find, so this
app does not try to give you one. It gives you the spread, labelled by region,
so you can train on the difference instead of being ambushed by it.

---

## What it does

**Look up** — search in English or French. English input resolves through
Wiktionary's translation tables, so `car` offers *voiture*, *automobile*, *char*
(Québec) and *wagon* with their senses, not one guess. French input goes
straight to the entry.

Each result gives you:

- every human recording Wikimedia has, grouped by **Québec / France / Belgium /
  Switzerland / Africa**, with the speaker and their stated region
- the IPA, plus a **derived Québec transcription** when no Québec speaker has
  recorded the word (see below)
- an **A/B trainer**: one button alternating Québec → France, with a loop and a
  0.6× mode. This is the feature that actually retrains your ear.
- playback at 1× / 0.75× / 0.5× with pitch preserved

**Deck** — star words, review them in a five-box Leitner rotation, export to
JSON so a cleared browser doesn't cost you the list.

**Drills** — four, all offline once the page has loaded:

| Drill | What it trains |
|---|---|
| Minimal pairs | `tu`/`tout`, `peu`/`peur`, `brin`/`brun`, `patte`/`pâte` — the contrasts an English ear merges |
| Québec sounds | Predict the Québec realisation from the France one, rule by rule |
| Reduced speech | `chépa` → *je ne sais pas*. The exam warns you'll hear shortened forms; this is them |
| Exam vocab | ~90 words across the TEF/TCF topic areas, admin and immigration vocabulary included |

**Speak** — type any phrase, hear it in a Canadian French voice, **record
yourself**, then A/B your recording against the reference. This is the drill for
*expression orale*, and it's the one most people skip.

**Guide** — the Québec accent broken into seven mechanical rules with worked IPA
examples, the reduced forms, a Québec↔France vocabulary table, and the score
tables for both exams.

---

## Data sources

All CORS-enabled, none need a key:

| Source | Used for |
|---|---|
| `fr.wiktionary.org` | IPA, and `{{écouter}}` recordings with their region labels |
| `commons.wikimedia.org` | resolving those filenames to playable URLs (+ mp3 transcodes, which Safari needs for `.ogg`) |
| `en.wiktionary.org` | English → French, sense by sense |
| `api.mymemory.translated.net` | translation fallback |
| Your device's speech engine | TTS for phrases and drills |

Recordings are contributed to **Wikimedia Commons / Lingua Libre** by volunteers
and are **CC BY-SA**. The app credits them on every result. If you ever
redistribute this, keep that attribution.

### Optional: Forvo

[Forvo](https://api.forvo.com/plans-and-pricing/) has 4M+ recordings with explicit
country labels. The **Non-Profit plan is $2/month for 500 requests/day**, which is
effectively unlimited for one learner. Paste a key in Settings.

Forvo's API sends no CORS headers, so a browser-only page usually can't call it.
`worker/forvo-proxy.js` is a Cloudflare Worker that fixes that and keeps the key
off your device — deploy instructions are in the file header, then paste the
Worker URL in Settings. Everything else works without any of this.

---

## The derived Québec IPA

When no Québec speaker has recorded a word, the app derives an approximate
Québec transcription from the metropolitan one by applying the two rules that
are genuinely mechanical:

1. **Affrication** — `t` → `t͡s` and `d` → `d͡z` before `i`, `y`, `j`, `ɥ`
   (`tu` → `t͡sy`, `dire` → `d͡ziːʁ`)
2. **Laxing** — `i y u` → `ɪ ʏ ʊ` in a short closed syllable
   (`vite` → `vɪt`, `jupe` → `ʒʏp`, `route` → `ʁʊt`), unless the following
   consonant is `ʁ v z ʒ`, which lengthens the vowel instead

It is labelled **derived** in the UI, and deliberately does *not* guess at
diphthongisation or the `ɛ̃`/`œ̃` split, which vary too much by speaker. A real
recording always wins over the derivation.

Rules follow [Quebec French phonology](https://en.wikipedia.org/wiki/Quebec_French_phonology).

---

## Run it

Any static host. From the repo root:

```bash
python3 -m http.server 8000     # then open http://localhost:8000
```

**GitHub Pages** — push, then Settings → Pages → deploy from `main` / root.
HTTPS is required for the microphone, and Pages gives you that.

Deep link straight to a word: `…/index.html#bonjour`

### Single file

If you'd rather have one portable file:

```bash
node build.mjs        # writes dist/index.html with everything inlined
```

---

## Verify it on your device

Settings (⚙) → **Run check**. It tests every source from wherever you're
actually running it and tells you what answered, including whether your device
has a Canadian French voice installed. Run this first if anything looks empty.

No French voice? The drills and phrase playback go silent — the lookups still
work, since those are real recordings.

- **Android**: Settings → System → Languages → Text-to-speech → install French (Canada)
- **iOS**: Settings → Accessibility → Spoken Content → Voices → French (Canada) → *Amélie*

---

## Tests

```bash
npm install
npm test
```

119 checks across two suites.

`test/e2e.mjs` — 56 checks on the pronunciation side: the Québec IPA
derivation, the Wiktionary template parser, region classification, and a full
UI pass with the network stubbed against realistic wikitext fixtures.

`test/course.mjs` — 63 checks on the course: a content-integrity sweep over all
34 modules and 143 drill items (missing fields, out-of-range answer indices,
mismatched table rows, stray HTML), the answer-checking logic, the drill engine
including the 70% completion gate, placement routing, listening with the
transcript correctly hidden, writing word count and draft persistence, and a
regression check that every original tab still opens.

Both write screenshots to `test/`.

---

## Your deck lives in this browser

`localStorage`, on one device, in one browser. It survives reloads and
redeploys; it does not sync, and clearing site data wipes it. Export from the
Deck tab before you switch phones.

If you later want it to sync, the shape in `data.js` maps cleanly onto a single
Supabase table — but that means a backend and an auth flow, which is why it
isn't here.

---

## Exam numbers, and how much to trust them

The tables in the Guide tab (TEF 0–699, TCF 0–699/0–20, the CRS +25/+50 rules)
and the task formats in the templates were correct at time of writing, but
**IRCC changes thresholds and TEF has changed its scale before**. The app links
straight to the official page. Confirm there before you book anything.

Practice scores are an **indication, not a calibrated result**. The real exams
weight questions by difficulty; this one converts a raw percentage. Treat a
practice NCLC 7 as "probably in range", not as a pass.

## How long this actually takes

Alliance Française de Vancouver puts zero to B2 at roughly **650 classroom
hours**. NCLC 7 is officially B1+ with elements of B2, so 500–650 hours is the
realistic range. Over six months that is about 3.5 hours a day, every day. The
study plan in the Tests tab does this arithmetic for whatever window you have,
and says plainly when a target is not achievable — a failed attempt costs the
fee and about six weeks.

---

## Layout

```
index.html              markup
styles.css              design tokens, light + dark
data.js                 Québec phonology rules, reduced forms, minimal
                        pairs, ~90 themed vocab entries, exam score tables
course-a.js             A1 and A2 modules
course-b.js             B1, B2 and exam-technique modules
exam-data.js            writing + speaking templates, listening and
                        reading banks, placement check, study plan
app.js                  pronunciation lookup, deck, ear drills, speak
course.js               course and tests tabs
worker/forvo-proxy.js   optional Cloudflare Worker
test/e2e.mjs            pronunciation suite
test/course.mjs         course suite + content integrity
build.mjs               optional single-file bundler
```
