// Shareable "proof card" — a receipt-style PNG of a verification, drawn client-side on a
// canvas (no server). Download or copy-to-clipboard for X / Reddit / Discord.

const PAPER = '#faf6ec', INK = '#241f17', SOFT = '#6b6354', FAINT = '#b8b0a0';
const OK = '#0a7d4f', BAD = '#bb2f1f', MONO = "ui-monospace, 'JetBrains Mono', 'Courier New', monospace";

function ticketId(seed) {
  const s = String(seed || 'faircheck');
  let n = 0;
  for (let i = 0; i < s.length; i++) n = (n * 31 + s.charCodeAt(i)) >>> 0;
  return 'FC-' + n.toString(36).toUpperCase().padStart(6, '0').slice(0, 6);
}

function dottedLine(ctx, x1, x2, y) {
  ctx.save();
  ctx.strokeStyle = FAINT; ctx.lineWidth = 1; ctx.setLineDash([2, 4]);
  ctx.beginPath(); ctx.moveTo(x1, y); ctx.lineTo(x2, y); ctx.stroke();
  ctx.restore();
}

function punchEdges(ctx, w, h) {
  ctx.save();
  ctx.globalCompositeOperation = 'destination-out';
  ctx.fillStyle = '#000';
  const step = 16, d = 7;
  ctx.beginPath();
  for (let x = 0; x <= w; x += step) {
    ctx.moveTo(x, 0); ctx.lineTo(x + step / 2, d); ctx.lineTo(x + step, 0);          // top notches
    ctx.moveTo(x, h); ctx.lineTo(x + step / 2, h - d); ctx.lineTo(x + step, h);       // bottom notches
  }
  ctx.fill();
  ctx.restore();
}

function barcode(ctx, x, y, w, h, seed) {
  const s = String(seed || '') + 'barcode';
  let cur = x;
  ctx.fillStyle = INK;
  let i = 0;
  while (cur < x + w) {
    const c = s.charCodeAt(i % s.length) || 5;
    const bw = 1 + (c % 4);
    if (i % 2 === 0) ctx.fillRect(cur, y, bw, h);
    cur += bw;
    i++;
  }
}

function stamp(ctx, cx, cy, text, color) {
  ctx.save();
  ctx.translate(cx, cy);
  ctx.rotate(-0.14);
  ctx.globalAlpha = 0.92;
  ctx.strokeStyle = color; ctx.lineWidth = 2.5;
  const w = 188, h = 52;
  ctx.strokeRect(-w / 2, -h / 2, w, h);
  ctx.strokeRect(-w / 2 + 4, -h / 2 + 4, w - 8, h - 8);
  ctx.fillStyle = color;
  ctx.font = `700 21px ${MONO}`;
  ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
  ctx.fillText(text, 0, 1);
  ctx.restore();
}

/** Draw the proof card. data = { casino, game, resultLabel, result, verified, rows:[[k,v]], permalink, seed } */
export function drawProofCard(canvas, data) {
  const W = 760, H = 470, S = 2;
  canvas.width = W * S; canvas.height = H * S;
  const ctx = canvas.getContext('2d');
  ctx.scale(S, S);
  ctx.textBaseline = 'alphabetic';

  // paper + perforated top/bottom edges (real transparent notches)
  ctx.fillStyle = PAPER; ctx.fillRect(0, 0, W, H);
  punchEdges(ctx, W, H);

  const padX = 40;
  let y = 46;

  // header
  ctx.fillStyle = INK; ctx.textAlign = 'left';
  ctx.font = `700 26px ${MONO}`;
  ctx.fillText('FAIRCHECK', padX, y);
  ctx.fillStyle = SOFT; ctx.font = `500 12px ${MONO}`;
  ctx.textAlign = 'right';
  ctx.fillText('PROVABLY-FAIR RECEIPT', W - padX, y - 12);
  ctx.fillText(ticketId(data.seed), W - padX, y + 4);
  ctx.textAlign = 'left';

  y += 16; dottedLine(ctx, padX, W - padX, y); y += 26;

  // meta rows
  ctx.font = `400 13px ${MONO}`;
  const row = (k, v) => {
    ctx.fillStyle = SOFT; ctx.textAlign = 'left'; ctx.fillText(k.toUpperCase(), padX, y);
    ctx.fillStyle = INK; ctx.textAlign = 'right'; ctx.fillText(v, W - padX, y);
    ctx.textAlign = 'left'; y += 23;
  };
  row('Casino', data.casino || '—');
  row('Game', data.game || '—');
  for (const [k, v] of (data.rows || [])) row(k, v);

  y += 4; dottedLine(ctx, padX, W - padX, y); y += 40;

  // big result
  ctx.fillStyle = SOFT; ctx.font = `500 13px ${MONO}`;
  ctx.fillText((data.resultLabel || 'Result').toUpperCase(), padX, y - 30);
  ctx.fillStyle = INK; ctx.font = `700 48px ${MONO}`;
  ctx.fillText(String(data.result || ''), padX, y);

  // verdict stamp
  if (data.verified === true) stamp(ctx, W - 150, y - 30, '✓ VERIFIED', OK);
  else if (data.verified === false) stamp(ctx, W - 150, y - 30, '✗ MISMATCH', BAD);
  else stamp(ctx, W - 150, y - 30, '✓ RECOMPUTED', INK);

  y += 34; dottedLine(ctx, padX, W - padX, y); y += 22;

  // barcode + verify line
  barcode(ctx, padX, y, 220, 34, data.seed || data.permalink);
  ctx.fillStyle = SOFT; ctx.font = `400 12px ${MONO}`;
  ctx.textAlign = 'right';
  ctx.fillText('verify it yourself →', W - padX, y + 12);
  ctx.fillStyle = INK; ctx.font = `600 13px ${MONO}`;
  ctx.fillText('faircheck.my-monkey.fr', W - padX, y + 30);
  ctx.textAlign = 'left';

  return canvas;
}

export function proofBlob(data) {
  const canvas = document.createElement('canvas');
  drawProofCard(canvas, data);
  return new Promise((resolve) => canvas.toBlob((b) => resolve(b), 'image/png'));
}

export async function downloadProof(data) {
  const blob = await proofBlob(data);
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url; a.download = `faircheck-${(data.game || 'proof').toLowerCase()}.png`;
  a.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

export async function copyProof(data) {
  const blob = await proofBlob(data);
  if (navigator.clipboard && window.ClipboardItem) {
    await navigator.clipboard.write([new window.ClipboardItem({ 'image/png': blob })]);
    return true;
  }
  return false;
}
