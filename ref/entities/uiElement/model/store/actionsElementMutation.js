import { ownershipManager } from '../../lib';
import merge from 'lodash/merge';

export const actionsElementMutation = {

  addElement: (state, action) => {
    const element = action.payload;

    // Добавляем в entities и ids
    state.entities[element.id] = element;
    if (!state.ids.includes(element.id)) {
      state.ids.push(element.id);
    }
    // Обновляем связи
    ownershipManager.addOwnership(state, element);
  },

  addElements: (state, action) => {
    const elements = action.payload;
    if (!Array.isArray(elements)) { return; }

    elements.forEach(element => {
      // Добавляем в entities и ids
      state.entities[element.id] = element;
      if (!state.ids.includes(element.id)) {
        state.ids.push(element.id);
      }
      // Обновляем связи
      ownershipManager.addOwnership(state, element);
    });
  },

  updateElement: (state, action) => {
    const { id, ...update } = action.payload;
    const oldElement = state.entities[id];

    if (oldElement) {
      if (update.ownership) {
        ownershipManager.removeOwnership(state, oldElement);
        ownershipManager.addOwnership(state, { id, ...update });
      }

      // Handle style conflicts before merging
      if (update.properties?.style) {
        const oldStyle = oldElement.properties?.style || {};
        const newStyle = update.properties.style;

        // Clean up style conflicts: ensure only one of literal or binding exists per property
        const cleanedStyle = { ...newStyle };

        // If there are literal values, remove any bindings for the same properties
        if (cleanedStyle.binding) {
          for (const key in cleanedStyle) {
            if (key !== 'binding' && cleanedStyle[key] !== undefined && cleanedStyle.binding[key]) {
              // If we have a literal value for this property, remove the binding
              delete cleanedStyle.binding[key];
            }
          }
          // Remove empty binding object
          if (Object.keys(cleanedStyle.binding).length === 0) {
            delete cleanedStyle.binding;
          }
        }

        // If there are bindings, remove any literal values for the same properties
        if (cleanedStyle.binding) {
          for (const key in cleanedStyle.binding) {
            if (cleanedStyle[key] !== undefined) {
              // If we have a binding for this property, remove the literal
              delete cleanedStyle[key];
            }
          }
        }

        // Update the properties with cleaned style
        update.properties = {
          ...update.properties,
          style: cleanedStyle,
        };
      }

      // Ensure binding is removed if not present in update
      if (update.properties?.style && !update.properties.style.binding) {
        // Mark that we want to remove the binding
        update.properties.style._removeBinding = true;
      }

      // Deep merge
      state.entities[id] = merge(oldElement, update);

      // Explicitly remove binding if marked for removal
      if (state.entities[id].properties?.style?._removeBinding) {
        delete state.entities[id].properties.style.binding;
        delete state.entities[id].properties.style._removeBinding;
      }
    }
  },

  updateElementStyle: (state, action) => {
    const { id, style } = action.payload;
    const element = state.entities[id];

    if (element) {
      state.entities[id] = {
        ...element,
        properties: {
          ...element.properties,
          style: {
            ...element.properties?.style,
            ...style,
          },
        },
      };
    }
  },

  updateElementAttributes: (state, action) => {
    const { id, attr } = action.payload;
    const element = state.entities[id];

    if (element) {
      const attributes = [...(element.attributes || [])];
      const attrIndex = attributes.findIndex(a => a.id === attr.id);

      if (attrIndex !== -1) {
        attributes[attrIndex] = { ...attributes[attrIndex], ...attr };
      } else {
        attributes.push(attr);
      }
      state.entities[id] = { ...element, attributes };
    }
  },

  removeElementAttributes: (state, action) => {
    const { id, attrId } = action.payload;
    const element = state.entities[id];
    if (element) {
      state.entities[id] = {
        ...element,
        attributes: element.attributes.filter(attr => attr.id !== attrId),
      };
    }
  },

  removeElementStyle: (state, action) => {
    const { id, styleKeys } = action.payload;
    const element = state.entities[id];

    if (element?.properties?.style && Array.isArray(styleKeys)) {
      const currentStyle = { ...element.properties.style };

      styleKeys.forEach(key => {
        delete currentStyle[key];
      });
      state.entities[id] = {
        ...element,
        properties: {
          ...element.properties,
          style: currentStyle,
        },
      };
    }
  },

  removeElementContent: (state, action) => {
    const { id } = action.payload;
    const element = state.entities[id];

    if (element) {
      delete state.entities[id];
    }
  },

  updateElementContent: (state, action) => {
    const { id, content } = action.payload;
    console.log('[actionsElementMutation] updateElementContent', id, content);
    const element = state.entities[id];

    if (element) {
      state.entities[id] = {
        ...element,
        properties: {
          ...element.properties,
          content: content,
        },
      };
    }
  },

  updateElementBindings: (state, action) => {
    const { id, bindings } = action.payload;
    const element = state.entities[id];
    if (element) {
      state.entities[id] = { ...element, bindings };
    }
  },

  removeElementBindings: (state, action) => {
    const { id, bindings } = action.payload;
    const element = state.entities[id];
    if (element) {
      state.entities[id] = { ...element, bindings };
    }
  },

  removeElement: (state, action) => {
    const elementId = action.payload;
    const element = state.entities[elementId];

    if (element) {
      // Удаляем связи
      ownershipManager.removeOwnership(state, element);

      // Удаляем из entities и ids
      delete state.entities[elementId];
      state.ids = state.ids.filter(id => id !== elementId);
    }
  },
};
