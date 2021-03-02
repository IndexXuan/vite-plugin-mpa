# vite-plugin-mpa

> out-of-box multi-page-application for vite

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
    mpa(/* options */)
  ],
})
```

## Options
- [@see](https://github.com/IndexXuan/vite-plugin-mpa/blob/main/src/lib/options.ts)

## TODO
- use shelljs after-build to organize dist folder, maybe have better approach (help wanted)

## Underlying
- fast-glob for src/pages/*/main.{js,ts}, calc MPA entries
- the result will be setted to vite#rollupOptions#input
