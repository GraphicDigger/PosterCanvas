import { useSelector } from 'react-redux';
import {
  selectAllComponents,
  selectSelectedComponent,
  selectSelectedComponentId,
  selectCompositeComponentById,
} from '../store';
import { selectCodesByComponentId } from '../../../code';
import { CODE_LANG } from '../../../code';


export const useComponents = () => {

  const allComponents = useSelector(selectAllComponents);
  const selectedComponentId = useSelector(selectSelectedComponentId);
  const selectedComponent = useSelector(state => selectCompositeComponentById(state, selectedComponentId));

  // код выбранного компонента
  const selectedComponentCodes = useSelector(state => selectCodesByComponentId(state, selectedComponent?.id));
  const jsxCode = selectedComponentCodes.find(code => code.lang === CODE_LANG.JSX);

  return {
    allComponents,
    selectedComponent,
    selectedComponentId,
    selectedComponentCodes,
    jsxCode,
  };
};


export const useComponentCodes = (componentId) => {
  const codesByComponentId = useSelector(state =>
    selectCodesByComponentId(state, componentId),
  );

  const jsxCode = codesByComponentId.find(code => code.lang === CODE_LANG.JSX);

  return {
    codesByComponentId,
    jsxCode,
  };
};
