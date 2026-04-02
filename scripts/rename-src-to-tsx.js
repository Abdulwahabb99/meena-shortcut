// One-shot migration: rename .jsx -> .tsx and .js -> .tsx under src (except src/index.js).
const fs = require("fs");
const path = require("path");

const srcRoot = path.join(__dirname, "..", "src");

function walk(dir, acc = []) {
  for (const ent of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, ent.name);
    if (ent.isDirectory()) walk(p, acc);
    else acc.push(p);
  }
  return acc;
}

const files = walk(srcRoot);
let n = 0;
for (const file of files) {
  const rel = path.relative(srcRoot, file);
  if (rel === "index.js") continue;

  const ext = path.extname(file);
  if (ext === ".jsx") {
    fs.renameSync(file, `${file.slice(0, -4)}.tsx`);
    n += 1;
  } else if (ext === ".js") {
    fs.renameSync(file, `${file.slice(0, -3)}.tsx`);
    n += 1;
  }
}
console.log(`Renamed ${n} files under src/`);
