import { useCallback, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { componentFactory } from '../../lib/componentFactory';
import { useComponentMutation } from '../../../../entities/uiComponent';
import { useElementMutations } from '../../../../entities/uiElement';
import { usePropMutation, useProps } from '../../../../entities/varProp';
import { usePropValueMutation } from '../../../../entities/varPropValue';
import { useInstanceMutation } from '../../../../entities/uiInstance';
import { useCodeMutation } from '../../../../entities/code';
import { selectSelectedLibraryId, selectSelectedComponentsIds } from '../store/selectors';
import { uiLibraries } from '../../../../shared/uiMui';
import { muiComponents } from '../../../../shared/uiMui';
import { useComponentStates, useComponents } from '../../../../entities/uiComponent';
import { useDesignMode } from '../../../../entities/mode/editorMode';


export const useImportComponents = () => {
  const { selectedLibraryId, selectedComponentsIds } = useSelector(state => ({
    selectedLibraryId: selectSelectedLibraryId(state),
    selectedComponentsIds: selectSelectedComponentsIds(state),
  }));
  const { handleSelect } = useComponentStates();
  const { addComponent, updateComponent } = useComponentMutation();
  const { allComponents } = useComponents();
  const { allProps } = useProps();
  const { addProp, handleBindingPropsToComponent } = usePropMutation();
  const { addPropValue } = usePropValueMutation();
  const { addElement } = useElementMutations();
  const { addInstance } = useInstanceMutation();
  const { addCode } = useCodeMutation();
  const { setComponentCanvasInDesignMode } = useDesignMode();

  const handleImportComponents = useCallback(async () => {
    if (!selectedLibraryId || !selectedComponentsIds.length) {return [];}

    const libraryInfo = uiLibraries.find(lib => lib.id === selectedLibraryId);
    if (!libraryInfo) {return [];}

    // Создаем массив промисов для параллельной обработки компонентов
    const importPromises = selectedComponentsIds.map(async componentId => {
      const importedComponent = muiComponents.find(component => component.id === componentId);
      if (!importedComponent) {return null;}

      try {
        const componentData = await componentFactory(importedComponent, libraryInfo);
        if (!componentData) {return null;}

        const {
          component,
          props,
          propValues,
          codes,
          elements,
        } = componentData;

        console.log('[useImportComponents] codes: ', codes);


        const newComponent = addComponent(component);
        console.log('[useImportComponents] newComponent: ', newComponent);
        handleSelect(newComponent.id);
        setComponentCanvasInDesignMode();

        // Добавляем пропсы и связываем их с компонентом
        props.forEach(prop => {
          const addedProp = addProp(prop);
          handleBindingPropsToComponent(newComponent.id, addedProp.id);
        });

        // Добавляем значения пропсов
        propValues.forEach(propValue => {
          addPropValue(propValue);
        });

        // Добавляем код компонента
        codes.forEach(code => {
          addCode(code);
        });

        // Добавляем элементы компонента, если они есть
        if (elements && elements.length > 0) {
          elements.forEach(element => {
            addElement(element);
          });
        }

        return newComponent.id;
      } catch (error) {
        console.error(`Ошибка при импорте компонента ${importedComponent.name}:`, error);
        return null;
      }
    });

    // Ждем завершения всех промисов и фильтруем успешные результаты
    const importedComponentIds = (await Promise.all(importPromises)).filter(Boolean);

    return importedComponentIds;
  }, [
    selectedLibraryId,
    selectedComponentsIds,
    addPropValue,
    addComponent,
    addProp,
    addCode,
    addElement,
    handleBindingPropsToComponent,
    handleSelect,
    setComponentCanvasInDesignMode,
  ]);

  return {
    handleImportComponents,
  };
};
