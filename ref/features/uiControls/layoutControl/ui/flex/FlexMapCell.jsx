/** @jsxImportSource @emotion/react */
import React, { useMemo, useCallback } from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import PropTypes from 'prop-types';
import { useTheme } from '@emotion/react';
import { useElementMutations, useElement, JUSTIFY, ALIGN, STYLE_PROPERTIES, DIRECTION } from '../../../../../entities/uiElement';
import { getPositionDotInCell, getStyledStretchDot } from '../../lib';
import { useFlex, ALIGNMENT_MAP, POSITION } from '../../model';
import { useBoundVariableValue } from '../../../../../entities/binding';

const JUSTIFY_CONTENT = STYLE_PROPERTIES.justifyContent;
const ALIGN_ITEMS = STYLE_PROPERTIES.alignItems;

export const MapCell = ({ cell, selected }) => {
  const theme = useTheme()

  const { focusEntity, isAlignItemsStretch, flexDirectionValue, justifyContentValue, alignItemsValue } = useFlex();
  const { updateStyle } = useElementMutations();

  const isColumn = flexDirectionValue?.value === DIRECTION.column;

  // расположение точки в ячейке
  const positionDotInCell = useMemo(() =>
    getPositionDotInCell(
      cell,
      flexDirectionValue?.value,
      justifyContentValue?.value,
      alignItemsValue?.value,
    ),
    [justifyContentValue?.value, alignItemsValue?.value, flexDirectionValue?.value, cell],
  );

  const styledStretchDot = useCallback(() =>
    getStyledStretchDot(cell, flexDirectionValue?.value),
    [cell, flexDirectionValue?.value, isAlignItemsStretch],
  );


  // селектор метода каждой ячейки
  const handleUpdateFlexProperties = useCallback(() => {

    switch (cell) {
      case POSITION.TOP_LEFT:
        if (isColumn) {
          updateStyle(focusEntity?.id, {
            [JUSTIFY_CONTENT]: ALIGN.start,
            [ALIGN_ITEMS]: JUSTIFY.start,
          });
        } else {
          updateStyle(focusEntity?.id, {
            [JUSTIFY_CONTENT]: JUSTIFY.start,
            [ALIGN_ITEMS]: ALIGN.start,
          });
        }
        break;
      case POSITION.TOP_CENTER:
        if (isColumn) {
          updateStyle(focusEntity?.id, {
            [JUSTIFY_CONTENT]: ALIGN.start,
            [ALIGN_ITEMS]: JUSTIFY.center,
          });
        } else {
          updateStyle(focusEntity?.id, {
            [JUSTIFY_CONTENT]: JUSTIFY.center,
            [ALIGN_ITEMS]: ALIGN.start,
          });
        }
        break;
      case POSITION.TOP_RIGHT:
        if (isColumn) {
          updateStyle(focusEntity?.id, {
            [JUSTIFY_CONTENT]: ALIGN.start,
            [ALIGN_ITEMS]: JUSTIFY.end,
          });
        } else {
          updateStyle(focusEntity?.id, {
            [JUSTIFY_CONTENT]: JUSTIFY.end,
            [ALIGN_ITEMS]: ALIGN.start,
          });
        }
        break;
      case POSITION.CENTER_LEFT:
        if (isColumn) {
          updateStyle(focusEntity?.id, {
            [JUSTIFY_CONTENT]: ALIGN.center,
            [ALIGN_ITEMS]: JUSTIFY.start,
          });
        } else {
          updateStyle(focusEntity?.id, {
            [JUSTIFY_CONTENT]: JUSTIFY.start,
            [ALIGN_ITEMS]: ALIGN.center,
          });
        }
        break;
      case POSITION.CENTER_CENTER:
        if (isColumn) {
          updateStyle(focusEntity?.id, {
            [JUSTIFY_CONTENT]: ALIGN.center,
            [ALIGN_ITEMS]: JUSTIFY.center,
          });
        } else {
          updateStyle(focusEntity?.id, {
            [JUSTIFY_CONTENT]: JUSTIFY.center,
            [ALIGN_ITEMS]: ALIGN.center,
          });
        }
        break;
      case POSITION.CENTER_RIGHT:
        if (isColumn) {
          updateStyle(focusEntity?.id, {
            [JUSTIFY_CONTENT]: ALIGN.center,
            [ALIGN_ITEMS]: JUSTIFY.end,
          });
        } else {
          updateStyle(focusEntity?.id, {
            [JUSTIFY_CONTENT]: JUSTIFY.end,
            [ALIGN_ITEMS]: ALIGN.center,
          });
        }
        break;
      case POSITION.BOTTOM_LEFT:
        if (isColumn) {
          updateStyle(focusEntity?.id, {
            [JUSTIFY_CONTENT]: ALIGN.end,
            [ALIGN_ITEMS]: JUSTIFY.start,
          });
        } else {
          updateStyle(focusEntity?.id, {
            [JUSTIFY_CONTENT]: JUSTIFY.start,
            [ALIGN_ITEMS]: ALIGN.end,
          });
        }
        break;
      case POSITION.BOTTOM_CENTER:
        if (isColumn) {
          updateStyle(focusEntity?.id, {
            [JUSTIFY_CONTENT]: ALIGN.end,
            [ALIGN_ITEMS]: JUSTIFY.center,
          });
        } else {
          updateStyle(focusEntity?.id, {
            [JUSTIFY_CONTENT]: JUSTIFY.center,
            [ALIGN_ITEMS]: ALIGN.end,
          });
        }
        break;
      case POSITION.BOTTOM_RIGHT:
        if (isColumn) {
          updateStyle(focusEntity?.id, {
            [JUSTIFY_CONTENT]: ALIGN.end,
            [ALIGN_ITEMS]: JUSTIFY.end,
          });
        } else {
          updateStyle(focusEntity?.id, {
            [JUSTIFY_CONTENT]: JUSTIFY.end,
            [ALIGN_ITEMS]: ALIGN.end,
          });
        }
        break;
    }
  }, [cell, isColumn, updateStyle, focusEntity?.id]);

  return (
    <StyledLayoutCell
      onClick={handleUpdateFlexProperties}
      position={positionDotInCell}
    >
      {isAlignItemsStretch
        ? <StyledAlignItem
          selected={selected}
          cell={cell}
          styledStretchDot={styledStretchDot}
          theme={theme}
        />
        : <StyledDot
          selected={selected}
          theme={theme}
        />
      }
    </StyledLayoutCell>
  );
};


const StyledLayoutCell = styled.div`
    width: 20px;
    height: 20px;
    display: flex;
    cursor: pointer;
    position: relative;
    ${({ position }) => {
    if (ALIGNMENT_MAP[position]) {
      return css`
                    justify-content: ${ALIGNMENT_MAP[position].justifyContent};
                    align-items: ${ALIGNMENT_MAP[position].alignItems};
                `;
    }
    return css`
            justify-content: center;
            align-items: center;
        `;
  }}
`;

const StyledDot = styled.div`
    width: ${({ selected }) => selected ? '6px' : '2px'};
    height: ${({ selected }) => selected ? '6px' : '2px'};
    margin: ${({ selected }) => selected ? '0' : '2px'};
    border-radius: 50%;
    background: ${({ selected, theme }) =>
    selected ? theme.sys.color.primary : theme.sys.color.onSurfaceVariant};
    flex-shrink: 0;

`;

const StyledAlignItem = styled.div`
    ${({ selected, cell, styledStretchDot }) => selected
    ? styledStretchDot(cell)
    : css`
            width: 2px;
            height: 2px;
    `};
    background: ${({ selected, theme }) => selected ? theme.sys.color.primary : theme.sys.color.onSurfaceVariant};
`;


MapCell.propTypes = {
  cell: PropTypes.string,
  selected: PropTypes.bool,
};

