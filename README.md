# vite-plugin-mpa-next

> Out-of-the-box multi-page-application (MPA) support for Vite - supports Vue2/3, React and others

<p align="center">
  <img alt="wakatime" src="https://camo.githubusercontent.com/5eff118fdedd801200507a1dc3996c385b6688da4e4c9b4e4e95dde67f88b63e/68747470733a2f2f77616b6174696d652e636f6d2f62616467652f6769746875622f496e6465785875616e2f766974652d706c7567696e2d6d70612e737667" />
  <a href="https://github.com/lzq035/vite-plugin-mpa-next/actions/workflows/npm-publish.yml">
   <img alt="NPM Publish" src="https://github.com/lzq035/vite-plugin-mpa-next/actions/workflows/npm-publish.yml/badge.svg" style="max-width:100%;">
  </a>
  <a href="https://www.npmjs.com/package/vite-plugin-mpa-next" rel="nofollow">
    <img alt="downloads" src="https://img.shields.io/npm/dt/vite-plugin-mpa-next.svg">
  </a>
  <a href="https://www.npmjs.com/package/vite-plugin-mpa-next" rel="nofollow">
    <img alt="npm version" src="https://img.shields.io/npm/v/vite-plugin-mpa-next.svg" style="max-width:100%;">
  </a>
  <a href="https://github.com/lzq035/vite-plugin-mpa-next/blob/main/LICENSE">
    <img alt="License: MIT" src="https://img.shields.io/badge/License-MIT-yellow.svg" style="max-width:100%;">
  </a>
</p>

## Motivation

- Vite [natively supports multi-page apps](https://vitejs.dev/guide/build.html#multi-page-app), but you must configure `rollupOptions.input` manually
- When running vite dev, you must open `localhost:3000/src/pages/index/xxx.html` for `$projectRoot/src/pages/index/xxx.html`
- Similar to vue-cli, this plugin helps rewrite urls for MPA and auto open the first page for you
- Experimental: when building, organize the folder for you (like vue-cli) - e.g `dist/src/pages/subpage/index.html` will move to `dist/subpage/index.html`

## Usage

```sh
yarn add vite-plugin-mpa-next
```

```ts
// vite.config.ts
import mpa from 'vite-plugin-mpa-next'

// @see https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    // ...other plugins
    mpa(/* options */),
  ],
})
```

## Options

```ts
{
  /**
   * open url path when server starts (customizable)
   * @default path of first-page
   */
  open: string
  /**
   * where to locate pages
   * @default 'src/pages', e.g. src/views
   */
  scanDir: string
  /**
   * how to locate page files (passed to fast-glob), e.g. index.{js,jsx}
   * @default 'main.{js,ts,jsx,tsx}'
   */
  scanFile: string
  /**
   * what is your html file name, e.g. index.html / main.html / entry.html / template.html
   * @default 'index.html'
   */
  filename: string
}
```

- [see more](https://github.com/lzq035/vite-plugin-mpa-next/blob/main/src/lib/options.ts)

## Examples

- see [src/examples](https://github.com/lzq035/vite-plugin-mpa-next/blob/main/examples)

- use shelljs after-build to organize dist folder (may be a better approach - help wanted)

## How It Works

- Uses fast-glob to collect all pages, e.g. src/pages/\*/main.{js,ts}, and calc MPA entries
- The result is passed into vite#rollupOptions#input

