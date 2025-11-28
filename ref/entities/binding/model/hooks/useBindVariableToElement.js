import { useCallback } from 'react';
import { useElement, useElementMutations } from '@/entities/uiElement';
import { ENTITY_KINDS, VARIABLE_TYPES } from '@/shared/constants';


export const useBindVariableToElement = () => {
  const { focusedElement } = useElement();
  const { updateBindings, removeBindings } = useElementMutations();

  const currentBindings = focusedElement?.bindings || focusedElement?.variables || [];

  const handleBindElementToDataVariable = useCallback((variable) => {
    if (!focusedElement) {return;}

    const { id, type } = variable;

    if (type === VARIABLE_TYPES.DATA) {
      const hasSameBinding = currentBindings.some(b => (b.kind === ENTITY_KINDS.DATA_VARIABLE || !b.kind) && b.type === VARIABLE_TYPES.DATA && b.id === id);
      if (hasSameBinding) {return;}
    }
    const filteredBindings = currentBindings.filter(b => !(b.type === VARIABLE_TYPES.DATA));
    const updatedBindings = [
      ...filteredBindings,
      { kind: ENTITY_KINDS.DATA_VARIABLE, id, type },
    ];
    updateBindings(focusedElement.id, updatedBindings);
  }, [focusedElement, currentBindings, updateBindings]);

  const handleBindElementToProp = useCallback((variable) => {
    if (!focusedElement) {return;}

    const { id, type } = variable;

    if (type === VARIABLE_TYPES.DATA) {
      const hasSameBinding = currentBindings.some(b => b.kind === ENTITY_KINDS.PROP && b.id === id);
      if (hasSameBinding) {return;}
    }
    const filteredBindings = currentBindings.filter(b => !(b.type === VARIABLE_TYPES.DATA));
    const updatedBindings = [
      ...filteredBindings,
      { kind: ENTITY_KINDS.PROP, id, type },
    ];
    updateBindings(focusedElement.id, updatedBindings);
  }, [focusedElement, currentBindings, updateBindings]);

  const handleBindElementToVariable = useCallback((variable) => {
    if (variable.kind === ENTITY_KINDS.DATA_VARIABLE) {handleBindElementToDataVariable(variable);}
    if (variable.kind === ENTITY_KINDS.PROP) {handleBindElementToProp(variable);}
  }, [handleBindElementToDataVariable, handleBindElementToProp]);

  const handleUnbindElementFromVariable = useCallback((variable) => {
    if (!focusedElement) {return;}
    const updatedBindings = currentBindings.filter(b => b.id !== variable.id);
    removeBindings(focusedElement.id, updatedBindings);
  }, [focusedElement, currentBindings, removeBindings]);

  return {
    bindElementToVariable: handleBindElementToVariable,
    unbindElementFromVariable: handleUnbindElementFromVariable,
  };
};
