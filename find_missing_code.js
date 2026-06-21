const fs = require('fs');
const path = require('path');

const pagesDir = path.join(__dirname, 'pages');
const files = fs.readdirSync(pagesDir).filter(f => f.endsWith('.html'));

for (const file of files) {
    const content = fs.readFileSync(path.join(pagesDir, file), 'utf-8');
    
    // Quick regex to find tab-content without code blocks
    const tabs = ['cpp', 'java', 'python', 'js'];
    for (const tab of tabs) {
        const tabStartStr = `id="tab-${tab}"`;
        const tabStart = content.indexOf(tabStartStr);
        if (tabStart !== -1) {
            let tabEnd = content.indexOf('id="tab-', tabStart + tabStartStr.length);
            if (tabEnd === -1) tabEnd = content.lastIndexOf('</section>');
            
            const tabHTML = content.substring(tabStart, tabEnd);
            if (!tabHTML.includes('<pre><code')) {
                console.log(`[${file}] -> ${tab} is missing a code block!`);
            }
        }
    }
}
