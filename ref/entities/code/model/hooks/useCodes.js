import { useSelector } from 'react-redux';
import { CODE_TYPES } from '../constants/codeTypes';
import { selectAllCodes, selectSelectedCode, selectCodesByType } from '../store/selectors';

export const useCodes = () => {

  const allCodes = useSelector(selectAllCodes);
  const selectedCode = useSelector(selectSelectedCode);

  const customCodes = useSelector(state => selectCodesByType(state, CODE_TYPES.CUSTOM));

  return {
    allCodes,
    selectedCode,
    customCodes,
  };
};
