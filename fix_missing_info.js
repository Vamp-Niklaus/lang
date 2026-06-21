const fs = require('fs');
const path = require('path');

const pagesDir = path.join(__dirname, 'pages');

const updates = {
    'set.html': {
        python: `
    <!-- PYTHON TAB -->
    <div class="tab-content hidden" id="tab-python">
        <div class="space-y-4">
            <div class="bg-slate-800/50 rounded-lg p-4 border border-slate-700">
                <h3 class="text-lg font-bold text-blue-300 mb-2">bisect + list / set</h3>
                <p class="text-sm text-slate-300">Python's built-in <code>set</code> is a Hash Table (unordered). If you strictly need O(log N) bounds checking and sorted iteration like <code>std::set</code>, you maintain a sorted list using the <code>bisect</code> module.</p>
            </div>
            <div class="bg-slate-900 rounded-lg p-4 border border-slate-700 overflow-x-auto">
                <pre><code class="language-python text-sm text-slate-300">import bisect

# 1. Unordered Uniqueness (O(1) average)
s = set()
s.add(30)
s.add(10)

# 2. Sorted Set Behavior (O(N) insert, O(log N) search)
sorted_set = []
bisect.insort(sorted_set, 30)
bisect.insort(sorted_set, 10)
bisect.insort(sorted_set, 20)
# sorted_set is now [10, 20, 30]

# std::set::lower_bound equivalent
idx = bisect.bisect_left(sorted_set, 15) # Returns 1 (index where 15 would go)</code></pre>
            </div>
        </div>
    </div>`,
        js: `
    <!-- JS TAB -->
    <div class="tab-content hidden" id="tab-js">
        <div class="space-y-4">
            <div class="bg-slate-800/50 rounded-lg p-4 border border-slate-700">
                <h3 class="text-lg font-bold text-yellow-300 mb-2">Set / Sorted Array</h3>
                <p class="text-sm text-slate-300">JavaScript's built-in <code>Set</code> preserves insertion order but does not sort. If you need a sorted set, you typically maintain a sorted Array manually using Binary Search.</p>
            </div>
            <div class="bg-slate-900 rounded-lg p-4 border border-slate-700 overflow-x-auto">
                <pre><code class="language-javascript text-sm text-slate-300">// 1. Standard Set (O(1) insert/lookup, insertion order)
const s = new Set();
s.add(30);
s.add(10);
let exists = s.has(10); // true

// 2. Sorted Array approach (for std::set equivalents)
let sortedSet = [];
function insertSorted(arr, val) {
    let i = 0;
    while (i < arr.length && arr[i] < val) i++;
    if (arr[i] !== val) arr.splice(i, 0, val); // Insert only if unique
}
insertSorted(sortedSet, 30);
insertSorted(sortedSet, 10);
insertSorted(sortedSet, 20);
// sortedSet is [10, 20, 30]</code></pre>
            </div>
        </div>
    </section>` // Keep the closing section tag for JS tab! Wait, earlier my injection ended with </section>. Yes.
    },
    'map.html': {
        python: `
    <!-- PYTHON TAB -->
    <div class="tab-content hidden" id="tab-python">
        <div class="space-y-4">
            <div class="bg-slate-800/50 rounded-lg p-4 border border-slate-700">
                <h3 class="text-lg font-bold text-blue-300 mb-2">dict (Insertion Ordered)</h3>
                <p class="text-sm text-slate-300">Python's <code>dict</code> is a hash map, but since Python 3.7 it perfectly preserves insertion order. If you strictly need keys to be <em>sorted</em> like <code>std::map</code>, you must sort the keys on demand or use a sorted list of tuples.</p>
            </div>
            <div class="bg-slate-900 rounded-lg p-4 border border-slate-700 overflow-x-auto">
                <pre><code class="language-python text-sm text-slate-300"># 1. Standard dict (O(1) insert/lookup)
d = {}
d[3] = "C"
d[1] = "A"
d[2] = "B"

# 2. Emulating std::map sorted iteration
for k in sorted(d.keys()):
    print(f"{k}: {d[k]}")
# Outputs: 1: A, 2: B, 3: C</code></pre>
            </div>
        </div>
    </div>`,
        js: `
    <!-- JS TAB -->
    <div class="tab-content hidden" id="tab-js">
        <div class="space-y-4">
            <div class="bg-slate-800/50 rounded-lg p-4 border border-slate-700">
                <h3 class="text-lg font-bold text-yellow-300 mb-2">Map (Insertion Ordered)</h3>
                <p class="text-sm text-slate-300">JavaScript's <code>Map</code> is a hash map that preserves insertion order. Like Python, if you need <em>sorted</em> iteration like C++'s Red-Black tree map, you must sort the keys array manually.</p>
            </div>
            <div class="bg-slate-900 rounded-lg p-4 border border-slate-700 overflow-x-auto">
                <pre><code class="language-javascript text-sm text-slate-300">const map = new Map();

// Insert O(1)
map.set(3, "C");
map.set(1, "A");
map.set(2, "B");

// Emulating std::map sorted iteration
const sortedKeys = Array.from(map.keys()).sort((a, b) => a - b);
for (let k of sortedKeys) {
    console.log(k + ": " + map.get(k));
}</code></pre>
            </div>
        </div>
    </section>`
    },
    'multiset.html': {
        python: `
    <!-- PYTHON TAB -->
    <div class="tab-content hidden" id="tab-python">
        <div class="space-y-4">
            <div class="bg-slate-800/50 rounded-lg p-4 border border-slate-700">
                <h3 class="text-lg font-bold text-blue-300 mb-2">collections.Counter</h3>
                <p class="text-sm text-slate-300">To simulate a multiset, you use a <code>Counter</code> which maps elements to their frequency.</p>
            </div>
            <div class="bg-slate-900 rounded-lg p-4 border border-slate-700 overflow-x-auto">
                <pre><code class="language-python text-sm text-slate-300">from collections import Counter

multiset = Counter()

# Insert (O(1))
multiset[10] += 1
multiset[10] += 1
multiset[20] += 1

# Erase one instance
if multiset[10] > 0:
    multiset[10] -= 1
    if multiset[10] == 0:
        del multiset[10]

# Total elements
total = sum(multiset.values())</code></pre>
            </div>
        </div>
    </div>`,
        js: `
    <!-- JS TAB -->
    <div class="tab-content hidden" id="tab-js">
        <div class="space-y-4">
            <div class="bg-slate-800/50 rounded-lg p-4 border border-slate-700">
                <h3 class="text-lg font-bold text-yellow-300 mb-2">Map as Frequency Counter</h3>
                <p class="text-sm text-slate-300">In JavaScript, you simulate a multiset by mapping elements to their count.</p>
            </div>
            <div class="bg-slate-900 rounded-lg p-4 border border-slate-700 overflow-x-auto">
                <pre><code class="language-javascript text-sm text-slate-300">const multiset = new Map();

function insert(val) {
    multiset.set(val, (multiset.get(val) || 0) + 1);
}

function eraseOne(val) {
    if (multiset.has(val)) {
        let count = multiset.get(val);
        if (count === 1) multiset.delete(val);
        else multiset.set(val, count - 1);
    }
}

insert(10);
insert(10);
eraseOne(10);</code></pre>
            </div>
        </div>
    </section>`
    },
    'multimap.html': {
        python: `
    <!-- PYTHON TAB -->
    <div class="tab-content hidden" id="tab-python">
        <div class="space-y-4">
            <div class="bg-slate-800/50 rounded-lg p-4 border border-slate-700">
                <h3 class="text-lg font-bold text-blue-300 mb-2">collections.defaultdict(list)</h3>
                <p class="text-sm text-slate-300">The exact equivalent of a multimap in Python is mapping a Key to a List of Values using a <code>defaultdict</code>.</p>
            </div>
            <div class="bg-slate-900 rounded-lg p-4 border border-slate-700 overflow-x-auto">
                <pre><code class="language-python text-sm text-slate-300">from collections import defaultdict

multimap = defaultdict(list)

# Insert multiple values for same key
multimap["A"].append(1)
multimap["A"].append(2)
multimap["B"].append(3)

# Iterate over all values for key "A"
for val in multimap["A"]:
    print(val) # Prints 1, then 2</code></pre>
            </div>
        </div>
    </div>`,
        js: `
    <!-- JS TAB -->
    <div class="tab-content hidden" id="tab-js">
        <div class="space-y-4">
            <div class="bg-slate-800/50 rounded-lg p-4 border border-slate-700">
                <h3 class="text-lg font-bold text-yellow-300 mb-2">Map of Arrays</h3>
                <p class="text-sm text-slate-300">In JavaScript, a multimap is easily constructed by mapping a Key to an Array of Values.</p>
            </div>
            <div class="bg-slate-900 rounded-lg p-4 border border-slate-700 overflow-x-auto">
                <pre><code class="language-javascript text-sm text-slate-300">const multimap = new Map();

function insert(key, val) {
    if (!multimap.has(key)) {
        multimap.set(key, []);
    }
    multimap.get(key).push(val);
}

insert("A", 1);
insert("A", 2);

// Retrieve
let values = multimap.get("A"); // [1, 2]</code></pre>
            </div>
        </div>
    </section>`
    },
    'priority_queue.html': {
        js: `
    <!-- JS TAB -->
    <div class="tab-content hidden" id="tab-js">
        <div class="space-y-4">
            <div class="bg-slate-800/50 rounded-lg p-4 border border-slate-700">
                <h3 class="text-lg font-bold text-yellow-300 mb-2">Custom Binary Heap / Sort</h3>
                <p class="text-sm text-slate-300">JavaScript lacks a built-in Heap. For smaller datasets, pushing to an array and re-sorting is easy but <code>O(N log N)</code>. For performance, you must write a class.</p>
            </div>
            <div class="bg-slate-900 rounded-lg p-4 border border-slate-700 overflow-x-auto">
                <pre><code class="language-javascript text-sm text-slate-300">// Easy but slow O(N log N) approach:
let pq = [];
pq.push(10);
pq.push(5);
pq.sort((a, b) => a - b); // Min-Heap simulation
let top = pq.shift(); // 5

// Fast O(log N) approach requires a full class:
class MinHeap {
    constructor() { this.heap = []; }
    push(val) {
        this.heap.push(val);
        this._bubbleUp(this.heap.length - 1);
    }
    pop() {
        // swap root with last, pop last, bubble down root
    }
    // ... custom bubble up / down logic
}</code></pre>
            </div>
        </div>
    </section>`
    }
};

for (const [filename, newContent] of Object.entries(updates)) {
    const filePath = path.join(pagesDir, filename);
    if (!fs.existsSync(filePath)) continue;

    let content = fs.readFileSync(filePath, 'utf-8');

    if (newContent.python) {
        const pyStart = content.indexOf('<!-- PYTHON TAB -->');
        const jsStart = content.indexOf('<!-- JS TAB -->');
        if (pyStart !== -1 && jsStart !== -1) {
            content = content.slice(0, pyStart) + newContent.python + '\n' + content.slice(jsStart);
        }
    }

    if (newContent.js) {
        const jsStart = content.indexOf('<!-- JS TAB -->');
        if (jsStart !== -1) {
            content = content.slice(0, jsStart) + newContent.js;
        }
    }

    fs.writeFileSync(filePath, content);
    console.log("Updated " + filename);
}
