import { useSelector } from 'react-redux';
import {
  selectAllActorAgents,
  selectSelectedActorAgent,
  selectActorAgentsByIds,
} from '../store';


export const useActorAgents = () => {

  const allActorAgents = useSelector(selectAllActorAgents);
  const selectedActorAgent = useSelector(selectSelectedActorAgent);

  return {
    allActorAgents,
    selectedActorAgent,
  };
};

export const useActorAgentsByIds = (ids) => {
  const ActorAgents = useSelector(state => selectActorAgentsByIds(state, ids));

  return {
    ActorAgents,
  };
};

