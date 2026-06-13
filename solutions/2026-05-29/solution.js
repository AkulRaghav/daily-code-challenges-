/**
 * Day 3: Longest Substring Without Repeating Characters
 *
 * Approach: Sliding Window with Hash Map (O(n) time, O(min(n,m)) space)
 *
 * Use two pointers (left, right) to define a window. Expand right pointer
 * and track character positions in a map. When a duplicate is found,
 * jump the left pointer past the previous occurrence.
 */

function lengthOfLongestSubstring(s) {
  const charIndex = new Map(); // char -> most recent index
  let maxLen = 0;
  let left = 0;

  for (let right = 0; right < s.length; right++) {
    const char = s[right];

    // If char was seen and its last position is within current window
    if (charIndex.has(char) && charIndex.get(char) >= left) {
      // Move left pointer past the duplicate
      left = charIndex.get(char) + 1;
    }

    // Update the character's most recent position
    charIndex.set(char, right);

    // Update max length
    maxLen = Math.max(maxLen, right - left + 1);
  }

  return maxLen;
}

// Tests
console.log(lengthOfLongestSubstring("abcabcbb")); // 3
console.log(lengthOfLongestSubstring("bbbbb"));    // 1
console.log(lengthOfLongestSubstring("pwwkew"));   // 3
console.log(lengthOfLongestSubstring(""));         // 0
console.log(lengthOfLongestSubstring(" "));        // 1
console.log(lengthOfLongestSubstring("au"));       // 2
console.log(lengthOfLongestSubstring("dvdf"));     // 3
console.log(lengthOfLongestSubstring("abba"));     // 2

/**
 * Complexity Analysis:
 * - Time: O(n) - each character is visited at most twice (once by right, once by left)
 * - Space: O(min(n, m)) - where m is the character set size (128 ASCII or 256 extended)
 *
 * Key Insight:
 * Instead of shrinking the window one character at a time (O(n^2)),
 * we jump the left pointer directly to the position after the duplicate.
 * The Map stores the last-seen index of each character, enabling O(1) jumps.
 *
 * Why this beats brute force:
 * - Brute force: check all O(n^2) substrings, each in O(n) -> O(n^3)
 * - Sliding window: single pass with O(1) lookups -> O(n)
 *
 * Edge Cases:
 * - Empty string -> 0
 * - All same characters -> 1
 * - All unique characters -> s.length
 * - Spaces and special characters count as characters
 */
