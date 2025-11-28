import { createSlice } from '@reduxjs/toolkit';
import { ENTITY_KINDS } from '../../../../shared/constants';
import { ACTION_CONFIG } from '../constants/actionConfig';
import { ACTION_TYPES } from '../constants/actionTypes';

const initialState = {
  entities: {},
  ids: [],
  ui: {
    hoveredActionId: null,
    focusedActionId: null,
    selectedActionId: null,
  },
  relations: {
    byComponent: {},
    byScreen: {},
    byElement: {},
    // other
  },
};

const actionEntitySlice = createSlice({
  name: 'actionEntity',
  initialState,
  reducers: {
    setHoveredActionId: (state, action) => {
      state.ui.hoveredActionId = action.payload;
    },
    setFocusedActionId: (state, action) => {
      state.ui.focusedActionId = action.payload;
    },
    setSelectedActionId: (state, action) => {
      state.ui.selectedActionId = action.payload;
      console.log('selectedActionId', state.ui.selectedActionId);
    },
    setActions: (state, action) => {
      const actions = action.payload;

      // Очищаем текущее состояние
      state.entities = {};
      state.ids = [];
      state.relations.byComponent = {};
      state.relations.byScreen = {};
      state.relations.byElement = {};

      actions.forEach(action => {
        // Добавляем в основное хранилище
        state.entities[action.id] = action;
        state.ids.push(action.id);

        // Если есть componentId, добавляем в relations (для обратной совместимости)
        if (action.componentId) {
          if (!state.relations.byComponent[action.componentId]) {
            state.relations.byComponent[action.componentId] = [];
          }
          state.relations.byComponent[action.componentId].push(action.id);
        }
      });
    },
    createAction: (state, action) => {
      const {
        entityId,
        entityKind,
        trigger,
      } = action.payload;

      const newAction = {
        id: `action-${Date.now()}`,
        kind: ENTITY_KINDS.ACTION,
        name: 'New Action',
        type: null,
        trigger: trigger,
        entityId,
        entityKind,
        config: {},
      };

      // Добавляем в основное хранилище
      state.entities[newAction.id] = newAction;
      state.ids.push(newAction.id);
      console.log ('Action: CreateAction —>', newAction);

      // Добавляем в соответствующую связь
      switch (entityKind) {
      case ENTITY_KINDS.COMPONENT:
        if (!state.relations.byComponent[entityId]) {
          state.relations.byComponent[entityId] = [];
        }
        state.relations.byComponent[entityId].push(newAction.id);
        break;
      case ENTITY_KINDS.SCREEN:
        if (!state.relations.byScreen[entityId]) {
          state.relations.byScreen[entityId] = [];
        }
        state.relations.byScreen[entityId].push(newAction.id);
        break;
      case ENTITY_KINDS.ELEMENT:
        if (!state.relations.byElement[entityId]) {
          state.relations.byElement[entityId] = [];
        }
        state.relations.byElement[entityId].push(newAction.id);
        break;
      }

      // Выбираем новый action
      state.ui.selectedActionId = newAction.id;
    },

    createCustomAction: (state, action) => {
      const customAction = action.payload;

      state.entities[customAction.id] = {
        ...customAction,
        kind: ENTITY_KINDS.ACTION,
        type: ACTION_TYPES.CUSTOM_ACTION,
        createdAt: Date.now(),
        updatedAt: Date.now(),
      };

      state.ids.push(customAction.id);
      state.ui.selectedActionId = customAction.id;
    },

    // Удаление action с учетом связей
    deleteAction: (state, action) => {
      const actionId = action.payload;
      const actionToDelete = state.entities[actionId];

      if (actionToDelete) {
        // Удаляем из соответствующей связи
        switch (actionToDelete.entityKind) {
        case ENTITY_KINDS.COMPONENT:
          state.relations.byComponent[actionToDelete.entityId] =
                            state.relations.byComponent[actionToDelete.entityId]?.filter(id => id !== actionId);
          break;
        case ENTITY_KINDS.SCREEN:
          state.relations.byScreen[actionToDelete.entityId] =
                            state.relations.byScreen[actionToDelete.entityId]?.filter(id => id !== actionId);
          break;
        case ENTITY_KINDS.ELEMENT:
          state.relations.byElement[actionToDelete.entityId] =
                            state.relations.byElement[actionToDelete.entityId]?.filter(id => id !== actionId);
          break;
        }

        // Удаляем из основного хранилища
        delete state.entities[actionId];
        state.ids = state.ids.filter(id => id !== actionId);
      }
    },

    setActionType: (state, action) => {
      const { actionId, type, config } = action.payload;
      const actionToUpdate = state.entities[actionId];

      if (actionToUpdate) {
        // Полностью заменяем тип и конфигурацию
        state.entities[actionId] = {
          ...actionToUpdate,
          type,
          name: type === ACTION_TYPES.CUSTOM_ACTION
            ? 'Custom Action'
            : `New ${ACTION_CONFIG[type]?.label || type}`,
          config: config || {},
          updatedAt: Date.now(),
        };
      }
    },

    updateAction: (state, action) => {
      const { actionId, updates } = action.payload;
      const actionToUpdate = state.entities[actionId];

      if (actionToUpdate) {
        // Если меняется тип, обновляем конфиг
        if (updates.type && updates.type !== actionToUpdate.type) {
          updates.config = {
            ...ACTION_CONFIG[updates.type].config,
            ...updates.config, // Сохраняем пользовательские настройки если есть
          };
        }

        // Обновляем все поля
        state.entities[actionId] = {
          ...actionToUpdate,
          ...updates,
          // Обновляем дату изменения
          updatedAt: Date.now(),
        };

        // Если изменился entityId или entityKind, обновляем relations
        if (
          (updates.entityId && updates.entityId !== actionToUpdate.entityId) ||
                    (updates.entityKind && updates.entityKind !== actionToUpdate.entityKind)
        ) {
          // Удаляем из старой связи
          switch (actionToUpdate.entityKind) {
          case ENTITY_KINDS.COMPONENT:
            state.relations.byComponent[actionToUpdate.entityId] =
                                state.relations.byComponent[actionToUpdate.entityId]?.filter(id => id !== actionId);
            break;
          case ENTITY_KINDS.SCREEN:
            state.relations.byScreen[actionToUpdate.entityId] =
                                state.relations.byScreen[actionToUpdate.entityId]?.filter(id => id !== actionId);
            break;
          case ENTITY_KINDS.ELEMENT:
            state.relations.byElement[actionToUpdate.entityId] =
                                state.relations.byElement[actionToUpdate.entityId]?.filter(id => id !== actionId);
            break;
          }

          // Добавляем в новую связь
          const newEntityKind = updates.entityKind || actionToUpdate.entityKind;
          const newEntityId = updates.entityId || actionToUpdate.entityId;

          switch (newEntityKind) {
          case ENTITY_KINDS.COMPONENT:
            if (!state.relations.byComponent[newEntityId]) {
              state.relations.byComponent[newEntityId] = [];
            }
            state.relations.byComponent[newEntityId].push(actionId);
            break;
          case ENTITY_KINDS.SCREEN:
            if (!state.relations.byScreen[newEntityId]) {
              state.relations.byScreen[newEntityId] = [];
            }
            state.relations.byScreen[newEntityId].push(actionId);
            break;
          case ENTITY_KINDS.ELEMENT:
            if (!state.relations.byElement[newEntityId]) {
              state.relations.byElement[newEntityId] = [];
            }
            state.relations.byElement[newEntityId].push(actionId);
            break;
          }
        }
      }
    },


  },
});

export const {
  setHoveredActionId,
  setFocusedActionId,
  setSelectedActionId,
  setActions,
  createAction,
  deleteAction,
  setActionType,
  updateAction,
  createCustomAction,
} = actionEntitySlice.actions;

export default actionEntitySlice.reducer;
