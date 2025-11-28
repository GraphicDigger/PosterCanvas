import React from 'react';
import PropTypes from 'prop-types';
import {
  ListItem,
  ListItemButton,
  ListItemText,
} from '@/shared/uiKit/List';
import { useApiCategoryStates, useApiStates } from '../model';


export const ApiCategoryListItem = ({
  id,
  name,
  filled = false,
}) => {
  const {
    handleHover,
    handleFocus,
    handleSelect,
    isSelected,
    isFocused,
    isHovered,
  } = useApiCategoryStates(id);

  const { resetSelect: resetSelectedApi } = useApiStates();

  const handleClick = (id) => {
    handleSelect(id);
    resetSelectedApi();
  };

  return (
    <ListItem>
      <ListItemButton
        filled={filled}
        isSelected={isSelected}
        isHovered={isHovered}
        isFocused={isFocused}
        onClick={() => handleClick(id)}
        onMouseEnter={() => handleHover(id)}
        onMouseLeave={() => handleHover(null)}
        onFocus={() => handleFocus(id)}
        onBlur={() => handleFocus(null)}
      >
        <ListItemText editable={true} >
          {name}
        </ListItemText>
      </ListItemButton>
    </ListItem>
  );
};

ApiCategoryListItem.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};
