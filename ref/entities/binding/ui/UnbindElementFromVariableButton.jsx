import { ButtonTool } from '../../../shared/uiKit/ButtonTool';
import { MinusIcon } from '../../../shared/assets/icons';
import { useBindVariableToElement } from '../model';
import { useElement } from '../../uiElement';

export const UnbindElementFromVariableButton = () => {

  const { unbindElementFromVariable } = useBindVariableToElement();
  const { elementBoundVariables } = useElement();

  const handleUnbindElementFromVariable = () => {
    unbindElementFromVariable(elementBoundVariables[0]);
  };

  return (
    <ButtonTool onClick={() => unbindElementFromVariable(elementBoundVariables[0])}>
      <MinusIcon />
    </ButtonTool>
  );
};
