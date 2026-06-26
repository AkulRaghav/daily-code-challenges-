/**
 * Day 29: Segment Tree — Range Sum Query with Point Updates
 *
 * Problem: LeetCode 307 — Range Sum Query - Mutable
 * Given an integer array nums, handle multiple queries of two types:
 *   1. update(index, val) — Update nums[index] to val
 *   2. sumRange(left, right) — Return the sum of nums[left..right] (inclusive)
 *
 * Approach:
 * - Build a segment tree where each node stores the sum of a range
 * - Tree stored in array of size 4*n (1-indexed) for easy child access
 * - Build: O(n), Update: O(log n), Query: O(log n)
 * - Space: O(n)
 *
 * Why segment trees?
 * - Arrays with frequent range queries AND point/range updates
 * - Balanced between precomputation (prefix sums = O(1) query but O(n) update)
 *   and brute force (O(1) update but O(n) query)
 * - Segment tree gives O(log n) for both operations
 *
 * Time Complexity:  Build O(n), Query O(log n), Update O(log n)
 * Space Complexity: O(n)
 */

class SegmentTree {
  constructor(nums) {
    this.n = nums.length;
    this.tree = new Array(4 * this.n).fill(0);
    if (this.n > 0) {
      this._build(nums, 1, 0, this.n - 1);
    }
  }

  _build(nums, node, start, end) {
    if (start === end) {
      this.tree[node] = nums[start];
      return;
    }
    const mid = (start + end) >> 1;
    this._build(nums, 2 * node, start, mid);
    this._build(nums, 2 * node + 1, mid + 1, end);
    this.tree[node] = this.tree[2 * node] + this.tree[2 * node + 1];
  }

  update(index, val) {
    this._update(1, 0, this.n - 1, index, val);
  }

  _update(node, start, end, index, val) {
    if (start === end) {
      this.tree[node] = val;
      return;
    }
    const mid = (start + end) >> 1;
    if (index <= mid) {
      this._update(2 * node, start, mid, index, val);
    } else {
      this._update(2 * node + 1, mid + 1, end, index, val);
    }
    this.tree[node] = this.tree[2 * node] + this.tree[2 * node + 1];
  }

  sumRange(left, right) {
    return this._query(1, 0, this.n - 1, left, right);
  }

  _query(node, start, end, left, right) {
    if (right < start || end < left) return 0;
    if (left <= start && end <= right) return this.tree[node];
    const mid = (start + end) >> 1;
    return this._query(2 * node, start, mid, left, right)
         + this._query(2 * node + 1, mid + 1, end, left, right);
  }
}

// --- Tests ---
const nums = [1, 3, 5];
const st = new SegmentTree(nums);
console.assert(st.sumRange(0, 2) === 9);
st.update(1, 2);
console.assert(st.sumRange(0, 2) === 8);
console.assert(st.sumRange(1, 2) === 7);

const st2 = new SegmentTree([2, 4, 5, 7, 8, 9]);
console.assert(st2.sumRange(0, 5) === 35);
st2.update(3, 1);
console.assert(st2.sumRange(2, 4) === 14);
console.log("All tests passed!");
