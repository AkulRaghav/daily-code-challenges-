/**
 * Day 32: A* Pathfinding — Optimal Grid Search with Heuristic
 *
 * Problem: Find the shortest path in a weighted grid from top-left to bottom-right.
 * Obstacles are marked as -1. Movement: 4-directional (up, down, left, right).
 *
 * A* = Dijkstra + heuristic guidance. Uses f(n) = g(n) + h(n):
 *   - g(n): actual cost from start to n
 *   - h(n): estimated cost from n to goal (Manhattan distance for grids)
 *   - f(n): priority in the open set
 *
 * A* is optimal when h(n) is admissible (never overestimates).
 *
 * Time Complexity:  O(V log V) where V = rows * cols (with binary heap)
 * Space Complexity: O(V)
 */

class MinHeap {
  constructor() { this.data = []; }
  push(item) {
    this.data.push(item);
    this._bubbleUp(this.data.length - 1);
  }
  pop() {
    const top = this.data[0];
    const last = this.data.pop();
    if (this.data.length > 0) { this.data[0] = last; this._sinkDown(0); }
    return top;
  }
  get size() { return this.data.length; }
  _bubbleUp(i) {
    while (i > 0) {
      const parent = (i - 1) >> 1;
      if (this.data[i][0] >= this.data[parent][0]) break;
      [this.data[i], this.data[parent]] = [this.data[parent], this.data[i]];
      i = parent;
    }
  }
  _sinkDown(i) {
    const n = this.data.length;
    while (true) {
      let smallest = i;
      const l = 2 * i + 1, r = 2 * i + 2;
      if (l < n && this.data[l][0] < this.data[smallest][0]) smallest = l;
      if (r < n && this.data[r][0] < this.data[smallest][0]) smallest = r;
      if (smallest === i) break;
      [this.data[i], this.data[smallest]] = [this.data[smallest], this.data[i]];
      i = smallest;
    }
  }
}

function aStarGrid(grid) {
  const rows = grid.length, cols = grid[0].length;
  if (grid[0][0] === -1 || grid[rows-1][cols-1] === -1) return -1;

  const goalR = rows - 1, goalC = cols - 1;
  const heuristic = (r, c) => Math.abs(r - goalR) + Math.abs(c - goalC);

  const gScore = Array.from({ length: rows }, () => new Array(cols).fill(Infinity));
  gScore[0][0] = grid[0][0] === -1 ? Infinity : (grid[0][0] || 1);

  const open = new MinHeap();
  open.push([gScore[0][0] + heuristic(0, 0), 0, 0]); // [f, row, col]

  const dirs = [[0,1],[0,-1],[1,0],[-1,0]];

  while (open.size > 0) {
    const [f, r, c] = open.pop();

    if (r === goalR && c === goalC) return gScore[r][c];

    // Skip stale entries
    if (f - heuristic(r, c) > gScore[r][c]) continue;

    for (const [dr, dc] of dirs) {
      const nr = r + dr, nc = c + dc;
      if (nr < 0 || nr >= rows || nc < 0 || nc >= cols) continue;
      if (grid[nr][nc] === -1) continue;

      const weight = grid[nr][nc] || 1;
      const tentativeG = gScore[r][c] + weight;

      if (tentativeG < gScore[nr][nc]) {
        gScore[nr][nc] = tentativeG;
        open.push([tentativeG + heuristic(nr, nc), nr, nc]);
      }
    }
  }

  return -1; // No path
}

// --- Tests ---
const grid1 = [
  [1, 1, 1],
  [1, -1, 1],
  [1, 1, 1]
];
console.assert(aStarGrid(grid1) === 5, "3x3 grid with obstacle");

const grid2 = [
  [1, 2, 3],
  [4, -1, 5],
  [1, 1, 1]
];
console.assert(aStarGrid(grid2) === 8, "Weighted grid: 1→2→3→5→1 or 1→4→1→1→1");

const grid3 = [
  [1, -1],
  [-1, 1]
];
console.assert(aStarGrid(grid3) === -1, "No path exists");

const grid4 = [[1]];
console.assert(aStarGrid(grid4) === 1, "Single cell");

console.log("All A* pathfinding tests passed!");
