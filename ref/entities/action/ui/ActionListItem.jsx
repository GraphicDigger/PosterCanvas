import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import { ListItem, ListItemButton, ListItemText, ListItemStartSlot } from '@/shared/uiKit/List';
import { ActionIcon } from '@/shared/assets/icons';


export const ActionListItem = forwardRef(({
  onClick,
  action,
}, ref) => {

  const handleClick = () => {
    if (onClick) {onClick();}
  };

  return (
    <ListItem ref={ref}>
      <ListItemButton onClick={handleClick}>
        <ListItemStartSlot>
          <ActionIcon />
        </ListItemStartSlot>
        <ListItemText editable>
          {action.type || 'Select Action Type'}
        </ListItemText>
      </ListItemButton>
    </ListItem>
  );
});


ActionListItem.propTypes = {
  onClick: PropTypes.func,
  action: PropTypes.shape({
    id: PropTypes.string.isRequired,
    type: PropTypes.string,
    name: PropTypes.string,
    trigger: PropTypes.string.isRequired,
  }).isRequired,
};

