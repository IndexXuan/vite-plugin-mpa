# vite-plugin-mpa

> out-of-box multi-page-application for vite, support Vue2/3, React and others

<p align="center">
  <a href="https://github.com/IndexXuan/vite-plugin-mpa/actions/workflows/npm-publish.yml">
   <img alt="NPM Publish" src="https://github.com/IndexXuan/vite-plugin-mpa/actions/workflows/npm-publish.yml/badge.svg" style="max-width:100%;">
  </a>
  <a href="https://www.npmjs.com/package/vite-plugin-mpa" rel="nofollow">
    <img alt="downloads" src="https://img.shields.io/npm/dt/vite-plugin-mpa.svg?style=flat-square">
  </a>
  <a href="https://www.npmjs.com/package/vite-plugin-mpa" rel="nofollow">
    <img alt="npm version" src="https://img.shields.io/npm/v/vite-plugin-mpa.svg?style=flat" style="max-width:100%;">
  </a>
  <a href="https://github.com/IndexXuan/vue-cli-plugin-vite/blob/main/LICENSE">
    <img alt="License: MIT" src="https://img.shields.io/badge/License-MIT-yellow.svg" style="max-width:100%;">
  </a>
</p>

## Motivation

- vite native support multi-page, but you must configure `rollupOptions.input`
- when vite dev, you must open `localhost:3000/src/pages/index/xxx.html` for `$projectRoot/src/pages/index/xxx.html`
- vue-cli help rewrite url for MPA, this plugin do the same thing and auto open first page for you
- experiment: when build, organize the folder for you(like vue-cli), `dist/src/pages/subpage/index.html` will move to `dist/subpage/index.html`

## Usage

```sh
yarn add vite-plugin-mpa
```

```ts
// vite.config.ts
import mpa from 'vite-plugin-mpa'

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
   * open url path when server start, you can custom it
   * @default path of first-page
   */
  open: string
  /**
   * where to locate pages
   * @default 'src/pages', e.g. src/views
   */
  scanDir: string
  /**
   * where to locate pages, pass to fast-glob, e.g. index.{js,jsx}
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

- [see more](https://github.com/IndexXuan/vite-plugin-mpa/blob/main/src/lib/options.ts)

## Examples
- see [src/examples](https://github.com/IndexXuan/vite-plugin-mpa/blob/main/examples)

- use shelljs after-build to organize dist folder, maybe have better approach (help wanted)

## Underlying

- fast-glob for src/pages/\*/main.{js,ts}, calc MPA entries
- the result will be setted to vite#rollupOptions#input
