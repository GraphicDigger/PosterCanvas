import { createAsyncThunk } from '@reduxjs/toolkit';
import { clearModelDraft } from './slice';


export const initialModelFieldDraftState = {
  draft: {
    models: { // example:
      // [modelId-1]: {
      //      fields: {},
      //      newFields: []
      // },
      // [modelId-2]: {
      //     fields: {},
      //     newFields: []
      // }
    },
  },
};

export const actionsModelFieldDraft = {

  // Добавление готового поля в черновик модели
  addFieldToDraft: (state, action) => {
    const { modelId, field } = action.payload;

    if (!modelId || !field) {
      console.warn('addFieldToDraft: отсутствуют modelId или field');
      return;
    }

    // Если черновика нет, создаем его
    if (!state.draft) {
      state.draft = {
        models: {},
      };
    }

    // Если модели нет в черновике, создаем её структуру
    if (!state.draft.models[modelId]) {
      state.draft.models[modelId] = {
        fields: {},
        newFields: [],
      };
    }

    // Добавляем готовое поле в массив новых полей конкретной модели
    state.draft.models[modelId].newFields.push(field);
  },

  // Сохраняем изменения полей в черновике
  updateDraftModelField: (state, action) => {
    // Получаем modelId из payload
    const { modelId, fieldId, updates } = action.payload;

    if (!state.draft) {
      state.draft = {
        models: {},
      };
    }

    // Если модели нет в черновике, создаем её структуру
    if (!state.draft.models[modelId]) {
      state.draft.models[modelId] = {
        fields: {},
        newFields: [],
      };
    }

    // Сохраняем изменения для конкретного поля в конкретной модели
    state.draft.models[modelId].fields[fieldId] = {
      ...(state.draft.models[modelId].fields[fieldId] || {}),
      ...updates,
    };
  },

  clearModelDraft: (state, action) => {
    const { modelId } = action.payload || {};

    if (!state.draft) {
      state.draft = {
        models: {},
      };
      return;
    }

    if (modelId) {
      // Очищаем черновик конкретной модели (с проверкой)
      if (state.draft.models[modelId]) {
        delete state.draft.models[modelId];
      }
    } else {
      // Очищаем весь черновик (только models, не всю структуру)
      state.draft.models = {};
    }
  },
};
