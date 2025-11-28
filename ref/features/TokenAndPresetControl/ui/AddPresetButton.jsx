import { ButtonTool } from '../../../shared/uiKit/ButtonTool';
import { PlusIcon } from '../../../shared/assets/icons';
import { useTokenAndPresetControl } from '../model/hooks';

export const AddPresetButton = ({ presetType, styles }) => {

  const { addTypographyPreset } = useTokenAndPresetControl();

  const handleAddTypographyPreset = () => {
    addTypographyPreset(styles);
  };

  return (
    <>
      {presetType === 'typography' && (
        <ButtonTool onClick={handleAddTypographyPreset}>
          <PlusIcon />
        </ButtonTool>
      )}
    </>
  );
};
