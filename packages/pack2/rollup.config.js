import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';

export default [
    {
        input: 'src/main.js',
        external: ['rollup-poc'],
        output: {
            globals: {
                // 'rollup-poc': 'Rollup-POC'
            },
            name: 'pack2',
            file: 'dist/pack2.umd.js',
            format: 'umd'
        },
        plugins: [
            resolve(), // so Rollup can find `ms`
            commonjs() // so Rollup can convert `ms` to an ES module
        ]
    },
    {
        input: 'src/main.js',
        external: ['ms'],
        output: [
            { file: 'dist/pack2.cjs.js', format: 'cjs' },
            { file: 'dist/pack2.esm.js', format: 'es' }
        ]
    }
];
