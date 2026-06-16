/**
 * Day 7: Maximum Subarray - Kadane's Algorithm
 * O(n) time, O(1) space
 */
function maxSubArray(nums) {
  let maxSum = nums[0];
  let currentSum = nums[0];

  for (let i = 1; i < nums.length; i++) {
    // Either extend the current subarray or start fresh
    currentSum = Math.max(nums[i], currentSum + nums[i]);
    maxSum = Math.max(maxSum, currentSum);
  }
  return maxSum;
}

console.log(maxSubArray([-2,1,-3,4,-1,2,1,-5,4])); // 6
console.log(maxSubArray([1]));                       // 1
console.log(maxSubArray([5,4,-1,7,8]));              // 23
console.log(maxSubArray([-1]));                      // -1
console.log(maxSubArray([-2,-1]));                   // -1
