const fs = require('fs');
const path = require('path');

// Copy built SDK to node_modules
// __dirname is ui/packages/nextjs/scripts
// SDK is at ui/packages/fhevm-sdk/dist
// Target is ui/packages/nextjs/node_modules/@fhevm-sdk
const sdkSource = path.join(__dirname, '../../fhevm-sdk/dist');
const sdkDest = path.join(__dirname, '../node_modules/@fhevm-sdk');

console.log('🔍 Setup SDK Script');
console.log('Current directory:', __dirname);
console.log('SDK Source:', sdkSource);
console.log('SDK Dest:', sdkDest);
console.log('SDK Source exists:', fs.existsSync(sdkSource));
console.log('SDK Dest parent exists:', fs.existsSync(path.dirname(sdkDest)));

// Check if SDK source exists, if not try alternative paths
let actualSdkSource = sdkSource;
if (!fs.existsSync(sdkSource)) {
  // Try relative to current working directory
  const cwdSdkSource = path.resolve(process.cwd(), '../fhevm-sdk/dist');
  if (fs.existsSync(cwdSdkSource)) {
    actualSdkSource = cwdSdkSource;
    console.log('⚠️ Using alternative SDK source:', actualSdkSource);
  } else {
    console.error('❌ SDK dist directory not found at:', sdkSource);
    console.error('❌ Alternative path also not found:', cwdSdkSource);
    console.error('Current working directory:', process.cwd());
    process.exit(1);
  }
}

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

console.log('📦 Copying SDK from', actualSdkSource, 'to', sdkDest);
copyRecursiveSync(actualSdkSource, sdkDest);

// Copy package.json
const sdkPackageJson = path.join(path.dirname(actualSdkSource), 'package.json');
const destPackageJson = path.join(sdkDest, 'package.json');

if (fs.existsSync(sdkPackageJson)) {
  fs.copyFileSync(sdkPackageJson, destPackageJson);
  console.log('✅ SDK package.json copied');
} else {
  console.warn('⚠️ SDK package.json not found at:', sdkPackageJson);
}

console.log('✅ SDK copied to node_modules/@fhevm-sdk');

// Verify the copy was successful
if (fs.existsSync(sdkDest)) {
  console.log('✅ Verification: @fhevm-sdk directory exists');
  const files = fs.readdirSync(sdkDest);
  console.log('✅ SDK files:', files.slice(0, 10).join(', '), files.length > 10 ? '...' : '');
  
  // Check for index.js
  const indexJsPath = path.join(sdkDest, 'index.js');
  if (fs.existsSync(indexJsPath)) {
    console.log('✅ SDK index.js exists');
  } else {
    console.error('❌ SDK index.js not found at:', indexJsPath);
    process.exit(1);
  }
} else {
  console.error('❌ Verification failed: @fhevm-sdk directory not found');
  process.exit(1);
}

