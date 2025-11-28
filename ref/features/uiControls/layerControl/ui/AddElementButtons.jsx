import React from 'react';
import { DropdownPopover, DropdownTrigger, Dropdown } from '@/shared/uiKit/DropdownMenu';
import { MenuItem } from '@/shared/uiKit/Menu';
import { ButtonTool, ButtonToolGroup } from '@/shared/uiKit/ButtonTool';
import { PlusIcon, ElementBoxIcon, ElementTextIcon } from '@/shared/assets/icons';
import { useElementMutations } from '@/entities/uiElement';
import { useElementLibrary } from '@/shared/uiEditorDefaults/defaultElements';


export const AddElementButtons = () => {

  const { addElement } = useElementMutations();
  const { groupedElements } = useElementLibrary();

  const handleCreateElement = (templateType) => {
    addElement(templateType);
  };

  return (
    <ButtonToolGroup fill={false}>
      <ButtonTool onClick={() => handleCreateElement('std.div')} >
        <ElementBoxIcon />
      </ButtonTool>

      <ButtonTool onClick={() => handleCreateElement('std.p')}>
        <ElementTextIcon />
      </ButtonTool>

      <DropdownPopover placement='bottom-end'>
        <DropdownTrigger>
          <ButtonTool>
            <PlusIcon />
          </ButtonTool>
        </DropdownTrigger>
        <Dropdown>
          {Object.entries(groupedElements).map(([category, elements]) => (
            <React.Fragment key={category}>
              {elements.map((element) => (
                <MenuItem key={element.type} onClick={() => handleCreateElement(element.type)}>
                  {element.label}
                </MenuItem>
              ))}
            </React.Fragment>
          ))}
        </Dropdown>
      </DropdownPopover>
    </ButtonToolGroup>
  );
};
