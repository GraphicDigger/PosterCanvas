import type { PayloadAction } from '@reduxjs/toolkit';
import type { UserState, UserIdPayload, UserUIState } from '../../types';

export const initialUIState: UserUIState = {
  hoveredId: null,
  focusedId: null,
  selectedId: 'id-user-1',
};

export const actionsUIState = {

  setHoveredUserId: (state: UserState, action: PayloadAction<UserIdPayload>) => {
    state.hoveredId = action.payload.id;
  },
  setFocusedUserId: (state: UserState, action: PayloadAction<UserIdPayload>) => {
    state.focusedId = action.payload.id;
  },
  setSelectedUserId: (state: UserState, action: PayloadAction<UserIdPayload>) => {
    state.selectedId = action.payload.id;
  },
  resetSelectedUser: (state: UserState) => {
    state.selectedId = null;
  },
};

