const fs = require('fs');
const path = require('path');

const pagesDir = path.join(__dirname, 'pages');

// 1. Update utilities.html (Pair)
let utilPath = path.join(pagesDir, 'utilities.html');
let utilContent = fs.readFileSync(utilPath, 'utf8');
utilContent = utilContent.replace(
    '<h3 class="font-bold text-white">Pair & Tuple</h3>',
    '<h3 class="font-bold text-white mb-2">Pair & Tuple</h3>\\n' +
    '<p class="text-xs text-slate-400 mb-2">The std::pair template groups two items. Fields are accessed directly via .first and .second.</p>'
);
fs.writeFileSync(utilPath, utilContent);

// 2. Update vector.html
let vectorHtml = \`
<section class="page-view space-y-6">
    <div class="border-b border-slate-800 pb-4">
        <h2 class="text-2xl font-bold tracking-tight text-blue-400">Vector (std::vector)</h2>
        <p class="text-sm text-slate-400 mt-1">Implemented as a dynamic array. Dynamically-sized, heap-based array without explicit memory management.</p>
        <p class="text-xs text-slate-500 mt-2">Category: Sequence Container</p>
    </div>
    
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div class="bg-slate-800/60 p-5 rounded-xl border border-slate-700/60">
            <h3 class="font-bold text-white mb-2 text-sm">Performance</h3>
            <ul class="text-sm text-slate-300 list-disc list-inside space-y-1">
                <li><strong>Access:</strong> O(1)</li>
                <li><strong>Insert/Delete at end:</strong> O(1) amortized</li>
                <li><strong>Insert/Delete elsewhere:</strong> O(n)</li>
            </ul>
        </div>
        
        <div class="bg-slate-800/60 p-5 rounded-xl border border-slate-700/60">
            <h3 class="font-bold text-white mb-2 text-sm">Constructors</h3>
            <ul class="text-sm text-slate-300 list-disc list-inside space-y-1">
                <li><code>vector&lt;int&gt; v;</code> (Default: empty)</li>
                <li><code>vector&lt;int&gt; v2(v);</code> (Copy constructor)</li>
                <li><code>vector&lt;int&gt; v(4, -25);</code> (4 elements, value -25)</li>
                <li><code>vector&lt;int&gt; v(4);</code> (4 elements, default 0)</li>
            </ul>
        </div>

        <div class="bg-slate-800/60 p-5 rounded-xl border border-slate-700/60">
            <h3 class="font-bold text-white mb-2 text-sm">Reserving Space</h3>
            <p class="text-xs text-slate-400 mb-2">Optimize performance by pre-allocating space to reduce reallocations.</p>
<pre class="text-xs font-mono text-slate-300 bg-slate-900/60 p-3 rounded-lg overflow-x-auto">
std::vector&lt;int&gt; v;
v.reserve(50); // Pre-allocate space for 50 items
</pre>
        </div>

        <div class="bg-slate-800/60 p-5 rounded-xl border border-slate-700/60">
            <h3 class="font-bold text-white mb-2 text-sm">Array Conversion</h3>
            <p class="text-xs text-slate-400 mb-2">Vectors are contiguous, so you can pass them to C-style array functions.</p>
<pre class="text-xs font-mono text-slate-300 bg-slate-900/60 p-3 rounded-lg overflow-x-auto">
void f(int *a);
std::vector&lt;int&gt; v;
f(&v[0]);
</pre>
        </div>

        <div class="bg-slate-800/60 p-5 rounded-xl border border-slate-700/60 md:col-span-2">
            <h3 class="font-bold text-white mb-2 text-sm">Iteration</h3>
<pre class="text-xs font-mono text-slate-300 bg-slate-900/60 p-3 rounded-lg overflow-x-auto">
<span class="text-slate-500">// Standard Iterator</span>
for (vector&lt;int&gt;::iterator it = v.begin(); it != v.end(); ++it) {
    *it = 5;
}

<span class="text-slate-500">// Reverse Iterator</span>
for (vector&lt;int&gt;::reverse_iterator it = v.rbegin(); it != v.rend(); ++it) { ... }

<span class="text-slate-500">// Const Iterator (Required if vector is passed as const reference)</span>
for (vector&lt;int&gt;::const_iterator it = v.begin(); it != v.end(); ++it) { ... }
</pre>
        </div>

        <div class="bg-slate-800/60 p-5 rounded-xl border border-slate-700/60 md:col-span-2">
            <h3 class="font-bold text-white mb-2 text-sm">Core Operations</h3>
<pre class="text-xs font-mono text-slate-300 bg-slate-900/60 p-3 rounded-lg overflow-x-auto">
v.push_back(10);    <span class="text-slate-500">// Insert at the end</span>
v.pop_back();       <span class="text-slate-500">// Remove the last element</span>

v.insert(v.begin() + 3, 22); <span class="text-slate-500">// Insert 22 at position 3</span>
v.insert(v.end() - 2, 55);   <span class="text-slate-500">// Insert 55 at third-to-last position</span>

v.erase(v.begin() + 3);      <span class="text-slate-500">// Remove item at position 3</span>
v.erase(v.begin() + 10, v.begin() + 15); <span class="text-slate-500">// Remove items 10 .. 15 (exclusive)</span>
</pre>
        </div>
    </div>
</section>
\`;
fs.writeFileSync(path.join(pagesDir, 'vector.html'), vectorHtml.trim());

// 3. Update deque.html
let dequeHtml = \`
<section class="page-view space-y-6">
    <div class="border-b border-slate-800 pb-4">
        <h2 class="text-2xl font-bold tracking-tight text-pink-400">Deque (std::deque)</h2>
        <p class="text-sm text-slate-400 mt-1">Double-ended queue. Similar to vector but efficient at both ends.</p>
        <p class="text-xs text-slate-500 mt-2">Category: Sequence Container</p>
    </div>
    <div class="bg-slate-800/60 p-5 rounded-xl border border-slate-700/60 space-y-4">
        <p class="text-sm text-slate-300">Deques offer a similar interface to vectors, but additionally provide efficient insertion and deletion at the front of the data structure. However, be aware that deques are <strong>not guaranteed to be implemented internally as contiguous arrays</strong>.</p>
        
<pre class="text-sm font-mono text-slate-300 bg-slate-900/60 p-4 rounded-lg overflow-x-auto leading-relaxed">
<span class="text-slate-500">#include &lt;deque&gt;</span>
std::deque&lt;int&gt; d;

d.push_back(10);
d.push_front(5);  <span class="text-slate-500">// O(1) front insertion</span>

d.pop_back();
d.pop_front();    <span class="text-slate-500">// O(1) front deletion</span>
</pre>
        <p class="text-sm text-slate-300">See the <a href="#cross_reference" class="text-indigo-400 hover:underline" onclick="navigateTo('cross_reference')">Cross-Reference Table</a> for a comprehensive list of supported methods and iterators.</p>
    </div>
</section>
\`;
fs.writeFileSync(path.join(pagesDir, 'deque.html'), dequeHtml.trim());

// 4. Update stack.html
let stackHtml = \`
<section class="page-view space-y-6">
    <div class="border-b border-slate-800 pb-4">
        <h2 class="text-2xl font-bold tracking-tight text-fuchsia-400">Stack (std::stack)</h2>
        <p class="text-sm text-slate-400 mt-1">Adapter template providing a LIFO specialized interface.</p>
        <p class="text-xs text-slate-500 mt-2">Category: Container Adapter</p>
    </div>
    <div class="bg-slate-800/60 p-5 rounded-xl border border-slate-700/60 space-y-4">
        <p class="text-sm text-slate-300">The <code>std::stack</code> template isn't a separate data structure. It is an <strong>adapter template</strong>, which provides a specialized interface to an existing template (by default, built from deques).</p>
        <ul class="text-sm text-slate-300 list-disc list-inside mb-4 space-y-1">
            <li><strong>Push/Pop/Top:</strong> O(1)</li>
        </ul>
<pre class="text-sm font-mono text-slate-300 bg-slate-900/60 p-4 rounded-lg overflow-x-auto leading-relaxed">
<span class="text-slate-500">#include &lt;stack&gt;</span>

std::stack&lt;int&gt; s;
if (!s.empty()) {
    std::cout &lt;&lt; s.size(); 
}

s.push(4);
std::cout &lt;&lt; s.top(); <span class="text-slate-500">// Get the top item</span>

<span class="text-slate-500">// Note: pop() does NOT return the item that was popped.</span>
<span class="text-slate-500">// If you want it, you must use top() before pop()</span>
s.pop(); 
</pre>
    </div>
</section>
\`;
fs.writeFileSync(path.join(pagesDir, 'stack.html'), stackHtml.trim());

console.log("Updated files based on CS 241 Quick Reference.");
