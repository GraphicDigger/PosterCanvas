import { createSlice } from '@reduxjs/toolkit';
import { initialWireframeBlockData, actionsWireframeBlockData } from './actionsWireframeBlockData';
import { initialWireframeBlockUI, actionsWireframeBlockUI } from './actionsWireframeBlockUI';

const initialState = {
  ...initialWireframeBlockData,
  ui: initialWireframeBlockUI,
};

const wireframeBlockEntitySlice = createSlice({
  name: 'wireframeBlockEntity',
  initialState,
  reducers: {
    ...actionsWireframeBlockUI,
    ...actionsWireframeBlockData,
  },
});

export const {
  // UI Actions
  setHoveredWireframeBlockId,
  setFocusedWireframeBlockId,
  setSelectedWireframeBlockId,
  // Data Actions
  setWireframeBlocks,
  addWireframeBlock,
  updateWireframeBlock,
  removeWireframeBlock,
} = wireframeBlockEntitySlice.actions;

export default wireframeBlockEntitySlice.reducer;
