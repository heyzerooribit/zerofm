(function(){
var C=window.CARDS,KEY="zerofm_cards_v1",W={common:65,rare:22,epic:8,legendary:4,holo_secret:1},CD=36e5,S={own:{},last:0,packs:0};
try{var r=JSON.parse(localStorage.getItem(KEY));if(r&&r.own)S=r}catch(e){}
function g(i){return document.getElementById(i)}
function save(){try{localStorage.setItem(KEY,JSON.stringify(S))}catch(e){}}
function pad(n){return("00"+n).slice(-3)}
function nice(r){return r==="holo_secret"?"Holo Secret":r.charAt(0).toUpperCase()+r.slice(1)}
function pick(min){var pool=min?["rare","epic","legendary","holo_secret"]:Object.keys(W),t=0,x,k,l;pool.forEach(function(p){t+=W[p]});x=Math.random()*t;for(var i=0;i<pool.length;i++){x-=W[pool[i]];if(x<0){k=pool[i];break}}l=C.filter(function(c){return c.rarity===k});return l.length?l[Math.floor(Math.random()*l.length)]:pick(min)}
function binder(){var b=g("bind"),n=0;b.innerHTML="";C.forEach(function(c){var q=S.own[c.number]||0,s=document.createElement("button");s.className="slot r-"+c.rarity+(q?"":" miss");if(q){n++;s.setAttribute("aria-label",c.name+", "+nice(c.rarity));s.innerHTML='<img alt="'+c.name+'" src="'+c.img+'">'+(q>1?'<span class="q">\u00d7'+q+'</span>':"");s.onclick=function(){view(c)}}else{s.setAttribute("aria-label","Card "+c.number+" not collected yet");s.innerHTML='<span class="no">#'+pad(c.number)+'</span>'}b.appendChild(s)});g("cnt").textContent=n+" / "+C.length}
function tick(){var left=S.last+CD-Date.now(),b=g("open");if(left>0){var m=Math.floor(left/6e4),s=Math.floor(left%6e4/1e3);b.disabled=true;b.style.opacity=.5;b.textContent=("0"+m).slice(-2)+":"+("0"+s).slice(-2);g("pk").textContent="Next free pack in "+m+"m "+s+"s \u00b7 "+S.packs+" opened"}else{b.disabled=false;b.style.opacity=1;b.textContent="Open a pack";g("pk").textContent="A free pack is ready \u00b7 "+S.packs+" opened"}}
var flipped=0,openEl=null;
function showOv(el){openEl=el;el.hidden=false;var f=el.querySelector("button");if(f)f.focus()}
function hideOv(el){el.hidden=true;if(openEl===el)openEl=null}
g("open").onclick=function(){
if(S.last+CD>Date.now())return;
var pack=[pick(),pick(),pick(),pick(),pick(true)],h=g("hand");h.innerHTML="";flipped=0;
pack.forEach(function(c){S.own[c.number]=(S.own[c.number]||0)+1;var b=document.createElement("button");b.className="fl r-"+c.rarity;b.setAttribute("aria-label","Face-down card. Tap to reveal.");b.innerHTML='<div class="fi"><div class="fa">ZERO</div><div class="fb"><img alt="'+c.name+'" src="'+c.img+'"></div></div>';b.onclick=function(){if(b.classList.contains("f"))return;b.classList.add("f");b.setAttribute("aria-label",c.name+", "+nice(c.rarity));flipped++;if(flipped===5)g("hint").textContent="Added to your binder."};h.appendChild(b)});
S.last=Date.now();S.packs++;save();binder();tick();
var ov=g("ov"),pk=g("pack"),fx=g("fx"),ctl=g("ctl"),red=window.matchMedia&&matchMedia("(prefers-reduced-motion:reduce)").matches;
function reveal(){pk.hidden=true;h.style.display="";ctl.style.display="";g("hint").textContent="Tap each card to reveal it.";[].forEach.call(h.children,function(b,i){b.style.animationDelay=i*.12+"s"});h.classList.add("deal");var f=h.querySelector("button");if(f)f.focus()}
ov.hidden=false;openEl=ov;
if(red){reveal();return}
h.style.display="none";ctl.style.display="none";h.classList.remove("deal");g("hint").textContent="Opening…";pk.hidden=false;pk.className="pack";void pk.offsetWidth;pk.classList.add("shake");
setTimeout(function(){pk.classList.add("tear");fx.classList.remove("go");void fx.offsetWidth;fx.classList.add("go")},950);
setTimeout(reveal,1350)};
g("rev").onclick=function(){[].forEach.call(g("hand").children,function(b){if(!b.classList.contains("f"))b.click()})};
g("cls").onclick=function(){hideOv(g("ov"));g("open").focus()};
function view(c){var v=g("vwin");v.innerHTML='<div class="big r-'+c.rarity+'" id="big"><img alt="'+c.name+'" src="'+c.img+'"><i class="sheen"></i></div><p class="cap"><b>'+c.name+'</b><small>#'+pad(c.number)+" \u00b7 "+nice(c.rarity)+" \u00b7 "+c.type+'</small></p><button class="btn" id="vc">Close</button>';
var b=g("big");b.onpointermove=function(e){var r=b.getBoundingClientRect(),x=(e.clientX-r.left)/r.width,y=(e.clientY-r.top)/r.height;b.style.transform="perspective(700px) rotateY("+(x-.5)*24+"deg) rotateX("+(.5-y)*24+"deg)";b.style.setProperty("--x",x*100+"%");b.style.setProperty("--y",y*100+"%")};b.onpointerleave=function(){b.style.transform="";b.style.setProperty("--x","50%");b.style.setProperty("--y","50%")};
g("vc").onclick=function(){hideOv(g("vw"))};showOv(g("vw"))}
g("vw").addEventListener("click",function(e){if(e.target===g("vw"))hideOv(g("vw"))});
document.addEventListener("keydown",function(e){if(e.key==="Escape"&&openEl)hideOv(openEl)});
binder();tick();setInterval(tick,1000);
})();
