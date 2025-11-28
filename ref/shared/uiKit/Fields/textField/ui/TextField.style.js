
export const getBorderRadius = (position, orientation, theme) => {
  switch (position) {
  case 'first':
    return orientation === 'vertical'
      ? `${theme.ref.borderRadius.medium} ${theme.ref.borderRadius.medium} 0 0`
      : `${theme.ref.borderRadius.medium} 0 0 ${theme.ref.borderRadius.medium}`;
  case 'last':
    return orientation === 'vertical'
      ? `0 0 ${theme.ref.borderRadius.medium} ${theme.ref.borderRadius.medium}`
      : `0 ${theme.ref.borderRadius.medium} ${theme.ref.borderRadius.medium} 0`;
  case 'middle':
    return '0';
  default:
    return `${theme.ref.borderRadius.medium}`;
  }
};
