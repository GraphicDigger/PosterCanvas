/** @jsxImportSource @emotion/react */
import {
  VariableNumberIcon,
  VariableStringIcon,
  VariableBoolIcon,
  VariableColorIcon,
  VariableImageIcon,
  VariableVideoIcon,
  VariableDataIcon,

} from '../../../../shared/assets/icons';

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

};

export const VARIABLE_CONFIG = {
  [VARIABLE_TYPES.NUMBER]: {
    type: VARIABLE_TYPES.NUMBER,
    icon: <VariableNumberIcon />,
  },
  [VARIABLE_TYPES.STRING]: {
    type: VARIABLE_TYPES.STRING,
    icon: <VariableStringIcon />,
  },
  [VARIABLE_TYPES.BOOLEAN]: {
    type: VARIABLE_TYPES.BOOLEAN,
    icon: <VariableBoolIcon />,
  },
  [VARIABLE_TYPES.COLOR]: {
    type: VARIABLE_TYPES.COLOR,
    icon: <VariableColorIcon />,
  },
  [VARIABLE_TYPES.IMAGE]: {
    type: VARIABLE_TYPES.IMAGE,
    icon: <VariableImageIcon />,
  },
  [VARIABLE_TYPES.VIDEO]: {
    type: VARIABLE_TYPES.VIDEO,
    icon: <VariableVideoIcon />,
  },
  [VARIABLE_TYPES.DATA]: {
    type: VARIABLE_TYPES.DATA,
    icon: <VariableDataIcon />,
  },
  [VARIABLE_TYPES.DATE]: {
    type: VARIABLE_TYPES.DATE,
    icon: <VariableDataIcon />,
  },
  [VARIABLE_TYPES.JSON]: {
    type: VARIABLE_TYPES.JSON,
    icon: <VariableDataIcon />,
  },
};
