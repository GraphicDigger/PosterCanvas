import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

import { ListItem, ListItemButton, ListItemText } from '../../../shared/uiKit/List';
import { DoorLockIcon } from '../../../shared/assets/icons';
import { useFocusEntity } from '../../uiFocus';
import { useDesignMode } from '../../mode/editorMode';
import { usePresetCollectionStates } from '../model';


export const EPresetCollection = ({ collection }) => {

  const {
    isSelected,
    isFocused,
    isHovered,
    handleSelect,
    handleFocus,
    handleHover,
  } = usePresetCollectionStates(collection);

  const {
    isPresetManagerInDesignMode,
    setPresetManagerInDesignMode,
    togglePresetManagerInDesignMode,
  } = useDesignMode();

  const handleTogglePresetManager = () => {
    if (isSelected) {
      togglePresetManagerInDesignMode();
      handleSelect(null);
    } else {
      handleSelect(collection.id);
      if (!isPresetManagerInDesignMode) {
        setPresetManagerInDesignMode();
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
        onClick={handleTogglePresetManager}
        onMouseEnter={() => handleHover(collection.id)}
        onMouseLeave={() => handleHover(null)}
        onFocus={() => handleFocus(collection.id)}
        onBlur={() => handleFocus(null)}
      >
        <ListItemText editable >
          {collection.name}
        </ListItemText>

        {collection.default && (
          <ListItemText>
            <DoorLockIcon />
          </ListItemText>
        )}

      </ListItemButton>
    </ListItem>
  );
};

EPresetCollection.propTypes = {
  collection: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  }).isRequired,
};
