import React, { useCallback, forwardRef } from 'react';
import { DialogConfirmChanges } from '@/shared/uiKit/DialogVariants';
import { useDraftModel } from '../../model';


export const SaveDialog = forwardRef((props, ref) => {

  const { hasDraftChanges, saveDraftModelField, discardChanges } = useDraftModel();

  const handleSaveChanges = useCallback(() => {
    saveDraftModelField();
  }, [saveDraftModelField]);

  const handleDiscardChanges = useCallback(() => {
    discardChanges();
  }, [discardChanges]);

  return (
    <DialogConfirmChanges
      ref={ref}
      hasChanges={hasDraftChanges}
      onSave={handleSaveChanges}
      onDiscard={handleDiscardChanges}
    > You have unsaved changes. Do you want to save them?
    </DialogConfirmChanges>
  );
},
);
