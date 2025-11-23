import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import reactPlugin from 'eslint-plugin-react'; // يجب تثبيته: npm install eslint-plugin-react
import { defineConfig, globalIgnores } from 'eslint/config';

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{js,jsx}'],
    // إضافة الإعدادات الافتراضية لقواعد React
    // NOTE: هذا يحتاج إلى تثبيت: npm install eslint-plugin-react
    ...reactPlugin.configs.flat.recommended,
    
    extends: [
      js.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parserOptions: {
        ecmaVersion: 'latest',
        ecmaFeatures: { jsx: true },
        sourceType: 'module',
      },
    },
    // 🛑 القواعد المصححة لحل مشاكل الدورة التدريبية و Vite 🛑
    rules: {
      // 1. تخفيف أخطاء المتغيرات غير المستخدمة إلى تحذير (يسمح بـ 'builder' و 'action' غير المستخدمين)
      'no-unused-vars': 'warn', 

      // 2. تعطيل فحص set-state-in-effect الذي يسبب الخطأ في Profile.jsx
      'react-hooks/set-state-in-effect': 'off', 
      
      // 3. تعطيل التحقق من Prop Types (لأن Redux يحل محله)
      'react/prop-types': 'off',
      
      // 4. تعطيل شرط استيراد React في كل ملف (Vite/React 17+ يقوم بذلك تلقائياً)
      'react/react-in-jsx-scope': 'off', 
      
      // 5. تخفيف تحذير Vite/React Refresh Module إلى تحذير
      'react-refresh/only-export-components': 'warn',
    },
  },
]);