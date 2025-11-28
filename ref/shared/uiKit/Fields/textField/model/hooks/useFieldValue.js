import { useState, useEffect, useCallback } from 'react';

// Хук для управления значением поля ввода
export const useFieldValue = ({
  value,
  onChange,
  bufferOnBlur = false,
  onBlur,
}) => {
  const [bufferedValue, setBufferedValue] = useState(value);

  // Синхронизация буфера с внешним значением
  useEffect(() => {
    setBufferedValue(value);
  }, [value]);

  const handleChange = useCallback((e) => {
    // Обработаем разные формы input event
    const newValue = e && e.target ? e.target.value : e;

    if (bufferOnBlur) {
      setBufferedValue(newValue);
    } else if (onChange) {
      onChange(newValue);
    }
  }, [bufferOnBlur, onChange]);

  const resetValue = useCallback(() => {
    setBufferedValue('');
    if (onChange) {
      onChange('');
    }
  }, [onChange]);


  const commitBufferedValue = useCallback(() => {
    if (bufferedValue !== value && onChange) {
      onChange(bufferedValue);
    }
  }, [bufferedValue, value, onChange]);


  const internalFieldOnBlur = useCallback((event) => {
    if (bufferOnBlur) {
      commitBufferedValue();
    }
    if (onBlur) {
      onBlur(event);
    }
  }, [bufferOnBlur, commitBufferedValue, onBlur]);

  // Возвращаем внутреннее значение в зависимости от режима буферизации
  const internalValue = bufferOnBlur ? bufferedValue : value;

  return {
    internalValue,
    handleChange,
    resetValue,
    commitBufferedValue,
    internalFieldOnBlur,
  };
};
