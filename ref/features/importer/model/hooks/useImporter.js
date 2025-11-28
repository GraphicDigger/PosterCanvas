import { useSelector, useDispatch } from 'react-redux';
import { selectIsImporterOpen } from '../store/selectors';
import { openImporter, closeImporter, toggleImporter } from '../store/slice';


export const useImporter = () => {
  const dispatch = useDispatch();
  const isImporterOpen = useSelector(selectIsImporterOpen);

  return {
    // Состояние
    isImporterOpen,

    // Методы
    openImporter: () => dispatch(openImporter()),
    closeImporter: () => dispatch(closeImporter()),
    toggleImporter: () => dispatch(toggleImporter()),
  };
};
