const Node = require('./node');

class LinkedList {

  constructor() {
    this._head = null;
    this._tail = null;
    this.length = 0;
  }

  append(data) {
    if (!this.length) {
      this._head = new Node(data, null, null);
      this._tail = this._head;
    } else {
      this._tail = new Node(data, this._tail, null);
      this._tail.prev.next = this._tail;
    }
    this.length++;
    return this;
  }

  head() {
    return this._head.data;
  }

  tail() {
    return this._tail.data;
  }

  at(index) {
    if (index > this.length) {
      return -1;
    }
    let current = this._head;
    for (var i = 0; i < index; i++) {
      current = current.next;
    }
    return current.data;
  }

  insertAt(index, data) {
    if (this.isEmpty()) {
      this.append(data);
      return this;
    }
    if (index > this.length) {
      return -1;
    }
    let current = this._head;
    for (var i = 0; i < index; i++) {
      current = current.next;
    }
    if (current.prev) {
      current.prev = new Node(data, current.prev, current);
    } else {
      this._head = new Node(data, null, current);
      this._head.next.prev = this._head;
    }
    current.prev.prev.next = current.prev;
    this.length++;
    return this;
  }

  isEmpty() {
    return this.length ? false : true;
  }

  clear() {
    this.length = 0;
    this._head.data = null;
    this._tail.data = null;
    return this;
  }

  deleteAt(index) {
    if (index > this.length) {
      return -1;
    }
    if (this.length === 1) {
      this.clear();
      return this;
    }
    let current = this._head;
    for (var i = 0; i < index; i++) {
      current = current.next;
    }
    current.next.prev = current.prev;
    if (current.prev) {
      current.prev.next = current.next;
    } else {
      this._head = current.next;
    }
    this.length--;
    return this;
  }

  reverse() {
    if (this.length === 1) {
      return this;
    }
    let current = this._head;
    current.prev = current.next;
    current.next = null;
    current = current.prev;
    for (var i = 1; i < this.length - 1; i++) {
      let temp = current.next;
      current.next = current.prev;
      current.prev = temp;
      current = current.prev;
    }
    current.next = current.prev;
    current.prev = null;
    current = this._head;
    this._head = this._tail;
    this._tail = current;
    return this;
  }

  indexOf(data) {
    let current = this._head;
    for (var i = 0; i < this.length; i++) {
      if (current.data === data) {
        return i;
      }
      current = current.next;
    }
    return -1;
  }
}

module.exports = LinkedList;
