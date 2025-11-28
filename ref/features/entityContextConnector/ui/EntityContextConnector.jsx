/** @jsxImportSource @emotion/react */
import React, { useMemo, useRef } from 'react';
import styled from '@emotion/styled';
import { useState } from 'react';
import { css } from '@emotion/react';
import { Surface } from '@/shared/uiKit/Surface';
import { SlotBar, RightSlot, LeftSlot, CenterSlot } from '@/shared/uiKit/SlotBar';
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
import { useEntityContextConnector } from '../model';
import { ContextList } from '@/entities/entityContextLink';
import { CreateContextButton } from './components/CreateContextButton';
import { EntityContextPanel } from './components/EntityContextPanel';
import { EntityContextPicker } from './components/EntityContextPicker';
import { ViewerTrigger, ViewerWindow, Viewer } from '@/shared/uiKit/Viewer';


export const EntityContextConnectorOpenButton = ({ entity }) => {


  return (
    <ViewerTrigger
      step={1}
      data={entity}
      groupId="entityContextConnector"
    >
      <ButtonTool>
        <ReferenceIcon />
      </ButtonTool>
    </ViewerTrigger>
  );
};

export const EntityContextConnector = ({ entity, children }) => {
  return (
    <Viewer
      backdrop={true}
      groupId="entityContextConnector"
    >
      <ViewerWindow step={1}>
        <EntityContextPanel entity={entity} />
      </ViewerWindow>

      <ViewerWindow step={2}>
        <EntityContextPicker entity={entity} />
      </ViewerWindow>

      <ViewerWindow step={3}>
        {children}
      </ViewerWindow>
    </Viewer>
  );
};
