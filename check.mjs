import fs from 'node:fs/promises';import path from 'node:path';
const html=await fs.readFile('dist/index.html','utf8'),errors=[];
for(const url of new Set([...html.matchAll(/(?:src|href|srcset)="(\/[^" ]+)"/g)].map(m=>m[1]))){if(url==='/media/stadium-drone.mp4'||url.startsWith('/api/'))continue;try{await fs.access('dist'+url)}catch{errors.push('Missing: '+url)}}
for(const n of ['app.js','squad-builder.js','music.js','index.html']){const t=await fs.readFile('dist/'+n,'utf8');if(/fenerbahce\.org|fenerium|irfan-goal|uluks-fener|İrfan Can Kahveci/.test(t))errors.push('Stale Fenerbahçe content: '+n);}
if((html.match(/<h1[ >]/g)||[]).length!==1)errors.push('H1 count');
let bytes=0;async function sum(dir){for(const e of await fs.readdir(dir,{withFileTypes:true})){const p=path.join(dir,e.name);if(e.isDirectory())await sum(p);else bytes+=(await fs.stat(p)).size;}}await sum('dist');
console.log({bytes,under2MB:bytes<2000000,errors});if(bytes>=2000000||errors.length)process.exitCode=1;
