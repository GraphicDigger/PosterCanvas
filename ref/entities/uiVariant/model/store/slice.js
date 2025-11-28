import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  // Данные вариантов
  ids: [],
  entities: {},
  byComponent: {}, // связь компонент -> варианты
  // UI состояния
  ui: {
    hoveredVariantId: null,
    focusedVariantId: null,
    selectedVariantId: null,
  },
};

const variantEntitySlice = createSlice({
  name: 'variantEntity',
  initialState,
  reducers: {
    // UI actions
    setFocusedVariantId: (state, action) => {
      state.ui.focusedVariantId = action.payload;
    },
    setHoveredVariantId: (state, action) => {
      state.ui.hoveredVariantId = action.payload;
    },
    setSelectedVariantId: (state, action) => {
      state.ui.selectedVariantId = action.payload;
    },

    // Data actions
    setVariants: (state, action) => {
      const variants = action.payload;
      state.entities = {};
      state.ids = [];
      state.byComponent = {};
      variants.forEach(variant => {
        state.entities[variant.id] = variant;
        state.ids.push(variant.id);
        if (!state.byComponent[variant.componentId]) {
          state.byComponent[variant.componentId] = [];
        }
        state.byComponent[variant.componentId].push(variant.id);

      });
    },

    // При выборе компонента выбираем первый вариант
    selectFirstVariantByComponent: (state, action) => {
      const componentId = action.payload;
      const variantIds = state.byComponent[componentId] || [];
      if (variantIds.length > 0) {
        state.ui.selectedVariantId = variantIds[0];
      } else {
        state.ui.selectedVariantId = null;
      }
    },

    // Добавление варианта
    addVariant: (state, action) => {
      const variant = action.payload;
      state.entities[variant.id] = variant;
      state.ids.push(variant.id);

      if (!state.byComponent[variant.componentId]) {
        state.byComponent[variant.componentId] = [];
      }
      state.byComponent[variant.componentId].push(variant.id);
    },

    // Удаление варианта
    removeVariant: (state, action) => {
      const variantId = action.payload;
      const variant = state.entities[variantId];

      if (variant) {
        delete state.entities[variantId];
        state.ids = state.ids.filter(id => id !== variantId);

        if (state.byComponent[variant.componentId]) {
          state.byComponent[variant.componentId] =
                        state.byComponent[variant.componentId].filter(id => id !== variantId);
        }
      }
    },
  },
});

export const {
  setFocusedVariantId,
  setHoveredVariantId,
  setSelectedVariantId,
  setVariants,
  selectFirstVariantByComponent,
  addVariant,
  removeVariant,
} = variantEntitySlice.actions;

export default variantEntitySlice.reducer;
