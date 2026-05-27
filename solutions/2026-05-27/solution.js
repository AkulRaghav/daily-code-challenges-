/**
 * Day 1: Two Sum
 * 
 * Approach: Hash Map (O(n) time, O(n) space)
 * 
 * Instead of brute-force O(n²), we use a hash map to store
 * each number's complement as we iterate. For each number,
 * we check if its complement (target - num) already exists in the map.
 */

function twoSum(nums, target) {
  const map = new Map();

  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];

    if (map.has(complement)) {
      return [map.get(complement), i];
    }

    map.set(nums[i], i);
  }

  return []; // No solution found
}

// Tests
console.log(twoSum([2, 7, 11, 15], 9)); // [0, 1]
console.log(twoSum([3, 2, 4], 6));       // [1, 2]
console.log(twoSum([3, 3], 6));           // [0, 1]

/**
 * Complexity Analysis:
 * - Time: O(n) — single pass through the array
 * - Space: O(n) — hash map stores at most n elements
 * 
 * Why this is better than brute force:
 * - Brute force: O(n²) with nested loops
 * - Hash map: O(n) by trading space for time
 */
