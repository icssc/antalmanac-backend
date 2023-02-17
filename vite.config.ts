import { defineConfig } from 'vite'
import { VitePluginNode } from 'vite-plugin-node'
import path from 'path'

export default defineConfig({
  plugins: [
    ...VitePluginNode({
      appPath: path.resolve(__dirname, './src/index.ts'),
      appName: 'antalmanac',
      adapter: 'express',
    }),
  ],
  resolve: {
    alias: {
      $lib: path.resolve(__dirname, './src/lib'),
      $models: path.resolve(__dirname, './src/models'),
    },
  },
})
