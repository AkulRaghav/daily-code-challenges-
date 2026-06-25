/**
 * Day 23: Union-Find (Disjoint Set Union)
 *
 * Efficient structure for tracking connected components.
 * With path compression + union by rank:
 * find: O(α(n)) ≈ O(1) amortized
 * union: O(α(n)) ≈ O(1) amortized
 */
class UnionFind {
  constructor(n) {
    this.parent = Array.from({ length: n }, (_, i) => i);
    this.rank = new Array(n).fill(0);
    this.components = n;
  }

  find(x) {
    if (this.parent[x] !== x) {
      this.parent[x] = this.find(this.parent[x]); // Path compression
    }
    return this.parent[x];
  }

  union(x, y) {
    const rootX = this.find(x);
    const rootY = this.find(y);
    if (rootX === rootY) return false; // Already connected

    // Union by rank
    if (this.rank[rootX] < this.rank[rootY]) {
      this.parent[rootX] = rootY;
    } else if (this.rank[rootX] > this.rank[rootY]) {
      this.parent[rootY] = rootX;
    } else {
      this.parent[rootY] = rootX;
      this.rank[rootX]++;
    }
    this.components--;
    return true;
  }

  connected(x, y) {
    return this.find(x) === this.find(y);
  }
}

// Test: Number of Connected Components
const uf = new UnionFind(7);
uf.union(0, 1);
uf.union(1, 2);
uf.union(3, 4);
uf.union(5, 6);

console.log(uf.components);      // 3 (groups: {0,1,2}, {3,4}, {5,6})
console.log(uf.connected(0, 2)); // true
console.log(uf.connected(0, 3)); // false

uf.union(2, 3); // Connect the first two groups
console.log(uf.components);      // 2
console.log(uf.connected(0, 4)); // true

// Use case: detect cycle in undirected graph
function hasCycle(n, edges) {
  const uf = new UnionFind(n);
  for (const [u, v] of edges) {
    if (!uf.union(u, v)) return true; // Already connected = cycle
  }
  return false;
}
console.log(hasCycle(4, [[0,1],[1,2],[2,3]]));       // false (tree)
console.log(hasCycle(4, [[0,1],[1,2],[2,3],[3,0]])); // true (cycle)

/**
 * Inverse Ackermann α(n) grows so slowly it's effectively constant.
 * Used in: Kruskal's MST, network connectivity, image segmentation,
 *          compiler register allocation, percolation theory.
 */
