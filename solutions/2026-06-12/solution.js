/**
 * Day 17: Implement Trie (Prefix Tree)
 *
 * Efficient string storage and prefix-based retrieval.
 * insert, search, startsWith — all O(m) where m = word length.
 */
class TrieNode {
  constructor() {
    this.children = {};  // char -> TrieNode
    this.isEnd = false;  // marks end of a complete word
  }
}

class Trie {
  constructor() {
    this.root = new TrieNode();
  }

  /** Insert a word into the trie. O(m) */
  insert(word) {
    let node = this.root;
    for (const char of word) {
      if (!node.children[char]) {
        node.children[char] = new TrieNode();
      }
      node = node.children[char];
    }
    node.isEnd = true;
  }

  /** Returns true if the word is in the trie. O(m) */
  search(word) {
    const node = this._traverse(word);
    return node !== null && node.isEnd;
  }

  /** Returns true if any word starts with the given prefix. O(m) */
  startsWith(prefix) {
    return this._traverse(prefix) !== null;
  }

  /** Returns all words with the given prefix (autocomplete). O(n) */
  autocomplete(prefix, limit = 10) {
    const node = this._traverse(prefix);
    if (!node) return [];

    const results = [];
    this._dfs(node, prefix, results, limit);
    return results;
  }

  /** Delete a word from the trie. O(m) */
  delete(word) {
    this._deleteHelper(this.root, word, 0);
  }

  _traverse(str) {
    let node = this.root;
    for (const char of str) {
      if (!node.children[char]) return null;
      node = node.children[char];
    }
    return node;
  }

  _dfs(node, prefix, results, limit) {
    if (results.length >= limit) return;
    if (node.isEnd) results.push(prefix);
    for (const [char, child] of Object.entries(node.children)) {
      this._dfs(child, prefix + char, results, limit);
    }
  }

  _deleteHelper(node, word, depth) {
    if (!node) return false;
    if (depth === word.length) {
      if (!node.isEnd) return false;
      node.isEnd = false;
      return Object.keys(node.children).length === 0;
    }
    const char = word[depth];
    const shouldDelete = this._deleteHelper(node.children[char], word, depth + 1);
    if (shouldDelete) {
      delete node.children[char];
      return !node.isEnd && Object.keys(node.children).length === 0;
    }
    return false;
  }
}

// Tests
const trie = new Trie();
trie.insert('apple');
trie.insert('app');
trie.insert('application');
trie.insert('apply');
trie.insert('ape');
trie.insert('banana');

console.log(trie.search('apple'));       // true
console.log(trie.search('app'));         // true
console.log(trie.search('ap'));          // false (not a complete word)
console.log(trie.startsWith('app'));     // true
console.log(trie.startsWith('ban'));     // true
console.log(trie.startsWith('cat'));     // false
console.log(trie.autocomplete('app'));   // ['app', 'apple', 'application', 'apply']
console.log(trie.autocomplete('ap'));    // ['ape', 'app', 'apple', 'application', 'apply']

trie.delete('apple');
console.log(trie.search('apple'));       // false
console.log(trie.search('app'));         // true (still exists)

/**
 * Use cases: autocomplete, spell check, IP routing, word games.
 * Space: O(alphabet_size * key_length * n) worst case.
 * Better than HashMap for prefix queries.
 */
