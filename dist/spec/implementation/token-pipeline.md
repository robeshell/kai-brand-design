# Token 构建、发布与产品同步

> `tokens/*.json` 与 `products/*/tokens.json` 是唯一数值源。设计仓库先独立构建 `dist/`，产品仓库只消费已构建快照；Markdown 解释规则，不承担数值同步。

## 构建数据流

```text
tokens/*.json + products/*/tokens.json + schema/*.schema.json
            │
            ▼
    tool/kai_design.py
      ├─ validate：结构 + 语义校验
      ├─ build：dist + Viewer
      ├─ check：生成一致性门禁
      └─ sync：显式复制给产品
            │
            ▼
dist/
  ├─ manifest.json
  ├─ release/kai-design.lock.json
  ├─ tokens/kai.tokens.json
  ├─ spec/...
  ├─ flutter/kaijuan/brand_tokens.g.dart
  ├─ flutter/kaiting/brand_tokens.g.dart
  ├─ css/kaigua/brand.generated.css
  └─ viewer/
      ├─ index.html
      └─ assets/app.{js,css}
```

`manifest.json` 包含品牌版本、规范化 Token digest，以及每个交付文件（包括 Viewer）的 SHA-256 和字节数。Viewer 的同一份构建结果也复制到 `docs/` 供 GitHub Pages 使用。

## 日常命令

```sh
npm install --prefix viewer   # 首次运行
make validate
make test
make build
make check
```

等价的底层命令：

```sh
python3 tool/kai_design.py validate
python3 tool/kai_design.py build
python3 tool/kai_design.py check
python3 tool/kai_design.py check --skip-viewer  # 下游产品只校验 Token / spec
```

这些命令只操作设计仓库，可以在干净 CI 环境独立运行；CI 使用 `npm ci --prefix viewer` 后执行完整门禁。

## 产品同步

只有 `sync` 会写产品仓库：

```sh
python3 tool/kai_design.py sync
python3 tool/kai_design.py sync --only kaijuan
python3 tool/kai_design.py sync --only kaiting
python3 tool/kai_design.py sync --only kaigua
```

产品不在默认同级目录时，可传 `--kaijuan-root`、`--kaiting-root`、`--kaigua-root`。

`sync` 同时把 `dist/release/kai-design.lock.json` 写入产品仓库根目录。锁文件包含 `specVersion`、发布 tag 和 Token digest；产品 CI 必须同时比较锁文件与生成快照。Viewer 的完整构建一致性只由设计仓库 CI 负责。这样同时验证：

1. 设计仓库自身产物没有过期；
2. 产品明确锁定一个版本及其内容摘要；
3. 产品提交的快照与正式交付物完全一致；
4. 产品运行时回归测试仍然消费该快照。

## 平台接入边界

### Flutter

- `dist/flutter/**/brand_tokens.g.dart` 只提供不可变原始常量；
- 生成文件包含实际使用的 `KaiBrandMobile*` 与 `KaiBrandDesktop*`；五个平台基准继续输出供适配和验收使用；
- 同一文件中的 `KaiProductTokens` 来自 `products/<product>/tokens.json`；
- 产品 `App*` / `Sound*` API 是兼容语义层，值必须引用 `KaiBrand*`；
- 业务组件继续读取 `BuildContext` 语义 getter，不直接 import 生成文件；
- 产品专属数值进入对应产品产物，不进入其它产品；内容行为和非数值规则仍留在产品规范。

### CSS

- `dist/css/kaigua/brand.generated.css` 提供品牌变量；
- 根作用域提供 Desktop 回退值；设置 `data-component-profile="mobile|desktop"` 切换实际字号和尺寸变量；
- 开刮产品数值生成 `--kg-product-*` 变量；当前产品 Token 文件为空时不输出额外变量；
- 开刮 `tokens.css` 只保留产品兼容变量，构建会拒绝它与生成 CSS 重复定义；
- 生成 CSS 在兼容文件后加载并拥有最终优先级；
- 新品牌变量必须先进入 JSON 与构建器，禁止只写进产品 CSS。

## 发布纪律

1. 修改 token 或生成器；
2. `make validate test build check`；
3. 审查 `dist/manifest.json` 和产物差异；
4. 更新品牌 changelog 与采用矩阵；
5. 合并设计仓库并创建与 `release.json` 一致的 tag；
6. tag 触发 Release workflow，发布不可变 `dist` 压缩包；
7. 产品执行 `sync` 并运行自身测试；
8. 产品 CI 对比锁文件、快照与设计仓库 `dist`。

禁止：

- 手改 `dist/` 或产品生成快照；
- 从产品实现反向复制数值到另一产品；
- token 已变化但只重新生成 Viewer；
- 设计仓库构建未通过时继续产品同步。

产品仓库以 `kai-design.lock.json` 的版本与 digest 为准。CI 即使临时 checkout 品牌 `main`，也会在品牌升级后立即因锁文件不一致而失败；发布 tag 建立后可直接按 lock 中的 `ref` 获取不可变产物。
