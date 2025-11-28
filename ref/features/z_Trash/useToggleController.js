import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectorStateEntityContextConnector,
  setIsOpenEntityContextConnector,
  toggleIsOpenEntityContextConnector,
  setIsOpenContextList,
  toggleIsOpenContextList,
} from '../store';

export const useToggleContextConnector = () => {
  const dispatch = useDispatch();

  const viewers = {
    contextPanel: 'context-panel',
    contextPicker: 'context-picker',
    entityManagePanel: 'entity-manage-panel',
  };

  const { isOpenEntityContextConnector, isOpenContextList } = useSelector(selectorStateEntityContextConnector);

  const handleOpenContextConnector = useCallback(() => {
    dispatch(setIsOpenEntityContextConnector(true));
  }, [dispatch]);

  const handleCloseContextConnector = useCallback(() => {
    dispatch(setIsOpenEntityContextConnector(false));
  }, [dispatch]);

  const handleToggleContextConnector = useCallback(() => {
    dispatch(toggleIsOpenEntityContextConnector());
  }, [dispatch]);

  const handleOpenContextList = useCallback(() => {
    dispatch(setIsOpenContextList());
  }, [dispatch]);

  const handleCloseContextList = useCallback(() => {
    dispatch(setIsOpenContextList(false));
  }, [dispatch]);

  const handleToggleContextList = useCallback(() => {
    dispatch(toggleIsOpenContextList());
  }, [dispatch]);

  return {
    viewers,
    isOpenEntityContextConnector,
    openConnector: handleOpenContextConnector,
    closeConnector: handleCloseContextConnector,
    toggleConnector: handleToggleContextConnector,
    isOpenContextList,
    closeContextList: handleCloseContextList,
    openContextList: handleOpenContextList,
    toggleContextList: handleToggleContextList,

  };
};
