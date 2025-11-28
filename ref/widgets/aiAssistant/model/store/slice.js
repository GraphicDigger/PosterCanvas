import { createSlice } from '@reduxjs/toolkit';
import { initialMessenger, actionsMessenger } from './messenger/actions';
import { initialVisible, actionsVisible } from './visible/actions';

const initialState = {
  ...initialMessenger,
  ...initialVisible,
};

export const aiAssistantSlice = createSlice({
  name: 'aiAssistant',
  initialState,
  reducers: {
    ...actionsVisible,
    ...actionsMessenger,
  },
});

export const {
  // Messenger actions
  addMessage,
  setActiveChat,
  selectMessage,
  createChat,
  deleteChat,
  resetMessenger,

  // Visible actions
  toggleModelEnabled,
  setModelEnabled,
  toggleAssistant,
  setAssistantOpen,
  resetVisible,
} = aiAssistantSlice.actions;

export default aiAssistantSlice.reducer;
