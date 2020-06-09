import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import postcss from 'rollup-plugin-postcss';
import html2 from 'rollup-plugin-html2';
import { terser } from 'rollup-plugin-terser';
import copy from 'rollup-plugin-copy';
import serve from 'rollup-plugin-serve';
import livereload from 'rollup-plugin-livereload';

const production = process.env.NODE_ENV === 'production';

export default {
  input: 'src/scripts/index.js',
  output: {
    dir: 'dist',
    entryFileNames: 'bundle.[hash].js',
    format: 'iife',
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
      minify: production
        ? {
            removeComments: true,
            collapseWhitespace: true,
            keepClosingSlash: true,
          }
        : false,
    }),
    production && terser(),
    production &&
      copy({
        targets: [{ src: 'static/*', dest: 'dist' }],
      }),
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
