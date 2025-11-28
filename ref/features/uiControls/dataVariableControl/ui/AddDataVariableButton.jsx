import React from 'react';
import { DropdownPopover, DropdownTrigger, Dropdown } from '@/shared/uiKit/DropdownMenu';
import { MenuItem } from '@/shared/uiKit/Menu';
import { ButtonTool, ButtonToolGroup } from '@/shared/uiKit/ButtonTool';
import { PlusIcon, VariableNumberIcon, VariableStringIcon } from '@/shared/assets/icons';
import { AddVaribleButton } from '@/shared/ui/addVariableButton';
import { useVariableMutation } from '@/entities/varVariableData';

export const AddDataVariableButton = () => {

  const { addVariable } = useVariableMutation();

  const handleAddDataVariable = (type) => {
    addVariable(type);
  };

  return (
    <AddVaribleButton onAdd={handleAddDataVariable} />
  );
};

