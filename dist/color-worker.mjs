import {makeLut} from './engine.mjs';
self.onmessage=({data})=>{try{const bytes=makeLut(data.recipe);self.postMessage({id:data.id,bytes},[bytes.buffer])}catch(e){self.postMessage({id:data.id,error:e.message})}};
