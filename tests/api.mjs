import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import {pathToFileURL} from 'node:url';
import ts from 'typescript';
const temp=await fs.mkdtemp(path.join(os.tmpdir(),'who-v2-api-'));
try {
 for(const [source,target] of [['lib/data.ts','data.mjs'],['lib/api.ts','api.mjs'],['app/api/v2/[resource]/route.ts','route.mjs']]){
  let input=await fs.readFile(source,'utf8');input=input.replace("from './data'","from './data.mjs'").replace("from '../../../../lib/api'","from './api.mjs'");
  const output=ts.transpileModule(input,{compilerOptions:{target:ts.ScriptTarget.ES2022,module:ts.ModuleKind.ES2022}}).outputText;await fs.writeFile(path.join(temp,target),output);
 }
 const {GET,POST}=await import(pathToFileURL(path.join(temp,'route.mjs')));
 const context=r=>({params:Promise.resolve({resource:r})});
 let checks=0;
 for(const resource of ['site','programs','events','people','stories','districts']){const r=await GET(new Request('https://example.test/api/v2/'+resource),context(resource));assert.equal(r.status,200);assert.ok((await r.json()).data);checks++;}
 let r=await GET(new Request('https://example.test/api/v2/search?q=environment'),context('search'));let j=await r.json();assert.ok(j.data.some(x=>x.type==='Program'));assert.equal(r.headers.get('Cache-Control'),'no-store');checks++;
 r=await GET(new Request('https://example.test/api/v2/search?q=zzzzzzzzzzzzzz'),context('search'));assert.deepEqual((await r.json()).data,[]);checks++;
 r=await GET(new Request('https://example.test/api/v2/search?q=a'),context('search'));assert.deepEqual((await r.json()).data,[]);checks++;
 r=await GET(new Request('https://example.test/api/v2/search?q='+'a'.repeat(121)),context('search'));assert.equal(r.status,400);checks++;
 r=await GET(new Request('https://example.test/api/v2/missing'),context('missing'));assert.equal(r.status,404);checks++;
 const post=(body,headers={'Content-Type':'application/json'},resource='contact')=>POST(new Request('https://example.test/api/v2/'+resource,{method:'POST',headers,body}),context(resource));
 r=await post(JSON.stringify({name:'Test Member',email:'member@example.test',subject:'A partnership & collaboration',message:'Let us discuss a community partnership.'}));j=await r.json();assert.equal(r.status,200);assert.equal(j.sent,false);assert.equal(j.delivery,'email-client');assert.ok(j.mailto.startsWith('mailto:info@worldhimachali.org?'));assert.ok(j.mailto.includes('%26'));checks++;
 for(const value of [null,{}, {name:'AB',email:'bad',subject:'Valid subject',message:'Long enough message'}]){r=await post(JSON.stringify(value));assert.equal(r.status,400);checks++;}
 r=await post('{broken');assert.equal(r.status,400);checks++;
 r=await post('text',{'Content-Type':'text/plain'});assert.equal(r.status,415);checks++;
 r=await post('x'.repeat(12001));assert.equal(r.status,413);checks++;
 r=await post('{}',{'Content-Type':'application/json'},'events');assert.equal(r.status,405);assert.equal(r.headers.get('Allow'),'GET');checks++;
 console.log(`${checks} API checks passed: content, search, drafts, validation and error handling.`);
} finally {await fs.rm(temp,{recursive:true,force:true})}
