const currCalenderContainer = document.querySelector(".current-calender");
const form = document.querySelector(".formSection");
const userCalenderContainer = document.querySelector(".user-calender");
const userSelectedMonth = document.querySelector("#month-dropdown");
const userEnteredYear = document.querySelector("#user-entered-year");
const userSelectedCalenderHeading = document.querySelector(
  ".user-selected-calender-heading"
);

// array to map indexes to month's name
const monthIndex = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sept",
  "Oct",
  "Nov",
  "Dec",
];

const weekDay = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

// function to get the current month and year
const init = () => {
  //hiding the user selected container
  userCalenderContainer.style.display = "none";

  const currMonth = new Date().toLocaleString("default", { month: "short" }); // Jan, Feb...

  const currYear = new Date().getFullYear(); // 2024

  const [numOfDaysInMonth, dayOnFirstOfMonth] = getTotalDaysAndDayOnFirst(
    currMonth,
    currYear
  );

  generateCalender(
    currCalenderContainer,
    currMonth,
    currYear,
    numOfDaysInMonth,
    dayOnFirstOfMonth
  );
};
init();

// function to get total number of days in month and day on 1st of that month
function getTotalDaysAndDayOnFirst(Month, year) {
  const numOfDaysInMonth = new Date(
    year,
    monthIndex.findIndex((month) => month === Month) + 1,
    0
  ).getDate(); // 30 or 31

  const dayOnFirstOfMonth = new Date(`${Month} ${year}`).getDay();

  return [numOfDaysInMonth, dayOnFirstOfMonth];
}

// function to generate a calender
function generateCalender(
  currCalenderContainer,
  month,
  year,
  numOfDays,
  dayOnFirst
) {
  // topmost container div is currCalenderContainer
  currCalenderContainer.style.margin = "0 auto 2rem";

  // create a div, to show the names of the days of the week and populate it with content and then append in currCalenderContainer
  const weekDaysDisplay = document.createElement("div");
  weekDaysDisplay.style.display = "flex";
  // generating 7 days of weeks on UI
  dayOfWeekContainerCreator(weekDaysDisplay);
  // appending weekDaysDisplay to currCalenderContainer
  currCalenderContainer.appendChild(weekDaysDisplay);

  // creating a continer to show all the dates in it
  const datesGridContainer = document.createElement("div");
  datesGridContainer.style.display = "grid";
  datesGridContainer.style.gridTemplateColumns = "repeat(7, 1fr)";

  // populating the datesGridContainer
  populateDatesGridContainer(datesGridContainer, dayOnFirst, numOfDays);

  // appending datesGridContainer to the parent container
  currCalenderContainer.appendChild(datesGridContainer);
}

// to create the div containing name of week days on UI
function dayOfWeekContainerCreator(weekDaysDisplay) {
  // creating 7 spans each containing a name of a day of week
  for (let i = 0; i < 7; i++) {
    // creating a span
    const dayOfWeekContainer = document.createElement("span");
    dayOfWeekContainer.textContent = weekDay[i];
    dayOfWeekContainer.style.width = "100px";
    dayOfWeekContainer.style.border = "1px solid black";

    // appending this to the weekDaysDisplay
    weekDaysDisplay.appendChild(dayOfWeekContainer);
  }
}

// function to populate the datesGridContainer with dates in it
function populateDatesGridContainer(datesGridContainer, dayOnFirst, numOfDays) {
  let startPointOnFirstRow = dayOnFirst; // will be used to give the grid-template-column-start value
  let row = 1;
  // populating the dates now
  for (let i = 1; i <= numOfDays; i++) {
    // creating date container
    const dateContainer = document.createElement("span");
    dateContainer.textContent = i;
    dateContainer.style.border = "1px solid black";
    dateContainer.style.font = "20px bold";
    dateContainer.style.textAlign = "center";
    dateContainer.style.padding = "0.5rem 0";

    // appending this in datesGridContainer
    datesGridContainer.appendChild(dateContainer);

    if (startPointOnFirstRow === 8) {
      row++;
      startPointOnFirstRow = 1;
    }

    dateContainer.style.gridColumnStart = startPointOnFirstRow;
    dateContainer.style.gridRowStart = row;
    startPointOnFirstRow++;
  }
}

// adding event listener on form
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const userMonth = userSelectedMonth.value;
  const userYear = userEnteredYear.value;

  userCalenderContainer.style.display = "block";

  userSelectedCalenderHeading.textContent = `Calender for ${userMonth}, ${userYear}`;
  userSelectedCalenderHeading.style.textAlign = "center";

  const [totalDays, dayOnFirst] = getTotalDaysAndDayOnFirst(
    userMonth,
    userYear
  );

  // clearing previous calender if any
  if (userCalenderContainer.children[0] && userCalenderContainer.children[1]) {
    userCalenderContainer.removeChild(userCalenderContainer.children[0]);
    userCalenderContainer.removeChild(userCalenderContainer.children[0]);
  }

  generateCalender(
    userCalenderContainer,
    userMonth,
    userYear,
    totalDays,
    dayOnFirst
  );
});
