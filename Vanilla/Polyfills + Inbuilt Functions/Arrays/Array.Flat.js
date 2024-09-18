// const arr = [12, 21, 47, 69, 97, 120, 3, 10, 1, [7, 160]];
// const arr = [0, 1, [2, [3, [4, 5]]]];
// const arr = [1, 2, [3, 4, [5, 6]]]; //(2)
const arr = [1, 2, [3, 4, [5, 6, [7, 8, [9, 10]]]]]; //(Infinity)

Array.prototype.myFlat = function (depth = 1) {
  let newArr = [];

  for (let i = 0; i < this.length; i++) {
    // if current element of array has length => that is in turn and array itself,
    // and depth is greater then zero
    if (this[i].length && depth > 0) {
      depth--;
      this[i].myFlat(depth).forEach((element) => newArr.push(element));
    }
    // else simply push that element
    else newArr.push(this[i]);
  }

  return newArr;
};

console.log("ogflat: ", arr.flat(3));

console.log("myFlat: ", arr.myFlat(3));
