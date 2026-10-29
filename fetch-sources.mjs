import fs from 'node:fs/promises';
const home=await fs.readFile('sources/home.html','utf8');
const links=[...home.matchAll(/href="([^"]+)"/g)].map(m=>m[1]).filter(x=>x.includes('/haber/futbol/'));
console.log('football links', [...new Set(links)]);
const targets={css:'https://www.galatasaray.org/assets/css/main.css',training:'https://www.galatasaray.org/haber/futbol/tumosan-konyaspor-macinin-hazirliklari-basladi/61243',osimhen:'https://www.galatasaray.org/haber/futbol/victor-osimhen-bu-buyuk-buyuk-derbiyi-kazanip-3-puani-almayi-basardik/61234'};
await Promise.all(Object.entries(targets).map(async([n,u])=>{const r=await fetch(u);const t=await r.text();await fs.writeFile('sources/'+n+(n==='css'?'.css':'.html'),t);console.log(n,t.length);if(n!=='css') console.log(t.replace(/<[^>]*>/g,' ').replace(/\s+/g,' ').slice(-11000,-5500));}));
