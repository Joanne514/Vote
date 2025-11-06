# 更换 Vercel 账号完整指南

## 📋 目录

1. [更换账号的步骤](#更换账号的步骤)
2. [对项目的影响](#对项目的影响)
3. [需要重新配置的内容](#需要重新配置的内容)
4. [常见问题](#常见问题)

---

## 🔄 更换账号的步骤

### 方法一：在新账号中重新导入项目（推荐）

#### 步骤 1：准备新账号

1. **登录新 Vercel 账号**
   - 访问 https://vercel.com
   - 使用新的 GitHub 账号登录（或创建新账号）

2. **确保新账号有权限访问 GitHub 仓库**
   - 在 Vercel Dashboard → Settings → Git
   - 确认已连接正确的 GitHub 账号
   - 如果没有，点击 "Connect Git Provider" 连接

#### 步骤 2：在新账号中创建项目

1. **导入项目**
   - 点击 Dashboard 右上角的 **"Add New..."** → **"Project"**
   - 搜索你的 GitHub 仓库（如 `water4699/vote1`）
   - 点击 **"Import"**

2. **配置项目设置**
   - **Root Directory**: `ui/packages/nextjs`（重要！）
   - **Framework Preset**: `Next.js`（自动检测）
   - **Build Command**: 留空（使用 `vercel.json`）
   - **Output Directory**: 留空
   - **Install Command**: 留空（使用 `vercel.json`）

3. **配置环境变量**
   - 进入 **Settings** → **Environment Variables**
   - 添加以下变量（如果之前有设置）：
     - `NEXT_PUBLIC_ALCHEMY_API_KEY`
     - `NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID`

4. **部署项目**
   - 点击 **"Deploy"**
   - 等待构建完成

#### 步骤 3：更新 GitHub Secrets（如果使用 GitHub Actions）

如果项目使用 GitHub Actions 自动部署，需要更新 GitHub Secrets：

1. **获取新的 Vercel Token**
   - 在新 Vercel 账号中：**Settings** → **Tokens**
   - 创建新 Token：点击 **"Create Token"**
   - 输入名称（如：`github-actions-deploy`）
   - 选择过期时间（建议 "No Expiration"）
   - **复制 Token**（只显示一次）

2. **获取新的 Org ID 和 Project ID**
   - 在新项目设置中：**Settings** → **General**
   - 找到 **Project ID**（格式：`prj_xxxxxxxxxxxxx`）
   - 找到 **Team ID**（格式：`team_xxxxxxxxxxxxx`）

3. **更新 GitHub Secrets**
   - 进入 GitHub 仓库：**Settings** → **Secrets and variables** → **Actions**
   - 更新以下 Secrets：
     - `VERCEL_TOKEN`：新的 Token
     - `VERCEL_ORG_ID`：新的 Team ID
     - `VERCEL_PROJECT_ID`：新的 Project ID

#### 步骤 4：删除旧项目（可选）

1. **在旧 Vercel 账号中**
   - 进入项目设置
   - **Settings** → **General** → 滚动到底部
   - 点击 **"Delete Project"**
   - 确认删除

---

### 方法二：转移项目所有权（如果两个账号在同一团队）

如果两个账号在同一个 Vercel Team 中：

1. **在旧账号中**
   - 进入项目设置
   - **Settings** → **General** → **Transfer Project**
   - 选择要转移到的团队/账号
   - 确认转移

2. **在新账号中**
   - 确认项目已出现在 Dashboard
   - 检查所有设置是否正确

---

## ⚠️ 对项目的影响

### ✅ 不会影响的内容

1. **代码仓库**
   - GitHub 仓库不受影响
   - 所有代码保持不变

2. **本地开发**
   - 本地开发环境不受影响
   - `pnpm dev` 等命令正常工作

3. **合约部署**
   - 智能合约部署不受影响
   - 合约地址保持不变

4. **项目配置**
   - `vercel.json` 配置保持不变
   - `package.json` 等配置文件不受影响

### ⚠️ 需要重新配置的内容

1. **Vercel 项目设置**
   - Root Directory
   - Build Command
   - Output Directory
   - Install Command
   - 环境变量

2. **部署域名**
   - 旧的部署 URL 会失效
   - 新账号会生成新的 URL（格式：`project-name.vercel.app`）
   - 如果需要，可以配置自定义域名

3. **GitHub Actions（如果使用）**
   - 需要更新 GitHub Secrets
   - `VERCEL_TOKEN`
   - `VERCEL_ORG_ID`
   - `VERCEL_PROJECT_ID`

4. **环境变量**
   - 需要在新账号中重新添加所有环境变量
   - 包括 API Keys、Project IDs 等

5. **部署历史**
   - 旧的部署历史不会迁移
   - 新账号从新的部署开始

---

## 🔧 需要重新配置的内容

### 1. Vercel 项目设置

在新账号中创建项目后，确认以下设置：

| 设置项 | 值 | 位置 |
|--------|-----|------|
| **Root Directory** | `ui/packages/nextjs` | Settings → General |
| **Framework Preset** | `Next.js` | Settings → General |
| **Build Command** | 留空（使用 vercel.json） | Settings → Build & Development |
| **Output Directory** | 留空 | Settings → Build & Development |
| **Install Command** | 留空（使用 vercel.json） | Settings → Build & Development |

### 2. 环境变量

在新账号中添加以下环境变量：

```
NEXT_PUBLIC_ALCHEMY_API_KEY=<你的 Alchemy API Key>
NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID=<你的 WalletConnect Project ID>
```

**设置步骤：**
1. 进入项目设置：**Settings** → **Environment Variables**
2. 点击 **"Add New"**
3. 输入变量名和值
4. 选择环境（Production、Preview、Development）
5. 点击 **"Save"**

### 3. GitHub Secrets（如果使用 GitHub Actions）

更新以下 GitHub Secrets：

```
VERCEL_TOKEN=<新账号的 Token>
VERCEL_ORG_ID=<新账号的 Team ID>
VERCEL_PROJECT_ID=<新项目的 Project ID>
```

**设置步骤：**
1. 进入 GitHub 仓库：**Settings** → **Secrets and variables** → **Actions**
2. 找到对应的 Secret
3. 点击 **"Update"**
4. 输入新值
5. 点击 **"Update secret"**

---

## ❓ 常见问题

### Q1: 更换账号后，旧的部署 URL 还能访问吗？

**A:** 不能。旧的部署 URL 会失效。新账号会生成新的 URL。如果需要保持相同的 URL，可以：
- 在新账号中配置自定义域名
- 或者使用相同的项目名称（如果可用）

### Q2: 环境变量会丢失吗？

**A:** 是的。环境变量不会自动迁移，需要在新账号中重新添加。

### Q3: 部署历史会保留吗？

**A:** 不会。新账号会从新的部署开始，旧的部署历史不会迁移。

### Q4: 更换账号会影响本地开发吗？

**A:** 不会。本地开发完全不受影响。

### Q5: 如何确保新账号的配置正确？

**A:** 检查清单：
- [ ] Root Directory 设置为 `ui/packages/nextjs`
- [ ] 所有环境变量已添加
- [ ] GitHub Secrets 已更新（如果使用 GitHub Actions）
- [ ] 首次部署成功
- [ ] 网站可以正常访问

### Q6: 可以同时使用两个账号部署同一个项目吗？

**A:** 可以，但不推荐。两个账号会生成不同的 URL，可能会造成混淆。建议只使用一个账号。

### Q7: 更换账号后，GitHub Actions 部署失败怎么办？

**A:** 检查：
1. GitHub Secrets 是否已更新
2. Vercel Token 是否有效
3. Org ID 和 Project ID 是否正确
4. GitHub Actions 日志中的错误信息

---

## 📝 快速检查清单

更换账号后，确认以下内容：

- [ ] 新账号已登录 Vercel
- [ ] 新账号已连接 GitHub
- [ ] 项目已在新账号中创建
- [ ] Root Directory 设置为 `ui/packages/nextjs`
- [ ] 所有环境变量已添加
- [ ] GitHub Secrets 已更新（如果使用）
- [ ] 首次部署成功
- [ ] 网站可以正常访问
- [ ] 功能测试通过

---

## 🔗 相关文档

- [Vercel 官方文档](https://vercel.com/docs)
- [GitHub Actions 部署配置](../.github/workflows/vercel-deploy.yml)
- [Vercel 配置文件](../ui/packages/nextjs/vercel.json)

