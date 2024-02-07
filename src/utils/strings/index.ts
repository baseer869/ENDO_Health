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

// Date Time Format//

export const formatTimestamp = (timestamp: string): string => {
  const date = new Date(timestamp);
  const currentDate = new Date();

  const options: Intl.DateTimeFormatOptions = {
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
  };

  // If the date is today, show time; else show the full date
  if (
    date.getDate() === currentDate.getDate() &&
    date.getMonth() === currentDate.getMonth() &&
    date.getFullYear() === currentDate.getFullYear()
  ) {
    return date.toLocaleTimeString('en-US', options);
  } else if (
    date.getFullYear() === currentDate.getFullYear()
  ) {
    // If the date is in the same year, show date without year
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  } else {
    // Show the full date with year
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
  }
};
