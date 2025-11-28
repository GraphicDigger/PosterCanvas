import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

import {
  ListItem,
  ListItemButton,
  ListItemText,
  ListItemStartSlot,
} from '../../../../shared/uiKit/List';
import { ComponentIcon } from '../../../../shared/assets/icons';
import { useVariant } from '../../model/hooks/useVariant';
import { selectVariantCheckStates } from '../../model';


export const VariantListItem = ({ id, name }) => {

  const { isSelected, isFocused, isHovered } = useSelector(state => selectVariantCheckStates(state, id));
  const { handleHover, handleSelect, handleFocus } = useVariant();

  const handleClick = (id) => {
    handleSelect(id);
  };

  return (
    <ListItem>
      <ListItemButton
        isSelected={isSelected}
        isHovered={isHovered}
        isFocused={isFocused}
        onClick={() => handleClick(id)}
        onMouseEnter={() => handleHover(id)}
        onMouseLeave={() => handleHover(null)}
        onFocus={() => handleFocus(id)}
        onBlur={() => handleFocus(null)}
      >
        <ListItemStartSlot>
          <ComponentIcon />
        </ListItemStartSlot>
        <ListItemText editable={true} >
          {name}
        </ListItemText>
      </ListItemButton>
    </ListItem>
  );
};

VariantListItem.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};
