import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

import Components from 'unplugin-vue-components/vite'
import { VantResolver } from '@vant/auto-import-resolver'

import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    Components({
      // 关闭自动生成类型文件
      dts: false,
      //  原因：Toast Confirm 这类组件的样式还是需要单独引入，样式全局引入了，关闭自动引入
      resolvers: [VantResolver({ importStyle: false })]
    }),
    createSvgIconsPlugin({
      // 指定图标文件夹，绝对路径（NODE代码）
      iconDirs: [path.resolve(process.cwd(), 'src/icons')]
    })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
