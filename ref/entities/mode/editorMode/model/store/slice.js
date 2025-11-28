import { createSlice } from '@reduxjs/toolkit';
import { actionsDesignMode, initialDesignModes } from './actionsDesignMode';
import { actionsDatabaseMode, initialDatabaseModes } from './actionsDatabaseMode';
import { actionsGlobalMode, initialGlobalMode } from './actionsGlobalMode';
import { actionsPreviewMode, initialPreviewModes } from './actionsPreviewMode';
import { actionsWireframeMode, initialWireframeModes } from './actionsWireframeMode';
import { actionsImporterMode, initialImporterModes } from './actionsImporterMode';


const initialState = {
  ...initialGlobalMode,
  designModes: initialDesignModes,
  databaseModes: initialDatabaseModes,
  previewModes: initialPreviewModes,
  wireframeModes: initialWireframeModes,
  importerModes: initialImporterModes,
};

const editorModesSlice = createSlice({
  name: 'editorModes',
  initialState,
  reducers: {

    ...actionsGlobalMode,
    ...actionsDesignMode,
    ...actionsDatabaseMode,
    ...actionsPreviewMode,
    ...actionsWireframeMode,
    ...actionsImporterMode,

  },
});

export const {

  // Global Mode Actions
  setGlobalMode,
  resetGlobalMode,
  toggleDesignCodebase,
  toggleDesignGlobalSearch,
  // Design Mode Actions
  setDesignMode,
  setDesignModes,
  resetDesignMode,
  resetDesignModes,
  toggleAction,
  toggleModeCode,
  togglePresetManager,
  toggleTokenManager,
  toggleCommentsInDesignMode,
  // Database Mode Actions
  setDatabaseMode,
  setDatabaseModes,
  resetDatabaseMode,
  resetDatabaseModes,
  toggleSchemaTable,
  toggleRecordTable,
  toggleCode,
  // Preview Mode Actions
  setPreviewMode,
  setPreviewModes,
  resetPreviewMode,
  resetPreviewModes,
  toggleModeComments,
  // Wireframe Mode Actions
  setWireframeMode,
  setWireframeModes,
  resetWireframeMode,
  resetWireframeModes,
  toggleBlockPreview,
  toggleBlockDetail,
  // Importer Mode Actions
  setImporterMode,
  setImporterModes,
  resetImporterMode,
  resetImporterModes,

} = editorModesSlice.actions;

export default editorModesSlice.reducer;
