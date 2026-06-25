/**
 * Day 22: Min-Heap (Priority Queue) from Scratch
 *
 * Complete binary tree where parent <= children.
 * insert: O(log n), extractMin: O(log n), peek: O(1)
 */
class MinHeap {
  constructor() {
    this.heap = [];
  }

  size() { return this.heap.length; }
  peek() { return this.heap[0] ?? null; }
  isEmpty() { return this.heap.length === 0; }

  insert(val) {
    this.heap.push(val);
    this._bubbleUp(this.heap.length - 1);
  }

  extractMin() {
    if (this.isEmpty()) return null;
    const min = this.heap[0];
    const last = this.heap.pop();
    if (this.heap.length > 0) {
      this.heap[0] = last;
      this._sinkDown(0);
    }
    return min;
  }

  _bubbleUp(i) {
    while (i > 0) {
      const parent = Math.floor((i - 1) / 2);
      if (this.heap[parent] <= this.heap[i]) break;
      [this.heap[parent], this.heap[i]] = [this.heap[i], this.heap[parent]];
      i = parent;
    }
  }

  _sinkDown(i) {
    const n = this.heap.length;
    while (true) {
      let smallest = i;
      const left = 2 * i + 1;
      const right = 2 * i + 2;

      if (left < n && this.heap[left] < this.heap[smallest]) smallest = left;
      if (right < n && this.heap[right] < this.heap[smallest]) smallest = right;

      if (smallest === i) break;
      [this.heap[i], this.heap[smallest]] = [this.heap[smallest], this.heap[i]];
      i = smallest;
    }
  }
}

// Tests
const heap = new MinHeap();
heap.insert(5);
heap.insert(3);
heap.insert(8);
heap.insert(1);
heap.insert(4);

console.log(heap.peek());        // 1
console.log(heap.extractMin());  // 1
console.log(heap.extractMin());  // 3
console.log(heap.extractMin());  // 4
console.log(heap.size());        // 2

// Use case: find K smallest elements
function kSmallest(arr, k) {
  const h = new MinHeap();
  arr.forEach(x => h.insert(x));
  const result = [];
  for (let i = 0; i < k; i++) result.push(h.extractMin());
  return result;
}
console.log(kSmallest([7, 2, 9, 1, 5, 3], 3)); // [1, 2, 3]

/**
 * Heap property: parent <= children (min-heap)
 * Array representation: parent(i) = floor((i-1)/2), children = 2i+1, 2i+2
 * Used in: Dijkstra, Huffman coding, task scheduling, K-way merge
 */
