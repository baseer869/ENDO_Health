export const toHexString = (byteArray: number[]) => {
  return Array.from(byteArray, byte => {
    return '0' + byte.toString(16).padStart(2, '0');
  }).join('');
};

export function toHexStringWithOffset(
  array: number[],
  offset: number,
  length: number,
): string {
  const hexDigits = '0123456789ABCDEF';
  let hexString = '';

  for (let i = offset; i < offset + length; i++) {
    const byte = array[i];
    const highNibble = Math.floor(byte / 16);
    const lowNibble = byte % 16;
    hexString += hexDigits[highNibble] + hexDigits[lowNibble];
  }

  return hexString;
}
