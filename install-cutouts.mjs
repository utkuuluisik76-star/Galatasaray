import fs from 'node:fs/promises';
import sharp from 'sharp';
const roster=JSON.parse(await fs.readFile('sources/roster.json'));
for(const p of roster){const id=p.title.match(/^\d+/)[0],file=`dist/media/players-cutout/${id}.webp`;const meta=await sharp(file).metadata();if(!meta.hasAlpha)throw Error('No alpha: '+id);}
let html=await fs.readFile('dist/index.html','utf8');html=html.replaceAll('/media/players/','/media/players-cutout/');if(!html.includes('/portraits.css'))html=html.replace('</head>','<link rel="stylesheet" href="/portraits.css"></head>');await fs.writeFile('dist/index.html',html);
let data=await fs.readFile('dist/squad-data.js','utf8');data=data.replaceAll('/media/players/','/media/players-cutout/');await fs.writeFile('dist/squad-data.js',data);
const tiles=[];for(let i=0;i<roster.length;i++){const p=roster[i],id=p.title.match(/^\d+/)[0];const photo=await sharp(`dist/media/players-cutout/${id}.webp`).resize(150,176,{fit:'contain',background:'#00000000'}).png().toBuffer();const tile=await sharp({create:{width:170,height:210,channels:3,background:'#e2b555'}}).composite([{input:photo,left:10,top:5},{input:Buffer.from(`<svg width="170" height="24"><text x="10" y="17" font-family="Arial" font-size="14" fill="#210b10">#${id}</text></svg>`),left:0,top:183}]).png().toBuffer();tiles.push({input:tile,left:(i%8)*170,top:Math.floor(i/8)*210});}
await sharp({create:{width:1360,height:840,channels:3,background:'#210b10'}}).composite(tiles).jpeg({quality:92}).toFile('qa/player-cutouts-sheet.jpg');
console.log('All 32 transparent portraits installed in last XI, Dream 11 and player picker.');
