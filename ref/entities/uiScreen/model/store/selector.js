import { createSelector } from '@reduxjs/toolkit';
import { ENTITY_KINDS } from '../../../../shared/constants/index.js';
import { selectContextObjectsMap } from '../../@x/contextLink';
import { attachContextToScreen } from '../../lib';


// Базовые селекторы
export const selectScreenState = state => state.screenEntity;
export const selectScreenUI = state => state.screenEntity;
export const selectScreenEntities = state => state.screenEntity.entities;
export const selectScreenIds = state => state.screenEntity.ids;

// Селекторы для отдельных частей состояния
export const selectHoveredScreenId = (state) => selectScreenUI(state)?.hoveredScreenId || null;
export const selectFocusedScreenId = (state) => selectScreenUI(state)?.focusedScreenId || null;
export const selectSelectedScreenId = (state) => selectScreenUI(state)?.selectedScreenId || null;

export const selectScreenCheckStates = createSelector(
  [selectSelectedScreenId, selectFocusedScreenId, selectHoveredScreenId, (_, id) => id],
  (selectedId, focusedId, hoveredId, screenId) => ({
    isSelected: selectedId === screenId,
    isFocused: focusedId === screenId,
    isHovered: hoveredId === screenId,
  }),
);

// Селекторы данных
export const selectAllScreens = createSelector(
  [selectScreenIds, selectScreenEntities],
  (ids, entities) => ids.map(id => entities[id]),
);
export const selectScreenById = createSelector(
  [selectScreenEntities, (_, id) => id],
  (entities, id) => entities[id],
);

// selectedScreen
export const selectSelectedScreen = createSelector(
  [selectSelectedScreenId, selectScreenEntities],
  (selectedScreenId, entities) => {
    if (!selectedScreenId) {return null;}
    return entities[selectedScreenId];
  },
);

export const selectAllScreensWithContext = createSelector(
  [selectScreenIds, selectScreenEntities, selectContextObjectsMap],
  (ids, entities, contextObjectsMap) => ids.map(id => {
    // 🔧 Проверяем что screen существует перед attachContextToScreen
    const screen = entities[id];
    return screen ? attachContextToScreen(screen, contextObjectsMap) : null;
  }).filter(Boolean), // Убираем null значения
);

export const selectScreenByIdWithContext = createSelector(
  [selectScreenEntities, selectContextObjectsMap, (_, id) => id],
  (entities, contextObjectsMap, id) => {
    const screen = entities[id];
    if (!screen) {return null;}
    return attachContextToScreen(screen, contextObjectsMap);
  },
);

export const selectSelectedScreenWithContext = createSelector(
  [selectSelectedScreenId, selectScreenEntities, selectContextObjectsMap],
  (selectedScreenId, entities, contextObjectsMap) => {
    if (!selectedScreenId) {return null;}
    return attachContextToScreen(entities[selectedScreenId], contextObjectsMap);
  },
);


export const selectCompositeSelectedScreen = createSelector(
  [selectSelectedScreen],
  (screen) => {
    // 🔧 Проверяем что screen не null перед обращением к screen.id
    if (!screen) {return null;}

    return {
      ...screen,
      childrens: [], // Will be populated by the hook using the parameterized selector
    };
  },
);

// Additional selectors for integration tests
export const selectScreenCount = createSelector(
  [selectAllScreens],
  (screens) => screens.length,
);

export const selectScreenViewType = (state) => state.screenEntity?.viewType || 'wireframe';

export const selectScreensByKind = createSelector(
  [selectAllScreens],
  (screens) => {
    return screens.reduce((acc, screen) => {
      const kind = screen.kind || 'SCREEN';
      if (!acc[kind]) {
        acc[kind] = [];
      }
      acc[kind].push(screen);
      return acc;
    }, {});
  },
);

export const selectScreensWithPreview = createSelector(
  [selectAllScreens],
  (screens) => screens.filter(screen => screen.preview && screen.preview.trim() !== ''),
);

export const selectScreensWithDocumentation = createSelector(
  [selectAllScreens],
  (screens) => screens.filter(screen => screen.doc && screen.doc.trim() !== ''),
);
