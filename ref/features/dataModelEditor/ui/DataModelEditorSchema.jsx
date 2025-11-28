/** @jsxImportSource @emotion/react */
import React, { useRef } from 'react';
import { useTheme } from '@emotion/react';
import { useDataModels } from '@/entities/dataModel';
import { ModelCard } from '@/entities/dataModel';
import { Stack } from '@/shared/uiKit/Stack';
import { surfaceColors } from '@/shared/styles';
import { ThemeProvider } from '@/app/providers';
import { useDatabaseMode } from '@/entities/mode/editorMode';
import { DialogConfirmChanges } from '@/shared/uiKit/DialogVariants';
import { AddModelField } from './components/AddModelField';
import { FIELD_SETTINGS_COMPONENTS } from './components/fields';
import { TopBar } from './components/TopBar';
import { Code } from './components/Code';
import { useDraftModel } from '../model';
import { SaveDialog } from './components/SaveDialog';


export const DataModelSchemaEditor = () => {

  const { isCodeInDatabaseMode } = useDatabaseMode();

  return (
    <ThemeProvider forceDark={true}>
      <Stack direction="row">
        {isCodeInDatabaseMode && <Code />}
        <SchemaView />
      </Stack>
    </ThemeProvider>
  );
};

const SchemaView = () => {
  const ref = useRef(null);
  const theme = useTheme();

  const { allModels } = useDataModels();
  const { getModelFieldsWithDraftByModelId, selectedModelField } = useDraftModel();

  return (
    <>
      <Stack ref={ref} backgroundColor={theme.sys.color.surface} >
        <TopBar />
        <Stack direction='row' gap={20} justify='center' align='center' >
          {allModels.map(model => {
            const modelFieldsWithDraft = getModelFieldsWithDraftByModelId(model.id);
            // console.log('🔥[SchemaViewModel] modelFieldsWithDraft', modelFieldsWithDraft)
            return (
              <ModelCard
                key={model.id}
                model={model}
                modelFields={modelFieldsWithDraft}
                addModelFieldSlot={<AddModelField />}
                fieldSettingsSlot={selectedModelField && <ModelFieldSettings modelField={selectedModelField} />}
              />
            );
          })}
        </Stack>
      </Stack>
      <ThemeProvider forceDark={false}>
        <SaveDialog ref={ref} />
      </ThemeProvider>
    </>
  );
};

export const ModelFieldSettings = ({ modelField }) => {

  const FieldSettings = FIELD_SETTINGS_COMPONENTS[modelField?.type];
  if (!FieldSettings) { return null; }

  return (
    <FieldSettings modelField={modelField} />

  );
};
