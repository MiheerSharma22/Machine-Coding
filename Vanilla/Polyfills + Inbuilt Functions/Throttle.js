// pseudo- code
// - button click -> calls a function
// - this function , clearing the pre set timer (if any), then start a Timer of 3 sec
// - after the timer is expired the specified function will be invoked .

let resizeCount = 0;
//   isThrottle = false;

const setIntervalHandler = () => {
  let timerId;
  console.log("inside");
  return function () {
    if (!timerId) {
      console.log(timerId);
      timerId = setTimeout(() => {
        throttle(timerId);
      }, 3000);
    }
  };
};

const throttle = (timerId) => {
  timerId = clearTimeout(timerId);
  console.log(`Resized ${++resizeCount}`);
};

window.addEventListener("resize", setIntervalHandler);
