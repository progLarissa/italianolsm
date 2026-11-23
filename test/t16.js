const {JSDOM}=require('jsdom'); const fs=require('fs');
const html=fs.readFileSync(require('path').join(__dirname,'..','index.html'),'utf8');
function mk(dateArr,store){ const errs=[];
  const dom=new JSDOM(html,{runScripts:'dangerously',url:'https://x.test/#ripasso',pretendToBeVisual:true,beforeParse(w){
    const RD=w.Date; const fixed=new RD(...dateArr).getTime(); class D extends RD{ constructor(...a){ if(a.length===0) super(fixed); else super(...a);} static now(){return fixed;} } w.Date=D;
    w.scrollTo=()=>{}; w.Element.prototype.scrollIntoView=function(){}; if(store) w.localStorage.setItem('quaderno-italiano-v1',store);
    w.addEventListener('error',e=>errs.push(e.message)); }}); return {dom,errs}; }
const wait=ms=>new Promise(r=>setTimeout(r,ms));
(async()=>{
 const st={lesson:{101:true,102:true,103:true,104:true},ex:{'101-0':{s:5,t:6},'101-1':{s:6,t:6},'102-0':{s:4,t:6},'102-1':{s:6,t:6},'102-2':{s:5,t:5}},planMig2:1,storyMig110:1,
  mem:{'101-0-0':{b:0,due:'2026-11-20'},'v:essere:pres':{b:2,due:'2026-11-21'},'102-1-0':{b:4,due:'2026-11-22'}}};
 const r=mk([2026,10,27,12],JSON.stringify(st)); const w=r.dom.window,d=w.document,$=s=>d.querySelector(s),$$=s=>[...d.querySelectorAll(s)];
 await wait(400);
 console.log($('.rgrid .card').textContent.replace(/\s+/g,' ').slice(0,90), '|', $('.memcard .boxes').textContent.replace(/\s+/g,' '));
 $('#rvstart').click(); await wait(20);
 for(let i=0;i<10;i++){ const lab=$('#rvcard .card-h .lab'); if(!lab) break; console.log(' item:', lab.textContent, '|', $('#rvbody').textContent.replace(/\s+/g,' ').slice(0,60));
   const opt=$('#rvbody .opt'); if(opt) [...d.querySelectorAll('#rvbody .opt')].find(o=>true).click(); else { const ins=$$('#rvbody input'); ins.forEach(x=>x.value='sono'); $('#rvcheck').click(); }
   await wait(5); const nx=$('#rvnext'); if(nx&&!nx.hidden) nx.click(); else break; await wait(5); }
 await wait(300); const S=JSON.parse(w.localStorage.getItem('quaderno-italiano-v1'));
 console.log('mem after', JSON.stringify(Object.fromEntries(Object.entries(S.mem).filter(([k])=>['101-0-0','v:essere:pres','102-1-0'].includes(k)))), 'done', JSON.stringify(S.memDone), 'revDays', JSON.stringify(S.revDays), 'memDays', JSON.stringify(S.memDays));
 console.log('errors', r.errs); process.exit(0);
})();
