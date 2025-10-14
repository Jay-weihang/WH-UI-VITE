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

// eslint.config.mjs
import antfu from "@antfu/eslint-config";
import { FlatCompat } from "@eslint/eslintrc";
import pluginJs from "@eslint/js";

// 正确初始化 FlatCompat，提供 recommendedConfig 参数
const compat = new FlatCompat({
  recommendedConfig: pluginJs.configs.recommended
});

export default antfu(
  {  
    // 移除多余的扩展语法，antfu 配置会自动处理基础规则
    ignores: [],
  },

  // 处理传统配置
  ...compat.config({
    extends: [
      "eslint:recommended",
      // 其他扩展...
    ],
  }),

  // 其他扁平配置...
);
    