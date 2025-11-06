# Vercel 设置检查清单

## 📋 必须检查的设置

### 位置：Settings → General

1. **Root Directory**
   - 应该设置为：`ui`
   - 位置：General 标签页的最上方

### 位置：Settings → Build & Development Settings

2. **Framework Preset**
   - 应该选择：`Next.js`
   - 如果显示其他值，点击下拉菜单选择 Next.js

3. **Build Command**
   - Override 开关：**关闭（OFF）**
   - 字段内容：可以显示默认值或留空
   - 重要：Override 必须关闭，这样才会使用 `vercel.json` 中的配置

4. **Output Directory**
   - Override 开关：**关闭（OFF）**
   - 字段内容：可以显示 "Next.js default" 或留空
   - 重要：Override 必须关闭

5. **Install Command**
   - Override 开关：**关闭（OFF）**
   - 字段内容：可以显示默认值或留空
   - 重要：Override 必须关闭，这样才会使用 `vercel.json` 中的配置

## 🔍 如何找到这些设置

### 步骤 1：进入项目设置

1. 访问 https://vercel.com
2. 登录并找到你的项目（`vote1`）
3. 点击项目名称进入项目页面
4. 点击顶部导航栏的 **Settings** 标签

### 步骤 2：检查 General 设置

在 Settings 页面，默认显示 **General** 标签：

- 找到 **Root Directory** 字段
- 确认值是 `ui`

### 步骤 3：检查 Build & Development Settings

1. 在 Settings 页面，点击 **Build & Development Settings** 标签
2. 或者向下滚动到 **Build & Development Settings** 部分

在这里你会看到：
- Framework Preset
- Build Command（带 Override 开关）
- Output Directory（带 Override 开关）
- Install Command（带 Override 开关）
- Development Command（带 Override 开关）

## ✅ 正确的配置状态

### General 标签
```
Root Directory: ui
```

### Build & Development Settings 标签
```
Framework Preset: Next.js
Build Command: [Override: OFF] npm run build 或 next build（默认值）
Output Directory: [Override: OFF] Next.js default
Install Command: [Override: OFF] npm install（默认值）
```

## ⚠️ 关于 Production Overrides

如果找不到 "Production Overrides"：

1. **可能被折叠了**：
   - 在 Settings 页面向下滚动
   - 查找可展开的部分
   - 可能显示为 "Production Overrides" 或 "Override Settings"

2. **可能在不同的位置**：
   - 在 Deployments 页面
   - 点击某个部署
   - 查看部署详情中的设置

3. **可以忽略**：
   - 如果找不到，不用担心
   - 只要 Project Settings 中的配置正确即可
   - Project Settings 会覆盖 Production Overrides

## 🎯 关键点

**最重要的检查项**：

1. ✅ Root Directory = `ui`
2. ✅ Framework Preset = `Next.js`
3. ✅ 所有 Override 开关 = **关闭（OFF）**

如果这三项都正确，Vercel 就会：
- 使用 `vercel.json` 中的 `installCommand`
- 使用 `vercel.json` 中的 `buildCommand`
- 正确构建和部署项目

## 📝 如果 Override 开关是打开的

如果某个 Override 开关是**打开（ON）**的：

1. 点击开关将其关闭
2. 字段内容可以留空或显示默认值
3. 点击页面底部的 **Save** 按钮
4. Vercel 会自动触发新的部署

## 🔄 保存更改

完成设置后：

1. 滚动到页面底部
2. 点击 **Save** 按钮
3. 等待 Vercel 自动重新部署
4. 或者手动触发重新部署：
   - 进入 Deployments 页面
   - 点击最新的部署
   - 点击 **Redeploy**

## ✅ 验证

部署成功后，检查构建日志：

1. 进入 Deployments 页面
2. 点击最新的部署
3. 查看 Build Logs
4. 应该看到使用 `vercel.json` 中的命令：
   ```
   Running "cd packages/fhevm-sdk && npm install --legacy-peer-deps && npm run build && cd ../nextjs && npm install --legacy-peer-deps"
   ```

