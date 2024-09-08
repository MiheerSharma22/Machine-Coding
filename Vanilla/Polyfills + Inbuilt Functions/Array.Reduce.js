const arr = [12, 21, 3, 10];

Array.prototype.myReduce = function (callbackFunction, initialValue) {
  let accumulator = initialValue ? initialValue : this[0];
  let currentValue = initialValue ? this[0] : this[1];

  for (let i = initialValue ? 0 : 1; i < this.length; i++) {
    accumulator = callbackFunction(accumulator, currentValue, i, this);
    currentValue = this[i + 1];
  }

  return accumulator;
};

console.log(
  "reduce: ",
  arr.reduce((acc, curr) => acc + curr, 0)
);

console.log(
  "myReduce: ",
  arr.myReduce((acc, curr) => acc + curr, 0)
);
