import { ButtonTool } from '../../../shared/uiKit/ButtonTool';
import { PlusIcon } from '../../../shared/assets/icons';
import { useTokenAndPresetControl } from '../model/hooks';
import { Button } from '../../../shared/uiKit/Button';

export const AddCollection = ({ type, uiView = 'buttonIcon' }) => {

  const { addCollection } = useTokenAndPresetControl({ type });

  const handleAddCollection = () => {
    addCollection(type);
  };

  return (
    <>
      {uiView === 'buttonIcon' && (
        <ButtonTool onClick={handleAddCollection}>
          <PlusIcon />
        </ButtonTool>
      )}
      {uiView === 'button' && (
        <Button onClick={handleAddCollection}>
                    Create New Collection
        </Button>
      )}
    </>
  );
};
