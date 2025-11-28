import { ENTITY_KINDS } from '../../../shared/constants';

export const components = [
  {
    id: 'button-component-new',
    name: 'Button New',
    kind: ENTITY_KINDS.COMPONENT,
    // type: 'component',
    artboard: {
      width: '500px',
      height: '500px',
      display: 'flex',
      flexDirection: 'row',
      backgroundColor: '#FFFFFF',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '10px',
    },
  },
  {
    id: 'icon-component',
    name: 'Icon',
    kind: ENTITY_KINDS.COMPONENT,
  },
  {
    id: 'component-with-array-prop',
    name: 'Cards Layout',
    kind: ENTITY_KINDS.COMPONENT,
  },
  {
    id: 'component-with-collection-model-field-prop',
    name: 'Card',
    kind: ENTITY_KINDS.COMPONENT,
  },
  {
    id: 'component-01',
    name: 'Component 01',
    kind: ENTITY_KINDS.COMPONENT,
  },
  {
    id: 'component-02',
    name: 'Component 02',
    kind: ENTITY_KINDS.COMPONENT,
  },
  {
    id: 'component-03',
    name: 'Component 03',
    kind: ENTITY_KINDS.COMPONENT,
  },
  {
    id: 'component-04',
    name: 'Component 04',
    kind: ENTITY_KINDS.COMPONENT,
  },
  {
    id: 'component-05',
    name: 'Component 05',
    kind: ENTITY_KINDS.COMPONENT,
  },


];
