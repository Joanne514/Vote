# FHEVM Relayer 连接问题解决指南

## 🔍 问题描述

在 Sepolia 测试网上使用 FHEVM 功能时，可能会遇到以下错误：

```
FHEVM Relayer connection failed: Relayer didn't response correctly. 
Bad status . Content: {"message":"Transaction rejected: \"Input request failed: 
Transaction failed: Transaction failed: Failed to check contract code: 
backend connection task has stopped\""}
```

## 📋 问题原因

1. **Zama 公共 Relayer 服务**：
   - Sepolia 测试网依赖 Zama 提供的公共 relayer 服务
   - 该服务可能暂时不可用或不稳定
   - 这是外部服务问题，不是项目代码问题

2. **网络连接问题**：
   - Relayer 服务可能因为网络问题无法访问
   - 或者服务正在维护中

## ✅ 解决方案

### 方案 1：切换到 Localhost（推荐用于测试）

这是最可靠的测试方式，因为使用本地 Hardhat 节点和本地 relayer。

#### 步骤 1：启动本地 Hardhat 节点

```bash
# 在项目根目录
cd E:\Spring\Zama\Vote

# 启动本地节点
npx hardhat node
```

保持这个终端运行，你会看到：
- 本地节点运行在 `http://localhost:8545`
- 多个测试账户和私钥
- Chain ID: 31337

#### 步骤 2：部署合约到本地网络

打开**新的终端**：

```bash
# 在项目根目录
cd E:\Spring\Zama\Vote

# 部署合约
npx hardhat deploy --network localhost
```

#### 步骤 3：启动前端应用

打开**另一个新终端**：

```bash
# 进入 UI 目录
cd E:\Spring\Zama\Vote\ui\packages\nextjs

# 启动开发服务器
pnpm dev
# 或
npm run dev
```

#### 步骤 4：在浏览器中连接

1. 访问 http://localhost:3000
2. 连接钱包（MetaMask）
3. **重要**：切换到 Hardhat Local 网络
   - 如果 MetaMask 中没有 Hardhat Local 网络，需要添加：
     - Network Name: `Hardhat Local`
     - RPC URL: `http://localhost:8545`
     - Chain ID: `31337`
     - Currency Symbol: `ETH`

#### 步骤 5：导入测试账户到 MetaMask

从 Hardhat 节点终端复制一个账户的私钥，在 MetaMask 中导入账户。

### 方案 2：等待 Sepolia Relayer 恢复

如果必须使用 Sepolia 测试网：

1. **检查 Zama 状态**：
   - 访问 Zama 官方文档或 Discord
   - 查看是否有服务状态公告

2. **稍后重试**：
   - Relayer 服务可能只是暂时不可用
   - 等待一段时间后重试

3. **使用其他测试网**：
   - 如果 Zama 支持其他测试网，可以尝试切换

## 🔧 配置 MetaMask 添加 Hardhat Local 网络

### 方法 1：手动添加

1. 打开 MetaMask
2. 点击网络下拉菜单
3. 选择 "Add Network" → "Add a network manually"
4. 填写以下信息：
   ```
   Network Name: Hardhat Local
   RPC URL: http://localhost:8545
   Chain ID: 31337
   Currency Symbol: ETH
   Block Explorer URL: (留空)
   ```
5. 点击 "Save"

### 方法 2：使用 Hardhat 自动配置

如果使用 Hardhat，可以在 `hardhat.config.ts` 中配置，然后运行：

```bash
npx hardhat node --hostname 0.0.0.0
```

## 📝 本地测试完整流程

### 1. 启动本地节点（终端 1）

```bash
cd E:\Spring\Zama\Vote
npx hardhat node
```

### 2. 部署合约（终端 2）

```bash
cd E:\Spring\Zama\Vote
npx hardhat deploy --network localhost
```

### 3. 启动前端（终端 3）

```bash
cd E:\Spring\Zama\Vote\ui\packages\nextjs
pnpm dev
```

### 4. 在浏览器中

1. 访问 http://localhost:3000
2. 连接 MetaMask
3. 切换到 Hardhat Local 网络（Chain ID: 31337）
4. 开始测试投票功能

## ⚠️ 重要提示

1. **Localhost vs Sepolia**：
   - Localhost：完全本地，不需要外部服务，最稳定
   - Sepolia：需要 Zama Relayer 服务，可能不稳定

2. **测试账户**：
   - Localhost 使用 Hardhat 提供的测试账户
   - 这些账户有足够的测试 ETH（免费）
   - Sepolia 需要真实的 Sepolia ETH（从 faucet 获取）

3. **合约地址**：
   - Localhost 和 Sepolia 的合约地址不同
   - 前端会自动检测网络并加载对应的合约地址

## 🔍 验证 Relayer 连接

### Localhost

- Relayer 是本地 Hardhat 节点的一部分
- 不需要外部连接
- 应该始终可用

### Sepolia

- 依赖 Zama 公共 relayer 服务
- 如果服务不可用，会显示错误信息
- 需要等待服务恢复或切换到 localhost

## 📚 相关文档

- [FHEVM Documentation](https://docs.zama.ai/fhevm)
- [Hardhat Network Configuration](https://hardhat.org/hardhat-network/docs/overview)
- [Zama Discord](https://discord.gg/zama) - 获取 relayer 服务状态更新

## 🆘 故障排除

### 问题 1：无法连接到 localhost:8545

**解决方案**：
- 确认 Hardhat 节点正在运行
- 检查端口 8545 是否被占用
- 尝试使用 `npx hardhat node --port 8546` 使用不同端口

### 问题 2：MetaMask 无法连接到 Hardhat Local

**解决方案**：
- 确认 RPC URL 正确：`http://localhost:8545`
- 确认 Chain ID 正确：`31337`
- 尝试重启 MetaMask

### 问题 3：合约未部署

**解决方案**：
- 运行 `npx hardhat deploy --network localhost`
- 检查部署输出中的合约地址
- 确认 `deployedContracts.ts` 中有 localhost 的合约地址

## ✅ 总结

**推荐做法**：
- 开发和测试：使用 **localhost**（Chain ID: 31337）
- 生产或演示：等待 Sepolia relayer 恢复或使用其他稳定网络

**快速切换**：
- 在 MetaMask 中切换网络即可
- 前端会自动检测网络并加载对应的合约

