# 推送到 water4699/vote1 仓库指南

## 📋 当前配置

- **Vercel 项目**: 连接到 `water4699/vote1` 仓库
- **本地仓库**: 当前连接到 `Joanne514/Vote`
- **需要**: 将代码推送到 `water4699/vote1`

## 🚀 推送步骤

### 方法 1：添加新的远程仓库并推送

```bash
# 添加 water4699/vote1 作为远程仓库
git remote add vote1 https://github.com/water4699/vote1.git

# 推送到该仓库
git push vote1 main
```

### 方法 2：更改默认远程仓库

```bash
# 更改 origin 指向 water4699/vote1
git remote set-url origin https://github.com/water4699/vote1.git

# 推送到该仓库
git push origin main
```

## ⚠️ 注意事项

1. **Git 用户配置**：
   - 如果使用 water4699 的 token，需要配置 Git 用户信息
   - 或者使用 token 在 URL 中

2. **仓库权限**：
   - 确保 water4699 账户有权限推送到 `vote1` 仓库
   - 如果仓库不存在，需要先在 GitHub 上创建

3. **Vercel 配置**：
   - Vercel 项目已经连接到 `water4699/vote1`
   - 推送代码后，Vercel 会自动触发部署

## 🔧 使用 Token 推送

如果需要使用 token：

```bash
# 方式 1：在 URL 中包含 token
git remote set-url vote1 https://ghp_YOUR_TOKEN@github.com/water4699/vote1.git
git push vote1 main

# 方式 2：使用 credential helper（推荐）
git config --global credential.helper manager-core
git remote set-url vote1 https://github.com/water4699/vote1.git
git push vote1 main
# 推送时会提示输入用户名和 token
```

## ✅ 验证

推送成功后：

1. **检查 GitHub**：
   - 访问 https://github.com/water4699/vote1
   - 确认代码已推送

2. **检查 Vercel**：
   - Vercel 会自动检测到新提交
   - 查看部署日志确认构建成功

## 📝 Vercel 项目设置（water4699/vote1）

确保 Vercel 项目设置：

- **Framework Preset**: Next.js
- **Root Directory**: `ui`
- **Build Command**: 留空（使用 `vercel.json`）
- **Output Directory**: 留空
- **Install Command**: 留空（使用 `vercel.json`）

