const Node = require('./node');

class LinkedList {
    constructor() {
        this._head = null;
        this._tail = null;      
        this.length = 0;
    }

    append(data) {
        let node = new Node(data);

        if(this._tail) {
            node.prev = this._tail;
            this._tail.next = node;
            this._tail = node;
        } else {
            this._head = node;
            this._tail = node;
        }

        this.length += 1;

        return this;
    }

    head() {
        return this._head ? this._head.data : this._head;
    }

    tail() {
        return this._tail ? this._tail.data : this._tail;
    }

    find(index){
        let count = 0;
        let length = this.length;
        let currNode = this._head;

        while(length) {
            if(index === count) return currNode;    
            length -= 1;
            count += 1;
            currNode = currNode.next;
        }
        return this;
    }

    at(index) {
        return this.find(index).data;
    }

    insertAt(index, data) {
        let currNode = this.find(index);
        let newNode = new Node(data, currNode.prev, currNode);

        currNode.prev.next = newNode;
        currNode.prev = newNode; 

        this.length += 1;
        
        return this;
    }

    isEmpty() {
        return !Boolean(this.length);
    }

    clear() {
        this._head = null;
        this._tail = null;
        this.length = 0;

        return this;
    }

    deleteAt(index) {
        let nextNode = this.find(index + 1);
        let prevNode = this.find(index - 1);

        nextNode.prev = prevNode;
        prevNode.next = nextNode;

        return this;
    }

    reverse() {
        let currNode = this._head;
        let length = this.length;

        while(length){
            let tmp = currNode.prev;

            currNode.prev = currNode.next;
            currNode.next = tmp;

            currNode = currNode.prev;
            length -= 1;
        }

        let tmp = this._head;
        this._head = this._tail;
        this._tail = tmp;

        return this;
    }

    indexOf(data) {
        let currNode = this._head;
        let count = 0;
        let length = this.length;

        while(length) {
            if(currNode.data === data) return count;    
            length -= 1;
            count += 1;
            currNode = currNode.next;
        }

        return -1;
    }
}

module.exports = LinkedList;
