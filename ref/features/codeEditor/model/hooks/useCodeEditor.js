import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { useGlobalModes, useDesignMode } from '../../../../entities/mode/editorMode';

import { selectSelectedComponent } from '../../../../entities/uiComponent';
import { selectSelectedScreen } from '../../../../entities/uiScreen';
import { selectSelectedCode } from '../../../../entities/code';
import { selectCodesByComponentId, selectCodesByScreenId } from '../../../../entities/code';
import { updateCode } from '../../../../entities/code/model/store/slice';

import { selectCodeTabs, selectActiveCode, selectActiveCodeId } from '../store/codeEditor/selectors';
import { setCodeTabs, setActiveCodeId } from '../store/codeEditor/slice';


export const useCodeEditor = () => {
  const dispatch = useDispatch();

  const {
    isCodebaseModeGlobal,
  } = useGlobalModes();

  const {
    isComponentCanvasInDesignMode,
    isCodeInDesignMode,
    isScreenCanvasInDesignMode,
  } = useDesignMode();

  const selectedComponent = useSelector(selectSelectedComponent);
  const selectedScreen = useSelector(selectSelectedScreen);
  const selectedCode = useSelector(selectSelectedCode);

  const codeTabs = useSelector(selectCodeTabs);
  const activeCode = useSelector(selectActiveCode);
  const activeCodeId = useSelector(selectActiveCodeId);

  // 1. Получаем коды компонентов и экранов
  const componentCodes = useSelector(state =>
    selectedComponent ? selectCodesByComponentId(state, selectedComponent.id) : [],
  );
  const screenCodes = useSelector(state =>
    selectedScreen ? selectCodesByScreenId(state, selectedScreen.id) : [],
  );

  // 2. Обновляем табы
  useEffect(() => {
    const getNewTabs = () => {
      if (isComponentCanvasInDesignMode && componentCodes.length) {
        return componentCodes;
      }

      if (isScreenCanvasInDesignMode && screenCodes.length) {
        return screenCodes;
      }

      if (isCodeInDesignMode && selectedCode) {
        const codeExists = codeTabs.some(tab => tab.id === selectedCode.id);
        if (!codeExists) { return [selectedCode]; }
      }

      if (isCodebaseModeGlobal && selectedCode) {
        const codeExists = codeTabs.some(tab => tab.id === selectedCode.id);
        if (!codeExists) { return [selectedCode]; }
      }

      return [];
    };

    const newTabs = getNewTabs();
    if (newTabs.length > 0) {
      dispatch(setCodeTabs(newTabs));
    }
  }, [
    isComponentCanvasInDesignMode,
    isScreenCanvasInDesignMode,
    isCodeInDesignMode,
    componentCodes,
    screenCodes,
    selectedCode?.id,
    codeTabs,
    isCodebaseModeGlobal,
    dispatch,
  ]);

  // 3. Обновляем активный таб
  const handleTabChange = (id) => dispatch(setActiveCodeId(id));

  // Для отладки
  useEffect(() => {
    if (activeCode) {
    }
  }, [activeCode]);

  // 4. Функция для обновления содержимого кода
  const updateActiveCode = useCallback((newContent) => {
    if (activeCodeId && activeCode) {
      const updatedCode = {
        ...activeCode,
        content: newContent,
      };
      dispatch(updateCode(updatedCode));
    }
  }, [activeCodeId, activeCode, dispatch]);

  return {
    codeTabs,
    activeCode,
    activeTab: activeCode,
    handleTabChange,
    updateActiveCode,
  };
};
