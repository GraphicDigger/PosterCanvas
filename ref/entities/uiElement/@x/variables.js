export {
  selectVariablesBySelectedScreen,
  selectVariablesBySelectedComponent,
  selectAllVariables,
  selectVariableById,
} from '../../varVariableData/model/store/selectors';

// Хуки можно оставить в отдельном экспорте или удалить отсюда
export { useVariables, useVariable } from '../../varVariableData/model/hooks/useVariables';
export { VARIABLE_TYPES } from '@/shared/constants';
