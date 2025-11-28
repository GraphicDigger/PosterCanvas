import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import { ListItem, ListItemButton, ListItemText } from '../../../../shared/uiKit/List';
import { useHtmlAttrStates } from '../../model';
import { Text } from '../../../../shared/uiKit/Text';


export const AttrListItem = forwardRef(({ onClick, attr }, ref) => {

  const {
    isFocused,
    isSelected,
    handleHover,
    handleFocus,
    handleSelect,
  } = useHtmlAttrStates(attr.id);

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
        onClick={() => handleClick(attr.id)}
        onMouseEnter={() => handleHover(attr.id)}
        onMouseLeave={() => handleHover(null)}
        onFocus={() => handleFocus(attr.id)}
        onBlur={() => handleFocus(null)}
      >
        <ListItemText>{attr.jsxName}</ListItemText>
      </ListItemButton>
    </ListItem>
  );
});

