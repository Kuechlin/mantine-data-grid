import { resolve } from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { visualizer } from 'rollup-plugin-visualizer';

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
                'react-dom',
                '@mantine/core',
                '@mantine/dates',
                '@mantine/hooks',
            ],
            output: {
                // Provide global variables to use in the UMD build
                // for externalized deps
                globals: {
                    react: 'React',
                },
            },
        },
    },
});
