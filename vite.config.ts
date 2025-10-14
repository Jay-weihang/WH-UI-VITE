import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'

import UnoCSS from 'unocss/vite'

/// <reference types="vitest/config" />
import { defineConfig } from 'vite'

const rollupOptions = {
  external: ['vue', 'vue-router'],
  output: {
    globals: {
      vue: 'Vue',
    },
  },
}

export default defineConfig({
  test: {
    environment: 'jsdom',
  },
  define: {
    __VUE_OPTIONS_API__: true,
    __VUE_PROD_DEVTOOLS__: false,
    __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: false,
  },

  plugins: [vue(), vueJsx(), UnoCSS()],
  build: {
    sourcemap: true, // 输出单独 source文件
    rollupOptions,
    minify: false,
    // 添加库模式配置
    cssCodeSplit: true,
    lib: {
      entry: './src/entry.ts',
      name: 'SSYUI',
      fileName: 'SSY-ui',
      // 导出模块格式
      formats: ['es', 'umd', 'iife'],
    },
  },

})
