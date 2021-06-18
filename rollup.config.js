import typescript from '@rollup/plugin-typescript';
import replace from '@rollup/plugin-replace';
import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import pkg from './package.json';

const plugins = [
    typescript({
        tsconfig: './tsconfig.json'
    }),
    nodeResolve(),
    commonjs(),
    json(),
    replace({
        __DATE__: () => JSON.stringify(new Date()),
        __VERSION__: () => JSON.stringify(pkg.version),
        preventAssignment: true
    })
];

const external = ['connect-history-api-fallback', 'shelljs', 'fast-glob', 'yargs'];

const getConfig = (file, format) => {
    return {
        input: './src/index.ts',
        output: {
            name: 'Mpa',
            exports: 'default',
            sourcemap: true,
            file,
            format
        },
        external,
        plugins
    };
};

export default [
    getConfig('./build/index.cjs', 'commonjs')
];
