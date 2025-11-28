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
} from '@/shared/assets/icons';


export const MODEL_FIELD_TYPES = {
  TEXT: 'text',
  MULTISTYLE_TEXT: 'multistyleText',
  NUMBER: 'number',
  BOOLEAN: 'boolean',
  IMAGE: 'image',
  IMAGES_GALLERY: 'imagesGallery',
  VIDEO: 'video',
  COLOR: 'color',
  OPTION: 'option',
  FILE: 'file',
  REFERENCE: 'reference',
  MULTI_REFERENCE: 'multiReference',
  JSON: 'json',
  DATE_TIME: 'dateTime',
};

export const MODEL_FIELD_CONFIG = [
  {
    type: MODEL_FIELD_TYPES.TEXT,
    label: 'Text',
    icon: ElementTextIcon,
    description: 'Text',
  },
  {
    type: MODEL_FIELD_TYPES.MULTISTYLE_TEXT,
    label: 'Multistyle Text',
    icon: VariableStringIcon,
    description: 'Multistyle Text',
  },
  {
    type: MODEL_FIELD_TYPES.NUMBER,
    label: 'Number',
    icon: VariableNumberIcon,
    description: 'Number',
  },
  {
    type: MODEL_FIELD_TYPES.BOOLEAN,
    label: 'Boolean',
    icon: VariableBoolIcon,
    description: 'Boolean',
  },
  {
    type: MODEL_FIELD_TYPES.IMAGE,
    label: 'Image',
    icon: VariableImageIcon,
    description: 'Image',
  },
  {
    type: MODEL_FIELD_TYPES.IMAGES_GALLERY,
    label: 'Images Gallery',
    icon: VariableImageIcon,
    description: 'Images Gallery',
  },
  {
    type: MODEL_FIELD_TYPES.VIDEO,
    label: 'Video',
    icon: VariableVideoIcon,
    description: 'Video',
  },
  {
    type: MODEL_FIELD_TYPES.COLOR,
    label: 'Color',
    icon: VariableColorIcon,
    description: 'Color picker',
  },
  {
    type: MODEL_FIELD_TYPES.OPTION,
    label: 'Option',
    icon: ArrowUpDownIcon,
    description: 'Select from a list of options',
  },
  {
    type: MODEL_FIELD_TYPES.FILE,
    label: 'File',
    icon: ImportIcon,
    description: 'File upload',
  },
  {
    type: MODEL_FIELD_TYPES.REFERENCE,
    label: 'Reference',
    icon: VariableDataIcon,
    description: 'Reference to another record',
  },
  {
    type: MODEL_FIELD_TYPES.MULTI_REFERENCE,
    label: 'Multi-reference',
    icon: VariableDataIcon,
    description: 'Multiple references to other records',
  },
  // {
  //     type: MODEL_FIELD_TYPES.DATE_TIME,
  //     label: 'Date Time',
  //     icon: DataTableIcon,
  //     description: 'Date Time',
  // },
  // {
  //     type: MODEL_FIELD_TYPES.JSON,
  //     label: 'JSON',
  //     icon: VariableDataIcon,
  //     description: 'JSON data object',
  // },
];

