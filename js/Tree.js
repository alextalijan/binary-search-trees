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

  insert(value) {
    let current = this.root;
    let parent;

    // Traverse the tree to the proper leaf parent of the new value
    while (current !== null) {
      parent = current;
      if (current.data > value) {
        current = current.left;
      } else if (current.data < value) {
        current = current.right;
      } else {
        return this.root;
      }
    }

    if (parent.data > value) {
      parent.left = new Node(value);
    } else {
      parent.right = new Node(value);
    }
  }
}

const arr = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];
const tree = new Tree(arr);

console.log(prettyPrint(tree.root));

tree.insert(4);
console.log(prettyPrint(tree.root));

export default Tree;
