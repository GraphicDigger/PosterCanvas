/** @jsxImportSource @emotion/react */
import React from 'react';
import PropTypes from 'prop-types';
import { DropdownPopover, DropdownTrigger, Dropdown } from '../../../../shared/uiKit/DropdownMenu';
import { MenuItem } from '../../../../shared/uiKit/Menu';
import { TRIGGER_CONFIG } from '../../../../entities/action';
import { useChangeAction } from '../../model';

export const TriggerPicker = ({
  action,
  triggerSlot,
  ...props
}) => {

  const { handleAddTrigger, handleUpdateTrigger } = useChangeAction();

  const handleClick = (triggerType) => {
    if (action) {
      handleUpdateTrigger(action.id, triggerType);
    } else {
      handleAddTrigger(triggerType);
    }
  };

  return (
    <DropdownPopover {...props}>
      <DropdownTrigger>
        {triggerSlot}
      </DropdownTrigger>
      <Dropdown>
        {Object.entries(TRIGGER_CONFIG).map(([key, triggerConfig]) => (
          <MenuItem
            key={key}
            onClick={() => handleClick(triggerConfig.type)}
          >
            {triggerConfig.icon}
            {triggerConfig.label}
          </MenuItem>
        ))}
      </Dropdown>
    </DropdownPopover>
  );
};


TriggerPicker.propTypes = {
  triggerSlot: PropTypes.node.isRequired,
  actionType: PropTypes.oneOf(['add', 'update']),
};
