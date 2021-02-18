import type { Plugin, UserConfig } from 'vite'
import type { UserOptions } from './lib/options'
import history from 'connect-history-api-fallback'
import path from 'path'
import shell from 'shelljs'
import { getMPAIO, getHistoryReWriteRuleList } from './lib/utils'

export default function mpa(userOptions: UserOptions = {}): Plugin {
  const options = {
    ...userOptions,
  }
  let resolvedConfig: UserConfig
  return {
    name: 'mpa',
    enforce: 'pre',
    config(config) {
      resolvedConfig = config
      config.server = config.server || {}
      config.server.open = options.open || '/index'
      config.build = config.build || {}
      config.build.rollupOptions = config.build.rollupOptions || {}
      config.build.rollupOptions.input = getMPAIO(config.root || process.cwd())
    },
    configureServer({ middlewares: app }) {
      app.use(
        // @ts-ignore
        history({
          verbose: Boolean(process.env.DEBUG) && process.env.DEBUG !== 'false',
          disableDotRule: undefined,
          htmlAcceptHeaders: ['text/html', 'application/xhtml+xml'],
          rewrites: getHistoryReWriteRuleList(),
        }),
      )
    },
    closeBundle() {
      const root = resolvedConfig.root || process.cwd()
      const dest = resolvedConfig.build?.outDir || 'dist'
      const resolve = (p: string) => path.resolve(root, p)

      // 1. rename all main.html to index.html
      shell.ls(resolve(`${dest}/src/pages/*/*.html`)).forEach(html => {
        shell.mv(html, html.replace('main.html', 'index.html'))
      })
      // 2. move src/pages/* to dest root
      shell.mv(resolve(`${dest}/src/pages/*`), resolve(dest))
      // 3. remove empty src dir
      shell.rm('-rf', resolve(`${dest}/src`))
      // 4. remove index.html copyed from public folder
      shell.rm('-rf', resolve(`${dest}/index.html`))
    },
  }
}

export type { UserOptions as MpaOptions }
