# Vercel Next.js 检测问题修复

## 🔍 问题

```
Warning: Could not identify Next.js version
Error: No Next.js version detected. Make sure your package.json has "next" in either "dependencies" or "devDependencies". Also check your Root Directory setting matches the directory of your package.json file.
```

**原因**：
- Root Directory 设置为 `ui`
- 但 Next.js 的 `package.json` 在 `ui/packages/nextjs` 目录中
- Vercel 在 `ui` 目录查找 `package.json`，找不到 Next.js

## ✅ 解决方案

### 方案 1：在 `ui` 目录创建 `vercel.json`（已执行）

已在 `ui/vercel.json` 中指定：
- `framework: "nextjs"` - 明确告诉 Vercel 这是 Next.js 项目
- `buildCommand` - 构建命令
- `installCommand` - 安装命令
- `outputDirectory` - 输出目录

### 方案 2：在 Vercel Dashboard 中调整设置

如果方案 1 不行，可以尝试：

1. **更改 Root Directory**：
   - Settings → General
   - Root Directory: 从 `ui` 改为 `ui/packages/nextjs`
   - 保存设置

2. **但需要调整 `vercel.json`**：
   - 如果 Root Directory 是 `ui/packages/nextjs`
   - 需要更新 `vercel.json` 中的路径：
     ```json
     {
       "installCommand": "cd ../fhevm-sdk && npm install --legacy-peer-deps && npm run build && cd ../nextjs && npm install --legacy-peer-deps"
     }
     ```

### 方案 3：在 `ui/package.json` 中添加 Next.js 引用（不推荐）

可以在 `ui/package.json` 中添加 Next.js 作为依赖，但这会增加不必要的依赖。

## 📋 当前配置

### `ui/vercel.json`（已创建）

```json
{
  "buildCommand": "cd packages/nextjs && npm run build",
  "installCommand": "cd packages/fhevm-sdk && npm install --legacy-peer-deps && npm run build && cd ../nextjs && npm install --legacy-peer-deps",
  "outputDirectory": "packages/nextjs/.next",
  "framework": "nextjs"
}
```

### Vercel Dashboard 设置

- **Root Directory**: `ui`
- **Framework Preset**: `Next.js`（应该自动检测）
- **Build Command**: 留空（使用 `vercel.json`）
- **Output Directory**: 留空（使用 `vercel.json`）
- **Install Command**: 留空（使用 `vercel.json`）

## 🔄 推送代码后

代码推送后（提交 `a6f5c4a`），Vercel 应该能够：
1. 检测到 `ui/vercel.json` 中的 `framework: "nextjs"`
2. 使用正确的构建和安装命令
3. 找到 Next.js 项目

## ✅ 验证

部署成功后，检查构建日志应该看到：
1. **检测到 Next.js**：
   ```
   Detected Next.js version: 15.2.3
   ```
   或类似信息

2. **使用 vercel.json 的配置**：
   ```
   Running "cd packages/fhevm-sdk && npm install --legacy-peer-deps && npm run build && cd ../nextjs && npm install --legacy-peer-deps"
   ```

3. **构建成功**：
   - Next.js 应用构建成功
   - 部署完成

## ⚠️ 如果问题持续

如果仍然无法检测到 Next.js：

1. **检查 `ui/vercel.json` 是否存在**：
   - 确认文件已推送
   - 确认内容正确

2. **尝试方案 2**：
   - 更改 Root Directory 为 `ui/packages/nextjs`
   - 调整 `vercel.json` 中的路径

3. **清除构建缓存**：
   - Settings → General
   - 清除构建缓存
   - 重新部署

