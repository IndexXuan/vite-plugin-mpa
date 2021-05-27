import type { Plugin, UserConfig } from 'vite'
import type { UserOptions } from './lib/options'
import history from 'connect-history-api-fallback'
import path from 'path'
import shell from 'shelljs'
import { getMPAIO, getHistoryReWriteRuleList, getFirstPage } from './lib/utils'
import { name } from '../package.json'

export default function mpa(userOptions: UserOptions = {}): Plugin {
  const options = {
    open: '',
    scanDir: 'src/pages',
    scanFile: 'main.{js,ts,jsx,tsx}',
    defaultEntries: '',
    filename: 'index.html',
    ...userOptions,
  }
  if (!options.scanFile.includes('.')) {
    console.error(
      `[${name}]: scanFile should be something like main.ts/main.{js,ts}/index.js/index{ts,tsx}`,
    )
    process.exit(1)
  }
  let resolvedConfig: UserConfig
  return {
    name,
    enforce: 'pre',
    config(config) {
      resolvedConfig = config
      config.build = config.build || {}
      config.build.rollupOptions = config.build.rollupOptions || {}
      config.build.rollupOptions.input = getMPAIO(config.root || process.cwd(), options)
      config.server = config.server || {}
      config.server.open = options.open || getFirstPage(config.build.rollupOptions.input)
    },
    configureServer({ middlewares: app }) {
      app.use(
        // @see https://github.com/vitejs/vite/blob/8733a83d291677b9aff9d7d78797ebb44196596e/packages/vite/src/node/server/index.ts#L433
        // @ts-ignore
        history({
          verbose: Boolean(process.env.DEBUG) && process.env.DEBUG !== 'false',
          disableDotRule: undefined,
          htmlAcceptHeaders: ['text/html', 'application/xhtml+xml'],
          rewrites: getHistoryReWriteRuleList(options),
        }),
      )
    },
    closeBundle() {
      const root = resolvedConfig.root || process.cwd()
      const dest = (resolvedConfig.build && resolvedConfig.build.outDir) || 'dist'
      const resolve = (p: string) => path.resolve(root, p)

      // 1. rename all xxx.html to index.html if needed
      if (options.filename !== 'index.html') {
        shell.ls(resolve(`${dest}/${options.scanDir}/*/*.html`)).forEach(html => {
          shell.mv(html, html.replace(options.filename, 'index.html'))
        })
      }
      // 2. remove all *.html at dest root
      shell.rm('-rf', resolve(`${dest}/*.html`))
      // 3. move src/pages/* to dest root
      shell.mv(resolve(`${dest}/${options.scanDir}/*`), resolve(dest))
      // 4. remove empty src dir
      shell.rm('-rf', resolve(`${dest}/src`))
    },
  }
}

export type { UserOptions as MpaOptions }
