import React, { forwardRef, useRef, useState } from 'react';
import styled from '@emotion/styled';
import { useTheme } from '@emotion/react';
import { useDispatch, useSelector } from 'react-redux';

import { Avatar } from '@/shared/uiKit/Avatar';
import { Text } from '@/shared/uiKit/Text';
import { Dropdown } from '@/shared/uiKit/DropdownMenu/Dropdown';
import { MenuItem } from '@/shared/uiKit/Menu';
import { Button } from '@/shared/uiKit/Button';
import { useClickOutside } from '@/shared/lib';
import { switchWorkspaceSession, selectCurrentWorkspace, selectCurrentUserWorkspaces } from '@/app/sessions/auth';


export const WorkspacePicker = () => {
  const theme = useTheme();
  const ref = useRef(null);
  const dispatch = useDispatch();
  const [pickerIsOpen, setPickerIsOpen] = useState(false);

  // Получаем воркспейсы для текущего юзера из authSession
  const selectedUserWorkspaces = useSelector(selectCurrentUserWorkspaces);
  const selectedWorkspace = useSelector(selectCurrentWorkspace);

  // Debug logging
  // console.log('[WorkspacePicker] workspaces:', selectedUserWorkspaces.length, 'current:', selectedWorkspace?.id);

  const handleTogglePicker = () => {
    setPickerIsOpen(!pickerIsOpen);
  };

  const handleClosePicker = () => {
    setPickerIsOpen(false);
  };

  const handleSelectWorkspace = (workspaceId) => {
    dispatch(switchWorkspaceSession(workspaceId));
    handleClosePicker();
  };

  useClickOutside(ref, handleClosePicker);

  // Показываем placeholder, если данные еще загружаются
  if (!selectedWorkspace) {
    return (
      <Button
        size='large'
        variant='blank'
        color='default'
        disabled
      >
        <Text size="medium" weight="bold">Loading...</Text>
      </Button>
    );
  }

  return (
    <>
      <Button
        size='large'
        variant='blank'
        color='default'
        startIcon={<Avatar src={selectedWorkspace?.avatar} />}
        onClick={handleTogglePicker}
      >
        <Text size="medium" weight="bold"> {selectedWorkspace?.name} </Text>
      </Button>

      {pickerIsOpen && (
        <StyledDropdown ref={ref}>
          <Dropdown>
            {selectedUserWorkspaces.map((workspace) => (
              <MenuItem
                key={workspace.id}
                onClick={() => handleSelectWorkspace(workspace.id)}
              >
                <Avatar size='small' src={workspace?.avatar} />
                <StyledMenuItemText theme={theme}>{workspace.name}</StyledMenuItemText>
              </MenuItem>
            ))}
          </Dropdown>
        </StyledDropdown>
      )}
    </>
  );
};

const StyledDropdown = styled.div`
    position: absolute;
    top: 40px;
    left: 0;
    width: 100%;
    height: max-content;
    z-index: 1000;
    padding: 0 4px;
`;

const StyledMenuItemText = styled.p`
    ${({ theme }) => theme.sys.typography.body.small}
    width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
`;

