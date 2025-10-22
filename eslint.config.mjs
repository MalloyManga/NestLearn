// @ts-check: 开启 TypeScript 对这个 .mjs 配置文件的类型检查。
import eslint from '@eslint/js'
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended'
import globals from 'globals'
import tseslint from 'typescript-eslint'

// tseslint.config() 是新的 ESLint 配置方式，它接收一个配置对象数组。
export default tseslint.config(
  // 1. 全局忽略配置
  {
    // 告诉 ESLint 不要检查配置文件本身。
    ignores: ['eslint.config.mjs', 'dist/'],
  },

  // 2. 基础规则集 (按顺序应用)
  // 启用 ESLint 官方推荐的基础规则。
  eslint.configs.recommended,
  // 启用 typescript-eslint 推荐的、需要类型信息的规则集（功能最全）。
  ...tseslint.configs.recommendedTypeChecked,
  // 启用 Prettier 插件的推荐配置。
  // 这会将 Prettier 作为一条 ESLint 规则来运行(只是调用pre来分析代码 pre自己根据.pre文件来执行)，并禁用与 Prettier 冲突的 ESLint 规则。
  eslintPluginPrettierRecommended,

  // 3. 语言环境配置
  {
    languageOptions: {
      // 定义代码运行的全局变量环境。
      globals: {
        ...globals.node, // 添加 Node.js 的全局变量，如 `process`, `require`。
        ...globals.jest,  // 添加 Jest 测试框架的全局变量，如 `describe`, `it`, `expect`。
      },
      // 指定源码类型为 ES 模块。
      sourceType: 'module',
      // 解析器选项，专门为 typescript-eslint 配置。
      parserOptions: {
        // 开启项目服务，允许规则访问 TypeScript 的类型信息，这是 `recommendedTypeChecked` 所必需的。
        projectService: true,
        // 指定 tsconfig.json 文件所在的根目录。
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },

  // 4. 自定义规则配置
  {
    // 在这里可以覆盖或修改上面规则集中的规则。
    rules: {
      // 'off' (关闭), 'warn' (警告), 'error' (报错)。
      // 允许使用 any 类型，不做检查。在某些场景下可以提高灵活性。
      '@typescript-eslint/no-explicit-any': 'off',
      // 对于没有使用 await 的 Promise，只给出警告而不是报错。
      '@typescript-eslint/no-floating-promises': 'warn',
      // 将 any 类型的变量作为函数参数时，只给出警告。
      '@typescript-eslint/no-unsafe-argument': 'warn',
      // 配置 Prettier 规则。
      "prettier/prettier": [
        "error", // 不符合 Prettier 格式的代码将作为 ESLint 错误报出。
        {
          // 设置行尾序列为自动，以兼容不同操作系统（Windows/Linux/Mac）。
          endOfLine: "auto"
        }
      ],
    },
  },
)
