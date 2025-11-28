/** @jsxImportSource @emotion/react */
import React from 'react';
import { useChangeProperty } from '../model';
import { POSITION_MODES } from '../model';
import { Spacing } from './components/Spacing';
import { PositionMap } from './components/PositionMap';

export const PositionControl = () => {
  const { currentMode } = useChangeProperty();

  const isSticky = currentMode === POSITION_MODES.STICKY;
  const isFree = currentMode === POSITION_MODES.FREE;
  const isFixed = currentMode === POSITION_MODES.FIXED;
  const isStatic = currentMode === POSITION_MODES.STATIC;
  const isAuto = currentMode === POSITION_MODES.AUTO;

  if (isSticky) {
    return (
      <Spacing>
        <PositionMap mapVisible={false} />
      </Spacing>
    );
  }

  if (!isStatic && !isAuto) {
    return (
      <Spacing>
        <PositionMap />
      </Spacing>
    );
  }

  return null;
};
