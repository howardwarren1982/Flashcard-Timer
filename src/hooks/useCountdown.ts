import { useEffect, useState } from 'react';

const useCountdown = (targetDate: any) => {
  const countDownDate = new Date(targetDate).getTime();

  const [countDown, setCountDown] = useState(countDownDate - new Date().getTime());

  useEffect(() => {
    let interval: any = null;

    if (countDown > 0) {
      interval = setInterval(() => {
        const newCountDown = countDownDate - new Date().getTime();
        if (newCountDown > 0) {
          setCountDown(newCountDown);
        } else {
          setCountDown(0);
          clearInterval(interval);
        }
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [countDown, countDownDate]);

  useEffect(() => {
    // Start the countdown as soon as the component is mounted
    const newCountDown = countDownDate - new Date().getTime();
    if (newCountDown > 0) {
      setCountDown(newCountDown);
    } else {
      setCountDown(0);
    }
  }, [countDownDate]);

  return getReturnValues(countDown);
};

const getReturnValues = (countDown: any) => {
  if (countDown <= 0) {
    return [0, 0, 0, 0];
  }

  // calculate time left
  const days = Math.floor(countDown / (1000 * 60 * 60 * 24));
  const hours = Math.floor((countDown % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((countDown % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((countDown % (1000 * 60)) / 1000);

  return [days, hours, minutes, seconds];
};

export { useCountdown };
