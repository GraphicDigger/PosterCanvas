import { useCallback } from 'react';
import { PlusIcon } from '../../../../shared/assets/icons';
import { ButtonTool } from '../../../../shared/uiKit/ButtonTool';
import { useFill } from '../model';

export const AddBackgroundColorButton = () => {

  const { addBackgroundColor } = useFill();

  const handleAddBackgroundColor = useCallback(() => {
    addBackgroundColor();
  }, [addBackgroundColor]);

  return (
    <ButtonTool onClick={handleAddBackgroundColor}>
      <PlusIcon />
    </ButtonTool>
  );
};
