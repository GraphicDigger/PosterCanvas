import { ButtonTool } from '../../../../shared/uiKit/ButtonTool';
import { CodeIcon } from '../../../../shared/assets/icons';
import { useScreenControl } from '../model';

export const OpenCodeButton = ({ screenId }) => {

  const { openCode } = useScreenControl();

  const handleOpenCode = (e) => {
    e.stopPropagation();
    openCode(screenId);
  };

  return (
    <ButtonTool onClick={handleOpenCode}>
      <CodeIcon />
    </ButtonTool>
  );
};

