import { useCallback } from 'react';
import { SeparateBorderRadiusIcon } from '../../../../shared/assets/icons';
import { ButtonTool } from '../../../../shared/uiKit/ButtonTool';
import { useBorderRadius } from '../model';

export const AddBorderRadiusButton = () => {

  const { addBorderRadius } = useBorderRadius();

  const handleAddBorderRadius = useCallback(() => {
    addBorderRadius();
  }, [addBorderRadius]);

  return (
    <ButtonTool onClick={handleAddBorderRadius}>
      <SeparateBorderRadiusIcon />
    </ButtonTool>
  );
};
