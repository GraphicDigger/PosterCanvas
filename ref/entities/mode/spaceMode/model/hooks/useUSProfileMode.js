import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { PROFILE_MODES } from '../constants/userspaceMode';
import {
  setUSProfileMode,
  setUSProfileModes,
  resetUSProfileMode,
  resetUSProfileModes,
  toggleUSExperienceSkills,
  selectUSProfileModes,
  selectIsUSProfileExperienceMode,
  selectIsUSProfileSkillsMode,
} from '../store';

export const useUSProfileMode = () => {
  const dispatch = useDispatch();

  // Селекторы состояний
  const usProfileModes = useSelector(selectUSProfileModes);
  const isUSExperienceMode = useSelector(selectIsUSProfileExperienceMode);
  const isUSSkillsMode = useSelector(selectIsUSProfileSkillsMode);

  // Установка нескольких режимов одновременно
  const setMultipleUSProfileModes = useCallback((modes) => {
    dispatch(setUSProfileModes(modes));
  }, [dispatch]);

  // Сброс всех режимов к начальным значениям
  const resetAllUSProfileModes = useCallback(() => {
    dispatch(resetUSProfileModes());
  }, [dispatch]);

  // Установка основных режимов
  const setUSExperienceMode = useCallback(() => {
    dispatch(setUSProfileMode(PROFILE_MODES.EXPERIENCE));
  }, [dispatch]);

  const setUSSkillsMode = useCallback(() => {
    dispatch(setUSProfileMode(PROFILE_MODES.SKILLS));
  }, [dispatch]);

  // Сброс конкретных режимов
  const resetUSExperienceMode = useCallback(() => {
    dispatch(resetUSProfileMode(PROFILE_MODES.EXPERIENCE));
  }, [dispatch]);

  const resetUSSkillsMode = useCallback(() => {
    dispatch(resetUSProfileMode(PROFILE_MODES.SKILLS));
  }, [dispatch]);

  // Переключение режимов
  const toggleUSExperienceSkillsMode = useCallback(() => {
    dispatch(toggleUSExperienceSkills());
  }, [dispatch]);

  return {
    // Состояния
    usProfileModes,
    isUSExperienceMode,
    isUSSkillsMode,

    // Установка нескольких режимов
    setMultipleUSProfileModes,

    // Установка основных режимов
    setUSExperienceMode,
    setUSSkillsMode,

    // Сброс режимов
    resetAllUSProfileModes,
    resetUSExperienceMode,
    resetUSSkillsMode,

    // Переключение режимов
    toggleUSExperienceSkillsMode,
  };
};
