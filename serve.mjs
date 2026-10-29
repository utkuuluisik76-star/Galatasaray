import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { resolve, sep, extname } from 'node:path';
import {Readable} from 'node:stream';
import {handleApi} from './server/api.mjs';
import {openDatabase} from './server/local-db.mjs';
const db=openDatabase(process.env.COMMUNITY_DB===':memory:'?':memory:':undefined);
const root = fileURLToPath(new URL('./dist/', import.meta.url));
const types = { '.html':'text/html; charset=utf-8','.css':'text/css; charset=utf-8','.js':'text/javascript; charset=utf-8','.png':'image/png','.mp3':'audio/mpeg','.svg':'image/svg+xml','.webp':'image/webp','.avif':'image/avif','.woff2':'font/woff2','.mp4':'video/mp4','.txt':'text/plain' };
const server = createServer(async (req,res) => {
  try {
    if(req.url.startsWith('/api/')){
      const init={method:req.method,headers:req.headers};
      if(!['GET','HEAD'].includes(req.method)){init.body=Readable.toWeb(req);init.duplex='half';}
      const result=await handleApi(new Request('http://'+req.headers.host+req.url,init),db);
      res.writeHead(result.status,Object.fromEntries(result.headers));res.end(Buffer.from(await result.arrayBuffer()));return;
    }
    const path = decodeURIComponent(new URL(req.url,'http://localhost').pathname);
    const file = resolve(root, '.' + (path === '/' ? '/index.html' : path));
    if (!file.startsWith(root.endsWith(sep) ? root : root+sep)) { res.writeHead(403).end(); return; }
    if (path === '/media/stadium-drone.mp4') { try { await stat(file); } catch { res.writeHead(204,{'Cache-Control':'no-store'}).end(); return; } }
    const data = await readFile(file);
    res.writeHead(200,{'Content-Type':types[extname(file)]||'application/octet-stream','X-Robots-Tag':'noindex, nofollow','Content-Length':data.length});
    res.end(req.method === 'HEAD' ? undefined : data);
  } catch { res.writeHead(404,{'Content-Type':'text/plain'}).end('Not found'); }
});
const port=Number(process.env.PORT||4177);
server.listen(port,'127.0.0.1',()=>console.log(`Local: http://127.0.0.1:${port}`));
