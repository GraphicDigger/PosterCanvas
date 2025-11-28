import { createContext, useState, useCallback, useMemo } from 'react';
import { WINDOW_TABS, FILL_PROPERTY_TABS } from '../../../../../entities/uiElementProperty/model';

export const FillPickerContext = createContext(null);

export const FillPickerProvider = ({ children }) => {

  const [pickerType, setPickerTypeState] = useState(null);

  const handleSetPickerType = useCallback((type) => {
    setPickerTypeState(type);
  }, []);

  const isColorPicker = useMemo(() => pickerType === WINDOW_TABS.FILL_PROPERTY && pickerSubType === FILL_PROPERTY_TABS.COLOR, [pickerType, pickerSubType]);
  const isGradientPicker = useMemo(() => pickerType === WINDOW_TABS.FILL_PROPERTY && pickerSubType === FILL_PROPERTY_TABS.GRADIENT, [pickerType, pickerSubType]);
  const isRadialGradientPicker = useMemo(() => pickerType === WINDOW_TABS.FILL_PROPERTY && pickerSubType === FILL_PROPERTY_TABS.RADIAL_GRADIENT, [pickerType, pickerSubType]);
  const isImagePicker = useMemo(() => pickerType === WINDOW_TABS.FILL_PROPERTY && pickerSubType === FILL_PROPERTY_TABS.IMAGE, [pickerType, pickerSubType]);

  const value = useMemo(() => ({
    pickerType,
    setPickerType: handleSetPickerType,
    isColorPicker,
    isGradientPicker,
    isRadialGradientPicker,
    isImagePicker,
  }), [
    pickerType,
    handleSetPickerType,
    isColorPicker,
    isGradientPicker,
    isRadialGradientPicker,
    isImagePicker,
  ]);

  return (
    <FillPickerContext.Provider value={value}>
      {children}
    </FillPickerContext.Provider>
  );
};
