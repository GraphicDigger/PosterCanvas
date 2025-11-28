import { ButtonTool } from '../../../../shared/uiKit/ButtonTool';
import { PlusIcon } from '../../../../shared/assets/icons';
import { DropdownPopover } from '../../../../shared/uiKit/DropdownMenu/DropdownPopover';
import { DropdownTrigger } from '../../../../shared/uiKit/DropdownMenu/DropdownTrigger';
import { Dropdown } from '../../../../shared/uiKit/DropdownMenu/Dropdown';
import { MenuItem } from '../../../../shared/uiKit/Menu/MenuItem';
import { useShadow } from '../model';

export const AddEffectButton = () => {

  const { addShadow } = useShadow();

  const handleAddEffect = (effect) => {
    if (effect === 'Shadow') {
      addShadow();
    }
  };

  return (

    <DropdownPopover
      placement='bottom-end'
      offset={-28}
    >
      <DropdownTrigger>
        <ButtonTool>
          <PlusIcon />
        </ButtonTool>
      </DropdownTrigger>
      <Dropdown>
        <MenuItem onClick={() => handleAddEffect('Shadow')}>Shadow</MenuItem>
        <MenuItem onClick={() => handleAddEffect('Opacity')}>Opacity</MenuItem>
        <MenuItem onClick={() => handleAddEffect('Blur')}>Blur</MenuItem>
        <MenuItem onClick={() => handleAddEffect('Cursor')}>Cursor</MenuItem>
      </Dropdown>
    </DropdownPopover>

  );
};
