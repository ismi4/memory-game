import React from "react";

import { useState, useEffect } from "react";

const CountDownTimer = ({
  miliseconds,
  setCurrentTimeInMsInParentComponent,
  onTimeOut,
  stopCountdown,
}) => {
  const minutes = +Math.floor(miliseconds / 60000);
  const seconds = +((miliseconds % 60000) / 1000).toFixed(0);
  const [[minutesCurrent, secondsCurrent], setTime] = useState([
    minutes,
    seconds,
  ]);
  const [milisecondsCurrent, setMilisecondsCurrent] = useState(miliseconds);

  useEffect(() => {
    setCurrentTimeInMsInParentComponent(milisecondsCurrent);
  }, milisecondsCurrent);

  const tick = () => {
    if (stopCountdown) return;

    setMilisecondsCurrent((prevState) => prevState - 1000);
    if (minutesCurrent === 0 && secondsCurrent === 0) {
      onTimeOut();
    } else if (secondsCurrent === 0) {
      setTime([minutesCurrent - 1, 59]);
    } else {
      setTime([minutesCurrent, secondsCurrent - 1]);
    }
  };

  React.useEffect(() => {
    const timerId = setInterval(() => tick(), 1000);
    return () => clearInterval(timerId);
  });

  return (
    <div>
      <p>{`${minutesCurrent.toString().padStart(2, "0")}:${secondsCurrent
        .toString()
        .padStart(2, "0")}`}</p>
    </div>
  );
};

export default CountDownTimer;
