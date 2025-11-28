/** @jsxImportSource @emotion/react */
import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { DoorLockIcon, PlusIcon } from '../../../shared/assets/icons';
import { Dialog, DialogTrigger, DialogWindow, DialogHeader, DialogTitle, DialogBody } from '../../../shared/uiKit/Dialog';
import { Button } from '../../../shared/uiKit/Button';
import { ButtonTool } from '../../../shared/uiKit/ButtonTool';
import { Stack } from '../../../shared/uiKit/Stack';
import { Avatar } from '../../../shared/uiKit/Avatar';
import avatarImage from '../../../shared/assets/dummy/avatar_1.jpg';
import avatarImageTwo from '../../../shared/assets/dummy/avatar.png';
import { TextField } from '../../../shared/uiKit/Fields';


export const SetAccessToCode = () => {

  return (
    <Dialog>
      <DialogTrigger asChild>
        <ButtonTool onClick={(e) => e.stopPropagation()}>
          <DoorLockIcon />
        </ButtonTool>
      </DialogTrigger>
      <DialogWindow width={400}>
        <DialogHeader>
          <DialogTitle>Custom code is blocked</DialogTitle>
        </DialogHeader>
        <DialogBody>
          <Stack direction='row' gap={8}>
            <TextField placeholder='Open access for editing' />
            <Button startIcon={<PlusIcon color='white' />}>
              Invite
            </Button>
          </Stack>
          {/* <TableBody>
            <TableRow>
              <TableCell>
                <Avatar src={avatarImageTwo} />
                Jenny Wilson
              </TableCell>
              <TableCell align='right'>
                Owner
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Avatar src={avatarImage} />
                Ilmir Sultanov
              </TableCell>
              <TableCell align='right'>
                Editor
              </TableCell>
            </TableRow>
          </TableBody> */}
        </DialogBody>
      </DialogWindow>
    </Dialog>
  );
};
