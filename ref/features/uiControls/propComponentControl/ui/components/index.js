import { VARIABLE_TYPES } from '@/shared/constants';
import { PropSettings } from './PropSettings';
import { DataSettings } from './DataSettings';

export const PROP_SETTINGS_MAP = {
  [VARIABLE_TYPES.NUMBER]: PropSettings,
  [VARIABLE_TYPES.STRING]: PropSettings,
  [VARIABLE_TYPES.BOOLEAN]: PropSettings,
  [VARIABLE_TYPES.COLOR]: PropSettings,
  [VARIABLE_TYPES.IMAGE]: PropSettings,
  [VARIABLE_TYPES.VIDEO]: PropSettings,
  [VARIABLE_TYPES.DATA]: DataSettings,
  [VARIABLE_TYPES.DATE]: PropSettings,
  [VARIABLE_TYPES.JSON]: PropSettings,
  [VARIABLE_TYPES.ENUM]: PropSettings,
};
