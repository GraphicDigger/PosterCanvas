import { createSelector } from '@reduxjs/toolkit';
import { useSelector } from 'react-redux';
import {
  selectAllVariables,
  selectVariablesBySelectedScreen,
  selectVariablesBySelectedComponent,
  makeSelectVariableById,
  makeSelectVariableByIds,
  selectVariableById,
} from '../store';


interface Props {
  id?: string
  ids?: string[]
}

export const useVariables = ({ id, ids }: Props = {}) => {

  const allVariables = useSelector(selectAllVariables);
  const selectedScreenVariables = useSelector(selectVariablesBySelectedScreen);
  const selectedComponentVariables = useSelector(selectVariablesBySelectedComponent);

  const variableById = id ? useSelector(makeSelectVariableById(id)) : undefined;
  const variableByIds = ids ? useSelector(makeSelectVariableByIds(ids)) : [];

  return {
    allVariables,
    selectedScreenVariables,
    selectedComponentVariables,
    variableById,
    variableByIds,
    makeSelectVariableById,
  };
};

export const useVariable = (id: string) => {
  const variable = useSelector(state => selectVariableById(state, id));
  const variableById = useSelector(selectVariableByIdFn);

  return {
    variable,
    variableById,
  };
};


const selectVariableByIdFn = createSelector(
  [(state) => state],
  (state) => (variableId) => selectVariableById(state, variableId),
);
