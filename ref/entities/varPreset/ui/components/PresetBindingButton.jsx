import React from 'react';
import PropTypes from 'prop-types';
import { ListItem, ListItemButton, ListItemStartSlot, ListItemText } from '../../../../shared/uiKit/List';
import { FontIcon } from '../../../../shared/assets/icons';

export const PresetBindingButton = ({
  preset,
  onClick,
}) => {


  const handleClick = () => {
    if (onClick) {onClick();}
  };

  return (
    <ListItem>
      <ListItemButton
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

PresetBindingButton.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  onClick: PropTypes.func,
};

