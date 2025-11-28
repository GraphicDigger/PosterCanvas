import { useDispatch } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import { ENTITY_KINDS } from '../../../../shared/constants';
import { addProp, updateProp, deleteProp, bindingPropsToComponent } from '../store/slice';
import { useProps } from './useProps';

export const usePropMutation = () => {
  const dispatch = useDispatch();

  const handleAddProp = (prop) => {
    dispatch(addProp(prop));
    return prop;
  };

  const handleUpdateProp = (propId, updates) => {
    dispatch(updateProp({ id: propId, ...updates }));
  };

  const handleDeleteProp = (propId) => {
    dispatch(deleteProp(propId));
  };

  const handleBindingPropsToComponent = (payload) => {
    const { componentId, propIds } = payload;
    if (!componentId || !propIds || propIds.length === 0) {
      return;
    }

    dispatch(bindingPropsToComponent({ componentId, propIds }));
    return { componentId, propIds };
  };


  return {
    addProp: handleAddProp,
    updateProp: handleUpdateProp,
    deleteProp: handleDeleteProp,
    handleBindingPropsToComponent,
  };
};
