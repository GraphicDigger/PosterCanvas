/** @jsxImportSource @emotion/react */
import React from 'react';
import { Spacing } from '../uiControls/positionControl/ui/components/absolute/Spacing';
import { PositionMap } from '../uiControls/positionControl/ui/components/absolute/PositionMap';

export const Sticky = () => {
  return (
    <Spacing>
      <PositionMap mapVisible={false} />
    </Spacing>
  );
};
