const fs = require('fs');
const path = require('path');

// Copy built SDK to node_modules
// __dirname is ui/packages/nextjs/scripts
// SDK is at ui/packages/fhevm-sdk/dist
// Target is ui/packages/nextjs/node_modules/@fhevm-sdk
const sdkSource = path.join(__dirname, '../../fhevm-sdk/dist');
const sdkDest = path.join(__dirname, '../node_modules/@fhevm-sdk');

console.log('🔍 Setup SDK Script');
console.log('SDK Source:', sdkSource);
console.log('SDK Dest:', sdkDest);
console.log('SDK Source exists:', fs.existsSync(sdkSource));

// Create @fhevm-sdk directory
const nodeModulesDir = path.join(__dirname, '../node_modules');
if (!fs.existsSync(nodeModulesDir)) {
  console.log('Creating node_modules directory...');
  fs.mkdirSync(nodeModulesDir, { recursive: true });
}

// Copy dist directory
function copyRecursiveSync(src, dest) {
  if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest, { recursive: true });
  }
  const entries = fs.readdirSync(src, { withFileTypes: true });
  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);
    if (entry.isDirectory()) {
      copyRecursiveSync(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

// Also copy package.json for proper module resolution
const sdkPackageJson = path.join(__dirname, '../../fhevm-sdk/package.json');
const destPackageJson = path.join(sdkDest, 'package.json');

if (fs.existsSync(sdkSource)) {
  console.log('📦 Copying SDK from', sdkSource, 'to', sdkDest);
  copyRecursiveSync(sdkSource, sdkDest);
  if (fs.existsSync(sdkPackageJson)) {
    fs.copyFileSync(sdkPackageJson, destPackageJson);
    console.log('✅ SDK package.json copied');
  }
  console.log('✅ SDK copied to node_modules/@fhevm-sdk');
  
  // Verify the copy was successful
  if (fs.existsSync(sdkDest)) {
    console.log('✅ Verification: @fhevm-sdk directory exists');
  } else {
    console.error('❌ Verification failed: @fhevm-sdk directory not found');
    process.exit(1);
  }
} else {
  console.error('❌ SDK dist directory not found at:', sdkSource);
  console.error('Please ensure SDK is built before running this script.');
  process.exit(1);
}

