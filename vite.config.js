import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    // اطمینان از bundle شدن همه چیز به صورت لوکال
    rollupOptions: {
      output: {
        // عدم استفاده از CDN برای وابستگی‌ها
        manualChunks: undefined,
      }
    }
  },
  // عدم استفاده از CDN در development
  server: {
    host: '0.0.0.0', // گوش دادن به همه interface‌ها
    port: 5173,
    strictPort: false, // اگر پورت اشغال باشد، پورت دیگری انتخاب کند
    fs: {
      strict: true
    }
  }
})
