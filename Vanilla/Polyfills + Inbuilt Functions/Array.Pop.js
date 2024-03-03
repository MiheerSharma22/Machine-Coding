const arr = [1, 2, 3];
console.log(arr);

// adding the pop method in Array.Prototype
Array.prototype.myPop = function () {
  // getting the last element in the array
  const lastElement = this[this.length - 1];

  // decrementing the length of the array by 1
  this.length = this.length - 1;

  // returning the popped element (lastElement)
  return lastElement;
};

const poppedElement = arr.myPop();
console.log("Popped Element: ", poppedElement);
console.log("array after popping using myPop: ", arr);
