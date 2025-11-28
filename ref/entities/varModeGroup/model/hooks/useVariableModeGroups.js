import { useSelector } from 'react-redux';
import { createSelector } from 'reselect';
import {
  selectAllVariableModeGroups,
  selectSelectedVariableModeGroup,
  selectVariableModeGroupsByIds,
  selectVariableModeGroupById,
} from '../store';


export const useVariableModeGroups = () => {

  const allVariableModeGroups = useSelector(selectAllVariableModeGroups);
  const selectedVariableModeGroup = useSelector(selectSelectedVariableModeGroup);

  return {
    allVariableModeGroups,
    selectedVariableModeGroup,
  };
};

export const useVariableModeGroupsByIds = (ids) => {
  const variableModeGroups = useSelector(state => selectVariableModeGroupsByIds(state, ids));

  return {
    variableModeGroups,
  };
};

export const useVariableModeGroup = () => {
  const variableModeGroupById = useSelector(selectVariableModeGroupByIdFn);

  return {
    variableModeGroupById,
  };
};

export const selectVariableModeGroupByIdFn = createSelector(
  [(state) => state],
  (state) => (id) => selectVariableModeGroupById(state, id),

);

