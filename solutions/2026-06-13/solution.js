/**
 * Day 18: Implement LRU Cache
 *
 * Least Recently Used cache with O(1) get and put.
 * Uses a doubly-linked list + hash map.
 * LeetCode #146 (Medium/Hard).
 */
class LRUNode {
  constructor(key, value) {
    this.key = key;
    this.value = value;
    this.prev = null;
    this.next = null;
  }
}

class LRUCache {
  constructor(capacity) {
    this.capacity = capacity;
    this.size = 0;
    this.map = new Map(); // key -> LRUNode

    // Sentinel nodes (avoid null checks)
    this.head = new LRUNode(0, 0); // Most recently used
    this.tail = new LRUNode(0, 0); // Least recently used
    this.head.next = this.tail;
    this.tail.prev = this.head;
  }

  /** Get value by key. Returns -1 if not found. O(1) */
  get(key) {
    const node = this.map.get(key);
    if (!node) return -1;

    // Move to front (most recently used)
    this._remove(node);
    this._addToFront(node);
    return node.value;
  }

  /** Put key-value pair. Evicts LRU if at capacity. O(1) */
  put(key, value) {
    const existing = this.map.get(key);

    if (existing) {
      // Update value and move to front
      existing.value = value;
      this._remove(existing);
      this._addToFront(existing);
    } else {
      // Create new node
      const node = new LRUNode(key, value);

      // Evict if at capacity
      if (this.size >= this.capacity) {
        const lru = this.tail.prev;
        this._remove(lru);
        this.map.delete(lru.key);
        this.size--;
      }

      this._addToFront(node);
      this.map.set(key, node);
      this.size++;
    }
  }

  /** Remove node from doubly-linked list */
  _remove(node) {
    node.prev.next = node.next;
    node.next.prev = node.prev;
  }

  /** Add node right after head (most recent position) */
  _addToFront(node) {
    node.next = this.head.next;
    node.prev = this.head;
    this.head.next.prev = node;
    this.head.next = node;
  }

  /** Debug: show order from MRU to LRU */
  _order() {
    const result = [];
    let node = this.head.next;
    while (node !== this.tail) {
      result.push(\:\);
      node = node.next;
    }
    return result;
  }
}

// Tests
const cache = new LRUCache(3);
cache.put(1, 'one');
cache.put(2, 'two');
cache.put(3, 'three');
console.log(cache._order());     // ['3:three', '2:two', '1:one']

cache.get(1);                    // Access 1 -> moves to front
console.log(cache._order());     // ['1:one', '3:three', '2:two']

cache.put(4, 'four');            // Evicts LRU (key 2)
console.log(cache._order());     // ['4:four', '1:one', '3:three']
console.log(cache.get(2));       // -1 (evicted)
console.log(cache.get(3));       // 'three'

cache.put(1, 'ONE');             // Update existing
console.log(cache._order());     // ['1:ONE', '3:three', '4:four']

/**
 * Why O(1) for both get and put:
 * - HashMap gives O(1) key lookup -> node reference
 * - Doubly-linked list gives O(1) remove/insert (with node reference)
 * - Sentinel nodes eliminate edge-case null checks
 *
 * Real-world uses: browser cache, database buffer pool, CDN, OS page cache.
 */
