import React, { useMemo, useCallback, useRef } from 'react';
import { ThemeProvider } from '../../../app/providers';
import { Stack } from '../../../shared/uiKit/Stack';
import { ResizableWrapper } from '../../../shared/uiKit/ResizableWrapper';
import { Surface } from '../../../shared/uiKit/Surface';
import { DataRecordTable } from '../../../features/dataRecordEditor';
import { useDataManager } from '../model';
import { SlotBar, LeftSlot, RightSlot } from '../../../shared/uiKit/SlotBar';
import { ButtonTool, ButtonToolGroup } from '../../../shared/uiKit/ButtonTool';
import { ArrowWithLegLeftIcon, CodeIcon, DataTableIcon, DataSchemaIcon } from '../../../shared/assets/icons';
import { Scrollbar } from '../../../shared/uiKit/Scrollbar';
import { SectionPanel, SectionPanelHeader, SectionPanelBody, SectionPanelName } from '../../../shared/uiKit/SectionPanel';
import { List } from '../../../shared/uiKit/List';
import { DataAddCollectionIcon } from '../../../shared/assets/icons';
import { ModelListItem } from '../../../entities/dataModel';
import { DataRecordEditor } from '../../../features/dataRecordEditor';
import { DataModelEditor, DataModelSchemaEditor } from '../../../features/dataModelEditor';
import { Divider } from '../../../shared/uiKit/Divider';
import { DataModelEditorToggleButton } from './components/DataModelEditorToggleButton';
import { SettingsIcon } from '../../../shared/assets/icons';
import { AddDataModelButton } from '../../../features/dataModelEditor';
import { ViewerTrigger } from '../../../shared/uiKit/Viewer';


export const DatabaseManager = () => {

  const {
    allModels,
    selectModel,
    isDatabaseModeGlobal,
    isSchemaInDatabaseMode,
    setGlobalDesignMode,
    toggleModesSchemaTable,
    toggleModeCode,
    rawRecords,
    records,
    isTableInDatabaseMode,
  } = useDataManager();

  const handleSetGlobalDesignMode = () => setGlobalDesignMode();
  const handleToggleModesSchemaTable = () => toggleModesSchemaTable();
  const handleToggleModeCode = () => toggleModeCode();

  const handleSelectModel = (modelId) => {
    selectModel(modelId);
  };

  const content = useMemo(() => {
    return (
      <Stack>
        <DataRecordEditor />
        <DataModelEditor />
        {isTableInDatabaseMode && <DataRecordTable />}
        {isSchemaInDatabaseMode && <DataModelSchemaEditor />}
      </Stack>
    );
  }, [isSchemaInDatabaseMode]);

  // console.log('[DataManager] rawRecords', rawRecords)
  // console.log('[DataManager] records', records)

  return (
    <Stack direction='row'>
      <ResizableWrapper >
        <Surface border={false}>
          <SlotBar divider align='flex-start' >
            <LeftSlot>
              <ButtonTool onClick={handleSetGlobalDesignMode}>
                <ArrowWithLegLeftIcon />
              </ButtonTool>
            </LeftSlot>
            <RightSlot>
              <ButtonToolGroup fill={false}>
                {isDatabaseModeGlobal && isSchemaInDatabaseMode && (
                  <ButtonTool onClick={handleToggleModeCode} >
                    <CodeIcon />
                  </ButtonTool>
                )}
                <ButtonTool onClick={handleToggleModesSchemaTable} >
                  {isSchemaInDatabaseMode ? <DataTableIcon /> : <DataSchemaIcon />}
                </ButtonTool>
              </ButtonToolGroup>
            </RightSlot>
          </SlotBar>
          <Scrollbar>
            <SectionPanel>
              <SectionPanelHeader>
                <SectionPanelName>Collections</SectionPanelName>
                <AddDataModelButton />
              </SectionPanelHeader>
              <SectionPanelBody>
                <List gap='0'>
                  {allModels.map((model) => (
                    <ModelListItem
                      key={model.id}
                      model={model}
                      onClick={() => handleSelectModel(model.id)}
                      rightSlot={
                        <ViewerTrigger step={1} groupId="dataModel" >
                          <ButtonTool>
                            <SettingsIcon />
                          </ButtonTool>
                        </ViewerTrigger>
                      }
                    />
                  ))}
                </List>
              </SectionPanelBody>
            </SectionPanel>
          </Scrollbar>
        </Surface>
        <Divider orientation='vertical' right top />
      </ResizableWrapper>
      {content}
    </Stack >
  );
};
