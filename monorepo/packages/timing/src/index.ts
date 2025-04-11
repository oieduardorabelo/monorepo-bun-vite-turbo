export const ONE_DAY_IN_SECONDS = 60 * 60 * 24;

export const CURRENT_EPOCH_SECONDS = Math.floor(Date.now() / 1000);
export const CURRENT_YEAR = new Date().getFullYear();

const seconds = (seconds: number) => {
  return seconds;
};

const miliseconds = (seconds: number) => {
  return seconds * 1000;
};

const minutes = (seconds: number) => {
  return seconds / 60;
};

export const TIMING = {
  days: (n: number) => {
    const valueInSeconds = n * ONE_DAY_IN_SECONDS;
    return {
      seconds: seconds(valueInSeconds),
      miliseconds: miliseconds(valueInSeconds),
      minutes: minutes(valueInSeconds),
    };
  },
  hours: (n: number) => {
    const valueInSeconds = (ONE_DAY_IN_SECONDS / 24) * n;
    return {
      seconds: seconds(valueInSeconds),
      miliseconds: miliseconds(valueInSeconds),
      minutes: minutes(valueInSeconds),
    };
  },
  minutes: (n: number) => {
    const valueInSeconds = (ONE_DAY_IN_SECONDS / 24 / 60) * n;
    return {
      seconds: seconds(valueInSeconds),
      miliseconds: miliseconds(valueInSeconds),
      minutes: minutes(valueInSeconds),
    };
  },
  seconds: (n: number) => {
    const valueInSeconds = (ONE_DAY_IN_SECONDS / 24 / 60 / 60) * n;
    return {
      seconds: seconds(valueInSeconds),
      miliseconds: miliseconds(valueInSeconds),
      minutes: minutes(valueInSeconds),
    };
  },
};
