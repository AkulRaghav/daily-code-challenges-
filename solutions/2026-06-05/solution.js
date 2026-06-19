/**
 * Day 10: Binary Search
 *
 * Given a sorted array and target, return index or -1.
 * O(log n) time, O(1) space.
 */
function search(nums, target) {
  let left = 0;
  let right = nums.length - 1;

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);

    if (nums[mid] === target) return mid;
    if (nums[mid] < target) left = mid + 1;
    else right = mid - 1;
  }

  return -1;
}

console.log(search([-1,0,3,5,9,12], 9));  // 4
console.log(search([-1,0,3,5,9,12], 2));  // -1
console.log(search([5], 5));               // 0
console.log(search([2,5], 5));             // 1
console.log(search([], 0));                // -1

/**
 * Key: left <= right (not <) ensures single-element check.
 * Mid calculation avoids overflow: Math.floor((left + right) / 2)
 * In other languages use: left + (right - left) / 2
 */
