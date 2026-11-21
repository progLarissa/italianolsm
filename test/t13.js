const {JSDOM}=require('jsdom'); const fs=require('fs');
const html=fs.readFileSync(''+require('path').join(__dirname,'..','index.html')+'','utf8');
function mk(dateArr,store){ const errs=[];
  const dom=new JSDOM(html,{runScripts:'dangerously',url:'https://x.test/',pretendToBeVisual:true,beforeParse(w){
    const RD=w.Date; const fixed=new RD(...dateArr).getTime(); class D extends RD{ constructor(...a){ if(a.length===0) super(fixed); else super(...a);} static now(){return fixed;} } w.Date=D;
    w.scrollTo=()=>{}; w.Element.prototype.scrollIntoView=function(){}; if(store) w.localStorage.setItem('quaderno-italiano-v1',store);
    w.speechSynthesis={speak(){},cancel(){},getVoices(){return []}}; w.SpeechSynthesisUtterance=function(t){this.text=t;};
    w.addEventListener('error',e=>errs.push(e.message)); }}); return {dom,errs}; }
const wait=ms=>new Promise(r=>setTimeout(r,ms));
(async()=>{
 const old={story:{0:{read:true},1:{read:true},7:{read:true}},planMig2:1};
 const r=mk([2026,10,20,19],JSON.stringify(old)); const w=r.dom.window,d=w.document,$=s=>d.querySelector(s),$$=s=>[...d.querySelectorAll(s)];
 await wait(400);
 const st=JSON.parse(w.localStorage.getItem('quaderno-italiano-v1')); console.log('story keys', Object.keys(st.story), 'mig', st.storyMig110);
 console.log('nav A1:', $$('#nav a[href^="#unita-1"]').map(a=>a.textContent.replace(/\s+/g,' ').slice(0,40)).join(' | '));
 w.location.hash='unita-110'; await wait(80);
 console.log('title:', $('h1').textContent, '| tabs', $$('.tabs button').map(b=>b.textContent).join(','));
 console.log('lesson len', $('#main').textContent.length);
 const tab=n=>{ const b=$$('.tabs button').find(b=>b.textContent.includes(n)); b&&b.click(); };
 tab('Eserciz'); await wait(40); console.log('ex sets', $$('#main section.card h3').map(h=>h.textContent).join(' | '));
 // try first fill
 const inp=$$('#main .items input'); console.log('inputs', inp.length);
 inp[0].value="c’è"; inp[0].dispatchEvent(new w.Event('input'));
 const chk=$$('#main button').find(b=>/Controlla/.test(b.textContent)); chk&&chk.click(); await wait(20);
 console.log('first item mark:', ($('#main .items li')||{}).className);
 tab('Parla'); await wait(40); console.log('parla videos', $$('#main a[href*="watch"]').map(a=>a.textContent).join(' / '));
 tab('Scri'); await wait(40); console.log('targets', $$('#wtargets li').map(l=>l.textContent).join(' | '));
 const ta=$('#main textarea'); ta.value="Nel mio quartiere c'è un bar, c'è un forno e c'è un parco. Ci sono due scuole e ci sono molti negozi. Non c'è un cinema."; ta.dispatchEvent(new w.Event('input')); await wait(20);
 console.log('targets after', $$('#wtargets li').map(l=>l.className+':'+l.textContent).join(' | '));
 w.location.hash='racconto'; await wait(60); console.log('story list:', $$('#main a[href^="#racconto-"]').slice(5,9).map(a=>a.textContent.replace(/\s+/g,' ').slice(0,45)).join(' | '));
 w.location.hash='scheda-110'; await wait(60); console.log('scheda:', $('#main').textContent.replace(/\s+/g,' ').slice(0,160));
 w.location.hash='unita-107'; await wait(60); console.log('107:', $('h1').textContent, '|', $('.eyebrow')&&$('.eyebrow').textContent);
 const S=JSON.parse(w.localStorage.getItem('quaderno-italiano-v1')); console.log('plan 110 steps', Object.keys(S.plan.a).filter(k=>k.startsWith('110:')||k==='V11').map(k=>k+'='+S.plan.a[k]).join(' '));
 console.log('errors', r.errs); process.exit(0);
})();
