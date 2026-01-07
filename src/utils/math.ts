export const isNumber = value => /^\d+$/.test(value);

export const capitalize = input => {
  return input
    .toLowerCase()
    .split(' ')
    .map(s => s.charAt(0).toUpperCase() + s.substring(1))
    .join(' ');
};
