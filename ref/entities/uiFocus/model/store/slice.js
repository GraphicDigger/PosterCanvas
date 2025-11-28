import { createSlice } from '@reduxjs/toolkit';
import { ENTITY_KINDS } from '../../../../shared/constants';

const initialState = {

  focusEntity: {
    id: null,
    kind: null,
    data: null,
  },
};


const focusSystemSlice = createSlice({
  name: 'focusSystem',
  initialState,
  reducers: {
    setFocusEntity: (state, action) => {
      state.focusEntity = action.payload;
      console.log('action_focusEntity', state.focusEntity);
    },
    resetFocusEntity: (state) => {
      state.focusEntity = initialState.focusEntity;
    },
  },
});

export const {
  setFocusEntity,
  resetFocusEntity,
} = focusSystemSlice.actions;
export default focusSystemSlice.reducer;

