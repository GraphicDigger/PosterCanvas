import propEntitySlice from './model/store/slice';
export { propEntitySlice };

export { PropListItem } from './ui/PropListItem';

// Export missing constants and types
export const PROP_CONFIG = {
  // Add default prop configuration
  defaultType: 'string',
  defaultRequired: false,
  defaultValue: '',
};

export const EProp = {
  // Add prop entity constants
  STRING: 'string',
  NUMBER: 'number',
  BOOLEAN: 'boolean',
  OBJECT: 'object',
  ARRAY: 'array',
};

export const PropList = {
  // Add prop list component or utility
  create: (props) => props,
  validate: (prop) => true,
};

export * from './model';
