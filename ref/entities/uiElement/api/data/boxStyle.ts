import { ENTITY_KINDS } from '@/shared/constants';
import { ELEMENT_TYPES } from '../../model';
import { Element } from '../../types';

export const boxStyle: Element[] = [

  {
    id: 'box-screen-01',
    name: 'box',
    kind: ENTITY_KINDS.ELEMENT,
    type: ELEMENT_TYPES.BOX,
    ownership: {
      type: ENTITY_KINDS.ELEMENT,
      id: 'body-screen-05',
    },
    tag: 'div',
    properties: {
      style: {
        // border: '1px solid #000000',
        borderRadius: '10px',
        boxShadow: '0 4px 4px 0 rgba(0, 0, 0, 0.30)',

        borderTopLeftRadius: '10px',
        borderTopRightRadius: '10px',
        borderBottomLeftRadius: '10px',
        borderBottomRightRadius: '5px',

        padding: '10px',
        backgroundColor: '#222222',

        fontSize: '14px',
        fontWeight: '500',
        color: '#FFFFFF',
      },
      content: {
        text: 'Border Style Demo',
      },
    },
    attributes: {
      id: 'box-screen-01',
    },
    events: {},
  },
  {
    id: 'box-container-for-cards-layout-instance-02',
    name: 'box',
    kind: ENTITY_KINDS.ELEMENT,
    type: ELEMENT_TYPES.BOX,
    ownership: {
      type: ENTITY_KINDS.ELEMENT,
      id: 'body-screen-07',
    },
    tag: 'div',
    properties: {
      style: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        gap: '10px',
        width: '100%',
        height: 'max-content',
      },
      content: {},
    },
    attributes: {
      id: 'box-container-for-cards-layout-instance-02',
    },
    events: {},
  },

];
