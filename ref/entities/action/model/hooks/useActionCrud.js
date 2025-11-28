import { useDispatch } from 'react-redux';
import { createAction, deleteAction, updateAction, createCustomAction } from '../store/slice';
import { ACTION_TYPES } from '../constants/actionTypes';

export const useActionCrud = () => {
  const dispatch = useDispatch();

  const handleCreateAction = ({ entityId, entityKind, trigger }) => {
    console.log('Creating action:', { entityId, entityKind, trigger });
    dispatch(createAction({
      entityId,
      entityKind,
      trigger,
    }));
  };

  const handleCreateCustomAction = () => {
    const customActionId = `custom_action_${Date.now()}`;
    const defaultCode =
`// Custom Action Example
function handleCustomAction(event) {
    // Your code here
    console.log('Custom action triggered:', event);
    
    // Example: Get target element
    const target = event.target;
    
    // Example: Update element style
    target.style.backgroundColor = 'blue';
    
    return true;
}`;
    dispatch(createCustomAction({
      id: customActionId,
      type: ACTION_TYPES.CUSTOM_ACTION,
      label: 'Custom Action',
      config: {
        code: defaultCode,
      },
    }));
    return customActionId;
  };

  const handleUpdateAction = (actionId, updates) => {
    console.log('Updating action:', { actionId, updates });
    dispatch(updateAction({
      actionId,
      updates,
    }));
  };

  const handleDeleteAction = (actionId) => {
    console.log('Deleting action:', actionId);
    dispatch(deleteAction(actionId));
  };


  return {
    handleCreateAction,
    handleUpdateAction,
    handleDeleteAction,
    handleCreateCustomAction,
  };
};
