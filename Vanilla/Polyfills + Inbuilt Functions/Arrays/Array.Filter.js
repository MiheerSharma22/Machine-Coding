const arr = [12, 21, 47, 69, 97, 120, 3, 10, 1, 7, 160];
console.log("my Array: ", arr);

Array.prototype.myFilter = function (callbackFunction) {
  const newArr = [];

  for (let i = 0; i < this.length; i++) {
    const result = callbackFunction(this[i], i, this);
    if (result) newArr.push(this[i]);
  }

  return newArr;
};

const id = 120;

console.log(
  "Filtered array: ",
  arr.myFilter((item, index, temp) => {
    return item === id;
  })
);
