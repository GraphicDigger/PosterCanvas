import { useSelector } from 'react-redux';
import { createSelector } from '@reduxjs/toolkit';
import { selectPropValueById } from '../store/selectors';

export const usePropValues = (propIds) => {

  const isDefaultPropValue = (propValueId) => {
    const propValue = useSelector(state => selectPropValueById(state, propValueId));
    return propValue?.isDefault;
  };

  return {
    isDefaultPropValue,
  };
};

export const usePropValue = (propValueId) => {
  const propValueById = useSelector(selectPropValueByIdFn);
  const propValue = propValueId ? propValueById(propValueId) : null;

  return {
    propValue,
    propValueById,
  };
};


const selectPropValueByIdFn = createSelector(
  [(state) => state],
  (state) => (id) => selectPropValueById(state, id),
);
