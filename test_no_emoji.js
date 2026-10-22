const fs=require('fs');
const assert=require('node:assert/strict');
for(const file of ['index.html','app.js','ux-v05.css']) {
 const content=fs.readFileSync(__dirname+'/'+file,'utf8');
 assert(!/\p{Extended_Pictographic}/u.test(content),file+' contains a pictographic emoji');
}
console.log('PASS: no emoji in the user interface sources');
