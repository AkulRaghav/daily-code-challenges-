/**
 * Day 12: Valid Palindrome
 *
 * Check if a string is a palindrome considering only alphanumeric characters
 * and ignoring case.
 * O(n) time, O(1) space using two pointers.
 */
function isPalindrome(s) {
  let left = 0;
  let right = s.length - 1;

  while (left < right) {
    // Skip non-alphanumeric from left
    while (left < right && !isAlphaNum(s[left])) left++;
    // Skip non-alphanumeric from right
    while (left < right && !isAlphaNum(s[right])) right--;

    if (s[left].toLowerCase() !== s[right].toLowerCase()) {
      return false;
    }
    left++;
    right--;
  }
  return true;
}

function isAlphaNum(c) {
  const code = c.charCodeAt(0);
  return (code >= 48 && code <= 57) ||  // 0-9
         (code >= 65 && code <= 90) ||  // A-Z
         (code >= 97 && code <= 122);   // a-z
}

// Tests
console.log(isPalindrome('A man, a plan, a canal: Panama')); // true
console.log(isPalindrome('race a car'));                       // false
console.log(isPalindrome(' '));                                // true
console.log(isPalindrome('ab_a'));                             // true
console.log(isPalindrome('0P'));                               // false

/**
 * Two pointers converge from both ends, skipping non-alphanumeric.
 * No extra string allocation needed — O(1) space.
 */
