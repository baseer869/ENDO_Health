export const toHexNumber = (decimal: number): number => {
  const hexString = decimal.toString(16);
  return parseInt(hexString, 16);
};
