import { createReadStream } from "node:fs";
import { join } from "node:path";
import { PassThrough } from "node:stream";
import * as PImage from "pureimage";

import type { CertificateArtworkInput } from "@/lib/certificate-artwork";

const regular = PImage.registerFont(join(process.cwd(), "public/fonts/DejaVuSans.ttf"), "Certificate Regular");
const bold = PImage.registerFont(join(process.cwd(), "public/fonts/DejaVuSans-Bold.ttf"), "Certificate Bold");
regular.loadSync();
bold.loadSync();

function text(ctx: PImage.Context, value: string, x: number, y: number, size: number, color = "#172033", align: "left" | "center" | "right" = "center", weight = "Certificate Regular") {
  ctx.font = `${size}px '${weight}'`;
  ctx.fillStyle = color;
  ctx.textAlign = align;
  ctx.fillText(value, x, y);
}

function fitText(ctx: PImage.Context, value: string, maxWidth: number, initialSize: number) {
  let size = initialSize;
  while (size > 18) {
    ctx.font = `${size}px 'Certificate Bold'`;
    if (ctx.measureText(value).width <= maxWidth) break;
    size -= 2;
  }
  return size;
}

function line(ctx: PImage.Context, x1: number, y1: number, x2: number, y2: number, color: string, width = 2) {
  ctx.beginPath(); ctx.moveTo(x1, y1); ctx.lineTo(x2, y2); ctx.strokeStyle = color; ctx.lineWidth = width; ctx.stroke();
}

function roundedRect(ctx: PImage.Context, x: number, y: number, width: number, height: number, radius: number, color: string) {
  ctx.beginPath(); ctx.moveTo(x + radius, y); ctx.lineTo(x + width - radius, y); ctx.quadraticCurveTo(x + width, y, x + width, y + radius); ctx.lineTo(x + width, y + height - radius); ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height); ctx.lineTo(x + radius, y + height); ctx.quadraticCurveTo(x, y + height, x, y + height - radius); ctx.lineTo(x, y + radius); ctx.quadraticCurveTo(x, y, x + radius, y); ctx.closePath(); ctx.fillStyle = color; ctx.fill();
}

function circlePath(ctx: PImage.Context, x: number, y: number, radius: number, close = true) {
  ctx.beginPath();
  for (let point = 0; point < 64; point += 1) {
    const angle = (point / 64) * Math.PI * 2;
    const px = x + Math.cos(angle) * radius;
    const py = y + Math.sin(angle) * radius;
    if (point === 0) ctx.moveTo(px, py); else ctx.lineTo(px, py);
  }
  if (close) ctx.closePath();
}

function drawStamp(ctx: PImage.Context, year: string) {
  circlePath(ctx, 1265, 875, 70, false); ctx.strokeStyle = "#c91f53"; ctx.lineWidth = 6; ctx.stroke();
  circlePath(ctx, 1265, 875, 56, false); ctx.lineWidth = 2; ctx.stroke();
  text(ctx, "SYKOTI CENTER", 1265, 855, 15, "#c91f53", "center", "Certificate Bold");
  text(ctx, "CERTIFIED", 1265, 883, 13, "#c91f53");
  line(ctx, 1223, 898, 1307, 898, "#c91f53", 2);
  text(ctx, year, 1265, 923, 11, "#c91f53");
}

export async function createCertificatePng(input: CertificateArtworkInput) {
  const image = PImage.make(1600, 1100);
  const ctx = image.getContext("2d");
  const accent = "#c91f53";
  ctx.fillStyle = "#ffffff"; ctx.fillRect(0, 0, 1600, 1100);
  const logo = await PImage.decodePNGFromStream(createReadStream(join(process.cwd(), "public/images/brand/sykoti-awareness-center-logo.png")));
  const date = new Date(input.completedAt);
  const month = new Intl.DateTimeFormat("fr-FR", { month: "long", year: "numeric", timeZone: "Africa/Douala" }).format(date);
  const year = new Intl.DateTimeFormat("fr-FR", { year: "numeric", timeZone: "Africa/Douala" }).format(date);

  if (input.type === "scholarship") {
    ctx.fillStyle = "#171a22"; ctx.fillRect(0, 0, 72, 1100); ctx.fillStyle = accent; ctx.fillRect(72, 0, 24, 1100);
    ctx.strokeStyle = accent; ctx.lineWidth = 3; ctx.strokeRect(120, 34, 1435, 1030);
  } else {
    ctx.strokeStyle = accent; ctx.lineWidth = 4; ctx.strokeRect(28, 28, 1544, 1044); ctx.lineWidth = 2; ctx.strokeRect(40, 40, 1520, 1020);
  }

  ctx.drawImage(logo, 92, 76, 130, 130);
  text(ctx, "Sykoti", 250, 132, 40, "#172033", "left", "Certificate Bold");
  text(ctx, "Center", 372, 132, 40, accent, "left", "Certificate Bold");
  text(ctx, "Pour une vie numérique sûre, responsable et inclusive", 252, 165, 16, "#64748b", "left");
  line(ctx, 1270, 90, 1270, 222, accent, 3);
  text(ctx, "LEAD", 1297, 110, 16, "#172033", "left"); text(ctx, "PROTECT", 1297, 147, 16, "#172033", "left"); text(ctx, "INSPIRE", 1297, 184, 16, "#172033", "left");

  if (input.type === "scholarship") {
    text(ctx, "BOURSE DES 100", 800, 292, 24, accent, "center", "Certificate Bold");
    text(ctx, "CERTIFICAT DE PARCOURS", 800, 352, 52, "#172033", "center", "Certificate Bold");
    text(ctx, "attribué à", 800, 410, 19, "#64748b");
    text(ctx, input.fullName, 800, 485, fitText(ctx, input.fullName, 900, 45), accent, "center", "Certificate Bold");
    text(ctx, "pour avoir validé son parcours d’apprentissage Sykoti Center", 800, 530, 20);
    text(ctx, "CHAPITRES VALIDÉS", 800, 572, 16, accent, "center", "Certificate Bold");
    (input.moduleTitles.length ? input.moduleTitles : ["Parcours d’apprentissage attribué"]).slice(0, 4).forEach((title, index) => {
      const y = 583 + index * 62;
      roundedRect(ctx, 410, y, 780, 50, 12, index % 2 === 0 ? "#fff1f4" : "#f8fafc");
      circlePath(ctx, 445, y + 25, 17); ctx.fillStyle = accent; ctx.fill();
      text(ctx, String(index + 1), 445, y + 31, 14, "#ffffff", "center", "Certificate Bold");
      const safe = title.length > 82 ? `${title.slice(0, 79)}…` : title;
      text(ctx, safe, 480, y + 31, fitText(ctx, safe, 680, 17), "#172033", "left", "Certificate Bold");
    });
  } else {
    text(ctx, "CERTIFICAT", 800, 320, 62, "#172033", "center", "Certificate Bold");
    text(ctx, "DE COMPLÉTION", 800, 380, 38, accent);
    text(ctx, "Ce certificat est fièrement décerné à", 800, 445, 20, "#64748b");
    text(ctx, input.fullName, 800, 535, fitText(ctx, input.fullName, 800, 48), accent, "center", "Certificate Bold");
    line(ctx, 400, 555, 1200, 555, "#172033");
    text(ctx, "pour avoir complété avec succès le parcours CyberAmbassador", 800, 620, 22);
    const modules = input.moduleTitles.length ? input.moduleTitles.join(" · ") : "Modules 1, 2 et 3";
    text(ctx, modules, 800, 658, fitText(ctx, modules, 1000, 16), "#64748b");
    roundedRect(ctx, 535, 700, 530, 58, 26, "#fbe9ee"); text(ctx, `CYBERAMBASSADOR ${year}`, 800, 738, 23, accent, "center", "Certificate Bold");
    text(ctx, "LEAD  ·  PROTECT  ·  INSPIRE", 800, 797, 16);
  }

  line(ctx, 180, 945, 480, 945, "#172033"); line(ctx, 1120, 945, 1420, 945, "#172033");
  text(ctx, "Catelle Ningha", 330, 972, 16); text(ctx, "Coordination du programme", 330, 997, 14, "#64748b"); text(ctx, "Sykoti Center", 1270, 972, 16);
  drawStamp(ctx, year); text(ctx, month, 800, 1010, 18, accent); text(ctx, input.certificateNumber, 800, 1038, 11, "#94a3b8");

  const stream = new PassThrough(); const chunks: Buffer[] = [];
  stream.on("data", (chunk: Buffer) => chunks.push(chunk));
  await PImage.encodePNGToStream(image, stream);
  return Buffer.concat(chunks);
}
