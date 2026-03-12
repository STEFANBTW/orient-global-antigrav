const fs = require('fs');
const path = require('path');

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

for (const filePath of allFiles) {
    let content = fs.readFileSync(filePath, 'utf8');
    let originalContent = content;

    // Cleanup top- and pt- duplicates
    content = content.replace(/pt-\[68px\]\s+lg:pt-\[124px\]\s+lg:pt-\[124px\]/g, 'pt-[68px] lg:pt-[124px]');
    content = content.replace(/top-\[68px\]\s+lg:top-\[124px\]\s+lg:top-\[124px\]/g, 'top-[68px] lg:top-[124px]');
    content = content.replace(/top-\[68px\]\s+lg:top-\[124px\]\s+lg:top-\[188px\]/g, 'top-[68px] lg:top-[124px]');
    content = content.replace(/top-\[124px\]\s+lg:top-\[188px\]\s+lg:top-\[188px\]/g, 'top-[124px] lg:top-[188px]');
    content = content.replace(/top-\[132px\]\s+lg:top-\[188px\]\s+lg:top-\[188px\]/g, 'top-[132px] lg:top-[188px]');

    // Also cleanup focus:/ring: hardcoded colors that weren't caught
    content = content.replace(/focus:ring-\[\#ff6a00\]/g, 'focus:ring-[var(--market-primary)]');
    content = content.replace(/focus:border-\[\#ff6a00\]/g, 'focus:border-[var(--market-primary)]');
    content = content.replace(/bg-orange-500/g, 'bg-[var(--market-primary)]');
    content = content.replace(/text-orange-500/g, 'text-[var(--market-primary)]');
    content = content.replace(/text-orange-600/g, 'text-[var(--market-primary-hover)]');
    content = content.replace(/border-orange-500/g, 'border-[var(--market-primary)]');
    content = content.replace(/hover:bg-orange-500/g, 'hover:bg-[var(--market-primary)]');
    content = content.replace(/hover:text-orange-500/g, 'hover:text-[var(--market-primary)]');
    content = content.replace(/hover:text-orange-600/g, 'hover:text-[var(--market-primary-hover)]');

    // Specific fix for Wholesale top offsets if broken
    content = content.replace(/sticky top-\[124px\](?!\s+lg:top-\[188px\])/g, 'sticky top-[124px] lg:top-[188px]');

    if (content !== originalContent) {
        fs.writeFileSync(filePath, content, 'utf8');
        console.log('Cleaned', filePath);
    }
}
