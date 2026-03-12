const fs = require('fs');
const path = require('path');

const cssPath = path.join(__dirname, 'index.css');
let cssContent = fs.readFileSync(cssPath, 'utf8');

// 1. Inject Exact Variables into @theme
const exactVarsLight = `
  /* ── Requested PDP Variables ─────────────────────────── */
  --color-bg-light: #ffffff;
  --color-accent-light: #ff6a00;
  --color-text-light: #ffffff;
  --radius-md: 0.75rem;
`;
if (!cssContent.includes('--color-accent-light:')) {
    cssContent = cssContent.replace('@theme {', `@theme {\n${exactVarsLight}`);
}

// 2. Inject Exact Variables into .dark
const exactVarsDark = `
    /* ── Requested PDP Variables (Dark Mode) ── */
    --color-bg-light: #0f172a;
    --color-accent-light: #ff8c33;
    --color-text-light: #f8fafc;
`;
if (cssContent.includes('.dark {') && !cssContent.includes('--color-bg-light: #0f172a')) {
    cssContent = cssContent.replace('.dark {', `.dark {\n${exactVarsDark}`);
}

fs.writeFileSync(cssPath, cssContent, 'utf8');

// 3. Process the TSX files
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

// The exact button styling requested
const pdpButtonClass = `className={\`px-6 py-3 rounded-[var(--radius-md)] font-semibold text-sm transition-all flex items-center justify-center gap-2 \${isAdding ? "bg-emerald-500 text-[var(--color-text-light)] shadow-md shadow-emerald-200" : "bg-[var(--color-accent-light)] text-[var(--color-text-light)] border-none sm:bg-[var(--color-bg-light)] sm:border sm:border-[var(--color-accent-light)] sm:text-[var(--color-accent-light)] active:scale-95 shadow-sm"}\`}`;

for (const filePath of allFiles) {
    let content = fs.readFileSync(filePath, 'utf8');
    let originalContent = content;

    // Find the PDP Add to Cart button and replace it
    // Due to variations in how it was written previously, let's use a regex targeting the core structure of the ADD button.
    // It usually matches: className={`... ${isAdding ? ... : ...}`} or className={`px-6 py-3 rounded-full...`}
    const btnRegex1 = /className=\{\`px-6 py-3 rounded-\w+[^`]+?\`\}/g;
    const btnRegex2 = /className=\{\`px-6 py-3 rounded-\[var\(--radius-md\)\][^`]+?\`\}/g;

    content = content.replace(btnRegex1, (match) => {
        if (match.includes('isAdding')) {
            return pdpButtonClass;
        }
        return match;
    });
    content = content.replace(btnRegex2, (match) => {
        if (match.includes('isAdding')) {
            return pdpButtonClass;
        }
        return match;
    });

    // Global consistency mappings (replace previous --market-* variables with the exact ones requested for background/accent/text if appropriate)
    // For the orange accent:
    content = content.replace(/var\(--market-primary\)/g, 'var(--color-accent-light)');
    content = content.replace(/var\(--market-primary-hover\)/g, 'var(--color-accent-light)');

    // For surface backgrounds on buttons:
    content = content.replace(/var\(--market-surface\)/g, 'var(--color-bg-light)');

    if (content !== originalContent) {
        fs.writeFileSync(filePath, content, 'utf8');
        console.log('Updated', filePath);
    }
}
