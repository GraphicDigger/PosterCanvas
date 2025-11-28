import {
  GLOBAL_MODES,
  DESIGN_MODES,
  DATABASE_MODES,
  PREVIEW_MODES,
  WIREFRAME_MODES,
  IMPORTER_MODES,
} from '../..';


// design mode
export const selectIsDesignMode = (state) => state.editorModes.globalMode === GLOBAL_MODES.DESIGN;
export const selectIsScreenCanvasMode = (state) => state.editorModes.designModes[DESIGN_MODES.SCREEN_CANVAS];
export const selectIsComponentCanvasMode = (state) => state.editorModes.designModes[DESIGN_MODES.COMPONENT_CANVAS];
export const selectIsActionCanvasMode = (state) => state.editorModes.designModes[DESIGN_MODES.ACTION_CANVAS];
export const selectIsCodeMode = (state) => state.editorModes.designModes[DESIGN_MODES.CODE];
export const selectIsTokenManagerMode = (state) => state.editorModes.designModes[DESIGN_MODES.TOKEN_MANAGER];
export const selectIsPresetManagerMode = (state) => state.editorModes.designModes[DESIGN_MODES.PRESET_MANAGER];
export const selectIsCommentsMode = (state) => state.editorModes.designModes[DESIGN_MODES.COMMENTS];
// database mode
export const selectIsDatabaseMode = (state) => state.editorModes.globalMode === GLOBAL_MODES.DATABASE;
export const selectIsTableMode = (state) => state.editorModes.databaseModes[DATABASE_MODES.TABLE];
export const selectIsRecordDatabaseMode = (state) => state.editorModes.databaseModes[DATABASE_MODES.RECORD];
export const selectIsSchemaMode = (state) => state.editorModes.databaseModes[DATABASE_MODES.SCHEMA];
export const selectIsCodeDatabaseMode = (state) => state.editorModes.databaseModes[DATABASE_MODES.CODE];

// preview mode
export const selectIsPreviewMode = (state) => state.editorModes.globalMode === GLOBAL_MODES.PREVIEW;
export const selectIsCommentsPreviewMode = (state) => state.editorModes.previewModes[PREVIEW_MODES.COMMENTS];

// wireframe mode
export const selectIsWireframeMode = (state) => state.editorModes.globalMode === GLOBAL_MODES.WIREFRAME;
export const selectIsBlocksWireframeMode = (state) => state.editorModes.wireframeModes[WIREFRAME_MODES.BLOCKS];
export const selectIsPreviewWireframeMode = (state) => state.editorModes.wireframeModes[WIREFRAME_MODES.PREVIEW];
export const selectIsBlockDetailWireframeMode = (state) => state.editorModes.wireframeModes[WIREFRAME_MODES.BLOCK_DETAIL];

// importer mode
export const selectIsImporterMode = (state) => state.editorModes.globalMode === GLOBAL_MODES.IMPORTER;
export const selectIsCodebaseImporterMode = (state) => state.editorModes.importerModes[IMPORTER_MODES.CODEBASE];
export const selectIsFigmaImporterMode = (state) => state.editorModes.importerModes[IMPORTER_MODES.FIGMA];
export const selectIsWebScanImporterMode = (state) => state.editorModes.importerModes[IMPORTER_MODES.WEB_SCAN];
export const selectIsUrlImporterMode = (state) => state.editorModes.importerModes[IMPORTER_MODES.URL];

// other modes
export const selectIsCodebaseMode = (state) => state.editorModes.globalMode === GLOBAL_MODES.CODEBASE;
export const selectIsGlobalSearchMode = (state) => state.editorModes.globalMode === GLOBAL_MODES.GLOBAL_SEARCH;
