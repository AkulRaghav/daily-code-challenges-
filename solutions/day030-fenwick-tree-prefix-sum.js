/**
 * Day 30: Fenwick Tree (Binary Indexed Tree) — Prefix Sum + Point Update
 *
 * Problem: LeetCode 307 — Range Sum Query - Mutable (alternative to Segment Tree)
 * 
 * A Fenwick Tree provides:
 *   - Point update: O(log n)
 *   - Prefix sum query: O(log n)
 *   - Range sum [l, r] = prefix(r) - prefix(l-1): O(log n)
 *
 * Key insight: Each index i is responsible for a range of elements
 * determined by its lowest set bit (LSB). Index i covers elements
 * from (i - LSB(i) + 1) to i.
 *
 * Time Complexity:  Build O(n log n), Update O(log n), Query O(log n)
 * Space Complexity: O(n)
 */

class FenwickTree {
  constructor(n) {
    this.n = n;
    this.tree = new Array(n + 1).fill(0); // 1-indexed
  }

  // Build from array in O(n) using bottom-up propagation
  static fromArray(nums) {
    const ft = new FenwickTree(nums.length);
    for (let i = 0; i < nums.length; i++) {
      ft.tree[i + 1] = nums[i];
    }
    // Propagate contributions to parents
    for (let i = 1; i <= ft.n; i++) {
      const parent = i + (i & -i);
      if (parent <= ft.n) {
        ft.tree[parent] += ft.tree[i];
      }
    }
    return ft;
  }

  // Add delta to index i (0-indexed externally, 1-indexed internally)
  update(i, delta) {
    i += 1; // Convert to 1-indexed
    while (i <= this.n) {
      this.tree[i] += delta;
      i += i & -i; // Move to parent (next responsible node)
    }
  }

  // Prefix sum [0, i] (0-indexed)
  prefixSum(i) {
    i += 1; // Convert to 1-indexed
    let sum = 0;
    while (i > 0) {
      sum += this.tree[i];
      i -= i & -i; // Move to predecessor
    }
    return sum;
  }

  // Range sum [left, right] (0-indexed, inclusive)
  rangeSum(left, right) {
    if (left === 0) return this.prefixSum(right);
    return this.prefixSum(right) - this.prefixSum(left - 1);
  }
}

// --- Tests ---
const ft = FenwickTree.fromArray([1, 3, 5, 7, 9, 11]);
console.assert(ft.prefixSum(0) === 1, "prefix[0]");
console.assert(ft.prefixSum(2) === 9, "prefix[2] = 1+3+5");
console.assert(ft.prefixSum(5) === 36, "prefix[5] = sum all");
console.assert(ft.rangeSum(1, 3) === 15, "range[1,3] = 3+5+7");

ft.update(2, 3); // nums[2] += 3 → [1,3,8,7,9,11]
console.assert(ft.prefixSum(2) === 12, "after update prefix[2]");
console.assert(ft.rangeSum(2, 4) === 24, "range[2,4] = 8+7+9");

// Edge: single element
const ft2 = FenwickTree.fromArray([42]);
console.assert(ft2.prefixSum(0) === 42);
ft2.update(0, -42);
console.assert(ft2.prefixSum(0) === 0);

console.log("All Fenwick Tree tests passed!");

/**
 * Fenwick vs Segment Tree:
 * - Fenwick: Simpler code, less memory (n+1 vs 4n), faster constant factor
 * - Segment Tree: More general (supports min/max/GCD), range updates with lazy
 * - Fenwick only works for operations with inverse (sum has subtraction, but min doesn't)
 */
