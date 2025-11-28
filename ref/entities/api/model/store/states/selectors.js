export const selectHoveredApiId = (state) => state.apiEntity?.hoveredApiId;
export const selectSelectedApiId = (state) => state.apiEntity?.selectedApiId;
export const selectFocusedApiId = (state) => state.apiEntity?.focusedApiId;

export const selectHoveredCallId = (state) => state.apiEntity?.hoveredCallId;
export const selectFocusedCallId = (state) => state.apiEntity?.focusedCallId;
export const selectSelectedCallId = (state) => state.apiEntity?.selectedCallId;

export const selectHoveredCategoryId = (state) => state.apiEntity?.hoveredCategoryId;
export const selectFocusedCategoryId = (state) => state.apiEntity?.focusedCategoryId;
export const selectSelectedCategoryId = (state) => state.apiEntity?.selectedCategoryId;

export const selectApiCheckStates = (state, apiId) => ({
  isSelected: state.apiEntity?.selectedApiId === apiId,
  isHovered: state.apiEntity?.hoveredApiId === apiId,
  isFocused: state.apiEntity?.focusedApiId === apiId,
});

export const selectCallCheckStates = (state, callId) => ({
  isSelected: state.apiEntity?.selectedCallId === callId,
  isHovered: state.apiEntity?.hoveredCallId === callId,
  isFocused: state.apiEntity?.focusedCallId === callId,
});

export const selectCategoryCheckStates = (state, categoryId) => ({
  isSelected: state.apiEntity?.selectedCategoryId === categoryId,
  isHovered: state.apiEntity?.hoveredCategoryId === categoryId,
  isFocused: state.apiEntity?.focusedCategoryId === categoryId,
});
