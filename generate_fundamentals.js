const fs = require('fs');
const path = require('path');

const pagesDir = path.join(__dirname, 'pages');

const template = (id, title, subtitle, cpp, java, python, js) => `
<section class="page-view space-y-6">
    <div class="border-b border-slate-800 pb-4">
        <h2 class="text-2xl font-bold tracking-tight text-white">${title}</h2>
        <p class="text-sm text-slate-400 mt-1">${subtitle}</p>
    </div>

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
        <div class="space-y-4">
            <div class="bg-slate-900 rounded-lg p-4 border border-slate-700 overflow-x-auto">
                <pre><code class="language-cpp text-sm text-slate-300">${cpp}</code></pre>
            </div>
        </div>
    </div>

    <!-- JAVA TAB -->
    <div class="tab-content hidden" id="tab-java">
        <div class="space-y-4">
            <div class="bg-slate-900 rounded-lg p-4 border border-slate-700 overflow-x-auto">
                <pre><code class="language-java text-sm text-slate-300">${java}</code></pre>
            </div>
        </div>
    </div>

    <!-- PYTHON TAB -->
    <div class="tab-content hidden" id="tab-python">
        <div class="space-y-4">
            <div class="bg-slate-900 rounded-lg p-4 border border-slate-700 overflow-x-auto">
                <pre><code class="language-python text-sm text-slate-300">${python}</code></pre>
            </div>
        </div>
    </div>

    <!-- JS TAB -->
    <div class="tab-content hidden" id="tab-js">
        <div class="space-y-4">
            <div class="bg-slate-900 rounded-lg p-4 border border-slate-700 overflow-x-auto">
                <pre><code class="language-javascript text-sm text-slate-300">${js}</code></pre>
            </div>
        </div>
    </div>
</section>
`;

const pages = {
    'loops_conditionals': {
        title: 'Loops & Conditionals',
        subtitle: 'The fundamental syntax for control flow across languages.',
        cpp: `// 1. If / Else
if (x > 0) { ... } 
else if (x < 0) { ... } 
else { ... }

// 2. Standard For Loop
for (int i = 0; i < 10; ++i) { ... }

// 3. Range-Based For Loop
for (const auto& val : vec) { ... }

// 4. While Loop
while (x > 0) { --x; }

// 5. Do-While
do { ... } while (x > 0);

// 6. Switch Statement (Works on primitives only)
switch(x) {
    case 1: break;
    default: break;
}`,
        java: `// 1. If / Else
if (x > 0) { ... } 
else if (x < 0) { ... } 
else { ... }

// 2. Standard For Loop
for (int i = 0; i < 10; i++) { ... }

// 3. Enhanced For-Loop (Works on Iterables & Arrays)
for (int val : list) { ... }

// 4. While & Do-While
while (x > 0) { x--; }
do { ... } while (x > 0);

// 5. Switch Statement (Works on primitives & Strings!)
switch(str) {
    case "A": break;
    default: break;
}`,
        python: `# 1. If / Elif / Else
if x > 0:
    pass
elif x < 0:
    pass
else:
    pass

# 2. For Loop (Using ranges)
# range(start, stop_exclusive, step)
for i in range(0, 10, 1):
    pass

# 3. Enhanced For-Loop (Iterating over collections)
for val in lst:
    pass

# With index using enumerate()
for idx, val in enumerate(lst):
    pass

# 4. While Loop
while x > 0:
    x -= 1
# Note: Python has no do-while loop.

# 5. Switch Statement (Python 3.10+ match/case)
match x:
    case 1:
        pass
    case _:
        pass`,
        js: `// 1. If / Else
if (x > 0) { ... } 
else if (x < 0) { ... } 
else { ... }

// 2. Standard For Loop
for (let i = 0; i < 10; i++) { ... }

// 3. For-Of (Iterates over VALUES of Array/Map/Set)
for (const val of arr) { ... }

// 4. For-In (Iterates over KEYS of an Object)
for (const key in obj) { ... }

// 5. While & Do-While
while (x > 0) { x--; }
do { ... } while(x > 0);

// 6. Switch Statement (Works on strings & numbers)
switch(x) {
    case "A": break;
    default: break;
}`
    },
    'comparators': {
        title: 'Comparators & Sorting',
        subtitle: 'Custom sorting logic for sorting objects or multiple fields.',
        cpp: `// 1. Ascending Sort (Default)
std::sort(vec.begin(), vec.end());

// 2. Descending Sort
std::sort(vec.begin(), vec.end(), std::greater<int>());

// 3. Custom Lambda Sorting (e.g., sort by 2nd element of pair)
std::sort(vec.begin(), vec.end(), [](const std::pair<int, int>& a, const std::pair<int, int>& b) {
    if (a.second != b.second) return a.second < b.second; // Primary: sort by 2nd asc
    return a.first > b.first;                             // Secondary: sort by 1st desc
});`,
        java: `import java.util.Collections;
import java.util.Comparator;

// 1. Ascending Sort (Default for primitives and Comparable objects)
Collections.sort(list); // Or list.sort(null);

// 2. Descending Sort
list.sort(Collections.reverseOrder());

// 3. Custom Lambda Sorting (e.g., sort pairs)
// Return negative if 'a' comes before 'b', positive if 'b' comes before 'a', 0 if equal.
list.sort((a, b) -> {
    if (a[1] != b[1]) return Integer.compare(a[1], b[1]); // Ascending
    return Integer.compare(b[0], a[0]);                   // Descending
});

// 4. Comparator.comparing (Cleanest approach)
list.sort(Comparator.comparing((int[] a) -> a[1])
                    .thenComparing(a -> a[0], Comparator.reverseOrder()));`,
        python: `# 1. Ascending Sort
lst.sort()

# 2. Descending Sort
lst.sort(reverse=True)

# 3. Custom Key Function (Tuple sorting)
# In Python, we don't return positive/negative. 
# We return a TUPLE representing the sort priority.
# To sort descending, we negate the number.
lst.sort(key=lambda x: (x[1], -x[0]))
# Primary: x[1] ascending
# Secondary: x[0] descending

# 4. Custom Comparator (Rarely used, fallback to functools.cmp_to_key)
from functools import cmp_to_key
def compare(a, b):
    if a + b > b + a: return 1
    elif a + b < b + a: return -1
    return 0
lst.sort(key=cmp_to_key(compare))`,
        js: `// WARNING: JS array.sort() converts elements to strings and sorts alphabetically by default!
// [1, 10, 2].sort() -> [1, 10, 2] !!!

// 1. Numeric Ascending Sort (MUST provide comparator)
arr.sort((a, b) => a - b);

// 2. Numeric Descending Sort
arr.sort((a, b) => b - a);

// 3. Custom Sorting Logic
arr.sort((a, b) => {
    if (a[1] !== b[1]) return a[1] - b[1]; // Primary: ascending
    return b[0] - a[0];                    // Secondary: descending
});`
    },
    'math_bitwise': {
        title: 'Math & Bitwise',
        subtitle: 'Mathematical functions, bit manipulation, and numeric gotchas.',
        cpp: `// MATH (<cmath>)
int a = std::abs(-5);
double p = std::pow(2, 3); // 8.0
double s = std::sqrt(16);  // 4.0
int g = std::gcd(10, 5);   // (<numeric>)

// MIN/MAX (<algorithm>)
int m = std::max(a, b);

// BITWISE
int x = 5;       // 0101
int and_ = x & 1; // 0001
int or_ = x | 2;  // 0111
int xor_ = x ^ 1; // 0100
int ls = x << 1;  // 1010 (x * 2)
int rs = x >> 1;  // 0010 (x / 2)

// BUILTIN POPCOUNT (Count set bits)
int bits = __builtin_popcount(x); // GCC specific!`,
        java: `// MATH (java.lang.Math)
int a = Math.abs(-5);
double p = Math.pow(2, 3); // 8.0
double s = Math.sqrt(16);  // 4.0

// MIN/MAX
int m = Math.max(a, b);

// GCD (Write your own!)
int gcd(int a, int b) { return b == 0 ? a : gcd(b, a % b); }

// BITWISE
int x = 5;
int and_ = x & 1;
int or_ = x | 2;
int xor_ = x ^ 1;
int ls = x << 1; 
int rs = x >> 1;  // Signed right shift
int urs = x >>> 1; // Unsigned right shift (Java specific!)

// POPCOUNT
int bits = Integer.bitCount(x);`,
        python: `# MATH
a = abs(-5)
p = pow(2, 3) # Or 2 ** 3
import math
s = math.sqrt(16)
g = math.gcd(10, 5)

# MIN/MAX
m = max(a, b)

# BITWISE (Note: Python ints have arbitrary precision/no overflow)
x = 5
and_ = x & 1
or_ = x | 2
xor_ = x ^ 1
ls = x << 1
rs = x >> 1

# POPCOUNT (Python 3.10+)
bits = x.bit_count()`,
        js: `// MATH (Math object)
let a = Math.abs(-5);
let p = Math.pow(2, 3); // Or 2 ** 3
let s = Math.sqrt(16);

// MIN/MAX
let m = Math.max(a, b);

// BITWISE 
// WARNING: Bitwise ops in JS forcibly convert numbers to 32-bit signed integers!
let x = 5;
let and_ = x & 1;
let or_ = x | 2;
let xor_ = x ^ 1;
let ls = x << 1;
let rs = x >> 1;
let urs = x >>> 1; // Unsigned right shift

// POPCOUNT (Write your own)
function popcount(n) {
    let count = 0;
    while(n) { n &= (n - 1); count++; }
    return count;
}`
    },
    'io_formatting': {
        title: 'Input & Output',
        subtitle: 'Reading from stdin, writing to stdout, and avoiding Time Limit Exceeded.',
        cpp: `// 1. Standard I/O
#include <iostream>
int x;
std::cin >> x;
std::cout << x << "\\n";

// 2. Fast I/O (Crucial for Competitive Programming)
// Put this at the very top of main() to disable synchronization with C stdio
std::ios_base::sync_with_stdio(false);
std::cin.tie(NULL);

// Note: Always use '\\n' instead of std::endl, 
// because std::endl flushes the buffer and is very slow.`,
        java: `import java.util.Scanner;
import java.io.*;

// 1. Slow I/O (Scanner - Fine for small input)
Scanner sc = new Scanner(System.in);
int x = sc.nextInt();
System.out.println(x);

// 2. Fast I/O (BufferedReader - Essential for CP)
BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
StringTokenizer st = new StringTokenizer(br.readLine());
int y = Integer.parseInt(st.nextToken());

// Fast Output
PrintWriter pw = new PrintWriter(System.out);
pw.println(y);
pw.flush(); // MUST flush at the end!`,
        python: `import sys

# 1. Standard I/O
x = int(input())
print(x)

# 2. Fast I/O (Crucial for CP)
# Reading all of stdin at once and splitting it by whitespace
# This is drastically faster than calling input() in a loop.
input_data = sys.stdin.read().split()
if input_data:
    x = int(input_data[0])

# Fast Print (Avoids newline overhead)
sys.stdout.write(str(x) + "\\n")

# Reading lines efficiently
lines = sys.stdin.readlines()`,
        js: `const fs = require('fs');

// Fast I/O in Node.js (Reading all of stdin to a buffer)
// 0 refers to stdin (file descriptor 0)
const input = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/);

let idx = 0;
let x = parseInt(input[idx++], 10);

// Output
console.log(x);

// If printing thousands of lines, build a giant string first:
let out = [];
out.push(x);
console.log(out.join("\\n"));`
    }
};

for (const [id, data] of Object.entries(pages)) {
    const html = template(id, data.title, data.subtitle, data.cpp, data.java, data.python, data.js);
    fs.writeFileSync(path.join(pagesDir, id + '.html'), html);
    console.log("Generated " + id + ".html");
}
