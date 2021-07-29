import nodeResolve from '@rollup/plugin-node-resolve';
import replace from '@rollup/plugin-replace';
import typescript from 'rollup-plugin-typescript2';
import postcss from 'rollup-plugin-postcss';
import pxtorem from 'postcss-pxtorem';
import json from '@rollup/plugin-json';
import common from '@rollup/plugin-commonjs';
import image from '@rollup/plugin-image';
import { terser } from 'rollup-plugin-terser';
import globals from 'rollup-plugin-node-globals';
import autoprefixer from 'autoprefixer';

const pkg = require('./package.json');

const commonConfig = {
  external: [
    ...Object.keys(pkg.devDependencies || {}),
    ...Object.keys(pkg.peerDependencies || {}),
  ],
  plugins: [
    nodeResolve({
      extensions: ['.js', '.json', '.jsx'],
    }),
    common({
      include: 'node_modules/**',
    }),
    image(),
    json(),
    postcss({
      plugins: [
        autoprefixer(),
        pxtorem(
          {
            rootValue: 100,
            propList: [
              '*',
              '!min-width',
              '!border',
              '!border-left',
              '!border-right',
              '!border-top',
              '!border-bottom',
            ],
            selectorBlackList: [
              'no_rem',
            ],
          }
        )],
    }),
    globals(),
    terser({
      compress: {
        pure_getters: true,
        unsafe: true,
        unsafe_comps: true,
        warnings: false,
      },
    }),
    typescript({
      useTsconfigDeclarationDir: true,
    }),
  ],
};

// eslint-disable-next-line import/no-default-export
export default [
  // es
  // CommonJS
  {
    input: 'src/index.ts',
    output: [
      {
        file: pkg.module,
        format: 'es',
        indent: false,
        globals: {
          'react-dom': 'ReactDOM',
          react: 'React',
          classnames: 'classnames',
        },
      },
      {
        file: pkg.main,
        format: 'cjs',
        indent: false,
        globals: {
          'react-dom': 'ReactDOM',
          react: 'React',
          classnames: 'classnames',
        },
      },
    ],
    external: commonConfig.external,
    plugins: commonConfig.plugins,
  },
  // UMD production
  {
    input: 'src/index.ts',
    output: {
      file: pkg.unpkg,
      format: 'umd',
      name: pkg.pkgName,
      indent: false,
      globals: {
        'react-dom': 'ReactDOM',
        react: 'React',
        classnames: 'classnames',
      },
    },
    plugins: [
      ...commonConfig.plugins,
      replace({
        preventAssignment: true,
        'process.env.NODE_ENV': JSON.stringify('production'),
      }),
    ],
    external: commonConfig.external,
  },
];
