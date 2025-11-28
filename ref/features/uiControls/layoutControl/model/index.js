export * from './constants/flex';
export * from './constants/positions';
export * from './store';
export * from './hooks/useLayout';
export * from './hooks/useFlex';

// Export missing selectors and actions
export const selectMapState = (state) => state.flexSettings;
export const selectSpacing = (state) => state.flexSettings.spacing;
export const selectFlexSettings = (state) => state.flexSettings;
export const selectDotState = (state) => state.flexSettings.dotState;

// Export missing actions
export const switchAlignItems = (alignItems) => ({ type: 'flexSettings/switchAlignItems', payload: alignItems });
export const setGapRow = (gap) => ({ type: 'flexSettings/setGapRow', payload: gap });
export const setGapColumn = (gap) => ({ type: 'flexSettings/setGapColumn', payload: gap });

