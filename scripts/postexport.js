/**
 * Post-export script for GitHub Pages deployment.
 * 1. Injects CSS-only phone frame into index.html for desktop viewers
 * 2. Creates 404.html (copy of index.html) for SPA client-side routing
 * 3. Creates .nojekyll to prevent Jekyll processing
 */
const fs = require('fs');
const path = require('path');

const distDir = path.join(__dirname, '..', 'dist');
const indexPath = path.join(distDir, 'index.html');

// Phone frame CSS — only applies on screens >= 640px wide
const phoneFrameCSS = `
<style>
  @media (min-width: 640px) {
    html, body {
      background-color: #000000 !important;
      display: flex !important;
      align-items: center !important;
      justify-content: center !important;
      min-height: 100vh !important;
    }
    #root {
      width: 400px !important;
      max-width: 400px !important;
      height: 850px !important;
      max-height: 95vh !important;
      border-radius: 40px !important;
      border: 8px solid #4b5563 !important;
      overflow: hidden !important;
      box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25) !important;
      position: relative !important;
    }
  }
</style>
`;

// Read index.html
let html = fs.readFileSync(indexPath, 'utf8');

// Inject phone frame CSS before closing </head>
html = html.replace('</head>', phoneFrameCSS + '</head>');

// Write modified index.html
fs.writeFileSync(indexPath, html);
console.log('✅ Injected phone frame CSS into index.html');

// Copy to 404.html for SPA routing on GitHub Pages
fs.copyFileSync(indexPath, path.join(distDir, '404.html'));
console.log('✅ Created 404.html for SPA routing');

// Create .nojekyll
fs.writeFileSync(path.join(distDir, '.nojekyll'), '');
console.log('✅ Created .nojekyll');
