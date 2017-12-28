function Node(key, value) {
    this.key = key;
    this.value = value;

    this._left = null;
    this._right = null;
};

function BinarySearchTree() {
    this._root = null;
    this.values = [];
    this.keys = [];
};

BinarySearchTree.prototype.root = function() {
    return this._root ? this._root.value : this._root;
};

BinarySearchTree.prototype.insert = function(key, value) {
    if(this.search(key)) return this;

    const node = new Node(key, value);

    if(!this._root) this._root = node;
    
    else {
        let currentNode = this._root;

        while(currentNode) {

            if(currentNode.key < node.key) {
                if(!currentNode._right) {
                    currentNode._right = node;
                    break;
                }
                currentNode = currentNode._right;

            } else if(currentNode.key > node.key) {
                if(!currentNode._left) {
                    currentNode._left = node;
                    break;
                }
                currentNode = currentNode._left;

            } else break;

        };
    };

    return this;
}; 

BinarySearchTree.prototype.delete = function(key) {
    const self = this;

    const deleteNode = function(node, key) {
        if(!node) return null;

        if(key === node.key) {
            if(!node._left && !node._right) return null;

            if(!node._left) return node._right;

            if(!node._right) return node._left;

            let tmp = self.getMin(node._right);
            node.key = tmp.key;
            node.value = tmp.value;
            node._right = deleteNode(node._right, tmp.key);

            return node;

        } else if(key < node.key) {
            node._left = deleteNode(node._left, key);
            return node;

        } else {
            node._right = deleteNode(node._right, key);
            return node; 

        };
    };

    this._root = deleteNode(this._root, key);

    return this;
};

BinarySearchTree.prototype.getMin = function(node) {
    if(this._root) {
        if(node === undefined) node = this._root;

        while (node._left) {
          node = node._left;
        };

        return node;
    };
};

BinarySearchTree.prototype.search = function(key) {
    let currentNode = this._root;

    while(currentNode) {
        if(currentNode.key === key) return currentNode.value;

        else if(currentNode.key > key) currentNode = currentNode._left;

        else currentNode = currentNode._right;
    };
};

BinarySearchTree.prototype.contains = function(value) {
    if(!this._root) return false;

    const queue = []; 
    let currentNode = this._root;
    
    queue.push(currentNode);

    while(queue.length) {
        let tmp = queue.shift();

        if(tmp.value === value) return true;

        if(tmp._left) queue.push(tmp._left);
        if(tmp._right) queue.push(tmp._right);
    };

    return false;
};

BinarySearchTree.prototype.traverse = function(order) {
    const self = this;
    let currentNode = this._root;

    function inOrder(node, order) {
        if(node) {
            inOrder(node._left, order);

            if(order) self.values.push(node.value);
            else self.values.unshift(node.value);

            inOrder(node._right, order);
        };
    };    

    inOrder(currentNode, order);

    return this.values;
};

BinarySearchTree.prototype.verify = function() {
    if(!this._root) return true;

    const self = this;
    let currentNode = this._root;

    function inOrder(node) {
        if(node) {
            inOrder(node._left);
            self.keys.push(node.key);            
            inOrder(node._right);
        };
    };    

    inOrder(currentNode);

    for(let i = 1; i < this.keys.length; i++) {
        if(this.keys[i] < this.keys[i - 1]) return false;
    }
    
    return true;
};

module.exports = {
  BinarySearchTree,
  root: '_root',
  left: '_left',
  right: '_right',
  student: 'DZMITRY BELY'
};
