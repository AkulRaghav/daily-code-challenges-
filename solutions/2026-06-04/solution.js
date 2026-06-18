/**
 * Day 9: Merge Two Sorted Lists (Iterative)
 *
 * Merge two sorted linked lists into one sorted list.
 * O(n + m) time, O(1) space.
 */
function ListNode(val, next) {
  this.val = val === undefined ? 0 : val;
  this.next = next === undefined ? null : next;
}

function mergeTwoLists(list1, list2) {
  const dummy = new ListNode(-1);
  let current = dummy;

  while (list1 !== null && list2 !== null) {
    if (list1.val <= list2.val) {
      current.next = list1;
      list1 = list1.next;
    } else {
      current.next = list2;
      list2 = list2.next;
    }
    current = current.next;
  }

  // Attach remaining nodes
  current.next = list1 !== null ? list1 : list2;
  return dummy.next;
}

// Helper to create list from array
function toList(arr) {
  const dummy = new ListNode(0);
  let cur = dummy;
  for (const v of arr) { cur.next = new ListNode(v); cur = cur.next; }
  return dummy.next;
}
function toArray(node) {
  const res = [];
  while (node) { res.push(node.val); node = node.next; }
  return res;
}

console.log(toArray(mergeTwoLists(toList([1,2,4]), toList([1,3,4])))); // [1,1,2,3,4,4]
console.log(toArray(mergeTwoLists(toList([]), toList([0]))));           // [0]
console.log(toArray(mergeTwoLists(toList([]), toList([]))));            // []
