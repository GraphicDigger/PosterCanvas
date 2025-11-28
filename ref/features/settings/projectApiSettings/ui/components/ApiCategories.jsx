import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Surface } from '@/shared/uiKit/Surface';
import { SectionPanel, SectionPanelHeader, SectionPanelName, SectionPanelBody } from '@/shared/uiKit/SectionPanel';
import { ButtonTool } from '@/shared/uiKit/ButtonTool';
import { PlusIcon } from '@/shared/assets/icons';
import { SlotBar, LeftSlot } from '@/shared/uiKit/SlotBar';
import { Text } from '@/shared/uiKit/Text';
import { List, ListItem } from '@/shared/uiKit/List';
import {
  useApi,
  useApiQueries,
  ApiListItem,
  ApiCategoryListItem,
  useApiCategoryStates,
  useApiMutations,
} from '@/entities/api';
import { ViewerPanel, ViewerPanelHeader, ViewerPanelBody, RightSlot, ViewerTrigger } from '@/shared/uiKit/Viewer';


export const ApiCategories = () => {

  const { customApis, categoryApis, apiCategories, selectedApiId } = useApi();
  const { resetSelect: resetSelectedApi } = useApiCategoryStates();
  const { addApi } = useApiMutations();

  const handleResetSelectedApi = () => {
    resetSelectedApi();
  };

  const handleAddApi = () => {
    addApi();
  };

  return (
    <>
      <ViewerPanel
        minWidth={200}
        width={250}
        maxWidth={300}
        anchor='left'
      >
        <ViewerPanelHeader title='Connector'>
          <RightSlot>
            <ButtonTool onClick={() => handleAddApi()}>
              <PlusIcon />
            </ButtonTool>
          </RightSlot>
        </ViewerPanelHeader>
        <ViewerPanelBody>
          <List gap='0'>
            {customApis && customApis.length > 0 && (
              customApis.map(api => (
                <ViewerTrigger
                  key={api.id}
                  step={3}
                  groupId='apiProjectSettings'
                >
                  <ApiListItem
                    key={api.id}
                    id={api.id}
                    name={api.name}
                    onClick={() => handleResetSelectedApi()}
                  />
                </ViewerTrigger>

              ))
            )}
          </List>
          <SectionPanel>
            <SectionPanelHeader paddingHorizontal={4}>
              <SectionPanelName>Categories</SectionPanelName>
            </SectionPanelHeader>
            <SectionPanelBody paddingVertical={0} paddingHorizontal={0}>
              <List gap='0'>
                {apiCategories && apiCategories.length > 0
                  ? apiCategories.map(api => (
                    <ViewerTrigger
                      key={api.id}
                      step={2}
                      groupId='apiProjectSettings'
                    >
                      <ApiCategoryListItem
                        key={api.id}
                        id={api.id}
                        name={api.name}
                      />
                    </ViewerTrigger>
                  ))
                  : <ListItem> No categories found</ListItem>
                }
              </List>
            </SectionPanelBody>
          </SectionPanel>
        </ViewerPanelBody>
      </ViewerPanel>
    </>
  );
};
