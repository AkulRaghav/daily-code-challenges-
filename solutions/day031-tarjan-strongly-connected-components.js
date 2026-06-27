/**
 * Day 31: Tarjan's Algorithm — Strongly Connected Components (SCC)
 *
 * Problem: Find all strongly connected components in a directed graph.
 * A strongly connected component is a maximal set of vertices where
 * every vertex is reachable from every other vertex.
 *
 * Applications: dependency cycles, compiler optimization (dead code),
 * 2-SAT satisfiability, condensation graphs.
 *
 * Approach: Tarjan's single-pass DFS using a stack and low-link values.
 * - disc[u]: discovery time of node u
 * - low[u]: lowest disc reachable from subtree of u via back edges
 * - Node u is root of an SCC when low[u] === disc[u]
 *
 * Time Complexity:  O(V + E)
 * Space Complexity: O(V)
 */

function tarjanSCC(graph) {
  const n = graph.length;
  const disc = new Array(n).fill(-1);
  const low = new Array(n).fill(-1);
  const onStack = new Array(n).fill(false);
  const stack = [];
  const sccs = [];
  let timer = 0;

  function dfs(u) {
    disc[u] = low[u] = timer++;
    stack.push(u);
    onStack[u] = true;

    for (const v of graph[u]) {
      if (disc[v] === -1) {
        // Tree edge: recurse
        dfs(v);
        low[u] = Math.min(low[u], low[v]);
      } else if (onStack[v]) {
        // Back edge to ancestor still in current SCC path
        low[u] = Math.min(low[u], disc[v]);
      }
      // Cross edge to already-finished SCC: ignore
    }

    // If u is root of an SCC, pop all nodes in this SCC
    if (low[u] === disc[u]) {
      const component = [];
      let w;
      do {
        w = stack.pop();
        onStack[w] = false;
        component.push(w);
      } while (w !== u);
      sccs.push(component);
    }
  }

  // Handle disconnected graphs
  for (let i = 0; i < n; i++) {
    if (disc[i] === -1) dfs(i);
  }

  return sccs;
}

// --- Tests ---

// Simple cycle: 0 → 1 → 2 → 0, with 3 → 0 (3 is separate SCC)
const g1 = [[1], [2], [0], [0]];
const scc1 = tarjanSCC(g1);
console.assert(scc1.length === 2, "Two SCCs");
const sizes1 = scc1.map(c => c.length).sort();
console.assert(sizes1[0] === 1 && sizes1[1] === 3, "Sizes: {3} and {0,1,2}");

// DAG (no cycles): each node is its own SCC
const g2 = [[1], [2], [3], []];
const scc2 = tarjanSCC(g2);
console.assert(scc2.length === 4, "DAG: 4 SCCs (one per node)");

// Two cycles connected: 0→1→0 and 2→3→4→2, with 1→2
const g3 = [[1], [0, 2], [3], [4], [2]];
const scc3 = tarjanSCC(g3);
console.assert(scc3.length === 2, "Two disjoint cycles");
const sizes3 = scc3.map(c => c.length).sort();
console.assert(sizes3[0] === 2 && sizes3[1] === 3);

// Single node, self-loop
const g4 = [[0]];
console.assert(tarjanSCC(g4).length === 1);

// Fully connected (complete graph with 4 nodes)
const g5 = [[1,2,3], [0,2,3], [0,1,3], [0,1,2]];
console.assert(tarjanSCC(g5).length === 1, "All in one SCC");

console.log("All Tarjan SCC tests passed!");
