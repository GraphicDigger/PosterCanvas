import { useDispatch, useSelector } from 'react-redux';
import {
  selectorStateEntityManagePanel,
  setIsOpenEntityManagePanel,
  toggleIsOpenEntityManagePanel,
} from '../store';

export const useToggleEntityManagePanel = () => {
  const dispatch = useDispatch();

  const viewers = {
    entityManagePanel: 'entity-manage-panel',
  };

  const { isOpenEntityManagePanel } = useSelector(selectorStateEntityManagePanel);

  const handleOpenEntityManagePanel = () => {
    dispatch(setIsOpenEntityManagePanel(true));
  };

  const handleToggleEntityManagePanel = () => {
    dispatch(toggleIsOpenEntityManagePanel());
  };

  return {
    viewers,
    isOpenEntityManagePanel,
    openEntityManagePanel: handleOpenEntityManagePanel,
    toggleEntityManagePanel: handleToggleEntityManagePanel,


  };
};
