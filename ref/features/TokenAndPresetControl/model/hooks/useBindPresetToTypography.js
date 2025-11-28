import { useCallback } from 'react';
import { useElementMutations } from '../../../../entities/uiElement';
import { ENTITY_KINDS } from '../../../../shared/constants';
import { PRESET_TYPES } from '../../../../entities/varPreset';

export const useBindPresetToTypography = (element) => {

  const { updateElement } = useElementMutations();

  const handleBindPresetToTypography = useCallback((preset) => {

    if (!element || !preset) {return;}

    const { modeValues } = preset;
    if (!modeValues || !Array.isArray(modeValues)) {return;}


    const modeValue = modeValues.find(mv => mv.isDefault);
    if (!modeValue) {return;}


    const currentBindings = element.bindings || [];

    // Фильтруем существующие привязки, чтобы удалить любую другую привязку к пресету.
    // У текстового элемента может быть только один пресет стиля.
    const otherBindings = currentBindings.filter(
      b => b.kind === ENTITY_KINDS.PRESET_MODE_VALUE &&
                b.presetType !== PRESET_TYPES.TYPOGRAPHY,
    );

    const newBinding = {
      id: modeValue.id,
      kind: modeValue.kind,
      presetId: modeValue.presetId,
      presetType: preset.type,
      variableModeId: modeValue.variableModeId,
    };

    // console.log('[useBindPresetStyleToTextElement] newBinding', newBinding)

    const finalBindings = [...otherBindings, newBinding];
    updateElement(element.id, { bindings: finalBindings });

  }, [element, updateElement]);


  const handleRemovePresetBindingFromTypography = () => {
    if (!element) {return;}

    const otherBindings = element.bindings?.filter(
      b => b.kind !== ENTITY_KINDS.PRESET_MODE_VALUE || b.presetType !== PRESET_TYPES.TYPOGRAPHY,
    );

    updateElement(element.id, { bindings: otherBindings });
  };

  return {
    bindPresetToTypography: handleBindPresetToTypography,
    removePresetBindingFromTypography: handleRemovePresetBindingFromTypography,
  };
};
