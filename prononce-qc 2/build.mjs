/* Inlines styles.css, data.js and app.js into one portable dist/index.html.
   Replacements go through a function, never a string: the sources contain
   things like "$&" (regex escaping) that String.replace would otherwise
   expand as substitution patterns and quietly corrupt the bundle. */
import fs from 'node:fs';
import path from 'node:path';

const root = import.meta.dirname;
const read = f => fs.readFileSync(path.join(root, f), 'utf8');

let html = read('index.html');

const swap = (needle, produce) => {
  if (!html.includes(needle)) throw new Error('index.html no longer contains: ' + needle);
  html = html.replace(needle, () => produce());
};

swap('<link rel="stylesheet" href="styles.css">',
  () => '<style>\n' + read('styles.css') + '\n</style>');

const SCRIPTS = ['data.js', 'course-a.js', 'course-b.js', 'exam-data.js', 'app.js', 'course.js'];
swap(SCRIPTS.map(f => `<script src="${f}"></script>`).join('\n'),
  () => SCRIPTS.map(f => '<script>\n' + read(f) + '\n</script>').join('\n'));

for (const leak of [...SCRIPTS.map(f => `src="${f}"`), 'href="styles.css"']) {
  if (html.includes(leak)) throw new Error('bundle still references ' + leak);
}

fs.mkdirSync(path.join(root, 'dist'), { recursive: true });
fs.writeFileSync(path.join(root, 'dist/index.html'), html);
console.log('dist/index.html  ' + (Buffer.byteLength(html) / 1024).toFixed(0) + ' KB  — self-contained');
