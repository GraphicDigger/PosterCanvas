/** @jsxImportSource @emotion/react */
import React, { useState, useEffect, useCallback, useMemo, memo } from 'react';
import { SectionPanel, SectionPanelBody, SectionPanelHeader, SectionPanelName } from '../../../../shared/uiKit/SectionPanel';
import { Divider } from '../../../../shared/uiKit/Divider';
import { AddPropButton, ComponentPropControl } from '../../../../features/uiControls/propComponentControl';
import { useProps, EProp } from '../../../../entities/varProp';
import { usePropValueQueries } from '../../../../entities/varPropValue';
import { useComponents } from '../../../../entities/uiComponent';
import { PropList } from '../../../../entities/varProp';

export const PropPanel = memo(() => {

  return (
    <>
      <SectionPanel dividerBottom>
        <SectionPanelHeader>
          <SectionPanelName>Props</SectionPanelName>
          <AddPropButton />
        </SectionPanelHeader>
        <SectionPanelBody>
          <ComponentPropControl />
        </SectionPanelBody>
      </SectionPanel>
    </>

  );
});

