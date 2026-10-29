import fs from 'node:fs/promises';
const colors={'#0b1b32':'#35131b','#102334':'#35131b','#2c435b':'#68434d','#243951':'#5b303b','#19304c':'#4d2330','#020c1cbb':'#18070dbb','#010914cc':'#18070dcc','#0d213b':'#35131b','#10253d':'#3b1722','#1b3652':'#572535','#0b1b30':'#291018','#273b55':'#66444d','#405069':'#75505b'};
for(const n of ['style.css','official.css','squad-builder.css']){let t=await fs.readFile('dist/'+n,'utf8');for(const[a,b]of Object.entries(colors))t=t.replaceAll(a,b);await fs.writeFile('dist/'+n,t);}
let html=await fs.readFile('dist/index.html','utf8');html=html.replaceAll('Galatasaray 2026/27 Lacivert Forma','Galatasaray 2026/27 Alternatif Forma');await fs.writeFile('dist/index.html',html);
