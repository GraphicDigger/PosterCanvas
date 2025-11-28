import type { PayloadAction } from '@reduxjs/toolkit';
import type { ChatState, ChatIdPayload, ChatUIState } from '../../types';

export const initialUIState: ChatUIState = {
  hoveredId: null,
  focusedId: null,
  selectedId: null,
};

export const actionsUIState = {

  setHoveredChatId: (state: ChatState, action: PayloadAction<ChatIdPayload>) => {
    state.hoveredId = action.payload.id;
  },
  setFocusedChatId: (state: ChatState, action: PayloadAction<ChatIdPayload>) => {
    state.focusedId = action.payload.id;
  },
  setSelectedChatId: (state: ChatState, action: PayloadAction<ChatIdPayload>) => {
    state.selectedId = action.payload.id;
  },
  resetSelectedChat: (state: ChatState) => {
    state.selectedId = null;
  },
};

