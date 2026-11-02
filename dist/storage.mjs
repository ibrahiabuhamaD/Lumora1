const DATABASE='lumora-mobile-v1',STORE='media';let db;
export async function openDB(){if(db)return db;db=await new Promise((resolve,reject)=>{let req=indexedDB.open(DATABASE,1);req.onupgradeneeded=()=>req.result.createObjectStore(STORE,{keyPath:'id'});req.onsuccess=()=>resolve(req.result);req.onerror=()=>reject(req.error)});return db}
async function request(mode,fn){const db=await openDB();return new Promise((resolve,reject)=>{const tx=db.transaction(STORE,mode),req=fn(tx.objectStore(STORE));let result;req.onsuccess=()=>result=req.result;req.onerror=()=>reject(req.error);tx.oncomplete=()=>resolve(result);tx.onerror=()=>reject(tx.error);tx.onabort=()=>reject(tx.error)})}
export const listMedia=()=>request('readonly',s=>s.getAll());
export const saveMedia=item=>request('readwrite',s=>s.put(item));
export const deleteMedia=id=>request('readwrite',s=>s.delete(id));
