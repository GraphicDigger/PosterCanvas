import { useSelector } from 'react-redux';
import { createSelector } from '@reduxjs/toolkit';
import { selectPropsByComponentId, selectAllProps, selectPropById } from '../store/selectors';
import { useComponents } from '../../../uiComponent';


export const useProps = () => {

  const allProps = useSelector(selectAllProps);
  const { selectedComponentId } = useComponents();
  const selectedComponentProps = useSelector(state => selectPropsByComponentId(state, selectedComponentId));

  return {
    allProps,
    selectedComponentProps,
  };
};

export const useProp = (id) => {
  const prop = useSelector(state => selectPropById(state, id));
  const propById = useSelector(selectPropByIdFn);
  return {
    prop,
    propById,
  };
};


const selectPropByIdFn = createSelector(
  [(state) => state],
  (state) => (id) => selectPropById(state, id),
);
