// ===================================================================
// Test Setup for Vitest + React Testing Library
// ===================================================================

import '@testing-library/jest-dom';
import { cleanup } from '@testing-library/react';
import { afterEach, vi } from 'vitest';

// Cleanup after each test
afterEach(() => {
  cleanup();
});

// Mock window.matchMedia (for responsive components)
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});

// Mock IntersectionObserver (for lazy loading components)
const globalObj = typeof global !== 'undefined' ? global : window;
globalObj.IntersectionObserver = class IntersectionObserver {
  constructor() {}
  disconnect() {}
  observe() {}
  takeRecords() {
    return [];
  }
  unobserve() {}
} as any;

// Mock ResizeObserver (for responsive components)
globalObj.ResizeObserver = class ResizeObserver {
  constructor() {}
  disconnect() {}
  observe() {}
  unobserve() {}
} as any;

// Mock VARIABLE_TYPES and icons to prevent eager evaluation issues
vi.mock('./shared/constants/variableTypes', () => ({
  VARIABLE_TYPES: {
    NUMBER: 'number',
    STRING: 'string',
    BOOLEAN: 'boolean',
    COLOR: 'color',
    IMAGE: 'image',
    VIDEO: 'video',
    DATA: 'data',
    DATE: 'date',
    JSON: 'json',
    ENUM: 'enum',
    FUNCTION: 'function',
    NODE: 'node',
    OBJECT: 'object',
    ARRAY: 'array',
    MAP: 'map',
    SET: 'set',
    PROMISE: 'promise',
  },
  VARIABLE_CONFIG: {},
}));

// Mock Redux selectors to prevent import errors
// Mock uiScreen selectors - removed to allow selector tests to use real selectors
// vi.mock('./entities/uiScreen/model/store/selector', () => ({
//   selectSelectedScreenId: () => null,
//   selectScreenUI: () => ({ selectedScreenId: null }),
// }));

// Mock wireframeBlock selectors - removed to allow selector tests to use real selectors
// vi.mock('./entities/wireframeBlock/model/store/selectors', () => ({
//   selectWireframeBlocks: () => [],
//   selectAllWireframeBlocks: () => [],
//   selectFocusSystemStates: () => ({}),
//   selectSelectedScreenId: () => null,
// }));

// Mock focus system selectors - removed to allow selector tests to use real selectors
// vi.mock('./entities/uiFocus/model/store/selectors', () => ({
//   selectFocusSystemStates: () => ({}),
// }));

// Mock uiElement selectors - removed to allow selector tests to use real selectors
// vi.mock('./entities/uiElement/model/store/selectors', () => ({
//   selectFocusedElementIsBody: () => false,
//   selectFocusedEntity: () => null,
//   selectElementEntities: () => ({}),
//   selectElementById: () => null,
// }));

// Mock uiElement actions
vi.mock('./entities/uiElement', () => ({
  addElement: () => ({ type: 'addElement' }),
  addElements: () => ({ type: 'addElements' }),
  elementEntityReducer: () => ({}),
}));

// Mock store reducers
vi.mock('./app/store/index', () => ({
  configureStore: () => ({
    getState: () => ({}),
    dispatch: () => {},
    subscribe: () => {},
  }),
}));

// Mock eventRecording middleware
vi.mock('./features/eventRecording', () => ({
  eventElementMiddleware: {
    startListening: () => {},
    middleware: () => {},
  },
}));

// Mock layoutControl constants
vi.mock('./features/uiControls/layoutControl/model/constants/flex', () => ({
  ALIGNMENT_MAP: {},
  JUSTIFY: {
    start: 'flex-start',
    end: 'flex-end',
    center: 'center',
    between: 'space-between',
    around: 'space-around',
  },
  ALIGN: {
    start: 'flex-start',
    end: 'flex-end',
    center: 'center',
    stretch: 'stretch',
  },
}));

// Mock layoutControl selectors
vi.mock('./features/uiControls/layoutControl/model/store/selector', () => ({
  selectSelectedCells: () => [],
  selectIsFlexEnabled: () => false,
  selectFlexDirection: () => 'row',
  selectJustifyContent: () => 'flex-start',
  selectAlignItems: () => 'flex-start',
  selectFlexWrap: () => 'nowrap',
  selectGapRow: () => 0,
  selectGapColumn: () => 0,
}));

// Mock uiTree selectors
vi.mock('./entities/uiTree/model/store/selector', () => ({
  selectCompositeEntitiesByOwnership: () => [],
  selectElementIds: () => [],
  selectInstanceIds: () => [],
  selectScreenIds: () => [],
}));

// Mock dataModel selectors - removed to allow selector tests to use real selectors
// vi.mock('./entities/dataModel/model/store/selectors', () => ({
//   selectSelectedModel: () => null,
//   selectSelectedModelId: () => null,
//   selectEntities: () => ({}),
// }));

// Mock varPresetModeValue selectors - removed to allow selector tests to use real selectors
// vi.mock('./entities/varPresetModeValue/model/store/selectors', () => ({
//   selectAllPresetModeValues: () => [],
//   selectPresetModeValueIds: () => [],
//   selectPresetModeValueEntities: () => ({}),
// }));

// Mock varMode selectors - removed to allow selector tests to use real selectors
// vi.mock('./entities/varMode/model/store/selectors', () => ({
//   selectSelectedCollectionModes: () => [],
//   selectAllVariableModes: () => [],
//   selectSelectedPresetCollection: () => null,
// }));

// Mock uiDefaultEntity module
vi.mock('./entities/uiDefaultEntity', () => ({
  eButton: {
    id: 'id-01-default-button',
    name: 'Button',
    tag: 'button',
    type: 'ELEMENT',
  },
}));

// Mock ELEMENT_TAGS constants
vi.mock('./entities/uiElement', () => ({
  ELEMENT_TAGS: {
    BUTTON: 'button',
    DIV: 'div',
    SPAN: 'span',
    INPUT: 'input',
    TEXT: 'text',
    BODY: 'body',
    PARAGRAPH: 'p',
    HEADING1: 'h1',
    HEADING2: 'h2',
    HEADING3: 'h3',
    HEADING4: 'h4',
    HEADING5: 'h5',
    HEADING6: 'h6',
  },
  STYLE_PROPERTIES: {
    justifyContent: 'justify-content',
    alignItems: 'align-items',
    flexDirection: 'flex-direction',
    flexWrap: 'flex-wrap',
    gap: 'gap',
  },
}));

// Mock shared/assets/icons to prevent import errors
vi.mock('./shared/assets/icons', () => ({
  // Variable Icons
  VariableNumberIcon: () => null,
  VariableStringIcon: () => null,
  VariableBoolIcon: () => null,
  VariableColorIcon: () => null,
  VariableImageIcon: () => null,
  VariableVideoIcon: () => null,
  VariableDataIcon: () => null,
  VariableIcon: () => null,

  // Element Icons
  ElementTextIcon: () => null,
  ElementBoxIcon: () => null,

  // Data & Import Icons
  DataTableIcon: () => null,
  DataSchemaIcon: () => null,
  DataAddCollectionIcon: () => null,
  ImportIcon: () => null,

  // Arrow Icons
  ArrowUpDownIcon: () => null,
  ArrowDownIcon: () => null,
  ArrowDownFilledIcon: () => null,
  ArrowWithLegDownIcon: () => null,
  ArrowWithLegLeftIcon: () => null,
  ArrowWithLegUpIcon: () => null,

  // UI Icons
  PlusIcon: () => null,
  MinusIcon: () => null,
  CrossIcon: () => null,
  CheckIcon: () => null,
  DotsIcon: () => null,
  SearchIcon: () => null,
  EditIcon: () => null,
  TrashIcon: () => null,
  DuplicateIcon: () => null,
  DragDropIcon: () => null,
  VisibleIcon: () => null,
  InvisibleIcon: () => null,

  // Layout Icons
  LayoutFreeIcon: () => null,
  LayoutFlexVIcon: () => null,
  LayoutFlexHIcon: () => null,
  LayoutFlexWrapIcon: () => null,
  LayoutFlexReflectionIcon: () => null,
  LayoutFlexColumnAlignItemsStretchIcon: () => null,
  LayoutFlexColumnJustifyAroundIcon: () => null,
  LayoutFlexColumnJustifyBetweenIcon: () => null,
  LayoutFlexRowAlignItemsStretchIcon: () => null,
  LayoutFlexRowJustifyAroundIcon: () => null,
  LayoutFlexRowJustifyBetweenIcon: () => null,
  LayoutGapColumnIcon: () => null,
  LayoutGapRowIcon: () => null,

  // Component Icons
  ComponentIcon: () => null,
  ComponentInstanceIcon: () => null,

  // Other Icons
  TokenIcon: () => null,
  VarPresetIcon: () => null,
  PropsIcon: () => null,
  CodeIcon: () => null,
  ChatIcon: () => null,
  CommentIcon: () => null,
  TaskIcon: () => null,
  DocIcon: () => null,
  FileIcon: () => null,
  FigmaIcon: () => null,
  LibraryIcon: () => null,
  LayersIcon: () => null,
  ScreensPreviewIcon: () => null,
  StoryboardIcon: () => null,
  PreviewIcon: () => null,
  DynamicScreenIcon: () => null,
  FullScreenIcon: () => null,
  OverflowVisibleIcon: () => null,
  SettingsIcon: () => null,
  DoorLockIcon: () => null,
  DoorUnlockIcon: () => null,
  UnlinkIcon: () => null,
  ReferenceIcon: () => null,
  BurgerIcon: () => null,
  AiIcon: () => null,
  AvatarIcon: () => null,
  ActionIcon: () => null,
  WebScanIcon: () => null,

  // Fill Icons
  FillColorIcon: () => null,
  FillGradientIcon: () => null,
  FillImageIcon: () => null,
  FillRadialGradientIcon: () => null,

  // Font & Text
  FontIcon: () => null,
  TextAlignLeftIcon: () => null,
  TextAlignCenterIcon: () => null,
  TextAlignRightIcon: () => null,

  // Screen Size Icons
  ScreenSizeDesktopIcon: () => null,
  ScreenSizeTabletVerticalIcon: () => null,
  ScreenSizePhoneIcon: () => null,

  // Size Icons
  SizeFillWidthIcon: () => null,
  SizeFillHeightIcon: () => null,
  SizeFitWidthIcon: () => null,
  SizeFitHeightIcon: () => null,

  // Border Icons
  SeparateBorderIcon: () => null,
  SeparateBorderTopIcon: () => null,
  SeparateBorderRightIcon: () => null,
  SeparateBorderBottomIcon: () => null,
  SeparateBorderLeftIcon: () => null,
  SeparateBorderRadiusIcon: () => null,
  SeparateBorderRadiusTopLeftIcon: () => null,
  SeparateBorderRadiusTopRightIcon: () => null,
  SeparateBorderRadiusBottomLeftIcon: () => null,
  SeparateBorderRadiusBottomRightIcon: () => null,

  // Placeholder
  ImagePlaceholderIcon: () => null,
}));

