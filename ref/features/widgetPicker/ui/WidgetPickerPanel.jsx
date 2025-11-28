/** @jsxImportSource @emotion/react */
import React from 'react';
import { ViewerPanel, ViewerPanelHeader, ViewerPanelBody, RightSlot } from '@/shared/uiKit/Viewer';
import { SearchIcon } from '@/shared/assets/icons';
import { ButtonTool } from '@/shared/uiKit/ButtonTool';
import { AuthWidget } from './components/WidgetPrew';
import { SubscribeWidget } from './components/subscribeWidget';
import { Grid } from '@/shared/uiKit/Grid';
import { UiDefaultWidgetPreviewCardList } from '@/features/widgetPicker/ui/components/UIDefaultWidgetPreviewCardList';
import { useDefaultWidgets } from '@/shared/uiEditorDefaults/widgets';

export const WidgetPickerPanel = ({ onClose }) => {

  const { allDefaultWidgets } = useDefaultWidgets();

  return (
    <ViewerPanel anchor='right' >
      <ViewerPanelHeader title='Widgets'>
        <RightSlot>
          <ButtonTool>
            <SearchIcon />
          </ButtonTool>
        </RightSlot>
      </ViewerPanelHeader>
      <ViewerPanelBody>
        <Grid
          container
          columns={3}
          spacing={2}
          autoFill
          minmax={{ min: '150px', max: '1fr' }}
        >
          <UiDefaultWidgetPreviewCardList />
        </Grid>
      </ViewerPanelBody>
    </ViewerPanel>
  );
};

