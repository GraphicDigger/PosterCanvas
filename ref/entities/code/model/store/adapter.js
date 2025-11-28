import {
  setSelectedCodeId,
  resetSelectedCode,
} from '../store/slice';

import {
  selectCodeById,
  selectSelectedCode,
} from '../store/selectors';


export const codeAdapter = {
  getById: (state, id) => selectCodeById(state, id),
  getSelected: (state) => selectSelectedCode(state),
  select: setSelectedCodeId,
  resetSelected: resetSelectedCode,
};
