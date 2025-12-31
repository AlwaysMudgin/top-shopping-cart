export const capitalizeFirst = (string) => {
  return string
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};

const sort = (category, direction = 'descending') => {};
