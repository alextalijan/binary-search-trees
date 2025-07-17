import Node from './Node.js';
import prettyPrint from './prettyPrint.js';

class Tree {
  constructor(array) {
    this.root = this.buildTree(array);
  }

  buildTree(array) {
    const sortedArray = this.sortArray(array);

    return this.sortedArrayToBST(sortedArray, 0, sortedArray.length - 1);
  }

  sortArray(array) {
    array.sort((a, b) => a - b);
    const noDuplicatesArray = Array.from(new Set(array));

    return noDuplicatesArray;
  }

  sortedArrayToBST(array, startIndex, endIndex) {
    if (startIndex > endIndex) return null;

    const midIndex = startIndex + Math.floor((endIndex - startIndex) / 2);

    const rootNode = new Node(array[midIndex]);
    rootNode.left = this.sortedArrayToBST(array, startIndex, midIndex - 1);
    rootNode.right = this.sortedArrayToBST(array, midIndex + 1, endIndex);

    return rootNode;
  }
}

export default Tree;
