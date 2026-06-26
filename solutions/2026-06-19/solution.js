/**
 * Day 24: Topological Sort (Kahn's Algorithm - BFS)
 *
 * Linear ordering of vertices such that for every edge u→v, u comes before v.
 * Only works on DAGs (Directed Acyclic Graphs).
 * O(V + E) time, O(V) space.
 */
function topologicalSort(numNodes, edges) {
  const inDegree = new Array(numNodes).fill(0);
  const adj = Array.from({ length: numNodes }, () => []);

  for (const [u, v] of edges) {
    adj[u].push(v);
    inDegree[v]++;
  }

  const queue = [];
  for (let i = 0; i < numNodes; i++) {
    if (inDegree[i] === 0) queue.push(i);
  }

  const order = [];
  while (queue.length > 0) {
    const node = queue.shift();
    order.push(node);
    for (const neighbor of adj[node]) {
      inDegree[neighbor]--;
      if (inDegree[neighbor] === 0) queue.push(neighbor);
    }
  }

  return order.length === numNodes ? order : null; // null = cycle detected
}

console.log(topologicalSort(6, [[5,2],[5,0],[4,0],[4,1],[2,3],[3,1]]));
// One valid order: [4, 5, 2, 0, 3, 1]

console.log(topologicalSort(3, [[0,1],[1,2],[2,0]]));
// null (cycle exists)

/**
 * Use cases: build systems (Makefile), task scheduling, course prerequisites,
 * package dependency resolution (npm, cargo), compiler instruction ordering.
 */
