import rimraf from 'rimraf';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import postcss from 'rollup-plugin-postcss';
import html2 from 'rollup-plugin-html2';
import { terser } from 'rollup-plugin-terser';
import copy from 'rollup-plugin-copy';
import { getBabelOutputPlugin } from '@rollup/plugin-babel';
import serve from 'rollup-plugin-serve';
import livereload from 'rollup-plugin-livereload';

const production = process.env.NODE_ENV === 'production';

rimraf.sync('dist');

export default {
  input: 'src/scripts/index.js',
  output: {
    dir: 'dist',
    entryFileNames: 'bundle.[hash].js',
    format: 'esm',
    sourcemap: true,
  },
  plugins: [
    resolve(),
    commonjs(),
    postcss({
      extract: production,
      minimize: production,
    }),
    html2({
      template: 'src/index.html',
      onlinePath: '.',
      minify: production
        ? {
            removeComments: true,
            collapseWhitespace: true,
            keepClosingSlash: true,
          }
        : false,
    }),
    getBabelOutputPlugin({
      presets: [['@babel/preset-env', { modules: 'umd' }]],
    }),
    production &&
      copy({
        targets: [{ src: 'static/*', dest: 'dist' }],
      }),
    production && terser(),
    !production &&
      serve({
        contentBase: ['dist', 'static'],
      }),
    !production &&
      livereload({
        watch: ['dist', 'static'],
        // hack to watch all files; exts is expected to be an array, checking
        // if should reload for changed file extension via indexOf method
        exts: {
          indexOf() {
            return 0;
          },
        },
      }),
  ],
};
