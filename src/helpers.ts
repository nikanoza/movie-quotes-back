export const generateExpireDate = (): Date => {
  const date = new Date();
  const hours = date.getHours();
  date.setHours(hours + 1);
  return date;
};
