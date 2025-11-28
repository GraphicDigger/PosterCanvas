import { v4 as uuidv4 } from 'uuid';
import { ENTITY_KINDS } from '../../../../../shared/constants';


export const actionsMutation = {

  addScreen: (state, action) => {
    const { id, name, preview, doc, ...otherProps } = action.payload;
    const newScreen = {
      id: id || uuidv4(),
      name: name || 'New Screen',
      kind: ENTITY_KINDS.SCREEN,
      preview: preview || '',
      doc: doc || '',
      ...otherProps,
    };
    state.entities[newScreen.id] = newScreen;
    state.ids.push(newScreen.id);

  },
  updateScreen: (state, action) => {
    const { id, ...changes } = action.payload;
    if (state.entities[id]) {
      state.entities[id] = { ...state.entities[id], ...changes };
    }
  },
  removeScreen: (state, action) => {
    const id = action.payload;
    delete state.entities[id];
    state.ids = state.ids.filter(screenId => screenId !== id);
  },
};
