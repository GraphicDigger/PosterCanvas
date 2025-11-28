import { useDispatch } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import { addComponent, updateComponent, removeComponent, setComponents } from '../store/slice';
import { useComponents } from './useComponents';

export const useComponentMutation = () => {
  const dispatch = useDispatch();
  const { allComponents } = useComponents();

  // Добавляет компонент в список компонентов проекта
  const addComponentHandler = (componentData) => {
    const newComponent = {
      id: componentData.id || uuidv4(),
      ...componentData,
      createdAt: new Date().toISOString(),
    };

    // Используем новый action addComponent
    dispatch(addComponent(newComponent));
    console.log('[hook] component added:', newComponent.id);

    return newComponent;
  };

  // Добавляет несколько компонентов в список компонентов проекта
  const addComponentsHandler = (componentsData) => {
    const newComponents = componentsData.map(componentData => {
      const newComponent = {
        id: componentData.id || uuidv4(),
        ...componentData,
        createdAt: new Date().toISOString(),
      };

      // Используем новый action addComponent для каждого компонента
      dispatch(addComponent(newComponent));
      return newComponent;
    });

    return newComponents.map(component => component.id);
  };

  // Удаляет компонент из списка компонентов проекта
  const removeComponentHandler = (componentId) => {
    // Используем новый action removeComponent
    dispatch(removeComponent(componentId));
    console.log('[hook] component removed:', componentId);
  };

  // Обновляет компонент в списке компонентов проекта
  const updateComponentHandler = (componentId, updatedData) => {
    // Используем новый action updateComponent
    dispatch(updateComponent({
      id: componentId,
      ...updatedData,
    }));
    console.log('[hook] component updated:', componentId);
  };

  // Устаревший метод, использующий setComponents - оставлен для совместимости
  const setAllComponents = (components) => {
    dispatch(setComponents(components));
  };

  return {
    addComponent: addComponentHandler,
    addComponents: addComponentsHandler,
    removeComponent: removeComponentHandler,
    updateComponent: updateComponentHandler,
    setComponents: setAllComponents,
  };
};
