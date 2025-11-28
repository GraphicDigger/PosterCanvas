import { useDispatch } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import { ENTITY_KINDS } from '../../../../shared/constants';
import { updateInstanceProp, updateInstanceStyle } from '../store/slice';
import { useInstances } from '../../model';

export const useInstanceMutation = () => {
  const dispatch = useDispatch();
  const { focusedInstance: instance } = useInstances();

  const createInstance = (options = {}) => {
    const {
      name = 'New Instance',
      componentId,
      ownership = {
        type: ENTITY_KINDS.SCREEN,
        screenId: null,
      },
      properties = {},
      propValues = {},
    } = options;

    const newInstance = {
      id: uuidv4(),
      name,
      kind: ENTITY_KINDS.INSTANCE,
      componentId,
      ownership,
      properties,
      propValues,
    };

    dispatch(addInstance(newInstance));
    return newInstance;
  };

  const addInstance = (instance) => {
    if (!instance.id) {
      instance.id = uuidv4();
    }
    if (!instance.kind) {
      instance.kind = ENTITY_KINDS.INSTANCE;
    }
    dispatch(addInstance(instance));
    return instance;
  };

  const handleUpdateInstanceStyle = (id, style) => {
    dispatch(updateInstanceStyle({ id, style }));
  };

  const handleUpdateInstanceProp = (instanceId, propId, updates) => {
    dispatch(updateInstanceProp({
      instanceId,
      propId,
      updates: {
        ...updates,
        propId,
      },
    }));
  };

  return {
    createInstance,
    addInstance,
    updateInstanceProp: handleUpdateInstanceProp,
    updateInstanceStyle: handleUpdateInstanceStyle,
  };
};
