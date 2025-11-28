import React, { useEffect } from 'react';
import { SectionPanel, SectionPanelHeader, SectionPanelName, SectionPanelBody } from '../../../../shared/uiKit/SectionPanel';
import { ButtonTool } from '../../../../shared/uiKit/ButtonTool';
import { PlusIcon } from '../../../../shared/assets/icons';

export const FilterModules = () => {

  return (

    <SectionPanel dividerBottom >
      <SectionPanelHeader>
        <SectionPanelName>Modules</SectionPanelName>
        {/* <ButtonTool>
                    <PlusIcon />
                </ButtonTool> */}
      </SectionPanelHeader>
      <SectionPanelBody>
                Filter
      </SectionPanelBody>
    </SectionPanel>


  );
};

