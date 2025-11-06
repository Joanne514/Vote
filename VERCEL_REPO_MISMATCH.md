# Vercel 部署问题解决方案

## 🔍 问题诊断

从 Vercel 构建日志可以看到：
```
Cloning github.com/water4699/vote1 (Branch: main, Commit: bb5869b)
```

**问题**：Vercel 连接的是 `water4699/vote1` 仓库，而不是 `Joanne514/Vote` 仓库。

## ✅ 解决方案

### 方案 1：更新 Vercel 项目连接到正确的仓库（推荐）

1. **在 Vercel Dashboard**：
   - 进入项目设置
   - 找到 "Git Repository" 设置
   - 断开与 `water4699/vote1` 的连接
   - 重新连接到 `Joanne514/Vote` 仓库

2. **或者创建新项目**：
   - 在 Vercel 创建新项目
   - 连接到 `Joanne514/Vote` 仓库
   - Root Directory 设置为 `ui`

### 方案 2：将代码推送到 `water4699/vote1` 仓库

如果需要继续使用 `water4699/vote1` 仓库：

```bash
# 添加 water4699/vote1 作为远程仓库
git remote add vote1 https://github.com/water4699/vote1.git

# 推送到该仓库
git push vote1 main
```

## 📋 当前配置（Root Directory: `ui`）

**`ui/packages/nextjs/vercel.json`**:
```json
{
  "buildCommand": "cd packages/nextjs && npm run build",
  "installCommand": "cd packages/fhevm-sdk && npm install --legacy-peer-deps && npm run build && cd ../nextjs && npm install --legacy-peer-deps"
}
```

## ⚠️ 重要提示

1. **Root Directory** 必须是 `ui`
2. **Build Command** 和 **Install Command** 在 Vercel Dashboard 中应该**留空**（使用 `vercel.json` 中的配置）
3. **Output Directory** 应该**留空**（Next.js 自动处理）

## 🔧 已修复的问题

- ✅ 移除了 `preinstall` 脚本
- ✅ 移除了 `packageManager: "pnpm@8.15.0"`
- ✅ 修正了 `installCommand` 路径（适用于 Root Directory: `ui`）
- ✅ 修正了 `buildCommand` 路径

## 📝 下一步

1. **确认 Vercel 项目连接的仓库**：
   - 如果连接的是 `water4699/vote1`，需要更新连接或推送代码到该仓库
   - 如果连接的是 `Joanne514/Vote`，代码已经推送，等待自动重新部署

2. **清除 Vercel 构建缓存**（如果问题持续）：
   - 在 Vercel Dashboard 中清除构建缓存
   - 或手动触发重新部署

