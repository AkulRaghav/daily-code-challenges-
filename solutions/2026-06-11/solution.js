/**
 * Day 16: Implement HashMap from Scratch
 *
 * Build a hash map using array + chaining (linked list buckets).
 * Supports: put, get, remove, resize.
 * O(1) average time for all operations.
 */
class MyHashMap {
  constructor(capacity = 16, loadFactor = 0.75) {
    this.capacity = capacity;
    this.loadFactor = loadFactor;
    this.size = 0;
    this.buckets = new Array(capacity).fill(null);
  }

  _hash(key) {
    // Simple hash: works for string and number keys
    const str = String(key);
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = (hash * 31 + str.charCodeAt(i)) | 0; // |0 keeps it 32-bit int
    }
    return Math.abs(hash) % this.capacity;
  }

  put(key, value) {
    const idx = this._hash(key);
    let node = this.buckets[idx];

    // Check if key already exists in chain
    while (node !== null) {
      if (node.key === key) {
        node.value = value; // Update
        return;
      }
      node = node.next;
    }

    // Insert at head of bucket
    const newNode = { key, value, next: this.buckets[idx] };
    this.buckets[idx] = newNode;
    this.size++;

    // Resize if load factor exceeded
    if (this.size / this.capacity > this.loadFactor) {
      this._resize();
    }
  }

  get(key) {
    const idx = this._hash(key);
    let node = this.buckets[idx];
    while (node !== null) {
      if (node.key === key) return node.value;
      node = node.next;
    }
    return undefined; // Not found
  }

  remove(key) {
    const idx = this._hash(key);
    let node = this.buckets[idx];
    let prev = null;

    while (node !== null) {
      if (node.key === key) {
        if (prev === null) this.buckets[idx] = node.next;
        else prev.next = node.next;
        this.size--;
        return true;
      }
      prev = node;
      node = node.next;
    }
    return false;
  }

  _resize() {
    const oldBuckets = this.buckets;
    this.capacity *= 2;
    this.buckets = new Array(this.capacity).fill(null);
    this.size = 0;

    for (const bucket of oldBuckets) {
      let node = bucket;
      while (node !== null) {
        this.put(node.key, node.value);
        node = node.next;
      }
    }
  }
}

// Tests
const map = new MyHashMap();
map.put('name', 'Akul');
map.put('age', 21);
map.put('lang', 'JavaScript');
console.log(map.get('name'));   // 'Akul'
console.log(map.get('age'));    // 21
map.put('age', 22);            // Update
console.log(map.get('age'));    // 22
map.remove('lang');
console.log(map.get('lang'));   // undefined
console.log(map.size);          // 2

// Stress test: trigger resize
for (let i = 0; i < 100; i++) map.put(key_+i, i);
console.log(map.size);          // 102
console.log(map.get('key_50')); // 50

/**
 * Implementation details:
 * - Hash function: polynomial rolling hash (base 31)
 * - Collision resolution: separate chaining (linked list per bucket)
 * - Dynamic resizing: doubles capacity when load factor > 0.75
 * - Time: O(1) average, O(n) worst case (all keys collide)
 * - Space: O(n)
 */
