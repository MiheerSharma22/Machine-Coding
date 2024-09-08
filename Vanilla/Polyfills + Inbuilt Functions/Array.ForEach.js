const arr = [12, 21, 47, 69, 97, 120, 3, 10, 1, 7, 160];

Array.prototype.myForEach = function (callbackFunction) {
  for (let i = 0; i < this.length; i++) {
    callbackFunction(this[i], i, this);
  }
};

console.log(
  "foreach: ",
  arr.forEach((element, index) => console.log({ index, element }))
);

console.log(
  "myForeach: ",
  arr.myForEach((element, index) => console.log({ index, element }))
);
