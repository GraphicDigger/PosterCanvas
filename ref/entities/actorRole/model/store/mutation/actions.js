import { ACTOR_TYPE } from '../../constants/actorType';
import { v4 as uuidv4 } from 'uuid';

export const actionsMutation = {

  addActorRole: (state, action) => {
    const { actorType } = action.payload;
    const newId = uuidv4();
    const newName = actorType === ACTOR_TYPE.MEMBER ? 'New Member Role' : 'New Agent Role';
    const newActorRole = {
      id: newId,
      name: newName,
      positionId: '',
      actorType: actorType,
    };

    state.entities[newId] = newActorRole;
    state.ids.unshift(newId);
  },

  removeActorRole: (state, action) => {

  },

  updateActorRoleName: (state, action) => {
    const { actorRoleId, name } = action.payload;
    if (state.entities[actorRoleId]) {
      state.entities[actorRoleId].name = name;
    }
  },

  updateActorRolePosition: (state, action) => {
    const { actorRoleId, positionId } = action.payload;
    if (state.entities[actorRoleId]) {
      state.entities[actorRoleId].positionId = positionId;
    }
  },

  updateActorRoleActorType: (state, action) => {
    const { actorRoleId, actorType } = action.payload;
    if (state.entities[actorRoleId]) {
      state.entities[actorRoleId].actorType = actorType;
    }
  },

  updateActorRoleAgentRoleId: (state, action) => {
    const { actorRoleId, agentRoleId } = action.payload;
    if (state.entities[actorRoleId]) {
      state.entities[actorRoleId].agentRoleId = agentRoleId;
    }
  },

  updateActorRolePrompt: (state, action) => {
    const { actorRoleId, prompt } = action.payload;
    if (state.entities[actorRoleId]) {
      state.entities[actorRoleId].prompt = prompt;
    }
  },


};
