/** @jsxImportSource @emotion/react */
import React from 'react';
import { EntityContextConnector } from '@/features/entityContextConnector';
import { MultiEntityManagePanel } from '@/features/multiEntityManagePanel';
import { ViewerProvider } from '@/shared/uiKit/Viewer';
import { useScreens } from '@/entities/uiScreen';

export const EntityContextManager = () => {

  const { selectedScreenWithContext } = useScreens();

  return (
    <EntityContextConnector entity={selectedScreenWithContext}>
      <MultiEntityManagePanel config={{ anchor: 'none', groupId: 'entityContextConnector' }} />
    </EntityContextConnector>
  );
};
