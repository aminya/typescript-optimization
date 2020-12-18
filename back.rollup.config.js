import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import {terser} from 'rollup-plugin-terser';
import typescript from "@rollup/plugin-typescript"

let plugins = [
    // so Rollup can convert TypeScript to JavaScript
    typescript(
        { tsconfig: "./src_src/tsconfig.json", noEmitOnError: false, module: "ESNext" }
    ),

    // so Rollup can find externals
    resolve({extensions: ['.js', 'ts'], preferBuiltins: true}),

    // so Rollup can convert externals to an ES module
    commonjs(),
];

// minify only in production mode
if (process.env.NODE_ENV === 'production') {
    plugins.push(
        // minify
        terser({
            ecma: 2018,
            warnings: true,
            compress: {
                drop_console: false,
            },
        })
    );
}

export default [
    // main
    {
        input: 'src_src/bundle.ts',
        output: [
            {
                dir: "src",
                format: "iife",
                sourcemap: true,
            },
        ],
        plugins: plugins,
    }
];
