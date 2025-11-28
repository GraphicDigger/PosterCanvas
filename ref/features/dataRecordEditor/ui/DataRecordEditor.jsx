import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import { FieldList } from '../../../shared/uiKit/Fields';
import { useDataRecords, useRecordFieldValueByModelFieldId } from '../../../entities/dataRecord';
import { Field } from '../../../shared/uiKit/Fields';
import { useDataModelStates, MODEL_FIELD_TYPES, useDataModels } from '../../../entities/dataModel';
import { Stack } from '../../../shared/uiKit/Stack';
import { SlotBar, LeftSlot, RightSlot } from '../../../shared/uiKit/SlotBar';
import { ButtonTool } from '../../../shared/uiKit/ButtonTool';
import { Text } from '../../../shared/uiKit/Text';
import { ArrowWithLegLeftIcon } from '../../../shared/assets/icons';
import { Button } from '../../../shared/uiKit/Button';
import { Divider } from '../../../shared/uiKit/Divider';
import { RECORD_FIELD, RECORD_FIELD_SETTINGS } from './components/fields';
import { useRecordEditor } from '../model';
import { ResizableWrapper } from '../../../shared/uiKit/ResizableWrapper';
import { Surface } from '../../../shared/uiKit/Surface';
import { SectionPanel, SectionPanelHeader, SectionPanelBody, SectionPanelName } from '../../../shared/uiKit/SectionPanel';
import { List } from '../../../shared/uiKit/List';
import { DataRecordListItem } from '../../../entities/dataRecord';
import { AddDataRecordButton } from './AddDataRecordButton';
import { DialogConfirmChanges } from '../../../shared/uiKit/DialogVariants/DialogConfirmChanges';
import { Viewer, ViewerPanel, ViewerWindow, ViewerPanelHeader, ViewerPanelBody, ViewerTrigger, RightSlot as ViewerRightSlot } from '../../../shared/uiKit/Viewer';

export const DataRecordEditor = () => {
  const editorRef = useRef(null);

  const {
    saveDraftRecord,
    discardChanges,
    hasDraftChanges,
    toggleModesRecordTable,
    selectedModelField,
    selectedModel,
    rawRecords,
  } = useRecordEditor();

  return (
    <Viewer groupId="dataRecord">
      <ViewerWindow step={1} data={rawRecords}>
        <ViewerPanel anchor='left' width={300} >
          <ViewerPanelHeader title={selectedModel?.label}>
            <ViewerRightSlot>
              <AddDataRecordButton uiView='icon' />
            </ViewerRightSlot>
          </ViewerPanelHeader>
          <ViewerPanelBody>
            <List gap='0'>
              {rawRecords.map((record) => (
                <ViewerTrigger step={2} data={record} groupId="dataRecord">
                  <DataRecordListItem
                    key={record.id}
                    record={record}
                  />
                </ViewerTrigger>
              ))}
            </List>
          </ViewerPanelBody>
        </ViewerPanel>
      </ViewerWindow>

      <Stack ref={editorRef} direction='column' align='flex-start' >
        <SlotBar divider >
          <RightSlot>
            <Button
              color='default'
              disabled
            >
                            Unpublish
            </Button>
            <Button
              color={hasDraftChanges ? 'primary' : 'default'}
              onClick={saveDraftRecord}
              disabled={!hasDraftChanges}
            >
                            Save
            </Button>
          </RightSlot>
        </SlotBar>
        <Stack direction='row' gap='0' justify='flex-start' align='flex-start' >
          <ViewerWindow step={2} groupId="dataRecord">
            <RecordFields />
          </ViewerWindow>
          <ViewerWindow step={3} data={selectedModelField} groupId="dataRecord">
            <RecordFieldSettings />
          </ViewerWindow>
        </Stack>
        <DialogConfirmChanges
          targetRef={editorRef}
          hasChanges={hasDraftChanges}
          onSave={saveDraftRecord}
          onDiscard={discardChanges}
        >
                    You have unsaved changes. Do you want to save them?
        </DialogConfirmChanges>

      </Stack>

    </Viewer>
  );
};

const RecordFields = () => {

  const { filteredModelFieldsInRecordMode, selectedDataRecord, handleSelectField } = useRecordEditor();

  return (
    <ViewerPanel anchor='left' width={500}  >
      <ViewerPanelBody>
        <FieldList>
          {filteredModelFieldsInRecordMode.map(modelField => {
            const RecordField = RECORD_FIELD[modelField?.type];
            if (!RecordField) {return null;}
            return (
              <ViewerTrigger step={3} groupId="dataRecord">
                <Field
                  key={modelField.id}
                  direction='column'
                  onClick={() => handleSelectField(modelField.id)}
                >
                  <RecordField
                    record={selectedDataRecord}
                    modelField={modelField}
                  />
                </Field>
              </ViewerTrigger>
            );
          })}
        </FieldList>
      </ViewerPanelBody>
    </ViewerPanel>
  );
};

const RecordFieldSettings = () => {

  const { selectedModelField, selectedDataRecord } = useRecordEditor();

  const FieldSettings = RECORD_FIELD_SETTINGS[selectedModelField?.type];
  if (!FieldSettings) {return null;}

  return (
    <ViewerPanel anchor='none' width={300} >
      <ViewerPanelBody>
        <FieldSettings
          record={selectedDataRecord}
          modelField={selectedModelField}
        />
      </ViewerPanelBody>
    </ViewerPanel>
  );
};
