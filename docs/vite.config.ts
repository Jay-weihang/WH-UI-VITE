import { defineConfig } from "vite";
import vueJsx from "@vitejs/plugin-vue-jsx";
import UnoCSS from "unocss/vite";

export default defineConfig({
  plugins: [
    // 添加JSX插件
    vueJsx(),
    UnoCSS(),
  ],
  server: {
    port: 3000,
  },




  
});