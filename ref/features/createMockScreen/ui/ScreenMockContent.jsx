import React from 'react';
import { useScreens } from '../../../entities/uiScreen';
import { screenMap } from '../model';

export const ScreenMockContent = () => {

  const { selectedScreen } = useScreens();

  const screen = screenMap.find(screen => screen.name === selectedScreen?.name);

  return (
    <>
      {screen && <screen.component />}
    </>
  );
};
