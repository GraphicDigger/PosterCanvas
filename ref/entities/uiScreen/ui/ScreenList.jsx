/** @jsxImportSource @emotion/react */
import React from 'react';
import { List } from '../../../shared/uiKit/List';
import { useScreens } from '../model';
import { ScreenListItem } from './ScreenListItem';
import { OpenCodeButton } from '../../../features/uiControls';

export const ScreenList = ({ endSlot, ...props }) => {

  const { allScreens } = useScreens();

  const Component = endSlot ? endSlot : undefined;

  return (
    <List gap='0'>
      {allScreens.map((screen) => (
        <ScreenListItem
          key={screen.id}
          screen={screen}
          endSlot={<Component entity={screen} />}
          {...props}
        />
      ))}
    </List>

  );
};
