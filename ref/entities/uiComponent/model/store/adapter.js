import {
  setSelectedComponentId,
  resetSelectedComponent,
} from '../store/slice';

import {
  selectComponentById,
  selectSelectedComponent,
} from '../store/selectors';


export const componentAdapter = {
  getById: (state, id) => selectComponentById(state, id),
  getSelected: selectSelectedComponent,
  select: setSelectedComponentId,
  resetSelected: resetSelectedComponent,
};
