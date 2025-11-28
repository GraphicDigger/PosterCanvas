import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  entities: {},
  ids: [],
  ui: {
    hoveredMemberId: null,
    focusedMemberId: null,
    selectedMemberId: null,
  },
};

const memberEntitySlice = createSlice({
  name: 'memberEntity',
  initialState,
  reducers: {
    setHoveredMemberId: (state, action) => {
      state.ui.hoveredMemberId = action.payload;
    },
    setFocusedMemberId: (state, action) => {
      state.ui.focusedMemberId = action.payload;
    },
    setSelectedMemberId: (state, action) => {
      state.ui.selectedMemberId = action.payload;
      console.log('selectedMemberId', state.ui.selectedMemberId);
    },
    setMembers: (state, action) => {
      const members = action.payload;
      state.entities = members.reduce((acc, member) => {
        acc[member.id] = member;
        return acc;
      }, {});
      state.ids = members.map(member => member.id);

    },
  },
});

export const {
  setHoveredMemberId,
  setFocusedMemberId,
  setSelectedMemberId,
  setMembers,
} = memberEntitySlice.actions;

export default memberEntitySlice.reducer;
