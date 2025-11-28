import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { ListItem, ListItemButton, ListItemText } from '../../../../shared/uiKit/List';
import { useUserspaceStates } from '../../model';
import { Stack } from '../../../../shared/uiKit/Stack';
import { Avatar } from '../../../../shared/uiKit/Avatar';
import { Text } from '../../../../shared/uiKit/Text';
import avatarImage from '../../../../shared/assets/dummy/avatar.png';
import { DropdownPopover, DropdownTrigger, Dropdown } from '../../../../shared/uiKit/DropdownMenu';
import { MenuItem } from '../../../../shared/uiKit/Menu';
import { useUserspaces } from '../../model';
import { Button } from '../../../../shared/uiKit/Button';
import { useWorkspaces, useWorkspaceStates } from '../../../workSpace';

export const UserspaceSwitcher = () => {

  const { handleHover, handleFocus, handleSelect } = useUserspaceStates();
  const { allUserspaces, selectedUserspace } = useUserspaces();

  const { userWorkspaces, selectedWorkspace } = useWorkspaces();
  const { handleSelect: handleSelectWorkspace } = useWorkspaceStates();

  const handleSelectUserspace = useCallback((userspaceId) => {
    handleSelect(userspaceId);
    console.log('[UserspaceSwitcher] userWorkspaces', userWorkspaces);
    handleSelectWorkspace(userWorkspaces[0].id);
  }, [handleSelect, handleSelectWorkspace, userWorkspaces]);

  console.log('[UserspaceSwitcher] selectedWorkspace', selectedWorkspace);

  return (
    <DropdownPopover placement='bottom-start'>
      <DropdownTrigger>
        <Button
          variant='blank'
          color='default'
          size='large'
          startIcon={<Avatar src={selectedUserspace?.avatar} />}
        >
          <Text size="medium" weight="bold"> {selectedUserspace?.name} </Text>
        </Button>
      </DropdownTrigger>
      <Dropdown>
        {allUserspaces.map((userspace) => (
          <MenuItem key={userspace.id} onClick={() => handleSelectUserspace(userspace.id)}>
            <Avatar size='small' src={userspace?.avatar} />
            {userspace.name}
          </MenuItem>
        ))}
      </Dropdown>
    </DropdownPopover>


  );
};

