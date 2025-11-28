import React, { useCallback, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from '@emotion/styled';
import { useClickOutside } from '@/shared/lib';
import { Stack } from '@/shared/uiKit/Stack';
import { Avatar } from '@/shared/uiKit/Avatar';
import { Text } from '@/shared/uiKit/Text';
import { Dropdown } from '@/shared/uiKit/DropdownMenu';
import { MenuItem } from '@/shared/uiKit/Menu';
import { Button } from '@/shared/uiKit/Button';
import { selectAllUsers } from '@/entities/actorUser/model/store/selectors';
import { switchUserSession, selectCurrentUser } from '@/app/sessions/auth';

export const UserspacePicker = () => {
  const ref = useRef(null);
  const dispatch = useDispatch();
  const [pickerIsOpen, setPickerIsOpen] = useState(false);

  const allUsers = useSelector(selectAllUsers);
  const currentUser = useSelector(selectCurrentUser);

  // Debug logging
  // console.log('[UserspacePicker] allUsers:', allUsers.length, 'currentUser:', currentUser?.id);

  const handleTogglePicker = () => {
    setPickerIsOpen(!pickerIsOpen);
  };

  const handleClosePicker = () => {
    setPickerIsOpen(false);
  };

  const handleSelectUser = useCallback((userId) => {
    dispatch(switchUserSession(userId));
    handleClosePicker();
  }, [dispatch]);

  useClickOutside(ref, handleClosePicker);

  // Показываем placeholder, если данные еще загружаются
  if (!currentUser) {
    return (
      <Button
        variant='blank'
        color='default'
        size='large'
        disabled
      >
        <Text size="medium" weight="bold">Loading...</Text>
      </Button>
    );
  }

  return (
    <>
      <Button
        variant='blank'
        color='default'
        size='large'
        startIcon={<Avatar src={currentUser?.avatar} />}
        onClick={handleTogglePicker}
      >
        <Text
          size="medium"
          weight="bold"
        >
          {currentUser?.name}
        </Text>
      </Button>

      {pickerIsOpen && (
        <StyledDropdown ref={ref}>
          <Dropdown>
            {allUsers.map((user) => (
              <MenuItem
                key={user.id}
                onClick={() => handleSelectUser(user.id)}
              >
                <Avatar
                  size='small'
                  src={user?.avatar}
                />
                {user.name}
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

