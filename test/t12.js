const {JSDOM}=require('jsdom'); const fs=require('fs');
const html=fs.readFileSync(''+require('path').join(__dirname,'..','index.html')+'','utf8');
function mk(dateArr,store){ const errs=[];
  const dom=new JSDOM(html,{runScripts:'dangerously',url:'https://x.test/#piano',pretendToBeVisual:true,beforeParse(w){
    const RD=w.Date; const fixed=new RD(...dateArr).getTime(); class D extends RD{ constructor(...a){ if(a.length===0) super(fixed); else super(...a);} static now(){return fixed;} } w.Date=D;
    w.scrollTo=()=>{}; w.Element.prototype.scrollIntoView=function(){}; if(store) w.localStorage.setItem('quaderno-italiano-v1',store);
    w.addEventListener('error',e=>errs.push(e.message)); }}); return {dom,errs}; }
const wait=ms=>new Promise(r=>setTimeout(r,ms));
(async()=>{
 // old state with sunFree true saved config
 let {dom}=mk([2026,10,10,10]); await wait(300);
 let st=JSON.parse(dom.window.localStorage.getItem('quaderno-italiano-v1')); delete st.planMig2; st.planCfg={min:25,cls:[2,4],sunFree:true,brk:['2026-12-20','2027-01-25'],hol:'pause'};
 const r=mk([2026,10,14,22],JSON.stringify(st)); dom=r.dom; await wait(300);
 const w=dom.window,d=w.document,$=s=>d.querySelector(s),$$=s=>[...d.querySelectorAll(s)];
 const cell=k=>{ const c=d.querySelector(`[data-cal="${k}"]`); return k.slice(5)+' '+c.className.replace(/\s+/g,' ').trim()+' ['+c.textContent+']'; };
 ['2026-11-15','2026-11-16','2026-11-17','2026-11-18','2026-11-19','2026-11-22'].forEach(k=>console.log(cell(k)));
 $('[data-calm="1"]').click(); ['2026-12-01','2026-12-02','2026-12-03','2026-12-07'].forEach(k=>console.log(cell(k)));
 $('[data-calm="1"]').click(); $('[data-calm="1"]').click(); ['2027-02-04','2027-02-05','2027-02-01'].forEach(k=>console.log(cell(k)));
 $('[data-calm="1"]').click(); ['2027-03-05','2027-03-08','2027-03-09'].forEach(k=>console.log(cell(k)));
 console.log('cfg note:', $('.plancfg .note').textContent.slice(0,200));
 console.log('wk chips:', $$('#cfg-wk button').map(b=>b.textContent+(b.getAttribute('aria-pressed')==='true'?'*':'')).join(','));
 console.log('sunday chip:', $$('#cfg-sun button').map(b=>b.textContent+(b.getAttribute('aria-pressed')==='true'?'*':'')).join(','));
 console.log('week:', $$('.wday').map(x=>x.querySelector('.wdh').textContent).join(' | '));
 console.log('end:', $$('.rgrid .card')[1].textContent.replace(/\s+/g,' '));
 // change pair
 $('[data-calm="0"]').click(); $$('#cfg-wk button')[3].click(); await wait(20); console.log('after change:', $$('#cfg-wk button').map(b=>b.textContent+(b.getAttribute('aria-pressed')==='true'?'*':'')).join(','), '| 16:', d.querySelector('[data-cal="2026-11-16"]').className);
 // monday 16 home card
 const r2=mk([2026,10,16,9],w.localStorage.getItem('quaderno-italiano-v1')); await wait(300); r2.dom.window.location.hash='home'; await wait(80); console.log('mon card:', r2.dom.window.document.querySelector('.todayplan').textContent.replace(/\s+/g,' ').slice(0,200));
 console.log('errors', r.errs, r2.errs); process.exit(0);
})();
