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
   * log the result
   * @default false
   */
  log: boolean
}

export type UserOptions = Partial<MpaOptions>
