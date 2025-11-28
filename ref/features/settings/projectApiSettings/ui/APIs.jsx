import React from 'react';
import { Stack } from '@/shared/uiKit/Stack';
import { Viewer, ViewerWindow } from '@/shared/uiKit/Viewer';
import { ApiCategories, ApiConnector, CategoryApiList, ApiCall } from './components';

export const APIs = () => {

  return (
    <Viewer groupId='apiProjectSettings'>
      <ViewerWindow step={1}>
        <ApiCategories />
      </ViewerWindow>
      <ViewerWindow step={2}>
        <CategoryApiList />
      </ViewerWindow>
      <ViewerWindow step={3}>
        <ApiConnector />
      </ViewerWindow>
      <ViewerWindow step={4}>
        <ApiCall />
      </ViewerWindow>
    </Viewer>
  );
};
