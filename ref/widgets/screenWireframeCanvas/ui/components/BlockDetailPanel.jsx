/** @jsxImportSource @emotion/react */
import React, { useMemo, useRef } from 'react';
import styled from '@emotion/styled';
import { useState } from 'react';
import { css } from '@emotion/react';
import { Surface } from '@/shared/uiKit/Surface';
import { ResizableWrapper } from '@/shared/uiKit/ResizableWrapper';
import { Stack } from '@/shared/uiKit/Stack';
import { CrossIcon, ArrowWithLegLeftIcon, ReferenceIcon, ChatIcon, TaskIcon, LibraryIcon } from '@/shared/assets/icons';
import { ButtonTool, ButtonToolGroup } from '@/shared/uiKit/ButtonTool';
import { Text } from '@/shared/uiKit/Text';
import { Button } from '@/shared/uiKit/Button';
import { ItemCard, CardAvatar, CardTitle, CardSubtitle } from '@/shared/uiKit/ItemCard';
import { List } from '@/shared/uiKit/List';
import { Scrollbar } from '@/shared/uiKit/Scrollbar';
import { DocumentCardListItem } from '@/entities/document';
import { ChatCardListItem } from '@/entities/chat';
import { useWireframe } from '../../models';
import { ViewerPanel, ViewerPanelHeader, RightSlot, ViewerPanelBody, ViewerTrigger } from '@/shared/uiKit/Viewer';


export const BlockDetailPanel = () => {

  const { selectedWireframeBlock } = useWireframe();

  return (
    <ViewerPanel anchor='right'>
      <ViewerPanelHeader
        title={selectedWireframeBlock?.name}
      >
        <RightSlot>
          <ButtonToolGroup fill={false}>
            <ViewerTrigger step={2} groupId="wireframeBlockDetail">
              <ButtonTool>
                <LibraryIcon />
              </ButtonTool>
            </ViewerTrigger>
          </ButtonToolGroup>
        </RightSlot>
      </ViewerPanelHeader>
      <ViewerPanelBody>
        <Text
          multiline
          editable
          singleClickEdit
          color='primary'
          size='large'
        >
          {selectedWireframeBlock?.detail?.text}
        </Text>
      </ViewerPanelBody>
    </ViewerPanel>

  );
};

