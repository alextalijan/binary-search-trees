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

  deleteItem(value) {
    let current = this.root;
    let parent = null;

    while (current !== null) {
      if (current.data === value) {
        break;
      }

      parent = current;
      if (current.data > value) {
        current = current.left;
      } else {
        current = current.right;
      }
    }

    if (current === null) {
      return null;
    }

    // Based on the number of children, perform a different deletion technique
    if (current.left && current.right) {
      const nextBiggestNode = this.removeNextBiggestNode(current);
      current.data = nextBiggestNode.data;
    } else {
      this.removeNode(current, parent);
    }
  }

  removeNextBiggestNode(node) {
    if (node.right === null) {
      return node;
    }

    let parent = node;
    node = node.right;
    while (node.left !== null) {
      parent = node;
      node = node.left;
    }

    this.removeNode(node, parent);
    return node;
  }

  removeNode(node, parentNode) {
    const replacementChildNode = node.left || node.right;
    if (parentNode.left === node) {
      parentNode.left = replacementChildNode;
    } else {
      parentNode.right = replacementChildNode;
    }
  }

  find(value) {
    let current = this.root;
    while (current !== null) {
      if (current.data === value) {
        return current;
      } else {
        if (current.data > value) {
          current = current.left;
        } else {
          current = current.right;
        }
      }
    }

    return null;
  }

  levelOrderForEach(callback) {
    if (!callback) {
      throw new Error('Please provide a callback function.');
    }

    const queue = [this.root];
    while (queue.length > 0) {
      const current = queue.shift();
      if (current.left) {
        queue.push(current.left);
      }
      if (current.right) {
        queue.push(current.right);
      }

      callback(current);
    }
  }

  preOrderForEach(callback) {
    if (!callback) {
      throw new Error('Please provide a callback function.');
    }

    const stack = [this.root];
    while (stack.length > 0) {
      const current = stack.pop();
      if (current.right) {
        stack.push(current.right);
      }
      if (current.left) {
        stack.push(current.left);
      }

      callback(current);
    }
  }

  inOrderForEach(callback) {
    if (!callback) {
      throw new Error('Please provide a callback function.');
    }

    const stack = [this.root.right, this.root, this.root.left];
    while (stack.length > 0) {
      const current = stack.pop();
      if (current !== this.root) {
        if (current.right) {
          stack.push(current.right);
        }

        if (current.left) {
          stack.push(current.left);
        }
      }

      callback(current);
    }
  }

  postOrderForEach(callback) {
    if (!callback) {
      throw new Error('Please provide a callback function.');
    }

    const stack = [this.root, this.root.right, this.root.left];
    while (stack.length > 0) {
      const current = stack.pop();
      if (current !== this.root) {
        if (current.right) {
          stack.push(current.right);
        }

        if (current.left) {
          stack.push(current.left);
        }
      }

      callback(current);
    }
  }
}

function printData(node) {
  console.log(node.data);
}

const arr = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];
const tree = new Tree(arr);

console.log(prettyPrint(tree.root));

console.log(tree.postOrderForEach(printData));

export default Tree;
