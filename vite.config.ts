import { resolve } from 'path';
import react from '@vitejs/plugin-react';
import { visualizer } from 'rollup-plugin-visualizer';
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), visualizer()],
  build: {
    lib: {
      entry: resolve(__dirname, 'src', 'index.ts'),
      name: 'mantine-data-grid',
      fileName: 'mantine-data-grid',
    },
    rollupOptions: {
      // make sure to externalize deps that shouldn't be bundled
      // into your library
      external: [
        'dayjs',
        'react',
        'react/jsx-runtime',
        'react-dom/server',
        '@mantine/core',
        '@mantine/dates',
        '@mantine/hooks',
      ],
      output: {
        globals: {
          react: 'React',
          'react-dom/server': 'ReactDom',
          dayjs: 'dayjs',
        },
      },
    },
  },
});
