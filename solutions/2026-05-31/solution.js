/**
 * Day 5: Group Anagrams
 *
 * Approach: Sorted Key Hash Map (O(n * k log k) time, O(n * k) space)
 *
 * Two strings are anagrams if their sorted forms are identical.
 * Use the sorted string as a hash map key to group them.
 */

function groupAnagrams(strs) {
  const map = new Map();

  for (const str of strs) {
    // Sort the characters to create a canonical key
    const key = str.split('').sort().join('');

    if (!map.has(key)) {
      map.set(key, []);
    }
    map.get(key).push(str);
  }

  return Array.from(map.values());
}

// Alternative: Character frequency key (O(n * k) time — avoids sorting)
function groupAnagramsOptimal(strs) {
  const map = new Map();

  for (const str of strs) {
    // Count frequency of each character (26 lowercase letters)
    const count = new Array(26).fill(0);
    for (const char of str) {
      count[char.charCodeAt(0) - 97]++;
    }
    // Use the frequency array as a string key
    const key = count.join('#');

    if (!map.has(key)) {
      map.set(key, []);
    }
    map.get(key).push(str);
  }

  return Array.from(map.values());
}

// Tests
console.log(groupAnagrams(["eat","tea","tan","ate","nat","bat"]));
// [["eat","tea","ate"],["tan","nat"],["bat"]]

console.log(groupAnagrams([""]));  // [[""]]
console.log(groupAnagrams(["a"])); // [["a"]]

console.log(groupAnagramsOptimal(["eat","tea","tan","ate","nat","bat"]));

/**
 * Complexity Analysis:
 *
 * Sorted key approach:
 * - Time: O(n * k log k) where n = number of strings, k = max string length
 * - Space: O(n * k) for the hash map storage
 *
 * Frequency key approach (optimal):
 * - Time: O(n * k) — counting is linear per string
 * - Space: O(n * k) for the hash map storage
 *
 * Key Insight:
 * The problem reduces to "find a canonical representation for anagram groups."
 * Two valid canonicalizations:
 *   1. Sorted characters: "eat" -> "aet", "tea" -> "aet" (same!)
 *   2. Character frequency: "eat" -> "1#0#0#0#1#...#1" (a=1, e=1, t=1)
 *
 * The frequency approach avoids the O(k log k) sort per string,
 * making it theoretically faster for long strings.
 */
