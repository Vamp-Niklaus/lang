const fs = require('fs');
const path = require('path');

const dataFile = process.argv[2];
if (!dataFile) {
    console.error("Please provide a JSON data file as argument.");
    process.exit(1);
}

const dataPath = path.resolve(dataFile);
const pagesDir = path.join(__dirname, 'pages');

const mappingData = require(dataPath);

for (const [filename, langs] of Object.entries(mappingData)) {
    const filePath = path.join(pagesDir, filename);
    if (!fs.existsSync(filePath)) {
        console.warn(`File ${filename} not found, skipping...`);
        continue;
    }

    let content = fs.readFileSync(filePath, 'utf-8');

    // 1. Remove previous Polyglot card if it exists
    const polyStart = content.indexOf('<!-- POLYGLOT_START -->');
    if (polyStart !== -1) {
        const polyEnd = content.indexOf('<!-- POLYGLOT_END -->') + '<!-- POLYGLOT_END -->'.length;
        content = content.substring(0, polyStart) + content.substring(polyEnd);
    }

    // 2. If already tabbed, do not wrap cpp again, just replace java/python/js
    // For now, assume it is NOT tabbed yet.
    if (!content.includes('id="tab-cpp"')) {
        // We need to inject the tab buttons right after the header div.
        // The header div ends with `</div>`
        const headerEndRegex = /<\/div>\s*<div/; // This is tricky, let's use the first <div class="space-y-4"> or similar.
        
        // Actually, let's just find the first paragraph tag `</p>\n    </div>`
        const headerEndIdx = content.indexOf('</p>\n    </div>');
        if (headerEndIdx === -1) {
            console.error(`Could not find header end in ${filename}`);
            continue;
        }

        const insertPos = headerEndIdx + '</p>\n    </div>'.length;

        const tabMenuHTML = `
    <!-- TABS MENU -->
    <div class="flex flex-wrap gap-2 border-b border-slate-700/50 mb-6 pb-0 mt-4">
        <button onclick="switchTab(this, 'cpp')" class="tab-btn active bg-slate-700 text-white border-b-2 border-indigo-400 px-4 py-2 rounded-t-md text-sm font-semibold flex items-center space-x-2 transition-all">
            <span>⚙️</span><span>C++</span>
        </button>
        <button onclick="switchTab(this, 'java')" class="tab-btn text-slate-400 hover:text-white hover:bg-slate-700/50 px-4 py-2 rounded-t-md text-sm font-semibold flex items-center space-x-2 transition-all">
            <span>☕</span><span>Java</span>
        </button>
        <button onclick="switchTab(this, 'python')" class="tab-btn text-slate-400 hover:text-white hover:bg-slate-700/50 px-4 py-2 rounded-t-md text-sm font-semibold flex items-center space-x-2 transition-all">
            <span>🐍</span><span>Python</span>
        </button>
        <button onclick="switchTab(this, 'js')" class="tab-btn text-slate-400 hover:text-white hover:bg-slate-700/50 px-4 py-2 rounded-t-md text-sm font-semibold flex items-center space-x-2 transition-all">
            <span>🟨</span><span>JavaScript</span>
        </button>
    </div>

    <!-- C++ TAB -->
    <div class="tab-content block" id="tab-cpp">
`;

        content = content.slice(0, insertPos) + tabMenuHTML + content.slice(insertPos);

        // Replace the final </section> with the closing div for tab-cpp, and inject the other tabs
        const tabJavaHTML = `
    </div>
    <!-- JAVA TAB -->
    <div class="tab-content hidden" id="tab-java">
${langs.java || '<p class="text-slate-400">Content coming soon...</p>'}
    </div>
`;
        const tabPythonHTML = `
    <!-- PYTHON TAB -->
    <div class="tab-content hidden" id="tab-python">
${langs.python || '<p class="text-slate-400">Content coming soon...</p>'}
    </div>
`;
        const tabJsHTML = `
    <!-- JS TAB -->
    <div class="tab-content hidden" id="tab-js">
${langs.js || '<p class="text-slate-400">Content coming soon...</p>'}
    </div>
</section>
`;
        content = content.replace(/<\/section>\s*$/, tabJavaHTML + tabPythonHTML + tabJsHTML);

        fs.writeFileSync(filePath, content);
        console.log(`Successfully injected tabs into ${filename}`);
    } else {
        console.log(`${filename} is already tabbed! Updating content only is not implemented in this simple script.`);
    }
}
