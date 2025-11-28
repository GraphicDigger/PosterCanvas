/** @jsxImportSource @emotion/react */
import React from 'react';
import { SectionPanel, SectionPanelBody, SectionPanelHeader, SectionPanelName } from '../../../../shared/uiKit/SectionPanel';
import { useTheme } from '@emotion/react';
import { useScreens, ScreenListItem } from '../../../../entities/uiScreen';
import { List } from '../../../../shared/uiKit/List';
import { Box } from '../../../../shared/uiKit/Box';

export const ScreenList = () => {

  const { allScreens } = useScreens();

  return (
    <SectionPanel dividerBottom>
      <SectionPanelHeader>
        <SectionPanelName>Screen Settings</SectionPanelName>
      </SectionPanelHeader>
      <SectionPanelBody>
        <List gap='0'>
          {allScreens.map((screen) => (
            <ScreenListItem
              key={screen.id}
              screen={screen}
              endSlot={false}
            />
          ))}
        </List>
      </SectionPanelBody>
    </SectionPanel>

  );
};
