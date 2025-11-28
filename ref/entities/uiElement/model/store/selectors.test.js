// ===================================================================
// Unit Tests for UIElement Entity Redux Selectors
// Coverage Target: 95%+
// Week 4 - Day 1 (Selector Testing)
// ===================================================================

import { describe, it, expect, vi, beforeEach } from 'vitest';
import {
  selectElementEntities,
  selectElementIds,
  selectElementUI,
  selectElementOwnership,
  selectHoveredElementId,
  selectFocusedElementId,
  selectSelectedElementId,
  selectSelectedElementById,
  selectElementCheckStates,
  selectSelectedElement,
  selectAllElements,
  selectElementById,
  selectElementsByOwnership,
  selectElementsByScreenId,
  selectElementsByComponentId,
  selectElementIdsByScreenId,
  selectBodyElementByScreenId,
  selectFocusedElementIsBody,
  selectElementBoundVariablesByElementId,
  selectElementBoundTypographyPresetByElementId,
  selectElementAttributesByElementId,
  selectElementCssClassesByElementId,
} from './selectors';
import { ENTITY_KINDS, VARIABLE_TYPES } from '../../../../shared/constants';
import { ELEMENT_TAGS } from '../constants';

// Mock cross-entity selectors
vi.mock('../../@x/uiFocus', () => ({
  selectFocusedEntity: vi.fn((state) => ({
    id: state.mockFocusedEntityId || null,
    kind: ENTITY_KINDS.ELEMENT,
  })),
}));

vi.mock('../../@x/variables', () => ({
  selectVariablesBySelectedScreen: vi.fn(() => ({
    allVariables: [],
  })),
  selectVariablesBySelectedComponent: vi.fn(() => ({
    allVariables: [],
  })),
  selectAllVariables: vi.fn(() => []),
}));

vi.mock('../../@x/dataRecord', () => ({
  selectRawDataRecordsByModelId: vi.fn(() => []),
}));

vi.mock('../../@x/preset', () => ({
  PRESET_TYPES: { TYPOGRAPHY: 'typography' },
  selectPresetById: vi.fn((state, id) => ({
    id,
    name: 'Test Preset',
  })),
}));

vi.mock('../../@x/props', () => ({
  selectAllProps: vi.fn(() => []),
  selectPropsByComponentId: vi.fn(() => []),
}));

vi.mock('../../@x/component', () => ({
  selectSelectedComponentId: vi.fn(() => 'component-1'),
  selectCompositeComponentById: vi.fn(() => null),
}));

describe('UIElement Entity Selectors', () => {
  describe('Base Selectors', () => {
    describe('selectElementEntities', () => {
      it('should return element entities object', () => {
        const state = {
          elementEntity: {
            entities: {
              'element-1': { id: 'element-1', tag: 'div' },
              'element-2': { id: 'element-2', tag: 'span' },
            },
          },
        };

        expect(selectElementEntities(state)).toEqual(state.elementEntity.entities);
      });

      it('should return empty object when no entities', () => {
        const state = {
          elementEntity: {
            entities: {},
          },
        };

        expect(selectElementEntities(state)).toEqual({});
      });
    });

    describe('selectElementIds', () => {
      it('should return element ids array', () => {
        const state = {
          elementEntity: {
            ids: ['element-1', 'element-2', 'element-3'],
          },
        };

        expect(selectElementIds(state)).toEqual(['element-1', 'element-2', 'element-3']);
      });

      it('should return empty array when no ids', () => {
        const state = {
          elementEntity: {
            ids: [],
          },
        };

        expect(selectElementIds(state)).toEqual([]);
      });
    });

    describe('selectElementUI', () => {
      it('should return element UI state', () => {
        const uiState = {
          hoveredElementId: 'element-1',
          focusedElementId: 'element-2',
          selectedElementId: 'element-3',
        };
        const state = {
          elementEntity: {
            ui: uiState,
          },
        };

        expect(selectElementUI(state)).toEqual(uiState);
      });

      it('should return UI state with null values', () => {
        const state = {
          elementEntity: {
            ui: {
              hoveredElementId: null,
              focusedElementId: null,
              selectedElementId: null,
            },
          },
        };

        expect(selectElementUI(state)).toEqual({
          hoveredElementId: null,
          focusedElementId: null,
          selectedElementId: null,
        });
      });
    });

    describe('selectElementOwnership', () => {
      it('should return element ownership structure', () => {
        const ownership = {
          [ENTITY_KINDS.SCREEN]: {
            'screen-1': ['element-1', 'element-2'],
          },
          [ENTITY_KINDS.COMPONENT]: {
            'component-1': ['element-3', 'element-4'],
          },
        };
        const state = {
          elementEntity: {
            ownership,
          },
        };

        expect(selectElementOwnership(state)).toEqual(ownership);
      });

      it('should return empty ownership object', () => {
        const state = {
          elementEntity: {
            ownership: {},
          },
        };

        expect(selectElementOwnership(state)).toEqual({});
      });
    });
  });

  describe('UI State Selectors', () => {
    describe('selectHoveredElementId', () => {
      it('should return hovered element ID', () => {
        const state = {
          elementEntity: {
            ui: {
              hoveredElementId: 'element-hovered',
            },
          },
        };

        expect(selectHoveredElementId(state)).toBe('element-hovered');
      });

      it('should return null when no hovered element', () => {
        const state = {
          elementEntity: {
            ui: {
              hoveredElementId: null,
            },
          },
        };

        expect(selectHoveredElementId(state)).toBeNull();
      });
    });

    describe('selectFocusedElementId', () => {
      it('should return focused element ID', () => {
        const state = {
          elementEntity: {
            ui: {
              focusedElementId: 'element-focused',
            },
          },
        };

        expect(selectFocusedElementId(state)).toBe('element-focused');
      });

      it('should return null when no focused element', () => {
        const state = {
          elementEntity: {
            ui: {
              focusedElementId: null,
            },
          },
        };

        expect(selectFocusedElementId(state)).toBeNull();
      });
    });

    describe('selectSelectedElementId', () => {
      it('should return selected element ID', () => {
        const state = {
          elementEntity: {
            ui: {
              selectedElementId: 'element-selected',
            },
          },
        };

        expect(selectSelectedElementId(state)).toBe('element-selected');
      });

      it('should return null when no selected element', () => {
        const state = {
          elementEntity: {
            ui: {
              selectedElementId: null,
            },
          },
        };

        expect(selectSelectedElementId(state)).toBeNull();
      });
    });
  });

  describe('Element Lookup Selectors', () => {
    describe('selectSelectedElementById', () => {
      it('should return element by provided ID', () => {
        const element = { id: 'element-1', tag: 'div', name: 'Test Element' };
        const state = {
          elementEntity: {
            entities: {
              'element-1': element,
              'element-2': { id: 'element-2', tag: 'span' },
            },
          },
        };

        expect(selectSelectedElementById(state, 'element-1')).toEqual(element);
      });

      it('should return undefined for non-existent ID', () => {
        const state = {
          elementEntity: {
            entities: {
              'element-1': { id: 'element-1', tag: 'div' },
            },
          },
        };

        expect(selectSelectedElementById(state, 'non-existent')).toBeUndefined();
      });
    });

    describe('selectElementById', () => {
      it('should return element by ID', () => {
        const element = { id: 'element-1', tag: 'div', name: 'Test' };
        const state = {
          elementEntity: {
            entities: {
              'element-1': element,
            },
          },
        };

        expect(selectElementById(state, 'element-1')).toEqual(element);
      });

      it('should return undefined for invalid ID', () => {
        const state = {
          elementEntity: {
            entities: {},
          },
        };

        expect(selectElementById(state, 'invalid-id')).toBeUndefined();
      });
    });
  });

  describe('Check States Selector', () => {
    describe('selectElementCheckStates', () => {
      it('should return all check states as true for same element', () => {
        const state = {
          elementEntity: {
            ui: {
              hoveredElementId: 'element-1',
              focusedElementId: 'element-1',
              selectedElementId: 'element-1',
            },
          },
        };

        const result = selectElementCheckStates(state, 'element-1');
        expect(result).toEqual({
          isSelected: true,
          isFocused: true,
          isHovered: true,
        });
      });

      it('should return all check states as false for different element', () => {
        const state = {
          elementEntity: {
            ui: {
              hoveredElementId: 'element-1',
              focusedElementId: 'element-2',
              selectedElementId: 'element-3',
            },
          },
        };

        const result = selectElementCheckStates(state, 'element-4');
        expect(result).toEqual({
          isSelected: false,
          isFocused: false,
          isHovered: false,
        });
      });

      it('should return mixed check states', () => {
        const state = {
          elementEntity: {
            ui: {
              hoveredElementId: 'element-1',
              focusedElementId: 'element-1',
              selectedElementId: 'element-2',
            },
          },
        };

        const result = selectElementCheckStates(state, 'element-1');
        expect(result).toEqual({
          isSelected: false,
          isFocused: true,
          isHovered: true,
        });
      });

      it('should handle null UI states', () => {
        const state = {
          elementEntity: {
            ui: {
              hoveredElementId: null,
              focusedElementId: null,
              selectedElementId: null,
            },
          },
        };

        const result = selectElementCheckStates(state, 'element-1');
        expect(result).toEqual({
          isSelected: false,
          isFocused: false,
          isHovered: false,
        });
      });
    });
  });

  describe('Collection Selectors', () => {
    describe('selectAllElements', () => {
      it('should return all elements as array', () => {
        const elements = {
          'element-1': { id: 'element-1', tag: 'div' },
          'element-2': { id: 'element-2', tag: 'span' },
          'element-3': { id: 'element-3', tag: 'p' },
        };
        const state = {
          elementEntity: {
            ids: ['element-1', 'element-2', 'element-3'],
            entities: elements,
          },
        };

        const result = selectAllElements(state);
        expect(result).toHaveLength(3);
        expect(result).toEqual([elements['element-1'], elements['element-2'], elements['element-3']]);
      });

      it('should return empty array when no elements', () => {
        const state = {
          elementEntity: {
            ids: [],
            entities: {},
          },
        };

        expect(selectAllElements(state)).toEqual([]);
      });

      it('should maintain order based on ids array', () => {
        const state = {
          elementEntity: {
            ids: ['element-3', 'element-1', 'element-2'],
            entities: {
              'element-1': { id: 'element-1', order: 1 },
              'element-2': { id: 'element-2', order: 2 },
              'element-3': { id: 'element-3', order: 3 },
            },
          },
        };

        const result = selectAllElements(state);
        expect(result[0].id).toBe('element-3');
        expect(result[1].id).toBe('element-1');
        expect(result[2].id).toBe('element-2');
      });
    });

    describe('selectSelectedElement', () => {
      it('should return selected element', () => {
        const element = { id: 'element-selected', tag: 'div' };
        const state = {
          elementEntity: {
            ui: {
              selectedElementId: 'element-selected',
            },
            entities: {
              'element-selected': element,
            },
          },
        };

        expect(selectSelectedElement(state)).toEqual(element);
      });

      it('should return null when no element selected', () => {
        const state = {
          elementEntity: {
            ui: {
              selectedElementId: null,
            },
            entities: {},
          },
        };

        expect(selectSelectedElement(state)).toBeNull();
      });

      it('should return undefined when selected element does not exist', () => {
        const state = {
          elementEntity: {
            ui: {
              selectedElementId: 'non-existent',
            },
            entities: {},
          },
        };

        expect(selectSelectedElement(state)).toBeUndefined();
      });
    });
  });

  describe('Ownership Selectors', () => {
    describe('selectElementsByOwnership', () => {
      it('should return elements by screen ownership', () => {
        const state = {
          elementEntity: {
            entities: {
              'element-1': { id: 'element-1', tag: 'div' },
              'element-2': { id: 'element-2', tag: 'span' },
            },
            ownership: {
              [ENTITY_KINDS.SCREEN]: {
                'screen-1': ['element-1', 'element-2'],
              },
            },
          },
        };

        const result = selectElementsByOwnership(state, {
          type: ENTITY_KINDS.SCREEN,
          ownerId: 'screen-1',
        });

        expect(result).toHaveLength(2);
        expect(result[0].id).toBe('element-1');
        expect(result[1].id).toBe('element-2');
      });

      it('should return elements by component ownership', () => {
        const state = {
          elementEntity: {
            entities: {
              'element-1': { id: 'element-1', tag: 'div' },
            },
            ownership: {
              [ENTITY_KINDS.COMPONENT]: {
                'component-1': ['element-1'],
              },
            },
          },
        };

        const result = selectElementsByOwnership(state, {
          type: ENTITY_KINDS.COMPONENT,
          ownerId: 'component-1',
        });

        expect(result).toHaveLength(1);
        expect(result[0].id).toBe('element-1');
      });

      it('should return empty array for non-existent owner', () => {
        const state = {
          elementEntity: {
            entities: {},
            ownership: {},
          },
        };

        const result = selectElementsByOwnership(state, {
          type: ENTITY_KINDS.SCREEN,
          ownerId: 'non-existent',
        });

        expect(result).toEqual([]);
      });

      it('should filter out undefined elements', () => {
        const state = {
          elementEntity: {
            entities: {
              'element-1': { id: 'element-1', tag: 'div' },
            },
            ownership: {
              [ENTITY_KINDS.SCREEN]: {
                'screen-1': ['element-1', 'element-non-existent'],
              },
            },
          },
        };

        const result = selectElementsByOwnership(state, {
          type: ENTITY_KINDS.SCREEN,
          ownerId: 'screen-1',
        });

        expect(result).toHaveLength(1);
        expect(result[0].id).toBe('element-1');
      });
    });

    describe('selectElementsByScreenId', () => {
      it('should return elements for specific screen', () => {
        const state = {
          elementEntity: {
            entities: {
              'element-1': { id: 'element-1', tag: 'div' },
              'element-2': { id: 'element-2', tag: 'span' },
            },
            ownership: {
              [ENTITY_KINDS.SCREEN]: {
                'screen-1': ['element-1', 'element-2'],
              },
            },
          },
        };

        const result = selectElementsByScreenId(state, 'screen-1');
        expect(result).toHaveLength(2);
      });

      it('should return empty array for screen with no elements', () => {
        const state = {
          elementEntity: {
            entities: {},
            ownership: {
              [ENTITY_KINDS.SCREEN]: {},
            },
          },
        };

        const result = selectElementsByScreenId(state, 'screen-empty');
        expect(result).toEqual([]);
      });
    });

    describe('selectElementsByComponentId', () => {
      it('should return elements for specific component', () => {
        const state = {
          elementEntity: {
            entities: {
              'element-1': { id: 'element-1', tag: 'div' },
            },
            ownership: {
              [ENTITY_KINDS.COMPONENT]: {
                'component-1': ['element-1'],
              },
            },
          },
        };

        const result = selectElementsByComponentId(state, 'component-1');
        expect(result).toHaveLength(1);
        expect(result[0].id).toBe('element-1');
      });

      it('should return empty array for component with no elements', () => {
        const state = {
          elementEntity: {
            entities: {},
            ownership: {
              [ENTITY_KINDS.COMPONENT]: {},
            },
          },
        };

        const result = selectElementsByComponentId(state, 'component-empty');
        expect(result).toEqual([]);
      });
    });

    describe('selectElementIdsByScreenId', () => {
      it('should return element entities for screen', () => {
        const state = {
          elementEntity: {
            entities: {
              'element-1': { id: 'element-1', tag: 'div' },
              'element-2': { id: 'element-2', tag: 'span' },
            },
            ownership: {
              [ENTITY_KINDS.SCREEN]: {
                'screen-1': ['element-1', 'element-2'],
              },
            },
          },
        };

        const result = selectElementIdsByScreenId(state, 'screen-1');
        expect(result).toHaveLength(2);
        expect(result[0]).toEqual({ id: 'element-1', tag: 'div' });
      });
    });
  });

  describe('Special Element Selectors', () => {
    describe('selectBodyElementByScreenId', () => {
      it('should return body element for selected screen', () => {
        const bodyElement = { id: 'body-element', tag: ELEMENT_TAGS.BODY };
        const state = {
          elementEntity: {
            entities: {
              'element-1': { id: 'element-1', tag: 'div' },
              'body-element': bodyElement,
            },
            ownership: {
              [ENTITY_KINDS.SCREEN]: {
                'screen-1': ['element-1', 'body-element'],
              },
            },
          },
          screenEntity: {
            ui: {
              selectedScreenId: 'screen-1',
            },
          },
        };

        const result = selectBodyElementByScreenId(state, 'screen-1');
        expect(result).toEqual(bodyElement);
      });

      it('should return null when no body element found', () => {
        const state = {
          elementEntity: {
            entities: {
              'element-1': { id: 'element-1', tag: 'div' },
            },
            ownership: {
              [ENTITY_KINDS.SCREEN]: {
                'screen-1': ['element-1'],
              },
            },
          },
          screenEntity: {
            ui: {
              selectedScreenId: 'screen-1',
            },
          },
        };

        const result = selectBodyElementByScreenId(state);
        expect(result).toBeNull();
      });

      it('should return null when no selected screen', () => {
        const state = {
          elementEntity: {
            entities: {},
            ownership: {},
          },
          screenEntity: {
            ui: {
              selectedScreenId: null,
            },
          },
        };

        const result = selectBodyElementByScreenId(state);
        expect(result).toBeNull();
      });
    });

    describe('selectFocusedElementIsBody', () => {
      it('should return true when focused element is body', () => {
        const state = {
          elementEntity: {
            entities: {
              'body-element': { id: 'body-element', tag: ELEMENT_TAGS.BODY },
            },
          },
          mockFocusedEntityId: 'body-element',
        };

        const result = selectFocusedElementIsBody(state);
        expect(result).toBe(true);
      });

      it('should return false when focused element is not body', () => {
        const state = {
          elementEntity: {
            entities: {
              'element-1': { id: 'element-1', tag: 'div' },
            },
          },
          mockFocusedEntityId: 'element-1',
        };

        const result = selectFocusedElementIsBody(state);
        expect(result).toBe(false);
      });

      it('should return false when no focused element', () => {
        const state = {
          elementEntity: {
            entities: {},
          },
          mockFocusedEntityId: null,
        };

        const result = selectFocusedElementIsBody(state);
        expect(result).toBe(false);
      });
    });
  });

  describe('Attribute Selectors', () => {
    describe('selectElementAttributesByElementId', () => {
      it('should return element attributes excluding className', () => {
        const state = {
          elementEntity: {
            entities: {
              'element-1': {
                id: 'element-1',
                attributes: [
                  { name: 'id', value: 'test-id' },
                  { name: 'data-test', value: 'test-value' },
                  { name: 'className', value: 'test-class' },
                ],
              },
            },
          },
        };

        const result = selectElementAttributesByElementId(state, 'element-1');
        expect(result).toHaveLength(2);
        expect(result.find(attr => attr.name === 'className')).toBeUndefined();
      });

      it('should return empty array when no attributes', () => {
        const state = {
          elementEntity: {
            entities: {
              'element-1': {
                id: 'element-1',
                attributes: [],
              },
            },
          },
        };

        const result = selectElementAttributesByElementId(state, 'element-1');
        expect(result).toEqual([]);
      });

      it('should return empty array when element has no attributes property', () => {
        const state = {
          elementEntity: {
            entities: {
              'element-1': {
                id: 'element-1',
              },
            },
          },
        };

        const result = selectElementAttributesByElementId(state, 'element-1');
        expect(result).toEqual([]);
      });
    });

    describe('selectElementCssClassesByElementId', () => {
      it('should return only className attributes', () => {
        const state = {
          elementEntity: {
            entities: {
              'element-1': {
                id: 'element-1',
                attributes: [
                  { name: 'id', value: 'test-id' },
                  { name: 'className', value: 'class-1' },
                  { name: 'className', value: 'class-2' },
                ],
              },
            },
          },
        };

        const result = selectElementCssClassesByElementId(state, 'element-1');
        expect(result).toHaveLength(2);
        expect(result.every(attr => attr.name === 'className')).toBe(true);
      });

      it('should return empty array when no className attributes', () => {
        const state = {
          elementEntity: {
            entities: {
              'element-1': {
                id: 'element-1',
                attributes: [
                  { name: 'id', value: 'test-id' },
                ],
              },
            },
          },
        };

        const result = selectElementCssClassesByElementId(state, 'element-1');
        expect(result).toEqual([]);
      });
    });
  });

  describe('Binding Selectors', () => {
    describe('selectElementBoundVariablesByElementId', () => {
      it('should return empty array when element has no bindings', () => {
        const state = {
          elementEntity: {
            entities: {
              'element-1': {
                id: 'element-1',
                bindings: [],
              },
            },
          },
        };

        const result = selectElementBoundVariablesByElementId(state, 'element-1');
        expect(result).toEqual([]);
      });

      it('should return empty array when element does not exist', () => {
        const state = {
          elementEntity: {
            entities: {},
          },
        };

        const result = selectElementBoundVariablesByElementId(state, 'non-existent');
        expect(result).toEqual([]);
      });
    });

    describe('selectElementBoundTypographyPresetByElementId', () => {
      it('should return typography preset binding with name', () => {
        const state = {
          elementEntity: {
            entities: {
              'element-1': {
                id: 'element-1',
                bindings: [
                  {
                    kind: ENTITY_KINDS.PRESET_MODE_VALUE,
                    presetType: 'typography',
                    presetId: 'preset-1',
                  },
                ],
              },
            },
          },
        };

        const result = selectElementBoundTypographyPresetByElementId(state, 'element-1');
        expect(result).toBeDefined();
        expect(result.presetName).toBe('Test Preset');
        expect(result.presetId).toBe('preset-1');
      });

      it('should return null when no typography preset binding', () => {
        const state = {
          elementEntity: {
            entities: {
              'element-1': {
                id: 'element-1',
                bindings: [],
              },
            },
          },
        };

        const result = selectElementBoundTypographyPresetByElementId(state, 'element-1');
        expect(result).toBeNull();
      });

      it('should return null when element has no bindings property', () => {
        const state = {
          elementEntity: {
            entities: {
              'element-1': {
                id: 'element-1',
              },
            },
          },
        };

        const result = selectElementBoundTypographyPresetByElementId(state, 'element-1');
        expect(result).toBeNull();
      });
    });
  });
});

