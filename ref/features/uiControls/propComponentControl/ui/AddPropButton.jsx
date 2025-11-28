/** @jsxImportSource @emotion/react */
import React from 'react';
import { PlusIcon } from '@/shared/assets/icons';
import { DropdownPopover, DropdownTrigger, Dropdown } from '@/shared/uiKit/DropdownMenu';
import { MenuItem } from '@/shared/uiKit/Menu';
import { useComponents } from '@/entities/uiComponent';
import { PROP_CONFIG, usePropMutation } from '@/entities/varProp';
import { AddVaribleButton } from '@/shared/ui/addVariableButton';


export const AddPropButton = () => {

  const { addProp } = usePropMutation();
  const { selectedComponentId } = useComponents();

  const handleAddProp = (type) => {
    addProp({ componentId: selectedComponentId, type });
  };

  return <AddVaribleButton onAdd={handleAddProp} />;
};

