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

// eslint.config.mjs（项目根目录）
// eslint.config.mjs（项目根目录）
import antfu from "@antfu/eslint-config";
import { FlatCompat } from "@eslint/eslintrc";
import pluginJs from "@eslint/js";
// 仅导入插件（用于规则，不依赖其 environments）
import vitestGlobals from "eslint-plugin-vitest-globals";
import { fileURLToPath } from "url";
import path from "path";

// 1. 生成绝对路径（解决 FlatCompat 路径问题）
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 2. 正确初始化 FlatCompat（必传 recommendedConfig 和 baseDirectory）
const compat = new FlatCompat({
  recommendedConfig: pluginJs.configs.recommended,
  baseDirectory: __dirname,
});

// 3. 手动定义 Vitest 常用全局变量（替代插件的 environments）
const vitestGlobalVars = {
  test: "readonly",
  it: "readonly",
  expect: "readonly",
  describe: "readonly",
  beforeAll: "readonly",
  afterAll: "readonly",
  beforeEach: "readonly",
  afterEach: "readonly",
  vi: "readonly",
  vitest: "readonly",
};

export default antfu(
  {  
    ignores: ["node_modules/**", "dist/**", "*.config.{js,mjs,ts}", "coverage/**"],
  },

  // 4. 兼容传统规则
  ...compat.config({
    extends: ["eslint:recommended"],
  }),

  // 5. 测试文件配置（关键：用手动定义的全局变量替代插件环境）
  {
    files: ["**/*.test.{ts,tsx}"],
    plugins: {
      "vitest-globals": vitestGlobals, // 保留插件（用于其规则，非环境）
    },
    languageOptions: {
      globals: {
        ...vitestGlobalVars, // 手动导入 Vitest 全局变量
        window: "readonly",
        document: "readonly",
      },
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
        // 若没有 tsconfig.json，可删除 project 这一行
        project: "./tsconfig.json",
      },
    },
    rules: {
      "no-undef": "off", // 彻底关闭未定义检查（避免遗漏变量）
      "no-console": "off",
      // 可选：启用 vitest-globals 插件的推荐规则
      "vitest-globals/consistent-test-it": ["error", { fn: "test" }],
    },
  },

  // 6. 全局规则
  {
    languageOptions: {
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
      },
      globals: {
        window: "readonly",
        document: "readonly",
        console: "readonly",
      },
    },
    rules: {
      "no-console": ["error", { allow: ["warn", "error"] }],
      "indent": ["error", 2],
      "quotes": ["error", "single"],
      "semi": ["error", "always"],
      "no-unused-vars": ["warn", { argsIgnorePattern: "^_" }],
    },
  }
);