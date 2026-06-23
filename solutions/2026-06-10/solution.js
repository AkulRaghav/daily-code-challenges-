/**
 * Day 15: Linked List Cycle Detection (Floyd's Tortoise and Hare)
 * O(n) time, O(1) space.
 */
function hasCycle(head) {
  let slow = head, fast = head;
  while (fast !== null && fast.next !== null) {
    slow = slow.next;
    fast = fast.next.next;
    if (slow === fast) return true;
  }
  return false;
}
// If fast catches slow, there's a cycle. Classic two-pointer technique.
