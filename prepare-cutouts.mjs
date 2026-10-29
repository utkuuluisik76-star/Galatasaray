import fs from 'node:fs/promises';
import sharp from 'sharp';
await fs.mkdir('dist/media/players-cutout',{recursive:true});
await fs.mkdir('sources/player-originals',{recursive:true});
const masks=JSON.parse(await fs.readFile('sources/cutout-masks.json','utf8'));
const records=[];
for(const[id,mask]of Object.entries(masks)){
 const source=`dist/media/players/${id}.webp`;
 await fs.copyFile(source,`sources/player-originals/${id}.webp`);
 const original=await sharp(source).removeAlpha().raw().toBuffer({resolveWithObject:true}),{width,height}=original.info;
 const matte=await sharp(mask).resize(width,height,{fit:'fill'}).ensureAlpha().extractChannel(3).raw().toBuffer({resolveWithObject:true});
 const alpha=Buffer.alloc(width*height);
 for(let i=0;i<alpha.length;i++)alpha[i]=matte.data[i*matte.info.channels];
 // Preserve original RGB pixels. Only the edited alpha matte is reused.
 // Clean connected pale studio pixels at the canvas edge to avoid a white halo.
 const rgb=original.data,seen=new Uint8Array(width*height),queue=new Int32Array(width*height);let read=0,write=0;
 const bg=(x,y)=>{const i=(y*width+x)*3,r=rgb[i],g=rgb[i+1],b=rgb[i+2];return Math.min(r,g,b)>187&&Math.max(r,g,b)-Math.min(r,g,b)<28;};
 const add=(x,y)=>{const i=y*width+x;if(!seen[i]&&bg(x,y)){seen[i]=1;queue[write++]=i;}};
 for(let x=0;x<width;x++){add(x,0);add(x,height-1);}for(let y=0;y<height;y++){add(0,y);add(width-1,y);}
 while(read<write){const i=queue[read++],x=i%width,y=Math.floor(i/width);if(x)add(x-1,y);if(x+1<width)add(x+1,y);if(y)add(x,y-1);if(y+1<height)add(x,y+1);}
 for(let i=0;i<alpha.length;i++)if(seen[i]&&alpha[i]<240)alpha[i]=0;
 // Contract the matte by one source pixel to remove studio-colour edge spill.
 const clean=Buffer.from(alpha);
 for(let y=1;y<height-1;y++)for(let x=1;x<width-1;x++){
   let a=255;for(let dy=-1;dy<=1;dy++)for(let dx=-1;dx<=1;dx++)a=Math.min(a,alpha[(y+dy)*width+x+dx]);clean[y*width+x]=a;
 }
 const rgba=Buffer.alloc(width*height*4);let transparent=0;for(let i=0;i<clean.length;i++){rgba[i*4]=rgb[i*3];rgba[i*4+1]=rgb[i*3+1];rgba[i*4+2]=rgb[i*3+2];rgba[i*4+3]=clean[i];if(clean[i]===0)transparent++;}
 await sharp(rgba,{raw:{width,height,channels:4}}).webp({quality:88,alphaQuality:100}).toFile(`dist/media/players-cutout/${id}.webp`);
 records.push({id,width,height,transparentPixels:transparent,share:Math.round(transparent/alpha.length*100)});
}
await fs.writeFile('sources/cutout-check.json',JSON.stringify(records,null,2));
console.log(`Prepared ${records.length} alpha cutouts using original portrait pixels.`);
