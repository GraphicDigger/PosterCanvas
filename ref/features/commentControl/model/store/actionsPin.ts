import { PayloadAction } from '@reduxjs/toolkit';
import { type CommentControlState } from '../../types';

export const initialPinState = {
  absolutePinPosition: null,
  relativePinPosition: null,
};

export const actionsPin = {

  setAbsolutePinPosition: (
    state: CommentControlState, action: PayloadAction<{ x: number, y: number }>,
  ) => {
    state.absolutePinPosition = action.payload;
  },

  setRelativePinPosition: (
    state: CommentControlState, action: PayloadAction<{ targetId: string, relativeX: number, relativeY: number }>,
  ) => {
    state.relativePinPosition = action.payload;
  },
};
