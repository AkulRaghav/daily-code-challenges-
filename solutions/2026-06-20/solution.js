/**
 * Day 25: Sliding Window Maximum (Monotonic Deque)
 *
 * Find max in every window of size k.
 * Naive: O(n*k). Optimal with deque: O(n).
 * LeetCode #239 (Hard).
 */
function maxSlidingWindow(nums, k) {
  const result = [];
  const deque = []; // stores indices, front = max of current window

  for (let i = 0; i < nums.length; i++) {
    // Remove elements outside window
    while (deque.length > 0 && deque[0] < i - k + 1) {
      deque.shift();
    }

    // Remove smaller elements from back (they'll never be the max)
    while (deque.length > 0 && nums[deque[deque.length - 1]] < nums[i]) {
      deque.pop();
    }

    deque.push(i);

    // Window is complete from index k-1 onwards
    if (i >= k - 1) {
      result.push(nums[deque[0]]);
    }
  }

  return result;
}

console.log(maxSlidingWindow([1,3,-1,-3,5,3,6,7], 3)); // [3,3,5,5,6,7]
console.log(maxSlidingWindow([1], 1));                   // [1]
console.log(maxSlidingWindow([9,11], 2));                // [11]

/**
 * Monotonic deque maintains decreasing order from front to back.
 * Front always holds the maximum of the current window.
 * Each element enters and leaves the deque at most once → O(n) total.
 */
