const arr = [12, 21, 47, 69, 97, 120, 3, 10, 1, 7, 160];

Array.prototype.myMap = function (callbakcFunction) {
  const newArr = [];

  for (let i = 0; i < this.length; i++) {
    newArr.push(callbakcFunction(this[i], i, this));
  }

  return newArr;
};

console.log(
  "map: ",
  arr.map((element) => element * 2)
);

console.log(
  "myMap: ",
  arr.myMap((element) => element * 2)
);
