import React from 'react';
import { Scrollbar } from '../../../../shared/uiKit/Scrollbar';
import { SectionPanel, SectionPanelHeader, SectionPanelBody, SectionPanelName } from '../../../../shared/uiKit/SectionPanel';
import { ScreenPreviewCard, useScreens } from '../../../../entities/uiScreen';
import { PreviewCardList } from '../../../../shared/uiKit/PreviewCard';

export const ScreenList = () => {

  const { allScreens } = useScreens();

  return (
    <Scrollbar>
      <SectionPanel >
        <PreviewCardList columns={1}>
          {allScreens.map((screen) => (
            <ScreenPreviewCard
              key={screen.id}
              screen={screen}
            />
          ))}
        </PreviewCardList>
      </SectionPanel>
    </Scrollbar>
  );
};
