const obj1 = {
  name: "Miheer Sharma",
  age: 25,
  designation: "FrontEnd Engineer",
  printDetails: function () {
    console.log(this.name);
  },
};

const obj2 = {
  name: "Muskaan Sharma",
  age: 24,
  designation: "FrontEnd Engineer",
};

obj1.printDetails();
obj1.printDetails.call(obj2);

// EXAMPLE 2 -> when function is independent of any object
console.log("EXAMPLE 2 -> when function is independent of any object");

const obj3 = {
  name: "Miheer Sharma",
  age: 25,
  designation: "FrontEnd Engineer",
};

let printDetails = function () {
  console.log(this);
};

const obj4 = {
  name: "Muskaan Sharma",
  age: 24,
  designation: "FrontEnd Engineer",
};

printDetails();
printDetails.call(obj3);
printDetails.call(obj4);

// example 3 -> apply vs call
console.log("EXAMPLE 2 -> call() vs apply()");

let printDetails2 = function (state, country) {
  console.log(this.name + " is from " + state + ", " + country);
};

printDetails2.call(obj3, "Delhi", "India");
printDetails2.apply(obj4, ["Haryana", "India"]); // if we pass arguments as an arrya then apply, no other difference

// example 4 -> bind
console.log("EXAMPLE 4 -> bind");

// if we want to create a COPY of the function and then call it whenever needed then -> bind is used
const newFunc = printDetails2.bind(obj2, "Delhi", "India");
newFunc();
