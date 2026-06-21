const fs = require('fs');
const path = require('path');

const pagesDir = path.join(__dirname, 'pages');

const algorithmsHtml = \`
<section class="page-view space-y-6">
    <div class="border-b border-slate-800 pb-4">
        <h2 class="text-2xl font-bold tracking-tight text-yellow-400">Algorithms (&lt;algorithm&gt;)</h2>
        <p class="text-sm text-slate-400 mt-1">A comprehensive suite of functions operating on ranges of elements via iterators.</p>
        <p class="text-xs text-slate-500 mt-2">Category: Core Tools</p>
    </div>
    
    <div class="space-y-6">
        <!-- Query Algorithms -->
        <div class="bg-slate-800/60 p-5 rounded-xl border border-slate-700/60">
            <h3 class="font-bold text-white mb-3 border-b border-slate-700 pb-2">Query Algorithms (Non-Mutating)</h3>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-slate-300 font-mono">
                <div><code>for_each(first, last, f)</code><br><span class="text-xs text-slate-400 font-sans">Applies f to each element.</span></div>
                <div><code>find(first, last, val)</code><br><span class="text-xs text-slate-400 font-sans">Finds first occurrence of val.</span></div>
                <div><code>find_if(first, last, pred)</code><br><span class="text-xs text-slate-400 font-sans">Finds first element matching pred.</span></div>
                <div><code>adjacent_find(first, last)</code><br><span class="text-xs text-slate-400 font-sans">Finds first adjacent duplicate.</span></div>
                <div><code>count(first, last, val, &n)</code><br><span class="text-xs text-slate-400 font-sans">Counts occurrences of val.</span></div>
                <div><code>mismatch(f1, l1, f2)</code><br><span class="text-xs text-slate-400 font-sans">Finds first mismatched pair.</span></div>
                <div><code>equal(f1, l1, f2)</code><br><span class="text-xs text-slate-400 font-sans">Checks if ranges are equal.</span></div>
                <div><code>search(f1, l1, f2, l2)</code><br><span class="text-xs text-slate-400 font-sans">Finds subsequence.</span></div>
            </div>
        </div>

        <!-- Mutating Algorithms -->
        <div class="bg-slate-800/60 p-5 rounded-xl border border-slate-700/60">
            <h3 class="font-bold text-white mb-3 border-b border-slate-700 pb-2">Mutating Algorithms</h3>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-slate-300 font-mono">
                <div><code>copy(f1, l1, dest)</code><br><span class="text-xs text-slate-400 font-sans">Copies elements to dest.</span></div>
                <div><code>swap(x, y)</code><br><span class="text-xs text-slate-400 font-sans">Swaps two values.</span></div>
                <div><code>transform(f1, l1, dest, op)</code><br><span class="text-xs text-slate-400 font-sans">Applies op to range, outputs to dest.</span></div>
                <div><code>replace(f, l, old, new)</code><br><span class="text-xs text-slate-400 font-sans">Replaces old with new.</span></div>
                <div><code>fill(f, l, val)</code><br><span class="text-xs text-slate-400 font-sans">Fills range with val.</span></div>
                <div><code>generate(f, l, gen)</code><br><span class="text-xs text-slate-400 font-sans">Assigns result of gen() to range.</span></div>
                <div><code>remove(f, l, val)</code><br><span class="text-xs text-slate-400 font-sans">Shifts to hide val (must follow with erase).</span></div>
                <div><code>unique(f, l)</code><br><span class="text-xs text-slate-400 font-sans">Removes consecutive duplicates.</span></div>
                <div><code>reverse(f, l)</code><br><span class="text-xs text-slate-400 font-sans">Reverses elements.</span></div>
                <div><code>rotate(f, mid, l)</code><br><span class="text-xs text-slate-400 font-sans">Left rotates by mid-first.</span></div>
                <div><code>random_shuffle(f, l)</code><br><span class="text-xs text-slate-400 font-sans">Randomly permutes range.</span></div>
                <div><code>partition(f, l, pred)</code><br><span class="text-xs text-slate-400 font-sans">Groups true pred elements first.</span></div>
            </div>
        </div>

        <!-- Sorting & Binary Search -->
        <div class="bg-slate-800/60 p-5 rounded-xl border border-slate-700/60">
            <h3 class="font-bold text-white mb-3 border-b border-slate-700 pb-2">Sort & Binary Search (Requires Sorted)</h3>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-slate-300 font-mono">
                <div><code>sort(f, l)</code><br><span class="text-xs text-slate-400 font-sans">O(N log N) sort.</span></div>
                <div><code>stable_sort(f, l)</code><br><span class="text-xs text-slate-400 font-sans">Sort preserving relative order.</span></div>
                <div><code>partial_sort(f, m, l)</code><br><span class="text-xs text-slate-400 font-sans">Sorts up to m.</span></div>
                <div><code>nth_element(f, n, l)</code><br><span class="text-xs text-slate-400 font-sans">Places nth element in sorted pos.</span></div>
                <div><code>binary_search(f, l, val)</code><br><span class="text-xs text-slate-400 font-sans">Returns true if found.</span></div>
                <div><code>lower_bound(f, l, val)</code><br><span class="text-xs text-slate-400 font-sans">First iter >= val.</span></div>
                <div><code>upper_bound(f, l, val)</code><br><span class="text-xs text-slate-400 font-sans">First iter > val.</span></div>
                <div><code>equal_range(f, l, val)</code><br><span class="text-xs text-slate-400 font-sans">Pair of lower/upper bounds.</span></div>
                <div><code>merge(f1, l1, f2, l2, res)</code><br><span class="text-xs text-slate-400 font-sans">Merges 2 sorted ranges.</span></div>
            </div>
        </div>

        <!-- Set Operations & Heap -->
        <div class="bg-slate-800/60 p-5 rounded-xl border border-slate-700/60">
            <h3 class="font-bold text-white mb-3 border-b border-slate-700 pb-2">Set Operations & Heaps</h3>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-slate-300 font-mono">
                <div><code>set_union(f1, l1, f2, l2, r)</code></div>
                <div><code>set_intersection(f1, l1, f2, l2, r)</code></div>
                <div><code>set_difference(...)</code></div>
                <div><code>set_symmetric_difference(...)</code></div>
                <div class="col-span-2 border-t border-slate-700 my-2"></div>
                <div><code>make_heap(f, l)</code></div>
                <div><code>push_heap(f, l)</code></div>
                <div><code>pop_heap(f, l)</code></div>
                <div><code>sort_heap(f, l)</code></div>
            </div>
        </div>

        <!-- Min/Max & Permutations -->
        <div class="bg-slate-800/60 p-5 rounded-xl border border-slate-700/60">
            <h3 class="font-bold text-white mb-3 border-b border-slate-700 pb-2">Min/Max & Permutations</h3>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-slate-300 font-mono">
                <div><code>min(a, b) / max(a, b)</code></div>
                <div><code>min_element(f, l) / max_element(f, l)</code></div>
                <div><code>next_permutation(f, l)</code></div>
                <div><code>prev_permutation(f, l)</code></div>
                <div><code>lexicographical_compare(f1,l1,f2,l2)</code></div>
            </div>
        </div>
    </div>
</section>
\`;

const numericHtml = \`
<section class="page-view space-y-6">
    <div class="border-b border-slate-800 pb-4">
        <h2 class="text-2xl font-bold tracking-tight text-teal-400">Numeric (&lt;numeric&gt;)</h2>
        <p class="text-sm text-slate-400 mt-1">Computational algorithms specifically focused on numerical operations.</p>
        <p class="text-xs text-slate-500 mt-2">Category: Core Tools</p>
    </div>
    
    <div class="space-y-4">
        <div class="bg-slate-800/60 p-5 rounded-xl border border-slate-700/60">
            <h3 class="font-bold text-white mb-2 text-sm">accumulate</h3>
            <p class="text-sm text-slate-300 mb-2">Computes the sum (or customized binary operation) of the given value <code>init</code> and elements in the range <code>[first, last)</code>.</p>
<pre class="text-sm font-mono text-slate-300 bg-slate-900/60 p-3 rounded-lg overflow-x-auto">
accumulate(first, last, initVal);
accumulate(first, last, initVal, binaryOp);
</pre>
        </div>

        <div class="bg-slate-800/60 p-5 rounded-xl border border-slate-700/60">
            <h3 class="font-bold text-white mb-2 text-sm">inner_product</h3>
            <p class="text-sm text-slate-300 mb-2">Computes the inner product (dot product) of two ranges, starting with an initial value.</p>
<pre class="text-sm font-mono text-slate-300 bg-slate-900/60 p-3 rounded-lg overflow-x-auto">
inner_product(first1, last1, first2, initVal);
inner_product(first1, last1, first2, initVal, sumOp, multOp);
</pre>
        </div>

        <div class="bg-slate-800/60 p-5 rounded-xl border border-slate-700/60">
            <h3 class="font-bold text-white mb-2 text-sm">partial_sum</h3>
            <p class="text-sm text-slate-300 mb-2">Computes the partial sums of the elements in the subranges and writes them to the destination range.</p>
<pre class="text-sm font-mono text-slate-300 bg-slate-900/60 p-3 rounded-lg overflow-x-auto">
partial_sum(first, last, result);
// result[k] = sum(first..first+k)
</pre>
        </div>

        <div class="bg-slate-800/60 p-5 rounded-xl border border-slate-700/60">
            <h3 class="font-bold text-white mb-2 text-sm">adjacent_difference</h3>
            <p class="text-sm text-slate-300 mb-2">Computes the differences between adjacent elements in the range.</p>
<pre class="text-sm font-mono text-slate-300 bg-slate-900/60 p-3 rounded-lg overflow-x-auto">
adjacent_difference(first, last, result);
// result[k] = src[k] - src[k-1]
</pre>
        </div>
    </div>
</section>
\`;

const functionalHtml = \`
<section class="page-view space-y-6">
    <div class="border-b border-slate-800 pb-4">
        <h2 class="text-2xl font-bold tracking-tight text-lime-400">Function Objects (&lt;functional&gt;)</h2>
        <p class="text-sm text-slate-400 mt-1">Predefined function objects (functors) and adaptors used by STL algorithms.</p>
        <p class="text-xs text-slate-500 mt-2">Category: Core Tools</p>
    </div>
    
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div class="bg-slate-800/60 p-5 rounded-xl border border-slate-700/60">
            <h3 class="font-bold text-white mb-3 border-b border-slate-700 pb-2">Base Structs</h3>
            <p class="text-sm text-slate-300 mb-2">Base templates to define arguments and result types:</p>
<pre class="text-xs font-mono text-slate-300 bg-slate-900/60 p-3 rounded-lg overflow-x-auto">
template&lt;class Arg, class Res&gt;
struct unary_function { ... };

template&lt;class A1, class A2, class Res&gt;
struct binary_function { ... };
</pre>
        </div>

        <div class="bg-slate-800/60 p-5 rounded-xl border border-slate-700/60">
            <h3 class="font-bold text-white mb-3 border-b border-slate-700 pb-2">Common Functors</h3>
            <ul class="text-sm text-slate-300 list-none space-y-1 font-mono">
                <li><code>plus&lt;T&gt;()</code></li>
                <li><code>minus&lt;T&gt;()</code></li>
                <li><code>multiplies&lt;T&gt;()</code>, <code>divides&lt;T&gt;()</code>, <code>modulus&lt;T&gt;()</code></li>
                <li><code>equal_to&lt;T&gt;()</code>, <code>not_equal_to&lt;T&gt;()</code></li>
                <li><code>greater&lt;T&gt;()</code>, <code>less&lt;T&gt;()</code></li>
                <li><code>greater_equal&lt;T&gt;()</code>, <code>less_equal&lt;T&gt;()</code></li>
                <li><code>logical_and&lt;T&gt;()</code>, <code>logical_or&lt;T&gt;()</code>, <code>logical_not&lt;T&gt;()</code></li>
            </ul>
        </div>

        <div class="bg-slate-800/60 p-5 rounded-xl border border-slate-700/60">
            <h3 class="font-bold text-white mb-3 border-b border-slate-700 pb-2">Negators</h3>
            <p class="text-sm text-slate-300 mb-2">Negates the result of a predicate.</p>
<pre class="text-xs font-mono text-slate-300 bg-slate-900/60 p-3 rounded-lg overflow-x-auto">
not1(unary_pred);
not2(binary_pred);
</pre>
        </div>

        <div class="bg-slate-800/60 p-5 rounded-xl border border-slate-700/60">
            <h3 class="font-bold text-white mb-3 border-b border-slate-700 pb-2">Binders</h3>
            <p class="text-sm text-slate-300 mb-2">Binds an argument to a binary function to create a unary function.</p>
<pre class="text-xs font-mono text-slate-300 bg-slate-900/60 p-3 rounded-lg overflow-x-auto">
bind1st(binary_op, x); // f(y) = op(x, y)
bind2nd(binary_op, x); // f(y) = op(y, x)
</pre>
        </div>

        <div class="bg-slate-800/60 p-5 rounded-xl border border-slate-700/60 md:col-span-2">
            <h3 class="font-bold text-white mb-3 border-b border-slate-700 pb-2">Function Pointers</h3>
            <p class="text-sm text-slate-300 mb-2">Converts a standard C++ function pointer into an adaptable function object.</p>
<pre class="text-xs font-mono text-slate-300 bg-slate-900/60 p-3 rounded-lg overflow-x-auto">
ptr_fun(&myFunction);
</pre>
        </div>
    </div>
</section>
\`;

const iteratorsHtml = \`
<section class="page-view space-y-6">
    <div class="border-b border-slate-800 pb-4">
        <h2 class="text-2xl font-bold tracking-tight text-orange-400">Iterators (&lt;iterator&gt;)</h2>
        <p class="text-sm text-slate-400 mt-1">Abstractions for pointers that allow algorithms to operate on data structures.</p>
        <p class="text-xs text-slate-500 mt-2">Category: Core Tools</p>
    </div>
    
    <div class="space-y-4">
        <div class="bg-slate-800/60 p-5 rounded-xl border border-slate-700/60">
            <h3 class="font-bold text-white mb-2 text-sm">Iterator Categories</h3>
            <ul class="text-sm text-slate-300 space-y-2">
                <li><strong>Input Iterator:</strong> Read, forward moving, single-pass. <code>*a</code>, <code>a++</code></li>
                <li><strong>Output Iterator:</strong> Write, forward moving, single-pass. <code>*a = t</code>, <code>a++</code></li>
                <li><strong>Forward Iterator:</strong> Input/Output + multi-pass.</li>
                <li><strong>Bidirectional Iterator:</strong> Forward + backward moving. <code>a--</code>, <code>--a</code> (List, Set, Map)</li>
                <li><strong>Random Access Iterator:</strong> Bidirectional + pointer arithmetic. <code>a[n]</code>, <code>a+n</code>, <code>a-b</code> (Vector, Deque)</li>
            </ul>
        </div>

        <div class="bg-slate-800/60 p-5 rounded-xl border border-slate-700/60">
            <h3 class="font-bold text-white mb-2 text-sm">Stream Iterators</h3>
            <p class="text-sm text-slate-300 mb-2">Allows treating I/O streams as ranges.</p>
<pre class="text-xs font-mono text-slate-300 bg-slate-900/60 p-3 rounded-lg overflow-x-auto">
<span class="text-slate-500">// Read from input</span>
istream_iterator&lt;int&gt; priter(cin);
istream_iterator&lt;int&gt; eosi; // End of stream

<span class="text-slate-500">// Write to output (delimited by space)</span>
ostream_iterator&lt;int&gt; osi(cout, " ");
</pre>
        </div>

        <div class="bg-slate-800/60 p-5 rounded-xl border border-slate-700/60">
            <h3 class="font-bold text-white mb-2 text-sm">Adaptors</h3>
            <ul class="text-sm text-slate-300 space-y-3">
                <li>
                    <strong>Reverse Iterator:</strong> <code>reverse_iterator</code><br>
                    Iterates backwards (e.g. <code>rbegin()</code> and <code>rend()</code>).
                </li>
                <li>
                    <strong>Insert Iterators:</strong> Overrides assignment <code>*i = x</code> to insert elements.<br>
                    <code>back_inserter(container)</code>: Calls <code>push_back(x)</code>.<br>
                    <code>front_inserter(container)</code>: Calls <code>push_front(x)</code>.<br>
                    <code>inserter(container, iter)</code>: Calls <code>insert(iter, x)</code>.
                </li>
            </ul>
        </div>

        <div class="bg-slate-800/60 p-5 rounded-xl border border-slate-700/60">
            <h3 class="font-bold text-white mb-2 text-sm">Iterator Traits</h3>
            <p class="text-sm text-slate-300 mb-2">Provides standard typedefs to query iterator properties at compile time.</p>
<pre class="text-xs font-mono text-slate-300 bg-slate-900/60 p-3 rounded-lg overflow-x-auto">
template&lt;class Itr&gt;
typename iterator_traits&lt;Itr&gt;::value_type
</pre>
        </div>
    </div>
</section>
\`;

fs.writeFileSync(path.join(pagesDir, 'algorithms.html'), algorithmsHtml.trim());
fs.writeFileSync(path.join(pagesDir, 'numeric.html'), numericHtml.trim());
fs.writeFileSync(path.join(pagesDir, 'functional.html'), functionalHtml.trim());
fs.writeFileSync(path.join(pagesDir, 'iterators.html'), iteratorsHtml.trim());

console.log("Created Core Tools pages successfully.");
