/**
 * Day 4: Container With Most Water
 *
 * Approach: Two Pointers (O(n) time, O(1) space)
 *
 * Start with the widest container (left=0, right=n-1).
 * The area is min(height[left], height[right]) * (right - left).
 * Move the pointer with the shorter height inward — keeping the
 * taller one gives a better chance of finding more water.
 */

function maxArea(height) {
  let left = 0;
  let right = height.length - 1;
  let maxWater = 0;

  while (left < right) {
    // Calculate water in current container
    const width = right - left;
    const h = Math.min(height[left], height[right]);
    const water = width * h;

    maxWater = Math.max(maxWater, water);

    // Move the shorter side inward (greedy choice)
    if (height[left] < height[right]) {
      left++;
    } else {
      right--;
    }
  }

  return maxWater;
}

// Tests
console.log(maxArea([1,8,6,2,5,4,8,3,7])); // 49
console.log(maxArea([1,1]));                 // 1
console.log(maxArea([4,3,2,1,4]));           // 16
console.log(maxArea([1,2,1]));               // 2
console.log(maxArea([1,8,6,2,5,4,8,25,7])); // 49

/**
 * Complexity Analysis:
 * - Time: O(n) - two pointers meet in the middle
 * - Space: O(1) - only tracking pointers and max
 *
 * Why the greedy choice works:
 * - Area = min(left, right) * width
 * - Width always decreases as pointers move inward
 * - Moving the taller side can only decrease or maintain the height
 * - Moving the shorter side might find a taller line, increasing height
 * - So moving the shorter side is the only way to potentially find more water
 *
 * This is a classic proof by contradiction:
 * If we moved the taller side, the new area <= current area (because
 * height is still bounded by the shorter side, and width decreased).
 */
