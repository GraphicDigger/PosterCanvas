import React, { useCallback, useRef } from 'react';
import styled from '@emotion/styled';
import { Backdrop } from '../../../shared/uiKit/Backdrop';
import { useDataCollections } from '../../../../entities/dataCollection';
import { Stack } from '../../../shared/uiKit/Stack';
import { useDraftModel } from '../model';
import { Surface } from '../../../shared/uiKit/Surface';
import { useDataModelFields } from '../../../entities/dataModelField';
import { SectionPanel, SectionPanelHeader, SectionPanelName, SectionPanelBody } from '../../../shared/uiKit/SectionPanel';
import { DataModelFieldListItem } from '../../../entities/dataModelField';
import { FIELD_SETTINGS_COMPONENTS } from './components/fields';
import { TopBar } from './components/TopBar';
import { AddModelField } from './components/AddModelField';
import { DialogConfirmChanges } from '../../../shared/uiKit/DialogVariants';
import { Divider } from '../../../shared/uiKit/Divider';
import { ViewerPanel, ViewerPanelHeader, ViewerPanelBody, ViewerWindow, Viewer, ViewerTrigger } from '../../../shared/uiKit/Viewer';
import { SaveDialog } from './components/SaveDialog';


export const DataModelEditor = () => {
  const ref = useRef(null);

  const {
    selectedModelField,
    modelFieldsWithDrafts,
    hasDraftChanges,
    saveDraftModelField,
    discardChanges,
  } = useDraftModel();

  const handleSaveChanges = useCallback(() => {
    saveDraftModelField();
  }, [saveDraftModelField]);

  const handleDiscardChanges = useCallback(() => {
    discardChanges();
  }, [discardChanges]);

  return (
    <>
      <Viewer
        ref={ref}
        canClose={!hasDraftChanges}
        groupId="dataModel"
      >
        <Stack direction='column' gap='0' width='fit' >

          <TopBar />

          <Stack direction='row' gap='0' justify='flex-start' align='flex-start' >
            <ViewerWindow step={1} data={modelFieldsWithDrafts}>
              <ModelFields />
            </ViewerWindow>
            <ViewerWindow step={2} data={selectedModelField}>
              <ModelFieldSettings />
            </ViewerWindow>
          </Stack>
        </Stack>
      </Viewer >
      <SaveDialog ref={ref} />
    </>
  );
};

export const ModelFields = ({ data }) => {

  return (
    <ViewerPanel anchor='left' width={300} >
      <ViewerPanelBody padding={0}>
        <SectionPanel>
          <SectionPanelHeader>
            <SectionPanelName>Fields</SectionPanelName>
            <AddModelField />
          </SectionPanelHeader>
          <SectionPanelBody>
            {data.map(field => (
              <ViewerTrigger step={2} data={field} groupId="dataModel">
                <DataModelFieldListItem
                  key={field.id}
                  field={field}
                />
              </ViewerTrigger>
            ))}
          </SectionPanelBody>
        </SectionPanel>
      </ViewerPanelBody>
    </ViewerPanel>
  );
};


export const ModelFieldSettings = ({ data }) => {
  const FieldSettings = FIELD_SETTINGS_COMPONENTS[data?.type];
  if (!FieldSettings) {return null;}

  return (
    <ViewerPanel anchor='left' width={500} >
      <ViewerPanelBody>
        <FieldSettings modelField={data} />
      </ViewerPanelBody>
    </ViewerPanel>
  );
};

