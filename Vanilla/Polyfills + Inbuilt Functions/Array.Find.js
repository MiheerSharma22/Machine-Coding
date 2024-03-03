const arr = [12, 21, 47, 69, 97, 120, 3, 10, 1, 7, 180];
console.log("array: ", arr);

// Adding myFind() to Array.prototype
Array.prototype.myFind = function (callback) {
  for (let i = 0; i < this.length; i++) {
    if (callback(this[i])) return i;
  }
  return -1;
};

console.log(
  "index of 21: ",
  arr.myFind((element) => element === 21)
);
