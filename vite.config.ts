import { defineConfig } from 'vite';
import dts from "vite-plugin-dts";

export default defineConfig({
  plugins: [
    dts({
      insertTypesEntry: false,
    }),
  ],
  build: {
    lib: {
      entry: 'src/index.ts',
      name: 'VitePluginEinkDevtools',
      fileName: (format) => `index.${format}.js`,
      formats: ['es', 'cjs'],
    },
    rollupOptions: {
      external: [],
      output: {
        globals: {},
      },
    },
    target: 'es2015',
    outDir: 'dist',
    emptyOutDir: true,
  },
});