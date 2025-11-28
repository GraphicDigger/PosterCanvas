/** @jsxImportSource @emotion/react */
import React, { useCallback } from 'react';
import styled from '@emotion/styled';
import { useSelector } from 'react-redux';
import { useTheme } from '@emotion/react';
import { ENTITY_KINDS } from '../../../shared/constants';
import { CrossIcon } from '../../../shared/assets/icons';
import { ButtonTool } from '../../../shared/uiKit/ButtonTool';
import { Stack } from '../../../shared/uiKit/Stack';
import { SlotBar, RightSlot } from '../../../shared/uiKit/SlotBar';
import { useFocusEntity } from '../../../entities/uiFocus';
import { ComponentRenderer } from '../../../features/iFrame';
import { useDesignMode } from '../../../entities/mode/editorMode';
import { useComponents } from '../../../entities/uiComponent';
import { FrameComponentExample } from '../../../features/StackBlitzEditor/ui/FrameComponentExample';
import { useCodeStates } from '../../../entities/code';
import { StackBlitz } from '../../../features/StackBlitzEditor';
import { UIWrapper, UIRenderStrategy } from '../../../features/iFrame';
import { CommentControl } from '../../../features/commentControl';

export const ComponentCanvas = () => {

  const theme = useTheme();

  const { setFocused } = useFocusEntity();
  const { resetDesignModesToInitialState } = useDesignMode();
  const { selectedComponent } = useComponents();

  const handleComponentClick = useCallback(() => {
    if (!selectedComponent) { return; }
    setFocused({
      id: selectedComponent.id,
      kind: selectedComponent.kind,
    });
  }, [selectedComponent, setFocused]);

  const handleCloseComponentCanvas = React.useCallback(() => {
    resetDesignModesToInitialState();
  }, [resetDesignModesToInitialState]);

  if (!selectedComponent) { return null; }

  return (
    <Stack
      backgroundColor={theme.sys.color.surfaceContainer.low}
      onClick={handleComponentClick}
      direction='column'
      align='flex-start'
    >
      <SlotBar divider position='absolute'>
        <RightSlot>
          <ButtonTool onClick={handleCloseComponentCanvas}>
            <CrossIcon />
          </ButtonTool>
        </RightSlot>
      </SlotBar>
      <UIWrapper ui={selectedComponent} >
        <UIRenderStrategy
          ownershipType={ENTITY_KINDS.COMPONENT}
          ownerId={selectedComponent.id}
        />
        <CommentControl />
      </UIWrapper>
    </Stack>
  );
};
