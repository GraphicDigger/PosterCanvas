import React from 'react';
import PropTypes from 'prop-types';
import {
  ListItem,
  ListItemButton,
  ListItemText,
  ListItemStartSlot,
  ListItemEndSlot,
} from '@/shared/uiKit/List';
import { useApiStates, useApiMutations } from '../model';
import { CrossIcon } from '@/shared/assets/icons';
import { ButtonTool } from '@/shared/uiKit/ButtonTool';

export const ApiListItem = ({
  id,
  name,
  filled = false,
  onClick,
}) => {
  const {
    handleHover,
    handleFocus,
    handleSelect,
    isSelected,
    isFocused,
    isHovered,
  } = useApiStates(id);

  const { removeApi } = useApiMutations();

  const { resetSelect: resetSelectedApi } = useApiStates();

  const handleClick = (id) => {
    handleSelect(id);
    onClick && onClick();
  };

  const handleRemoveApi = (e) => {
    e.stopPropagation();
    removeApi(id);
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
        {isHovered && (
          <ListItemEndSlot>
            <ButtonTool onClick={handleRemoveApi}>
              <CrossIcon />
            </ButtonTool>
          </ListItemEndSlot>
        )}
      </ListItemButton>
    </ListItem>
  );
};

ApiListItem.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};
