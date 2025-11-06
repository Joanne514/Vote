# Vercel Root Directory 修复指南

## 🔍 问题

```
Error: No Next.js version detected. Make sure your package.json has "next" in either "dependencies" or "devDependencies". Also check your Root Directory setting matches the directory of your package.json file.
```

**原因**：
- Root Directory 设置为 `ui`
- 但 Next.js 的 `package.json` 在 `ui/packages/nextjs` 目录中
- Vercel 在 `ui` 目录查找 `package.json`，只找到最小化的版本（没有 `next` 依赖）

## ✅ 解决方案

### 方法 1：更改 Root Directory 为 `ui/packages/nextjs`（推荐）

1. **进入 Vercel Dashboard**：
   - Settings → General
   - 找到 "Root Directory" 设置

2. **更改 Root Directory**：
   - 当前值：`ui`
   - 改为：`ui/packages/nextjs`
   - 点击 "Save"

3. **更新 vercel.json**（如果需要）：
   - 如果 Root Directory 是 `ui/packages/nextjs`
   - `vercel.json` 中的路径需要调整

### 方法 2：保持 Root Directory 为 `ui`，调整 vercel.json

如果保持 Root Directory 为 `ui`，需要确保 `vercel.json` 中的路径正确：

```json
{
  "buildCommand": "cd packages/nextjs && npm run build",
  "installCommand": "cd packages/fhevm-sdk && npm install --legacy-peer-deps && npm run build && cd ../nextjs && npm install --legacy-peer-deps"
}
```

但这样 Vercel 仍然会在 `ui` 目录查找 `package.json`，可能仍然有问题。

## 🎯 推荐配置

### 配置 1：Root Directory = `ui/packages/nextjs`

**Vercel 设置**：
- Root Directory: `ui/packages/nextjs`
- Framework Preset: `Next.js`
- Build Command: 留空（使用默认）
- Output Directory: 留空（使用默认）
- Install Command: 留空（使用 `vercel.json`）

**vercel.json**（在 `ui/packages/nextjs/vercel.json`）：
```json
{
  "installCommand": "cd ../../fhevm-sdk && npm install --legacy-peer-deps && npm run build && cd ../nextjs && npm install --legacy-peer-deps"
}
```

### 配置 2：Root Directory = `ui`（当前配置）

**Vercel 设置**：
- Root Directory: `ui`
- Framework Preset: `Next.js`
- Build Command: `cd packages/nextjs && npm run build`
- Output Directory: 留空
- Install Command: `cd packages/fhevm-sdk && npm install --legacy-peer-deps && npm run build && cd ../nextjs && npm install --legacy-peer-deps`

**问题**：Vercel 会在 `ui` 目录查找 `package.json`，但 Next.js 的 `package.json` 在 `ui/packages/nextjs`。

## ✅ 最佳解决方案

**推荐使用配置 1**：将 Root Directory 改为 `ui/packages/nextjs`

这样：
- Vercel 会直接在 Next.js 应用目录查找 `package.json`
- 能找到 `next` 依赖
- 构建和安装命令更简单

## 📋 操作步骤

1. **在 Vercel Dashboard 中**：
   - Settings → General
   - Root Directory: 改为 `ui/packages/nextjs`
   - 保存

2. **更新 vercel.json**（如果需要）：
   - 路径需要从 `ui/packages/nextjs` 的角度调整
   - SDK 路径：`../../fhevm-sdk`
   - Next.js 路径：`.`（当前目录）

3. **重新部署**：
   - 触发新的部署
   - 应该能正常检测到 Next.js

