import React from 'react';
import { PreviewCard } from './PreviewCard';
import { PreviewCardTopTitle } from './PreviewCardTitle';
import { PreviewCardBottomTitle } from './PreviewCardTitle';
import { PreviewCardContent } from './PreviewCardContent';
import { Empty } from '../Empty';
import imageOne from '../../../shared/assets/dummy/shifaaz-shamoon-sLAk1guBG90-unsplash.jpg';
import imageTwo from '../../../shared/assets/dummy/website_Contact.png';

import { Image } from '../Image';

export default {
  title: 'uiKit/PreviewCard',
  component: PreviewCard,
  parameters: {
    layout: 'padded',
  },
};

const Template = (args) => (
  <div style={{ width: '100%', display: 'flex', flexDirection: 'row', gap: '50px', justifyContent: 'center', alignItems: 'flex-end' }}>
    <div style={{ width: '200px' }}>
      <PreviewCard>
        <PreviewCardTopTitle>
                    fitHeight
        </PreviewCardTopTitle>
        <PreviewCardContent fitHeight>
          <Image src={imageOne} />
        </PreviewCardContent>
        <PreviewCardBottomTitle>
                    Bottom Title
        </PreviewCardBottomTitle>
      </PreviewCard>
    </div>
    <div style={{ width: '200px' }}>
      <PreviewCard>
        <PreviewCardTopTitle align="center">
                    fitWidth
        </PreviewCardTopTitle>
        <PreviewCardContent fitWidth>
          <Image src={imageTwo} />
        </PreviewCardContent>
        <PreviewCardBottomTitle align="center">
                    Bottom Title
        </PreviewCardBottomTitle>
      </PreviewCard>
    </div>
    <div style={{ width: '200px' }}>
      <PreviewCard>
        <PreviewCardTopTitle align="right">
                    default
        </PreviewCardTopTitle>
        <PreviewCardContent>
          <Image src={imageOne} />
        </PreviewCardContent>
        <PreviewCardBottomTitle align="left">
                    Different positioning
        </PreviewCardBottomTitle>
      </PreviewCard>
    </div>
    <div style={{ width: '200px' }}>
      <PreviewCard transparent>
        {/* <PreviewCardTopTitle align="center">
                    full
                </PreviewCardTopTitle> */}
        <PreviewCardContent fitHeight>
          <Image src={imageOne} />
        </PreviewCardContent>
        <PreviewCardBottomTitle align="center">
                    Card with transparent background
        </PreviewCardBottomTitle>
      </PreviewCard>
    </div>
  </div>
);

export const Default = Template.bind({});
Default.args = {};

