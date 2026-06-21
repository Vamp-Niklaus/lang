const fs = require('fs');
const path = require('path');

const mappings = {
    'array.html': {
        java: '<code>int[] arr = new int[5];</code> (Fixed-size primitive arrays)',
        python: '<code>tuple</code> (Immutable, fixed size) or <code>list</code>',
        js: '<code>Array</code> or <code>Int32Array</code> (Typed Arrays for fixed size/type)'
    },
    'vector.html': {
        java: '<code>java.util.ArrayList&lt;T&gt;</code>',
        python: '<code>list</code> (Dynamic arrays under the hood)',
        js: '<code>Array</code>'
    },
    'deque.html': {
        java: '<code>java.util.ArrayDeque&lt;T&gt;</code>',
        python: '<code>collections.deque</code>',
        js: '<code>Array</code> (using <code>push/pop</code> and <code>shift/unshift</code>)'
    },
    'list.html': {
        java: '<code>java.util.LinkedList&lt;T&gt;</code>',
        python: '<code>collections.deque</code> (Closest to doubly linked list)',
        js: 'No built-in. Use <code>Array</code> or implement a custom Node-based linked list.'
    },
    'forward_list.html': {
        java: 'No direct built-in (Can use <code>LinkedList</code> but it is doubly-linked)',
        python: 'No built-in singly-linked list. Custom class needed.',
        js: 'Custom linked list implementation.'
    },
    'set.html': {
        java: '<code>java.util.TreeSet&lt;T&gt;</code> (Red-Black tree, sorted)',
        python: 'No built-in sorted set. (Standard <code>set</code> is a hash table like unordered_set)',
        js: 'No built-in sorted set. (Standard <code>Set</code> preserves insertion order, not sorted).'
    },
    'multiset.html': {
        java: 'No standard multiset. Can use <code>TreeMap&lt;T, Integer&gt;</code> for frequencies or Guava <code>TreeMultiset</code>.',
        python: '<code>collections.Counter</code> (for frequencies) or <code>bisect</code> module on a sorted list.',
        js: 'Custom implementation or Map counting frequencies.'
    },
    'map.html': {
        java: '<code>java.util.TreeMap&lt;K, V&gt;</code> (Sorted keys)',
        python: 'No built-in sorted map. Standard <code>dict</code> preserves insertion order.',
        js: 'No built-in sorted map. Standard <code>Map</code> preserves insertion order.'
    },
    'multimap.html': {
        java: 'No standard. Can use <code>TreeMap&lt;K, List&lt;V&gt;&gt;</code> or Guava <code>TreeMultimap</code>.',
        python: '<code>collections.defaultdict(list)</code>',
        js: '<code>Map&lt;K, Array&lt;V&gt;&gt;</code>'
    },
    'unordered_set.html': {
        java: '<code>java.util.HashSet&lt;T&gt;</code>',
        python: '<code>set</code>',
        js: '<code>Set</code>'
    },
    'unordered_multiset.html': {
        java: '<code>java.util.HashMap&lt;T, Integer&gt;</code> (Storing counts)',
        python: '<code>collections.Counter</code>',
        js: '<code>Map</code> counting occurrences.'
    },
    'unordered_map.html': {
        java: '<code>java.util.HashMap&lt;K, V&gt;</code>',
        python: '<code>dict</code>',
        js: '<code>Map</code> or plain <code>Object</code>'
    },
    'unordered_multimap.html': {
        java: '<code>java.util.HashMap&lt;K, List&lt;V&gt;&gt;</code>',
        python: '<code>collections.defaultdict(list)</code>',
        js: '<code>Map&lt;K, Array&lt;V&gt;&gt;</code>'
    },
    'stack.html': {
        java: '<code>java.util.Stack&lt;T&gt;</code> or <code>java.util.ArrayDeque&lt;T&gt;</code> (preferred)',
        python: '<code>list</code> (using <code>append()</code> and <code>pop()</code>)',
        js: '<code>Array</code> (using <code>push()</code> and <code>pop()</code>)'
    },
    'queue.html': {
        java: '<code>java.util.Queue&lt;T&gt;</code> (Interface) implemented by <code>LinkedList</code> or <code>ArrayDeque</code>',
        python: '<code>queue.Queue</code> or <code>collections.deque</code> (preferred for performance)',
        js: '<code>Array</code> (using <code>push()</code> and <code>shift()</code>) - note: <code>shift()</code> is O(N).'
    },
    'priority_queue.html': {
        java: '<code>java.util.PriorityQueue&lt;T&gt;</code> (Min-heap by default)',
        python: '<code>heapq</code> module (Min-heap by default)',
        js: 'No built-in. Must implement a custom binary heap.'
    },
    'min_heap.html': {
        java: '<code>java.util.PriorityQueue&lt;T&gt;</code>',
        python: '<code>heapq</code>',
        js: 'Custom implementation.'
    },
    'binary_tree.html': {
        java: 'Custom <code>class Node { Node left, right; }</code>',
        python: 'Custom <code>class Node: left, right</code>',
        js: 'Custom class with <code>left</code> and <code>right</code> properties.'
    },
    'graph.html': {
        java: 'Adjacency list: <code>Map&lt;Integer, List&lt;Integer&gt;&gt;</code> or <code>List&lt;List&lt;Integer&gt;&gt;</code>',
        python: 'Adjacency list: <code>dict</code> of <code>list</code>s (e.g., <code>{1: [2, 3]}</code>)',
        js: 'Adjacency list: <code>Map</code> of <code>Array</code>s or plain <code>Object</code>.'
    },
    'algorithms.html': {
        java: '<code>java.util.Collections</code> methods (<code>sort</code>, <code>binarySearch</code>) and Java 8 <code>java.util.stream.Stream</code>',
        python: 'Built-in functions (<code>sorted()</code>, <code>max()</code>), <code>itertools</code> module, and <code>bisect</code> module',
        js: '<code>Array.prototype</code> methods (<code>sort</code>, <code>find</code>, <code>includes</code>)'
    },
    'numeric.html': {
        java: 'Java 8 Streams (<code>reduce</code>, <code>sum</code>)',
        python: 'Built-in <code>sum()</code>, <code>math</code> module, and <code>functools.reduce()</code>',
        js: '<code>Array.prototype.reduce()</code>'
    },
    'iterators.html': {
        java: '<code>java.util.Iterator&lt;T&gt;</code> and <code>Iterable&lt;T&gt;</code> interface (Enhanced for-loop)',
        python: '<code>__iter__()</code> and <code>__next__()</code> magic methods. Generators (<code>yield</code>).',
        js: 'Iterable Protocol (<code>Symbol.iterator</code>) and Generators (<code>function*</code>, <code>yield</code>)'
    },
    'functional.html': {
        java: '<code>java.util.function</code> package (<code>Predicate</code>, <code>Function</code>, <code>Consumer</code>, <code>Supplier</code>) and Lambda Expressions <code>x -&gt; x*2</code>',
        python: 'Lambda functions <code>lambda x: x*2</code>, and <code>operator</code> module',
        js: 'Arrow functions <code>x =&gt; x*2</code>, first-class functions'
    },
    'utilities.html': {
        java: '<code>java.util.Objects</code>, <code>java.lang.Math</code>',
        python: 'Built-in types and standard library modules',
        js: '<code>Math</code> object, built-in methods.'
    }
};

const pagesDir = path.join(__dirname, 'pages');

for (const [filename, mapping] of Object.entries(mappings)) {
    const filePath = path.join(pagesDir, filename);
    if (!fs.existsSync(filePath)) {
        console.log('File not found: ' + filename);
        continue;
    }

    let content = fs.readFileSync(filePath, 'utf-8');

    // Remove old polyglot section if it exists (for idempotency)
    const polyStart = content.indexOf('<!-- POLYGLOT_START -->');
    if (polyStart !== -1) {
        const polyEnd = content.indexOf('<!-- POLYGLOT_END -->') + 21; // length of '<!-- POLYGLOT_END -->'
        content = content.substring(0, polyStart) + content.substring(polyEnd);
    }

    const htmlToInject = "\n<!-- POLYGLOT_START -->\n" +
"<div class=\"bg-slate-800/60 p-5 rounded-xl border border-slate-700/60 mt-6 mb-6\">\n" +
"    <h3 class=\"font-bold text-white mb-3 border-b border-slate-700 pb-2 flex items-center space-x-2\">\n" +
"        <span>🌎</span>\n" +
"        <span>Polyglot Equivalents</span>\n" +
"    </h3>\n" +
"    <ul class=\"space-y-3 text-sm text-slate-300\">\n" +
"        <li class=\"flex items-start space-x-3\">\n" +
"            <span class=\"text-xl leading-none\">☕</span>\n" +
"            <div>\n" +
"                <strong class=\"text-white block\">Java:</strong>\n" +
"                <span class=\"font-mono text-xs text-amber-200\">" + mapping.java + "</span>\n" +
"            </div>\n" +
"        </li>\n" +
"        <li class=\"flex items-start space-x-3\">\n" +
"            <span class=\"text-xl leading-none\">🐍</span>\n" +
"            <div>\n" +
"                <strong class=\"text-white block\">Python:</strong>\n" +
"                <span class=\"font-mono text-xs text-blue-300\">" + mapping.python + "</span>\n" +
"            </div>\n" +
"        </li>\n" +
"        <li class=\"flex items-start space-x-3\">\n" +
"            <span class=\"text-xl leading-none\">🟨</span>\n" +
"            <div>\n" +
"                <strong class=\"text-white block\">JavaScript:</strong>\n" +
"                <span class=\"font-mono text-xs text-yellow-300\">" + mapping.js + "</span>\n" +
"            </div>\n" +
"        </li>\n" +
"    </ul>\n" +
"</div>\n" +
"<!-- POLYGLOT_END -->\n" +
"</section>\n";

    // Replace the final </section> with the injected HTML
    if (content.includes('</section>')) {
        content = content.replace(/<\/section>\s*$/, htmlToInject);
        fs.writeFileSync(filePath, content);
        console.log("Updated: " + filename);
    }
}
