const {JSDOM}=require('jsdom'); const fs=require('fs');
const html=fs.readFileSync(''+require('path').join(__dirname,'..','index.html')+'','utf8');
function mk(dateArr,store){
  const errs=[];
  const dom=new JSDOM(html,{runScripts:'dangerously',url:'https://x.test/',pretendToBeVisual:true,beforeParse(w){
    const RD=w.Date; const fixed=new RD(...dateArr).getTime(); class D extends RD{ constructor(...a){ if(a.length===0) super(fixed); else super(...a);} static now(){return fixed;} } w.Date=D;
    w.scrollTo=()=>{}; w.Element.prototype.scrollIntoView=function(){}; if(store) w.localStorage.setItem('quaderno-italiano-v1',store);
    w.speechSynthesis={speak(){},cancel(){},getVoices(){return []}}; w.SpeechSynthesisUtterance=function(t){this.text=t;};
    w.addEventListener('error',e=>errs.push(e.message)); }});
  return {dom,errs};
}
const wait=ms=>new Promise(r=>setTimeout(r,ms));
(async()=>{
 // old-style state: plan built Nov 10 without V steps, P1+P2 done
 let {dom}=mk([2026,10,10,10]); await wait(300);
 let st=JSON.parse(dom.window.localStorage.getItem('quaderno-italiano-v1'));
 // simulate old plan: delete V ids
 Object.keys(st.plan.a).forEach(k=>{ if(/^V/.test(k)) delete st.plan.a[k]; });
 st.lesson={101:true,102:true}; ['101-0','101-1','101-2','102-0','102-1','102-2','102-3'].forEach(k=>st.ex[k]={s:1,t:1}); st.read={101:{s:5,t:5},102:{s:5,t:5}};
 st.days={'2026-11-10':3,'2026-11-11':2};
 const r=mk([2026,10,14,10],JSON.stringify(st)); dom=r.dom; await wait(300);
 const w=dom.window,d=w.document,$=s=>d.querySelector(s),$$=s=>[...d.querySelectorAll(s)];
 st=JSON.parse(w.localStorage.getItem('quaderno-italiano-v1'));
 console.log('V steps scheduled:', Object.entries(st.plan.a).filter(([k])=>/^V/.test(k)).slice(0,5));
 console.log('cal cells:', $$('.cd[data-cal]').length, '| month:', $('.calnav b').textContent, '| sum:', $('.calsum').textContent);
 console.log('states:', $$('.cd[data-cal]').slice(8,20).map(c=>c.dataset.cal.slice(8)+':'+c.className.replace(/\s+/g,' ').trim()).join(' | '));
 console.log('cell 17:', d.querySelector('[data-cal="2026-11-17"]').textContent);
 d.querySelector('[data-cal="2026-11-17"]').click(); await wait(20);
 console.log('detail:', $('.caldet').textContent.replace(/\s+/g,' ').slice(0,220));
 $('[data-calm="1"]').click(); console.log('next month:', $('.calnav b').textContent, $$('.cd.pause').length,'pause days');
 $('[data-calm="1"]').click(); $('[data-calm="1"]').click(); console.log('feb:', $('.calnav b').textContent, '| first cells', $$('.cd[data-cal]').slice(0,3).map(c=>c.textContent).join(' / '));
 $('[data-calm="0"]').click(); console.log('back:', $('.calnav b').textContent);
 console.log('book card:', $('.book h3').textContent, '|', $('.book .note').textContent);
 // lessico
 w.location.hash='lessico'; await wait(60);
 console.log('lessico groups:', $$('h2.sec').map(h=>h.textContent), $$('.lexcard').length, '| first:', $('.lexcard h3').textContent);
 const sal=$$('.lexcard')[0].getAttribute('href'); w.location.hash=sal.slice(1); await wait(60);
 console.log('modes:', $$('.seg button').map(b=>b.textContent).join(','), '| rows', $$('.lextbl tr').length, 'play', $$('[data-say]').length, '| next link', $$('.btnrow a.btn.ghost').map(a=>a.textContent).join(' '));
 $$('.seg button')[3].click(); await wait(300);
 $('#lxin').value='ciao'; $('#lxchk').click(); console.log('dict fb:', $('#lxfb').textContent.slice(0,80)); await wait(200);
 // wrong answer to error notebook
 $('#lxchk').click(); $('#lxin').value='xxx'; $('#lxchk').click(); console.log('dict fb2:', $('#lxfb').textContent.slice(0,60));
 await wait(200); st=JSON.parse(w.localStorage.getItem('quaderno-italiano-v1')); console.log('err vocab:', Object.values(st.err).filter(e=>e.k==='vocab').length);
 // cards complete -> lexSeen
 $$('.seg button')[1].click(); for(let i=0;i<40&&$('#lxyes');i++) $('#lxyes').click();
 await wait(200); st=JSON.parse(w.localStorage.getItem('quaderno-italiano-v1')); console.log('lexSeen', st.lexSeen);
 // fuori libri + risorse
 w.location.hash='fuori'; await wait(60); $$('.seg button').find(b=>b.textContent==='Libri').click();
 console.log('libri:', $$('.bookc h3').map(h=>h.textContent).join(' | '), '| cur:', $('.bookc.cur h3').textContent);
 $$('.seg button').find(b=>b.textContent==='Video e podcast').click();
 const links=$$('#fbody2 a[href^="http"]').map(a=>a.href); console.log('yt search links:', links.filter(h=>h.includes('results?search')).length, '| watch:', links.filter(h=>h.includes('watch?v=')).length, '| playlists', links.filter(h=>h.includes('playlist')).length);
 w.location.hash='unita-101'; await wait(60); const pt=$$('[data-tab="parla"]')[0]||$$('.tabs button').find(b=>/Parla/.test(b.textContent)); pt&&pt.click(); await wait(30);
 console.log('parla videos:', $$('#main a[href*="watch?v="]').length);
 w.location.hash='unita-13'; await wait(60); const pt2=$$('.tabs button').find(b=>/Parla/.test(b.textContent)); pt2&&pt2.click(); await wait(30);
 console.log('u13 parla:', ($$('section.card').find(s=>/Italianeando/.test(s.textContent))||{textContent:''}).textContent.replace(/\s+/g,' ').slice(0,200));
 w.location.hash='piano'; await wait(60); console.log('piano has cal:', !!$('#calbox .cal'), '| week', $$('.wday').length);
 $$('#calbox [data-cal]')[20].click(); console.log('piano detail ok:', !!$('#calbox .caldet h3'));
 // ripasso with vocab error
 w.location.hash='ripasso'; await wait(60); $('#rvstart')&&console.log('rv start enabled', !$('#rvstart').disabled);
 console.log('errors', r.errs); process.exit(0);
})();
