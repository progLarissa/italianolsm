const {JSDOM}=require('jsdom'); const fs=require('fs');
const html=fs.readFileSync(''+require('path').join(__dirname,'..','index.html')+'','utf8');
function mk(dateArr,store,sampleFn){
  const errs=[];
  const dom=new JSDOM(html,{runScripts:'dangerously',url:'https://x.test/',pretendToBeVisual:true,beforeParse(w){
    const RD=w.Date; const fixed=new RD(...dateArr).getTime(); class D extends RD{ constructor(...a){ if(a.length===0) super(fixed); else super(...a);} static now(){return fixed;} } w.Date=D;
    w.scrollTo=()=>{}; w.Element.prototype.scrollIntoView=function(){}; if(store) w.localStorage.setItem('quaderno-italiano-v1',store);
    if(sampleFn){ const s=async()=>({text:''}); s.json=sampleFn; w.claude={use:async n=>n==='sample'?s:null}; }
    w.addEventListener('error',e=>errs.push(e.message)); }});
  return {dom,errs};
}
const wait=ms=>new Promise(r=>setTimeout(r,ms));
(async()=>{
 // day 1: Nov 10 build plan
 let {dom,errs}=mk([2026,10,10,10]); await wait(300);
 let st=JSON.parse(dom.window.localStorage.getItem('quaderno-italiano-v1'));
 console.log('plan from', st.plan.from, '101:L', st.plan.a['101:L'], '102:L', st.plan.a['102:L']);
 // mark P1 + P2 done, like her
 st.lesson={101:true,102:true}; ['101-0','101-1','101-2','102-0','102-1','102-2','102-3'].forEach(k=>st.ex[k]={s:1,t:1}); st.read={101:{s:5,t:5},102:{s:5,t:5}}; st.story={0:{read:true},1:{read:true}}; st.spk={101:{done:true}}; st.write={101:{done:true}};
 st.corr={101:"## Erros\n- ~~programmatrice~~ → **programmatrice** ✔: correta.\n- ~~un po' d'italiano~~ → **un po' d'italiano**: ok.\n- ~~de RJ~~ → **di Rio de Janeiro**: origem com di."};
 st.myvoc={w1:{it:'commouversi',pt:'comover-se',ex:'',src:'corso',d:1}};
 // day 2: Nov 13
 const r2=mk([2026,10,13,23,40],JSON.stringify(st),async(p)=>{ return [{id:'w1',ok:false,it:'commuoversi',pt:'comover-se, emocionar-se',ex:'',nota:'A grafia correta é «commuoversi» (uo).'}]; });
 dom=r2.dom; await wait(300); const w=dom.window,d=w.document,$=s=>d.querySelector(s),$$=s=>[...d.querySelectorAll(s)];
 st=JSON.parse(w.localStorage.getItem('quaderno-italiano-v1'));
 console.log('after autoAhead: from', st.plan.from, '| 102:L', st.plan.a['102:L'], '| 103:L', st.plan.a['103:L'], '| 101:P', st.plan.a['101:P']);
 console.log('today card:', $('.todayplan h3').textContent, '|', $$('.todayplan .ptl')[0]&&$$('.todayplan .ptl')[0].textContent.replace(/\s+/g,' '));
 console.log('ahead box:', $('.ahead')?$('.ahead').textContent.replace(/\s+/g,' ').slice(0,200):'none');
 w.location.hash='piano'; await wait(60); console.log('week sat 14:', $$('.wday')[5].textContent.replace(/\s+/g,' ').slice(0,160));
 w.location.hash='unita-101'; await wait(60); $$('[data-tab="scrittura"]')[0].click(); console.log('correction shown:', $('.ai-out').textContent.replace(/\s+/g,' ').slice(0,200));
 w.location.hash='fuori'; await wait(60); console.log('check btn:', $('#mvcheck')&&$('#mvcheck').textContent); $('#mvcheck').click(); await wait(80);
 console.log('suggest:', $('.mvsug')&&$('.mvsug').textContent.replace(/\s+/g,' ').slice(0,160), '| msg:', $('#mvmsg').textContent);
 $('[data-fix]').click(); console.log('fixed row:', $('#mvtbl tr').textContent.replace(/\s+/g,' '));
 console.log('errors', r2.errs, errs); process.exit(0);
})();
