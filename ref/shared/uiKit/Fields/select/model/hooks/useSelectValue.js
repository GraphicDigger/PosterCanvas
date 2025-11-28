import { useState, useMemo, useCallback } from 'react';

// Хук для управления значением селекта

export const useSelectValue = ({
  options = [],
  defaultValue,
  value,
  onChange,
  multiple = false,
  disabled = false,
}) => {
  // Проверка валидности опций
  const validOptions = useMemo(() => {
    return Array.isArray(options) ? options : [];
  }, [options]);

  // Состояние контролируемого/неконтролируемого компонента
  const isControlled = value !== undefined;

  const [internalValue, setInternalValue] = useState(() => {
    if (multiple) {
      return defaultValue ?
        (Array.isArray(defaultValue) ? defaultValue : [defaultValue]) :
        [];
    }
    return defaultValue !== undefined ? defaultValue : '';
  });

  // Текущее значение (контролируемое или внутреннее)
  const currentValue = isControlled ? value : internalValue;

  // Найти выбранную опцию (для режима single)
  const selectedOption = useMemo(() => {
    if (!multiple && validOptions.length > 0) {
      return validOptions.find(opt => opt.value === currentValue) || null;
    }
    return null;
  }, [multiple, validOptions, currentValue]);

  // Найти выбранные опции (для режима multiple)
  const selectedOptions = useMemo(() => {
    if (multiple && validOptions.length > 0 && Array.isArray(currentValue)) {
      return validOptions.filter(opt => currentValue.includes(opt.value));
    }
    return [];
  }, [multiple, validOptions, currentValue]);

  // Получить отображаемое значение
  const displayValue = useMemo(() => {
    if (multiple) {
      return selectedOptions.map(opt => opt.label).join(', ');
    }
    return selectedOption?.label || '';
  }, [multiple, selectedOption, selectedOptions]);

  // Обработка выбора опции
  const handleSelect = useCallback((optionValue) => {
    if (disabled) {return;}

    let newValue;

    if (multiple) {
      // Для множественного выбора
      const currentArr = Array.isArray(currentValue) ? currentValue : [];
      if (currentArr.includes(optionValue)) {
        newValue = currentArr.filter(v => v !== optionValue);
      } else {
        newValue = [...currentArr, optionValue];
      }
    } else {
      // Для одиночного выбора
      newValue = optionValue;
    }

    // Обновляем внутреннее состояние, если неконтролируемый
    if (!isControlled) {
      setInternalValue(newValue);
    }

    // Вызываем колбэк onChange
    if (onChange) {
      onChange(newValue);
    }

    return newValue;
  }, [disabled, multiple, currentValue, isControlled, onChange]);

  // Очистка значения
  const resetValue = useCallback(() => {
    const emptyValue = multiple ? [] : '';

    if (!isControlled) {
      setInternalValue(emptyValue);
    }

    if (onChange) {
      onChange(emptyValue);
    }

    return emptyValue;
  }, [multiple, isControlled, onChange]);

  return {
    selectedValue: currentValue,
    selectedOption,
    selectedOptions,
    displayValue,
    handleSelect,
    resetValue,
    options: validOptions,
  };
};
