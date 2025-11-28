/** @jsxImportSource @emotion/react */
import React, { useMemo, useRef } from 'react';
import styled from '@emotion/styled';
import { useTheme, css } from '@emotion/react';
import { useState } from 'react';
import { ResizableWrapper } from '@/shared/uiKit/ResizableWrapper';
import { Stack } from '@/shared/uiKit/Stack';
import { SlotBar, RightSlot, LeftSlot, CenterSlot } from '@/shared/uiKit/SlotBar';
import { ArrowWithLegLeftIcon, ReferenceIcon, ChatIcon, TaskIcon } from '@/shared/assets/icons';
import { Text } from '@/shared/uiKit/Text';
import { SearchInput } from '@/shared/uiKit/SearchInput';
import { Button } from '@/shared/uiKit/Button';
import { List } from '@/shared/uiKit/List';
import { Scrollbar } from '@/shared/uiKit/Scrollbar';
import { Divider } from '@/shared/uiKit/Divider';
import { Typography } from '@/shared/uiKit/Typography';
import { ViewerPanelHeader } from './ViewerPanelHeader';
import { ViewerPanelBody } from './ViewerPanelBody';
import { useViewer, useViewerStep } from './model';
import { ButtonTool } from '@/shared/uiKit/ButtonTool';
import { CrossIcon } from '@/shared/assets/icons';


export const ViewerPanel = ({
  children,
  anchor = 'none', // left, right, none
  width = 500,
  ...props
}) => {

  const theme = useTheme();

  const slots = useMemo(() => {
    const result = {
      header: null,
      body: null,
    };
    React.Children.forEach(children, child => {
      if (!React.isValidElement(child)) {return;}
      if (child.type === ViewerPanelHeader) { result.header = child; }
      if (child.type === ViewerPanelBody) { result.body = child; }
    });
    return result;
  }, [children]);

  const divider = useMemo(() => {
    if (anchor === 'none') {return null;}
    return anchor === 'left'
      ? <Divider orientation='vertical' right top />
      : <Divider orientation='vertical' left top />;
  }, [anchor]);


  const content = useMemo(() => {
    return (
      <Stack
        backgroundColor={theme.sys.color.surface}
        onClick={(e) => e.stopPropagation()}
      >
        <Stack direction='row' align='center' justify='space-between'>
          {slots.header}
        </Stack>
        <Scrollbar>
          {slots.body}
        </Scrollbar>
        {divider}
      </Stack>
    );
  }, [slots, divider, theme]);

  if (anchor !== 'none') {
    return (
      <ResizableWrapper
        initialWidth={width}
        side={anchor === 'left' ? 'right' : 'left'}
        onClick={(e) => e.stopPropagation()}
        {...props}
      >
        {content}

      </ResizableWrapper>
    );
  }

  return content;

};

