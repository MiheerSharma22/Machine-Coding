// function with actual business logic
function getData(value) {
  console.log(value[0]);
}

// function to debounce the function call -> this will be called only once
// on line 21 on the RHS and return the function
const myDebounce = (functionToBeCalled, delay) => {
  console.log("called");
  let timer;
  // this args will contain the arguments that we pass
  // while calling the debouncedFetch from index.html
  return function (...args) {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      functionToBeCalled(args);
    }, delay);
  };
};

const debouncedFetch = myDebounce(getData, 500);
