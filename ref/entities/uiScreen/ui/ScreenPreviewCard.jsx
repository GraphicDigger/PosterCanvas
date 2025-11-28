import React from 'react';
import styled from '@emotion/styled';
import { Empty } from '@/shared/uiKit/Empty';
import { PreviewCard } from '@/shared/uiKit/PreviewCard';


export const ScreenPreviewCard = ({ screen }) => {

  return (
    <>
      <PreviewCard title={screen.name}>
        <Empty />
      </PreviewCard>

    </>
  );
};
