import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {fresh,applyPreset,prepare,shade,resizeCrop,outputSize} from './dist/engine.mjs';
const data=JSON.parse(await readFile(new URL('./dist/presets.json',import.meta.url)));
assert.equal(data.presets.length,2000);assert.equal(data.categories.length,20);
assert.equal(new Set(data.presets.map(p=>JSON.stringify(p.recipe))).size,2000);
for(const category of data.categories)assert.equal(data.presets.filter(p=>p.category===category).length,100);
const src=await readFile(new URL('./dist/app.mjs',import.meta.url),'utf8');
const validation=src.slice(src.indexOf('function validLook('),src.indexOf("$('#presetInput').onchange="));
const valid=Function(validation+';return validLook')();
for(const p of data.presets)assert(valid(p.recipe),'Invalid recipe: '+p.name);
assert(!valid({values:{exposure:NaN}}));let broken=structuredClone(data.presets[0].recipe);broken.curves.rgb=[];assert(!valid(broken));broken=structuredClone(data.presets[0].recipe);broken.hsl[0].h=Infinity;assert(!valid(broken));
const reference=JSON.parse(await readFile(new URL('./tests/reference-colors.json',import.meta.url))),input=Buffer.from(reference.input,'base64');let maxError=0;
for(const test of reference.tests){const expected=Buffer.from(test.expected,'base64'),ctx=prepare(test.recipe);for(let i=0;i<input.length;i+=4){const rgb=shade(input[i]/255,input[i+1]/255,input[i+2]/255,ctx);for(let c=0;c<3;c++)maxError=Math.max(maxError,Math.abs(Math.round(rgb[c]*255)-expected[i+c]))}}
assert(maxError<=2,'Reference pixel mismatch '+maxError);
for(let i=0;i<1000;i++){const b=resizeCrop([.2,.2,.6,.6],['nw','se','n','w'][i%4],Math.sin(i),Math.cos(i),i%2?1:0);assert(b.every(Number.isFinite));assert(b[0]>=-1e-8&&b[1]>=-1e-8&&b[0]+b[2]<=1.00001&&b[1]+b[3]<=1.00001)}
let p=fresh();p.crop=[.2,.2,.5,.5];p.subjectX=.2;let applied=applyPreset(p,p,data.presets[0]);assert.deepEqual(applied.crop,p.crop);assert.equal(applied.subjectX,.2);const size=outputSize(8000,6000,fresh(),0,12000000);assert(size[0]*size[1]<=12000000);
console.log(JSON.stringify({filters:2000,categories:20,uniqueRecipes:2000,referenceCases:reference.tests.length,maxColorError:maxError,cropBoundsCases:1000,presetValidation:'passed',spatialPreservation:'passed',exportLimit:'passed'}));
