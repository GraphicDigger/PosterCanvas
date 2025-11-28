import { useDispatch, useSelector } from 'react-redux';
import { useCallback } from 'react';
import { SETTINGS_MODES } from '../constants/workspaceModes';
import {
  setWSSettingsMode,
  setWSSettingsModes,
  resetWSSettingsMode,
  resetWSSettingsModes,
  toggleWSSettingsGeneralPosition,
  toggleWSSettingsPositionRoles,
  toggleWSSettingsRolesGeneral,
  setWSSettingsDetailMode,
  resetWSSettingsDetailMode,
  toggleWSSettingsDetailMode,
  selectIsWSSettingsGeneralMode,
  selectIsWSSettingsPositionMode,
  selectIsWSSettingsRolesMode,
  selectIsWSSettingsDetailMode,
} from '../store';

export const useWSSettingsMode = () => {
  const dispatch = useDispatch();

  // Селекторы состояний
  const isWSSettingsGeneralMode = useSelector(selectIsWSSettingsGeneralMode);
  const isWSSettingsPositionMode = useSelector(selectIsWSSettingsPositionMode);
  const isWSSettingsRolesMode = useSelector(selectIsWSSettingsRolesMode);
  const isWSSettingsDetailMode = useSelector(selectIsWSSettingsDetailMode);

  // Установка нескольких режимов одновременно
  const setMultipleWSSettingsModes = useCallback((modes) => {
    dispatch(setWSSettingsModes(modes));
  }, [dispatch]);

  // Сброс всех режимов к начальным значениям
  const resetAllWSSettingsModes = useCallback(() => {
    dispatch(resetWSSettingsModes());
  }, [dispatch]);

  // Установка основных режимов (только один активен)
  const setWSSettingsGeneralMode = useCallback(() => {
    dispatch(setWSSettingsMode(SETTINGS_MODES.GENERAL));
  }, [dispatch]);

  const setWSSettingsPositionMode = useCallback(() => {
    dispatch(setWSSettingsMode(SETTINGS_MODES.POSITION));
  }, [dispatch]);

  const setWSSettingsRolesMode = useCallback(() => {
    dispatch(setWSSettingsMode(SETTINGS_MODES.ROLES));
  }, [dispatch]);

  // Установка режима DETAIL (может быть активен вместе с другими)
  const handleSetWSSettingsDetailMode = useCallback(() => {
    dispatch(setWSSettingsDetailMode());
  }, [dispatch]);

  // Сброс конкретных режимов
  const resetWSSettingsGeneralMode = useCallback(() => {
    dispatch(resetWSSettingsMode(SETTINGS_MODES.GENERAL));
  }, [dispatch]);

  const resetWSSettingsPositionMode = useCallback(() => {
    dispatch(resetWSSettingsMode(SETTINGS_MODES.POSITION));
  }, [dispatch]);

  const resetWSSettingsRolesMode = useCallback(() => {
    dispatch(resetWSSettingsMode(SETTINGS_MODES.ROLES));
  }, [dispatch]);

  const handleResetWSSettingsDetailMode = useCallback(() => {
    dispatch(resetWSSettingsDetailMode());
  }, [dispatch]);

  // Переключение режимов
  const toggleWSSettingsGeneralPositionMode = useCallback(() => {
    dispatch(toggleWSSettingsGeneralPosition());
  }, [dispatch]);

  const toggleWSSettingsPositionRolesMode = useCallback(() => {
    dispatch(toggleWSSettingsPositionRoles());
  }, [dispatch]);

  const toggleWSSettingsRolesGeneralMode = useCallback(() => {
    dispatch(toggleWSSettingsRolesGeneral());
  }, [dispatch]);

  const handleToggleWSSettingsDetailMode = useCallback(() => {
    dispatch(toggleWSSettingsDetailMode());
  }, [dispatch]);

  return {
    // Состояния
    isWSSettingsGeneralMode,
    isWSSettingsPositionMode,
    isWSSettingsRolesMode,
    isWSSettingsDetailMode,
    // Установка нескольких режимов
    setMultipleWSSettingsModes,
    // Установка основных режимов
    setWSSettingsGeneralMode,
    setWSSettingsPositionMode,
    setWSSettingsRolesMode,
    setWSSettingsDetailMode: handleSetWSSettingsDetailMode,
    // Сброс режимов
    resetAllWSSettingsModes,
    resetWSSettingsGeneralMode,
    resetWSSettingsPositionMode,
    resetWSSettingsRolesMode,
    resetWSSettingsDetailMode: handleResetWSSettingsDetailMode,
    // Переключение режимов
    toggleWSSettingsGeneralPositionMode,
    toggleWSSettingsPositionRolesMode,
    toggleWSSettingsRolesGeneralMode,
    toggleWSSettingsDetailMode: handleToggleWSSettingsDetailMode,
  };
};
