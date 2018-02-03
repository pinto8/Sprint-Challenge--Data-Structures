/* eslint-disable no-unused-vars */
/* eslint-disable class-methods-use-this */
const { LimitedArray, getIndexBelowMax } = require('./hash-table-helpers');
const DoublyLinkedList = require('./linked-list-helpers');

class HashTable {
  constructor(limit = 8) {
    this.limit = limit;
    this.storage = new LimitedArray(this.limit);
    // Do not modify anything inside of the constructor
  }

  resize() {
    this.limit *= 2;
    const oldStorage = this.storage;
    this.storage = new LimitedArray(this.limit);
    oldStorage.each((bucket) => {
      if (!bucket) return;
      let current = bucket.head;
      while (current !== null && current !== undefined) {
        this.insert(current.value);
        current = current.next;
      }
    });
    console.log('this storage', this.storage);
  }

  capacityIsFull() {
    let fullCells = 0;
    this.storage.each((bucket) => {
      if (bucket !== undefined) fullCells++;
    });
    return fullCells / this.limit >= 0.75;
  }

  // Adds the given key, value pair to the hash table
  // Fetch the bucket associated with the given key using the getIndexBelowMax function
  // If no bucket has been created for that index, instantiate a new bucket and add the key, value pair to that new bucket
  // If the key already exists in the bucket, the newer value should overwrite the older value associated with that key
  insert(key, val) {
    if (this.capacityIsFull()) this.resize();
    const index = getIndexBelowMax(key.toString(), this.limit);
    const bucket = this.storage.get(index) || new DoublyLinkedList();
    if (bucket.head) {
      if (key === bucket.head.value[0]) {
        bucket.head.value = [key, val];
        this.storage.set(index, bucket);
        return;
      }
      if (key === bucket.tail.value[0]) {
        bucket.tail.value = [key, val];
        this.storage.set(index, bucket);
        return;
      }
      let current = this.head;
      while (current !== null && current !== undefined) {
        if (current.value[0] === key) {
          current.value = [key, val];
          this.storage.set(index, bucket);
          return;
        }
        current = current.next;
      }
    }
    bucket.addToTail([key, val]);
    this.storage.set(index, bucket);
  }
  // Removes the key, value pair from the hash table
  // Fetch the bucket associated with the given key using the getIndexBelowMax function
  // Remove the key, value pair from the bucket
  remove(key) {
    const index = getIndexBelowMax(key.toString(), this.limit);
    let bucket = this.storage.get(index);

    if (bucket) {
      bucket = bucket.delete(key);
      this.storage.set(index, bucket);
    }
  }
  // Fetches the value associated with the given key from the hash table
  // Fetch the bucket associated with the given key using the getIndexBelowMax function
  // Find the key, value pair inside the bucket and return the value
  retrieve(key) {
    const index = getIndexBelowMax(key.toString(), this.limit);
    const bucket = this.storage.get(index);
    let retrieved;
    if (bucket && bucket !== undefined) {
      if (key === bucket.head.value[0]) {
        retrieved = bucket.head.value;
        return retrieved[1];
      }
      if (key === bucket.tail.value[0]) {
        retrieved = bucket.tail.value;
        return retrieved[1];
      }
      let current = bucket.head;
      while (current !== null && current !== undefined) {
        if (current.value[0] === key) {
          retrieved = current.value;
        }
        current = current.next;
      }
    }
    return retrieved ? retrieved[1] : undefined;
  }
}


module.exports = HashTable;
