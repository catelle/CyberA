import { readFile, writeFile } from "node:fs/promises";

const source = "/tmp/cybera-shortlisted-password-setup-links.json";
const destination = "/tmp/cybera-shortlisted-password-setup-links.csv";
const links = JSON.parse(await readFile(source, "utf8"));
const cell = (value) => `"${String(value ?? "").replaceAll('"', '""')}"`;
const rows = [
  ["Nom", "Email", "Lien de création du mot de passe"],
  ...links.map(({ fullName, email, url }) => [fullName, email, url])
];
await writeFile(destination, `${rows.map((row) => row.map(cell).join(",")).join("\n")}\n`, { mode: 0o600 });
console.log(destination);
