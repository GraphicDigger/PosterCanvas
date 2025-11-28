import type { PayloadAction } from '@reduxjs/toolkit';
import type { DefaultWidgetsState, DefaultWidgetsIdPayload, DefaultWidgetsUIState } from '../../types';

export const initialUIState: DefaultWidgetsUIState = {
  hoveredId: null,
  focusedId: null,
  selectedId: null,
};

export const actionsUIState = {

  setHoveredDefaultWidgetId: (state: DefaultWidgetsState, action: PayloadAction<DefaultWidgetsIdPayload>) => {
    state.hoveredId = action.payload.id;
  },
  setFocusedDefaultWidgetId: (state: DefaultWidgetsState, action: PayloadAction<DefaultWidgetsIdPayload>) => {
    state.focusedId = action.payload.id;
  },
  setSelectedDefaultWidgetId: (state: DefaultWidgetsState, action: PayloadAction<DefaultWidgetsIdPayload>) => {
    state.selectedId = action.payload.id;
  },
  resetSelectedDefaultWidget: (state: DefaultWidgetsState) => {
    state.selectedId = null;
  },
};

