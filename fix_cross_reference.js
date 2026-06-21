const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'pages', 'cross_reference.html');
let content = fs.readFileSync(filePath, 'utf-8');

// Fix literal \n
content = content.replace(/\\n/g, '\n');

// Fix table headers CSS
content = content.replace(/<div class="writing-vertical-rl transform rotate-180 text-xs h-32">/g, 
                          '<div style="writing-mode: vertical-rl; transform: rotate(180deg);" class="text-xs h-32">');

// Polyglot Matrix to inject
const polyglotMatrix = `
<div class="bg-slate-800/60 rounded-xl border border-slate-700/60 overflow-hidden relative mb-8 mt-4">
    <div class="p-4 border-b border-slate-700/60 bg-slate-800">
        <h3 class="font-bold text-white text-lg flex items-center space-x-2">
            <span>🌎</span>
            <span>Polyglot Language Mappings</span>
        </h3>
        <p class="text-xs text-slate-400 mt-1">Map your C++ knowledge directly to Java, Python, and JavaScript equivalents.</p>
    </div>
    <div class="overflow-x-auto custom-scrollbar">
        <table class="min-w-max w-full divide-y divide-slate-700/50 text-sm text-left text-slate-300">
            <thead class="bg-slate-800 text-slate-400 font-semibold">
                <tr>
                    <th class="px-4 py-3 border-r border-slate-700">Concept / Container</th>
                    <th class="px-4 py-3 border-r border-slate-700 text-blue-300">C++</th>
                    <th class="px-4 py-3 border-r border-slate-700 text-amber-200">Java</th>
                    <th class="px-4 py-3 border-r border-slate-700 text-blue-400">Python</th>
                    <th class="px-4 py-3 text-yellow-300">JavaScript</th>
                </tr>
            </thead>
            <tbody class="divide-y divide-slate-700/30">
                <tr class="hover:bg-slate-700/30">
                    <td class="px-4 py-2 font-bold text-slate-200 border-r border-slate-700">Dynamic Array</td>
                    <td class="px-4 py-2 border-r border-slate-700"><code>std::vector</code></td>
                    <td class="px-4 py-2 border-r border-slate-700"><code>java.util.ArrayList</code></td>
                    <td class="px-4 py-2 border-r border-slate-700"><code>list</code></td>
                    <td class="px-4 py-2"><code>Array</code></td>
                </tr>
                <tr class="hover:bg-slate-700/30">
                    <td class="px-4 py-2 font-bold text-slate-200 border-r border-slate-700">Hash Map</td>
                    <td class="px-4 py-2 border-r border-slate-700"><code>std::unordered_map</code></td>
                    <td class="px-4 py-2 border-r border-slate-700"><code>java.util.HashMap</code></td>
                    <td class="px-4 py-2 border-r border-slate-700"><code>dict</code></td>
                    <td class="px-4 py-2"><code>Map</code> / <code>Object</code></td>
                </tr>
                <tr class="hover:bg-slate-700/30">
                    <td class="px-4 py-2 font-bold text-slate-200 border-r border-slate-700">Sorted Map</td>
                    <td class="px-4 py-2 border-r border-slate-700"><code>std::map</code> (Red-Black)</td>
                    <td class="px-4 py-2 border-r border-slate-700"><code>java.util.TreeMap</code></td>
                    <td class="px-4 py-2 border-r border-slate-700">No built-in (dict is insertion order)</td>
                    <td class="px-4 py-2">No built-in (Map is insertion order)</td>
                </tr>
                <tr class="hover:bg-slate-700/30">
                    <td class="px-4 py-2 font-bold text-slate-200 border-r border-slate-700">Hash Set</td>
                    <td class="px-4 py-2 border-r border-slate-700"><code>std::unordered_set</code></td>
                    <td class="px-4 py-2 border-r border-slate-700"><code>java.util.HashSet</code></td>
                    <td class="px-4 py-2 border-r border-slate-700"><code>set</code></td>
                    <td class="px-4 py-2"><code>Set</code></td>
                </tr>
                <tr class="hover:bg-slate-700/30">
                    <td class="px-4 py-2 font-bold text-slate-200 border-r border-slate-700">Sorted Set</td>
                    <td class="px-4 py-2 border-r border-slate-700"><code>std::set</code></td>
                    <td class="px-4 py-2 border-r border-slate-700"><code>java.util.TreeSet</code></td>
                    <td class="px-4 py-2 border-r border-slate-700">No built-in</td>
                    <td class="px-4 py-2">No built-in</td>
                </tr>
                <tr class="hover:bg-slate-700/30">
                    <td class="px-4 py-2 font-bold text-slate-200 border-r border-slate-700">Double Ended Queue</td>
                    <td class="px-4 py-2 border-r border-slate-700"><code>std::deque</code></td>
                    <td class="px-4 py-2 border-r border-slate-700"><code>java.util.ArrayDeque</code></td>
                    <td class="px-4 py-2 border-r border-slate-700"><code>collections.deque</code></td>
                    <td class="px-4 py-2"><code>Array</code> (push/pop/shift/unshift)</td>
                </tr>
                <tr class="hover:bg-slate-700/30">
                    <td class="px-4 py-2 font-bold text-slate-200 border-r border-slate-700">Linked List</td>
                    <td class="px-4 py-2 border-r border-slate-700"><code>std::list</code></td>
                    <td class="px-4 py-2 border-r border-slate-700"><code>java.util.LinkedList</code></td>
                    <td class="px-4 py-2 border-r border-slate-700"><code>collections.deque</code></td>
                    <td class="px-4 py-2">Custom implementation</td>
                </tr>
                <tr class="hover:bg-slate-700/30">
                    <td class="px-4 py-2 font-bold text-slate-200 border-r border-slate-700">Stack</td>
                    <td class="px-4 py-2 border-r border-slate-700"><code>std::stack</code></td>
                    <td class="px-4 py-2 border-r border-slate-700"><code>java.util.Stack</code> / <code>ArrayDeque</code></td>
                    <td class="px-4 py-2 border-r border-slate-700"><code>list</code></td>
                    <td class="px-4 py-2"><code>Array</code></td>
                </tr>
                <tr class="hover:bg-slate-700/30">
                    <td class="px-4 py-2 font-bold text-slate-200 border-r border-slate-700">Queue</td>
                    <td class="px-4 py-2 border-r border-slate-700"><code>std::queue</code></td>
                    <td class="px-4 py-2 border-r border-slate-700"><code>java.util.Queue</code></td>
                    <td class="px-4 py-2 border-r border-slate-700"><code>queue.Queue</code> / <code>collections.deque</code></td>
                    <td class="px-4 py-2"><code>Array</code></td>
                </tr>
                <tr class="hover:bg-slate-700/30">
                    <td class="px-4 py-2 font-bold text-slate-200 border-r border-slate-700">Min/Max Heap</td>
                    <td class="px-4 py-2 border-r border-slate-700"><code>std::priority_queue</code></td>
                    <td class="px-4 py-2 border-r border-slate-700"><code>java.util.PriorityQueue</code></td>
                    <td class="px-4 py-2 border-r border-slate-700"><code>heapq</code></td>
                    <td class="px-4 py-2">Custom implementation</td>
                </tr>
            </tbody>
        </table>
    </div>
</div>
`;

// Insert the polyglotMatrix after the first paragraph text
content = content.replace(/<\/p>\s*<\/div>/, '</p>\n    </div>\n' + polyglotMatrix);

fs.writeFileSync(filePath, content);
console.log("Fixed cross_reference.html successfully!");
