import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
    base: '/mantine-data-grid/',
    plugins: [react()],
    build: {
        outDir: 'dist-docs',
    },
});
