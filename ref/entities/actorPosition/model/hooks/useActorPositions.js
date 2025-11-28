import { useSelector } from 'react-redux';
import {
  selectAllActorPositions,
  selectSelectedActorPosition,
  selectActorPositionsByIds,
} from '../store';


export const useActorPositions = () => {

  const allActorPositions = useSelector(selectAllActorPositions);
  const selectedActorPosition = useSelector(selectSelectedActorPosition);

  return {
    allActorPositions,
    selectedActorPosition,
  };
};

export const useActorPositionsByIds = (ids) => {
  const ActorPositions = useSelector(state => selectActorPositionsByIds(state, ids));

  return {
    ActorPositions,
  };
};

