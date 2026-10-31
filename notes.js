(function(){const esc=s=>String(s??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
const slug=s=>String(s).toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-|-$/g,"");
function inline(t){let h=esc(t);h=h.replace(/\*\*(.+?)\*\*/g,"<b>$1</b>");
h=h.replace(/\[([^\]]+)\]\(([^)\s]+)\)/g,(m,l,u)=>/^(https?:\/\/|[\w.\-\/]+(#[\w-]*)?$|#)/i.test(u.replace(/&amp;/g,"&"))&&!/^javascript:/i.test(u)?`<a href="${u}" rel="noopener">${l}</a>`:m);
return h}
function body(b){return String(b||"").split(/\n\s*\n/).map(p=>{const ls=p.split("\n");if(ls.every(l=>l.trim().startsWith("- ")))return"<ul>"+ls.map(l=>"<li>"+inline(l.trim().slice(2))+"</li>").join("")+"</ul>";
let out="",buf=[];ls.forEach(l=>{if(l.trim().startsWith("- ")){if(buf.length){out+="<p>"+buf.map(inline).join("<br>")+"</p>";buf=[]}out+="<ul><li>"+inline(l.trim().slice(2))+"</li></ul>"}else buf.push(l)});if(buf.length)out+="<p>"+buf.map(inline).join("<br>")+"</p>";return out.replace(/<\/ul><ul>/g,"")}).join("")}
window.renderNotes=function(el,limit){fetch("notes.json").then(r=>r.json()).then(ns=>{ns=[...ns].sort((a,b)=>String(b.date).localeCompare(String(a.date)));const show=limit?ns.slice(0,limit):ns;
el.innerHTML=show.length?show.map(n=>{const id="note-"+slug(n.date)+"-"+slug(n.title);return`<article class="note" id="${id}"><div class="muted small"><a href="notes.html#${id}">${esc(n.date)}</a>${n.ticker?` <span class="tag">${esc(n.ticker)}</span>`:""}</div><h3>${esc(n.title)}</h3>${body(n.body)}</article>`}).join("")+(limit&&ns.length>limit?`<p><a href="notes.html">All ${ns.length} notes →</a></p>`:""):"<p class='muted'>No notes yet.</p>";
if(location.hash){const t=document.getElementById(location.hash.slice(1));t&&t.scrollIntoView()}}).catch(e=>{el.textContent="Failed to load notes.json: "+e})};
window._notesBody=body})();
