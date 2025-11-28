import { createSlice } from '@reduxjs/toolkit';

const listSlice = createSlice({
  name: 'list',
  initialState: {
    focusedItemId: null,
    hoveredItemId: null,
    selectedItemId: null,
  },
  reducers: {
    setFocusedItem: (state, action) => {
      state.focusedItemId = action.payload;
    },
    setHoveredItem: (state, action) => {
      state.hoveredItemId = action.payload;
    },
    setSelectedItem: (state, action) => {
      state.selectedItemId = action.payload;
    },
  },
});

export const { setFocusedItem, setHoveredItem, setSelectedItem } = listSlice.actions;

export const selectIsItemSelected = (state, itemId) =>
  state.list.selectedItemId === itemId;

export const selectIsItemFocused = (state, itemId) =>
  state.list.focusedItemId === itemId;

export const selectIsItemHovered = (state, itemId) =>
  state.list.hoveredItemId === itemId;

export const selectItemsStates = (state, items, selector) => {
  return items.reduce((acc, item) => {
    acc[item.id] = selector(state, item.id);
    return acc;
  }, {});
};

export default listSlice.reducer;
