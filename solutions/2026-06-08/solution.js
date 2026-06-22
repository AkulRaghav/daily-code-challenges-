/**
 * Day 13: Invert Binary Tree
 *
 * Swap left and right children at every node recursively.
 * O(n) time, O(h) space (h = height, recursion stack).
 */
function TreeNode(val, left, right) {
  this.val = val === undefined ? 0 : val;
  this.left = left === undefined ? null : left;
  this.right = right === undefined ? null : right;
}

function invertTree(root) {
  if (root === null) return null;

  // Swap children
  const temp = root.left;
  root.left = root.right;
  root.right = temp;

  // Recurse
  invertTree(root.left);
  invertTree(root.right);

  return root;
}

// Helper: build tree from array (level-order)
function buildTree(arr) {
  if (!arr.length || arr[0] === null) return null;
  const root = new TreeNode(arr[0]);
  const queue = [root];
  let i = 1;
  while (i < arr.length) {
    const node = queue.shift();
    if (i < arr.length && arr[i] !== null) {
      node.left = new TreeNode(arr[i]);
      queue.push(node.left);
    }
    i++;
    if (i < arr.length && arr[i] !== null) {
      node.right = new TreeNode(arr[i]);
      queue.push(node.right);
    }
    i++;
  }
  return root;
}

// Helper: tree to array (level-order)
function toArray(root) {
  if (!root) return [];
  const result = [];
  const queue = [root];
  while (queue.length) {
    const node = queue.shift();
    result.push(node ? node.val : null);
    if (node) { queue.push(node.left); queue.push(node.right); }
  }
  while (result[result.length - 1] === null) result.pop();
  return result;
}

const tree = buildTree([4,2,7,1,3,6,9]);
console.log(toArray(invertTree(tree))); // [4,7,2,9,6,3,1]

/**
 * The famous "Homebrew incident" problem.
 * Simple recursion: visit every node once, swap children.
 */
