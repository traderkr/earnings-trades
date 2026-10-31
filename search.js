(function(){const inp=document.getElementById("q"),clr=document.getElementById("qclear");if(!inp)return;let t;
function apply(push){window.searchQ=inp.value;clr.hidden=!inp.value;const u=new URL(location.href);inp.value?u.searchParams.set("q",inp.value):u.searchParams.delete("q");history.replaceState(null,"",u);window.onSearch&&window.onSearch(inp.value);window.redrawNotes&&window.redrawNotes()}
window.clearSearch=function(){inp.value="";apply();inp.focus()};
inp.addEventListener("input",()=>{clearTimeout(t);t=setTimeout(apply,150)});clr.onclick=window.clearSearch;
inp.addEventListener("keydown",e=>{if(e.key=="Escape"){inp.value="";apply();inp.blur()}});
document.addEventListener("keydown",e=>{if(e.key=="/"&&document.activeElement!==inp&&!/input|select|textarea/i.test(document.activeElement.tagName)){e.preventDefault();inp.focus()}});
const sb=document.getElementById("qbtn");sb&&(sb.onclick=()=>{inp.focus();inp.scrollIntoView({block:"nearest"})});
const q0=new URLSearchParams(location.search).get("q");if(q0){inp.value=q0}window.searchQ=inp.value;clr.hidden=!inp.value})();
(function(){const top=()=>{scrollTo({top:0,behavior:"smooth"});if(location.hash)history.replaceState(null,"",location.pathname+location.search)};
const b=document.getElementById("totop");if(b){b.onclick=top;const f=()=>{b.hidden=scrollY<innerHeight*.9};addEventListener("scroll",f,{passive:true});f()}
const onIndex=!/notes\.html$/.test(location.pathname);
const lg=document.getElementById("logo");lg&&lg.addEventListener("click",e=>{e.preventDefault();top()});
if(onIndex){const ft=document.querySelector('.tabs a[href="#feed"]');ft&&ft.addEventListener("click",e=>{e.preventDefault();top()})}})();
