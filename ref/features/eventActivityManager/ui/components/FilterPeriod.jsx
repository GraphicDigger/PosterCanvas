import React, { useEffect } from 'react';
import { SectionPanel, SectionPanelHeader, SectionPanelName, SectionPanelBody } from '../../../../shared/uiKit/SectionPanel';
import { ButtonTool } from '../../../../shared/uiKit/ButtonTool';
import { PlusIcon } from '../../../../shared/assets/icons';

export const FilterPeriod = () => {

  return (

    <SectionPanel dividerBottom >
      <SectionPanelHeader>
        <SectionPanelName>Period</SectionPanelName>
        <ButtonTool>
          <PlusIcon />
        </ButtonTool>
      </SectionPanelHeader>
      <SectionPanelBody>
                Filter
      </SectionPanelBody>
    </SectionPanel>


  );
};

