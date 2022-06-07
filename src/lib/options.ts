/**
 * MPA Plugin options.
 */

import type { Rewrite } from 'connect-history-api-fallback'

export interface MpaOptions {
  /**
   * open path for viteDevServer
   * this plugin will try to open first page for you, but you can still custom, e.g. /index#/about
   * @default firstPagePath
   */
  open: string | boolean
  /**
   * where to scan
   * @default 'src/pages'
   */
  scanDir: string
  /**
   * scanFile
   * @default 'main.{js,ts,jsx,tsx}'
   */
  scanFile: string
  /**
   * html filename, yarn crate @vitejs/app => projectRoot/index.html or MPA projectRoot/pages/${pageName}/index.html
   * @default 'index.html'
   */
  filename: string
  /**
   * default included entry
   * @default ''
   */
  defaultEntries: string
  /**
   * rewrite rule list
   * @default []
   */
  rewrites: Rewrite[]
}

export type UserOptions = Partial<MpaOptions>
