import { useCallback } from 'react';
import { ENTITY_KINDS } from '@/shared/constants';
import { useElement, useElementMutations, PROPERTY_TYPES } from '@/entities/uiElement';
import { useInstances, useInstanceMutation } from '@/entities/uiInstance';
import { useVariables } from '@/entities/varVariableData';
import { useDesignMode } from '@/entities/mode/editorMode';

// element or instance property

export const useBindVariableToProperty = (
  {
    propertyType,
    propertyName,
  },
) => {

  const { focusedElement: element } = useElement();
  const { focusedInstance: instance } = useInstances();
  const { updateStyle, updateContent } = useElementMutations();
  const { updateInstanceStyle } = useInstanceMutation();

  const ui = element || instance;

  const isElement = ui?.kind === ENTITY_KINDS.ELEMENT;
  const isInstance = ui?.kind === ENTITY_KINDS.INSTANCE;

  const handleBindStyleToVariable = (variable) => {
    if (!ui || !variable || ui.kind !== ENTITY_KINDS.ELEMENT && ui.kind !== ENTITY_KINDS.INSTANCE) {return;}
    const currentBinding = ui?.properties?.style?.binding || {};
    const binding = {
      type: variable.kind,
      id: variable.id,
      propertyName: propertyName,
    };
    if (isElement) {
      updateStyle(element.id, { binding: { ...currentBinding, [propertyName]: binding } });
    }
    if (isInstance) {
      updateInstanceStyle(instance.id, { binding: { ...currentBinding, [propertyName]: binding } });
    }
  };

  const handleUnbindStyle = () => {
    if (!ui || !propertyName || ui.kind !== ENTITY_KINDS.ELEMENT) {return;}
    const currentBinding = ui?.properties?.style?.binding || {};
    const newBinding = { ...currentBinding };
    delete newBinding[propertyName];
    if (isElement) {
      updateStyle(element.id, { binding: newBinding });
    }
    if (isInstance) {
      updateInstanceStyle(instance.id, { binding: newBinding });
    }
  };

  const handleBindContentToVariable = (variable) => {
    if (!ui || !variable || ui.kind !== ENTITY_KINDS.ELEMENT) {return;}
    const binding = {
      elementId: ui.id,
      type: variable.kind,
      id: variable.id,
    };
    updateContent(element.id, { binding });
  };

  const handleUnbindContent = () => {
    if (!ui || ui.kind !== ENTITY_KINDS.ELEMENT) {return;}
    const currentContent = ui.properties?.content || {};
    const { text } = currentContent;
    const newContent = { text };
    updateContent(ui.id, newContent);
  };

  const handleBindPropertyToVariable = useCallback((variable) => {
    if (propertyType === PROPERTY_TYPES.STYLE) {handleBindStyleToVariable(variable);}
    if (propertyType === PROPERTY_TYPES.CONTENT) {handleBindContentToVariable(variable);}
  }, [handleBindStyleToVariable, handleBindContentToVariable, propertyType]);

  const handleUnbindProperty = useCallback(() => {
    if (propertyType === PROPERTY_TYPES.STYLE) {handleUnbindStyle();}
    if (propertyType === PROPERTY_TYPES.CONTENT) {handleUnbindContent();}
  }, [handleUnbindStyle, handleUnbindContent, propertyType]);


  return {
    bindPropertyToVariable: handleBindPropertyToVariable,
    unbindProperty: handleUnbindProperty,
  };
};
