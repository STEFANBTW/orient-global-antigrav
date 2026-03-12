const fs = require('fs');
const path = require('path');

const cssPath = path.join(__dirname, 'index.css');
let cssContent = fs.readFileSync(cssPath, 'utf8');

// 1. Add market-theme to index.css if not exists
if (!cssContent.includes('--market-primary')) {
    const rootThemeIdx = cssContent.indexOf('@theme {');
    if (rootThemeIdx !== -1) {
        const endIdx = cssContent.indexOf('}', rootThemeIdx);
        const newVars = `
  /* ── Market App Global Colors ─────────────────────────── */
  --market-primary: #ff6a00;
  --market-primary-hover: #e65c00;
  --market-bg: #f8f7f5;
  --market-surface: #ffffff;
  --market-card: #ffffff;
  --market-heading: #0f172a;
  --market-text: #334155;
  --market-muted: #64748b;
  --market-border: #e2e8f0;
`;
        // Add inside @theme
        cssContent = cssContent.replace('@theme {', `@theme {\n${newVars}`);
    }
}

if (!cssContent.includes('.dark {') || !cssContent.includes('--market-bg: #020617')) {
    // Let's add the dark mode mapping to .dark inside @layer base if we need them as CSS vars, 
    // BUT wait! Tailwind v4 with `@theme` exposes `--market-...` which are globally available.
    // To redefine them for dark mode, we just add them to `.dark`
    const darkLayerRegex = /\.dark\s*\{/;
    if (darkLayerRegex.test(cssContent)) {
        if (!cssContent.includes('--market-bg: #020617')) {
            cssContent = cssContent.replace(darkLayerRegex, `.dark {\n    /* ── Market Dark Colors ── */\n    --market-primary: #ff8c33;\n    --market-primary-hover: #ff9d52;\n    --market-bg: #020617;\n    --market-surface: #0f172a;\n    --market-card: #1e293b;\n    --market-heading: #f8fafc;\n    --market-text: #cbd5e1;\n    --market-muted: #94a3b8;\n    --market-border: #334155;\n`);
        }
    }
}
fs.writeFileSync(cssPath, cssContent, 'utf8');

// 2. Find and replace in all TSX files
function buildFileList(dir, fileList = []) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const filePath = path.join(dir, file);
        if (fs.statSync(filePath).isDirectory()) {
            buildFileList(filePath, fileList);
        } else if (filePath.endsWith('.tsx')) {
            fileList.push(filePath);
        }
    }
    return fileList;
}

const supermarketDir = path.join(__dirname, 'src', 'supermarket');
const allFiles = buildFileList(supermarketDir);

const newPDPBtnClass = `className={\`px-6 py-3 rounded-full font-semibold text-sm transition-all flex items-center justify-center gap-2 \${isAdding ? "bg-emerald-500 text-white shadow-md shadow-emerald-200 border border-emerald-500" : "bg-[var(--market-primary)] text-white border-none sm:bg-[var(--market-surface)] sm:border sm:border-[var(--market-primary)] sm:text-[var(--market-primary)] active:scale-95 shadow-sm"}\`}`;

for (const filePath of allFiles) {
    let content = fs.readFileSync(filePath, 'utf8');
    let originalContent = content;

    // Replace common hardcoded hex
    content = content.replace(/bg-\[\#ff6a00\]/g, 'bg-[var(--market-primary)]');
    content = content.replace(/text-\[\#ff6a00\]/g, 'text-[var(--market-primary)]');
    content = content.replace(/text-\[\#ff7300\]/g, 'text-[var(--market-primary)]');
    content = content.replace(/border-\[\#ff6a00\]/g, 'border-[var(--market-primary)]');
    content = content.replace(/from-\[\#ff6a00\]/g, 'from-[var(--market-primary)]');
    content = content.replace(/to-\[\#ff6a00\]/g, 'to-[var(--market-primary)]');

    // Replace old offset with new responsive offset
    content = content.replace(/pt-\[68px\](?!\s*lg:pt-\[124px\])/g, 'pt-[68px] lg:pt-[124px]');
    content = content.replace(/top-\[68px\](?!\s*lg:top-\[124px\])/g, 'top-[68px] lg:top-[124px]');

    // Wholesale specific top offset for table header & sidebar
    content = content.replace(/top-\[124px\](?!\s*lg:top-\[188px\])/g, 'top-[124px] lg:top-[188px]');
    content = content.replace(/top-\[132px\](?!\s*lg:top-\[188px\])/g, 'top-[132px] lg:top-[188px]');

    // Replace Add to cart PDP modal button specifically
    // Needs to match: className={`... ${isAdding ? "bg-emerald-500..." : "bg-gradient-to-r from-orange-500 to-orange-600..."}`}
    // or `className={`px-6 py-3 rounded-xl...`}`
    const btnRegex = /className=\{\`px-6 py-3 rounded-xl[^`]+?\`\}/g;
    content = content.replace(btnRegex, (match) => {
        if (match.includes('isAdding')) {
            return newPDPBtnClass;
        }
        return match;
    });

    // Handle standard buttons that use hardcoded bg-orange-500
    // (We'll safely leave non-modal buttons as is, except changing rounded-xl to rounded-full for consistency if requested, but prompt specifically asked for PDP)

    if (content !== originalContent) {
        fs.writeFileSync(filePath, content, 'utf8');
        console.log('Updated', filePath);
    }
}
