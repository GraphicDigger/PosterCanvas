import { ButtonTool } from '@/shared/uiKit/ButtonTool';
import { DataAddCollectionIcon } from '@/shared/assets/icons';
import { useDraftModel } from '../model';

export const AddDataModelButton = () => {

  const { addDataModel } = useDraftModel();

  return (
    <ButtonTool onClick={addDataModel}>
      <DataAddCollectionIcon />
    </ButtonTool>
  );
};
