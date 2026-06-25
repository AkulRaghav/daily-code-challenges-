/**
 * Day 20: Dijkstra's Shortest Path Algorithm
 *
 * Greedy algorithm for shortest paths in weighted graphs.
 * Uses a min-heap (priority queue simulation).
 * O((V + E) log V) time, O(V) space.
 */
function dijkstra(graph, src) {
  const dist = {};
  const prev = {};
  const visited = new Set();

  // Initialize distances to Infinity
  for (const node in graph) {
    dist[node] = Infinity;
    prev[node] = null;
  }
  dist[src] = 0;

  // Min-heap simulation (for small graphs; use a proper heap for production)
  while (true) {
    // Pick unvisited node with minimum distance
    let u = null;
    for (const node in dist) {
      if (!visited.has(node) && (u === null || dist[node] < dist[u])) {
        u = node;
      }
    }
    if (u === null || dist[u] === Infinity) break;
    visited.add(u);

    for (const [neighbor, weight] of (graph[u] || [])) {
      const alt = dist[u] + weight;
      if (alt < dist[neighbor]) {
        dist[neighbor] = alt;
        prev[neighbor] = u;
      }
    }
  }

  return { dist, prev };
}

function getPath(prev, dest) {
  const path = [];
  let current = dest;
  while (current !== null) {
    path.unshift(current);
    current = prev[current];
  }
  return path;
}

// Test
const graph = {
  A: [['B', 4], ['C', 2]],
  B: [['D', 3], ['C', 1]],
  C: [['B', 1], ['D', 5]],
  D: []
};

const { dist, prev } = dijkstra(graph, 'A');
console.log(dist); // { A: 0, B: 3, C: 2, D: 6 }
console.log(getPath(prev, 'D')); // ['A', 'C', 'B', 'D']
