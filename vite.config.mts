import { defineConfig } from 'vite'

export default defineConfig({
    build: {
        lib: {
            entry: 'src/index.ts',
            name: 'EntryStore',
            fileName: (format) => `entry-store.${format}.js`
        },
        sourcemap: true,
        target: "es2015"
    },
})