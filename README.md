## boa-cli + vite 5

### 开发环境

`node 18+`

### 命令使用

#### 安装

```bash
yarn
```

or

```bash
npm install
```

#### 运行

// 本地开发命令

``` bash
yarn start
```

// 本地mock

``` bash
yarn mock
```

// 打包上线命令

``` bash
yarn build
```

### 环境变量设置

`vite` 在一个特殊的对象 `import.meta.env` 对象上暴露环境变量。
内置环境变量

- `import.meta.env.MODE`：运行的环境模式
- `import.meta.env.BASE_URL`: base url，由 base 配置决定
- `import.meta.env.PROD`: boolean，是否运行在生产环境（NODE_ENV）
- `import.meta.env.DEV`: boolean，是否运行在开发环境，与 PROD 永远相反（NODE_ENV）
- `import.meta.env.SSR`: boolean，是否运行在 server

**注意：MODE !== NODE_ENV， mode 通过 --mode 设置**

1. 可通过命令行 `cross-env` 添加环境变量

2. vite 使用 `dotenv` 从 `.env.*` 来添加额外的环境变量

- `.env`：所有情况下都会加载
- `.env.local`：所有情况下都会加载，会被 git 忽略，只影响本地
- `.env.[mode]`：指定模式下加载
- `.env.[mode].local`：指定模式下加载，会被 git 忽略，只影响本地

**优先级**：指定模式的 env 文件内的环境变量比通用形式下的优先级更高

**只有 VITE_ 为前缀的变量才会暴露给客户端**

### Feat

- [√] redux toolkit
- [√] mockjs模拟后端返回接口
- [√] 通用布局
- [√] 多布局路由体系
- [√] axios配置
- [√] css module 遵循 vite 5 文档
