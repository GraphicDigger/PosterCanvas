import { v4 as uuidv4 } from 'uuid';
import { ENTITY_KINDS } from '../../../../shared/constants';
import { tokenAdapter } from './slice';

export const actionsMutation = {

  addToken: (state, action) => {
    const token = action.payload;
    const newToken = {
      ...token,
      id: token.id || uuidv4(),
      kind: ENTITY_KINDS.TOKEN,
      type: token.type || undefined,
      collectionId: token.collectionId,
      name: token.name || 'Token',
    };
    tokenAdapter.addOne(state, newToken);
  },

  updateToken: (state, action) => {
    const { id, updates } = action.payload;
    tokenAdapter.updateOne(state, { id, changes: updates });
  },

  removeToken: (state, action) => {
    const id = action.payload;
    tokenAdapter.removeOne(state, id);
  },

  removeTokensFromCollection: (state, action) => {
    const collectionId = action.payload;
    state.ids = state.ids.filter(tokenId => state.entities[tokenId].collectionId !== collectionId);
    state.entities = Object.fromEntries(
      Object.entries(state.entities).filter(([_, token]) => token.collectionId !== collectionId),
    );
  },
};
