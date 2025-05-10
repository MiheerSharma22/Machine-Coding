// fetching all the document nodes
let timerDiv = document.querySelector(".timer-container");
let stopwatchDiv = document.querySelector(".watch-container");
let timerRadioBtn = document.querySelector("#timer");
let stopwatchRadioBtn = document.querySelector("#stopwatch");
let fieldSet = document.querySelector("#user-choice");

// since for the ver first time always timer will be selected so adding 'show' class to it
timerDiv.classList.add("show");

// listen for the changes in the value of radio buttons
fieldSet.addEventListener("change", (e) => {
  if (e.target === timerRadioBtn) {
    timerDiv.classList.add("show");
    stopwatchDiv.classList.remove("show");
    handleTimerOperations();
  }

  if (e.target === stopwatchRadioBtn) {
    stopwatchDiv.classList.add("show");
    timerDiv.classList.remove("show");
    handleWatchOperations();
  }
});

// handler function for stopwatch operations
function handleWatchOperations() {
  let startBtn = document.querySelector(".start-watch");
  let pauseBtn = document.querySelector(".pause-watch");
  pauseBtn.style.display = "none";
  let resetBtn = document.querySelector(".reset-watch");
  let timerContainer = document.querySelector(".watch-time-container");
  let timerId,
    time = 0,
    delay = 1000;

  startBtn.addEventListener("click", () => {
    startBtn.style.display = "none";
    pauseBtn.style.display = "block";

    // incrementing the time one second at a time
    timerId = setTimeout(() => {
      ++time;

      // converting the current time into h:m:s format
      const [hour, min, sec] = convertIntoHMSFormat(time);

      timerContainer.textContent = `${hour}:${min}:${sec}`;

      // infinite loop till user pauses or resets
      startBtn.click();
    }, delay);
  });

  pauseBtn.addEventListener("click", () => {
    clearTimeout(timerId);
    startBtn.style.display = "block";
    pauseBtn.style.display = "none";
  });

  resetBtn.addEventListener("click", () => {
    clearTimeout(timerId);
    timerContainer.textContent = "0:0:00";
    time = 0;
    startBtn.style.display = "block";
    pauseBtn.style.display = "none";
  });
}

// handler function for timer operations
function handleTimerOperations() {
  if (timerRadioBtn.checked) {
    const userEnteredTimeinSec = document.querySelector(".user-timer-time");

    let timeContainer = document.querySelector(".timer-time-container");

    let startBtn = document.querySelector(".start-timer");
    let resetBtn = document.querySelector(".reset-timer");
    let pauseBtn = document.querySelector(".pause-timer");
    pauseBtn.style.display = "none";

    let timerId;
    let time = 0;

    startBtn.addEventListener("click", () => {
      userEnteredTimeinSec.readOnly = true;
      startBtn.style.display = "none";
      pauseBtn.style.display = "block";

      timerId = setTimeout(() => {
        // incerementing time one second at a time
        ++time;

        // if time value increases than user entered value the reset
        if (time > userEnteredTimeinSec.value) {
          resetBtn.click();
          userEnteredTimeinSec.readOnly = false;
          return;
        }
        // else render the diff of current time and user enterd time in h:m:s format
        else {
          const remainingTime = userEnteredTimeinSec.value - time;
          const [hour, min, sec] = convertIntoHMSFormat(remainingTime);
          timeContainer.textContent = `${hour}:${min}:${sec}`;

          // repeat till the timer ends
          startBtn.click();
        }
      }, 1000);
    });

    pauseBtn.addEventListener("click", () => {
      startBtn.style.display = "block";
      pauseBtn.style.display = "none";
      clearTimeout(timerId);
    });

    resetBtn.addEventListener("click", () => {
      clearTimeout(timerId);
      time = 0;
      userEnteredTimeinSec.readOnly = false;
      startBtn.style.display = "block";
      pauseBtn.style.display = "none";
      timeContainer.textContent = "0";
    });

    userEnteredTimeinSec.addEventListener("input", (e) => {
      const [hour, min, sec] = convertIntoHMSFormat(e.target.value);
      timeContainer.textContent = `${hour}:${min}:${sec}`;
    });
  }
}

// calling this function for the first time timer operation handling, other times it will be handled by on change event of fieldset
handleTimerOperations();

// function to conver the time in h:m:s format
const convertIntoHMSFormat = (time) => {
  const hour = Math.floor(time / 3600);
  const min = Math.floor((time % 3600) / 60);
  const sec = time % 60;

  return [hour, min, sec];
};
