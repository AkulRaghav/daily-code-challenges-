/**
 * Day 19: Shortest Path in Unweighted Graph (BFS)
 *
 * BFS guarantees shortest path in unweighted graphs.
 * O(V + E) time, O(V) space.
 */
function shortestPath(graph, src, dest) {
  if (src === dest) return [src];

  const visited = new Set([src]);
  const queue = [[src, [src]]]; // [node, path]

  while (queue.length > 0) {
    const [node, path] = queue.shift();

    for (const neighbor of (graph[node] || [])) {
      if (neighbor === dest) return [...path, neighbor];
      if (!visited.has(neighbor)) {
        visited.add(neighbor);
        queue.push([neighbor, [...path, neighbor]]);
      }
    }
  }
  return null; // No path exists
}

// Tests
const graph = {
  A: ['B', 'C'],
  B: ['A', 'D', 'E'],
  C: ['A', 'F'],
  D: ['B'],
  E: ['B', 'F'],
  F: ['C', 'E']
};

console.log(shortestPath(graph, 'A', 'F')); // ['A', 'C', 'F']
console.log(shortestPath(graph, 'A', 'D')); // ['A', 'B', 'D']
console.log(shortestPath(graph, 'D', 'F')); // ['D', 'B', 'E', 'F'] or ['D', 'B', 'A', 'C', 'F']

/**
 * Why BFS for shortest path:
 * - BFS explores level by level → first time we reach destination = shortest path
 * - DFS would find A path, not necessarily the SHORTEST path
 * - For weighted graphs, use Dijkstra's algorithm instead
 *
 * Time: O(V + E), Space: O(V) for visited set + queue
 */
