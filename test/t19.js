const {JSDOM}=require('jsdom'); const fs=require('fs');
const html=fs.readFileSync(require('path').join(__dirname,'..','index.html'),'utf8');
function mk(dateArr,store){ const dom=new JSDOM(html,{runScripts:'dangerously',url:'https://x.test/#fuori',pretendToBeVisual:true,beforeParse(w){
    const RD=w.Date; const fixed=new RD(...dateArr).getTime(); class D extends RD{ constructor(...a){ if(a.length===0) super(fixed); else super(...a);} static now(){return fixed;} } w.Date=D;
    w.scrollTo=()=>{}; w.Element.prototype.scrollIntoView=function(){}; w.matchMedia=()=>({matches:false,addEventListener(){}}); w.localStorage.setItem('quaderno-italiano-v1',store); w.addEventListener('error',e=>console.log('ERR',e.message,e.error&&e.error.stack)); }}); return dom; }
const wait=ms=>new Promise(r=>setTimeout(r,ms));
const words={}; ['la scrivania|escrivaninha','il cassetto|a gaveta','sbadigliare|bocejar','lo sgabello|o banquinho','il comodino|o criado-mudo','la federa|a fronha'].forEach((x,i)=>{ const [it,pt]=x.split('|'); words['w'+i]={it,pt,ex:'',src:'corso',d:i,v:true}; });
words.w5.srs={ivl:3,ease:2.5,reps:2,lapses:0,due:'2026-11-26'};
(async()=>{
 let dom=mk([2026,10,27,15],JSON.stringify({planMig2:1,storyMig110:1,myvoc:words,ankiCfg:{nuove:3,dir:'pt'}})); let w=dom.window,d=w.document,$=s=>d.querySelector(s),$$=s=>[...d.querySelectorAll(s)];
 await wait(300);
 console.log('head:', $('.ankihead .ankicnt').textContent, '|', $('#ankigo').textContent, '| due labels', $$('.duelab').map(x=>x.textContent).join(','));
 $('#ankigo').click(); await wait(10);
 const step=async g=>{ const f=$('.ankif .ankiw').textContent; $('#ankishow').click(); const labs=$$('#ankig [data-g]').map(b=>b.textContent).join('/'); $(`#ankig [data-g="${g}"]`).click(); await wait(5); return f+' ['+labs+'] g'+g; };
 for(const g of [2,0,3,2,2,2,2]){ if(!$('#ankishow')) break; console.log(' ', await step(g)); }
 console.log('end:', $('#ankicard').textContent.replace(/\s+/g,' ').slice(0,120));
 await wait(300); const S=JSON.parse(w.localStorage.getItem('quaderno-italiano-v1'));
 console.log('srs:', Object.entries(S.myvoc).map(([k,v])=>k+':'+(v.srs?v.srs.ivl+'d/'+v.srs.due+'/e'+v.srs.ease:'-')).join(' '), '| days', JSON.stringify(S.ankiDays));
 w.location.hash=''; await wait(80); console.log('home task:', $$('.todayplan li').map(li=>li.textContent).filter(t=>/Anki/.test(t)).join(''));
 process.exit(0); })();
