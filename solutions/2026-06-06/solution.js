/**
 * Day 11: Climbing Stairs (Dynamic Programming)
 *
 * You can climb 1 or 2 steps. How many distinct ways to reach step n?
 * This is the Fibonacci sequence in disguise.
 * O(n) time, O(1) space.
 */
function climbStairs(n) {
  if (n <= 2) return n;

  let prev2 = 1; // ways to reach step n-2
  let prev1 = 2; // ways to reach step n-1

  for (let i = 3; i <= n; i++) {
    const current = prev1 + prev2;
    prev2 = prev1;
    prev1 = current;
  }

  return prev1;
}

// Tests
console.log(climbStairs(1));  // 1
console.log(climbStairs(2));  // 2
console.log(climbStairs(3));  // 3
console.log(climbStairs(4));  // 5
console.log(climbStairs(5));  // 8
console.log(climbStairs(10)); // 89
console.log(climbStairs(45)); // 1836311903

/**
 * Why it works:
 * To reach step n, you either came from step n-1 (one step) or n-2 (two steps).
 * So ways(n) = ways(n-1) + ways(n-2) — exactly Fibonacci.
 *
 * Space optimization: we only need the last two values, not the full array.
 */
