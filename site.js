(function(){
var STREAM_URL="";/* paste your Icecast / AzuraCast / Live365 stream URL here */
var SOCIAL=[["TikTok","https://www.tiktok.com/"],["Instagram","https://www.instagram.com/"],["YouTube","https://www.youtube.com/"]];
var SHOWS=[{n:"Zero Hour",d:"The opening show. New sounds and live chat.",day:"Mon–Fri",t:"7 PM",h:"Zero"},{n:"Late Signal",d:"Slow, late-night picks.",day:"Fri",t:"11 PM",h:"Guest DJ"},{n:"Request Line",d:"Your songs, your dedications.",day:"Sat",t:"3 PM",h:"Zero"},{n:"Sunday Drift",d:"Calm tracks to end the week.",day:"Sun",t:"6 PM",h:"Guest DJ"}];
var DJS=[{n:"Zero",r:"Founder and host"},{n:"Guest DJ",r:"Open slot"},{n:"Your name here",r:"Apply under Contact"}];
function $(i){return document.getElementById(i)}
function add(p,h){if(p)p.insertAdjacentHTML("beforeend",h)}
SHOWS.forEach(function(s){add($("sch"),"<tr><td>"+s.day+"</td><td>"+s.t+"</td><td>"+s.n+"</td><td>"+s.h+"</td></tr>");add($("shw"),'<div class="card"><h3>'+s.n+'</h3><p class="muted" style="margin:6px 0 0">'+s.d+'</p></div>')});
DJS.forEach(function(j){add($("djg"),'<div class="card"><h3>'+j.n+'</h3><p class="muted" style="margin:6px 0 0">'+j.r+'</p></div>')});
SOCIAL.forEach(function(s){add($("soc"),'<a class="btn alt" target="_blank" rel="noopener" href="'+s[1]+'">'+s[0]+'</a>')});
for(var i=0;i<24;i++)add($("bars"),'<i style="animation-delay:-'+(Math.random()*1).toFixed(2)+'s;animation-duration:'+(.5+Math.random()*.9).toFixed(2)+'s"></i>');
var ac,timer,audio,on=false,btn=$("play");
function hz(m){return 440*Math.pow(2,(m-69)/12)}
function tone(m,t,d,ty,v,c){var o=ac.createOscillator(),g=ac.createGain(),f=ac.createBiquadFilter();o.type=ty;o.frequency.value=hz(m);f.type="lowpass";f.frequency.value=c;g.gain.setValueAtTime(0,t);g.gain.linearRampToValueAtTime(v,t+.15);g.gain.linearRampToValueAtTime(0,t+d);o.connect(f);f.connect(g);g.connect(ac.destination);o.start(t);o.stop(t+d+.05)}
function sampler(){var ch=[[48,55,59,64],[45,52,57,60],[50,57,60,65],[43,50,55,59]],i=0;function go(){var t=ac.currentTime+.1;ch[i%4].forEach(function(m){tone(m,t,2.6,"triangle",.07,900)});tone(ch[i%4][0]-12,t,1.2,"sine",.12,400);i++}go();return setInterval(go,2400)}
function set(v){on=v;btn.textContent=v?"Pause":"Play";btn.setAttribute("aria-pressed",v);$("player").classList.toggle("on",v);document.body.classList.toggle("on",v)}
if(btn)btn.onclick=function(){
if(on){if(STREAM_URL)audio.pause();else{clearInterval(timer);ac.suspend()}set(false);return}
if(STREAM_URL){audio=audio||new Audio(STREAM_URL);audio.play().catch(function(){$("by").textContent="Stream could not start"});$("now").textContent="ZeroFM Live";$("by").textContent="Streaming worldwide"}
else{ac=ac||new (window.AudioContext||window.webkitAudioContext)();ac.resume();timer=sampler()}
set(true)};
var hb=document.querySelector("#home .bars");
function sub(f,ok,msg){if(!f)return;f.addEventListener("submit",function(e){e.preventDefault();$(ok).textContent=msg;f.reset()})}
sub($("req"),"ok","Request sent. Thanks!");sub($("ct"),"ok2","Message sent. We will reply soon.");
document.body.addEventListener("click",function(){});
})();
if("serviceWorker" in navigator)addEventListener("load",function(){navigator.serviceWorker.register("sw.js").catch(function(){})});
