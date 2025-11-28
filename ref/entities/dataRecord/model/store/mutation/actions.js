import { v4 as uuidv4 } from 'uuid';
import { ENTITY_KINDS } from '../../../../../shared/constants';


export const actionsMutation = {

  addDataRecord: (state, action) => {
    const { recordId, modelId } = action.payload;

    // console.log('[addDataRecord] collectionId', collectionId)
    // console.log('[addDataRecord] recordId', recordId)

    const newRecord = {
      id: recordId,
      kind: ENTITY_KINDS.DATA_RECORD,
      modelId: modelId,
      name: 'New record',
      slug: `record-${recordId}`,
    };
    state.entities[recordId] = newRecord;
    state.ids.push(recordId);
  },

  // Новый action для обновления существующей записи
  updateRecord: (state, action) => {
    const { id, changes } = action.payload;
    if (!id || !state.entities[id]) {return;}

    // Обновляем запись в entities с изменениями (merge, not replace)
    state.entities[id] = { ...state.entities[id], ...changes };
  },

  removeDataRecord: (state, action) => {
    const recordId = action.payload;
    if (state.entities[recordId]) {
      delete state.entities[recordId];
      state.ids = state.ids.filter(id => id !== recordId);
    }
  },
};
