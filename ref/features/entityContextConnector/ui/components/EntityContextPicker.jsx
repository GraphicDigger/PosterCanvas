/** @jsxImportSource @emotion/react */
import React, { useMemo, useRef } from 'react';
import styled from '@emotion/styled';
import { useState } from 'react';
import { css } from '@emotion/react';
import { Surface } from '@/shared/uiKit/Surface';
import { ResizableWrapper } from '@/shared/uiKit/ResizableWrapper';
import { Stack } from '@/shared/uiKit/Stack';
import { SearchInput } from '@/shared/uiKit/SearchInput';
import { PlusIcon } from '@/shared/assets/icons';
import { Scrollbar } from '@/shared/uiKit/Scrollbar';
import { Divider } from '@/shared/uiKit/Divider';
import { CreateContextButton } from './CreateContextButton';
import { useEntityContextConnector } from '../../model';
import { useClickOutside } from '@/shared/lib';
import { ViewerPanel, ViewerPanelHeader, RightSlot, ViewerPanelBody } from '@/shared/uiKit/Viewer';
import { ButtonTool, ButtonToolGroup } from '@/shared/uiKit/ButtonTool';
import { ContextList } from './ContextList';
import { SearchIcon } from '@/shared/assets/icons';


export const EntityContextPicker = ({ entity }) => {
  const { allDocuments, allTasks, allChats } = useEntityContextConnector();

  const entityId = entity?.id;
  const entityType = entity?.kind;
  const contextItems = useMemo(() => {
    return [
      ...allDocuments,
      ...allTasks,
      ...allChats,
    ];
  }, [allDocuments, allTasks]);

  return (
    <ViewerPanel anchor='left'>
      <ViewerPanelHeader title={'Context picker'}>
        <RightSlot>
          <ButtonToolGroup fill={false}>
            <ButtonTool>
              <SearchIcon />
            </ButtonTool>
            <CreateContextButton />
          </ButtonToolGroup>
        </RightSlot>
      </ViewerPanelHeader>
      <ViewerPanelBody>
        <ContextList
          contextItems={contextItems}
          entityId={entityId}
          entityType={entityType}
        />
      </ViewerPanelBody>
    </ViewerPanel>
  );
};

