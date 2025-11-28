import React, { useCallback, useMemo } from 'react';
import { ButtonTool } from '@/shared/uiKit/ButtonTool';
import { Button } from '@/shared/uiKit/Button';
import { DropdownPopover, DropdownTrigger, Dropdown } from '@/shared/uiKit/DropdownMenu';
import { MenuItem } from '@/shared/uiKit/Menu';
import { useActorRoleMutations, ACTOR_TYPE } from '@/entities/actorRole';
import { PlusIcon } from '@/shared/assets/icons';


export const AddRoleButton = ({ uiView = 'icon' }) => {

  const { addActorRole } = useActorRoleMutations();

  const handleAddActorRole = useCallback((actorType) => {
    addActorRole(actorType);
  }, [addActorRole]);

  const ButtonComponent = useMemo(() => {

    if (uiView === 'icon') { return <ButtonTool />; }

    return <Button startIcon={<PlusIcon />}> Add Role </Button>;

  }, [uiView, handleAddActorRole]);

  return (
    <DropdownPopover placement='bottom-end'>
      <DropdownTrigger>
        {ButtonComponent}
      </DropdownTrigger>
      <Dropdown>
        {Object.values(ACTOR_TYPE).map(actorType => (
          <MenuItem key={actorType} onClick={() => handleAddActorRole(actorType)}>
            {actorType}
          </MenuItem>
        ))}
      </Dropdown>
    </DropdownPopover>
  );
};
