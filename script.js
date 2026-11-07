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

// Scratch-to-reveal interaction. The gold and its lettering are painted on
// the canvas itself so every scratch visibly uncovers the dates beneath it.
const canvas = document.getElementById("scratch-canvas");
const ctx = canvas.getContext("2d", { willReadFrequently: true });
const wrap = document.getElementById("scratch-wrap");
const help = document.getElementById("scratch-help");
let drawing = false, revealed = false, lastPoint = null, moveCount = 0;
function paintGold() {
  if (revealed) return;
  const rect = wrap.getBoundingClientRect();
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  canvas.width = Math.round(rect.width * dpr);
  canvas.height = Math.round(rect.height * dpr);
  canvas.style.width = rect.width + "px";
  canvas.style.height = rect.height + "px";
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  const grad = ctx.createLinearGradient(0, 0, rect.width, rect.height);
  grad.addColorStop(0, "#b4863e"); grad.addColorStop(.48, "#efd99d"); grad.addColorStop(1, "#b88d4d");
  ctx.globalCompositeOperation = "source-over";
  ctx.fillStyle = grad; ctx.fillRect(0, 0, rect.width, rect.height);
  ctx.strokeStyle = "rgba(104,72,34,.65)"; ctx.lineWidth = 1.5;
  ctx.strokeRect(12, 12, rect.width - 24, rect.height - 24);
  ctx.textAlign = "center"; ctx.textBaseline = "middle"; ctx.fillStyle = "#6e4b32";
  ctx.font = "500 27px Georgia, serif";
  ctx.fillText("A little golden secret", rect.width / 2, rect.height / 2 - 30);
  ctx.font = "16px Georgia, serif";
  ctx.fillText("Scratch here to discover our dates", rect.width / 2, rect.height / 2 + 5);
  ctx.font = "24px Georgia, serif";
  ctx.fillText("✦", rect.width / 2, rect.height / 2 + 47);
  ctx.globalCompositeOperation = "destination-out";
}
function revealAll() {
  if (revealed) return;
  revealed = true; drawing = false; lastPoint = null;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  help.textContent = "Your special dates are revealed!";
  canvas.style.pointerEvents = "none";
}
function pointFromEvent(e) {
  const r = canvas.getBoundingClientRect();
  return { x: e.clientX - r.left, y: e.clientY - r.top };
}
function scratchAt(point) {
  ctx.save();
  ctx.globalCompositeOperation = "destination-out";
  ctx.lineCap = "round"; ctx.lineJoin = "round"; ctx.lineWidth = 48;
  if (lastPoint) {
    ctx.beginPath(); ctx.moveTo(lastPoint.x, lastPoint.y); ctx.lineTo(point.x, point.y); ctx.stroke();
  }
  ctx.beginPath(); ctx.arc(point.x, point.y, 25, 0, Math.PI * 2); ctx.fill();
  ctx.restore();
  lastPoint = point;
  moveCount++;
  // Check progress periodically rather than reading the full canvas on every move.
  if (moveCount % 8 === 0) {
    const pixels = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
    let clear = 0, total = 0;
    const step = 4 * 32;
    for (let i = 3; i < pixels.length; i += step) { total++; if (pixels[i] < 40) clear++; }
    if (total && clear / total > .38) revealAll();
  }
}
canvas.addEventListener("pointerdown", e => {
  if (revealed || (e.pointerType === "mouse" && e.button !== 0)) return;
  e.preventDefault(); drawing = true; lastPoint = null;
  canvas.setPointerCapture(e.pointerId);
  scratchAt(pointFromEvent(e));
  help.textContent = "Keep going — the dates are appearing underneath!";
});
canvas.addEventListener("pointermove", e => {
  if (!drawing || revealed) return;
  e.preventDefault(); scratchAt(pointFromEvent(e));
});
function stopScratch() { drawing = false; lastPoint = null; }
canvas.addEventListener("pointerup", stopScratch);
canvas.addEventListener("pointercancel", stopScratch);
canvas.addEventListener("lostpointercapture", stopScratch);
document.getElementById("reveal-dates").addEventListener("click", revealAll);
paintGold();
let resizeFrame;
window.addEventListener("resize", () => {
  cancelAnimationFrame(resizeFrame);
  resizeFrame = requestAnimationFrame(() => { if (!revealed && !drawing) paintGold(); });
});

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

// Invitation cover: open the card to reveal the website.
const invitationOverlay = document.getElementById("invitation-overlay");
const openInvitation = document.getElementById("open-invitation");
if (invitationOverlay && openInvitation) {
  openInvitation.addEventListener("click", () => {
    invitationOverlay.classList.add("is-hidden");
    history.replaceState(null, "", location.pathname + location.search + "#home");
  });
}
