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

  inOrderForEach(root, callback) {
    if (!callback) {
      throw new Error('Please provide a callback function.');
    }

    if (root.left) {
      this.inOrderForEach(root.left, callback);
    }

    callback(root);

    if (root.right) {
      this.inOrderForEach(root.right, callback);
    }
  }

  postOrderForEach(root, callback) {
    if (!callback) {
      throw new Error('Please provide a callback function.');
    }

    if (root.left) {
      this.postOrderForEach(root.left, callback);
    }

    if (root.right) {
      this.postOrderForEach(root.right, callback);
    }

    callback(root);
  }

  height(value) {
    const node = this.find(value);
    if (!node) {
      return null;
    }

    const queue = [{ node, height: 0 }];
    const heights = [];
    while (queue.length > 0) {
      const current = queue.shift();
      if (current.node.left) {
        queue.push({ node: current.node.left, height: current.height + 1 });
      }
      if (current.node.right) {
        queue.push({ node: current.node.right, height: current.height + 1 });
      }

      heights.push(current.height);
    }

    // Sort all of the heights in reverse order, and return the first member
    heights.sort((a, b) => b - a);
    return heights[0];
  }

  depth(value) {
    const queue = [{ node: this.root, depth: 0 }];
    while (queue.length > 0) {
      const current = queue.shift();
      if (current.node.data === value) return current.depth;

      if (current.node.left) {
        queue.push({ node: current.node.left, depth: current.depth + 1 });
      }
      if (current.node.right) {
        queue.push({ node: current.node.right, depth: current.depth + 1 });
      }
    }

    return null;
  }

  isBalanced() {
    const queue = [this.root];
    while (queue.length > 0) {
      const current = queue.shift();
      let leftHeight = 0;
      let rightHeight = 0;
      if (current.left) {
        queue.push(current.left);
        leftHeight = this.height(current.left.data);
      }
      if (current.right) {
        queue.push(current.right);
        rightHeight = this.height(current.right.data);
      }

      if (Math.abs(leftHeight - rightHeight) > 1) {
        return false;
      }
    }

    return true;
  }

  rebalance() {
    const treeValues = [];
    const queue = [this.root];
    while (queue.length > 0) {
      const current = queue.shift();
      if (current.left) {
        queue.push(current.left);
      }
      if (current.right) {
        queue.push(current.right);
      }

      treeValues.push(current.data);
    }

    this.root = this.buildTree(treeValues);
  }
}

function printData(node) {
  console.log(node.data);
}

function generateRandomArray(size) {
  const array = [];
  for (let i = 0; i < size; i += 1) {
    const randomNumber = Math.floor(Math.random() * 1000) + 1;
    array.push(randomNumber);
  }

  return array;
}

const randomArray = generateRandomArray(50);
const tree = new Tree(randomArray);

console.log(`Is the tree balanced: ${tree.isBalanced()}`); // true
console.log(prettyPrint(tree.root));

console.log('Level order:');
console.log(tree.levelOrderForEach(printData));

console.log('Pre order:');
console.log(tree.preOrderForEach(printData));

console.log('In order:');
console.log(tree.inOrderForEach(tree.root, printData));

console.log('Post order:');
console.log(tree.postOrderForEach(tree.root, printData));

const newNumbers = generateRandomArray(150);
for (const num of newNumbers) {
  tree.insert(num);
}

console.log(`Is the tree balanced: ${tree.isBalanced()}`); // false
tree.rebalance();

console.log(`Is the tree balanced: ${tree.isBalanced()}`); // true

console.log('Level order:');
console.log(tree.levelOrderForEach(printData));

console.log('Pre order:');
console.log(tree.preOrderForEach(printData));

console.log('In order:');
console.log(tree.inOrderForEach(tree.root, printData));

console.log('Post order:');
console.log(tree.postOrderForEach(tree.root, printData));

export default Tree;
