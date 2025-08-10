import { useRef } from "react";

const Search = () => {
  const timerId = useRef(null);

  function handleDebounceSearch(event) {
    if (event.target.value === "") return;

    if (timerId.current) clearTimeout(timerId.current);

    timerId.current = setTimeout(() => {
      console.log(`fetching data for '${event.target.value}'`);
    }, 500);
    // console.log(`fetching data for '${event.target.value}'`);
  }
  return (
    <>
      <input type="text" onChange={handleDebounceSearch} />
    </>
  );
};

export default Search;
