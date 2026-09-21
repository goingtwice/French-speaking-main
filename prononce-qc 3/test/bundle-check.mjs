import { chromium } from 'playwright';
import http from 'node:http'; import fs from 'node:fs'; import path from 'node:path';
const f = '/home/claude/prononce-qc/dist/index.html';
const srv = http.createServer((q,r)=>{ r.writeHead(200,{'Content-Type':'text/html'}); r.end(fs.readFileSync(f)); });
await new Promise(r=>srv.listen(8399,r));
const b = await chromium.launch({ executablePath:'/opt/pw-browsers/chromium-1194/chrome-linux/chrome', args:['--no-sandbox'] });
const p = await b.newPage();
let errs=[]; p.on('pageerror',e=>errs.push(e.message));
await p.goto('http://127.0.0.1:8399/');
await p.waitForFunction(()=>!!window.__pq,{timeout:10000});
const r = await p.evaluate(()=>({
  qc: window.__pq.deriveQC('pə.tit')?.ipa,
  rules: document.querySelectorAll('#rulesBox .card').length,
  chips: document.querySelectorAll('#starterChips .chip').length,
  tabs: document.querySelectorAll('nav.tabs button').length
}));
console.log(JSON.stringify(r), 'pageerrors:', errs.length?errs:'none');
await b.close(); srv.close();
