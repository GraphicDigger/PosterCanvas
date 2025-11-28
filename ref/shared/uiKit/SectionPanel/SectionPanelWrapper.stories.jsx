import React from 'react';
import { SectionPanel } from './SectionPanel';
import { ThemeProvider } from '../../../app/providers';
import { SectionPanelHeader } from './SectionPanelHeader';
import { SectionPanelBody } from './SectionPanelBody';


const ThemeWrapper = (story) => (
  <ThemeProvider>
    {story()}
  </ThemeProvider>
);

export default {
  title: 'uiKit/SectionPanel',
  component: SectionPanel,
  decorators: [ThemeWrapper],
};


export const Default = () => (
  <div style={{ width: '250px', position: 'relative' }}>
    <SectionPanel>
      <SectionPanelHeader />
      <SectionPanelBody />
    </SectionPanel>
  </div>
);
