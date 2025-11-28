import { useDispatch, useSelector } from 'react-redux';
import { useElement } from '../../../../../entities/uiElement';
import { selectSelectedCells } from '../store';
import { useFlex } from './useFlex';


export const useLayout = () => {

  const { focusEntity } = useFlex();
  const selectedCells = useSelector(state => selectSelectedCells(state, focusEntity?.id));

  return {
    selectedCells,
  };
};
