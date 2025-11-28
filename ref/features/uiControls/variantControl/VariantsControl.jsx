import React from 'react';
import { useSelector } from 'react-redux';

import { SectionPanel, SectionPanelHeader, SectionPanelName, SectionPanelBody } from '../../../shared/uiKit/SectionPanel';
import { ButtonTool } from '../../../shared/uiKit/ButtonTool';
import { PlusIcon } from '../../../shared/assets/icons';
import { selectSelectedComponent } from '../../../entities/uiComponent';
import { selectVariantsByComponentId } from '../../../entities/uiVariant';
import { EVariant } from '../../../entities/uiVariant';
import { Divider } from '../../../shared/uiKit/Divider';
import { lineColors } from '../../../shared/styles';

export const VariantsControl = () => {
  const selectedComponent = useSelector(selectSelectedComponent);
  const variants = useSelector(state => selectVariantsByComponentId(state, selectedComponent.id));


  return (
    <SectionPanel dividerBottom >
      <SectionPanelHeader>
        <SectionPanelName>Variants</SectionPanelName>
        <ButtonTool>
          <PlusIcon />
        </ButtonTool>
      </SectionPanelHeader>
      {variants.length > 0 && (
        <SectionPanelBody>
          {variants.map((variant) => (
            <EVariant id={variant.id} name={variant.name} />
          ))}
        </SectionPanelBody>
      )}
    </SectionPanel>
  );
};
