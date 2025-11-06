# 切换 Vercel 账号指南

## 🔄 方法一：通过 Vercel Dashboard（推荐）

### 步骤 1：退出当前账号

1. 访问 https://vercel.com
2. 点击右上角的**头像**
3. 选择 **Settings**
4. 滚动到页面底部
5. 点击 **Logout** 按钮

### 步骤 2：登录新账号

1. 访问 https://vercel.com
2. 点击 **Sign In**
3. 选择登录方式：
   - **GitHub**（如果新账号关联了 GitHub）
   - **Email**（使用邮箱和密码）
4. 完成登录

### 步骤 3：重新连接项目

1. 在 Vercel Dashboard 中，点击 **"Add New..."** → **"Project"**
2. 在 "Import Git Repository" 页面：
   - 搜索 `water4699/vote1`
   - 如果找不到，点击 **"Adjust GitHub App Permissions"** 确保 Vercel GitHub App 有权限访问该仓库
   - 找到仓库后，点击 **"Import"**
3. 配置项目设置：
   - **Framework Preset**: `Next.js`
   - **Root Directory**: `ui/packages/nextjs` ⚠️ **重要！**
   - **Build Command**: 留空（使用 `vercel.json` 中的配置）
   - **Output Directory**: 留空
   - **Install Command**: 留空（使用 `vercel.json` 中的配置）
4. 点击 **"Deploy"** 开始部署

---

## 💻 方法二：使用 Vercel CLI

### 步骤 1：安装 Vercel CLI（如果未安装）

```bash
npm install -g vercel
```

### 步骤 2：退出当前 CLI 会话

```bash
vercel logout
```

### 步骤 3：登录新账号

```bash
vercel login
```

然后选择登录方式：
- 输入 `y` 使用浏览器登录（推荐）
- 或输入 `n` 使用邮箱登录

### 步骤 4：重新链接项目

```bash
cd ui/packages/nextjs
vercel link
```

按照提示：
1. 选择新账号的 Team/Account
2. 选择项目（如果已存在）或创建新项目
3. 确认设置

---

## 🔐 更新 GitHub Actions（如果需要）

如果你使用 GitHub Actions 自动部署，需要更新 GitHub Secrets：

### 步骤 1：获取新的 Vercel Token

1. 登录新 Vercel 账号
2. 访问 https://vercel.com/account/tokens
3. 点击 **"Create Token"**
4. 输入 Token 名称（如：`github-actions`）
5. 选择过期时间（建议：`No Expiration`）
6. 点击 **"Create"**
7. **复制 Token**（只显示一次，请保存好）

### 步骤 2：获取 Vercel 项目信息

```bash
cd ui/packages/nextjs
vercel link
# 或
vercel project ls
```

记录：
- **Project ID**
- **Org ID**（Team ID）

### 步骤 3：更新 GitHub Secrets

1. 访问 GitHub 仓库：https://github.com/water4699/vote1
2. 点击 **Settings** → **Secrets and variables** → **Actions**
3. 更新以下 Secrets：

   | Secret 名称 | 值 | 说明 |
   |-----------|-----|------|
   | `VERCEL_TOKEN` | 新 Token | 从步骤 1 获取 |
   | `VERCEL_ORG_ID` | 新 Org ID | 从步骤 2 获取 |
   | `VERCEL_PROJECT_ID` | 新 Project ID | 从步骤 2 获取 |

4. 点击 **"Update secret"** 保存

---

## ✅ 验证切换成功

### 检查 1：Vercel Dashboard

1. 访问 https://vercel.com
2. 确认右上角显示的是**新账号**的头像/名称
3. 确认项目列表中能看到 `vote1` 项目

### 检查 2：项目设置

1. 进入项目页面
2. 点击 **Settings** → **General**
3. 确认 **Root Directory** 是 `ui/packages/nextjs`
4. 确认项目连接到正确的 GitHub 仓库

### 检查 3：部署测试

1. 在项目页面点击 **Deployments**
2. 点击 **"Redeploy"** 按钮
3. 选择最新提交
4. 点击 **"Redeploy"**
5. 观察构建日志，确认部署成功

---

## ⚠️ 注意事项

1. **项目数据**：切换账号后，旧账号的项目数据不会自动迁移，需要重新连接
2. **环境变量**：如果设置了环境变量，需要在**新账号**中重新配置
3. **域名**：如果使用了自定义域名，需要在**新账号**中重新配置
4. **GitHub 集成**：确保新账号有权限访问 GitHub 仓库 `water4699/vote1`
5. **部署限制**：新账号也有每天 100 次部署的限制（免费计划）

---

## 🆘 遇到问题？

### 问题 1：找不到 GitHub 仓库

**解决方案**：
1. 确保新账号已连接 GitHub
2. 访问 https://vercel.com/account/integrations
3. 点击 **"Configure"** 或 **"Reinstall"** GitHub App
4. 确保授权访问 `water4699/vote1` 仓库

### 问题 2：项目设置丢失

**解决方案**：
- Root Directory 必须设置为 `ui/packages/nextjs`
- Build/Install Command 可以留空（使用 `vercel.json`）

### 问题 3：GitHub Actions 部署失败

**解决方案**：
- 确认已更新 GitHub Secrets（`VERCEL_TOKEN`, `VERCEL_ORG_ID`, `VERCEL_PROJECT_ID`）
- 确认新 Token 有正确的权限

---

## 📝 快速检查清单

切换账号后，确认：

- [ ] 已退出旧账号
- [ ] 已登录新账号
- [ ] 已重新连接项目到 GitHub 仓库
- [ ] Root Directory 设置为 `ui/packages/nextjs`
- [ ] 已更新 GitHub Secrets（如果使用 GitHub Actions）
- [ ] 已重新配置环境变量（如果需要）
- [ ] 测试部署成功

