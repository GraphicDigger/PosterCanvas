/** @jsxImportSource @emotion/react */
import React, { useState, useCallback, useEffect, forwardRef, useRef } from 'react';
import { Dialog, DialogWindow, DialogHeader, DialogTitle, DialogBody, DialogFooter } from '../Dialog';
import { Button } from '../Button';
import { Stack } from '../Stack';
import { useClickOutside } from '../../lib/hooks/useClickOutside';

export const DialogConfirmChanges = forwardRef(({
  title,
  children,
  onSave,
  onDiscard,
  onClose,
  hasChanges,
}, ref) => {
  const localRef = useRef(null);
  const [visible, setVisible] = useState(false);

  const handleClickOutside = useCallback(() => {
    if (hasChanges) {setVisible(true);}
  }, [hasChanges]);

  useClickOutside([ref, localRef], handleClickOutside);

  console.log('🔥[DialogConfirmChanges] localRef', localRef);

  const handleSave = () => {
    setVisible(false);
    onSave && onSave();
  };

  const handleDiscard = () => {
    setVisible(false);
    onDiscard && onDiscard();
  };

  const handleClose = () => {
    setVisible(false);
    onClose && onClose();
  };

  if (!hasChanges || !visible) { return null; }

  return (
    <Dialog>
      <DialogWindow ref={localRef} width={400}>
        <DialogHeader onClose={handleClose}>
          <DialogTitle>{title || 'Unsaved Changes'}</DialogTitle>
        </DialogHeader>
        <DialogBody>
          {children}
        </DialogBody>
        <DialogFooter>
          <Stack direction='row' justify='space-between'>
            <Button onClick={handleDiscard} variant='filled' color='default'>Discard changes</Button>
            <Stack direction='row' width='fit' gap={2}>
              <Button onClick={handleClose} variant='filled' color='default' >Cancel</Button>
              <Button onClick={handleSave} variant='filled' color='primary' >Save</Button>
            </Stack>
          </Stack>
        </DialogFooter>
      </DialogWindow>
    </Dialog>
  );
});
