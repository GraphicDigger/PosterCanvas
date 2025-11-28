import { useDispatch } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import { addPropValue, updatePropValue, deletePropValue, changeDefaultPropValue } from '../store/slice';

export const usePropValueMutation = () => {
  const dispatch = useDispatch();

  const handleAddPropValue = (propId, type) => {
    dispatch(addPropValue({ propId, type }));
  };

  const handleUpdatePropValue = (propValueId, propId, updates) => {
    dispatch(updatePropValue({ id: propValueId, propId, ...updates }));
  };

  const handleDeletePropValue = (propValueId) => {
    dispatch(deletePropValue(propValueId));
  };

  const handleChangeDefaultPropValue = (propValueId) => {
    dispatch(changeDefaultPropValue(propValueId));
  };

  return {
    addPropValue: handleAddPropValue,
    updatePropValue: handleUpdatePropValue,
    deletePropValue: handleDeletePropValue,
    changeDefaultPropValue: handleChangeDefaultPropValue,
  };
};
