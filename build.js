#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Create dist directory if it doesn't exist
if (!fs.existsSync('dist')) {
    fs.mkdirSync('dist');
}

// Function to read and concatenate files
function concatenateFiles(filePaths, outputPath) {
    let content = '';
    
    filePaths.forEach(filePath => {
        if (fs.existsSync(filePath)) {
            content += fs.readFileSync(filePath, 'utf8') + '\n\n';
        } else {
            console.warn(`Warning: File not found: ${filePath}`);
        }
    });
    
    fs.writeFileSync(outputPath, content);
    console.log(`Created: ${outputPath}`);
}

// Build JavaScript bundle
const jsFiles = [
    'src/core/cssLoader.js',
    'src/core/base.js',
    'src/core/eventBus.js', 
    'src/core/domUtils.js',
    'src/core/componentManager.js',
    'src/core/websiteBuilder.js',
    'src/components/layout/layout.js',
    'src/components/navbar/navbar.js',
    'src/components/hero/hero.js',
    'src/components/section/section.js',
    'src/components/card/card.js',
    'src/components/button/button.js',
    'src/components/input/input.js',
    'src/components/checkbox/checkbox.js',
    'src/components/select/select.js',
    'src/builder/builder.js',
    'src/templates/layouts.js'
];

concatenateFiles(jsFiles, 'dist/picom.js');

// Build CSS bundle
const cssFiles = [
    'src/components/layout/layout.css',
    'src/components/navbar/navbar.css',
    'src/components/hero/hero.css',
    'src/components/section/section.css',
    'src/components/card/card.css',
    'src/components/button/button.css',
    'src/components/input/input.css',
    'src/components/checkbox/checkbox.css',
    'src/components/select/select.css',
    'src/builder/builder.css'
];

concatenateFiles(cssFiles, 'dist/picom.css');

// Create minified version (basic minification)
const jsContent = fs.readFileSync('dist/picom.js', 'utf8');
const minifiedJs = jsContent
    .replace(/\/\*[\s\S]*?\*\//g, '') // Remove block comments
    .replace(/\/\/.*$/gm, '') // Remove line comments
    .replace(/\s+/g, ' ') // Replace multiple spaces with single space
    .replace(/;\s*}/g, '}') // Remove semicolons before closing braces
    .trim();

fs.writeFileSync('dist/picom.min.js', minifiedJs);
console.log('Created: dist/picom.min.js');

console.log('\n✅ Build completed successfully!');
console.log('📦 Files created:');
console.log('   - dist/picom.js (development)');
console.log('   - dist/picom.min.js (production)');
console.log('   - dist/picom.css (styles)');
