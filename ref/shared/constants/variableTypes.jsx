/** @jsxImportSource @emotion/react */
import {
  VariableNumberIcon,
  VariableStringIcon,
  VariableBoolIcon,
  VariableColorIcon,
  VariableImageIcon,
  VariableVideoIcon,
  VariableDataIcon,
} from '../assets/icons';

export const VARIABLE_TYPES = {
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
};


export const VARIABLE_CONFIG = {
  [VARIABLE_TYPES.NUMBER]: {
    type: VARIABLE_TYPES.NUMBER,
    icon: <VariableNumberIcon />,
    label: 'Number',
  },
  [VARIABLE_TYPES.STRING]: {
    type: VARIABLE_TYPES.STRING,
    icon: <VariableStringIcon />,
    label: 'Text',
  },
  [VARIABLE_TYPES.BOOLEAN]: {
    type: VARIABLE_TYPES.BOOLEAN,
    icon: <VariableBoolIcon />,
    label: 'Boolean',
  },
  [VARIABLE_TYPES.COLOR]: {
    type: VARIABLE_TYPES.COLOR,
    icon: <VariableColorIcon />,
    label: 'Color',
  },
  [VARIABLE_TYPES.IMAGE]: {
    type: VARIABLE_TYPES.IMAGE,
    icon: <VariableImageIcon />,
    label: 'Image',
  },
  [VARIABLE_TYPES.VIDEO]: {
    type: VARIABLE_TYPES.VIDEO,
    icon: <VariableVideoIcon />,
    label: 'Video',
  },
  [VARIABLE_TYPES.DATA]: {
    type: VARIABLE_TYPES.DATA,
    icon: <VariableDataIcon />,
    label: 'Data',
  },
  [VARIABLE_TYPES.DATE]: {
    type: VARIABLE_TYPES.DATE,
    icon: <VariableDataIcon />,
    label: 'Date',
  },
  [VARIABLE_TYPES.JSON]: {
    type: VARIABLE_TYPES.JSON,
    icon: <VariableDataIcon />,
    label: 'JSON',
  },
};
