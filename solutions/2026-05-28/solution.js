/**
 * Day 2: Valid Parentheses
 * 
 * Approach: Stack (O(n) time, O(n) space)
 * 
 * Use a stack to track opening brackets. For each closing bracket,
 * check if it matches the most recent opening bracket (top of stack).
 * If the stack is empty at the end, all brackets were matched.
 */

function isValid(s) {
  const stack = [];
  const pairs = {
    ')': '(',
    ']': '[',
    '}': '{',
  };

  for (const char of s) {
    if (char === '(' || char === '[' || char === '{') {
      // Opening bracket — push to stack
      stack.push(char);
    } else {
      // Closing bracket — check if it matches top of stack
      if (stack.length === 0 || stack[stack.length - 1] !== pairs[char]) {
        return false;
      }
      stack.pop();
    }
  }

  // Valid only if all opening brackets were matched
  return stack.length === 0;
}

// Tests
console.log(isValid("()"));       // true
console.log(isValid("()[]{}"));   // true
console.log(isValid("(]"));       // false
console.log(isValid("([)]"));     // false
console.log(isValid("{[]}"));     // true
console.log(isValid(""));         // true (edge case)
console.log(isValid("(("));       // false

/**
 * Complexity Analysis:
 * - Time: O(n) — single pass through the string
 * - Space: O(n) — stack stores at most n/2 opening brackets
 * 
 * Key Insight:
 * A stack naturally handles the "most recent must close first" rule.
 * LIFO order matches the nesting requirement of brackets.
 * 
 * Edge Cases:
 * - Empty string → true (no unmatched brackets)
 * - Only opening brackets → false (stack not empty)
 * - Only closing brackets → false (stack empty when trying to match)
 * - Single character → false
 */
