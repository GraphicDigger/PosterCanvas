import type { PayloadAction } from '@reduxjs/toolkit';
import type { DefaultElementsState, DefaultElementsIdPayload, DefaultElementsUIState } from '../../types';

export const initialUIState: DefaultElementsUIState = {
  hoveredId: null,
  focusedId: null,
  selectedId: null,
};

export const actionsUIState = {

  setHoveredDefaultElementId: (state: DefaultElementsState, action: PayloadAction<DefaultElementsIdPayload>) => {
    state.hoveredId = action.payload.id;
  },
  setFocusedDefaultElementId: (state: DefaultElementsState, action: PayloadAction<DefaultElementsIdPayload>) => {
    state.focusedId = action.payload.id;
  },
  setSelectedDefaultElementId: (state: DefaultElementsState, action: PayloadAction<DefaultElementsIdPayload>) => {
    state.selectedId = action.payload.id;
  },
  resetSelectedDefaultElement: (state: DefaultElementsState) => {
    state.selectedId = null;
  },
};

