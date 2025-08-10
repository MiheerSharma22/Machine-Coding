import { useEffect, useRef, useState } from "react";

const Timer = () => {
  const [time, setTime] = useState(10);
  const timerId = useRef(null);

  // looping behaviour to decremently update the time until it becomes 0 or user stops it.
  useEffect(() => {
    if (time === 0 || !timerId.current) {
      return;
    }

    timerId.current = setTimeout(() => {
      setTime(time - 1);
    }, 1000);

    return () => {
      clearTimeout(timerId.current);
    };
  }, [time]);

  function startTimer() {
    // to initiate the countdown, rest useEffect will handle (looping behavior)
    timerId.current = setTimeout(() => {
      setTime(time - 1);
    }, 500);
    // }
  }

  function stopTimer() {
    clearTimeout(timerId.current);
    timerId.current = null;
    setTime(10);
  }

  function pauseTimer() {
    clearTimeout(timerId.current);
  }

  return (
    <>
      <span>{time}</span>

      <div>
        <button onClick={startTimer}>start</button>
        <button onClick={pauseTimer}>pause</button>
        <button onClick={stopTimer}>stop</button>
      </div>
    </>
  );
};

export default Timer;
