import { useSelector, useDispatch } from 'react-redux';
import { ACTOR_TYPE } from '../constants/actorType';
import {
  selectAllActorRoles,
  selectSelectedActorRole,
  selectActorRolesByIds,
  selectAgentsRoles,
  selectMembersRoles,
  selectSelectedActorRoleIsAgent,
  selectSelectedActorRoleIsMember,
  selectSelectedActorRoleId,
  //actions
  addActorRole,
  removeActorRole,
  updateActorRoleName,
  updateActorRolePosition,
  updateActorRoleActorType,
  updateActorRoleAgentRoleId,
  updateActorRolePrompt,
} from '../store';

export const useActorRoles = () => {

  const allActorRoles = useSelector(selectAllActorRoles);
  const selectedActorRole = useSelector(selectSelectedActorRole);
  const isAgentRole = useSelector(selectSelectedActorRoleIsAgent);
  const isMemberRole = useSelector(selectSelectedActorRoleIsMember);
  const membersRoles = useSelector(selectMembersRoles);

  const agentsRoles = useSelector(selectAgentsRoles);

  return {
    allActorRoles,
    selectedActorRole,
    agentsRoles,
    membersRoles,
    isAgentRole,
    isMemberRole,
  };
};

export const useActorRolesByIds = (ids) => {
  const ActorRoles = useSelector(state => selectActorRolesByIds(state, ids));
  return {
    ActorRoles,
  };
};


export const useActorRoleMutations = () => {
  const dispatch = useDispatch();

  const selectedActorRoleId = useSelector(selectSelectedActorRoleId);

  const handleAddActorRole = (actorType) => {
    dispatch(addActorRole({ actorType }));
  };

  const handleRemoveActorRole = (actorRoleId) => {
    dispatch(removeActorRole({ actorRoleId }));
  };

  const handleUpdateActorRoleName = (name) => {
    dispatch(updateActorRoleName({ actorRoleId: selectedActorRoleId, name }));
  };

  const handleUpdateActorRolePosition = (positionId) => {
    dispatch(updateActorRolePosition({ actorRoleId: selectedActorRoleId, positionId }));
  };

  const handleUpdateActorRoleActorType = (actorType) => {
    dispatch(updateActorRoleActorType({ actorRoleId: selectedActorRoleId, actorType }));
  };

  const handleUpdateActorRoleAgentRoleId = (agentRoleId) => {
    dispatch(updateActorRoleAgentRoleId({ actorRoleId: selectedActorRoleId, agentRoleId }));
  };

  const handleUpdateActorRolePrompt = (prompt) => {
    dispatch(updateActorRolePrompt({ actorRoleId: selectedActorRoleId, prompt }));
  };

  return {
    addActorRole: handleAddActorRole,
    updateActorRoleName: handleUpdateActorRoleName,
    removeActorRole: handleRemoveActorRole,
    updateActorRolePosition: handleUpdateActorRolePosition,
    updateActorRoleActorType: handleUpdateActorRoleActorType,
    updateActorRoleAgentRoleId: handleUpdateActorRoleAgentRoleId,
    updateActorRolePrompt: handleUpdateActorRolePrompt,
  };
};

