(function(){const esc=s=>String(s??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
const slug=s=>String(s).toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-|-$/g,"");
function inline(t){let h=esc(t);h=h.replace(/\*\*(.+?)\*\*/g,"<b>$1</b>");
h=h.replace(/\[([^\]]+)\]\(([^)\s]+)\)/g,(m,l,u)=>/^(https?:\/\/|[\w.\-\/]+(#[\w-]*)?$|#)/i.test(u.replace(/&amp;/g,"&"))&&!/^javascript:/i.test(u)?`<a href="${u}" rel="noopener">${l}</a>`:m);
return h}
function body(b){return String(b||"").split(/\n\s*\n/).map(p=>{const ls=p.split("\n");if(ls.every(l=>l.trim().startsWith("- ")))return"<ul>"+ls.map(l=>"<li>"+inline(l.trim().slice(2))+"</li>").join("")+"</ul>";
let out="",buf=[];ls.forEach(l=>{if(l.trim().startsWith("- ")){if(buf.length){out+="<p>"+buf.map(inline).join("<br>")+"</p>";buf=[]}out+="<ul><li>"+inline(l.trim().slice(2))+"</li></ul>"}else buf.push(l)});if(buf.length)out+="<p>"+buf.map(inline).join("<br>")+"</p>";return out.replace(/<\/ul><ul>/g,"")}).join("")}
let _ns=null,_el=null,_lim=0;
function nmatch(x,q){if(!q)return 1;const t=String(x.ticker||"").toLowerCase();if(t&&t==q)return 3;if(t&&t.startsWith(q))return 2;return (x.title+" "+x.ticker+" "+x.body+" "+x.date).toLowerCase().includes(q)?1:0}
function draw(){if(!_el||!_ns)return;const q=(window.searchQ||"").trim().toLowerCase();let ns=_ns.map(x=>[x,nmatch(x,q)]).filter(a=>a[1]>0).sort((a,b)=>b[1]-a[1]||String(b[0].date).localeCompare(String(a[0].date))).map(a=>a[0]);
const show=_lim?ns.slice(0,_lim):ns;window.notesCount=ns.length;
_el.innerHTML=show.length?show.map(n=>{const id="note-"+slug(n.date)+"-"+slug(n.title);return`<article class="note" id="${id}"><div class="muted small"><a href="notes.html#${id}">${esc(n.date)}</a>${n.ticker?` <span class="tag"><a class="tvl" href="https://www.tradingview.com/chart/?symbol=${encodeURIComponent(String(n.ticker).replace(/-/g,"."))}" target="_blank" rel="noopener">${esc(n.ticker)}</a></span>`:""}</div><h3>${esc(n.title)}</h3>${body(n.body)}</article>`}).join("")+(_lim&&ns.length>_lim?`<p><a href="notes.html">All ${ns.length} notes →</a></p>`:""):`<p class='muted'>${q?"No matching notes.":"No notes yet."}</p>`;
window.onNotesDrawn&&window.onNotesDrawn()}
window.renderNotes=function(el,limit){if(!el)return;_el=el;_lim=limit||0;fetch("notes.json?v="+Date.now(),{cache:"no-store"}).then(r=>r.json()).then(ns=>{_ns=ns;draw();
if(location.hash){const t=document.getElementById(location.hash.slice(1));t&&t.scrollIntoView()}}).catch(e=>{console.error(e);el.innerHTML="<p class='muted small'>Notes didn't load. Pull to refresh.</p>"})};
window.redrawNotes=draw;
window._notesBody=body})();
