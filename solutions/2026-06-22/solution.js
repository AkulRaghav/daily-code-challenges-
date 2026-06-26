/**
 * Day 27: Lowest Common Ancestor of Binary Tree
 *
 * Find the deepest node that is ancestor of both p and q.
 * Recursive DFS: O(n) time, O(h) space.
 * LeetCode #236 (Medium).
 */
function TreeNode(val) { this.val = val; this.left = this.right = null; }

function lowestCommonAncestor(root, p, q) {
  if (root === null || root === p || root === q) return root;

  const left = lowestCommonAncestor(root.left, p, q);
  const right = lowestCommonAncestor(root.right, p, q);

  if (left && right) return root;  // p and q in different subtrees
  return left || right;            // both in same subtree
}

// Build test tree:    3
//                   /   \
//                  5     1
//                 / \   / \
//                6   2 0   8
const root = new TreeNode(3);
root.left = new TreeNode(5);
root.right = new TreeNode(1);
root.left.left = new TreeNode(6);
root.left.right = new TreeNode(2);
root.right.left = new TreeNode(0);
root.right.right = new TreeNode(8);

console.log(lowestCommonAncestor(root, root.left, root.right).val); // 3
console.log(lowestCommonAncestor(root, root.left, root.left.right).val); // 5

/**
 * Key insight: if both left and right return non-null, current node is LCA.
 * If only one side returns non-null, the answer is in that subtree.
 * Base case: if we hit p or q, return it immediately.
 */
