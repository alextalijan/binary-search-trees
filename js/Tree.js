import Node from './Node.js';

class Tree {
  constructor(array) {
    this.root = this.buildTree(array);
  }

  buildTree(array) {}

  sortArray(array) {
    array.sort((a, b) => a - b);
    const noDuplicateArray = new Set(array);

    return noDuplicateArray;
  }
}

export default Tree;
