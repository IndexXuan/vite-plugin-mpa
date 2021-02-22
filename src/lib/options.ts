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
   * nested glob, not recommended
   * @default false
   */
  nested: boolean
  /**
   * html template filename
   * @default 'index.html'
   */
  filename: string
}

export type UserOptions = Partial<MpaOptions>
