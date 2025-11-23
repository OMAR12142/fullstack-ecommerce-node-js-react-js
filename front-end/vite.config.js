import { defineConfig } from 'vite'; // 🌟 يجب استيراد هذه الدالة لحل مشكلة "is not defined"
import react from '@vitejs/plugin-react';
import eslintPlugin from 'vite-plugin-eslint'; // لتدقيق الأكواد

export default defineConfig({
  plugins: [
    react(),
    // 💡 إضافة إعدادات ESLint لتجنب انهيار التطبيق
    eslintPlugin({
      cache: false,
      include: ['./src/**/*.js', './src/**/*.jsx'],
      exclude: [],
    }),
  ],

  server: {
    // 🌐 إعدادات البروكسي: ضرورية لتوجيه طلبات الـ API والصور إلى Express Backend
    proxy: {
      '/api': 'http://localhost:5000', // افترضنا أن Express يعمل على 8000
      '/uploads': 'http://localhost:5000', // 👈🏻 ضروري لظهور الصور
    },
    // هذا لضمان تحديث المتصفح بشكل سليم
    watch: {
        usePolling: true,
    }
  },
});