import { createReadStream } from "fs";
import { join } from "path";
import * as PImage from "pureimage";
import { PassThrough } from "stream";

const BRAND_RED = "#BD0F43";
const BRAND_PINK = "#F7C8D4";
const BRAND_INK = "#111827";
const BRAND_MUTED = "#667085";

const regularFont = PImage.registerFont(
  join(process.cwd(), "public/fonts/DejaVuSans.ttf"),
  "CyberA Regular"
);
const boldFont = PImage.registerFont(
  join(process.cwd(), "public/fonts/DejaVuSans-Bold.ttf"),
  "CyberA Bold"
);
regularFont.loadSync();
boldFont.loadSync();

function circle(
  ctx: PImage.Context,
  x: number,
  y: number,
  radius: number,
  color: string
) {
  ctx.beginPath();
  ctx.arc(x, y, radius, 0, Math.PI * 2);
  ctx.fillStyle = color;
  ctx.fill();
}

function centeredText(
  ctx: PImage.Context,
  text: string,
  y: number,
  size: number,
  color: string,
  family = "CyberA Bold"
) {
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
    if (ctx.measureText(candidate).width <= maxWidth || !current) {
      current = candidate;
    } else {
      lines.push(current);
      current = word;
    }
  }
  if (current) lines.push(current);
  return lines;
}

export async function createBadgePng({
  badgeName,
  moduleTitle
}: {
  badgeName: string;
  moduleTitle: string;
}) {
  const image = PImage.make(800, 800);
  const ctx = image.getContext("2d");

  // Minimal round badge: white remains dominant, with restrained brand accents.
  circle(ctx, 400, 400, 382, BRAND_RED);
  circle(ctx, 400, 400, 366, "#FFFFFF");
  circle(ctx, 400, 400, 346, "#FFF8FA");

  centeredText(ctx, "SYKOTI · CYBERA", 92, 25, BRAND_RED);
  centeredText(ctx, "MODULE VALIDÉ", 132, 18, BRAND_MUTED, "CyberA Regular");

  const logo = await PImage.decodePNGFromStream(
    createReadStream(
      join(process.cwd(), "public/images/brand/sykoti-awareness-center-logo.png")
    )
  );
  ctx.drawImage(logo, 315, 158, 170, 170);

  ctx.fillStyle = BRAND_PINK;
  ctx.fillRect(180, 354, 440, 4);

  ctx.font = "38px 'CyberA Bold'";
  const moduleLines = wrapText(ctx, moduleTitle, 560).slice(0, 4);
  const lineHeight = 47;
  const firstLineY = 420 - ((moduleLines.length - 1) * lineHeight) / 2;
  moduleLines.forEach((line, index) => {
    centeredText(ctx, line, firstLineY + index * lineHeight, 38, BRAND_INK);
  });

  const cleanedBadgeName = badgeName
    .replace(/^badge\s+/i, "")
    .trim();
  if (cleanedBadgeName && cleanedBadgeName !== moduleTitle) {
    centeredText(ctx, cleanedBadgeName, 590, 22, BRAND_RED);
  }

  circle(ctx, 400, 646, 7, BRAND_RED);
  centeredText(ctx, "CYBERAMBASSADEURS", 690, 23, BRAND_RED);
  centeredText(ctx, "LEARN · ACT · LEAD", 725, 17, BRAND_MUTED, "CyberA Regular");

  const stream = new PassThrough();
  const chunks: Buffer[] = [];
  stream.on("data", (chunk: Buffer) => chunks.push(chunk));
  await PImage.encodePNGToStream(image, stream);
  return Buffer.concat(chunks);
}
