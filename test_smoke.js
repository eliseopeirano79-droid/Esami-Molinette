const fs=require('fs'),vm=require('vm'),assert=require('assert');
const handlers={};const app={innerHTML:'',textContent:''};
const document={
 getElementById:(id)=>app,
 querySelector:(sel)=>{if(sel==='#app')return app;if(sel==='#timer')return null;return null},
 addEventListener:(k,cb)=>{handlers[k]=cb},
 body:{insertAdjacentHTML:()=>{}}
};
const localStorage={getItem:()=>null,setItem:()=>{}};
const window={scrollTo:()=>{}};
const ctx={window,document,localStorage,console,setInterval,clearInterval,setTimeout,clearTimeout,Date,Math,JSON};vm.createContext(ctx);
vm.runInContext(fs.readFileSync(__dirname+'/data/bank.js','utf8'),ctx);
vm.runInContext(fs.readFileSync(__dirname+'/app.js','utf8'),ctx);
function click(action,data={}){handlers.click({target:{closest:(selector)=>({dataset:{action,...data}})}})}
function change(field,value){handlers.change({target:{dataset:{setup:field},value}})}
function includes(x){assert(app.innerHTML.includes(x),`Missing '${x}' in view: ${app.innerHTML.slice(0,200)}`)}
includes('Che esame prepariamo?');assert.strictEqual((app.innerHTML.match(/class="year-tab/g)||[]).length,6);
click('home-year',{id:'2'});includes('Anatomia Umana');includes('Fisiologia');
click('course',{id:'fisiologia'});includes('Fisiologia I');includes('Fisiologia II');
click('library');includes('Metodologia Clinica');includes('Malattie dell’Apparato Locomotore');
click('year',{id:'4'});click('course',{id:'addome'});includes('Nefrologia');includes('Urologia');
click('course',{id:'nefro'});includes('397');includes('Argomenti');
click('study');includes('Domande e spiegazioni');assert.strictEqual((app.innerHTML.match(/class="question-card"/g)||[]).length,12);
click('setup');includes('Come vuoi allenarti?');includes('Esame ufficiale UniTo');
change('count','custom');change('n','1');click('start-session');includes('1 di 1');
if(app.innerHTML.includes('data-action="choose"')){
 click('choose',{index:'0'}); if(app.innerHTML.includes('data-action="submit-multiple"'))click('submit-multiple'); assert(app.innerHTML.includes('correct-feedback'),'Expected immediate result');
 click('finish-session');includes('Ecco come è andata');
}
click('setup');click('mode',{mode:'mock'});change('count','custom');change('n','1');change('minutes','0');click('start-session');includes('SIMULAZIONE');
click('choose',{index:'0'});assert(!app.innerHTML.includes('correctionimmediateplaceholder'));assert(!app.innerHTML.includes('correct-feedback'));
click('submit-exam');includes('Rivedi ogni domanda');
console.log('PASS: catalog, 6 years, modules, reading, 1-card practice, result, mock with final-only review');
