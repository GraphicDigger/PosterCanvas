/** @jsxImportSource @emotion/react */
import React, { useMemo, useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { useTheme } from '@emotion/react';
import { MapCell } from './FlexMapCell';
import { Divider } from '../../../../../shared/uiKit/Divider';
import { POSITION, useLayout, useFlex } from '../../model';
import { useElement, DIRECTION, WRAP } from '../../../../../entities/uiElement';
import { useBoundVariableValue } from '../../../../../entities/binding';
import { BindVariableToPropertyPicker } from '../../../../../entities/binding';

export const Map = () => {
  const theme = useTheme();
  const { selectedCells } = useLayout();
  const { flexDirectionValue, justifyContentValue, flexWrapValue, alignItemsValue } = useFlex();

  const flexMap = useMemo(() => {
    return Object.values(POSITION).map((cell) => (
      <MapCell
        key={cell}
        cell={cell}
        selected={selectedCells.includes(cell)}
      />
    ));
  }, [selectedCells]);

  return (
    <StyledFlexMap>
      <StyledGrid>
        {flexMap}
      </StyledGrid>
      {flexDirectionValue?.value === DIRECTION.row && flexWrapValue?.value !== WRAP.wrap && (
        <>
          <Divider top={20} bottom color={theme.sys.color.outline.default} />
          <Divider top={40} bottom color={theme.sys.color.outline.default} />
        </>
      )}
      {flexDirectionValue?.value === DIRECTION.column && (
        <>
          <Divider orientation='vertical' left={20} top={-1} color={theme.sys.color.outline.default} />
          <Divider orientation='vertical' left={40} top={-1} color={theme.sys.color.outline.default} />
        </>
      )}
    </StyledFlexMap>
  );
};

const StyledFlexMap = styled.div`
    width: 60px;
    height: 60px;
    border-radius: 8px;
    outline: 1px solid ${({ theme }) => theme.sys.color.outline.default};
    position: relative;
    z-index: 1;
`;

const StyledGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    justify-items: center;
    align-items: center;
`;
