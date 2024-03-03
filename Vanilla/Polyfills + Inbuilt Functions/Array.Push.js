const arr = [1, 2, 3];
console.log("original array: ", arr);

// adding the myPush() in Array.Prototype
Array.prototype.myPush = function (...newElements) {
  // getting the current length of the array
  let currLen = this.length;
  console.log("current Length: ", currLen);

  // updating the length of the array
  //   this.length += newElements.length;

  // adding the new elements in the array
  for (element of newElements) {
    this[currLen++] = element;
  }

  // returning the updated length
  return currLen;
};

const newLen = arr.myPush(4, 5, 6);
console.log("Array after pushing: ", arr);
console.log("New length: ", newLen);
