import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import { ListItem, ListItemButton, ListItemText } from '../../../../shared/uiKit/List';
import { useTokenValueStates } from '../../model';
import { Text } from '../../../../shared/uiKit/Text';


export const TokenValueListItem = forwardRef(({ onClick, tokenValue }, ref) => {

  const name = tokenValue.name;

  const {
    isFocused,
    isSelected,
    handleHover,
    handleFocus,
    handleSelect,
  } = useTokenValueStates(tokenValue.id);

  const handleClick = (id) => {
    handleSelect(id);
    onClick && onClick();
  };

  return (
    <ListItem>
      <ListItemButton
        ref={ref}
        isSelected={isSelected}
        isFocused={isFocused}
        onClick={() => handleClick(tokenValue.id)}
        onMouseEnter={() => handleHover(tokenValue.id)}
        onMouseLeave={() => handleHover(null)}
        onFocus={() => handleFocus(tokenValue.id)}
        onBlur={() => handleFocus(null)}
      >
        <ListItemText>{name}</ListItemText>
      </ListItemButton>
    </ListItem>
  );
});

