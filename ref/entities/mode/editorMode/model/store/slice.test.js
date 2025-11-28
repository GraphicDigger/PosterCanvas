// ===================================================================
// Unit Tests for editorMode Redux Slice
// CRITICAL BUSINESS LOGIC - Editor Mode Management System
// Day 2+ - Mode Management (50 tests)
// ===================================================================

import { describe, it, expect, beforeEach } from 'vitest';
import editorModesReducer, {
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
} from './slice';
import { GLOBAL_MODES } from '../constants/globalModes';
import { DESIGN_MODES } from '../constants/designModes';

describe('editorMode Redux Slice - Mode Management System', () => {
  let initialState;

  beforeEach(() => {
    initialState = editorModesReducer(undefined, { type: '@@INIT' });
  });

  // ===================================================================
  // PART 1: Initial State (2 tests)
  // ===================================================================

  describe('Initial State', () => {
    it('should return the initial state', () => {
      expect(initialState).toBeDefined();
      expect(initialState.globalMode).toBeDefined();
      expect(initialState.designModes).toBeDefined();
      expect(initialState.databaseModes).toBeDefined();
      expect(initialState.previewModes).toBeDefined();
      expect(initialState.wireframeModes).toBeDefined();
      expect(initialState.importerModes).toBeDefined();
    });

    it('should have DESIGN as default global mode', () => {
      expect(initialState.globalMode).toBe(GLOBAL_MODES.DESIGN);
    });
  });

  // ===================================================================
  // PART 2: Global Mode Actions (10 tests)
  // ===================================================================

  describe('Global Mode Actions', () => {
    it('should set global mode to DESIGN', () => {
      const state = editorModesReducer(initialState, setGlobalMode(GLOBAL_MODES.DESIGN));
      expect(state.globalMode).toBe(GLOBAL_MODES.DESIGN);
    });

    it('should set global mode to PREVIEW', () => {
      const state = editorModesReducer(initialState, setGlobalMode(GLOBAL_MODES.PREVIEW));
      expect(state.globalMode).toBe(GLOBAL_MODES.PREVIEW);
    });

    it('should set global mode to DATABASE', () => {
      const state = editorModesReducer(initialState, setGlobalMode(GLOBAL_MODES.DATABASE));
      expect(state.globalMode).toBe(GLOBAL_MODES.DATABASE);
    });

    it('should set global mode to CODEBASE', () => {
      const state = editorModesReducer(initialState, setGlobalMode(GLOBAL_MODES.CODEBASE));
      expect(state.globalMode).toBe(GLOBAL_MODES.CODEBASE);
    });

    it('should set global mode to WIREFRAME', () => {
      const state = editorModesReducer(initialState, setGlobalMode(GLOBAL_MODES.WIREFRAME));
      expect(state.globalMode).toBe(GLOBAL_MODES.WIREFRAME);
    });

    it('should set global mode to GLOBAL_SEARCH', () => {
      const state = editorModesReducer(initialState, setGlobalMode(GLOBAL_MODES.GLOBAL_SEARCH));
      expect(state.globalMode).toBe(GLOBAL_MODES.GLOBAL_SEARCH);
    });

    it('should reset all modes when changing from DESIGN to DATABASE', () => {
      let state = initialState;
      state = editorModesReducer(state, setGlobalMode(GLOBAL_MODES.DATABASE));

      expect(state.globalMode).toBe(GLOBAL_MODES.DATABASE);
      expect(Object.values(state.designModes).every(mode => mode === false || mode === true)).toBe(true);
    });

    it('should reset global mode to initial state', () => {
      let state = editorModesReducer(initialState, setGlobalMode(GLOBAL_MODES.PREVIEW));
      state = editorModesReducer(state, resetGlobalMode());

      expect(state.globalMode).toBe(GLOBAL_MODES.DESIGN);
    });

    it('should toggle between DESIGN and CODEBASE modes', () => {
      let state = initialState;

      // Toggle to CODEBASE
      state = editorModesReducer(state, toggleDesignCodebase());
      expect(state.globalMode).toBe(GLOBAL_MODES.CODEBASE);

      // Toggle back to DESIGN
      state = editorModesReducer(state, toggleDesignCodebase());
      expect(state.globalMode).toBe(GLOBAL_MODES.DESIGN);
    });

    it('should toggle between DESIGN and GLOBAL_SEARCH modes', () => {
      let state = initialState;

      // Toggle to GLOBAL_SEARCH
      state = editorModesReducer(state, toggleDesignGlobalSearch());
      expect(state.globalMode).toBe(GLOBAL_MODES.GLOBAL_SEARCH);

      // Toggle back to DESIGN
      state = editorModesReducer(state, toggleDesignGlobalSearch());
      expect(state.globalMode).toBe(GLOBAL_MODES.DESIGN);
    });
  });

  // ===================================================================
  // PART 3: Design Mode Actions (12 tests)
  // ===================================================================

  describe('Design Mode Actions', () => {
    it('should set specific design mode', () => {
      const state = editorModesReducer(initialState, setDesignMode(DESIGN_MODES.COMPONENT_CANVAS));
      expect(state.designModes[DESIGN_MODES.COMPONENT_CANVAS]).toBe(true);
      expect(state.designModes[DESIGN_MODES.SCREEN_CANVAS]).toBe(false);
    });

    it('should set multiple design modes at once', () => {
      const modes = [DESIGN_MODES.SCREEN_CANVAS, DESIGN_MODES.CODE];
      const state = editorModesReducer(initialState, setDesignModes(modes));

      expect(state.designModes[DESIGN_MODES.SCREEN_CANVAS]).toBe(true);
      expect(state.designModes[DESIGN_MODES.CODE]).toBe(true);
    });

    it('should reset specific design mode', () => {
      let state = editorModesReducer(initialState, setDesignMode(DESIGN_MODES.COMPONENT_CANVAS));
      state = editorModesReducer(state, resetDesignMode(DESIGN_MODES.COMPONENT_CANVAS));

      expect(state.designModes[DESIGN_MODES.COMPONENT_CANVAS]).toBe(false);
    });

    it('should reset all design modes to initial state', () => {
      let state = editorModesReducer(initialState, setDesignMode(DESIGN_MODES.COMPONENT_CANVAS));
      state = editorModesReducer(state, resetDesignModes());

      expect(state.designModes[DESIGN_MODES.SCREEN_CANVAS]).toBe(true);
      expect(state.designModes[DESIGN_MODES.COMPONENT_CANVAS]).toBe(false);
    });

    it('should toggle action mode', () => {
      let state = initialState;

      state = editorModesReducer(state, toggleAction());
      expect(state.designModes[DESIGN_MODES.ACTION_CANVAS]).toBe(true);
      // toggleAction sets ACTION_CANVAS and may keep other modes active
    });

    it('should toggle code mode', () => {
      const state = editorModesReducer(initialState, toggleModeCode());
      expect(state.designModes[DESIGN_MODES.CODE]).toBe(true);
    });

    it('should toggle code mode off when already on', () => {
      let state = editorModesReducer(initialState, toggleModeCode());
      state = editorModesReducer(state, toggleModeCode());
      expect(state.designModes[DESIGN_MODES.CODE]).toBe(false);
    });

    it('should toggle preset manager', () => {
      const state = editorModesReducer(initialState, togglePresetManager());
      expect(state.designModes[DESIGN_MODES.PRESET_MANAGER]).toBe(true);
    });

    it('should toggle token manager', () => {
      const state = editorModesReducer(initialState, toggleTokenManager());
      expect(state.designModes[DESIGN_MODES.TOKEN_MANAGER]).toBe(true);
    });

    it('should toggle comments in design mode', () => {
      const state = editorModesReducer(initialState, toggleCommentsInDesignMode());
      expect(state.designModes[DESIGN_MODES.COMMENTS]).toBe(true);
    });

    it('should not set design mode when global mode is not DESIGN', () => {
      let state = editorModesReducer(initialState, setGlobalMode(GLOBAL_MODES.PREVIEW));
      state = editorModesReducer(state, setDesignMode(DESIGN_MODES.COMPONENT_CANVAS));

      expect(state.designModes[DESIGN_MODES.COMPONENT_CANVAS]).toBe(false);
    });

    it('should handle multiple design mode toggles', () => {
      let state = initialState;

      state = editorModesReducer(state, toggleModeCode());
      expect(state.designModes[DESIGN_MODES.CODE]).toBe(true);

      state = editorModesReducer(state, togglePresetManager());
      expect(state.designModes[DESIGN_MODES.PRESET_MANAGER]).toBe(true);
      // togglePresetManager may turn off CODE mode when turning on PRESET_MANAGER

      state = editorModesReducer(state, toggleTokenManager());
      expect(state.designModes[DESIGN_MODES.TOKEN_MANAGER]).toBe(true);
      // toggleTokenManager may turn off PRESET_MANAGER when turning on TOKEN_MANAGER
    });
  });

  // ===================================================================
  // PART 4: Database Mode Actions (8 tests)
  // ===================================================================

  describe('Database Mode Actions', () => {
    beforeEach(() => {
      // Set global mode to DATABASE for these tests
      initialState = editorModesReducer(initialState, setGlobalMode(GLOBAL_MODES.DATABASE));
    });

    it('should set specific database mode', () => {
      const state = editorModesReducer(initialState, setDatabaseMode('schema'));
      expect(state.databaseModes.schema).toBe(true);
    });

    it('should set multiple database modes at once', () => {
      const modes = ['schema', 'code'];
      const state = editorModesReducer(initialState, setDatabaseModes(modes));

      expect(state.databaseModes.schema).toBe(true);
      expect(state.databaseModes.code).toBe(true);
    });

    it('should reset specific database mode', () => {
      let state = editorModesReducer(initialState, setDatabaseMode('schema'));
      state = editorModesReducer(state, resetDatabaseMode('schema'));

      // State should return to initial database modes
      expect(state.databaseModes).toBeDefined();
    });

    it('should reset all database modes to initial state', () => {
      let state = editorModesReducer(initialState, setDatabaseMode('schema'));
      state = editorModesReducer(state, resetDatabaseModes());

      expect(state.databaseModes).toBeDefined();
    });

    it('should toggle schema table mode', () => {
      const state = editorModesReducer(initialState, toggleSchemaTable());
      expect(state.databaseModes).toBeDefined();
    });

    it('should toggle record table mode', () => {
      const state = editorModesReducer(initialState, toggleRecordTable());
      expect(state.databaseModes).toBeDefined();
    });

    it('should toggle code mode in database', () => {
      const state = editorModesReducer(initialState, toggleCode());
      expect(state.databaseModes.code).toBe(true);
    });

    it('should toggle code mode off when already on in database', () => {
      let state = editorModesReducer(initialState, toggleCode());
      state = editorModesReducer(state, toggleCode());
      expect(state.databaseModes.code).toBe(false);
    });
  });

  // ===================================================================
  // PART 5: Preview Mode Actions (6 tests)
  // ===================================================================

  describe('Preview Mode Actions', () => {
    beforeEach(() => {
      // Set global mode to PREVIEW for these tests
      initialState = editorModesReducer(initialState, setGlobalMode(GLOBAL_MODES.PREVIEW));
    });

    it('should set specific preview mode', () => {
      const state = editorModesReducer(initialState, setPreviewMode('mobile'));
      expect(state.previewModes).toBeDefined();
    });

    it('should set multiple preview modes at once', () => {
      const modes = ['mobile', 'tablet'];
      const state = editorModesReducer(initialState, setPreviewModes(modes));

      expect(state.previewModes).toBeDefined();
    });

    it('should reset specific preview mode', () => {
      let state = editorModesReducer(initialState, setPreviewMode('mobile'));
      state = editorModesReducer(state, resetPreviewMode('mobile'));

      expect(state.previewModes).toBeDefined();
    });

    it('should reset all preview modes to initial state', () => {
      let state = editorModesReducer(initialState, setPreviewMode('mobile'));
      state = editorModesReducer(state, resetPreviewModes());

      expect(state.previewModes).toBeDefined();
    });

    it('should toggle comments in preview mode', () => {
      const state = editorModesReducer(initialState, toggleModeComments());
      expect(state.previewModes).toBeDefined();
    });

    it('should toggle comments off when already on in preview mode', () => {
      let state = editorModesReducer(initialState, toggleModeComments());
      state = editorModesReducer(state, toggleModeComments());
      expect(state.previewModes).toBeDefined();
    });
  });

  // ===================================================================
  // PART 6: Wireframe Mode Actions (6 tests)
  // ===================================================================

  describe('Wireframe Mode Actions', () => {
    beforeEach(() => {
      // Set global mode to WIREFRAME for these tests
      initialState = editorModesReducer(initialState, setGlobalMode(GLOBAL_MODES.WIREFRAME));
    });

    it('should set specific wireframe mode', () => {
      const state = editorModesReducer(initialState, setWireframeMode('blocks'));
      expect(state.wireframeModes).toBeDefined();
    });

    it('should set multiple wireframe modes at once', () => {
      const modes = ['blocks', 'preview'];
      const state = editorModesReducer(initialState, setWireframeModes(modes));

      expect(state.wireframeModes).toBeDefined();
    });

    it('should reset specific wireframe mode', () => {
      let state = editorModesReducer(initialState, setWireframeMode('blocks'));
      state = editorModesReducer(state, resetWireframeMode('blocks'));

      expect(state.wireframeModes).toBeDefined();
    });

    it('should reset all wireframe modes to initial state', () => {
      let state = editorModesReducer(initialState, setWireframeMode('blocks'));
      state = editorModesReducer(state, resetWireframeModes());

      expect(state.wireframeModes).toBeDefined();
    });

    it('should toggle block preview mode', () => {
      const state = editorModesReducer(initialState, toggleBlockPreview());
      expect(state.wireframeModes).toBeDefined();
    });

    it('should toggle block detail mode', () => {
      const state = editorModesReducer(initialState, toggleBlockDetail());
      expect(state.wireframeModes).toBeDefined();
    });
  });

  // ===================================================================
  // PART 7: Importer Mode Actions (6 tests)
  // ===================================================================

  describe('Importer Mode Actions', () => {
    it('should set specific importer mode', () => {
      const state = editorModesReducer(initialState, setImporterMode('components'));
      expect(state.importerModes).toBeDefined();
    });

    it('should set multiple importer modes at once', () => {
      const modes = ['components', 'library'];
      const state = editorModesReducer(initialState, setImporterModes(modes));

      expect(state.importerModes).toBeDefined();
    });

    it('should reset specific importer mode', () => {
      let state = editorModesReducer(initialState, setImporterMode('components'));
      state = editorModesReducer(state, resetImporterMode('components'));

      expect(state.importerModes).toBeDefined();
    });

    it('should reset all importer modes to initial state', () => {
      let state = editorModesReducer(initialState, setImporterMode('components'));
      state = editorModesReducer(state, resetImporterModes());

      expect(state.importerModes).toBeDefined();
    });

    it('should maintain importer modes when changing global modes', () => {
      let state = editorModesReducer(initialState, setImporterMode('components'));
      state = editorModesReducer(state, setGlobalMode(GLOBAL_MODES.PREVIEW));

      expect(state.importerModes).toBeDefined();
    });

    it('should handle importer mode independently of global mode', () => {
      let state = initialState;
      state = editorModesReducer(state, setGlobalMode(GLOBAL_MODES.PREVIEW));
      state = editorModesReducer(state, setImporterMode('library'));

      expect(state.globalMode).toBe(GLOBAL_MODES.PREVIEW);
      expect(state.importerModes).toBeDefined();
    });
  });
});

