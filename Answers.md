## Questions
1. What are the order of insertions/removals for the following data structures?
   - **Stack** - Stack is LIFO - Last in, first out.
   - **Queue** - Queues are FIFO - First in, first out.
2. What is the retrieval time complexity for the following data structures?
   - **Linked List** - Linear
   - **Hash Table** - Constant
   - **Binary Search Trees** - Logrithmic
2. What are some advantages to using a Hash Tables over an array in JavaScript?

Hashtables allow us to assign an index to a value (usually based on string or numeric characters) allowing for insertion, deletion, and search to be done in constant time.  Hashes store values in tables based on their specific property attributes, so there is some logic to placement which can be replicated in search.  Array placement is generally random.  If you dont have the index for the item you are looking for in an array, you typically have to search through the whole array to find it (linear search).  Hash tables store a key value pair, and return the value associated with the key you look up in constant time.