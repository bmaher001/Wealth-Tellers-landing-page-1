import fs from "node:fs";
import path from "node:path";
import { createServer } from "vite";

const root = process.cwd();
const vite = await createServer({
  root,
  server: { middlewareMode: true, hmr: false },
  appType: "custom",
});

try {
  const { render } = await vite.ssrLoadModule("/src/entry-server.tsx");
  const appHtml = render();
  const indexPath = path.resolve(root, "dist/index.html");
  let html = fs.readFileSync(indexPath, "utf8");
  const marker = '<div id="root"></div>';
  if (!html.includes(marker)) {
    throw new Error("Could not find the root mount node in dist/index.html");
  }
  fs.writeFileSync(indexPath, html.replace(marker, `<div id="root">${appHtml}</div>`));
} finally {
  await vite.close();
}
