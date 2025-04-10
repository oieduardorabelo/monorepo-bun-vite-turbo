export const ranStr = () => {
  // random string
  const ran = Math.random().toString(36).substring(2, 8);
  return `ran_${ran}`;
};
