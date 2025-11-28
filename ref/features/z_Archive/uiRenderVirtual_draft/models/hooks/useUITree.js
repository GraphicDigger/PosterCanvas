// ude-frontend-vite-ts/src/features/uiRender/model/hooks/useUITree.js
import { useSelector } from 'react-redux';
import { ENTITY_KINDS } from '../../../../shared/constants';
import { selectCompositeEntitiesByOwnership } from '../../../../entities/uiTree/model/store/selector';
import { useScreens } from '../../../../entities/uiScreen';
import { useComponents } from '../../../../entities/uiComponent';

//хук для получения данных

export const useUITree = () => {
  const { selectedScreen } = useScreens();
  const { selectedComponent } = useComponents();

  // Получаем дерево UI для выбранного экрана
  const screenUITree = useSelector(
    state => selectedScreen
      ? selectCompositeEntitiesByOwnership(state, ENTITY_KINDS.SCREEN, selectedScreen.id)
      : [],
  );

  // Получаем дерево UI для выбранного компонента
  const componentUITree = useSelector(
    state => selectedComponent
      ? selectCompositeEntitiesByOwnership(state, ENTITY_KINDS.COMPONENT, selectedComponent.id)
      : [],
  );

  // Функция для получения дерева UI по ID и типу
  const getUITreeByOwnership = useSelector(state => {
    return (ownershipType, ownerId) =>
      selectCompositeEntitiesByOwnership(state, ownershipType, ownerId);
  });

  return {
    screenUITree,
    componentUITree,
    getUITreeByOwnership,
  };
};
