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
      },
      {
        file: packageJson.module,
        format: 'esm',
        sourcemap: true,
      },
    ],
    plugins: [
      peerDepsExternal(),
      resolve(),
      commonjs(),
      typescript({
        tsconfig: './tsconfig.json',
        exclude: ['**/__tests__/**', '**/*.test.ts', '**/*.test.tsx'],
      }),
    ],
    external: ['react', 'react-dom', '@emotion/react', '@emotion/styled', '@mui/material', '@mui/x-date-pickers', 'date-fns'],
  },
  {
    input: 'src/components/TimeScheduler/index.ts',
    output: [{ file: packageJson.types, format: 'es' }],
    plugins: [dts()],
  },
]; 