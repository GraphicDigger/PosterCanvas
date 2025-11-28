import { useDispatch, useSelector } from 'react-redux';
import { setMode, resetMode, selectPresetManagerSidebarMode } from '../store';

export const usePresetManager = () => {
  const dispatch = useDispatch();

  const { sidebarMode } = useSelector(selectPresetManagerSidebarMode);

  const handleSetMode = (mode) => {
    dispatch(setMode(mode));
  };
  const handleResetMode = () => {
    dispatch(resetMode());
  };
  return {
    sidebarMode,
    setMode: handleSetMode,
    resetMode: handleResetMode,
  };
};
