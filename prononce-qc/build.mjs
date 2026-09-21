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

swap('<script src="data.js"></script>\n<script src="app.js"></script>',
  () => '<script>\n' + read('data.js') + '\n</script>\n<script>\n' + read('app.js') + '\n</script>');

for (const leak of ['src="app.js"', 'src="data.js"', 'href="styles.css"']) {
  if (html.includes(leak)) throw new Error('bundle still references ' + leak);
}

fs.mkdirSync(path.join(root, 'dist'), { recursive: true });
fs.writeFileSync(path.join(root, 'dist/index.html'), html);
console.log('dist/index.html  ' + (Buffer.byteLength(html) / 1024).toFixed(0) + ' KB  — self-contained');
