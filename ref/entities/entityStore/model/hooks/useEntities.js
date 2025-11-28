import { useSelector, useDispatch } from 'react-redux';
import { entitySelectors, entityActions } from '../store';


export const useEntities = (entityKind, entityId) => {

  const dispatch = useDispatch();

  const selectedEntity = useSelector(state => entitySelectors.getSelected(state, entityKind));
  const resetSelectedEntity = () => dispatch(entityActions.resetSelected(entityKind));
  const handleSelectEntity = () => dispatch(entityActions.select(entityKind, entityId));

  return {
    selectedEntity,
    handleSelectEntity,
    resetSelectedEntity,
  };
};
