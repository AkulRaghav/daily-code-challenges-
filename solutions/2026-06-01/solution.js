/**
 * Day 6: Product of Array Except Self
 *
 * Approach: Prefix and Suffix Products (O(n) time, O(1) extra space)
 *
 * For each index i, the answer is:
 *   (product of all elements to the left of i) * (product of all elements to the right of i)
 *
 * We compute this in two passes without division.
 */

function productExceptSelf(nums) {
  const n = nums.length;
  const answer = new Array(n);

  // Pass 1: Left-to-right — answer[i] = product of nums[0..i-1]
  answer[0] = 1;
  for (let i = 1; i < n; i++) {
    answer[i] = answer[i - 1] * nums[i - 1];
  }

  // Pass 2: Right-to-left — multiply by suffix product
  let suffixProduct = 1;
  for (let i = n - 1; i >= 0; i--) {
    answer[i] *= suffixProduct;
    suffixProduct *= nums[i];
  }

  return answer;
}

// Tests
console.log(productExceptSelf([1, 2, 3, 4]));       // [24, 12, 8, 6]
console.log(productExceptSelf([-1, 1, 0, -3, 3]));  // [0, 0, 9, 0, 0]
console.log(productExceptSelf([2, 3]));              // [3, 2]
console.log(productExceptSelf([0, 0]));              // [0, 0]
console.log(productExceptSelf([1, 1, 1, 1]));        // [1, 1, 1, 1]

/**
 * Complexity Analysis:
 * - Time: O(n) — two linear passes
 * - Space: O(1) extra — output array doesn't count per the problem statement
 *
 * Key Insight:
 * For index i, we need: (nums[0] * ... * nums[i-1]) * (nums[i+1] * ... * nums[n-1])
 *                        ^^^^^^^^^ prefix ^^^^^^^^^    ^^^^^^^^^ suffix ^^^^^^^^^
 *
 * Pass 1 builds prefix products into the answer array.
 * Pass 2 multiplies each answer[i] by the running suffix product.
 *
 * Why no division:
 * Division fails when zeros are present (and the problem explicitly forbids it).
 * The prefix/suffix approach handles zeros naturally.
 *
 * Visualization for [1, 2, 3, 4]:
 *   After pass 1 (prefix): [1, 1, 2, 6]
 *   After pass 2 (suffix): [24, 12, 8, 6]
 *     i=3: answer[3] = 6 * 1 = 6,   suffixProduct = 4
 *     i=2: answer[2] = 2 * 4 = 8,   suffixProduct = 12
 *     i=1: answer[1] = 1 * 12 = 12,  suffixProduct = 24
 *     i=0: answer[0] = 1 * 24 = 24,  suffixProduct = 24
 */
