const fs = require("fs");
const path = require("path");
const { memberships } = require("./membership-data.js");

const root = __dirname;
const output = path.join(root, "dist");
const ignoredDirectories = new Set([".git", ".transcription-tools", "dist"]);

fs.rmSync(output, { recursive: true, force: true });
fs.mkdirSync(output, { recursive: true });
for (const entry of fs.readdirSync(root, { withFileTypes: true })) {
  if (ignoredDirectories.has(entry.name)) continue;
  fs.cpSync(path.join(root, entry.name), path.join(output, entry.name), { recursive: true });
}

const latest = [...memberships].sort((a, b) => b.date.localeCompare(a.date))[0];
if (!latest) {
  throw new Error("등록된 회원권 정보가 없습니다.");
}

const escapeAttribute = (value) => String(value)
  .replace(/&/g, "&amp;")
  .replace(/"/g, "&quot;")
  .replace(/</g, "&lt;")
  .replace(/>/g, "&gt;");

const siteUrl = (process.env.CF_PAGES_URL || "https://membership-1tk.pages.dev").replace(/\/$/, "");
const title = `${latest.title}｜신규 회원권 안내`;
const description = `새롭게 등록된 ${latest.title} 회원권을 확인하세요. 상세 혜택과 상담 방법을 안내드립니다.`;
const imageUrl = `${siteUrl}/${latest.image}`;
const rootIndex = path.join(output, "index.html");
let html = fs.readFileSync(rootIndex, "utf8");

function replaceContent(property, value) {
  const pattern = new RegExp(`(<meta (?:name|property)="${property}" content=")[^"]*(" />)`, "i");
  html = html.replace(pattern, `$1${escapeAttribute(value)}$2`);
}

replaceContent("description", description);
replaceContent("og:site_name", "신규 회원권 안내");
replaceContent("og:title", title);
replaceContent("og:description", description);
replaceContent("og:image", imageUrl);
replaceContent("og:image:alt", `${latest.title} 신규 회원권 안내`);
html = html.replace(/<title>[^<]*<\/title>/i, `<title>${title}</title>`);
html = html.replace(
  '<meta property="og:type" content="website" />',
  `<meta property="og:type" content="website" />\n  <meta property="og:url" content="${siteUrl}/" />`
);
fs.writeFileSync(rootIndex, html);
