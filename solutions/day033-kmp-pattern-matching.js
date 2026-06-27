/**
 * Day 33: KMP (Knuth-Morris-Pratt) — Pattern Matching O(n + m)
 *
 * Problem: LeetCode 28 — Find the Index of the First Occurrence in a String
 * Given strings haystack and needle, return the index of the first occurrence
 * of needle in haystack, or -1 if not found.
 *
 * Naive approach: O(n * m) — for each position in text, compare all of pattern.
 * KMP insight: When a mismatch occurs, the pattern's prefix table tells us
 * the longest proper prefix that is also a suffix — skip re-comparing those chars.
 *
 * The failure function (LPS array):
 *   lps[i] = length of the longest proper prefix of pattern[0..i]
 *            that is also a suffix of pattern[0..i]
 *
 * Time Complexity:  O(n + m) where n = text length, m = pattern length
 * Space Complexity: O(m) for the LPS array
 */

function buildLPS(pattern) {
  const m = pattern.length;
  const lps = new Array(m).fill(0);
  let len = 0; // Length of previous longest prefix-suffix
  let i = 1;

  while (i < m) {
    if (pattern[i] === pattern[len]) {
      len++;
      lps[i] = len;
      i++;
    } else {
      if (len !== 0) {
        // Don't increment i — try shorter prefix
        len = lps[len - 1];
      } else {
        lps[i] = 0;
        i++;
      }
    }
  }
  return lps;
}

function kmpSearch(text, pattern) {
  const n = text.length, m = pattern.length;
  if (m === 0) return 0;
  if (m > n) return -1;

  const lps = buildLPS(pattern);
  const results = [];
  let i = 0; // index in text
  let j = 0; // index in pattern

  while (i < n) {
    if (text[i] === pattern[j]) {
      i++;
      j++;
    }

    if (j === m) {
      // Full match found at index (i - j)
      results.push(i - j);
      j = lps[j - 1]; // Continue searching for more matches
    } else if (i < n && text[i] !== pattern[j]) {
      if (j !== 0) {
        j = lps[j - 1]; // Skip chars we know match
      } else {
        i++;
      }
    }
  }

  return results;
}

// First occurrence only (LeetCode 28)
function strStr(haystack, needle) {
  const matches = kmpSearch(haystack, needle);
  return matches.length > 0 ? matches[0] : -1;
}

// --- Tests ---
console.assert(strStr("sadbutsad", "sad") === 0, "Found at start");
console.assert(strStr("leetcode", "leeto") === -1, "Not found");
console.assert(strStr("hello", "ll") === 2, "Middle match");
console.assert(strStr("aaa", "a") === 0, "Single char");
console.assert(strStr("", "") === 0, "Both empty");

// All occurrences
const allMatches = kmpSearch("ababababab", "abab");
console.assert(allMatches.length === 4, "Overlapping matches: 4");
console.assert(JSON.stringify(allMatches) === "[0,2,4,6]", "Positions: 0,2,4,6");

// LPS array verification
const lps1 = buildLPS("AABAACAABAA");
console.assert(JSON.stringify(lps1) === "[0,1,0,1,2,0,1,2,3,4,5]");

const lps2 = buildLPS("abcabc");
console.assert(JSON.stringify(lps2) === "[0,0,0,1,2,3]");

console.log("All KMP tests passed!");

/**
 * Why KMP over naive:
 * - Naive: When mismatch at text[i+j] vs pattern[j], restart from text[i+1], pattern[0]
 * - KMP: Never go backwards in text. On mismatch, use LPS to know where in
 *   pattern to continue (we already know some prefix matches).
 *
 * Related algorithms:
 * - Rabin-Karp: O(n+m) average with rolling hash, O(nm) worst
 * - Z-Algorithm: Similar to KMP but builds Z-array instead of LPS
 * - Aho-Corasick: Multi-pattern KMP using a trie + failure links
 */
