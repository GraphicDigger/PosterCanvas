
export const getSquareStyles = ({ variant, blue, grey }) => {
  const baseStyles = {
    left: variant === 'selected' ? '-2px' : variant === 'added' ? '-1px' : '0',
    bottom: variant === 'selected' ? '-2px' : variant === 'added' ? '-1px' : '0',
  };

  switch (variant) {
  case 'new':
    return {
      ...baseStyles,
      backgroundColor: blue,
    };
  case 'added':
    return {
      ...baseStyles,
      backgroundColor: '#fff',
      borderLeft: `1px solid ${grey}`,
      borderBottom: `1px solid ${grey}`,
    };
  case 'selected':
    return {
      ...baseStyles,
      backgroundColor: '#fff',
      borderLeft: `2px solid ${blue}`,
      borderBottom: `2px solid ${blue}`,
    };
  default:
    return {
      ...baseStyles,
      backgroundColor: blue,
    };
  }
};

export const getCircleStyles = ({ variant, blue, grey }) => {
  const baseStyles = {
    padding: variant !== 'cursor' ? '4px' : '0',
  };

  switch (variant) {
  case 'new':
    return {
      ...baseStyles,
      backgroundColor: blue,
    };
  case 'added':
    return {
      ...baseStyles,
      backgroundColor: '#fff',
      border: `1px solid ${grey}`,
    };
  case 'selected':
    return {
      ...baseStyles,
      backgroundColor: '#fff',
      border: `2px solid ${blue}`,
    };
  default:
    return {
      ...baseStyles,
      backgroundColor: blue,
    };
  }
};
