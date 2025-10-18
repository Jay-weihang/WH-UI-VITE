// // eslint.config.mjs
// import antfu from "@antfu/eslint-config";
// import { FlatCompat } from "@eslint/eslintrc";
// import pluginJs from "@eslint/js";
// const compat = new FlatCompat();

// export default antfu(
//   {
//     ...pluginJs.configs.recommended,
//     ignores: [],
//   },

//   // Legacy config
//   ...compat.config({
//     extends: [
//       "eslint:recommended",
//       // Other extends...
//     ],
//   })

//   // Other flat configs...
// );

import fs from 'node:fs'; // 新增：导入 fs 模块
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import antfu from '@antfu/eslint-config';
import { FlatCompat } from '@eslint/eslintrc';
import pluginJs from '@eslint/js';
import vitestGlobals from 'eslint-plugin-vitest-globals';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const compat = new FlatCompat({
  recommendedConfig: pluginJs.configs.recommended,
  baseDirectory: __dirname,
});

const vitestGlobalVars = {
  test: 'readonly',
  it: 'readonly',
  expect: 'readonly',
  describe: 'readonly',
  beforeAll: 'readonly',
  afterAll: 'readonly',
  beforeEach: 'readonly',
  afterEach: 'readonly',
  vi: 'readonly',
  vitest: 'readonly',
};

// 检查 tsconfig.json 是否存在
const tsconfigPath = path.resolve(__dirname, './tsconfig.json');
const hasTsconfig = fs.existsSync(tsconfigPath);
if (!hasTsconfig) {
  console.warn('⚠️  未找到 tsconfig.json，将禁用 TypeScript 项目级解析');
}

export default antfu(
  {
    ignores: ['node_modules/**', 'dist/**', 'coverage/**'],
  },

  {
    files: ['**/*.{js,cjs,mjs,ts,tsx,vue}'],
  },

  ...compat.config({
    extends: ['eslint:recommended'],
  }),

  {
    files: ['**/*.test.{ts,tsx}'],
    plugins: {
      'vitest-globals': vitestGlobals,
    },
    languageOptions: {
      globals: { ...vitestGlobalVars },
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        project: hasTsconfig ? tsconfigPath : undefined, // 使用之前定义的变量
      },
    },
    rules: {
      'no-undef': 'off',
      'vitest/consistent-test-it': ['error', { fn: 'test' }],
    },
  },

  {
    rules: {
      'no-console': ['error', { allow: ['warn', 'error'] }],
      // 删除这行："indent": ["error", 2],
      'quotes': ['error', 'single'],
      'style/semi': ['error', 'always'],
      'no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
      // 可选：显式配置 style/indent 规则（与你的预期保持一致）
      'style/indent': ['error', 2],
      'vue/object-property-newline': ['error', {
        allowAllPropertiesOnSameLine: false, // 仅保留支持的属性
      }],
    },
  },
);
