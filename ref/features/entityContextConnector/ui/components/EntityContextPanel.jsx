/** @jsxImportSource @emotion/react */
import React, { useMemo, useRef } from 'react';
import styled from '@emotion/styled';
import { useState } from 'react';
import { css } from '@emotion/react';
import { Surface } from '@/shared/uiKit/Surface';
import { Backdrop } from '@/shared/uiKit/Backdrop';
import { ResizableWrapper } from '@/shared/uiKit/ResizableWrapper';
import { Stack } from '@/shared/uiKit/Stack';
import { CrossIcon, ArrowWithLegLeftIcon, ReferenceIcon, ChatIcon, TaskIcon } from '@/shared/assets/icons';
import { ButtonTool } from '@/shared/uiKit/ButtonTool';
import { Text } from '@/shared/uiKit/Text';
import { SearchInput } from '@/shared/uiKit/SearchInput';
import { PlusIcon } from '@/shared/assets/icons';
import { Button } from '@/shared/uiKit/Button';
import { ItemCard, CardAvatar, CardTitle, CardSubtitle } from '@/shared/uiKit/ItemCard';
import { List } from '@/shared/uiKit/List';
import { Scrollbar } from '@/shared/uiKit/Scrollbar';
import { Divider } from '@/shared/uiKit/Divider';
import { DocumentCardListItem } from '@/entities/document';
import { ChatCardListItem } from '@/entities/chat';
import { TaskCardListItem } from '@/entities/task';
import { ContextList } from './ContextList';
import { useEntityContextConnector } from '../../model';
import { CreateContextButton } from './CreateContextButton';
import { ViewerPanel, ViewerPanelHeader, RightSlot, ViewerPanelBody } from '@/shared/uiKit/Viewer';
import { ViewerTrigger } from '@/shared/uiKit/Viewer';


export const EntityContextPanel = ({ entity }) => {
  const contextItems = entity?.context;

  return (
    <ViewerPanel anchor='left'>
      <ViewerPanelHeader title={'Context'}>
        <RightSlot>
          <ViewerTrigger
            step={2}
            groupId="entityContextConnector"
          >
            <ButtonTool>
              <ReferenceIcon />
            </ButtonTool>
          </ViewerTrigger>
        </RightSlot>
      </ViewerPanelHeader>
      <ViewerPanelBody>
        <ContextList
          contextItems={contextItems}
          actionSlot={false}
        />
      </ViewerPanelBody>
    </ViewerPanel>
  );
};

