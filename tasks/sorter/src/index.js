class Sorter {
  constructor() {
    this.store = [];
    this.comparator = null;
  }

  add(element) {
    this.store.push(element);
  }

  at(index) {
    return this.store[index];
  }

  get length() {
    return this.store.length;
  }

  toArray() {
    return this.store;
  }

  sort(indices) {
    const sortFn = this.comparator || function (a, b) { return a - b }; 
    const sortedPart = [];
    
    indices.sort((a, b) => a - b).forEach(item => sortedPart.push(this.store[item]));
    sortedPart.sort(sortFn);

    indices.forEach((item, i) => this.store[item] = sortedPart[i]);
  }

  setComparator(compareFunction) {
    this.comparator = compareFunction;
  }
}

module.exports = Sorter;