/**
 * Day 21: Merge Sort (Divide and Conquer)
 *
 * Stable sort. Always O(n log n) time — no worst-case degradation.
 * O(n) auxiliary space for merging.
 */
function mergeSort(arr) {
  if (arr.length <= 1) return arr;

  const mid = Math.floor(arr.length / 2);
  const left = mergeSort(arr.slice(0, mid));
  const right = mergeSort(arr.slice(mid));

  return merge(left, right);
}

function merge(left, right) {
  const result = [];
  let i = 0, j = 0;

  while (i < left.length && j < right.length) {
    if (left[i] <= right[j]) {  // <= makes it stable
      result.push(left[i++]);
    } else {
      result.push(right[j++]);
    }
  }

  // Append remaining
  while (i < left.length) result.push(left[i++]);
  while (j < right.length) result.push(right[j++]);

  return result;
}

// Tests
console.log(mergeSort([38, 27, 43, 3, 9, 82, 10])); // [3, 9, 10, 27, 38, 43, 82]
console.log(mergeSort([5, 4, 3, 2, 1]));              // [1, 2, 3, 4, 5]
console.log(mergeSort([1]));                           // [1]
console.log(mergeSort([]));                            // []
console.log(mergeSort([3, 3, 1, 1, 2, 2]));           // [1, 1, 2, 2, 3, 3] (stable)

/**
 * Why merge sort matters:
 * - Guaranteed O(n log n) — unlike QuickSort which has O(n^2) worst case
 * - Stable — equal elements maintain relative order
 * - Used by: Java's Arrays.sort for objects, Python's Timsort (hybrid)
 * - Parallelizable — left and right halves can sort independently
 *
 * Trade-off: O(n) extra space vs QuickSort's O(log n) in-place
 */
