# Vercel 新建项目连接指南

## 🚀 在 Vercel 中创建新项目并连接到 Joanne514/Vote

### 步骤 1：登录 Vercel

1. 访问 https://vercel.com
2. 使用 GitHub 账户登录（确保使用 `Joanne514` 账户）

### 步骤 2：创建新项目

1. 点击 Dashboard 右上角的 **"Add New..."** 按钮
2. 选择 **"Project"**

### 步骤 3：导入 Git 仓库

1. 在 "Import Git Repository" 页面，搜索 `Joanne514/Vote`
2. 如果找不到，点击 **"Adjust GitHub App Permissions"** 确保 Vercel GitHub App 有权限访问该仓库
3. 找到 `Joanne514/Vote` 后，点击 **"Import"**

### 步骤 4：配置项目设置

在项目配置页面，**重要设置**如下：

#### Framework Preset
- 选择：**Next.js**

#### Root Directory
- **必须设置为**：`ui`
- 点击 "Edit" 或 "Override" 按钮
- 输入：`ui`

#### Build and Output Settings

**Build Command**：
- **留空**（使用 `vercel.json` 中的配置）
- 或者设置为：`cd packages/nextjs && npm run build`

**Output Directory**：
- **留空**（Next.js 自动处理）
- **不要**填写 `.next` 或 `public`

**Install Command**：
- **留空**（使用 `vercel.json` 中的配置）
- 或者设置为：`cd packages/fhevm-sdk && npm install --legacy-peer-deps && npm run build && cd ../nextjs && npm install --legacy-peer-deps`

#### Environment Variables（可选）

如果需要，可以添加：
- `NEXT_PUBLIC_ALCHEMY_API_KEY`（可选）
- `NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID`（可选）

### 步骤 5：部署

1. 点击 **"Deploy"** 按钮
2. 等待构建完成
3. 查看构建日志确认是否成功

## ✅ 配置检查清单

部署前确认：

- [ ] Framework Preset: **Next.js**
- [ ] Root Directory: **`ui`**（重要！）
- [ ] Build Command: **留空**（或使用上面的命令）
- [ ] Output Directory: **留空**
- [ ] Install Command: **留空**（或使用上面的命令）
- [ ] Git Repository: **Joanne514/Vote**
- [ ] Branch: **main**

## 📋 当前项目配置

### `ui/packages/nextjs/vercel.json`

```json
{
  "buildCommand": "cd packages/nextjs && npm run build",
  "installCommand": "cd packages/fhevm-sdk && npm install --legacy-peer-deps && npm run build && cd ../nextjs && npm install --legacy-peer-deps"
}
```

这个配置假设 Root Directory 是 `ui`。

## 🔍 验证部署

部署成功后：

1. **检查构建日志**：
   - 应该看到 SDK 构建成功
   - Next.js 应用构建成功
   - 没有 `preinstall` 或 `pnpm` 相关错误

2. **访问部署的 URL**：
   - Vercel 会提供一个预览 URL
   - 例如：`https://vote-xxx.vercel.app`

3. **测试功能**：
   - 连接钱包
   - 创建投票
   - 投票功能

## ⚠️ 常见问题

### 问题 1：找不到仓库

**解决方案**：
- 确保使用 `Joanne514` GitHub 账户登录 Vercel
- 检查 Vercel GitHub App 权限
- 在 GitHub 设置中授权 Vercel 访问 `Joanne514/Vote` 仓库

### 问题 2：构建失败 - "preinstall" 错误

**解决方案**：
- 确认 Root Directory 设置为 `ui`
- 确认 `vercel.json` 中的路径正确
- 清除构建缓存并重新部署

### 问题 3：路径错误

**解决方案**：
- 如果 Root Directory 是 `ui`，路径应该是 `packages/fhevm-sdk` 和 `packages/nextjs`
- 如果 Root Directory 是 `ui/packages/nextjs`，路径应该是 `../fhevm-sdk`

## 📝 快速参考

### 正确的 Vercel 设置（Root Directory: `ui`）

```
Framework Preset: Next.js
Root Directory: ui
Build Command: (留空，使用 vercel.json)
Output Directory: (留空)
Install Command: (留空，使用 vercel.json)
```

### 如果手动设置命令

```
Build Command: cd packages/nextjs && npm run build
Install Command: cd packages/fhevm-sdk && npm install --legacy-peer-deps && npm run build && cd ../nextjs && npm install --legacy-peer-deps
```

## 🎯 下一步

1. 按照上述步骤创建新项目
2. 配置 Root Directory 为 `ui`
3. 部署并检查构建日志
4. 如果遇到问题，查看构建日志中的具体错误信息

