const fs=require('fs'),vm=require('vm'),assert=require('node:assert/strict'),path=require('path');
const root=__dirname;const original=JSON.parse(fs.readFileSync(path.join(root,'data/bank.json')));
function harness(bank){
 let now=Date.parse('2026-10-21T20:00:00Z');
 class FakeDate extends Date{static now(){return now}}
 const handlers={};let overlay=null;const storage=new Map();const app={innerHTML:'',textContent:''};
 const document={
  getElementById:()=>app,
  querySelector:(sel)=>{if(sel==='.settings-shade'||sel==='.modal-shade')return overlay;if(sel==='#timer')return null;return null},
  addEventListener:(k,cb)=>{handlers[k]=cb},
  body:{insertAdjacentHTML:(where,html)=>{overlay={html,remove(){overlay=null}}}},
  activeElement:{tagName:'BODY'}
 };
 const localStorage={getItem:k=>storage.has(k)?storage.get(k):null,setItem:(k,v)=>storage.set(k,v)};
 const window={scrollTo:()=>{},ESAMI_MOLINETTE_BANK:bank};
 const ctx={document,window,localStorage,Date:FakeDate,setInterval:()=>1,clearInterval:()=>{},setTimeout,clearTimeout,console,Math,JSON};vm.createContext(ctx);
 vm.runInContext(fs.readFileSync(path.join(root,'app.js'),'utf8'),ctx);
 function click(action,data={}){handlers.click({target:{closest:()=>({dataset:{action,...data}})}})}
 function setup(name,val){handlers.change({target:{dataset:{setup:name},value:String(val)}})}
 function pref(name,val){handlers.change({target:{dataset:{pref:name},value:typeof val==='string'?val:'',checked:!!val,type:typeof val==='boolean'?'checkbox':'radio'}})}
 function input(key,num){handlers.change({target:{dataset:{spacing:key},value:num}})}
 function unit(key,val){handlers.change({target:{dataset:{unit:key},value:val}})}
 function includes(value){assert(app.innerHTML.includes(value),`Missing ${value}: ${app.innerHTML.substring(0,250)}`)}
 function notIncludes(value){assert(!app.innerHTML.includes(value),`Unexpected ${value}`)}
 function title(){let m=app.innerHTML.match(/<h2 class="player-title">([^<]*)<\/h2>/);return m?.[1]||''}
 function store(){return JSON.parse(storage.get('esami-molinette-v2-progress')||'{}')}
 return {click,setup,pref,input,unit,includes,notIncludes,title,store,storage,app,now:()=>now,advance:ms=>now+=ms,getOverlay:()=>overlay};
}
const single=original.questions.filter(q=>q.type==='multiple_choice'&&q.correct_indexes.length===1&&!q.uncertain_in_source&&q.subject==='nefro').slice(0,3);
const bank={...original,questions:single};
const h=harness(bank);
h.click('course',{id:'nefro'});h.click('setup');h.setup('count','custom');h.setup('n','3');h.click('start-session');
h.includes('1 di 3');const first=h.title();
h.click('choose',{index:'0'});h.includes('rating-wrap');h.includes('Da rifare');h.includes('Continua senza valutare');
h.click('rate',{grade:'again'});h.includes('Ripasso dopo 1 domanda.');h.includes('1 di 4');
h.click('next-question');h.includes('2 di 4');h.click('choose',{index:'0'});h.click('next-question');h.includes('3 di 4');
assert.equal(h.title(),first,'after one other question, the first should repeat');
h.click('choose',{index:'0'});h.includes('correct-feedback');
// settings opens from player and can hide the rating bar
h.click('open-settings');assert(h.getOverlay()?.html.includes('Impostazioni'));
h.pref('showReviewBar',false);assert(h.getOverlay()?.html.includes('Se disattivato'));
h.click('close-settings');h.notIncludes('rating-wrap');h.includes('Continua');h.includes('3 di 4');
// separate manual difficulty, saved persistently
const qid=single.find(q=>q.question.replace(/&/g,'&amp;').replace(/</g,'&lt;')===first)?.id||single[0].id;
h.click('difficulty',{id:qid,value:'hard'});assert.equal(h.store()[qid].difficulty,'hard');
h.click('finish-session');h.includes('prima risposta');h.includes('Rivedi ogni domanda');
// default unchanged in mock: no revealed answers, no ratings, no explanation before submission
h.click('setup');h.click('mode',{mode:'mock'});h.setup('count','custom');h.setup('n','1');h.click('start-session');h.click('choose',{index:'0'});
h.includes('SIMULAZIONE');h.notIncludes('rating-wrap');h.notIncludes('correct-feedback');h.notIncludes('explain-foot');
h.click('submit-exam');h.includes('Rivedi ogni domanda');
// time review saves dueAt, and the due subset becomes selectable on a later day
h.click('open-settings');h.pref('showReviewBar',true);h.pref('repeatMode','time');h.click('close-settings');
h.click('setup');h.click('mode',{mode:'practice'});h.setup('count','custom');h.setup('n','1');h.click('start-session');const before=new Set(Object.keys(h.store()).filter(x=>h.store()[x].dueAt));
h.click('choose',{index:'0'});h.click('rate',{grade:'again'});
const dated=Object.entries(h.store()).find(([id,p])=>p.dueAt>h.now());assert(dated,'time grade creates a stored dueAt');assert.equal(dated[1].dueAt,h.now()+60000);
h.click('finish-session');h.advance(61000);h.click('setup');h.setup('selection','due');h.setup('count','all');h.click('start-session');h.includes('1 di 1');
// open question must not be marked as wrong before self-grading
const opened=original.questions.find(q=>q.type==='open_answer');const ho=harness({...original,questions:[opened]});
ho.click('course',{id:opened.subject});ho.click('setup');ho.setup('count','all');ho.click('start-session');ho.click('reveal-open');ho.includes('Risposta riportata nel mazzo');ho.includes('rating-wrap');ho.notIncludes('wrong-feedback');ho.click('rate',{grade:'good'});ho.includes('Ripasso in coda alla sessione.');
console.log('PASS: label, settings drawer, on/off review bar, per-question difficulty, spacing-by-count and answer isolation, mock secrecy, dueAt persistence and due filter, open card self-grading');
