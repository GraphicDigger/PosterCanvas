import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';

import { ListItem, ListItemButton, ListItemText, ListItemEndSlot } from '../../../shared/uiKit/List';
import { DoorLockIcon } from '../../../shared/assets/icons';
import { useFocusEntity } from '../../uiFocus';
import { useDesignMode } from '../../mode/editorMode';
import { ButtonTool } from '../../../shared/uiKit/ButtonTool';
import { useTokenCollection } from '../model';


export const ETokenCollection = ({ collection }) => {

  const {
    isSelected,
    isFocused,
    isHovered,
    handleSelect,
    handleFocus,
    handleHover,
  } = useTokenCollection(collection.id);

  const { setFocused } = useFocusEntity();
  const { toggleTokenManagerInDesignMode, isTokenManagerInDesignMode, setTokenManagerInDesignMode } = useDesignMode();

  const handleToggleTokenManager = () => {

    if (isSelected) {
      toggleTokenManagerInDesignMode();
      handleSelect(null);
    } else {
      handleSelect(collection.id);
      if (!isTokenManagerInDesignMode) {
        setTokenManagerInDesignMode();
      }
    }
  };

  return (
    <ListItem>
      <ListItemButton
        filled={false}
        isSelected={isSelected}
        isHovered={isHovered}
        isFocused={isFocused}
        onClick={handleToggleTokenManager}
        onMouseEnter={() => handleHover(collection.id)}
        onMouseLeave={() => handleHover(null)}
        onFocus={() => handleFocus(collection.id)}
        onBlur={() => handleFocus(null)}
      >
        <ListItemText>
          {collection.name}
        </ListItemText>
        {collection.default && (
          <ListItemEndSlot>
            <ButtonTool>
              <DoorLockIcon />
            </ButtonTool>
          </ListItemEndSlot>
        )}

      </ListItemButton>
    </ListItem>
  );
};

ETokenCollection.propTypes = {
  collection: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  }).isRequired,
};
