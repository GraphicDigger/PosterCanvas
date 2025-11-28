import { ENTITY_KINDS, VARIABLE_TYPES } from '../../../shared/constants';

import img from '../../../shared/assets/dummy/chris-nguyen-aTX_bRaOZnA-unsplash.jpg';

/**
 * Factory function to create props data
 * IMPORTANT: This uses lazy evaluation to avoid eager loading of constants
 * This ensures tests can properly mock ENTITY_KINDS and VARIABLE_TYPES
 * @returns {Object} Props data object
 */
export const getPropsData = () => ({
  'prop-00': {
    id: 'prop-00',
    name: 'name',
    kind: ENTITY_KINDS.PROP,
    type: VARIABLE_TYPES.STRING,
    componentId: 'button-component-new',
    defaultValue: 'Button',
  },
  'prop-01-1': {
    id: 'prop-01-1',
    name: 'backgroundColor',
    kind: ENTITY_KINDS.PROP,
    type: VARIABLE_TYPES.COLOR,
    componentId: 'button-component-new',
    defaultValue: '#000000',
  },
  'prop-01-2': {
    id: 'prop-01-2',
    name: 'size',
    kind: ENTITY_KINDS.PROP,
    type: VARIABLE_TYPES.STRING,
    componentId: 'button-component-new',
    defaultValue: '200px',
  },
  'prop-07': {
    id: 'prop-07',
    name: 'isVisible',
    kind: ENTITY_KINDS.PROP,
    type: VARIABLE_TYPES.BOOLEAN,
    componentId: 'button-component-new',
    defaultValue: true,
  },
  'prop-01-3': {
    id: 'prop-01-3',
    name: 'width',
    kind: ENTITY_KINDS.PROP,
    type: VARIABLE_TYPES.STRING,
    componentId: 'button-component-new',
    defaultValue: 'max-content',
  },
  'prop-02': {
    id: 'prop-02',
    name: 'text',
    kind: ENTITY_KINDS.PROP,
    type: VARIABLE_TYPES.STRING,
    componentId: 'component-02',
    defaultValue: '',
  },
  'prop-03': {
    id: 'prop-03',
    name: 'isVisible',
    kind: ENTITY_KINDS.PROP,
    type: VARIABLE_TYPES.BOOLEAN,
    componentId: 'component-03',
    defaultValue: true,
  },
  'prop-04': {
    id: 'prop-04',
    name: 'fontSize',
    kind: ENTITY_KINDS.PROP,
    type: VARIABLE_TYPES.NUMBER,
    componentId: 'component-04',
    defaultValue: 16,
  },
  'prop-05': {
    id: 'prop-05',
    name: 'fontWeight',
    kind: ENTITY_KINDS.PROP,
    type: VARIABLE_TYPES.NUMBER,
    componentId: 'component-05',
    defaultValue: 400,
  },
  'prop-06': {
    id: 'prop-06',
    name: 'propValue',
    kind: ENTITY_KINDS.PROP,
    type: VARIABLE_TYPES.STRING,
    componentId: 'component-06',
    defaultValue: '',
  },
  'prop-07': {
    id: 'prop-07',
    name: 'Array',
    kind: ENTITY_KINDS.PROP,
    type: VARIABLE_TYPES.DATA,
    componentId: 'component-with-array-prop',
    defaultValue: { modelId: 'model0' },
  },
  'prop-08': {
    id: 'prop-08',
    name: 'color',
    kind: ENTITY_KINDS.PROP,
    type: VARIABLE_TYPES.COLOR,
    componentId: 'icon-component',
    defaultValue: '#111111',
  },
  'prop-09': {
    id: 'prop-09',
    name: 'name',
    kind: ENTITY_KINDS.PROP,
    type: VARIABLE_TYPES.STRING,
    componentId: 'component-with-collection-model-field-prop',
    defaultValue: 'Card Name',
  },
  'prop-10': {
    id: 'prop-10',
    name: 'image',
    kind: ENTITY_KINDS.PROP,
    type: VARIABLE_TYPES.IMAGE,
    componentId: 'component-with-collection-model-field-prop',
    defaultValue: img,
  },
});

/**
 * @deprecated Use getPropsData() instead for better testability
 * This maintains backward compatibility but will be removed in future versions
 */
export const props = getPropsData();
