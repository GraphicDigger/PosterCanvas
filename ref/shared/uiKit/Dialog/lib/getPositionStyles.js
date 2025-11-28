
export const getPositionStyles = (position) => {
  switch (position) {
  case 'center':
    return {
      justify: 'center',
      align: 'center',
    };
  case 'left':
    return {
      justify: 'flex-start',
      align: 'flex-start',
    };
  case 'right':
    return {
      justify: 'flex-end',
      align: 'flex-start',
    };
  default:
    return {
      justify: 'center',
      align: 'center',
    };
  }
};
