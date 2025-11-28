import { tokenValueAdapter } from './slice';
import { v4 as uuidv4 } from 'uuid';
import { ENTITY_KINDS } from '../../../../shared/constants';

export const actionsMutation = {

  addTokenValue: (state, action) => {
    const tokenValue = action.payload;
    const newTokenValue = {
      ...tokenValue,
      id: tokenValue.id || uuidv4(),
      kind: ENTITY_KINDS.TOKEN_MODE_VALUE,
      tokenId: tokenValue.tokenId,
      variableModeId: tokenValue.variableModeId,
      value: tokenValue.value || undefined,
    };
    tokenValueAdapter.addOne(state, newTokenValue);
  },

  updateTokenValue: (state, action) => {
    const { id, updates } = action.payload;
    tokenValueAdapter.updateOne(state, { id, changes: updates });
  },

  removeTokenValue: (state, action) => {
    tokenValueAdapter.removeOne(state, action.payload);
  },

  removeTokenValues: (state, action) => {
    tokenValueAdapter.removeMany(state, action.payload);
  },

  removeTokenValuesByVariableModeId: (state, action) => {
    const { variableModeId } = action.payload;
    const filteredEntries = Object.entries(state.entities).filter(
      ([_, entity]) => entity.variableModeId !== variableModeId,
    );
    state.entities = Object.fromEntries(filteredEntries);
    state.ids = filteredEntries.map(([id]) => id);
  },

};
