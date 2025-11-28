import { useSelector } from 'react-redux';
import {
  selectAllActions,
  selectSelectedAction,
  selectActionsByIds,
  selectActionsByEntityId,
  selectCustomActions,
} from '../store/selectors';


export const useActions = () => {

  const allActions = useSelector(selectAllActions);
  const selectedAction = useSelector(selectSelectedAction);
  const customActions = useSelector(selectCustomActions);
  return {
    allActions,
    selectedAction,
    customActions,
  };
};

export const useActionsByIds = (ids) => {
  const Actions = useSelector(state => selectActionsByIds(state, ids));

  return {
    Actions,
  };
};

// Новый хук для получения actions по entity
export const useActionsByEntity = (entityId, entityKind) => {
  const entityActions = useSelector(state =>
    selectActionsByEntityId(state, entityId, entityKind),
  );

  return {
    entityActions,
  };
};

