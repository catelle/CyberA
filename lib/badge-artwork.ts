import { join } from "path";
import * as PImage from "pureimage";
import { PassThrough } from "stream";

const BRAND_RED = "#BD0F43";
const BRAND_RED_DARK = "#8F0B32";
const BRAND_PINK = "#F7C8D4";
const BRAND_INK = "#111827";

const regularFont = PImage.registerFont(join(process.cwd(), "public/fonts/DejaVuSans.ttf"), "CyberA Regular");
const boldFont = PImage.registerFont(join(process.cwd(), "public/fonts/DejaVuSans-Bold.ttf"), "CyberA Bold");
regularFont.loadSync();
boldFont.loadSync();

function centeredText(ctx: PImage.Context, text: string, y: number, size: number, color: string, family = "CyberA Bold") {
  ctx.font = `${size}px '${family}'`;
  ctx.fillStyle = color;
  ctx.textAlign = "center";
  ctx.fillText(text, 400, y);
}

function wrapText(ctx: PImage.Context, text: string, maxWidth: number) {
  const words = text.trim().split(/\s+/);
  const lines: string[] = [];
  let current = "";
  for (const word of words) {
    const candidate = current ? `${current} ${word}` : word;
    if (ctx.measureText(candidate).width <= maxWidth || !current) current = candidate;
    else {
      lines.push(current);
      current = word;
    }
  }
  if (current) lines.push(current);
  return lines;
}

function shieldPath(ctx: PImage.Context, inset = 0) {
  const left = 68 + inset;
  const right = 732 - inset;
  const top = 45 + inset;
  const shoulder = 196 + inset * 0.45;
  const bottom = 755 - inset;
  ctx.beginPath();
  ctx.moveTo(400, top);
  ctx.lineTo(right, shoulder);
  ctx.lineTo(right, 391);
  ctx.bezierCurveTo(right, 570, 620, 690, 400, bottom);
  ctx.bezierCurveTo(180, 690, left, 570, left, 391);
  ctx.lineTo(left, shoulder);
  ctx.closePath();
}

function star(ctx: PImage.Context, x: number, y: number, outer: number, inner: number) {
  ctx.beginPath();
  for (let point = 0; point < 10; point += 1) {
    const radius = point % 2 === 0 ? outer : inner;
    const angle = -Math.PI / 2 + (point * Math.PI) / 5;
    const px = x + Math.cos(angle) * radius;
    const py = y + Math.sin(angle) * radius;
    if (point === 0) ctx.moveTo(px, py);
    else ctx.lineTo(px, py);
  }
  ctx.closePath();
  ctx.fill();
}

export async function createBadgePng({ badgeName: _badgeName, moduleTitle }: { badgeName: string; moduleTitle: string }) {
  const image = PImage.make(800, 800);
  const ctx = image.getContext("2d");

  shieldPath(ctx);
  ctx.fillStyle = BRAND_RED;
  ctx.fill();
  shieldPath(ctx, 21);
  ctx.strokeStyle = "#FFFFFF";
  ctx.lineWidth = 13;
  ctx.stroke();

  centeredText(ctx, "SYKOTI", 190, 63, "#FFFFFF");
  centeredText(ctx, "C E N T E R", 235, 27, "#FFFFFF", "CyberA Regular");

  ctx.beginPath();
  ctx.moveTo(38, 306);
  ctx.lineTo(762, 306);
  ctx.lineTo(762, 400);
  ctx.bezierCurveTo(760, 454, 746, 500, 720, 546);
  ctx.lineTo(80, 546);
  ctx.bezierCurveTo(54, 500, 40, 454, 38, 400);
  ctx.closePath();
  ctx.fillStyle = "#FFFFFF";
  ctx.fill();
  ctx.strokeStyle = BRAND_RED_DARK;
  ctx.lineWidth = 8;
  ctx.stroke();

  ctx.font = "42px 'CyberA Bold'";
  let moduleLines = wrapText(ctx, moduleTitle.toLocaleUpperCase("fr"), 610).slice(0, 3);
  let moduleSize = 42;
  if (moduleLines.length > 2) {
    moduleSize = 34;
    ctx.font = `${moduleSize}px 'CyberA Bold'`;
    moduleLines = wrapText(ctx, moduleTitle.toLocaleUpperCase("fr"), 610).slice(0, 3);
  }
  const lineHeight = moduleSize + 9;
  const firstLineY = 415 - ((moduleLines.length - 1) * lineHeight) / 2;
  moduleLines.forEach((line, index) => centeredText(ctx, line, firstLineY + index * lineHeight, moduleSize, BRAND_INK));

  centeredText(ctx, "CERTIFICATE OF", 610, 29, "#FFFFFF", "CyberA Regular");
  centeredText(ctx, "COMPLETION", 648, 35, "#FFFFFF");
  ctx.fillStyle = BRAND_PINK;
  star(ctx, 400, 700, 24, 11);

  const stream = new PassThrough();
  const chunks: Buffer[] = [];
  stream.on("data", (chunk: Buffer) => chunks.push(chunk));
  await PImage.encodePNGToStream(image, stream);
  return Buffer.concat(chunks);
}
