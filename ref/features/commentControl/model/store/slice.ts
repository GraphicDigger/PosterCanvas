import { createSlice } from '@reduxjs/toolkit';
import { initialSidebarState, actionsSidebar } from './actionsSidebar';
import { initialPinState, actionsPin } from './actionsPin';

const initialState = {
  ...initialSidebarState,
  ...initialPinState,
};


export const commentControlSlice = createSlice({
  name: 'commentControl',
  initialState,
  reducers: {
    ...actionsSidebar,
    ...actionsPin,
  },
});

export const {
  setIsOpenReplies,
  toggleIsOpenReplies,
  openReplies,
  closeReplies,

  setAbsolutePinPosition,
  setRelativePinPosition,

} = commentControlSlice.actions;

export default commentControlSlice.reducer;
