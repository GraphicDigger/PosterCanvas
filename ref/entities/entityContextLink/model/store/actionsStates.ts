import type { PayloadAction } from '@reduxjs/toolkit';
import type { ContextLinkState, ContextLinkIdPayload, ContextLinkUIState } from '../../types';

export const initialUIState: ContextLinkUIState = {
  hoveredId: null,
  focusedId: null,
  selectedId: null,
};

export const actionsUIState = {

  setHoveredContextLinkId: (state: ContextLinkState, action: PayloadAction<ContextLinkIdPayload>) => {
    state.hoveredId = action.payload.id;
  },
  setFocusedContextLinkId: (state: ContextLinkState, action: PayloadAction<ContextLinkIdPayload>) => {
    state.focusedId = action.payload.id;
  },
  setSelectedContextLinkId: (state: ContextLinkState, action: PayloadAction<ContextLinkIdPayload>) => {
    state.selectedId = action.payload.id;
  },
  resetSelectedContextLink: (state: ContextLinkState) => {
    state.selectedId = null;
  },
};

