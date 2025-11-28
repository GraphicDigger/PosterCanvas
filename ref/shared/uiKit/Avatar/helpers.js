export const getInitials = (text) => {
  if (!text) {return '';}
  return text
    .split(' ')
    .map(word => word[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
};
