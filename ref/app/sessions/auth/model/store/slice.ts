import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface SessionState {
  currentUserId: string | null;
  currentMemberId: string | null;
  currentWorkspaceId: string | null;
  isAuthenticated: boolean;
}

interface SessionStartPayload {
  currentUserId: string;
  currentMemberId: string;
  currentWorkspaceId: string;
}

interface ChangeMemberPayload {
  memberId: string;
  workspaceId: string;
}

const initialState: SessionState = {
  currentUserId: null,
  currentMemberId: null,
  currentWorkspaceId: null,
  isAuthenticated: false,
};

const authSessionSlice = createSlice({
  name: 'authSession',
  initialState,

  reducers: {
    // Старт сессии (логин)
    sessionStarted: (state, action: PayloadAction<SessionStartPayload>) => {
      state.currentUserId = action.payload.currentUserId;
      state.currentMemberId = action.payload.currentMemberId;
      state.currentWorkspaceId = action.payload.currentWorkspaceId;
      state.isAuthenticated = true;
    },

    // Смена роли или проекта в рамках текущего пользователя
    setCurrentMember: (state, action: PayloadAction<ChangeMemberPayload>) => {
      state.currentMemberId = action.payload.memberId;
      state.currentWorkspaceId = action.payload.workspaceId;
    },

    // Логаут
    sessionEnded: (state) => {
      state.currentUserId = null;
      state.currentMemberId = null;
      state.currentWorkspaceId = null;
      state.isAuthenticated = false;
    },
  },
});

export const {
  sessionStarted,
  setCurrentMember,
  sessionEnded,
} = authSessionSlice.actions;

export default authSessionSlice.reducer;
