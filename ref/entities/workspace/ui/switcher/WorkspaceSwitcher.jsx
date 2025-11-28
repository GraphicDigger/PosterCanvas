import React, { forwardRef  } from 'react';
import PropTypes from 'prop-types';
import { ListItem, ListItemButton, ListItemText } from '../../../../shared/uiKit/List';
import { useWorkspaceStates } from '../../model';
import { Stack } from '../../../../shared/uiKit/Stack';
import { Avatar } from '../../../../shared/uiKit/Avatar';
import { Text } from '../../../../shared/uiKit/Text';
import avatarImage2 from '../../../../shared/assets/dummy/shifaaz-shamoon-sLAk1guBG90-unsplash.jpg';
import { DropdownPopover } from '../../../../shared/uiKit/DropdownMenu/DropdownPopover';
import { DropdownTrigger } from '../../../../shared/uiKit/DropdownMenu/DropdownTrigger';
import { Dropdown } from '../../../../shared/uiKit/DropdownMenu/Dropdown';
import { MenuItem } from '../../../../shared/uiKit/Menu';
import { Button } from '../../../../shared/uiKit/Button';
import { useWorkspaces } from '../../model';


export const WorkspaceSwitcher = () => {

  const { handleHover, handleFocus, handleSelect } = useWorkspaceStates();
  const { userWorkspaces, selectedWorkspace } = useWorkspaces();

  const handleSelectWorkspace = (workspaceId) => {
    handleSelect(workspaceId);
  };

  return (
    <DropdownPopover placement='bottom-start'>
      <DropdownTrigger>
        <Button size='large' variant='blank' color='default' startIcon={<Avatar src={selectedWorkspace?.avatar} />}>
          <Text size="medium" weight="bold"> {selectedWorkspace?.name} </Text>
        </Button>
      </DropdownTrigger>
      <Dropdown>
        {userWorkspaces.map((workspace) => (
          <MenuItem key={workspace.id} onClick={() => handleSelectWorkspace(workspace.id)}>
            <Avatar size='small' src={workspace?.avatar} />
            {workspace.name}
          </MenuItem>
        ))}
      </Dropdown>
    </DropdownPopover>


  );
};

