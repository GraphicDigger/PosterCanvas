import React from 'react';
import { PlusIcon } from '../../../shared/assets/icons';
import { useTokenAndPresetControl } from '../model';
import { Button } from '../../../shared/uiKit/Button';
import { useTokenCollection } from '../../../entities/varTokenCollection';
import { TOKEN_TYPES } from '../../../entities/varToken';
import { DropdownPopover, DropdownTrigger, Dropdown } from '../../../shared/uiKit/DropdownMenu';
import { MenuItem } from '../../../shared/uiKit/Menu';


export const AddTokenButton = () => {

  const { addToken } = useTokenAndPresetControl();
  const { selectedTokenCollection, getCollectionTokensAndModesByCollectionId } = useTokenCollection();
  const collectionTokensAndModes = getCollectionTokensAndModesByCollectionId(selectedTokenCollection?.id);
  const modes = collectionTokensAndModes.modes;

  const handleAddColorToken = () => {
    addToken(modes, {
      type: TOKEN_TYPES.COLOR,
      collectionId: selectedTokenCollection?.id,
    });
  };

  const handleAddNumberToken = () => {
    addToken(modes, {
      type: TOKEN_TYPES.NUMBER,
      collectionId: selectedTokenCollection?.id,
    });
  };

  const handleAddStringToken = () => {
    addToken(modes, {
      type: TOKEN_TYPES.STRING,
      collectionId: selectedTokenCollection?.id,
    });
  };

  const handleAddBooleanToken = () => {
    addToken(modes, {
      type: TOKEN_TYPES.BOOLEAN,
      collectionId: selectedTokenCollection?.id,
    });
  };

  return (
    <>
      <DropdownPopover placement='bottom-center' offset={4}>
        <DropdownTrigger>
          <Button startIcon={<PlusIcon />}>
                        Add Token
          </Button>
        </DropdownTrigger>
        <Dropdown>
          <MenuItem onClick={handleAddColorToken}>Color</MenuItem>
          <MenuItem onClick={handleAddNumberToken}>Number</MenuItem>
          <MenuItem onClick={handleAddStringToken}>String</MenuItem>
          <MenuItem onClick={handleAddBooleanToken}>Boolean</MenuItem>
        </Dropdown>
      </DropdownPopover>

    </>
  );
};
