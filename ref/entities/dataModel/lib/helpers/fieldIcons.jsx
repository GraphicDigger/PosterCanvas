import { MODEL_FIELD_TYPES } from '../../../dataModelField/model/constants/modelFieldTypes.js';
import {
  ElementTextIcon,
  VariableStringIcon,
  VariableNumberIcon,
  VariableBoolIcon,
  VariableImageIcon,
  VariableVideoIcon,
  VariableColorIcon,
  ArrowUpDownIcon,
  VariableDataIcon,
  ImportIcon,
  DataTableIcon,
} from '../../../../shared/assets/icons/index.js';

export const getFieldIcon = (type) => {
  switch (type) {
  case MODEL_FIELD_TYPES.NAME:
  case MODEL_FIELD_TYPES.SLUG:
  case MODEL_FIELD_TYPES.TEXT:
    return <ElementTextIcon />;
  case MODEL_FIELD_TYPES.MULTISTYLE_TEXT:
    return <VariableStringIcon />;
  case MODEL_FIELD_TYPES.NUMBER:
    return <VariableNumberIcon />;
  case MODEL_FIELD_TYPES.BOOLEAN:
    return <VariableBoolIcon />;
  case MODEL_FIELD_TYPES.IMAGE:
  case MODEL_FIELD_TYPES.IMAGES_GALLERY:
    return <VariableImageIcon />;
  case MODEL_FIELD_TYPES.VIDEO:
    return <VariableVideoIcon />;
  case MODEL_FIELD_TYPES.COLOR:
    return <VariableColorIcon />;
  case MODEL_FIELD_TYPES.OPTION:
    return <ArrowUpDownIcon />;
  case MODEL_FIELD_TYPES.FILE:
    return <ImportIcon />;
  case MODEL_FIELD_TYPES.DATE_TIME:
    return <DataTableIcon />;
  case MODEL_FIELD_TYPES.REFERENCE:
  case MODEL_FIELD_TYPES.MULTI_REFERENCE:
    return <VariableDataIcon />;
  default:
    return null;
  }
};

