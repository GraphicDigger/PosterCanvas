import { useCallback } from 'react';
import { useDispatch, useStore } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import { ENTITY_KINDS } from '@/shared/constants';
import { createElementsFromTemplate } from '@/shared/uiEditorDefaults/defaultElements';
import { useFocusEntity } from '@/entities/uiFocus';
import {
  addElement,
  addElements,
  removeElement,
  setSelectedElementId,
  updateElement,
  updateElementStyle,
  updateElementContent,
  removeElementStyle,
  removeElementContent,
  selectElementById,
  updateElementAttributes,
  removeElementAttributes,
  updateElementBindings,
  removeElementBindings,
} from '../store';


export const useElementMutations = () => {
  const dispatch = useDispatch();

  const { focusEntityOwnership, setFocused } = useFocusEntity();

  const handleAddElement = useCallback((templateType) => {
    if (!focusEntityOwnership) return

    try {
      const newElements = createElementsFromTemplate(templateType, focusEntityOwnership);

      dispatch(addElements(newElements));

      if (newElements.length > 0) {
        setFocused({
          id: newElements[0].id,
          kind: ENTITY_KINDS.ELEMENT
        });
      }

    } catch (error) {
      console.error('Failed to create element from template:', error);
    }
  }, [dispatch, focusEntityOwnership, setFocused]);

  const handleUpdateElement = useCallback((id, update) => {
    if (!id || !update) { return; }
    dispatch(updateElement({ id, ...update }));
  }, []);

  const deleteElement = useCallback((elementId) => {
    if (!elementId) { return; }

    dispatch(setSelectedElementId(null));
    dispatch(removeElement(elementId));
  }, []);

  const handleUpdateAttribute = useCallback((elementId, attr) => {
    const attrPayload = { ...attr };
    if (!attrPayload.id) {
      attrPayload.id = uuidv4();
    }
    dispatch(updateElementAttributes({ id: elementId, attr: attrPayload }));
  }, []);

  const handleRemoveAttribute = useCallback((elementId, attrId) => {
    dispatch(removeElementAttributes({ id: elementId, attrId }));
  }, []);

  const handleUpdateStyle = useCallback((id, style) => {
    dispatch(updateElementStyle({ id, style }));
  }, []);

  const handleRemoveStyle = useCallback((id, styleKeys) => {
    dispatch(removeElementStyle({ id, styleKeys }));
  }, []);

  const handleUpdateContent = useCallback((id, content) => {
    dispatch(updateElementContent({ id, content }));
  }, []);

  const handleRemoveContent = useCallback((id) => {
    dispatch(removeElementContent({ id }));
  }, []);

  const handleUpdateBindings = useCallback((id, bindings) => {
    dispatch(updateElementBindings({ id, bindings }));
  }, []);

  const handleRemoveBindings = useCallback((id, bindings) => {
    dispatch(removeElementBindings({ id, bindings }));
  }, []);

  return {
    addElement: handleAddElement,
    updateElement: handleUpdateElement,
    deleteElement,

    updateAttribute: handleUpdateAttribute,
    removeAttribute: handleRemoveAttribute,

    updateStyle: handleUpdateStyle,
    removeStyle: handleRemoveStyle,

    updateBindings: handleUpdateBindings,
    removeBindings: handleRemoveBindings,

    updateContent: handleUpdateContent,
    removeContent: handleRemoveContent,

  };
};
