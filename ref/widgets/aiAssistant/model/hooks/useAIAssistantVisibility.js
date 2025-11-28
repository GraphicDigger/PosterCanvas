import { useDispatch, useSelector } from 'react-redux';
import {
  selectIsModelEnabled,
  selectIsAssistantOpen,
} from '../store/index';

import {
  toggleModelEnabled,
  setModelEnabled,
  toggleAssistant,
  setAssistantOpen,
} from '../store/index';

export const useAIAssistantVisibility = () => {
  const isModelEnabled = useSelector(selectIsModelEnabled);
  const isAssistantOpen = useSelector(selectIsAssistantOpen);

  const dispatch = useDispatch();

  // Функции для управления состоянием модели
  const handleToggleModel = () => {
    dispatch(toggleModelEnabled());
  };

  const handleSetModelEnabled = (isEnabled) => {
    dispatch(setModelEnabled(isEnabled));
  };

  // Функции для управления видимостью интерфейса ассистента
  const handleToggleAssistant = () => {
    dispatch(toggleAssistant());
  };

  const handleSetAssistantOpen = (isOpen) => {
    dispatch(setAssistantOpen(isOpen));
  };

  return {
    // Состояния
    isModelEnabled,
    isAssistantOpen,

    // Действия
    toggleModel: handleToggleModel,
    setModelEnabled: handleSetModelEnabled,
    toggleAssistant: handleToggleAssistant,
    setAssistantOpen: handleSetAssistantOpen,
  };
};
