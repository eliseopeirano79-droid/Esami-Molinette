/* Esami Molinette: progetto studentesco. Nessun accesso a servizi esterni, nessuna API key.
 * Le risposte sono conservate come nel mazzo Anki e NON sono state verificate globalmente.
 */
(() => {
'use strict';
const ICON_PATHS={
 plus:'<path d="M12 4v16M4 12h16"/>',
 settings:'<path d="M12 2.5 14 4l2.5-.4.9 2.4 2.4.9-.4 2.5L21 12l-1.6 2.6.4 2.5-2.4.9-.9 2.4L14 20l-2 1.5L10 20l-2.5.4-.9-2.4-2.4-.9.4-2.5L3 12l1.6-2.6-.4-2.5 2.4-.9.9-2.4L10 4z"/><circle cx="12" cy="12" r="3.1"/>',
 close:'<path d="M18 6 6 18M6 6l12 12"/>',
 chevron:'<path d="m9 18 6-6-6-6"/>',
 book:'<path d="M12 7c-2.4-1.6-5.4-2-9-1.4v13c3.4-.7 6.5-.4 9 1.3 2.5-1.7 5.6-2 9-1.3v-13c-3.6-.6-6.6-.2-9 1.4Z"/><path d="M12 7v13"/>',
 activity:'<path d="M2 12h4l3-7 5 14 3-7h5"/>',
 heart:'<path d="M20.8 5.6a5.5 5.5 0 0 0-7.7 0L12 6.7l-1.1-1.1a5.5 5.5 0 0 0-7.7 7.7L12 22l8.8-8.7a5.5 5.5 0 0 0 0-7.7Z"/>',
 clipboard:'<rect x="5" y="4" width="14" height="18" rx="2"/><path d="M9 4.5V3h6v1.5M9 11h6M9 15h6"/>',
 stethoscope:'<path d="M6 3v6a4 4 0 0 0 8 0V3M4 3h4M12 3h4M10 13v3a5 5 0 0 0 10 0v-1"/><circle cx="20" cy="12" r="2"/>',
 pill:'<path d="M10.2 20.2a6 6 0 0 1-8.4-8.4l10-10a6 6 0 0 1 8.4 8.4Z"/><path d="m8 8 8 8"/>',
 scissors:'<circle cx="6" cy="6" r="3"/><circle cx="6" cy="18" r="3"/><path d="m8.2 8.2 12.8 12.8M14 10l7-7M8.2 15.8 12 12"/>',
 bone:'<path d="M16.1 3.2a3.5 3.5 0 0 1 4.7 4.7 3.5 3.5 0 0 1-.8 3.2l-8.9 8.9a3.5 3.5 0 0 1-3.2.8 3.5 3.5 0 1 1-4.7-4.7 3.5 3.5 0 0 1 .8-3.2l8.9-8.9a3.5 3.5 0 0 1 3.2-.8Z"/>',
 layers:'<path d="m12 2 9 5-9 5-9-5 9-5ZM3 12l9 5 9-5M3 17l9 5 9-5"/>',
 droplet:'<path d="M12 2C9 6 5 10.5 5 15a7 7 0 0 0 14 0c0-4.5-4-9-7-13Z"/>',
 check:'<path d="m4 12 5 5L20 6"/>',
 bookmark:'<path d="M6 3h12v18l-6-4-6 4V3Z"/>',
 'bookmark-check':'<path d="M6 3h12v18l-6-4-6 4V3Z"/><path d="m9 9 2 2 4-4"/>',
 search:'<circle cx="10.8" cy="10.8" r="7"/><path d="m16 16 5 5"/>',
 list:'<path d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01"/>',
 clock:'<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
 lock:'<rect x="5" y="10" width="14" height="11" rx="2"/><path d="M8 10V7a4 4 0 0 1 8 0v3"/>',
 'rotate-ccw':'<path d="M3 11a9 9 0 1 1 2.6 6.4M3 4v7h7"/>',
 help:'<circle cx="12" cy="12" r="9"/><path d="M9.5 9a2.7 2.7 0 1 1 4.3 2.2c-1.1.8-1.8 1.2-1.8 2.8M12 17.5h.01"/>',
 sliders:'<path d="M4 7h16M4 17h16"/><circle cx="9" cy="7" r="2" fill="currentColor" stroke="none"/><circle cx="16" cy="17" r="2" fill="currentColor" stroke="none"/>',
};
function icon(name,cls=''){const safe=ICON_PATHS[name]||ICON_PATHS.layers;return `<svg class="ui-icon ${cls}" viewBox="0 0 24 24" width="21" height="21" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${safe}</svg>`}
const BANK=window.ESAMI_MOLINETTE_BANK;
const app=document.getElementById('app');
if(!BANK || !BANK.questions){app.textContent='Impossibile caricare la banca domande.';return;}
const YEARS=[{id:1,label:'I anno',blurb:'Percorso in preparazione',courses:[]},{id:2,label:'II anno',blurb:'Anatomia · Fisiologia',courses:['anatomia','fisiologia']},{id:3,label:'III anno',blurb:'Clinica · Farmacologia',courses:['metodologia','farmacologia','maxillo','locomotore']},{id:4,label:'IV anno',blurb:'Addome · Nefro · Uro',courses:['addome']},{id:5,label:'V anno',blurb:'Percorso in preparazione',courses:[]},{id:6,label:'VI anno',blurb:'Percorso in preparazione',courses:[]}];
const CATALOG={
 anatomia:{id:'anatomia',year:2,name:'Anatomia Umana',icon:'layers',summary:'Atlante, anatomia topografica e quiz. Programma e prove in attesa di caricamento.',status:'empty'},
 fisiologia:{id:'fisiologia',year:2,name:'Fisiologia',icon:'activity',summary:'Due percorsi distinti per organizzare teoria, domande e prove.',children:['fisiologia1','fisiologia2'],status:'empty'},
 fisiologia1:{id:'fisiologia1',year:2,parent:'fisiologia',name:'Fisiologia I',icon:'activity',summary:'Percorso da popolare con materiali d’esame.',status:'empty'},
 fisiologia2:{id:'fisiologia2',year:2,parent:'fisiologia',name:'Fisiologia II',icon:'heart',summary:'Percorso da popolare con materiali d’esame.',status:'empty'},
 metodologia:{id:'metodologia',year:3,name:'Metodologia Clinica',icon:'clipboard',summary:'Semeiotica clinico-medica e clinico-chirurgica, separate.',children:['semeiotica-medica','semeiotica-chirurgica'],status:'empty'},
 'semeiotica-medica':{id:'semeiotica-medica',year:3,parent:'metodologia',name:'Semeiotica Clinico-Medica',icon:'stethoscope',summary:'Segni, sintomi e ragionamento clinico.',status:'empty'},
 'semeiotica-chirurgica':{id:'semeiotica-chirurgica',year:3,parent:'metodologia',name:'Semeiotica Clinico-Chirurgica',icon:'clipboard',summary:'Valutazione clinica orientata alla chirurgia.',status:'empty'},
 farmacologia:{id:'farmacologia',year:3,name:'Farmacologia I',icon:'pill',summary:'Farmacodinamica, farmacocinetica e prove d’esame.',status:'empty'},
 maxillo:{id:'maxillo',year:3,name:'Chirurgia Maxillofacciale',icon:'scissors',summary:'Chirurgia del distretto craniofacciale.',status:'empty'},
 locomotore:{id:'locomotore',year:3,name:'Malattie dell’Apparato Locomotore',icon:'bone',summary:'Patologie osteoarticolari e riabilitative.',status:'empty'},
 addome:{id:'addome',year:4,name:'Addome',icon:'layers',summary:'Contenitore dell’esame di Addome: per ora disponibili soltanto Nefrologia e Urologia.',children:['nefro','uro'],status:'partial',subject:'all'},
 nefro:{id:'nefro',year:4,parent:'addome',name:'Nefrologia',icon:'activity',summary:'Rene, filtrazione, glomerulonefriti, insufficienza renale, dialisi e trapianto.',status:'ready',subject:'nefro'},
 uro:{id:'uro',year:4,parent:'addome',name:'Urologia',icon:'droplet',summary:'Vie urinarie, prostata, calcolosi, tumori urologici, andrologia.',status:'ready',subject:'uro'}
};
const MAP=new Map(BANK.questions.map(q=>[q.id,q]));
const $=sel=>document.querySelector(sel);
const escap=s=>String(s??'').replace(/\p{Extended_Pictographic}\uFE0F?/gu,'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const abbreviate=(s,n=60)=>s?.length>n?s.substring(0,n-1)+'…':s||'';
const plural=(n,sing,plur)=>n===1?sing:plur;
const pad=n=>String(n).padStart(2,'0');
function getStore(){try{return JSON.parse(localStorage.getItem('esami-molinette-v2-progress')||localStorage.getItem('meduni-v2-progress')||'{}')}catch{return {}}}
let progress=getStore();
function saveProgress(){try{localStorage.setItem('esami-molinette-v2-progress',JSON.stringify(progress))}catch{}}
const SETTINGS_KEY='esami-molinette-preferences-v1';
const HOME_YEAR_KEY='esami-molinette-home-year';
function savedYear(){try{const y=Number(localStorage.getItem(HOME_YEAR_KEY));return y>=1&&y<=6?y:4}catch{return 4}}
const DEFAULT_SETTINGS={
 showReviewBar:true,repeatMode:'questions',autoAdvanceOnGrade:false,
 showExplanations:true,showOptionReasons:true,showDifficulty:false,
 showProgress:true,showTimer:true,keyboardShortcuts:true,showFavorites:true,showSkipButton:true,
 questionSpacing:{again:1,hard:4,good:10,easy:20},
 timeSpacing:{again:{n:1,unit:'minutes'},hard:{n:10,unit:'minutes'},good:{n:1,unit:'days'},easy:{n:4,unit:'days'}}
};
const GRADES=[
 {key:'again',label:'Da rifare',hint:'Non ricordavo'},
 {key:'hard',label:'Difficile',hint:'Con fatica'},
 {key:'good',label:'Bene',hint:'Ricordata'},
 {key:'easy',label:'Facile',hint:'Senza sforzo'}
];
function readSettings(){try{let p=JSON.parse(localStorage.getItem(SETTINGS_KEY)||'{}');return {...structuredDefaultSettings(),...p,questionSpacing:{...DEFAULT_SETTINGS.questionSpacing,...p.questionSpacing},timeSpacing:Object.fromEntries(GRADES.map(g=>[g.key,{...DEFAULT_SETTINGS.timeSpacing[g.key],...(p.timeSpacing?.[g.key]||{})}]))}}catch{return structuredDefaultSettings()}}
function structuredDefaultSettings(){return JSON.parse(JSON.stringify(DEFAULT_SETTINGS))}
let preferences=readSettings();
function saveSettings(){try{localStorage.setItem(SETTINGS_KEY,JSON.stringify(preferences))}catch{}}
function clampInt(val,min,max){return Math.max(min,Math.min(max,Math.round(Number(val)||min)))}
function millisForGrade(key){const v=preferences.timeSpacing[key]||DEFAULT_SETTINGS.timeSpacing[key];const mult=({minutes:60000,hours:3600000,days:86400000})[v.unit]||60000;return clampInt(v.n,1,365)*mult}
function gradeDelayLabel(key){if(preferences.repeatMode==='questions'){const n=clampInt(preferences.questionSpacing[key],1,100);return `tra ${n} ${n===1?'domanda':'domande'}`;}const x=preferences.timeSpacing[key],u=({minutes:'min',hours:'h',days:'g'})[x.unit]||'min';return `tra ${x.n} ${u}`}
function dueCountForSubject(sub){return subjectsFor(sub).filter(q=>progress[q.id]?.dueAt && progress[q.id].dueAt<=Date.now()).length}
function renderSwitch(key,title,description){return `<label class="pref-row"><span><strong>${title}</strong><small>${description}</small></span><input type="checkbox" data-pref="${key}" ${preferences[key]?'checked':''} aria-label="${title}"></label>`}
const settingPanels={timing:false,advanced:false,backup:false};
function settingsMarkup(){const time=preferences.repeatMode==='time';return `<div class="settings-shade"><section class="settings-panel" role="dialog" aria-modal="true" aria-labelledby="settings-title"><div class="settings-head"><div><span class="eyebrow">ESAMI MOLINETTE</span><h2 id="settings-title">Impostazioni</h2><p>Personalizza il ripasso e scegli cosa mostrare. Le modifiche si salvano qui.</p></div><button class="settings-close" aria-label="Chiudi impostazioni" data-action="close-settings">${icon('close')}</button></div>
 <div class="settings-scroll"><h3>Ripasso</h3>${renderSwitch('showReviewBar','Valuta dopo la risposta','Se disattivato, leggi la spiegazione e prosegui senza ripetizioni.')}
 ${preferences.showReviewBar?`<div class="pref-group"><span class="control-label">Ripeti le domande</span><div class="pref-segments"><label><input type="radio" name="repeatMode" data-pref="repeatMode" value="questions" ${!time?'checked':''}> Dopo N domande</label><label><input type="radio" name="repeatMode" data-pref="repeatMode" value="time" ${time?'checked':''}> Dopo N minuti/ore</label></div><details class="pref-detail" data-setting-detail="timing" ${settingPanels.timing?'open':''}><summary>Personalizza gli intervalli <span class="detail-toggle">${icon('chevron')}</span></summary><div class="spacing-grid">${GRADES.map(g=>`<div class="spacing-row"><span><b>${g.label}</b></span><div class="spacing-input"><input type="number" min="1" max="${time?365:100}" aria-label="Intervallo ${g.label}" data-spacing="${g.key}" value="${time?preferences.timeSpacing[g.key].n:preferences.questionSpacing[g.key]}">${time?`<select data-unit="${g.key}" aria-label="Unità intervallo ${g.label}">${[['minutes','minuti'],['hours','ore'],['days','giorni']].map(([v,l])=>`<option value="${v}" ${preferences.timeSpacing[g.key].unit===v?'selected':''}>${l}</option>`).join('')}</select>`:`<span class="muted small">domande</span>`}</div></div>`).join('')}<p class="small muted">Al massimo 3 ripetizioni per domanda nella stessa sessione. Gli intervalli a tempo restano salvati anche dopo la chiusura.</p></div></details></div>`:''}
 ${preferences.showReviewBar?renderSwitch('autoAdvanceOnGrade','Avanza dopo la valutazione','Passa direttamente alla domanda successiva.'):''}
 <h3>Durante lo studio</h3>${renderSwitch('showExplanations','Spiegazioni e teoria','Apri gli approfondimenti dopo la risposta.')}
 ${renderSwitch('showOptionReasons','Perché le alternative sono sbagliate','Disponibile solo nelle domande già spiegate.')}
 ${renderSwitch('showDifficulty','Difficoltà personale','Permette di segnare una domanda come facile, media o difficile.')}
 <details class="pref-detail pref-detail-advanced" data-setting-detail="advanced" ${settingPanels.advanced?'open':''}><summary>Altre opzioni di visualizzazione <span class="detail-toggle">${icon('chevron')}</span></summary><div class="advanced-options">
 ${renderSwitch('showProgress','Progresso','Contatore e barra di avanzamento.')}
 ${renderSwitch('showFavorites','Preferiti','Salva domande da ritrovare in seguito.')}
 ${renderSwitch('showSkipButton','Salta una domanda','Spostala alla fine della sessione.')}
 ${renderSwitch('showTimer','Timer visibile','Nasconderlo non interrompe il conteggio.')}
 ${renderSwitch('keyboardShortcuts','Scorciatoie da tastiera','Tasti numerici per rispondere e valutare.')}
 </div></details>
 <details class="pref-detail pref-detail-backup" data-setting-detail="backup" ${settingPanels.backup?'open':''}><summary>Salva o trasferisci i tuoi progressi <span class="detail-toggle">${icon('chevron')}</span></summary><div class="backup-options"><p class="small muted">Esporta un file con preferiti, risposte, difficoltà e impostazioni. Puoi importarlo in un'altra versione dell'app.</p><div class="inline-actions"><button class="outline small-btn" data-action="export-backup">Esporta backup</button><button class="outline small-btn" data-action="import-backup">Importa backup</button></div><input id="backup-file" type="file" accept="application/json,.json" class="visually-hidden" aria-label="File di backup Esami Molinette"></div></details>
 <div class="settings-footer"><button class="outline" data-action="reset-settings">Ripristina</button><button class="secondary" data-action="close-settings">Chiudi impostazioni</button></div></div></section></div>`}
function snapshotSettingsPanel(){const old=document.querySelector('.settings-shade');if(!old)return {scrollTop:0,focus:null};for(const name of ['timing','advanced','backup']){const el=old.querySelector?.(`[data-setting-detail="${name}"]`);if(el)settingPanels[name]=el.open}const focused=old.contains?.(document.activeElement)?document.activeElement:null;return {scrollTop:old.querySelector?.('.settings-scroll')?.scrollTop||0,focus:focused?{field:focused.dataset.pref,spacing:focused.dataset.spacing,unit:focused.dataset.unit}:null}}
function openSettings(){const old=snapshotSettingsPanel();document.querySelector('.settings-shade')?.remove();document.body.insertAdjacentHTML('beforeend',settingsMarkup());document.body.classList?.add?.('settings-active');const panel=document.querySelector('.settings-shade');const sc=panel?.querySelector?.('.settings-scroll');if(sc)sc.scrollTop=old.scrollTop;if(old.focus){const k=Object.entries(old.focus).find(([_,v])=>v);if(k){const control=panel?.querySelector?.(`[data-${k[0]}="${k[1]}"]`);control?.focus?.({preventScroll:true});if(sc)sc.scrollTop=old.scrollTop}}else{panel?.querySelector?.('.settings-close')?.focus?.({preventScroll:true})}}
function closeSettings(){document.querySelector('.settings-shade')?.remove();document.body.classList?.remove?.('settings-active');const scroll=window.scrollY||0;render();window.scrollTo(0,scroll)}
function exportBackup(){
 const data={format:'esami-molinette-backup-v1',createdAt:new Date().toISOString(),year:state.year,progress,preferences};
 const blob=new Blob([JSON.stringify(data,null,2)],{type:'application/json;charset=utf-8'});
 const url=URL.createObjectURL(blob),a=document.createElement('a');a.href=url;a.download='Esami_Molinette_Backup_'+new Date().toISOString().slice(0,10)+'.json';a.style.display='none';document.body.appendChild(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),5000);
}
async function importBackup(file){
 if(!file)return;try{
  if(file.size>5_000_000)throw Error('File troppo grande.');
  const d=JSON.parse(await file.text());
  if(d?.format!=='esami-molinette-backup-v1'||!d.progress||typeof d.progress!=='object'||Array.isArray(d.progress))throw Error('Formato non riconosciuto.');
  const next={};let count=0;
  for(const [id,item] of Object.entries(d.progress)){
   if(!MAP.has(id)||!item||typeof item!=='object'||Array.isArray(item))continue;
   const attempts=clampInt(item.attempts||0,0,100000),correct=clampInt(item.correct||0,0,attempts);
   const r={attempts,correct,fav:item.fav===true};
   if(['easy','medium','hard'].includes(item.difficulty))r.difficulty=item.difficulty;
   if(['again','hard','good','easy'].includes(item.lastGrade))r.lastGrade=item.lastGrade;
   if(Number.isFinite(item.last)&&item.last>=0)r.last=item.last;
   if(Number.isFinite(item.dueAt)&&item.dueAt>=0)r.dueAt=item.dueAt;
   next[id]=r;count++;
  }
  const set=structuredDefaultSettings(),raw=d.preferences;
  if(raw&&typeof raw==='object'&&!Array.isArray(raw)){
   for(const k of ['showReviewBar','autoAdvanceOnGrade','showExplanations','showOptionReasons','showDifficulty','showProgress','showTimer','keyboardShortcuts','showFavorites','showSkipButton'])if(typeof raw[k]==='boolean')set[k]=raw[k];
   if(['questions','time'].includes(raw.repeatMode))set.repeatMode=raw.repeatMode;
   for(const grade of GRADES){const k=grade.key;if(raw.questionSpacing?.[k]!==undefined)set.questionSpacing[k]=clampInt(raw.questionSpacing[k],1,100);
    if(raw.timeSpacing?.[k]){set.timeSpacing[k].n=clampInt(raw.timeSpacing[k].n,1,365);if(['minutes','hours','days'].includes(raw.timeSpacing[k].unit))set.timeSpacing[k].unit=raw.timeSpacing[k].unit;}}
  }
  progress=next;preferences=set;saveProgress();saveSettings();if(+d.year>=1&&+d.year<=6){state.year=+d.year;try{localStorage.setItem(HOME_YEAR_KEY,String(state.year))}catch{}}
  closeSettings();showModal('Backup importato',`${count} domande con progressi recuperati. Le statistiche sul dispositivo sono state sostituite con quelle del file.`);
 }catch(err){showModal('Backup non importato',err?.message||'Il file non è valido. I tuoi progressi attuali sono rimasti invariati.');}
}
function cancelQueuedRepetitions(){const s=state.session;if(!s||s.mode==='mock')return;
 const firstSeen=new Set(),keptIds=[],keptResponses={};let nextCursor=0;
 s.ids.forEach((id,i)=>{const isRepeat=firstSeen.has(id);firstSeen.add(id);
  if(isRepeat&&i>s.cursor)return;
  if(i===s.cursor)nextCursor=keptIds.length;
  if(s.responses[i])keptResponses[keptIds.length]=s.responses[i];
  keptIds.push(id);
 });
 s.ids=keptIds;s.responses=keptResponses;s.cursor=nextCursor;s.pendingTimed=[];
}
function updateSetting(e){const el=e.target,field=el.dataset.pref,spacing=el.dataset.spacing,unit=el.dataset.unit;
 if(field){preferences[field]=el.type==='checkbox'?el.checked:el.value;if(field==='showReviewBar'&&!preferences.showReviewBar)cancelQueuedRepetitions();saveSettings();openSettings();return true}
 if(spacing){if(preferences.repeatMode==='time'){preferences.timeSpacing[spacing].n=clampInt(el.value,1,365)}else preferences.questionSpacing[spacing]=clampInt(el.value,1,100);saveSettings();openSettings();return true}
 if(unit){preferences.timeSpacing[unit].unit=el.value;saveSettings();openSettings();return true}return false}
function difficultyControl(q){if(!preferences.showDifficulty)return '';const level=progress[q.id]?.difficulty||'none';return `<div class="difficulty-control"><span>Come valuti questa domanda?</span><div class="difficulty-buttons">${[['easy','Facile'],['medium','Media'],['hard','Difficile']].map(([v,label])=>`<button data-action="difficulty" data-id="${escap(q.id)}" data-value="${v}" class="difficulty-pill ${level===v?'active':''}" aria-pressed="${level===v}">${label}</button>`).join('')}</div></div>`}
function ratingBar(r){if(!preferences.showReviewBar)return '';return `<div class="rating-wrap"><div class="rating-intro"><strong>Quanto bene la ricordavi?</strong><span>La risposta non è necessariamente verificata.</span></div>${r.grade?`<div class="rating-confirm" role="status">Valutazione: <b>${GRADES.find(g=>g.key===r.grade)?.label||r.grade}</b>. ${escap(r.scheduledLabel||'Salvata.')} ${preferences.autoAdvanceOnGrade?'':'Puoi proseguire.'}</div>`:`<div class="rating-grid">${GRADES.map((g,i)=>`<button data-action="rate" data-grade="${g.key}" class="rating-button grade-${g.key}" title="${g.hint}"><strong>${g.label}</strong><small>${gradeDelayLabel(g.key)}</small>${preferences.keyboardShortcuts?`<kbd>${i+1}</kbd>`:''}</button>`).join('')}</div>`}</div>`}
function rateQuestion(key){const s=state.session,q=currentQ();if(!s||s.mode==='mock'||!preferences.showReviewBar||!GRADES.some(g=>g.key===key))return;
 const r=s.responses[s.cursor];if(!r?.revealed||r.grade)return;
 if(q.type==='open_answer'){r.correct=(key!=='again');r.selfGraded=true;addProgress(q.id,r.correct)}
 r.grade=key;const p=progress[q.id]||{attempts:0,correct:0,fav:false};p.lastGrade=key;
 if(preferences.repeatMode==='questions'){
  const repeats=s.repeatCounts[q.id]||0;
  if(repeats<3){const n=clampInt(preferences.questionSpacing[key],1,100);let insertAt=Math.min(s.cursor+1+n,s.ids.length);s.ids.splice(insertAt,0,q.id);s.repeatCounts[q.id]=repeats+1;r.scheduledLabel=insertAt===s.ids.length-1&&n>(insertAt-s.cursor-1)?'Ripasso in coda alla sessione.':`Ripasso dopo ${n} ${n===1?'domanda':'domande'}.`}
  else r.scheduledLabel='Tre ripassi extra già effettuati: nessun altro inserimento in questa sessione.';
  delete p.dueAt;
 }else{
  p.dueAt=Date.now()+millisForGrade(key);
  if((s.repeatCounts[q.id]||0)<3){s.pendingTimed=s.pendingTimed.filter(x=>x.id!==q.id);s.pendingTimed.push({id:q.id,dueAt:p.dueAt})}
  r.scheduledLabel=`Ripasso programmato ${gradeDelayLabel(key)} (anche in una nuova sessione).`;
 }
 progress[q.id]=p;saveProgress();
 if(preferences.autoAdvanceOnGrade){nextQuestion()}else render()
}
function collectTimeDue(){const s=state.session;if(!s||s.mode==='mock'||!s.pendingTimed?.length)return;
 const now=Date.now(),due=s.pendingTimed.filter(x=>x.dueAt<=now);s.pendingTimed=s.pendingTimed.filter(x=>x.dueAt>now);
 for(const d of due){if((s.repeatCounts[d.id]||0)>=3)continue;
  if(!s.ids.slice(s.cursor+1).includes(d.id)){s.ids.splice(s.cursor+1,0,d.id);s.repeatCounts[d.id]=(s.repeatCounts[d.id]||0)+1}
 }
}

function addProgress(id,correct){const p=progress[id]||{attempts:0,correct:0,fav:false};p.attempts++;if(correct)p.correct++;p.last=Date.now();progress[id]=p;saveProgress()}
let state={page:'home',year:savedYear(),course:'addome',subject:'addome',filters:{topic:'all',appello:'all',search:'',fav:false},readPage:0,showWhy:true,mode:'practice',setup:{count:'20',hours:0,minutes:20,seconds:0,topic:'all',appello:'all',n:'20',selection:'all'},session:null,results:null,expanded:new Set(),modal:null};
let clockHandle=null;
function subjectsFor(sub){return BANK.questions.filter(q=>sub==='all' || sub==='addome' || q.subject===sub)}
function activeQuestions(){const c=CATALOG[state.subject];return c?.subject?subjectsFor(c.subject):[]}
function subjectLabel(){return CATALOG[state.subject]?.name||'Materia'}
function counters(list){const n=list.filter(q=>q.type==='multiple_choice').length;const full=list.filter(q=>q.explanation?.status==='didactic_draft').length;return {all:list.length,mc:n,full};}
function topicRecord(q){return BANK.topics[`${q.subject}::${q.topic}`]||null}
function topicNames(list){let ctr=new Map();list.forEach(q=>ctr.set(q.topic,(ctr.get(q.topic)||0)+1));return [...ctr].sort((a,b)=>b[1]-a[1]);}
function appelliNames(list){let ctr=new Map();list.forEach(q=>(q.appelli||[]).forEach(a=>ctr.set(a,(ctr.get(a)||0)+1)));return [...ctr].sort((a,b)=>b[1]-a[1]);}
function appelloLabel(tag){return String(tag||'').split('::').slice(2).join(' · ').replace(/_/g,' ').replace(/\b\w/g,x=>x.toUpperCase())||tag}
function breadcrumbs(arr){return `<nav aria-label="Percorso" class="breadcrumbs"><button data-action="home">Home</button>${arr.map(x=>`<span>›</span>${x.action?`<button data-action="${escap(x.action)}" ${x.id?`data-id="${escap(x.id)}"`:''}>${escap(x.name)}</button>`:`<span>${escap(x.name)}</span>`}`).join('')}</nav>`}
function container(html){app.innerHTML=`<div class="container">${html}</div>`}
function setPage(page,opts={}){Object.assign(state,opts,{page});if(page!=='player' && state.session && !['results','play'].includes(page)){/* session timer stays only during player */}render();window.scrollTo(0,0)}
function courseCount(id){const c=CATALOG[id];return c?.subject?subjectsFor(c.subject).length:0}
function goYear(id){state.year=+id;try{localStorage.setItem(HOME_YEAR_KEY,String(state.year))}catch{}setPage('year')}
function goCourse(id){state.course=id;state.subject=id;state.filters={topic:'all',appello:'all',search:'',fav:false};state.readPage=0;setPage(CATALOG[id]?.children?'course':'subject')}
function goSubject(id){state.subject=id;state.course=CATALOG[id]?.parent||id;state.filters={topic:'all',appello:'all',search:'',fav:false};state.readPage=0;setPage('subject')}
function btn(text,action,cls='outline',extra=''){return `<button type="button" class="${cls}" data-action="${action}" ${extra}>${text}</button>`}
function statusChip(c){return c.status==='ready'?'<span class="chip">Domande disponibili</span>':c.status==='partial'?'<span class="chip warn">Materiali parziali</span>':'<span class="chip gray">Da popolare</span>'}
function homeCourseCard(id){
 const c=CATALOG[id];
 const n=c.children?c.children.reduce((t,sub)=>t+courseCount(sub),0):courseCount(id);
 return `<button class="native-row" data-action="course" data-id="${escap(id)}" type="button"><span class="native-row-icon" aria-hidden="true">${icon(c.icon)}</span><span class="native-row-main"><strong>${escap(c.name)}</strong><small>${c.children?c.children.map(x=>CATALOG[x].name).join(' · '):n?`${n} domande disponibili`:escap(c.summary)}</small></span><span class="native-row-end">${n?`<span class="count-pill">${n}</span>`:''}<span aria-hidden="true" class="chevron">›</span></span></button>`;
}
function yearPicker(){return `<div class="year-selector" role="group" aria-label="Seleziona anno di corso">${YEARS.map(y=>`<button type="button" data-action="home-year" data-id="${y.id}" aria-pressed="${state.year===y.id}" class="year-tab ${state.year===y.id?'active':''}"><strong>${['','I','II','III','IV','V','VI'][y.id]}</strong><span>anno</span></button>`).join('')}</div>`}
function showHome(){
 const y=YEARS.find(y=>y.id===state.year)||YEARS[3];
 container(`<div class="home-head"><span class="eyebrow">MEDICINA E CHIRURGIA · UNITO</span><h1>Che esame prepariamo?</h1><p>Scegli l'anno, poi la materia.</p></div>
 <section class="native-section"><div class="section-heading"><h2>Anno di corso</h2></div>${yearPicker()}</section>
 <section class="native-section"><div class="section-heading"><h2>${escap(y.label)}</h2><span class="muted small">${y.courses.length} ${plural(y.courses.length,'materia','materie')}</span></div><div class="native-list">${y.courses.length?y.courses.map(homeCourseCard).join(''):`<div class="native-empty"><strong>Nessuna materia caricata</strong><p>Questo anno è pronto per ricevere nuove materie.</p></div>`}</div></section>
 ${state.year===4?`<p class="native-note"><span class="tiny-dot"></span> Addome contiene al momento solo Nefrologia e Urologia. Il resto arriverà progressivamente.</p>`:''}
 <div class="footer-quick"><button data-action="library">Vedi tutti gli insegnamenti <span aria-hidden="true">›</span></button></div>`)
}
function showYear(){
 const y=YEARS.find(y=>y.id===state.year)||YEARS[3];
 container(`${breadcrumbs([{name:y.label}])}<div class="page-lead"><h1>${escap(y.label)}</h1><p>Scegli una materia.</p></div><div class="native-section"><div class="native-list">${y.courses.length?y.courses.map(homeCourseCard).join(''):`<div class="native-empty">Nessuna materia caricata per questo anno.</div>`}</div></div><div class="back-link">${btn('← Cambia anno','home','outline')}</div>`)
}
function courseCard(c){const n=c.children?c.children.reduce((x,id)=>x+courseCount(id),0):courseCount(c.id);return `<button type="button" data-action="${c.children?'course':'subject'}" data-id="${escap(c.id)}" class="native-row"><span class="native-row-icon" aria-hidden="true">${icon(c.icon)}</span><span class="native-row-main"><strong>${escap(c.name)}</strong><small>${n?`${n} domande`: 'Materiali da aggiungere'}</small></span><span class="native-row-end">${n?`<span class="count-pill">${n}</span>`:''}<span class="chevron">›</span></span></button>`}
function showCourse(){
 const c=CATALOG[state.course];if(!c)return showHome();const y=YEARS.find(y=>y.id===c.year);
 container(`${breadcrumbs([{name:y.label,action:'year',id:y.id},{name:c.name}])}<div class="page-lead"><span class="eyebrow">${escap(y.label)} · INSEGNAMENTO</span><h1>${escap(c.name)}</h1><p>${escap(c.summary)}</p></div><section class="native-section"><div class="section-heading"><h2>Moduli</h2><span class="muted small">${c.children.length} disponibili</span></div><div class="native-list">${c.children.map(id=>courseCard(CATALOG[id])).join('')}</div></section>${c.id==='addome'?`<section class="native-section"><div class="section-heading"><h2>Studia tutto Addome disponibile</h2></div><div class="simple-panel"><p>Per ora comprende solo Nefrologia e Urologia, non tutto l'esame di Addome.</p><div class="inline-actions">${btn('Leggi le domande','study-addome','secondary')}${btn('Simulazione','setup-addome','outline')}</div></div></section>`:''}`)
}
function progressPercent(ids){const seen=ids.filter(q=>progress[q.id]?.attempts).length;return ids.length?Math.round(100*seen/ids.length):0}
function showSubject(){
 const c=CATALOG[state.subject];if(!c)return showHome();const y=YEARS.find(y=>y.id===c.year);
 const prev=c.parent?CATALOG[c.parent]:null;const crumbs=[{name:y.label,action:'year',id:y.id}];if(prev)crumbs.push({name:prev.name,action:'course',id:prev.id});crumbs.push({name:c.name});
 const data=activeQuestions(),counts=counters(data),topics=topicNames(data),apps=appelliNames(data),percent=progressPercent(data);const due=dueCountForSubject(c.subject);
 container(`${breadcrumbs(crumbs)}<header class="page-lead"><span class="eyebrow">${escap(y.label)} · MATERIA</span><h1>${escap(c.name)}</h1><p>${escap(c.summary)}</p></header>
 <div class="subject-quick-stats"><span><strong>${counts.all}</strong> domande</span><span><strong>${topics.length}</strong> argomenti</span><span><strong>${percent}%</strong> studiate</span></div>
 <section class="native-section"><div class="section-heading"><h2>Cosa vuoi fare?</h2></div>
 ${counts.all?`<div class="study-actions"><button data-action="study" type="button" class="study-action featured"><span class="study-action-icon">${icon("book")}</span><strong>Studia</strong><small>Tutte le domande con risposte e teoria</small><span class="study-action-arrow">›</span></button>
 <button data-action="setup" type="button" class="study-action"><span class="study-action-icon">${icon("clipboard")}</span><strong>Allenati</strong><small>Quiz, ripassi e timer personalizzabili</small><span class="study-action-arrow">›</span></button>
 <button data-action="setup-mock" type="button" class="study-action"><span class="study-action-icon">${icon("clock")}</span><strong>Simula</strong><small>Soluzioni e spiegazioni solo alla fine</small><span class="study-action-arrow">›</span></button></div>`:`<div class="native-empty">Le domande di questa materia non sono ancora disponibili.</div>`}
 </section>
 ${due?`<div class="quick-review"><span>${icon('rotate-ccw')} <b>${due} ${plural(due,'domanda pronta','domande pronte')} per il ripasso</b></span><button class="outline small-btn" data-action="setup-due">Ripassa ora ${icon('chevron')}</button></div>`:''}
 <section class="native-section"><div class="section-heading"><h2>Materiali e programma</h2></div><div class="native-list disclosures">
 <details class="native-detail"><summary><span class="detail-symbol">${icon("list")}</span><span><strong>Argomenti</strong><small>${topics.length} argomenti disponibili</small></span><span class="chevron">›</span></summary><div class="detail-body">${topics.length?topics.map(([t,n])=>`<button class="topic-row compact-row" data-action="topic" data-topic="${escap(t)}"><span>${escap(t)}</span><span>${n} ›</span></button>`).join(''):`<div class="native-empty">Argomenti ancora da aggiungere.</div>`}</div></details>
 <details class="native-detail"><summary><span class="detail-symbol">${icon("clipboard")}</span><span><strong>Prove precedenti</strong><small>${apps.length} appelli etichettati nel mazzo${!apps.length?' · non disponibili':''}</small></span><span class="chevron">›</span></summary><div class="detail-body">${apps.length?apps.slice(0,18).map(([a,n])=>`<button class="topic-row compact-row" data-action="appello" data-id="${escap(a)}"><span>${escap(appelloLabel(a))}</span><span>${n} ›</span></button>`).join(''):'<p>I file delle prove originali non sono stati caricati.</p>'}<p class="small muted">Gli appelli sono etichette del mazzo Anki: non sono copie ufficiali degli scritti.</p></div></details>
 <details class="native-detail"><summary><span class="detail-symbol">${icon("help")}</span><span><strong>Informazioni sull'esame</strong><small>Criteri e materiale didattico</small></span><span class="chevron">›</span></summary><div class="detail-body"><p>La struttura della simulazione ufficiale verrà configurata quando saranno noti numero di domande, durata, punteggi e soglie reali.</p><p>Le spiegazioni puntuali sono complete per ${counts.full} domande; per le altre è disponibile la teoria collegata.</p><p class="small muted">Le risposte del mazzo originale non sono ancora state verificate tutte.</p></div></details>
 </div></section>`)
}
function qsFiltered(){let a=activeQuestions().slice();const f=state.filters;if(f.topic!=='all')a=a.filter(q=>q.topic===f.topic);if(f.appello!=='all')a=a.filter(q=>(q.appelli||[]).includes(f.appello));if(f.fav)a=a.filter(q=>progress[q.id]?.fav);if(f.search.trim()){const r=f.search.toLocaleLowerCase('it').trim();a=a.filter(q=>[q.question,q.topic,q.options.map(o=>o.text).join(' ')].join(' ').toLocaleLowerCase('it').includes(r))}return a}
function openArticle(t){return `<div class="lesson"><p><b>Partiamo dalle basi.</b> ${escap(t.foundation)}</p><p><b>Il meccanismo.</b> ${escap(t.mechanism)}</p><p><b>Come ragionare all’esame.</b> ${escap(t.exam_logic)}</p>${Object.keys(t.glossary||{}).length?`<div class="glossary">${Object.entries(t.glossary).map(([x,y])=>`<span class="term"><b>${escap(x)}</b> = ${escap(y)}</span>`).join('')}</div>`:''}${t.editorial_note?`<div class="notice warning" style="margin-top:12px">${escap(t.editorial_note)}</div>`:''}<div class="explain-foot">Fonte di riferimento: <b>${escap(t.source_file)}</b>, ${t.pages.length>2?`pagine ${t.pages.join(', ')}`:`pagine ${t.pages.join('–')}`}. Testo didattico rielaborato, non trascrizione letterale.</div></div>`}
function getExpHTML(q,expanded=true){if(!expanded)return '';const t=topicRecord(q);const exp=q.explanation;const src=q.source_comments_text;
return `<div class="explain">${exp?`<h4>Perché la risposta è corretta</h4><p>${escap(exp.correct_reason)}</p>${exp.remember?`<div class="notice">${escap(exp.remember)}</div>`:''}<div class="source-tag">Spiegazione originale redatta per il progetto · bozza didattica, da revisionare</div>`:`<h4>Teoria collegata alla domanda</h4><p>La spiegazione specifica per questa domanda e per ogni alternativa <b>non è ancora completa</b>. Nel frattempo trovi sotto i concetti della lezione corrispondente, per capire il contesto senza inventare motivazioni.</p>`}${q.review_flag?`<div class="notice warning" style="margin-top:12px"><b>${escap(q.review_flag.title)}</b>: ${escap(q.review_flag.why)}</div>`:''}${src?`<div class="notice" style="margin-top:12px"><b>Commento presente nel mazzo Anki:</b> ${escap(src.slice(0,1100))}</div>`:''}${t?`<details ${!exp?'open':''}><summary class="inline-link" style="cursor:pointer;margin-top:14px">Teoria da ${escap(t.source_file)} · ${escap(q.topic)}</summary>${openArticle(t)}</details>`:''}</div>`}
function optionRead(q){if(q.type==='open_answer')return `<div class="q-option correct"><span class="opt-index">${icon("book")}</span><span class="opt-content"><strong>Risposta originale:</strong> ${escap(q.answer)}</span></div>`;
return `<div class="q-options">${q.options.map((o,i)=>`<div class="q-option ${o.correct?'correct':''}"><span class="opt-index">${escap(o.id)}</span><span class="opt-content">${escap(o.text)}${o.correct?'<b class="option-source-correct"> · Corretta nel mazzo Anki</b>':''}${preferences.showOptionReasons&&q.explanation?.option_reasons?.[i]?`<span class="opt-why">${escap(q.explanation.option_reasons[i])}</span>`:''}</span></div>`).join('')}</div>`}
function questionReadCard(q,n){return `<article class="question-card"><div class="q-meta"><span>#${n}</span><span class="chip gray">${escap(q.subject_label)}</span><span>${escap(q.topic)}</span>${q.review_flag?'<span class="chip warn">Risposta da verificare</span>':''}${q.explanation?'<span class="chip">Spiegazione completa</span>':''}</div><div class="card-heading"><h4 class="q-title">${escap(q.question)}</h4><button class="tag-btn" title="Preferiti" aria-label="Aggiungi o togli dai preferiti" aria-pressed="${!!progress[q.id]?.fav}" data-action="favorite" data-id="${escap(q.id)}">${icon(progress[q.id]?.fav?"bookmark-check":"bookmark")}</button></div>${optionRead(q)}${preferences.showExplanations?getExpHTML(q):''}${difficultyControl(q)}<div class="explain-foot">ID originale: ${escap(q.id)} · Risposta del mazzo non verificata clinicamente</div></article>`}
function showRead(){
 const c=CATALOG[state.subject],list=qsFiltered(),f=state.filters,subj=activeQuestions();
 const topics=topicNames(subj),apps=appelliNames(subj),pages=Math.max(1,Math.ceil(list.length/12));
 state.readPage=Math.min(state.readPage,pages-1);const slice=list.slice(state.readPage*12,state.readPage*12+12);
 container(`${breadcrumbs([{name:YEARS.find(y=>y.id===c.year)?.label,action:'year',id:c.year},{name:c.name,action:c.children?'course':'subject',id:c.id},{name:'Studio'}])}
 <div class="page-lead compact-lead"><h1>Domande e spiegazioni</h1><p>${escap(c.name)} · ${list.length} ${plural(list.length,'domanda','domande')}</p></div>
 <section class="read-toolbar"><div class="search-wrap"><span aria-hidden="true">${icon("search")}</span><input id="search-filter" aria-label="Cerca nelle domande" data-filter="search" value="${escap(f.search)}" class="form-control search" placeholder="Cerca una domanda…"/></div>
 <button data-action="fav-filter" class="filter-favorite ${f.fav?'active':''}" type="button" title="Mostra solo preferiti">${icon(f.fav?"bookmark-check":"bookmark")}</button>
 ${btn(icon('settings'),'open-settings','outline small-btn icon-button','title="Impostazioni" aria-label="Impostazioni"')}</section>
 <details class="filter-disclosure"><summary>Filtri ${f.topic==='all'&&f.appello==='all'?'':'· attivi'} <span>⌄</span></summary><div class="filter-inner"><div class="setup-grid"><div class="setup-field"><label class="control-label" for="topic-filter">Argomento</label><select id="topic-filter" data-filter="topic" class="form-control"><option value="all">Tutti</option>${topics.map(([x,n])=>`<option value="${escap(x)}" ${f.topic===x?'selected':''}>${escap(x)} (${n})</option>`).join('')}</select></div><div class="setup-field"><label class="control-label" for="appello-filter">Appello</label><select id="appello-filter" data-filter="appello" class="form-control"><option value="all">Tutti</option>${apps.map(([x,n])=>`<option value="${escap(x)}" ${f.appello===x?'selected':''}>${escap(appelloLabel(x))} (${n})</option>`).join('')}</select></div></div>${btn('Azzera filtri','reset-filters','outline small-btn')}</div></details>
 <div class="reading-overview"><span>Pagina ${state.readPage+1} di ${pages}</span>${btn('Allenati','setup','secondary small-btn')}</div>
 ${slice.length?`<div class="list-container">${slice.map((q,i)=>questionReadCard(q,state.readPage*12+i+1)).join('')}</div><div class="pagination">${btn('← Precedente','prev-read','outline',state.readPage===0?'disabled':'')}<span class="small muted">${state.readPage+1} / ${pages}</span>${btn('Successiva →','next-read','outline',state.readPage>=pages-1?'disabled':'')}</div>`:`<div class="native-empty">Nessuna domanda con questi filtri.</div>`}`)
}
function optionSelect(name,value,items){return `<select class="form-control" data-setup="${name}">${items.map(o=>`<option value="${escap(o[0])}" ${String(value)===String(o[0])?'selected':''}>${escap(o[1])}</option>`).join('')}</select>`}
function showSetup(){const c=CATALOG[state.subject];const list=activeQuestions();const topicList=topicNames(list),apps=appelliNames(list);const setup=state.setup;const y=YEARS.find(y=>y.id===c.year);
 container(`${breadcrumbs([{name:y.label,action:'year',id:y.id},{name:c.name,action:'subject',id:c.id},{name:'Allenamento'}])}<div class="practice-shell"><div class="page-lead"><span class="eyebrow">${escap(c.name)} · QUIZ</span><h1>Come vuoi allenarti?</h1><p>Scegli le domande, il tempo e quando vedere le risposte.</p></div><div class="setup-card"><h3>Modalità</h3><div class="mode-options"><button data-action="mode" data-mode="practice" class="mode-option ${state.mode==='practice'?'selected':''}"><strong>${icon("clipboard")} Allenamento</strong><small>Tutte o N domande, correzione immediata.</small></button><button data-action="mode" data-mode="timed" class="mode-option ${state.mode==='timed'?'selected':''}"><strong>${icon("clock")} Allenamento a tempo</strong><small>Scegli il timer come una sveglia, con feedback immediato.</small></button><button data-action="mode" data-mode="mock" class="mode-option ${state.mode==='mock'?'selected':''}"><strong>${icon("list")} Simulazione libera</strong><small>Rispondi senza suggerimenti e consulta tutto alla fine.</small></button></div><p class="official-note">${icon('lock')} Esame ufficiale UniTo: disponibile quando avremo i criteri reali.</p>${state.mode==='official'?`<div class="alert"><strong>Per ora non possiamo chiamarla “simulazione ufficiale”.</strong> Servono la struttura reale della prova, il tempo, il numero di quesiti, il punteggio, la soglia, l’eventuale penalità, ecc. L’app è predisposta per queste regole, ma non le inventa.</div>`:''}
 <h3 style="margin-top:25px">Scegli le domande</h3><div class="setup-grid"><div class="setup-field"><label class="control-label">Argomento</label>${optionSelect('topic',setup.topic,[['all','Tutti gli argomenti'],...topicList.map(x=>[x[0],`${x[0]} (${x[1]})`])])}</div><div class="setup-field"><label class="control-label">Appello precedente</label>${optionSelect('appello',setup.appello,[['all','Tutti gli appelli'],...apps.map(x=>[x[0],`${appelloLabel(x[0])} (${x[1]})`])])}</div></div><div class="setup-grid"><div class="setup-field"><label class="control-label">Scegli la raccolta</label>${optionSelect('selection',setup.selection,[['all','Tutte le domande'],['due',`Da ripassare ora (${dueCountForSubject(CATALOG[state.subject].subject)})`],['new','Mai studiate'],['wrong','Da rinforzare (almeno un errore)']])}</div><div class="setup-field"><label class="control-label">Numero di domande</label>${optionSelect('count',setup.count,[['all','Tutte le domande'],['10','10 domande'],['20','20 domande'],['30','30 domande'],['40','40 domande'],['50','50 domande'],['custom','Numero personalizzato']])}</div><div class="setup-field"><label class="control-label" for="custom-n">Numero personalizzato</label><input id="custom-n" class="form-control" type="number" min="1" max="${list.length}" data-setup="n" value="${escap(setup.n)}" ${setup.count==='custom'?'':'disabled'}></div></div>
 ${state.mode==='timed'||state.mode==='mock'?`<h3 style="margin-top:25px">Timer</h3><p class="small muted">Seleziona ore, minuti e secondi. Il conteggio inizia quando premi Avvia. Per la simulazione libera puoi scegliere 00:00:00 per lavorare senza limite.</p><div class="time-row"><div class="time-wheel"><label for="hours">Ore</label><select id="hours" data-setup="hours">${Array.from({length:7},(_,i)=>`<option value="${i}" ${+setup.hours===i?'selected':''}>${pad(i)}</option>`).join('')}</select></div><span class="display" style="margin-top:20px;font-size:23px">:</span><div class="time-wheel"><label for="minutes">Minuti</label><select id="minutes" data-setup="minutes">${Array.from({length:60},(_,i)=>`<option value="${i}" ${+setup.minutes===i?'selected':''}>${pad(i)}</option>`).join('')}</select></div><span class="display" style="margin-top:20px;font-size:23px">:</span><div class="time-wheel"><label for="seconds">Secondi</label><select id="seconds" data-setup="seconds">${Array.from({length:60},(_,i)=>`<option value="${i}" ${+setup.seconds===i?'selected':''}>${pad(i)}</option>`).join('')}</select></div></div>`:''}
 <div class="settings-inline"><span>La barra di ripasso è <b>${preferences.showReviewBar?'attiva':'disattivata'}</b> e puoi cambiare quando ripetere le schede.</span>${btn('Personalizza ripasso e schermata','open-settings','outline small-btn')}</div><div class="setup-footer"><span class="small muted">${state.mode==='mock'?'Correzione disponibile solo dopo la consegna.':'Le risposte originali non sono ancora tutte verificate.'}</span><button type="button" data-action="start-session" class="primary" ${state.mode==='official'?'disabled':''}>Avvia sessione  →</button></div></div></div>`)}
function pickQuestions(){const s=state.setup;let list=activeQuestions().filter(q=>q.type==='multiple_choice'||q.type==='open_answer');if(s.topic!=='all')list=list.filter(q=>q.topic===s.topic);if(s.appello!=='all')list=list.filter(q=>(q.appelli||[]).includes(s.appello));if(s.selection==='due')list=list.filter(q=>progress[q.id]?.dueAt && progress[q.id].dueAt<=Date.now());if(s.selection==='new')list=list.filter(q=>!progress[q.id]?.attempts);if(s.selection==='wrong')list=list.filter(q=>(progress[q.id]?.attempts||0)>(progress[q.id]?.correct||0));if(state.mode==='mock')list=list.filter(q=>q.type==='multiple_choice'&&q.answer_status==='single'&&!q.uncertain_in_source);
 if(state.mode!=='mock')list=list.filter(q=>q.type==='open_answer'||q.correct_indexes?.length>0);
 for(let i=list.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[list[i],list[j]]=[list[j],list[i]]}
 const n=s.count==='all'?list.length:(s.count==='custom'?Math.max(1,+s.n||1):+s.count);return list.slice(0,n)}
function startSession(){if(state.mode==='official'){showModal('Modalità non ancora disponibile','Per questa modalità servono prima le regole autentiche del tuo esame. Usa la simulazione libera per ora.');return}
 const picked=pickQuestions();if(!picked.length){showModal('Nessun quesito disponibile','Le combinazioni di argomento e appello selezionate non hanno domande utilizzabili.');return}
 const duration=(+state.setup.hours*3600)+(+state.setup.minutes*60)+(+state.setup.seconds);
 if(state.mode==='timed'&&duration===0){showModal('Imposta un tempo','Per l’allenamento a tempo seleziona almeno un secondo.');return}
 if(clockHandle)clearInterval(clockHandle);
 state.session={mode:state.mode,ids:picked.map(q=>q.id),initialIds:picked.map(q=>q.id),cursor:0,responses:{},repeatCounts:{},skipCounts:{},pendingTimed:[],starts:Date.now(),ends:(state.mode==='timed'||state.mode==='mock')&&duration>0?Date.now()+duration*1000:0,seconds:duration,autoSubmitted:false};
 state.results=null;
 if(state.session.ends){clockHandle=setInterval(tickTimer,250)}setPage('player');}
function tickTimer(){if(!state.session)return;let remaining=Math.max(0,Math.ceil((state.session.ends-Date.now())/1000));const el=$('#timer');if(el){el.textContent=formatTime(remaining);el.classList.toggle('low',remaining<=60)}if(remaining<=0){finishSession(true)}}
function formatTime(s){let h=Math.floor(s/3600),m=Math.floor(s%3600/60),sc=s%60;return `${pad(h)}:${pad(m)}:${pad(sc)}`}
function currentQ(){return MAP.get(state.session?.ids[state.session?.cursor])}
function answerCorrect(q,indexes){return q.correct_indexes?.length===indexes?.length && [...indexes].sort((a,b)=>a-b).every((v,i)=>v===[...q.correct_indexes].sort((a,b)=>a-b)[i])}
function showPlayer(){const s=state.session;if(!s)return showHome();const q=currentQ();if(!q)return showHome();const r=s.responses[s.cursor]||{};const immediate=s.mode!=='mock';const revealed=!!r.revealed&&immediate;const opts=q.options||[];const multiple=q.correct_indexes?.length>1;const isOpen=q.type==='open_answer';const percentage=Math.floor(100*(s.cursor+1)/s.ids.length);const graded=!!r.grade;
 container(`<div class="practice-shell"><div class="player-header"><div class="player-progress">${preferences.showProgress?`<p>${s.mode==='mock'?'SIMULAZIONE · RISULTATI ALLA FINE':s.mode==='timed'?'ALLENAMENTO A TEMPO':'ALLENAMENTO INTERATTIVO'} · ${s.cursor+1} di ${s.ids.length}${s.ids.length>s.initialIds.length?` · ${s.ids.length-s.initialIds.length} ripassi inseriti`:''}</p><div class="progress-meter"><div class="progress-fill" style="width:${percentage}%"></div></div>`:`<p>${s.mode==='mock'?'Simulazione libera':s.mode==='timed'?'Allenamento a tempo':'Allenamento'}</p>`}</div>${s.ends&&preferences.showTimer?`<div id="timer" class="timer">${formatTime(Math.max(0,Math.ceil((s.ends-Date.now())/1000)))}</div>`:''}${btn(icon('settings'),'open-settings','outline settings-gear','aria-label="Impostazioni studio" title="Personalizza lo studio"')}</div>
 <div class="player-card"><div class="q-meta"><span class="chip gray">${escap(q.subject_label)}</span><span>${escap(q.topic)}</span>${immediate&&preferences.showFavorites?`<button class="mini-favorite" data-action="favorite" data-id="${escap(q.id)}" aria-label="${progress[q.id]?.fav?'Rimuovi dai preferiti':'Aggiungi ai preferiti'}" title="Preferiti">${icon(progress[q.id]?.fav?'bookmark-check':'bookmark')}</button>`:''}${!immediate?'':q.review_flag?'<span class="chip warn">Quesito da verificare</span>':''}</div><h2 class="player-title">${escap(q.question)}</h2>
 ${isOpen?`<div class="open-answer"><p class="small muted">Prova a rispondere a mente o ad alta voce prima di svelare la risposta.</p>${r.revealed?`<div><b>Risposta riportata nel mazzo:</b><p>${escap(q.answer)}</p></div>`:btn('Mostra risposta','reveal-open','outline')}</div>`:
 `<div class="answer-options">${opts.map((o,i)=>{const chosen=(r.selected||[]).includes(i);const show=immediate&&revealed;return `<button class="option-select ${chosen?(immediate?'chosen':'exam-picked'):''} ${show&&o.correct?'right':''} ${show&&chosen&&!o.correct?'wrong':''}" data-action="choose" data-index="${i}" type="button" ${(immediate&&revealed)?'disabled':''}><span class="radio">${chosen?icon("check"):""}</span><span><b style="color:#668176;margin-right:6px">${escap(o.id)}.</b>${escap(o.text)}</span></button>`}).join('')}</div>${multiple&&!r.revealed&&immediate?`<p class="small muted">Questa domanda richiede più risposte. Seleziona tutte le alternative corrette e conferma.</p>${btn('Conferma risposte','submit-multiple','secondary')}`:''}`}
 ${revealed&&!isOpen?`<div role="status" aria-live="polite" class="${r.correct?'correct-feedback':'correct-feedback wrong-feedback'}"><strong>${r.correct?'Risposta corretta':'Da ripassare'}</strong>${!r.correct&&q.correct_indexes?.length?`<span>Nel mazzo: ${escap(q.correct_indexes.map(i=>q.options?.[i]?.text||'').join(' · '))}</span>`:''}</div>${preferences.showExplanations&&q.explanation?.correct_reason?`<div class="instant-explain"><strong>Il ragionamento</strong> ${escap(q.explanation.correct_reason)}</div>`:''}${q.review_flag?`<div class="notice warning">${escap(q.review_flag.title)}</div>`:''}`:''}
 ${isOpen&&r.revealed?`${preferences.showExplanations?getExpHTML(q):''}${!preferences.showReviewBar?`<div class="player-actions">${btn('Non la ricordavo','grade-open','outline','data-value="false"')}${btn('La ricordavo','grade-open','secondary','data-value="true"')}</div>`:''}`:''}
 ${immediate&&revealed?difficultyControl(q):''}
 ${immediate&&revealed?ratingBar(r):''}
  ${revealed&&!isOpen&&preferences.showExplanations?`<details class="explain-disclosure"><summary>Spiegazioni, alternative e teoria <span>⌄</span></summary>${optionRead(q)}${getExpHTML(q)}</details>`:''}
 <div class="player-actions">${btn('← Esci','quit-session','outline small-btn')}${immediate&&preferences.showSkipButton&&!r.revealed?btn('Salta','skip-question','outline small-btn'):''}<span class="small muted">${s.mode==='mock'?'Correzioni visibili soltanto alla consegna.':graded?'Ripasso registrato.':''}</span>${s.mode==='mock'?btn(s.cursor===s.ids.length-1?'Consegna esame →':'Prossima →',s.cursor===s.ids.length-1?'submit-exam':'next-question','secondary'):btn(s.cursor===s.ids.length-1?'Termina sessione →':preferences.showReviewBar&&revealed&&!graded?'Continua senza valutare →':'Continua →',s.cursor===s.ids.length-1?'finish-session':'next-question','secondary',(!isOpen&&!revealed)?'disabled':(isOpen&&!r.revealed)?'disabled':(isOpen&&!preferences.showReviewBar&&!r.selfGraded)?'disabled':'')}</div>
 </div><div class="compliance"><b>Fonte risposta:</b> mazzo Anki originale. ${s.mode==='mock'?'Niente spiegazioni né autovalutazione prima della consegna.':preferences.showReviewBar?'La barra di ripasso è facoltativa: puoi disattivarla dalle impostazioni.':'Ripetizione disattivata: dopo aver consultato la risposta, vai avanti.'}</div></div>`)}
function chooseAnswer(index){const s=state.session,q=currentQ();if(!s||!q||q.type==='open_answer')return;let r=s.responses[s.cursor]||{selected:[],revealed:false};if(r.revealed)return;const immediate=s.mode!=='mock',multi=q.correct_indexes.length>1;
 if(multi){r.selected=(r.selected||[]).includes(index)?r.selected.filter(i=>i!==index):[...(r.selected||[]),index];s.responses[s.cursor]=r;if(immediate)render();return}
 r.selected=[index];r.correct=answerCorrect(q,r.selected);r.revealed=immediate;s.responses[s.cursor]=r;if(immediate)addProgress(q.id,r.correct);render()}
function submitMultiple(){const s=state.session,q=currentQ();if(!s||s.mode==='mock')return;let r=s.responses[s.cursor];if(!r?.selected?.length){showModal('Scegli almeno una risposta','Puoi selezionare più alternative prima di confermare.');return}r.correct=answerCorrect(q,r.selected);r.revealed=true;addProgress(q.id,r.correct);render()}
function revealOpen(){const s=state.session,q=currentQ();if(!s||q?.type!=='open_answer'||s.mode==='mock')return;let r=s.responses[s.cursor]||{selected:[]};r.revealed=true;s.responses[s.cursor]=r;render()}
function skipQuestion(){const s=state.session,q=currentQ();if(!s||!q||s.mode==='mock')return;if(s.cursor<s.ids.length-1&&(s.skipCounts[q.id]||0)<1){s.ids.push(q.id);s.skipCounts[q.id]=(s.skipCounts[q.id]||0)+1}nextQuestion()}
function gradeOpen(correct){const s=state.session,q=currentQ();if(!s||s.mode==='mock'||!q)return;let r=s.responses[s.cursor]||{};if(r.selfGraded)return;r.selfGraded=true;r.correct=correct;s.responses[s.cursor]=r;addProgress(q.id,correct);nextQuestion()}
function nextQuestion(){const s=state.session;if(!s)return;collectTimeDue();if(s.cursor<s.ids.length-1){s.cursor++;render();window.scrollTo(0,0)}else finishSession(false)}
function finishSession(auto=false){const s=state.session;if(!s)return;if(clockHandle){clearInterval(clockHandle);clockHandle=null}s.autoSubmitted=auto;
 if(s.mode==='mock')s.initialIds.forEach((id,i)=>{const q=MAP.get(id),r=s.responses[i];if(r?.selected?.length){r.correct=answerCorrect(q,r.selected);addProgress(q.id,r.correct)}});
 const byId={};s.initialIds.forEach(id=>{byId[id]=s.responses[s.ids.indexOf(id)]||null});
 const correct=s.initialIds.filter(id=>byId[id]?.correct).length;const answered=s.initialIds.filter(id=>{const r=byId[id];return r&&(r.selected?.length||r.selfGraded)}).length;
 state.results={ids:s.initialIds.slice(),responses:JSON.parse(JSON.stringify(byId)),correct,answered,total:s.initialIds.length,repeats:s.ids.length-s.initialIds.length,elapsed:Math.round((Date.now()-s.starts)/1000),auto,mode:s.mode};state.session=null;setPage('results')}
function showResults(){const r=state.results;if(!r)return showHome();const percent=Math.round(100*r.correct/r.total);container(`${breadcrumbs([{name:'Risultati'}])}<div class="practice-shell"><div class="page-lead"><span class="eyebrow">${r.auto?'TEMPO SCADUTO · CONSEGNA AUTOMATICA':'SESSIONE COMPLETATA'}</span><h1>${r.mode==='mock'?'Ecco il tuo esame.':'Ecco come è andata.'}</h1><p>Il risultato considera la <b>prima risposta</b> di ciascuna domanda, non i ripassi. La percentuale misura la coincidenza con le soluzioni del mazzo Anki, <b>non</b> un voto ufficiale UniTo.</p></div><div class="scores"><div class="score"><strong>${percent}%</strong><span>Risposte corrette</span></div><div class="score"><strong>${r.correct}/${r.total}</strong><span>Domande iniziali</span></div><div class="score"><strong>${formatTime(r.elapsed)}</strong><span>Tempo utilizzato</span></div></div>${r.repeats?`<p class="small muted">${r.repeats} ripassi aggiunti durante questa sessione.</p>`:''}<div class="alert">${r.mode==='mock'?'Questa era una simulazione personalizzata, non un esame ufficiale. ':''}La banca conserva le risposte originali, alcune discutibili: questo punteggio va interpretato come allenamento, non come valutazione clinica.</div><div class="player-actions">${btn('Torna alla materia','back-subject','outline')}${btn('Nuova sessione','setup','secondary')}${btn('Preferenze','open-settings','outline')}</div><div class="section-spaced"><h3>Rivedi ogni domanda</h3><p class="normal-text">Le soluzioni e, quando disponibili, le motivazioni e la teoria compaiono qui anche per la simulazione.</p><div class="result-review">${r.ids.map((id,i)=>{const q=MAP.get(id),answer=r.responses[id];const ok=!!answer?.correct;const skipped=!answer?.selected?.length&&!answer?.selfGraded;return `<article class="result-card"><div class="q-meta"><span>DOMANDA ${i+1}</span><span class="result-status ${skipped?'skipped':ok?'right':'wrong'}">${skipped?'NON RISPOSTA':ok?'CORRETTA':'ERRATA'}</span><span>${escap(q.topic)}</span></div><h4>${escap(q.question)}</h4>${answer?.selected?.length?`<p><strong>Hai scelto:</strong> ${escap(answer.selected.map(i=>q.options[i]?.text).filter(Boolean).join(' · '))}</p>`:''}${optionRead(q)}${preferences.showExplanations?getExpHTML(q):''}</article>`}).join('')}</div></div></div>`)}
function showLibrary(){container(`${breadcrumbs([{name:'Materie'}])}<div class="page-lead"><h1>Tutte le materie</h1><p>Organizzate per anno di corso.</p></div>${YEARS.map(y=>`<section class="native-section"><div class="section-heading"><h2>${escap(y.label)}</h2><button data-action="year" data-id="${y.id}" class="muted small" style="color:#007aff">Apri ›</button></div><div class="native-list">${y.courses.length?y.courses.map(homeCourseCard).join(''):`<div class="native-empty">Nessuna materia caricata.</div>`}</div></section>`).join('')}`)}
function showAbout(){container(`${breadcrumbs([{name:'Il progetto'}])}<div class="page-lead"><h1>Il progetto</h1><p>Esami Molinette è una piattaforma studentesca indipendente per prepararsi agli esami di Medicina UniTo.</p></div><section class="native-section"><div class="section-heading"><h2>Che cosa puoi fare</h2></div><div class="simple-panel"><p>Puoi leggere le domande con le spiegazioni, allenarti con le flashcard e svolgere simulazioni con correzione solo alla fine.</p><p>Il primo archivio contiene <strong>${BANK.meta.total_questions} schede</strong> di Nefrologia e Urologia; non include tutto l'esame di Addome.</p><p>Le risposte derivano dal mazzo Anki originale. Le spiegazioni specifiche, ancora in lavorazione, sono separate dalla teoria e contrassegnate come bozze non revisionate.</p><p>Per ora i tuoi progressi sono salvati soltanto nel browser. L'app non è un servizio ufficiale dell'Università di Torino.</p></div></section>`)}
function showModal(title,msg){state.modal={title,msg};const prev=$('.modal-shade');if(prev)prev.remove();document.body.insertAdjacentHTML('beforeend',`<div class="modal-shade" role="dialog" aria-modal="true" aria-label="${escap(title)}"><div class="modal"><h3>${escap(title)}</h3><p>${escap(msg)}</p><div class="modal-actions">${btn('Capito','close-modal','secondary')}</div></div></div>`)}
function confirmQuit(nextAction='back-subject',id=''){state.pendingNav={nextAction,id};document.querySelector('.modal-shade')?.remove();document.body.insertAdjacentHTML('beforeend',`<div class="modal-shade" role="dialog" aria-modal="true" aria-label="Conferma uscita"><div class="modal"><h3>Abbandonare la sessione?</h3><p>La prova corrente terminerà senza una valutazione complessiva. Le singole risposte già corrette in allenamento rimarranno salvate su questo dispositivo.</p><div class="modal-actions">${btn('Continua ad allenarti','close-modal','outline')}${btn('Abbandona sessione','confirm-quit','secondary')}</div></div></div>`)}
function render(){if(!app)return;document.title=`Esami Molinette · ${({home:'Preparazione Esami',year:YEARS.find(y=>y.id===state.year)?.label,course:CATALOG[state.course]?.name,subject:CATALOG[state.subject]?.name,read:'Lettura',setup:'Allenamento',player:'Sessione',results:'Risultati',library:'Materie',about:'Il progetto'})[state.page]||'Preparazione Esami'}`;
 if(state.page==='home')showHome();else if(state.page==='library')showLibrary();else if(state.page==='year')showYear();else if(state.page==='course')showCourse();else if(state.page==='subject')showSubject();else if(state.page==='read')showRead();else if(state.page==='setup')showSetup();else if(state.page==='player')showPlayer();else if(state.page==='results')showResults();else if(state.page==='about')showAbout();}
document.addEventListener('click',e=>{if(e.target.classList?.contains('settings-shade')){closeSettings();return;}const b=e.target.closest('[data-action]');if(!b)return;const a=b.dataset.action;
 if(a==='open-settings'){openSettings();return}
 if(a==='close-settings'){closeSettings();return}
 if(a==='reset-settings'){preferences=structuredDefaultSettings();saveSettings();openSettings();return}
 if(a==='export-backup'){exportBackup();return}
 if(a==='import-backup'){document.getElementById('backup-file')?.click();return}
 if(a==='rate'){rateQuestion(b.dataset.grade);return}
 if(a==='difficulty'){const id=b.dataset.id,p=progress[id]||{attempts:0,correct:0,fav:false};p.difficulty=b.dataset.value;progress[id]=p;saveProgress();render();return}
 if(a==='close-modal'){document.querySelector('.modal-shade')?.remove();state.modal=null;state.pendingNav=null;return}
 if(a==='confirm-quit'){const nav=state.pendingNav||{nextAction:'back-subject'};state.pendingNav=null;document.querySelector('.modal-shade')?.remove();if(clockHandle){clearInterval(clockHandle);clockHandle=null}state.session=null;if(nav.nextAction==='home')setPage('home');else if(nav.nextAction==='library')setPage('library');else if(nav.nextAction==='about')setPage('about');else if(nav.nextAction==='year')goYear(nav.id);else if(nav.nextAction==='course')goCourse(nav.id);else if(nav.nextAction==='subject')goSubject(nav.id);else if(nav.nextAction==='direct-addome')goCourse('addome');else setPage('subject');return}
 if(state.session&&state.page==='player'&&['home','library','about','year','course','subject','direct-addome'].includes(a)){confirmQuit(a,b.dataset.id||'');return}
 if(a==='home'){setPage('home');return}if(a==='library'){setPage('library');return}if(a==='about'){setPage('about');return}
 if(a==='home-year'){state.year=+b.dataset.id;try{localStorage.setItem(HOME_YEAR_KEY,String(state.year))}catch{}setPage('home');return}
 if(a==='year'){goYear(b.dataset.id);return}
 if(a==='course'){goCourse(b.dataset.id);return}
 if(a==='subject'){goSubject(b.dataset.id);return}
 if(a==='direct-addome'){goCourse('addome');return}
 if(a==='study-addome'){state.subject='addome';state.filters={topic:'all',appello:'all',search:'',fav:false};state.readPage=0;setPage('read');return}
 if(a==='setup-addome'){state.subject='addome';state.mode='mock';setPage('setup');return}
 if(a==='study'){state.readPage=0;setPage('read');return}
 if(a==='topic'){state.filters={topic:b.dataset.topic,appello:'all',search:'',fav:false};state.readPage=0;setPage('read');return}
 if(a==='appello'){state.filters={topic:'all',appello:b.dataset.id,search:'',fav:false};state.readPage=0;setPage('read');return}
 if(a==='setup'){state.mode='practice';state.setup.topic='all';state.setup.appello='all';setPage('setup');return}
 if(a==='setup-mock'){state.mode='mock';state.setup.topic='all';state.setup.appello='all';setPage('setup');return}
 if(a==='setup-due'){state.mode='practice';state.setup.selection='due';state.setup.count='all';state.setup.topic='all';state.setup.appello='all';setPage('setup');return}
 if(a==='mode'){state.mode=b.dataset.mode;render();return}
 if(a==='start-session'){startSession();return}
 if(a==='reset-filters'){state.filters={topic:'all',appello:'all',search:'',fav:false};state.readPage=0;render();return}
 if(a==='fav-filter'){state.filters.fav=!state.filters.fav;state.readPage=0;render();return}
 if(a==='favorite'){let p=progress[b.dataset.id]||{attempts:0,correct:0,fav:false};p.fav=!p.fav;progress[b.dataset.id]=p;saveProgress();render();return}
 if(a==='prev-read'){state.readPage=Math.max(0,state.readPage-1);render();window.scrollTo(0,0);return}
 if(a==='next-read'){state.readPage++;render();window.scrollTo(0,0);return}
 if(a==='choose'){chooseAnswer(+b.dataset.index);return}
 if(a==='submit-multiple'){submitMultiple();return}
 if(a==='reveal-open'){revealOpen();return}
 if(a==='grade-open'){gradeOpen(b.dataset.value==='true');return}
 if(a==='skip-question'){skipQuestion();return}
 if(a==='next-question'){nextQuestion();return}
 if(a==='finish-session'){finishSession(false);return}
 if(a==='submit-exam'){finishSession(false);return}
 if(a==='quit-session'){confirmQuit();return}
 if(a==='back-subject'){setPage('subject');return}
});
document.addEventListener('change',e=>{if(e.target.id==='backup-file'){importBackup(e.target.files?.[0]);return;}if(updateSetting(e))return;const f=e.target.dataset.filter,s=e.target.dataset.setup;
 if(f){state.filters[f]=e.target.type==='checkbox'?e.target.checked:e.target.value;state.readPage=0;render();return}
 if(s){state.setup[s]=e.target.value;if(s==='count')render();return}
});
let searchTimer=null;document.addEventListener('input',e=>{if(e.target.dataset.setup==='n'){state.setup.n=e.target.value;return}if(e.target.dataset.filter!=='search')return;const v=e.target.value;clearTimeout(searchTimer);searchTimer=setTimeout(()=>{state.filters.search=v;state.readPage=0;const start=e.target.selectionStart||0;render();const input=$('#search-filter');if(input){input.focus();input.setSelectionRange(start,start)}},230)});
document.addEventListener('keydown',e=>{
 if(e.key==='Escape'){if(document.querySelector('.settings-shade')){closeSettings();return}if($('.modal-shade')){$('.modal-shade')?.remove();return}}
 if(state.page!=='player'||!preferences.keyboardShortcuts||document.querySelector('.settings-shade'))return;
 if(['INPUT','SELECT','TEXTAREA','BUTTON'].includes(document.activeElement?.tagName)&&document.activeElement?.tagName!=='BODY')return;
 const s=state.session,q=currentQ();if(!s||!q)return;
 const r=s.responses[s.cursor]||{};
 if((e.key==='s'||e.key==='S')&&s.mode!=='mock'&&preferences.showSkipButton&&!r.revealed){skipQuestion();return}
 if(e.key==='Enter'){if(s.mode!=='mock'&&r.revealed)nextQuestion();else if(s.mode==='mock')nextQuestion();return}
 if(e.key>='1'&&e.key<='4'&&s.mode!=='mock'&&r.revealed&&preferences.showReviewBar){rateQuestion(GRADES[+e.key-1].key);return}
 if(e.key>='1'&&e.key<='9'&&q.options?.[+e.key-1]&&!r.revealed)chooseAnswer(+e.key-1)
});
render();
})();
