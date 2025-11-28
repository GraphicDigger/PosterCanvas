// import { selectEventUI } from '../selectors';
// import { createSelector } from '@reduxjs/toolkit';

// export const selectHoveredEventId = (state) => selectEventUI(state).hoveredEventId;
// export const selectFocusedEventId = (state) => selectEventUI(state).focusedEventId;
// export const selectSelectedEventId = (state) => selectEventUI(state).selectedEventId;

// export const selectEventCheckStates = createSelector(
//   [selectSelectedEventId, selectFocusedEventId, selectHoveredEventId, (_, id) => id],
//   (selectedId, focusedId, hoveredId, EventId) => ({
//     isSelected: selectedId === EventId,
//     isFocused: focusedId === EventId,
//     isHovered: hoveredId === EventId,
//   }),
// );
