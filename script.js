// Reception countdown: midnight at the start of 10 April 2027, Chennai time.
const target = new Date("2027-04-10T00:00:00+05:30").getTime();
function tick() {
  const distance = target - Date.now();
  if (distance <= 0) {
    ["days","hours","minutes","seconds"].forEach(id => document.getElementById(id).textContent = "00");
    document.getElementById("countdown-note").textContent = "Our reception day is here. Let the celebrations begin!";
    return;
  }
  const values = [
    Math.floor(distance / 86400000),
    Math.floor(distance / 3600000) % 24,
    Math.floor(distance / 60000) % 60,
    Math.floor(distance / 1000) % 60
  ];
  ["days","hours","minutes","seconds"].forEach((id, i) => document.getElementById(id).textContent = String(values[i]).padStart(2,"0"));
}
tick(); setInterval(tick,1000);

// Scratch-to-reveal interaction. Supports mouse, touch and stylus.
const canvas = document.getElementById("scratch-canvas");
const ctx = canvas.getContext("2d", { willReadFrequently: true });
const wrap = document.getElementById("scratch-wrap");
let drawing = false, revealed = false;
function paintGold() {
  const rect = wrap.getBoundingClientRect();
  const dpr = window.devicePixelRatio || 1;
  canvas.width = Math.round(rect.width * dpr);
  canvas.height = Math.round(rect.height * dpr);
  canvas.style.width = rect.width + "px";
  canvas.style.height = rect.height + "px";
  ctx.setTransform(dpr,0,0,dpr,0,0);
  const grad = ctx.createLinearGradient(0,0,rect.width,rect.height);
  grad.addColorStop(0,"#b4863e"); grad.addColorStop(.48,"#efd99d"); grad.addColorStop(1,"#b88d4d");
  ctx.globalCompositeOperation = "source-over";
  ctx.fillStyle = grad; ctx.fillRect(0,0,rect.width,rect.height);
  ctx.strokeStyle = "rgba(104,72,34,.65)"; ctx.lineWidth = 1.5; ctx.strokeRect(12,12,rect.width-24,rect.height-24);
  ctx.globalCompositeOperation = "destination-out";
}
function revealAll() {
  revealed = true;
  ctx.clearRect(0,0,canvas.width,canvas.height);
  document.getElementById("scratch-prompt").style.display = "none";
  document.getElementById("scratch-help").textContent = "Your special dates are revealed!";
}
function scratchAt(e) {
  const r = canvas.getBoundingClientRect();
  const x = e.clientX-r.left, y = e.clientY-r.top;
  ctx.beginPath(); ctx.arc(x,y,22,0,Math.PI*2); ctx.fill();
  const pixels = ctx.getImageData(0,0,canvas.width,canvas.height).data;
  let clear=0, total=0;
  for(let i=3;i<pixels.length;i+=32){total++;if(pixels[i]<40)clear++;}
  if(total && clear/total>.43) revealAll();
}
canvas.addEventListener("pointerdown",e=>{if(revealed)return;drawing=true;canvas.setPointerCapture(e.pointerId);scratchAt(e)});
canvas.addEventListener("pointermove",e=>{if(drawing&&!revealed)scratchAt(e)});
canvas.addEventListener("pointerup",()=>drawing=false);
canvas.addEventListener("pointercancel",()=>drawing=false);
document.getElementById("reveal-dates").addEventListener("click",revealAll);
paintGold();
window.addEventListener("resize",()=>{if(!revealed)paintGold()});

// Share button: native share on supported phones, otherwise copy invitation text.
document.getElementById("share-invite").addEventListener("click",async()=>{
  const data={title:"Aarthi & Sanjay — Wedding Invitation",text:"We warmly invite you to celebrate with us! Reception: Saturday, 10 April 2027. Wedding: Sunday, 11 April 2027. Venue: RS Mahal, Gerugambakkam, Chennai."};
  const status=document.getElementById("share-status");
  try{
    if(navigator.share) await navigator.share(data);
    else if(navigator.clipboard){await navigator.clipboard.writeText(data.text);status.textContent="Invitation details copied. Paste them into WhatsApp to share.";}
    else status.textContent=data.text;
  }catch(err){if(err.name!=="AbortError")status.textContent="Sharing is unavailable in this browser.";}
});

// Add your real Google Drive / photo album URL here before publishing.
// Example: const SHARE_ALBUM_URL = "https://drive.google.com/drive/folders/your-folder-id";
const SHARE_ALBUM_URL = "";
const memoryLink=document.getElementById("memory-link");
memoryLink.addEventListener("click",e=>{
  if(!SHARE_ALBUM_URL){e.preventDefault();document.getElementById("memory-note").textContent="To activate photo uploads, add your Google Drive shared-folder link in script.js. Then the button and QR can open that folder.";return;}
  memoryLink.href=SHARE_ALBUM_URL; memoryLink.target="_blank"; memoryLink.rel="noopener";
});
