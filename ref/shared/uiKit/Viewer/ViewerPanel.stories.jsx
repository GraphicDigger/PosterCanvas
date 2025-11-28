import React, { useState } from 'react';
import {
  ViewerPanel,
  ViewerPanelHeader,
  ViewerPanelBody,
  Viewer,
  ViewerWindow,
  ViewerTrigger,
  ViewerProvider,
  CenterSlot,
  RightSlot,
  LeftSlot,
} from '.';
import { ButtonTool, ButtonToolGroup } from '@/shared/uiKit/ButtonTool';
import { Button } from '@/shared/uiKit/Button';
import { Text } from '@/shared/uiKit/Text';
import { Stack } from '@/shared/uiKit/Stack';
import { ReferenceIcon, CrossIcon, ArrowWithLegLeftIcon, ChatIcon, TaskIcon } from '@/shared/assets/icons';
import { Typography } from '@/shared/uiKit/Typography';
import styled from '@emotion/styled';

// используется в
// DatabaseContextConnector
// DatabaseManager (DataRecordEditor, DataModelEditor)
// TaskManager
// ProjectSettings (General, APIs etc.)
//

// триггер может просто открывать панель или открывать панель вместе с переданным контентом
// TODO добавить случай когда можно отправить данные через
// TODO добавить группы (когда нужно в контексте одного окна обрабатывать разные viewers)

export default {
  title: 'uiKit/Viewer',
  component: Viewer,
};

// basic viewer with one panel
export const BasicViewer = () => {
  return (
    <ViewerProvider mode="single">

      <Stack spacing={2} align="center" justify="center">
        <ViewerTrigger step={1} data={{ id: 1, name: 'Step 1 content' }}>
          <Button variant="filled" color="primary">Basic Viewer. Start</Button>
        </ViewerTrigger>
      </Stack>

      <Viewer>
        <ViewerWindow step={1}>
          <ViewerPanelDemo title="Step 1" step={1} stop />
        </ViewerWindow>
      </Viewer>

    </ViewerProvider>
  );
};

// Последовательная навигация (sequential mode)
export const SequentialNavigationWithSkipSteps = () => {
  return (
    <ViewerProvider mode="sequential">
      <Stack spacing={2} align="center" justify="center">
        <ViewerTrigger step={1} data={{ id: 1, name: 'Step 1 content' }}>
          <Button variant="filled" color="primary">Sequential Navigation. Start</Button>
        </ViewerTrigger>
      </Stack>

      <Viewer>
        <ViewerWindow step={1}>
          <ViewerPanelDemo title="Step 1" step={1}/>
        </ViewerWindow>
        <ViewerWindow step={2}>
          <ViewerPanelDemo title="Step 2" step={2} />
        </ViewerWindow>
        <ViewerWindow step={3}>
          <ViewerPanelDemo title="Step 3" step={3} anchor="none" stop />
        </ViewerWindow>
      </Viewer>

    </ViewerProvider>
  );
};

// Последовательная навигация (sequential mode)
export const SkipSteps = () => {
  return (
    <ViewerProvider mode="sequential">
      <Stack spacing={2} align="center" justify="center">
        <ViewerTrigger step={1} data={{ id: 1, name: 'Step 1 content' }}>
          <Button variant="filled" color="primary">Sequential Navigation. Start</Button>
        </ViewerTrigger>
      </Stack>

      <Viewer>
        <ViewerWindow step={1}>
          <ViewerPanelDemo title="Step 1" step={1} skipStep />
        </ViewerWindow>
        <ViewerWindow step={2}>
          <ViewerPanelDemo title="Step 2" step={2} />
        </ViewerWindow>
        <ViewerWindow step={3}>
          <ViewerPanelDemo title="Step 3" step={3} anchor="none" stop />
        </ViewerWindow>
      </Viewer>

    </ViewerProvider>
  );
};

// Одиночная навигация (single mode)
export const SingleNavigation = () => {
  return (
    <ViewerProvider mode="single">
      <Stack spacing={2} align="center" justify="center">
        <ViewerTrigger step={1} data={{ id: 1, name: 'Step 1 content' }}>
          <Button variant="filled" color="primary">Single Navigation. Open Panel</Button>
        </ViewerTrigger>
      </Stack>

      <Viewer>
        <ViewerWindow step={1}>
          <ViewerPanelDemo title="Step 1" step={1} />
        </ViewerWindow>
        <ViewerWindow step={2}>
          <ViewerPanelDemo title="Step 2" step={2} />
        </ViewerWindow>
        <ViewerWindow step={3}>
          <ViewerPanelDemo title="Step 3" step={3} stop />
        </ViewerWindow>
      </Viewer>
    </ViewerProvider>
  );
};

// Viewer без backdrop
export const WithoutBackdrop = () => {
  return (
    <ViewerProvider mode="single">
      <Stack spacing={2} align="center" justify="center">
        <ViewerTrigger step={1} data={{ id: 1, name: 'Step 1 content' }}>
          <Button variant="filled" color="primary">Открыть панель</Button>
        </ViewerTrigger>
      </Stack>

      <Viewer backdrop={false} position="right">
        <ViewerWindow step={1}>
          <ViewerPanelDemo title="Step 1" step={1} anchor="right" stop />
        </ViewerWindow>
      </Viewer>
    </ViewerProvider>
  );
};

const ViewerPanelDemo = ({
  title,
  step,
  anchor = 'left',
  stop = false,
  skipStep = false,
}) => {

  return (
    <ViewerPanel anchor={anchor}>
      <ViewerPanelHeader title={title}>
        {skipStep && (
          <RightSlot>
            <ViewerTrigger step={3} data={{ id: step, name: `Step ${step} content` }}>
              <ButtonTool>
                <ReferenceIcon />
              </ButtonTool>
            </ViewerTrigger>
          </RightSlot>
        )}
      </ViewerPanelHeader>
      <ViewerPanelBody>
        <Stack align="center" justify="center" gap={4}>
          <Typography variant="body.xsmall">Step {step} content</Typography>
          {!stop && (
            <ViewerTrigger step={step + 1} data={{ id: step + 1, name: `Step ${step + 1} content` }}>
              <Button variant="filled" color="default">Next step</Button>
            </ViewerTrigger>
          )}
        </Stack>
      </ViewerPanelBody>
    </ViewerPanel>
  );
};
