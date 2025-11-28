import React from 'react';
import { DropdownPopover, DropdownTrigger, Dropdown } from '@/shared/uiKit/DropdownMenu';
import { MenuItem } from '@/shared/uiKit/Menu';
import { useLayerControl } from '../../model';

export const UiDefaultEntityMenuList = () => {

  const { addUiDefaultEntity, allDefaultElements } = useLayerControl();

  const handleCreateElement = (element) => {
    addUiDefaultEntity(element);
  };

  return (
    <>
      {allDefaultElements.map((element) => (
        <MenuItem key={element.id} onClick={() => { handleCreateElement(element); }}>
          {element.name}
        </MenuItem>
      ))}
    </>
  );
};

