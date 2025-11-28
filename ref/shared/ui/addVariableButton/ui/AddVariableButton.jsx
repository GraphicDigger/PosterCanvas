/** @jsxImportSource @emotion/react */
import React from 'react';
import { PlusIcon } from '@/shared/assets/icons';
import { ButtonTool } from '@/shared/uiKit/ButtonTool';
import { DropdownPopover, DropdownTrigger, Dropdown } from '@/shared/uiKit/DropdownMenu';
import { MenuItem } from '@/shared/uiKit/Menu';
import { VARIABLE_CONFIG } from '@/shared/constants';


export const AddVaribleButton = ({ onAdd }) => {

  const handleAddVariable = (type) => {
    onAdd(type);
  };

  return (
    <DropdownPopover placement='bottom-end' offset={-28}>
      <DropdownTrigger>
        <ButtonTool focus>
          <PlusIcon />
        </ButtonTool>
      </DropdownTrigger>
      <Dropdown>
        {Object.entries(VARIABLE_CONFIG).map(([key, variable]) => (
          <MenuItem
            key={key}
            onClick={() => onAdd(variable.type)}
          >
            {variable.icon}
            {variable.label}
          </MenuItem>
        ))}
      </Dropdown>
    </DropdownPopover>
  );
};

