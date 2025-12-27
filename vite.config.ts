
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true, // 监听所有地址，包括局域网和公网地址
    allowedHosts: true // 允许所有主机名访问，解决 Nginx 反向代理或自定义域名下的 Blocked request 错误
  }
})
