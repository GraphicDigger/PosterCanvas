import React from 'react';
import PropTypes from 'prop-types';
import { ListItem, ListItemButton, ListItemStartSlot, ListItemText } from '../../../../shared/uiKit/List';
import { usePresetStates } from '../../model';
import { FontIcon } from '../../../../shared/assets/icons';


export const PresetListItem = ({ preset, onClick }) => {

  const { handleSelect, isSelected } = usePresetStates();

  const handleClick = () => {
    handleSelect(preset.id);
    if (onClick) {onClick();}
  };

  return (
    <ListItem>
      <ListItemButton
        isSelected={isSelected}
        onClick={handleClick}
      >
        <ListItemStartSlot>
          <FontIcon />
        </ListItemStartSlot>
        <ListItemText>
          {preset.name || preset.presetName}
        </ListItemText>

      </ListItemButton>
    </ListItem>
  );
};

PresetListItem.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  onClick: PropTypes.func,
};

