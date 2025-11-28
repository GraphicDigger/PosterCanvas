import { useDispatch, useSelector } from 'react-redux';
import {
  setSelectedLibraryId,
  setCurrentStep,
  setSelectedComponentsIds,
} from '../store/slice';
import {
  selectSelectedComponentsIds,
  selectSelectedLibraryId,
} from '../store/selectors';

// Хук для управления выбором компонентов
export const useSelectorComponents = () => {
  const dispatch = useDispatch();

  const selectedComponentsIds = useSelector(selectSelectedComponentsIds);
  const selectedLibraryId = useSelector(selectSelectedLibraryId);

  const handleLibrarySelected = (libraryId) => {
    dispatch(setSelectedLibraryId(libraryId));
    dispatch(setCurrentStep('componentSelection'));
  };

  // Обработчик выбора компонента. Добавляем или удаляем ID компонента из массива выбранных компонентов
  const handleComponentSelected = (componentId) => {
    if (!componentId) {return;}

    // Проверяем, выбран ли уже этот компонент
    const isSelected = selectedComponentsIds.includes(componentId);

    if (isSelected) {
      // Если компонент уже выбран, удаляем его из списка
      dispatch(setSelectedComponentsIds(selectedComponentsIds.filter(id => id !== componentId)));
    } else {
      // Если компонент не выбран, добавляем его в список
      dispatch(setSelectedComponentsIds([...selectedComponentsIds, componentId]));
    }
  };

  return {
    selectedComponentsIds,
    selectedLibraryId,
    handleLibrarySelected,
    handleComponentSelected,
  };
};
