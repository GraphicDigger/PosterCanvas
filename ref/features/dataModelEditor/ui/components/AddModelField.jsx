import React from 'react';
import { SectionPanel, SectionPanelHeader, SectionPanelName, SectionPanelBody } from '../../../../shared/uiKit/SectionPanel';
import { Stack } from '../../../../shared/uiKit/Stack';
import { ButtonTool } from '../../../../shared/uiKit/ButtonTool';
import { DropdownPopover, DropdownTrigger, Dropdown } from '../../../../shared/uiKit/DropdownMenu';
import { MenuItem } from '../../../../shared/uiKit/Menu';
import { EDataModel } from '../../../../entities/dataModel';
import { MODEL_FIELD_CONFIG } from '../../../../entities/dataModel';
import { useDraftModel } from '../../model';
import { useDataModels } from '../../../../entities/dataModel';

export const AddModelField = () => {

  const { selectedModel } = useDataModels();
  const { addFieldToDraft } = useDraftModel();

  const handleAddField = (field) => {
    addFieldToDraft(field.id, field.type, field.label);
  };

  return (
    <DropdownPopover placement='bottom-end'>
      <DropdownTrigger>
        <ButtonTool />
      </DropdownTrigger>
      <Dropdown>
        {MODEL_FIELD_CONFIG.map(field => {
          const Icon = field.icon;
          return (
            <MenuItem
              key={field.type}
              onClick={() => handleAddField(field)}
            >
              <Icon />
              {field.label}
            </MenuItem>
          );
        })}
      </Dropdown>
    </DropdownPopover>

  );
};
