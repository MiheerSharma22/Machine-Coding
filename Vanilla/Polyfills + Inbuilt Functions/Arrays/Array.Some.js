const arr = [12, 21, 47, 69, 97, 120, 3, 10, 1, 7, 160];

Array.prototype.mySome = function (callbackFunction) {
  for (let i = 0; i < this.length; i++) {
    if (callbackFunction(this[i], i, this)) return true;
  }
  return false;
};

console.log(
  "some: ",
  arr.some((item) => item % 7 === 0)
);
console.log(
  "mySome: ",
  arr.mySome((item) => item % 7 === 0)
);
