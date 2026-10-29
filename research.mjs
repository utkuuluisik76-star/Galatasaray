import fs from 'node:fs/promises';
for(const n of ['news','home']){
 const t=await fs.readFile('sources/'+n+'.html','utf8');
 console.log(n,[...t.matchAll(/<a[^>]+href="([^"]+)"[^>]*>([\s\S]*?)<\/a>/g)].map(m=>({url:m[1],text:m[2].replace(/<[^>]+>/g,'').trim()})).filter(a=>/Fenerbah|forma|Osimhen|Lille|Konyaspor|galatasaray-2/i.test(a.text)));
 console.log('css', [...t.matchAll(/<link[^>]+href="([^"]+\.css[^" ]*)"/g)].map(m=>m[1]));
}
