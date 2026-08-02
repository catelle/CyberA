import * as PImage from "pureimage";
import { PassThrough } from "stream";

function circle(ctx: PImage.Context, x: number, y: number, radius: number, color: string) {
  ctx.beginPath();
  ctx.arc(x, y, radius, 0, Math.PI * 2);
  ctx.fillStyle = color;
  ctx.fill();
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
  ctx.fillStyle = "#FFCC32";
  ctx.fill();
  ctx.strokeStyle = "#FFFFFF";
  ctx.lineWidth = 13;
  ctx.stroke();
}

export async function createBadgePng() {
  const image = PImage.make(800, 800);
  const ctx = image.getContext("2d");

  circle(ctx, 400, 400, 354, "#B5123F");
  circle(ctx, 400, 400, 325, "#E11D48");
  circle(ctx, 400, 400, 288, "#FFF1F2");
  circle(ctx, 400, 400, 263, "#FFFFFF");

  ctx.strokeStyle = "#B7EAFF";
  ctx.lineWidth = 12;
  ctx.beginPath();
  ctx.arc(400, 400, 246, 0, Math.PI * 2);
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(400, 176);
  ctx.lineTo(548, 232);
  ctx.lineTo(548, 362);
  ctx.bezierCurveTo(548, 487, 486, 574, 400, 620);
  ctx.bezierCurveTo(314, 574, 252, 487, 252, 362);
  ctx.lineTo(252, 232);
  ctx.closePath();
  ctx.fillStyle = "#00647C";
  ctx.fill();

  ctx.beginPath();
  ctx.moveTo(400, 218);
  ctx.lineTo(505, 258);
  ctx.lineTo(505, 354);
  ctx.bezierCurveTo(505, 444, 464, 510, 400, 550);
  ctx.bezierCurveTo(336, 510, 295, 444, 295, 354);
  ctx.lineTo(295, 258);
  ctx.closePath();
  ctx.fillStyle = "#B7EAFF";
  ctx.fill();

  star(ctx, 400, 357, 102, 46);

  ctx.strokeStyle = "#B5123F";
  ctx.lineWidth = 24;
  ctx.beginPath();
  ctx.arc(400, 357, 44, Math.PI * 0.32, Math.PI * 1.68);
  ctx.stroke();

  circle(ctx, 306, 634, 17, "#FFCC32");
  circle(ctx, 352, 657, 11, "#B7EAFF");
  circle(ctx, 448, 657, 11, "#B7EAFF");
  circle(ctx, 494, 634, 17, "#FFCC32");

  const stream = new PassThrough();
  const chunks: Buffer[] = [];
  stream.on("data", (chunk: Buffer) => chunks.push(chunk));
  await PImage.encodePNGToStream(image, stream);
  return Buffer.concat(chunks);
}
