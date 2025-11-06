# Vercel 部署修复指南

## 🔧 修复的问题

1. **路径错误**: `vercel.json` 中的 `installCommand` 路径不正确
2. **Next.js 配置**: Next.js 会自动处理输出目录，无需手动指定

## ✅ 修复后的配置

### `ui/packages/nextjs/vercel.json`

```json
{
  "buildCommand": "npm run build",
  "installCommand": "cd ../fhevm-sdk && npm install --legacy-peer-deps && npm run build && cd ../nextjs && npm install --legacy-peer-deps"
}
```

## 📋 Vercel 项目设置

在 Vercel Dashboard 中，确保以下设置：

### Build & Development Settings

- **Framework Preset**: Next.js
- **Root Directory**: `ui` (不是 `ui/packages/nextjs`)
- **Build Command**: 留空（使用 `vercel.json` 中的配置）
- **Output Directory**: 留空（Next.js 自动处理）
- **Install Command**: 留空（使用 `vercel.json` 中的配置）

### 环境变量（可选）

如果需要，可以设置：
- `NEXT_PUBLIC_ALCHEMY_API_KEY`
- `NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID`

## 🚀 部署步骤

1. **推送代码到 GitHub**
   ```bash
   git add .
   git commit -m "Fix Vercel deployment configuration"
   git push origin main
   ```

2. **在 Vercel Dashboard**
   - 项目会自动检测到新的提交
   - 或者手动触发重新部署

3. **检查部署日志**
   - 查看 Build Logs 确认安装和构建过程
   - 如果仍有错误，检查具体的错误信息

## ⚠️ 常见问题

### 1. "Missing public directory"
- **原因**: Next.js 15 使用 `.next` 作为输出目录，不是 `public`
- **解决**: 确保 `Output Directory` 留空，让 Next.js 自动处理

### 2. "Missing build script"
- **原因**: `package.json` 中缺少 `build` 脚本
- **解决**: 已确认 `package.json` 中有 `"build": "next build"`

### 3. "Pnpm engine unsupported"
- **原因**: 项目使用 npm，但 Vercel 检测到 pnpm 配置
- **解决**: `vercel.json` 中已使用 `npm install`，不是 `pnpm`

### 4. 路径错误
- **原因**: `installCommand` 中的路径假设从 `ui` 目录运行
- **解决**: 已修正为从 `ui/packages/nextjs` 目录运行的正确路径

## 📝 验证清单

- [x] `vercel.json` 路径已修正
- [x] `package.json` 包含 `build` 脚本
- [x] `public` 目录存在
- [x] Next.js 配置正确
- [x] SDK 构建脚本存在

## 🔍 调试建议

如果部署仍然失败：

1. **检查构建日志**
   - 查看 Vercel Dashboard 中的详细日志
   - 确认每个步骤是否成功

2. **本地测试构建**
   ```bash
   cd ui/packages/nextjs
   npm install --legacy-peer-deps
   npm run build
   ```

3. **检查环境变量**
   - 确保所有必需的环境变量都已设置
   - 检查环境变量名称是否正确

4. **联系支持**
   - 如果问题持续，查看 Vercel 错误文档
   - 或联系 Vercel 支持

