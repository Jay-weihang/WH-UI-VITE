// vitest.config.ts
import { defineConfig } from 'vitest/config'
import vue from '@vitejs/plugin-vue' // 已有 Vue 插件，确保引入

export default defineConfig({
  plugins: [
    vue()
], // 解析 Vue 组件
  test: {
    environment: 'jsdom', // 关键：启用 jsdom 模拟浏览器环境（提供 document/window）
    globals: true, // 可选：允许直接使用 test/expect 等全局函数，不用每次 import
  },
})