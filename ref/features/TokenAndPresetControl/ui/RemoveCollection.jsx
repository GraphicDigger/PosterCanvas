import { ButtonTool } from '../../../shared/uiKit/ButtonTool';
import { TrashIcon } from '../../../shared/assets/icons';
import { useTokenAndPresetControl } from '../model/hooks';

export const RemoveCollection = ({ collectionId, type }) => {

  const { removeCollection } = useTokenAndPresetControl({ collectionId, type });

  const handleRemoveCollection = () => {
    removeCollection(collectionId, type);
  };

  return (
    <ButtonTool onClick={handleRemoveCollection}>
      <TrashIcon />
    </ButtonTool>
  );
};
