const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('🔨 Building Picom UI Library (TypeScript)...\n');

// Clean dist directory
if (fs.existsSync('dist')) {
  fs.rmSync('dist', { recursive: true, force: true });
}
fs.mkdirSync('dist', { recursive: true });

// Compile TypeScript
console.log('📝 Compiling TypeScript...');
try {
  execSync('npx tsc', { stdio: 'inherit' });
  console.log('✅ TypeScript compilation completed\n');
} catch (error) {
  console.error('❌ TypeScript compilation failed:', error.message);
  process.exit(1);
}

// Build JavaScript bundle
console.log('📦 Building JavaScript bundle...');
const jsFiles = [
  'dist/types/index.js',
  'dist/types/components.js',
  'dist/core/BaseComponent.js',
  'dist/core/ComponentManager.js',
  'dist/components/input/InputComponent.js',
  'dist/components/button/ButtonComponent.js',
  'dist/index.js'
];

let jsContent = '';
jsFiles.forEach(file => {
  if (fs.existsSync(file)) {
    jsContent += fs.readFileSync(file, 'utf8') + '\n';
    console.log(`  ✓ Added ${file}`);
  } else {
    console.log(`  ⚠️  Skipped ${file} (not found)`);
  }
});

// Write bundled JavaScript
fs.writeFileSync('dist/picom.js', jsContent);
console.log('✅ JavaScript bundle created: dist/picom.js');

// Minify JavaScript
console.log('🗜️  Minifying JavaScript...');
try {
  execSync('npx uglifyjs dist/picom.js -o dist/picom.min.js', { stdio: 'inherit' });
  console.log('✅ Minified JavaScript created: dist/picom.min.js');
} catch (error) {
  console.error('❌ Minification failed:', error.message);
  process.exit(1);
}

// Build CSS bundle
console.log('🎨 Building CSS bundle...');
const cssFiles = [
  'src/components/input/input.css',
  'src/components/button/button.css',
  'src/components/checkbox/checkbox.css',
  'src/components/select/select.css',
  'src/components/card/card.css',
  'src/components/navbar/navbar.css',
  'src/components/hero/hero.css',
  'src/components/section/section.css',
  'src/components/layout/layout.css',
  'src/builder/builder.css'
];

let cssContent = '';
cssFiles.forEach(file => {
  if (fs.existsSync(file)) {
    cssContent += fs.readFileSync(file, 'utf8') + '\n';
    console.log(`  ✓ Added ${file}`);
  } else {
    console.log(`  ⚠️  Skipped ${file} (not found)`);
  }
});

// Write bundled CSS
fs.writeFileSync('dist/picom.css', cssContent);
console.log('✅ CSS bundle created: dist/picom.css');

// Copy TypeScript declarations
console.log('📋 Copying TypeScript declarations...');
if (fs.existsSync('dist/index.d.ts')) {
  fs.copyFileSync('dist/index.d.ts', 'dist/picom.d.ts');
  console.log('✅ TypeScript declarations copied: dist/picom.d.ts');
}

console.log('\n🎉 Build completed successfully!');
console.log('📦 Files created:');
console.log('   - dist/picom.js (development)');
console.log('   - dist/picom.min.js (production)');
console.log('   - dist/picom.css (styles)');
console.log('   - dist/picom.d.ts (TypeScript declarations)');
console.log('\n🚀 Ready for use!');
