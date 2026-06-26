/**
 * Day 28: 0/1 Knapsack Problem (Dynamic Programming)
 *
 * Given items with weights and values, maximize value within capacity.
 * Classic DP. O(n*W) time, O(W) space (optimized).
 */
function knapsack(weights, values, capacity) {
  const n = weights.length;
  // dp[w] = max value achievable with capacity w
  const dp = new Array(capacity + 1).fill(0);

  for (let i = 0; i < n; i++) {
    // Traverse backwards to avoid using item twice
    for (let w = capacity; w >= weights[i]; w--) {
      dp[w] = Math.max(dp[w], dp[w - weights[i]] + values[i]);
    }
  }

  return dp[capacity];
}

// Test
const weights = [2, 3, 4, 5];
const values =  [3, 4, 5, 6];
const capacity = 8;
console.log(knapsack(weights, values, capacity)); // 10 (items 1+3: weight 3+5=8, value 4+6=10)

console.log(knapsack([1,2,3], [6,10,12], 5)); // 22 (items 1+2: weight 2+3=5, value 10+12=22)
console.log(knapsack([3,4,5], [30,50,60], 8)); // 90 (items 0+1: weight 3+4=7, value 30+50=80... actually 60+30=90 with 5+3=8)

/**
 * Space optimization: 1D array traversed backwards.
 * Forward traversal would allow reusing items (unbounded knapsack).
 * Backward guarantees each item used at most once.
 *
 * Variants: unbounded, fractional (greedy), subset sum, partition equal subset.
 */
