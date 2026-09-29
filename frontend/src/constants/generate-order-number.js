export const generateOrderNumber = () => {
  const number = Math.floor(100000 + Math.random() * 900000);

  return `#VL-${number}`;
};
