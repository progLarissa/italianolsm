const {JSDOM}=require('jsdom'); const fs=require('fs');
const html=fs.readFileSync(require('path').join(__dirname,'..','index.html'),'utf8');
const dom=new JSDOM(html,{runScripts:'dangerously',url:'https://x.test/',pretendToBeVisual:true,beforeParse(w){ w.scrollTo=()=>{}; w.Element.prototype.scrollIntoView=function(){}; }});
setTimeout(()=>{ const w=dom.window; console.log(w.eval('TRAD[0][0]+" | "+TRAD[51][0]+" | "+STORIA[6].text.match(/\\[\\[binario\\|[^\\]]+\\]\\]/)[0]+" | "+UNITS.find(u=>u.id===8).sub')); process.exit(0); },300);
