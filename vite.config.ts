import path from 'path'
import fs from 'fs'
import type { UserConfig, ConfigEnv } from 'vite'
import { loadEnv } from 'vite'
import { wrapperEnv } from './build/utils'
import { createVitePlugins } from './build/vite/plugin'

const appDirectory = fs.realpathSync(process.cwd())
// const resolveApp = (relativePath: string) => path.resolve(appDirectory, relativePath)

export default ({ command, mode }: ConfigEnv): UserConfig => {
  // const root = process.cwd()

  const env = loadEnv(mode, appDirectory)

  const viteEnv = wrapperEnv(env)

  const { VITE_PUBLIC_PATH, VITE_DROP_CONSOLE } = viteEnv

  const isBuild = command === 'build'

  // const productionBrowsers = require(resolveApp('package.json')).homepage

  return {
    base: VITE_PUBLIC_PATH,
    root: appDirectory,
    resolve: {
      alias: {
        src: path.resolve(__dirname, './src'),
        types: path.resolve(__dirname, './types'),
        '@assets': path.resolve(__dirname, './src/assets'),
      },
    },
    server: {
      port: 9000,
      strictPort: false,
      open: true,
      proxy: {},
      watch: {
        usePolling: true,
      },
    },
    esbuild: {
      drop: VITE_DROP_CONSOLE ? ['console', 'debugger'] : [],
    },
    build: {
      target: 'es2015',
      cssTarget: 'chrome61',
      outDir: 'dist',
      // cssMinify: 'lightningcss',
      minify: 'terser',
      /**
       * 当 minify=“minify:'terser'” 解开注释
       * Uncomment when minify="minify:'terser'"
       */
      terserOptions: {
        compress: {
          keep_infinity: true,
          drop_console: VITE_DROP_CONSOLE,
        },
      },
    },

    css: {
      // lightningcss 目前不支持 css 预处理器（less、sass 等）
      // transformer: 'lightningcss',
      // lightningcss: {
      //   targets: browserslistToTargets(browserslist(isBuild ? productionBrowsers: undefined)),
      //   // 目前 lightningcss cssModules 自定义配置程度不高
      //   // cssModules:
      // },
      modules: {
        // generateScopedName: '[name]__[local]___[hash:base64:8]',
        // scopeBehaviour: 'local',
        // globalModulePaths: [/src\/styles/],
        // localsConvention: 'camelCaseOnly',
        // hashPrefix: 'pk-prefix',
        // exportGlobals: true
      },

      preprocessorOptions: {
        less: {
          javascriptEnabled: true,
          math: 'always',
        },
      },
    },

    plugins: createVitePlugins(viteEnv, isBuild),
  }
}
