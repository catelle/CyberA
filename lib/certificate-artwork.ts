import { readFileSync } from "node:fs";
import { join } from "node:path";

export type CertificateArtworkInput = {
  type: "ambassador" | "scholarship";
  fullName: string;
  certificateNumber: string;
  completedAt: string;
  moduleTitles: string[];
};

function escapeXml(value: string) {
  return value.replace(/[<>&'\"]/g, (character) => ({ "<": "&lt;", ">": "&gt;", "&": "&amp;", "'": "&apos;", '\"': "&quot;" })[character] ?? character);
}

let logoDataUri: string | null = null;
function getLogoDataUri() {
  if (!logoDataUri) {
    const logo = readFileSync(join(process.cwd(), "public/images/brand/sykoti-awareness-center-logo.png"));
    logoDataUri = `data:image/png;base64,${logo.toString("base64")}`;
  }
  return logoDataUri;
}

function stamp(accent: string, year: string) {
  return `<g transform="translate(1265 875) rotate(-12)" opacity=".86"><circle r="70" fill="none" stroke="${accent}" stroke-width="6"/><circle r="56" fill="none" stroke="${accent}" stroke-width="2"/><text y="-28" text-anchor="middle" font-family="Arial,sans-serif" font-size="15" font-weight="700" fill="${accent}">SYKOTI CENTER</text><text y="5" text-anchor="middle" font-family="Arial,sans-serif" font-size="13" fill="${accent}">CERTIFIED</text><path d="M-42 20h84" stroke="${accent}" stroke-width="2"/><text y="42" text-anchor="middle" font-family="Arial,sans-serif" font-size="11" fill="${accent}">${year}</text></g>`;
}

function header(accent: string) {
  return `<image href="${getLogoDataUri()}" x="92" y="76" width="130" height="130" preserveAspectRatio="xMidYMid meet"/><text x="250" y="132" font-family="Arial,sans-serif" font-size="40" font-weight="700" fill="#172033">Sykoti<tspan fill="${accent}">Center</tspan></text><text x="252" y="165" font-family="Arial,sans-serif" font-size="16" fill="#64748b">Pour une vie numérique sûre, responsable et inclusive</text><path d="M1270 90v132" stroke="${accent}" stroke-width="3"/><text x="1297" y="110" font-family="Arial,sans-serif" font-size="16">LEAD</text><text x="1297" y="147" font-family="Arial,sans-serif" font-size="16">PROTECT</text><text x="1297" y="184" font-family="Arial,sans-serif" font-size="16">INSPIRE</text>`;
}

function renderAmbassador(input: CertificateArtworkInput, month: string, year: string) {
  const accent = "#c91f53";
  const modules = input.moduleTitles.length ? input.moduleTitles.join(" · ") : "Modules 1, 2 et 3";
  return `<svg xmlns="http://www.w3.org/2000/svg" width="1600" height="1100" viewBox="0 0 1600 1100"><rect width="1600" height="1100" fill="#fff"/><path d="M0 48h112c45 0 82 37 82 82H0zM1600 1100h-142c-47 0-85-38-85-85h227z" fill="${accent}"/><circle cx="34" cy="1035" r="82" fill="#171a22"/><rect x="28" y="28" width="1544" height="1044" fill="none" stroke="${accent}" stroke-width="4"/><rect x="40" y="40" width="1520" height="1020" fill="none" stroke="${accent}" stroke-width="2"/>${header(accent)}<text x="800" y="320" text-anchor="middle" font-family="Arial,sans-serif" font-size="62" font-weight="700" fill="#172033">CERTIFICAT</text><text x="800" y="380" text-anchor="middle" font-family="Arial,sans-serif" font-size="38" fill="${accent}">DE COMPLÉTION</text><text x="800" y="445" text-anchor="middle" font-family="Arial,sans-serif" font-size="20" fill="#64748b">Ce certificat est fièrement décerné à</text><text x="800" y="535" text-anchor="middle" font-family="Arial,sans-serif" font-size="48" font-weight="700" fill="${accent}">${escapeXml(input.fullName)}</text><path d="M400 555h800" stroke="#172033" stroke-width="2"/><text x="800" y="620" text-anchor="middle" font-family="Arial,sans-serif" font-size="22">pour avoir complété avec succès le parcours CyberAmbassador</text><text x="800" y="658" text-anchor="middle" font-family="Arial,sans-serif" font-size="16" fill="#64748b">${escapeXml(modules)}</text><rect x="535" y="700" width="530" height="58" rx="26" fill="#fbe9ee"/><text x="800" y="738" text-anchor="middle" font-family="Arial,sans-serif" font-size="23" font-weight="700" fill="${accent}">CYBERAMBASSADOR ${year}</text><text x="800" y="797" text-anchor="middle" font-family="Arial,sans-serif" font-size="16">LEAD  ·  PROTECT  ·  INSPIRE</text><text x="315" y="910" text-anchor="middle" font-family="Arial,sans-serif" font-size="16">Catelle Ningha</text><text x="315" y="932" text-anchor="middle" font-family="Arial,sans-serif" font-size="14" fill="#64748b">Coordination du programme</text><path d="M155 945h320M1125 945h320" stroke="#172033" stroke-width="2"/><text x="1285" y="932" text-anchor="middle" font-family="Arial,sans-serif" font-size="16">Sykoti Center</text>${stamp(accent, year)}<text x="800" y="1010" text-anchor="middle" font-family="Arial,sans-serif" font-size="18" fill="${accent}">${escapeXml(month)}</text><text x="800" y="1038" text-anchor="middle" font-family="Arial,sans-serif" font-size="11" fill="#94a3b8">${escapeXml(input.certificateNumber)}</text></svg>`;
}

function renderScholarship(input: CertificateArtworkInput, month: string, year: string) {
  const accent = "#c91f53";
  const chapters = (input.moduleTitles.length ? input.moduleTitles : ["Parcours d’apprentissage attribué"]).slice(0, 4);
  const chapterRows = chapters.map((title, index) => {
    const y = 620 + index * 62;
    const safeTitle = title.length > 86 ? `${title.slice(0, 83)}…` : title;
    return `<rect x="410" y="${y - 37}" width="780" height="50" rx="12" fill="${index % 2 === 0 ? "#fff1f4" : "#f8fafc"}"/><circle cx="445" cy="${y - 12}" r="17" fill="${accent}"/><text x="445" y="${y - 6}" text-anchor="middle" font-family="Arial,sans-serif" font-size="14" font-weight="700" fill="#fff">${index + 1}</text><text x="480" y="${y - 5}" font-family="Arial,sans-serif" font-size="17" font-weight="700" fill="#172033">${escapeXml(safeTitle)}</text>`;
  }).join("");
  return `<svg xmlns="http://www.w3.org/2000/svg" width="1600" height="1100" viewBox="0 0 1600 1100"><rect width="1600" height="1100" fill="#fff"/><rect width="72" height="1100" fill="#171a22"/><rect x="72" width="24" height="1100" fill="${accent}"/><path d="M96 0h260l-54 44 54 44H96zM1600 1012h-260l54 44-54 44h260z" fill="${accent}"/><rect x="120" y="34" width="1435" height="1030" fill="none" stroke="${accent}" stroke-width="3"/>${header(accent)}<text x="800" y="292" text-anchor="middle" font-family="Arial,sans-serif" font-size="24" font-weight="700" letter-spacing="6" fill="${accent}">BOURSE DES 100</text><text x="800" y="352" text-anchor="middle" font-family="Arial,sans-serif" font-size="52" font-weight="700" fill="#172033">CERTIFICAT DE PARCOURS</text><text x="800" y="410" text-anchor="middle" font-family="Arial,sans-serif" font-size="19" fill="#64748b">attribué à</text><text x="800" y="485" text-anchor="middle" font-family="Arial,sans-serif" font-size="45" font-weight="700" fill="${accent}">${escapeXml(input.fullName)}</text><text x="800" y="530" text-anchor="middle" font-family="Arial,sans-serif" font-size="20">pour avoir validé son parcours d’apprentissage Sykoti Center</text><text x="800" y="572" text-anchor="middle" font-family="Arial,sans-serif" font-size="15" font-weight="700" letter-spacing="3" fill="${accent}">CHAPITRES VALIDÉS</text>${chapterRows}<text x="330" y="910" text-anchor="middle" font-family="Arial,sans-serif" font-size="16">Catelle Ningha</text><text x="330" y="932" text-anchor="middle" font-family="Arial,sans-serif" font-size="14" fill="#64748b">Coordination du programme</text><path d="M180 945h300M1120 945h300" stroke="#172033" stroke-width="2"/><text x="1270" y="932" text-anchor="middle" font-family="Arial,sans-serif" font-size="16">Sykoti Center</text>${stamp(accent, year)}<text x="800" y="998" text-anchor="middle" font-family="Arial,sans-serif" font-size="18" fill="${accent}">${escapeXml(month)}</text><text x="800" y="1026" text-anchor="middle" font-family="Arial,sans-serif" font-size="11" fill="#94a3b8">${escapeXml(input.certificateNumber)}</text></svg>`;
}

export function renderCertificateSvg(input: CertificateArtworkInput) {
  const date = new Date(input.completedAt);
  const month = new Intl.DateTimeFormat("fr-FR", { month: "long", year: "numeric", timeZone: "Africa/Douala" }).format(date);
  const year = new Intl.DateTimeFormat("fr-FR", { year: "numeric", timeZone: "Africa/Douala" }).format(date);
  return input.type === "scholarship" ? renderScholarship(input, month, year) : renderAmbassador(input, month, year);
}
