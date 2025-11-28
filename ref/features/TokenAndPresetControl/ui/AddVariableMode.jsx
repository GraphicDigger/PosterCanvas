import { ButtonTool } from '../../../shared/uiKit/ButtonTool';
import { PlusIcon } from '../../../shared/assets/icons';
import { useVariableMode } from '../model/hooks/useVariableMode';

export const AddVariableMode = ({ type, collectionId }) => {

  const { addVariableMode } = useVariableMode({ type, collectionId });

  const handleAddPresetMode = () => {
    addVariableMode();
  };

  return (
    <ButtonTool onClick={handleAddPresetMode}>
      <PlusIcon />
    </ButtonTool>
  );
};
