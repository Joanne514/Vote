# 手动触发 Vercel 部署指南

## 🔍 为什么没有自动部署？

可能的原因：
1. Vercel Git 连接可能有问题
2. Webhook 可能没有正确配置
3. 需要手动触发部署

## ✅ 解决方案：手动触发部署

### 方法 1：在 Vercel Dashboard 中手动部署（最简单）

1. **访问 Vercel Dashboard**：
   - 打开 https://vercel.com
   - 登录并进入项目 `vote1`

2. **进入项目 Overview 页面**：
   - 点击项目名称 `vote1`
   - 应该看到项目概览

3. **手动触发部署**：
   - 查找 "Deploy" 或 "Redeploy" 按钮
   - 点击按钮
   - 选择最新提交（`c2b291c` 或 `74cdf9e`）
   - 确认部署

### 方法 2：从 Deployments 页面触发

1. **进入 Deployments 页面**：
   - 点击顶部的 "Deployments" 标签

2. **查看最新部署**：
   - 检查最新部署的提交哈希
   - 如果显示的是旧提交（`bb5869b`），需要重新部署

3. **重新部署**：
   - 点击最新部署的 "Redeploy" 按钮
   - 或点击页面右上角的 "Redeploy" 按钮
   - 确保选择最新提交

### 方法 3：检查并修复 Git 连接

1. **检查 Git 连接**：
   - Settings → Git
   - 确认连接到 `water4699/vote1`
   - 确认分支是 `main`

2. **重新连接 Git**（如果需要）：
   - 断开连接
   - 重新连接到 `water4699/vote1`
   - 选择 `main` 分支
   - 保存设置

3. **触发部署**：
   - 重新连接后，Vercel 应该会自动触发部署
   - 或者手动点击 "Deploy" 按钮

### 方法 4：使用 Vercel CLI（如果已安装）

```bash
# 安装 Vercel CLI（如果还没有）
npm install -g vercel

# 登录
vercel login

# 部署
cd E:\Spring\Zama\Vote\ui\packages\nextjs
vercel --prod
```

## 📋 验证部署

部署开始后，检查：

1. **提交哈希**：
   - 应该是 `c2b291c` 或 `74cdf9e`
   - 不应该是 `bb5869b`

2. **构建日志**：
   - 不应该有 `preinstall` 错误
   - 不应该有 pnpm 版本错误
   - 应该使用 `vercel.json` 中的 `installCommand`

## ⚠️ 如果仍然无法部署

1. **检查 Vercel 项目设置**：
   - Root Directory: `ui`
   - Framework Preset: `Next.js`
   - Build Command: 留空（使用 vercel.json）
   - Install Command: 留空（使用 vercel.json）

2. **清除构建缓存**：
   - Settings → General
   - 清除构建缓存
   - 重新部署

3. **联系 Vercel 支持**：
   - 如果问题持续，可能是 Vercel 服务问题
   - 可以联系 Vercel 支持

## 🎯 推荐操作

**最简单的方法**：
1. 访问 Vercel Dashboard
2. 进入项目 `vote1`
3. 点击 "Deployments" 标签
4. 点击页面右上角的 "Redeploy" 按钮
5. 选择最新提交 `c2b291c`
6. 确认部署

这样应该能触发新的部署。

