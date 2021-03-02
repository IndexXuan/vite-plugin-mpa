/**
 * MPA Plugin options.
 */

export interface MpaOptions {
  /**
   * open path for viteDevServer
   * @default '/index'
   */
  open: string
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
   * default included entry
   * @default ''
   */
  defaultEntries: string
  /**
   * html template filename
   * @default 'index.html'
   */
  filename: string
  /**
   * nested glob, not recommended
   * @default false
   */
  nested: boolean
}

export type UserOptions = Partial<MpaOptions>
