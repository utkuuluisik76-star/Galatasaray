import fs from 'node:fs/promises';
const targets={match:'https://www.galatasaray.org/haber/futbol/derbide-uc-puan-bizim/61231',audio:'https://dijitalesik.com/galatasaray-zil-sesleri/'};
for(const[n,u]of Object.entries(targets)){const t=await(await fetch(u)).text();await fs.writeFile('sources/'+n+'.html',t);}
for(const n of ['match','training','osimhen']){const t=await fs.readFile('sources/'+n+'.html','utf8');console.log(n,[...t.matchAll(/(?:src|href)="(https:[^"]+\.(?:jpe?g|png|webp)[^"]*)"/g)].map(m=>m[1]));console.log('galleries',[...t.matchAll(/href="([^"]*(?:galeri|foto)[^"]*)"/g)].map(m=>m[1]));}
const css=await fs.readFile('sources/css.css','utf8'); console.log('logos',[...css.matchAll(/url\(([^)]+)\)/g)].map(m=>m[1]).filter(x=>/logo/i.test(x)));
const a=await fs.readFile('sources/audio.html','utf8');console.log('audio',[...a.matchAll(/https:[^"'<>\s]+\.mp3/g)].map(m=>m[0]));
