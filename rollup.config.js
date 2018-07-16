import resolve from 'rollup-plugin-node-resolve'
import babel from 'rollup-plugin-babel'

// Convert CJS modules to ES6, so they can be included in a bundle
import commonjs from 'rollup-plugin-commonjs'
import postcss from 'rollup-plugin-postcss'
import postcssModules from 'postcss-modules'

const cssExportMap = {}

export default {
  input: 'src/index.js',
  output: [
    {
      file: 'dist/index-cjs.js',
      format: 'cjs',
      sourcemap: true,
    },
    {
      file: 'dist/index-es.js',
      format: 'es',
      sourcemap: true,
    }
  ],
  
  // All the used libs needs to be here
  external: [
    'react',
    'classnames'
  ],
  plugins: [
    resolve(),
    postcss({
      extract: 'dist/styles.css',
    }),
    commonjs(),
    babel({
      exclude: 'node_modules/**'
    })
  ]
}