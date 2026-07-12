import { build } from 'vite'
import { readFile, writeFile, rm } from 'node:fs/promises'
import { fileURLToPath, pathToFileURL } from 'node:url'
import path from 'node:path'

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)))
const ssrOutDir = path.join(root, 'dist-ssr')

async function main() {
  // Bundle the server entry so it can run in plain Node
  await build({
    root,
    build: {
      ssr: 'src/entry-server.jsx',
      outDir: 'dist-ssr',
      emptyOutDir: true,
    },
  })

  const { render } = await import(pathToFileURL(path.join(ssrOutDir, 'entry-server.js')))
  const appHtml = render()

  const indexPath = path.join(root, 'dist', 'index.html')
  let html = await readFile(indexPath, 'utf-8')
  html = html.replace('<div id="root"></div>', `<div id="root">${appHtml}</div>`)
  await writeFile(indexPath, html, 'utf-8')

  await rm(ssrOutDir, { recursive: true, force: true })

  console.log('Prerendered dist/index.html with static app markup for crawlers.')
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
