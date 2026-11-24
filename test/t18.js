const {JSDOM}=require('jsdom'); const fs=require('fs');
const html=fs.readFileSync(require('path').join(__dirname,'..','index.html'),'utf8');
const st={planMig2:1,storyMig110:1,diario:{'2026-11-20':{f:['Io sono andata al corso.','Ho imparato i verbi riflessivi.','Mi piace molto la mia professoressa.'],tema:'riflessivi',c:[{ok:true,corr:'Io sono andata al corso.',nota:''},{ok:true,corr:'Ho imparato i verbi riflessivi.',nota:''},{ok:true,corr:'Mi piace molto la mia professoressa.',nota:''}]},
 '2026-11-23':{f:['Ieri io ho andato al cinema.','Il film era molto bello.','Dopo abbiamo mangiato una pizza.'],tema:'passato',c:[{ok:false,corr:'Ieri sono andata al cinema.',nota:'Andare usa essere.'},{ok:true,corr:'Il film era molto bello.'},{ok:true,corr:'Dopo abbiamo mangiato una pizza.'}]}}};
const dom=new JSDOM(html,{runScripts:'dangerously',url:'https://x.test/#diario',pretendToBeVisual:true,beforeParse(w){ w.scrollTo=()=>{}; w.Element.prototype.scrollIntoView=function(){}; w.localStorage.setItem('quaderno-italiano-v1',JSON.stringify(st)); w.addEventListener('error',e=>console.log('ERR',e.message)); }});
const w=dom.window,d=w.document,$=s=>d.querySelector(s),$$=s=>[...d.querySelectorAll(s)];
const wait=ms=>new Promise(r=>setTimeout(r,ms));
(async()=>{ await wait(300);
 const a=$('a[data-fm="frasi"]'); console.log('link:', a&&a.textContent); a.click(); w.location.hash='fuori'; await wait(60);
 console.log('seg:', $$('.seg button').map(b=>b.textContent+(b.getAttribute('aria-pressed')==='true'?'*':'')).join(','));
 console.log('list:', $$('#frlist li').map(li=>li.textContent.replace(/\s+/g,' ').trim()).join(' || '));
 $('[data-ff="errori"]').click(); await wait(10); console.log('errori:', $$('#frlist li').length);
 $('#frrev').click(); await wait(10);
 for(let i=0;i<8;i++){ const lab=$('#frcard .card-h .lab'); if(!lab) break; console.log(' q:', lab.textContent,'|', $('#rvbody').textContent.slice(0,80)); const inp=$('#rvbody input,#rvbody textarea'); if(inp){ inp.value='x'; } $('#rvcheck').click(); await wait(5); $('#rvnext').click(); await wait(5); }
 console.log('end:', $('#frcard').textContent.slice(0,60));
 $('#frnew').value='Oggi ho lavorato tanto.\nStasera guardo un film.'; $('#fradd').click(); await wait(100); console.log('after add:', $('#frmsg').textContent, '| count', $$('#frlist li').length, '| first', $('#frlist li .frt').textContent, '| recheck btn', !!$('#frcheck'));
 $$('[data-frdel]')[0].click(); await wait(20); console.log('after del', $$('#frlist li').length);
 w.location.hash='diario'; await wait(60); console.log('diario bottom:', $$('#main section.card').pop().textContent.replace(/\s+/g,' ').slice(0,120));
 process.exit(0); })();
