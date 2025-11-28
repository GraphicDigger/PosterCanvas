import { useDispatch, useSelector } from 'react-redux';
import { useCallback } from 'react';
import { MEMBERS_MODES } from '../constants/workspaceModes';
import {
  setWSMembersMode,
  setWSMembersModes,
  resetWSMembersMode,
  resetWSMembersModes,
  setWSDetailMode,
  toggleWSListActivity,
  selectIsWSMembersListMode,
  selectIsWSMembersActivityMode,
  selectIsWSMembersDetailMode,
} from '../store';


export const useWSMembersMode = () => {
  const dispatch = useDispatch();

  // Селекторы состояний
  const isWSMembersListMode = useSelector(selectIsWSMembersListMode);
  const isWSMembersActivityMode = useSelector(selectIsWSMembersActivityMode);
  const isWSMembersDetailMode = useSelector(selectIsWSMembersDetailMode);

  // Установка нескольких режимов одновременно
  const setMultipleWSMembersModes = useCallback((modes) => {
    dispatch(setWSMembersModes(modes));
  }, [dispatch]);

  // Сброс всех режимов к начальным значениям
  const resetAllWSMembersModes = useCallback(() => {
    dispatch(resetWSMembersModes());
  }, [dispatch]);

  // Установка основных режимов (только один активен)
  const setWSMembersListMode = useCallback(() => {
    dispatch(setWSMembersMode(MEMBERS_MODES.LIST));
  }, [dispatch]);

  const setWSMembersActivityMode = useCallback(() => {
    dispatch(setWSMembersMode(MEMBERS_MODES.ACTIVITY));
  }, [dispatch]);

  // Установка дополнительного режима (может быть активен вместе с основными)
  const setWSMembersDetailMode = useCallback(() => {
    dispatch(setWSDetailMode());
  }, [dispatch]);

  // Сброс конкретных режимов
  const resetWSMembersListMode = useCallback(() => {
    dispatch(resetWSMembersMode(MEMBERS_MODES.LIST));
  }, [dispatch]);

  const resetWSMembersActivityMode = useCallback(() => {
    dispatch(resetWSMembersMode(MEMBERS_MODES.ACTIVITY));
  }, [dispatch]);

  const resetWSMembersDetailMode = useCallback(() => {
    dispatch(resetWSMembersMode(MEMBERS_MODES.DETAIL));
  }, [dispatch]);

  const toggleWSMembersListActivity = useCallback(() => {
    dispatch(toggleWSListActivity());
  }, [dispatch]);

  return {
    // Состояния
    isWSMembersListMode,
    isWSMembersActivityMode,
    isWSMembersDetailMode,

    // Установка нескольких режимов
    setMultipleWSMembersModes,

    // Установка основных режимов
    setWSMembersListMode,
    setWSMembersActivityMode,

    // Установка дополнительного режима
    setWSMembersDetailMode,

    // Сброс режимов
    resetAllWSMembersModes,
    resetWSMembersListMode,
    resetWSMembersActivityMode,
    resetWSMembersDetailMode,

    toggleWSMembersListActivity,
  };
};
