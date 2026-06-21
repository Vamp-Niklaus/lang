const fs = require('fs');
const path = require('path');

const pagesDir = path.join(__dirname, 'pages');

const updates = {
    'unordered_multiset.html': {
        java: `
    <!-- JAVA TAB -->
    <div class="tab-content hidden" id="tab-java">
        <div class="space-y-4">
            <div class="bg-slate-800/50 rounded-lg p-4 border border-slate-700">
                <h3 class="text-lg font-bold text-amber-200 mb-2">HashMap&lt;T, Integer&gt;</h3>
                <p class="text-sm text-slate-300">Java does not have an unordered multiset. You maintain frequency counts using a <code>HashMap</code>.</p>
            </div>
            <div class="bg-slate-900 rounded-lg p-4 border border-slate-700 overflow-x-auto">
                <pre><code class="language-java text-sm text-slate-300">import java.util.HashMap;

HashMap&lt;Integer, Integer&gt; multiSet = new HashMap&lt;&gt;();

// O(1) Insert
multiSet.put(10, multiSet.getOrDefault(10, 0) + 1);
multiSet.put(10, multiSet.getOrDefault(10, 0) + 1);

// O(1) Erase one instance
int count = multiSet.getOrDefault(10, 0);
if (count == 1) {
    multiSet.remove(10);
} else if (count > 1) {
    multiSet.put(10, count - 1);
}

// O(1) Count
System.out.println("Occurrences of 10: " + multiSet.getOrDefault(10, 0));</code></pre>
            </div>
        </div>
    </div>`,
        js: `
    <!-- JS TAB -->
    <div class="tab-content hidden" id="tab-js">
        <div class="space-y-4">
            <div class="bg-slate-800/50 rounded-lg p-4 border border-slate-700">
                <h3 class="text-lg font-bold text-yellow-300 mb-2">Map as Frequency Counter</h3>
                <p class="text-sm text-slate-300">Use a standard JavaScript <code>Map</code> to map elements to their frequencies.</p>
            </div>
            <div class="bg-slate-900 rounded-lg p-4 border border-slate-700 overflow-x-auto">
                <pre><code class="language-javascript text-sm text-slate-300">const multiSet = new Map();

function insert(val) {
    multiSet.set(val, (multiSet.get(val) || 0) + 1);
}

function eraseOne(val) {
    if (multiSet.has(val)) {
        let count = multiSet.get(val);
        if (count === 1) multiSet.delete(val);
        else multiSet.set(val, count - 1);
    }
}

function count(val) {
    return multiSet.get(val) || 0;
}

insert(10);
insert(10);
eraseOne(10);
console.log(count(10)); // Output: 1</code></pre>
            </div>
        </div>
    </section>`
    },
    'unordered_multimap.html': {
        java: `
    <!-- JAVA TAB -->
    <div class="tab-content hidden" id="tab-java">
        <div class="space-y-4">
            <div class="bg-slate-800/50 rounded-lg p-4 border border-slate-700">
                <h3 class="text-lg font-bold text-amber-200 mb-2">HashMap&lt;K, List&lt;V&gt;&gt;</h3>
                <p class="text-sm text-slate-300">Java requires manually mapping a Key to an <code>ArrayList</code> of Values.</p>
            </div>
            <div class="bg-slate-900 rounded-lg p-4 border border-slate-700 overflow-x-auto">
                <pre><code class="language-java text-sm text-slate-300">import java.util.HashMap;
import java.util.ArrayList;
import java.util.List;

HashMap&lt;String, List&lt;Integer&gt;&gt; multiMap = new HashMap&lt;&gt;();

// O(1) Insert
multiMap.putIfAbsent("A", new ArrayList&lt;&gt;());
multiMap.get("A").add(1);
multiMap.get("A").add(2);

// O(1) Get all values
List&lt;Integer&gt; vals = multiMap.getOrDefault("A", new ArrayList&lt;&gt;());
for (int v : vals) {
    System.out.println(v);
}</code></pre>
            </div>
        </div>
    </div>`,
        js: `
    <!-- JS TAB -->
    <div class="tab-content hidden" id="tab-js">
        <div class="space-y-4">
            <div class="bg-slate-800/50 rounded-lg p-4 border border-slate-700">
                <h3 class="text-lg font-bold text-yellow-300 mb-2">Map of Arrays</h3>
                <p class="text-sm text-slate-300">Use a JavaScript <code>Map</code> where the value is an array.</p>
            </div>
            <div class="bg-slate-900 rounded-lg p-4 border border-slate-700 overflow-x-auto">
                <pre><code class="language-javascript text-sm text-slate-300">const multiMap = new Map();

function insert(key, val) {
    if (!multiMap.has(key)) {
        multiMap.set(key, []);
    }
    multiMap.get(key).push(val);
}

function getValues(key) {
    return multiMap.get(key) || [];
}

insert("A", 1);
insert("A", 2);

console.log(getValues("A")); // [1, 2]</code></pre>
            </div>
        </div>
    </section>`
    },
    'multimap.html': {
        java: `
    <!-- JAVA TAB -->
    <div class="tab-content hidden" id="tab-java">
        <div class="space-y-4">
            <div class="bg-slate-800/50 rounded-lg p-4 border border-slate-700">
                <h3 class="text-lg font-bold text-amber-200 mb-2">TreeMap&lt;K, List&lt;V&gt;&gt;</h3>
                <p class="text-sm text-slate-300">A sorted multimap in Java is achieved by combining a Red-Black Tree (TreeMap) with Lists.</p>
            </div>
            <div class="bg-slate-900 rounded-lg p-4 border border-slate-700 overflow-x-auto">
                <pre><code class="language-java text-sm text-slate-300">import java.util.TreeMap;
import java.util.ArrayList;
import java.util.List;

TreeMap&lt;Integer, List&lt;String&gt;&gt; multiMap = new TreeMap&lt;&gt;();

// O(log N) Insert Key
multiMap.putIfAbsent(3, new ArrayList&lt;&gt;());
multiMap.get(3).add("C1");
multiMap.get(3).add("C2");

multiMap.putIfAbsent(1, new ArrayList&lt;&gt;());
multiMap.get(1).add("A");

// Iterate perfectly sorted by Key
for (Integer k : multiMap.keySet()) {
    System.out.println(k + ": " + multiMap.get(k));
}
// Outputs: 
// 1: [A]
// 3: [C1, C2]</code></pre>
            </div>
        </div>
    </div>`
    },
    'forward_list.html': {
        java: `
    <!-- JAVA TAB -->
    <div class="tab-content hidden" id="tab-java">
        <div class="space-y-4">
            <div class="bg-slate-800/50 rounded-lg p-4 border border-slate-700">
                <h3 class="text-lg font-bold text-amber-200 mb-2">LinkedList Node (Custom)</h3>
                <p class="text-sm text-slate-300">Java's <code>LinkedList</code> is doubly-linked. If you strictly need a singly-linked list to save memory, you must write a Node class.</p>
            </div>
            <div class="bg-slate-900 rounded-lg p-4 border border-slate-700 overflow-x-auto">
                <pre><code class="language-java text-sm text-slate-300">class ListNode {
    int val;
    ListNode next;
    ListNode(int val) { this.val = val; }
}

public class Main {
    public static void main(String[] args) {
        // Construct
        ListNode head = new ListNode(10);
        head.next = new ListNode(20);
        head.next.next = new ListNode(30);

        // O(N) Traversal
        ListNode curr = head;
        while (curr != null) {
            System.out.println(curr.val);
            curr = curr.next;
        }
    }
}</code></pre>
            </div>
        </div>
    </div>`
    },
    'min_heap.html': {
        java: `
    <!-- JAVA TAB -->
    <div class="tab-content hidden" id="tab-java">
        <div class="space-y-4">
            <div class="bg-slate-800/50 rounded-lg p-4 border border-slate-700">
                <h3 class="text-lg font-bold text-amber-200 mb-2">PriorityQueue&lt;T&gt;</h3>
                <p class="text-sm text-slate-300">Java's <code>PriorityQueue</code> is a Min-Heap by default. No Comparator is needed.</p>
            </div>
            <div class="bg-slate-900 rounded-lg p-4 border border-slate-700 overflow-x-auto">
                <pre><code class="language-java text-sm text-slate-300">import java.util.PriorityQueue;

PriorityQueue&lt;Integer&gt; minHeap = new PriorityQueue&lt;&gt;();

// O(log N) Push
minHeap.add(50);
minHeap.add(10);
minHeap.add(30);

// O(1) Top (Smallest element)
System.out.println(minHeap.peek()); // 10

// O(log N) Pop
minHeap.poll(); // removes 10</code></pre>
            </div>
        </div>
    </div>`,
        python: `
    <!-- PYTHON TAB -->
    <div class="tab-content hidden" id="tab-python">
        <div class="space-y-4">
            <div class="bg-slate-800/50 rounded-lg p-4 border border-slate-700">
                <h3 class="text-lg font-bold text-blue-300 mb-2">heapq</h3>
                <p class="text-sm text-slate-300">Python's <code>heapq</code> operates on standard lists and is a Min-Heap by default.</p>
            </div>
            <div class="bg-slate-900 rounded-lg p-4 border border-slate-700 overflow-x-auto">
                <pre><code class="language-python text-sm text-slate-300">import heapq

min_heap = []

# O(log N) Push
heapq.heappush(min_heap, 50)
heapq.heappush(min_heap, 10)
heapq.heappush(min_heap, 30)

# O(1) Top (Smallest)
print(min_heap[0]) # 10

# O(log N) Pop
smallest = heapq.heappop(min_heap)</code></pre>
            </div>
        </div>
    </div>`,
        js: `
    <!-- JS TAB -->
    <div class="tab-content hidden" id="tab-js">
        <div class="space-y-4">
            <div class="bg-slate-800/50 rounded-lg p-4 border border-slate-700">
                <h3 class="text-lg font-bold text-yellow-300 mb-2">Custom Min-Heap Class</h3>
                <p class="text-sm text-slate-300">Because JavaScript has no built-in heap, you must implement the binary heap logic yourself for O(log N) performance.</p>
            </div>
            <div class="bg-slate-900 rounded-lg p-4 border border-slate-700 overflow-x-auto">
                <pre><code class="language-javascript text-sm text-slate-300">class MinHeap {
    constructor() { this.data = []; }
    push(val) {
        this.data.push(val);
        this.bubbleUp(this.data.length - 1);
    }
    pop() {
        if (this.data.length === 1) return this.data.pop();
        const min = this.data[0];
        this.data[0] = this.data.pop();
        this.bubbleDown(0);
        return min;
    }
    bubbleUp(i) {
        while (i > 0) {
            let p = Math.floor((i - 1) / 2);
            if (this.data[i] >= this.data[p]) break;
            [this.data[i], this.data[p]] = [this.data[p], this.data[i]];
            i = p;
        }
    }
    bubbleDown(i) {
        // Implementation omitted for brevity...
    }
}</code></pre>
            </div>
        </div>
    </section>`
    },
    'iterators.html': {
        java: `
    <!-- JAVA TAB -->
    <div class="tab-content hidden" id="tab-java">
        <div class="space-y-4">
            <div class="bg-slate-800/50 rounded-lg p-4 border border-slate-700">
                <h3 class="text-lg font-bold text-amber-200 mb-2">Iterator&lt;T&gt;</h3>
                <p class="text-sm text-slate-300">Iterators in Java are essential when you need to <strong>remove</strong> elements safely while looping.</p>
            </div>
            <div class="bg-slate-900 rounded-lg p-4 border border-slate-700 overflow-x-auto">
                <pre><code class="language-java text-sm text-slate-300">import java.util.ArrayList;
import java.util.Iterator;

ArrayList&lt;Integer&gt; list = new ArrayList&lt;&gt;();
list.add(10);
list.add(20);

// Safe iteration and removal
Iterator&lt;Integer&gt; it = list.iterator();
while (it.hasNext()) {
    Integer val = it.next();
    if (val == 10) {
        it.remove(); // Safely removes 10 from the list
    }
}</code></pre>
            </div>
        </div>
    </div>`,
        python: `
    <!-- PYTHON TAB -->
    <div class="tab-content hidden" id="tab-python">
        <div class="space-y-4">
            <div class="bg-slate-800/50 rounded-lg p-4 border border-slate-700">
                <h3 class="text-lg font-bold text-blue-300 mb-2">Iterables & next()</h3>
                <p class="text-sm text-slate-300">Python loops handle iterators automatically. To step manually, use <code>iter()</code> and <code>next()</code>.</p>
            </div>
            <div class="bg-slate-900 rounded-lg p-4 border border-slate-700 overflow-x-auto">
                <pre><code class="language-python text-sm text-slate-300">lst = [10, 20, 30]

# Standard implicit iteration
for x in lst:
    print(x)

# Explicit Iterator
iterator = iter(lst)
first = next(iterator) # 10
second = next(iterator) # 20</code></pre>
            </div>
        </div>
    </div>`,
        js: `
    <!-- JS TAB -->
    <div class="tab-content hidden" id="tab-js">
        <div class="space-y-4">
            <div class="bg-slate-800/50 rounded-lg p-4 border border-slate-700">
                <h3 class="text-lg font-bold text-yellow-300 mb-2">Symbol.iterator</h3>
                <p class="text-sm text-slate-300">Modern JavaScript uses iterable protocols for loops.</p>
            </div>
            <div class="bg-slate-900 rounded-lg p-4 border border-slate-700 overflow-x-auto">
                <pre><code class="language-javascript text-sm text-slate-300">const arr = [10, 20, 30];

// Standard implicit iteration
for (let x of arr) {
    console.log(x);
}

// Explicit Iterator
const iterator = arr[Symbol.iterator]();
console.log(iterator.next().value); // 10
console.log(iterator.next().value); // 20</code></pre>
            </div>
        </div>
    </section>`
    },
    'utilities.html': {
        java: `
    <!-- JAVA TAB -->
    <div class="tab-content hidden" id="tab-java">
        <div class="space-y-4">
            <div class="bg-slate-800/50 rounded-lg p-4 border border-slate-700">
                <h3 class="text-lg font-bold text-amber-200 mb-2">No Built-In Pair/Tuple</h3>
                <p class="text-sm text-slate-300">Java does not provide a standard Pair class. You usually create your own or use <code>Map.Entry</code>.</p>
            </div>
            <div class="bg-slate-900 rounded-lg p-4 border border-slate-700 overflow-x-auto">
                <pre><code class="language-java text-sm text-slate-300">// Custom class approach (Best Practice)
class Pair {
    int x, y;
    Pair(int x, int y) { this.x = x; this.y = y; }
}

// Map.Entry approach (Hack)
import java.util.AbstractMap;
import java.util.Map;

Map.Entry&lt;String, Integer&gt; pair = new AbstractMap.SimpleEntry&lt;&gt;("Key", 10);
String first = pair.getKey();
Integer second = pair.getValue();</code></pre>
            </div>
        </div>
    </div>`,
        python: `
    <!-- PYTHON TAB -->
    <div class="tab-content hidden" id="tab-python">
        <div class="space-y-4">
            <div class="bg-slate-800/50 rounded-lg p-4 border border-slate-700">
                <h3 class="text-lg font-bold text-blue-300 mb-2">Tuples</h3>
                <p class="text-sm text-slate-300">Python natively supports immutable tuples of any size, perfectly replacing <code>std::pair</code> and <code>std::tuple</code>.</p>
            </div>
            <div class="bg-slate-900 rounded-lg p-4 border border-slate-700 overflow-x-auto">
                <pre><code class="language-python text-sm text-slate-300"># Pair
p = ("Key", 10)
first = p[0]
second = p[1]

# Tuple unpacking
x, y = p
print(x, y) # Key 10

# Multi-element Tuple
t = (1, 2, 3, 4)</code></pre>
            </div>
        </div>
    </div>`,
        js: `
    <!-- JS TAB -->
    <div class="tab-content hidden" id="tab-js">
        <div class="space-y-4">
            <div class="bg-slate-800/50 rounded-lg p-4 border border-slate-700">
                <h3 class="text-lg font-bold text-yellow-300 mb-2">Arrays / Objects</h3>
                <p class="text-sm text-slate-300">JavaScript simulates pairs/tuples using arrays or objects, and utilizes destructuring assignment.</p>
            </div>
            <div class="bg-slate-900 rounded-lg p-4 border border-slate-700 overflow-x-auto">
                <pre><code class="language-javascript text-sm text-slate-300">// Array Approach
const p = ["Key", 10];
const [first, second] = p; // Destructuring

// Object Approach (Self-Documenting)
const objPair = { k: "Key", v: 10 };
console.log(objPair.k, objPair.v);</code></pre>
            </div>
        </div>
    </section>`
    }
};

for (const [filename, newContent] of Object.entries(updates)) {
    const filePath = path.join(pagesDir, filename);
    if (!fs.existsSync(filePath)) continue;

    let content = fs.readFileSync(filePath, 'utf-8');

    if (newContent.java) {
        const start = content.indexOf('<!-- JAVA TAB -->');
        const end = content.indexOf('<!-- PYTHON TAB -->');
        if (start !== -1 && end !== -1) {
            content = content.slice(0, start) + newContent.java + '\n' + content.slice(end);
        }
    }

    if (newContent.python) {
        const start = content.indexOf('<!-- PYTHON TAB -->');
        const end = content.indexOf('<!-- JS TAB -->');
        if (start !== -1 && end !== -1) {
            content = content.slice(0, start) + newContent.python + '\n' + content.slice(end);
        }
    }

    if (newContent.js) {
        const start = content.indexOf('<!-- JS TAB -->');
        if (start !== -1) {
            content = content.slice(0, start) + newContent.js;
        }
    }

    fs.writeFileSync(filePath, content);
    console.log("Updated " + filename);
}
