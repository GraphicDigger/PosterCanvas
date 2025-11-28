import { useScreenControl } from '../model';
import { ButtonTool } from '../../../../shared/uiKit/ButtonTool';
import { PlusIcon } from '../../../../shared/assets/icons';

export const AddScreenButton = () => {

  const { addScreen } = useScreenControl();

  return (
    <ButtonTool onClick={addScreen}>
      <PlusIcon />
    </ButtonTool>
  );
};
