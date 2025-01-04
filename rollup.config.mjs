import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import dts from 'rollup-plugin-dts';
import { readFileSync } from 'fs';

const packageJson = JSON.parse(readFileSync('./package.json'));

export default [
  {
    input: 'src/components/TimeScheduler/index.ts',
    output: [
      {
        file: packageJson.main,
        format: 'cjs',
        sourcemap: true,
        exports: 'named',
        interop: 'auto'
      },
      {
        file: packageJson.module,
        format: 'esm',
        sourcemap: true,
        exports: 'named'
      },
    ],
    plugins: [
      peerDepsExternal(),
      resolve({
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
        preferBuiltins: true
      }),
      commonjs({
        include: /node_modules/
      }),
      typescript({
        tsconfig: './tsconfig.json',
        exclude: ['**/__tests__/**', '**/*.test.ts', '**/*.test.tsx'],
        declaration: true
      }),
    ],
    external: [
      'react', 
      'react-dom', 
      '@emotion/react', 
      '@emotion/styled', 
      '@mui/material', 
      '@mui/x-date-pickers', 
      '@mui/icons-material',
      '@mui/system',
      'date-fns',
      /^@mui\/.*/,
    ],
  },
  {
    input: 'src/components/TimeScheduler/index.ts',
    output: [{ file: packageJson.types, format: 'es' }],
    plugins: [dts()],
    external: [/\.css$/],
  },
]; 