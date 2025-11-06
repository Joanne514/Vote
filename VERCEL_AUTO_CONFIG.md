# Vercel 自动配置说明

## ✅ 自动配置（无需手动操作）

Vercel **会自动**读取 `vercel.json` 文件中的配置，你**不需要**手动在 Dashboard 中设置这些命令。

### 自动读取的配置

Vercel 会自动从 `ui/packages/nextjs/vercel.json` 读取：

```json
{
  "buildCommand": "cd packages/nextjs && npm run build",
  "installCommand": "cd packages/fhevm-sdk && npm install --legacy-peer-deps && npm run build && cd ../nextjs && npm install --legacy-peer-deps"
}
```

## 📋 只需确认 Vercel Dashboard 设置

在 Vercel Dashboard 中，**只需要确认**以下设置：

### 必须设置的项

1. **Root Directory**: `ui`
   - 这是**唯一必须手动设置**的项
   - 位置：Project Settings → General → Root Directory
   - 设置为：`ui`

### 应该留空的项（使用 vercel.json）

以下项应该**留空**（Vercel 会自动使用 `vercel.json` 中的配置）：

1. **Build Command**: 留空
2. **Output Directory**: 留空
3. **Install Command**: 留空

## 🔍 如何检查设置

### 步骤 1：进入项目设置

1. 访问 https://vercel.com
2. 登录并找到你的项目（连接到 `water4699/vote1`）
3. 点击项目名称进入项目页面
4. 点击 **Settings** 标签

### 步骤 2：检查 General 设置

在 **General** 部分：

- **Root Directory**: 应该是 `ui`
- 如果显示其他值或为空，点击 **Edit** 并设置为 `ui`

### 步骤 3：检查 Build & Development Settings

在 **Build & Development Settings** 部分：

- **Framework Preset**: 应该是 `Next.js`（自动检测）
- **Build Command**: 应该**留空**（显示 "Leave empty to use default"）
- **Output Directory**: 应该**留空**（显示 "Leave empty to use default"）
- **Install Command**: 应该**留空**（显示 "Leave empty to use default"）

## ⚠️ 如果设置不正确

### 如果 Root Directory 不是 `ui`

1. 点击 **Edit** 按钮
2. 输入 `ui`
3. 点击 **Save**
4. Vercel 会自动触发新的部署

### 如果 Build/Install Command 不是留空

1. 点击 **Override** 旁边的 **Reset** 或 **Clear**
2. 让这些字段留空
3. 点击 **Save**
4. Vercel 会自动使用 `vercel.json` 中的配置

## ✅ 验证配置

部署成功后，检查构建日志：

1. 在 Vercel Dashboard 中点击最新的部署
2. 查看 **Build Logs**
3. 应该看到：
   ```
   Running "cd packages/fhevm-sdk && npm install --legacy-peer-deps && npm run build && cd ../nextjs && npm install --legacy-peer-deps"
   ```
   和
   ```
   Running "cd packages/nextjs && npm run build"
   ```

## 📝 总结

- ✅ **自动**：Vercel 会自动读取 `vercel.json` 配置
- ✅ **只需确认**：Root Directory 设置为 `ui`
- ✅ **应该留空**：Build Command、Output Directory、Install Command
- ❌ **不需要**：手动输入这些命令（Vercel 会自动使用 `vercel.json`）

## 🚀 下一步

1. 确认 Root Directory 是 `ui`
2. 确认其他命令字段留空
3. 等待 Vercel 自动部署（或手动触发重新部署）
4. 查看构建日志确认配置正确

