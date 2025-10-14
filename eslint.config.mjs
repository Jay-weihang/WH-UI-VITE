// eslint.config.mjs
import antfu from "@antfu/eslint-config";
import { FlatCompat } from "@eslint/eslintrc";
import pluginJs from "@eslint/js";
const compat = new FlatCompat();

export default antfu(
  {  
    ...pluginJs.configs.recommended,
    ignores: [],
  },

  // Legacy config
  ...compat.config({
    extends: [
      "eslint:recommended",
      // Other extends...
    ],
  })

  // Other flat configs...
);