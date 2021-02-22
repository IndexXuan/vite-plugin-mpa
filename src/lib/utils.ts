import fg from 'fast-glob'
import fs from 'fs'
import yargs from 'yargs'
import path from 'path'
import { name } from '../../package.json'
import type { Rewrite } from 'connect-history-api-fallback'

const argv = yargs.argv

export type PageInfo = Record<
  string,
  {
    entry: string
    filename: string
  }
>

/**
 * @private
 */
function genFileName(pageName: string, path: string, usePath: boolean, ext: string): string {
  const xPath = usePath ? `${path === '' ? '' : `${path}/`}` : ''
  const xExt = ext.includes('.') ? ext : ''
  return `${xPath}${pageName}${xExt}`.replace(/^pages\//, '')
}

/**
 * @private
 */
function parseEntryFile(file: string, filters: string[] = []) {
  const fileSplit = file.split('/')
  const pageName = fileSplit[fileSplit.length - 2]
  const outputPath = fileSplit.slice(1, fileSplit.length - 2).join('/')
  const result = {
    file,
    pageName,
    outputPath,
    include: filters.includes(pageName) || filters.length === 0,
  }
  return result
}

/**
 * @private
 */
function parseFiles(files: string[], defaultEntries: string) {
  // support --entry & --file & --page to filter
  const args: string =
    (argv.entry as string) || (argv.file as string) || (argv.page as string) || ''
  if (args === '') {
    defaultEntries = ''
  }
  const filters = args
    .split(',')
    .concat(defaultEntries.split(','))
    .filter(_ => _)
  const ret = files.map(file => parseEntryFile(file, filters))
  return {
    allEntries: ret,
    entries: ret.filter(e => e.include),
    args,
  }
}

/**
 * @private
 * @param scanDir - @default 'src/pages'
 * @param scanFile - @default 'main.{js,ts}'
 * @param log - log it
 * @param usePath
 * @param ext
 * @param nested - @default false
 */
function getPagesInfo({
  log = false,
  defaultEntries = '',
  scanDir = 'src/pages',
  scanFile = 'main.{js,ts}',
  usePath = true,
  ext = '.html',
  nested = false,
} = {}): PageInfo {
  const allFiles = fg.sync(
    nested
      ? `${scanDir}/**/${scanFile}`.replace('//', '/')
      : `${scanDir}/*/${scanFile}`.replace('//', '/'),
  )
  // Calc
  const pages = {}
  const result = parseFiles(allFiles, defaultEntries)
  const { entries } = result
  entries.forEach(entry => {
    const { file, pageName, outputPath } = entry
    // @ts-expect-error
    pages[pageName] = {
      entry: file,
      filename: genFileName(pageName, outputPath, usePath, ext),
    }
  })
  // Log
  if (log) {
    console.log(`[${name}] found pages: `, pages)
  }
  return pages
}

export function getMPAIO(root: string, filename: string) {
  const pages = getPagesInfo()
  const input: Record<string, string> = {}
  Object.keys(pages).map(key => {
    input[key] = path.resolve(root, pages[key].entry.replace(/main.(js|ts)/, filename))
  })
  return input
}

/**
 * history rewrite list
 */
export function getHistoryReWriteRuleList(filename: string): Rewrite[] {
  const list: Rewrite[] = []
  list.push({
    from: /^\/$/,
    to: `./src/pages/index/${filename}`,
  })
  const pages = getPagesInfo()
  Object.keys(pages).map(pageName => {
    const to = `./${pages[pageName].entry.replace(/main.(js|ts)/, filename)}`
    list.push({
      from: new RegExp(`^/${pageName}/index.html$`), // support pageName/index.html
      to,
    })
    list.push({
      from: new RegExp(`^\/${pageName}.html$`), // support pageName.html, not recommended
      to,
    })
    list.push({
      from: new RegExp(`^\/${pageName}$`), // support pageName, not recommended
      to,
    })
  })
  return list
}
