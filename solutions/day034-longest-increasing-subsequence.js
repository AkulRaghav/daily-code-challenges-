/**
 * Day 34: Longest Increasing Subsequence — O(n log n) with Patience Sort
 *
 * Problem: LeetCode 300 — Longest Increasing Subsequence
 * Given an integer array nums, return the length of the longest strictly
 * increasing subsequence (not necessarily contiguous).
 *
 * Approach 1 (DP): O(n^2) — for each i, LIS ending at i = 1 + max(LIS[j]) where j < i and nums[j] < nums[i]
 * Approach 2 (Patience Sort): O(n log n) — maintain "tails" array where tails[i]
 * is the smallest tail element for all increasing subsequences of length i+1.
 *
 * Key insight: tails[] is always sorted, so we can binary search for the
 * correct insertion point. If nums[i] extends the longest subsequence,
 * append it. Otherwise, replace the first element in tails[] >= nums[i].
 *
 * Time Complexity:  O(n log n)
 * Space Complexity: O(n)
 */

function lengthOfLIS(nums) {
  if (nums.length === 0) return 0;

  // tails[i] = smallest tail element of all increasing subsequences of length i+1
  const tails = [];

  for (const num of nums) {
    // Binary search: find first index in tails where tails[idx] >= num
    let lo = 0, hi = tails.length;
    while (lo < hi) {
      const mid = (lo + hi) >> 1;
      if (tails[mid] < num) {
        lo = mid + 1;
      } else {
        hi = mid;
      }
    }

    // lo is the insertion point
    if (lo === tails.length) {
      tails.push(num); // Extends longest subsequence
    } else {
      tails[lo] = num; // Replace to keep tail as small as possible
    }
  }

  return tails.length;
}

/**
 * Bonus: Reconstruct the actual LIS (not just length)
 * Track parent pointers during the patience sort process.
 */
function findLIS(nums) {
  const n = nums.length;
  if (n === 0) return [];

  const tails = [];       // Indices into nums
  const parent = new Array(n).fill(-1);
  const tailIdx = [];     // tailIdx[i] = index in nums of tails[i]

  for (let i = 0; i < n; i++) {
    let lo = 0, hi = tails.length;
    while (lo < hi) {
      const mid = (lo + hi) >> 1;
      if (nums[tails[mid]] < nums[i]) lo = mid + 1;
      else hi = mid;
    }

    if (lo > 0) parent[i] = tails[lo - 1];

    if (lo === tails.length) {
      tails.push(i);
    } else {
      tails[lo] = i;
    }
  }

  // Reconstruct path
  const result = [];
  let idx = tails[tails.length - 1];
  while (idx !== -1) {
    result.push(nums[idx]);
    idx = parent[idx];
  }
  return result.reverse();
}

// --- Tests ---
console.assert(lengthOfLIS([10, 9, 2, 5, 3, 7, 101, 18]) === 4, "Classic example: [2,3,7,101] or [2,3,7,18]");
console.assert(lengthOfLIS([0, 1, 0, 3, 2, 3]) === 4, "[0,1,2,3]");
console.assert(lengthOfLIS([7, 7, 7, 7]) === 1, "All same: strictly increasing");
console.assert(lengthOfLIS([1]) === 1, "Single element");
console.assert(lengthOfLIS([]) === 0, "Empty");
console.assert(lengthOfLIS([1, 2, 3, 4, 5]) === 5, "Already sorted");
console.assert(lengthOfLIS([5, 4, 3, 2, 1]) === 1, "Reverse sorted");

// Reconstruction test
const lis = findLIS([10, 9, 2, 5, 3, 7, 101, 18]);
console.assert(lis.length === 4, "Reconstructed LIS length");
// Verify it's actually increasing
for (let i = 1; i < lis.length; i++) {
  console.assert(lis[i] > lis[i-1], "LIS must be strictly increasing");
}

console.log("All LIS tests passed!");

/**
 * Applications:
 * - Patience sorting (card game origin of the algorithm)
 * - Box stacking / Russian doll envelopes (LIS on sorted input)
 * - Minimum number of non-crossing lines between two sequences
 * - Longest chain problems (activities, pairs)
 */
