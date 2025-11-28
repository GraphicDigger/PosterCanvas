import { useScreenMutation } from '@/entities/uiScreen';
import { useScreenStates } from '@/entities/uiScreen';
import { useDesignMode } from '@/entities/mode/editorMode';
import { useFocusEntity } from '@/entities/uiFocus';

export const useScreenControl = () => {

  const { addScreen } = useScreenMutation();
  const { handleSelect } = useScreenStates();
  const { toggleCodeInDesignMode } = useDesignMode();
  const { resetFocused } = useFocusEntity();

  const handleOpenCode = (screenId) => {
    handleSelect(screenId);
    toggleCodeInDesignMode();
    resetFocused();
  };

  return {
    addScreen,
    openCode: handleOpenCode,
  };
};
