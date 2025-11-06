# Vercel 登录和 Git 配置指南

## 🔐 Vercel 登录方式

Vercel 使用 **GitHub OAuth** 登录，不是直接使用用户名、邮箱和 token。

### 方法 1：通过 GitHub 账户登录（推荐）

1. **访问 Vercel**：
   - 打开 https://vercel.com
   - 点击右上角的 **"Sign Up"** 或 **"Log In"**

2. **选择 GitHub 登录**：
   - 点击 **"Continue with GitHub"** 按钮
   - 会跳转到 GitHub 授权页面

3. **授权 Vercel**：
   - 使用 `Joanne514` GitHub 账户登录
   - 授权 Vercel 访问你的 GitHub 账户
   - 完成授权后会自动跳回 Vercel

4. **确认账户**：
   - 登录后，在 Vercel Dashboard 右上角可以看到你的账户信息
   - 确认显示的是 `Joanne514` 账户

### 方法 2：使用 Vercel CLI（如果需要）

如果你需要使用命令行工具：

```bash
# 安装 Vercel CLI
npm install -g vercel

# 登录
vercel login
```

然后选择 GitHub 登录方式。

## 🔧 Git 配置（使用 Token）

如果你需要在本地 Git 中使用 token 进行推送：

### 配置 Git 使用 Token

```bash
# 设置用户名和邮箱
git config user.name "Joanne514"
git config user.email "sugarkusarmt@outlook.com"

# 设置远程仓库 URL（包含 token）
git remote set-url origin https://ghp_YOUR_TOKEN@github.com/Joanne514/Vote.git
```

**注意**：将 `YOUR_TOKEN` 替换为你的实际 GitHub Personal Access Token。

### 安全建议

**不推荐**在 URL 中直接包含 token，更好的方式是：

1. **使用 Git Credential Manager**（Windows）：
   ```bash
   # 配置 Git 使用 credential helper
   git config --global credential.helper manager-core
   
   # 推送时会提示输入用户名和 token
   git push origin main
   ```

2. **使用 SSH Key**（更安全）：
   ```bash
   # 生成 SSH key（如果还没有）
   ssh-keygen -t ed25519 -C "sugarkusarmt@outlook.com"
   
   # 将公钥添加到 GitHub
   # 复制 ~/.ssh/id_ed25519.pub 的内容
   # 在 GitHub Settings > SSH and GPG keys 中添加
   
   # 使用 SSH URL
   git remote set-url origin git@github.com:Joanne514/Vote.git
   ```

## 📋 完整步骤

### 步骤 1：登录 Vercel

1. 访问 https://vercel.com
2. 点击 **"Continue with GitHub"**
3. 使用 `Joanne514` GitHub 账户登录并授权

### 步骤 2：创建新项目

1. 点击 **"Add New..."** → **"Project"**
2. 搜索并选择 `Joanne514/Vote` 仓库
3. 配置项目设置（参考 `VERCEL_NEW_PROJECT_SETUP.md`）

### 步骤 3：配置 Git（如果需要本地推送）

```bash
# 在项目目录中
cd E:\Spring\Zama\Vote

# 配置 Git 用户信息
git config user.name "Joanne514"
git config user.email "sugarkusarmt@outlook.com"

# 如果需要使用 token，设置远程 URL
# 方式 1：在 URL 中包含 token（不推荐，但简单）
git remote set-url origin https://ghp_YOUR_TOKEN@github.com/Joanne514/Vote.git

# 方式 2：使用 credential helper（推荐）
git config --global credential.helper manager-core
git remote set-url origin https://github.com/Joanne514/Vote.git
# 推送时会提示输入用户名和 token
```

## ⚠️ 重要提示

1. **Vercel 登录**：
   - Vercel 只支持 GitHub OAuth 登录
   - 不能直接使用用户名、邮箱和 token 登录
   - 必须通过 GitHub 账户授权

2. **Git Token 使用**：
   - Token 用于 Git 推送/拉取代码
   - 不是用于 Vercel 登录
   - 建议使用 Git Credential Manager 而不是在 URL 中直接包含 token

3. **GitHub Token 权限**：
   - 确保 token 有 `repo` 权限（用于访问私有仓库）
   - Token 格式：`ghp_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx`

## 🔍 验证配置

### 验证 Vercel 登录

1. 访问 https://vercel.com
2. 查看右上角账户信息
3. 确认显示 `Joanne514`

### 验证 Git 配置

```bash
# 检查用户信息
git config user.name
git config user.email

# 检查远程仓库
git remote -v

# 测试推送（会提示输入凭证）
git push origin main
```

## 📝 快速参考

### Vercel 登录
- URL: https://vercel.com
- 方式: GitHub OAuth
- 账户: Joanne514

### Git 配置
- 用户名: Joanne514
- 邮箱: sugarkusarmt@outlook.com
- 仓库: https://github.com/Joanne514/Vote.git

### Token 使用
- 用途: Git 推送/拉取
- 格式: `ghp_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx`
- 权限: `repo`（如果需要访问私有仓库）

