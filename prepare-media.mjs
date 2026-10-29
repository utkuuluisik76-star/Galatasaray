import fs from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';
sharp.concurrency(2);
await fs.mkdir('dist/media/players',{recursive:true});await fs.mkdir('sources/raw',{recursive:true});
async function get(url,name){const r=await fetch(url);if(!r.ok)throw Error(`${name}: ${r.status}`);const b=Buffer.from(await r.arrayBuffer());await fs.writeFile('sources/raw/'+name,b);return b;}
const roster=JSON.parse(await fs.readFile('sources/roster.json'));
const bundle=JSON.parse(await fs.readFile('sources/roster-bundle.json'));
for(const p of roster){const number=p.title.match(/^\d+/)[0];const asset=bundle.assets.find(a=>a.url===p.photo);await sharp(asset.path).resize(240,260,{fit:'inside'}).webp({quality:77}).toFile(`dist/media/players/${number}.webp`);}
const logo=await get('https://www.galatasaray.org/assets/img/gs_logo.png','logo.png');await sharp(logo).resize(150,170,{fit:'inside'}).png().toFile('dist/media/logo.png');
const kits=JSON.parse(await fs.readFile('sources/kits.json')).slice(0,3);
for(let i=0;i<3;i++){const b=await get(kits[i].url,`kit-${i}.png`);await sharp(b).resize(600,720,{fit:'inside'}).webp({quality:82}).toFile('dist/media/kit-'+['home','away','third'][i]+'.webp');}
const audioHtml=await fs.readFile('sources/audio.html','utf8');const audioUrl=[...audioHtml.matchAll(/https:[^"'<>\s]+\.mp3/g)].map(m=>m[0]).find(u=>u.includes('cocukluk')&&!u.includes('piyano'));
if(!audioUrl)throw Error('chant source missing');await fs.writeFile('dist/media/galatasaray-tribun.mp3',await get(audioUrl,'chant.mp3'));await fs.writeFile('sources/audio-source.txt',audioUrl);
const match=await fs.readFile('sources/match.html','utf8');const gallery=[...new Set([...match.matchAll(/https:[^"'<>\s]+\/newsgallery\/[^"'<>\s]+\.jpeg/g)].map(m=>m[0]).filter(u=>!u.includes('_small')))];
await fs.writeFile('sources/gallery.json',JSON.stringify(gallery));
// Small contact sheet for choosing real team and action photography.
const tiles=[];for(let i=0;i<Math.min(28,gallery.length);i++){const b=await get(gallery[i],`match-${i}.jpg`);tiles.push({input:await sharp(b).resize(240,150,{fit:'cover'}).extend({bottom:25,background:'#fff'}).composite([{input:Buffer.from(`<svg width="240" height="25"><text x="10" y="18" font-size="17">${i}</text></svg>`),top:150,left:0}]).jpeg().toBuffer(),left:(i%4)*240,top:Math.floor(i/4)*175});}
await sharp({create:{width:960,height:Math.ceil(tiles.length/4)*175,channels:3,background:'#eee'}}).composite(tiles).jpeg({quality:80}).toFile('sources/contact-sheet.jpg');
console.log(`Prepared ${roster.length} players, logo, 3 kits, chant, ${tiles.length} match photos.`);
