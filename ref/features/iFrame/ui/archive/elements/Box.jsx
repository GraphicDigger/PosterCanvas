import React, { useMemo } from 'react';
import styled from '@emotion/styled';
import { useBoundVariableValue } from '@/entities/binding';
import { TextContent } from './TextContent';
import { UIRender } from '../UIRender';
import { ENTITY_KINDS } from '@/shared/constants';
import { useRenderEvents } from '@/entities/uiFocus';
import { DataRecordContext } from '../../../model';


export const Box = ({
  children,
  ui,
  disableClick,
}) => {

  const { styles, boundDataRecords } = useBoundVariableValue(ui.id);
  const eventHandlers = useRenderEvents(ui, disableClick);

  if (!ui || !ui.properties) {return null;}
  const { properties } = ui;

  const finalStyles = {
    ...properties.style,
    ...styles,
  };

  const render = useMemo(() => {

    if (boundDataRecords && boundDataRecords.length > 0) {
      return (
        <>
          {boundDataRecords.map(record => {
            const child = children[0];
            if (!child) {return null;}
            return (
              <DataRecordContext.Provider key={`${child.id}-${record.id}`} value={record}>
                <UIRender ui={child} />
              </DataRecordContext.Provider>
            );
          })}
        </>
      );
    }

    if (children && children.length > 0) {
      return (
        <>
          {children.map(child => {
            if (child.kind === ENTITY_KINDS.INSTANCE) {
              return (
                <UIRender key={child.id} ui={child} />
              );
            }
            return (
              <UIRender key={child.id} ui={child} />
            );
          })}
        </>
      );
    }
    return null;
  }, [boundDataRecords, children]);

  return (
    <StyledBox
      style={finalStyles}
      {...properties.attributes}
      data-ui-id={ui.id}
      {...eventHandlers}
    >
      <TextContent ui={ui} />
      {render}
    </StyledBox>
  );
};

const StyledBox = styled.div``;
