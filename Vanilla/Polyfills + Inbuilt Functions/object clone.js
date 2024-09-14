/* we can create a deep copy of an object using the global structuredClone(),
 but there is an issue with this global function, if the object that we are trying to clone has 
 a key whose value is a function, structuredClone cannot clone that object and throws an error */

const obj = {
  name: "Miheer",
  age: 25,
  position: "Frontend Engineer",
  updateResume: () => {
    console.log("Resume updated successfully.");
  },
  getName: () => {
    console.log(obj.name);
  },
};

myClone = function (origObj) {
  const newObject = {};
  for (const key in origObj) {
    if (Object.prototype.hasOwnProperty.call(origObj, key)) {
      const element = origObj[key];
      newObject[key] = element;
    }
  }

  return newObject;
};

const newObj = myClone(obj);
console.log("myclone: ", newObj);

const structuredCloneObj = structuredClone(obj);
console.log("structureClone: ", structuredCloneObj);
