// rollup.config.js
import babel from 'rollup-plugin-babel'
import scss from 'rollup-plugin-scss'
import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs';
import {
    uglify
} from 'rollup-plugin-uglify'

const commonInnerBuilds = [
    'Rollup-POC'
].map(map_componentNamesToRollupConfigs);
let commonInnerBuildsConfigs = []
commonInnerBuilds.forEach(obj => { commonInnerBuildsConfigs = [...commonInnerBuildsConfigs, ...obj] })
console.log(commonInnerBuildsConfigs)
export default commonInnerBuildsConfigs;

function map_componentNamesToRollupConfigs(componentName) {
    let config;
    try {
        config = {
            input: `./src/${componentName}/index.js`,
            output: [
                {
                    file: `./dist/${componentName}.umd.js`,
                    format: 'umd',
                    name: `${componentName}`
                },
            ],
            plugins: [
                resolve({
                    extensions: ['.scss']
                }),
                commonjs(),
                // scss({
                //     output: false
                // }),
                // uglify(),
                // babel({
                //     exclude: 'node_modules/**',
                //     presets: ['@babel/preset-env', '@babel/preset-react'],
                //     plugins: [
                //         ['@babel/plugin-proposal-decorators', { legacy: true }],
                //         '@babel/plugin-proposal-class-properties'
                //     ]
                // })
            ]
        }
    } catch (e) {
        console.error(e);
        throw e;
    }
    let config2
    try {
        config2 = {
            input: `./src/${componentName}/index.js`,
            external: ['ms'],
            output: [
                {
                    file: `./dist/${componentName}.cjs.js`,
                    format: 'cjs',
                    name: `${componentName}`
                },
                {
                    file: `./dist/${componentName}.esm.js`,
                    format: 'es',
                    name: `${componentName}`
                },
            ],
        }
    } catch (e) {
        console.error(e);
        throw e;
    }
    let configs = [config, config2]
    return configs;
}
