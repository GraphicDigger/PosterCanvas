import { useDispatch } from 'react-redux';
import { createCustomAction, ACTION_TYPES, setActionType } from '../../../../entities/action';
import { ACTION_CONFIG, useActionCrud } from '../../../../entities/action';
import { useFocusEntity } from '../../../../entities/uiFocus';


export const useChangeAction = () => {
  const dispatch = useDispatch();
  const { handleUpdateAction, handleCreateAction } = useActionCrud();
  const { focusEntity } = useFocusEntity();

  const handleAddTrigger = (triggerType) => {
    if (!focusEntity) {return;}
    handleCreateAction({
      entityId: focusEntity.id,
      entityKind: focusEntity.kind,
      trigger: triggerType,
    });
  };


  const handleUpdateTrigger = (actionId, triggerType) => {
    if (!actionId) {return;}
    handleUpdateAction(actionId, {
      trigger: triggerType,
    });
  };


  const handleUpdateActionType = (actionId, typeOrConfig) => {
    if (!actionId) {return;}

    // Проверяем, получили ли мы объект с конфигурацией или просто тип
    if (typeof typeOrConfig === 'object') {
      const { type, config } = typeOrConfig;
      dispatch(setActionType({
        actionId,
        type,
        config,
      }));
    } else {
      dispatch(setActionType({
        actionId,
        type: typeOrConfig,
        config: ACTION_CONFIG[typeOrConfig]?.config || {},
      }));
    }
  };


  const handleUpdateActionConfig = (actionId, fieldName, value) => {
    if (!actionId) {return;}
    handleUpdateAction(actionId, {
      config: {
        [fieldName]: value,
      },
    });
  };


  return {
    handleUpdateActionType,
    handleUpdateActionConfig,
    handleAddTrigger,
    handleUpdateTrigger,
  };
};
