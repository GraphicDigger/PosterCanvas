import { useCallback } from 'react';
import { SeparateBorderIcon } from '../../../../shared/assets/icons';
import { ButtonTool } from '../../../../shared/uiKit/ButtonTool';
import { useBorder } from '../model';

export const AddBorderButton = () => {

  const { addBorder } = useBorder();

  const handleAddBorder = useCallback(() => {
    addBorder();
  }, [addBorder]);

  return (
    <ButtonTool onClick={handleAddBorder}>
      <SeparateBorderIcon />
    </ButtonTool>
  );
};
