import type { PayloadAction } from '@reduxjs/toolkit';
import type { ProjectMemberState, ProjectMemberIdPayload, ProjectMemberUIState } from '../../types';

export const initialUIState: ProjectMemberUIState = {
  hoveredId: null,
  focusedId: null,
  selectedId: null,
};

export const actionsUIState = {

  setHoveredProjectMemberId: (state: ProjectMemberState, action: PayloadAction<ProjectMemberIdPayload>) => {
    state.hoveredId = action.payload.id;
  },
  setFocusedProjectMemberId: (state: ProjectMemberState, action: PayloadAction<ProjectMemberIdPayload>) => {
    state.focusedId = action.payload.id;
  },
  setSelectedProjectMemberId: (state: ProjectMemberState, action: PayloadAction<ProjectMemberIdPayload>) => {
    state.selectedId = action.payload.id;
  },
  resetSelectedProjectMember: (state: ProjectMemberState) => {
    state.selectedId = null;
  },
};

