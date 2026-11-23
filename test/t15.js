const {JSDOM}=require('jsdom'); const fs=require('fs');
const html=fs.readFileSync(require('path').join(__dirname,'..','index.html'),'utf8');
function mk(dateArr,store,hash){ const errs=[];
  const dom=new JSDOM(html,{runScripts:'dangerously',url:'https://x.test/'+(hash||''),pretendToBeVisual:true,beforeParse(w){
    const RD=w.Date; const fixed=new RD(...dateArr).getTime(); class D extends RD{ constructor(...a){ if(a.length===0) super(fixed); else super(...a);} static now(){return fixed;} } w.Date=D;
    w.scrollTo=()=>{}; w.Element.prototype.scrollIntoView=function(){}; if(store) w.localStorage.setItem('quaderno-italiano-v1',store);
    w.speechSynthesis={speak(u){ setTimeout(()=>{u.onstart&&u.onstart(); u.onend&&u.onend();},5);},cancel(){},resume(){},getVoices(){return []},addEventListener(){},speaking:false,pending:false}; w.SpeechSynthesisUtterance=function(t){this.text=t;};
    w.addEventListener('error',e=>errs.push(e.message+' '+(e.error&&e.error.stack||'').split('\n')[1])); }}); return {dom,errs}; }
const wait=ms=>new Promise(r=>setTimeout(r,ms));
(async()=>{
 const st={lesson:{101:true,102:true,103:true},ex:{'101-0':{s:5,t:6},'101-1':{s:6,t:6},'102-0':{s:4,t:6},'102-1':{s:6,t:6},'102-2':{s:5,t:5}},read:{101:{s:5,t:5}},planMig2:1,storyMig110:1};
 const r=mk([2026,10,23,12],JSON.stringify(st)); const w=r.dom.window,d=w.document,$=s=>d.querySelector(s),$$=s=>[...d.querySelectorAll(s)];
 await wait(400);
 let S=JSON.parse(w.localStorage.getItem('quaderno-italiano-v1'));
 console.log('mem cards:', Object.keys(S.mem).length, Object.keys(S.mem).slice(0,5), Object.values(S.mem).slice(0,3));
 console.log('nav:', $$('#nav a.tool').map(a=>a.textContent.split('\n')[0].slice(0,25)).join(' | '));
 // plan tasks for upcoming days
 const ev=x=>'';
 w.location.hash='piano'; await wait(80); console.log('week:', $$('.wday').map(x=>x.textContent.replace(/\s+/g,' ').slice(0,150)).join('\n'));
 // misto
 w.location.hash='misto'; await wait(60); console.log('misto:', $('#mxcard h3').textContent); $('#mxgo').click(); await wait(30);
 let n=0; for(let i=0;i<20;i++){ const lab=$('#mxcard .card-h .lab'); if(!lab) break; n++; const opt=$('#rvbody .opt'); if(opt) opt.click(); else { $$('#rvbody input,#rvbody textarea').forEach(x=>x.value='xx'); const ck=$('#rvcheck'); if(ck&&!ck.hidden) ck.click(); const dc=$('#rvbody [data-d="check"]'); if(dc) dc.click(); } await wait(5); const nx=$('#rvnext'); if(nx&&!nx.hidden) nx.click(); else { /* order: skip */ const pool=$$('#rvbody .pool button, #rvbody .tok'); pool.forEach(b=>b.click()); const ck=$('#rvcheck'); ck&&ck.click(); await wait(5); const nx2=$('#rvnext'); if(nx2&&!nx2.hidden) nx2.click(); else { console.log('stuck at', $('#rvbody').innerHTML.slice(0,200)); break; } } await wait(5); }
 console.log('misto items run:', n, '| end:', ($('#mxcard .pen')||{}).textContent);
 await wait(300); S=JSON.parse(w.localStorage.getItem('quaderno-italiano-v1')); console.log('misto saved', JSON.stringify(S.misto), 'errs', Object.keys(S.err).length);
 // ricordi
 w.location.hash='unita-103'; await wait(60); console.log('ricordi:', $('#riccard h3')&&$('#riccard h3').textContent); $('#ricgo').click(); await wait(10); console.log('ric q1:', $('#riccard .lab').textContent);
 // diario
 w.location.hash='diario'; await wait(60); $$('[data-f]').forEach((t,i)=>t.value='Io sono stanca '+i); $('#dtema').value='riflessivi'; $('#dgo').click(); await wait(50); console.log('diario msg:', $('#dmsg').textContent);
 // ripasso
 w.location.hash='ripasso'; await wait(60); console.log('ripasso:', $('.rgrid .card').textContent.replace(/\s+/g,' ').slice(0,120));
 // ascolto
 w.location.hash='ascolto'; await wait(60); console.log('ascolto chips:', $$('.chipsel [data-l]').map(b=>b.textContent+(b.getAttribute('aria-pressed')==='true'?'*':'')).join(','), '|', $('#dcard .lab').textContent);

 // memory day later
 console.log('errors', r.errs); process.exit(0);
})();
