/**
 * Day 26: Merge Intervals
 *
 * Sort by start time, merge overlapping intervals.
 * O(n log n) time, O(n) space.
 * LeetCode #56 (Medium).
 */
function merge(intervals) {
  if (intervals.length <= 1) return intervals;

  intervals.sort((a, b) => a[0] - b[0]);

  const result = [intervals[0]];

  for (let i = 1; i < intervals.length; i++) {
    const last = result[result.length - 1];
    const curr = intervals[i];

    if (curr[0] <= last[1]) {
      // Overlapping — extend the end
      last[1] = Math.max(last[1], curr[1]);
    } else {
      result.push(curr);
    }
  }

  return result;
}

console.log(merge([[1,3],[2,6],[8,10],[15,18]])); // [[1,6],[8,10],[15,18]]
console.log(merge([[1,4],[4,5]]));                 // [[1,5]]
console.log(merge([[1,4],[0,4]]));                 // [[0,4]]
console.log(merge([[1,4],[2,3]]));                 // [[1,4]] (contained)

/**
 * Pattern: sort + linear scan with greedy merge.
 * Used in: calendar apps, resource scheduling, genome assembly.
 */
