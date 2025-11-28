import { useRef, useCallback } from 'react';
import { useSelectState } from './useSelectState';
import { useSelectValue } from './useSelectValue';
import { useSelectKeyboard } from './useSelectKeyboard';


export const useSelect = ({
  options = [],
  value,
  defaultValue,
  onChange,
  multiple = false,
  disabled = false,
  onOpen,
  onClose,
  onBlur,
  onFocus,
  onKeyDown,
  inputRef: externalRef,
  ...restProps
}) => {
  // Ref для компонента
  const internalRef = useRef(null);
  const selectRef = externalRef || internalRef;

  // Управление значением селекта
  const {
    selectedValue,
    selectedOption,
    selectedOptions,
    displayValue,
    handleSelect: handleValueSelect,
    resetValue,
    options: validOptions,
  } = useSelectValue({
    options,
    value,
    defaultValue,
    onChange,
    multiple,
    disabled,
  });

  // Управление состоянием селекта
  const {
    isOpen,
    isHovered,
    isFocused,
    focusedOptionIndex,
    setFocusedOptionIndex,
    toggleOpen,
    open,
    close,
    handleHover,
    handleLeave,
    setIsFocused,
  } = useSelectState({
    onOpen,
    onClose,
    selectRef,
    disabled,
  });

  // Обработка выбора с закрытием (для одиночного выбора)
  const handleSelect = useCallback((optionValue) => {
    const newValue = handleValueSelect(optionValue);
    if (!multiple) {
      close();
    }
    return newValue;
  }, [handleValueSelect, multiple, close]);

  // Управление клавиатурной навигацией - используем независимый хук без useKeyboardHandling
  const {
    handleKeyDown,
    getMenuItemProps,
  } = useSelectKeyboard({
    isOpen,
    open,
    close,
    focusedOptionIndex,
    setFocusedOptionIndex,
    options: validOptions,
    handleSelect,
    multiple,
    disabled,
    onKeyDown,
  });

  // Обработчики событий фокуса
  const handleFocus = useCallback((event) => {
    setIsFocused(true);
    if (onFocus) {onFocus(event);}
  }, [onFocus, setIsFocused]);

  const handleBlur = useCallback((event) => {
    // Проверяем, что фокус не перешел внутрь селекта (например, на опцию)
    if (!selectRef.current?.contains(event.relatedTarget)) {
      setIsFocused(false);
      if (onBlur) {onBlur(event);}
    }
  }, [onBlur, selectRef, setIsFocused]);

  // Формируем пропсы для компонента
  const selectProps = {
    ref: selectRef,
    onClick: toggleOpen,
    onKeyDown: handleKeyDown,
    onFocus: handleFocus,
    onBlur: handleBlur,
    onMouseEnter: handleHover,
    onMouseLeave: handleLeave,
    role: 'combobox',
    'aria-expanded': isOpen,
    'aria-haspopup': 'listbox',
    'aria-disabled': disabled,
    tabIndex: disabled ? -1 : 0,
    ...restProps,
  };

  // Возвращаем интерфейс хука
  return {
    // Refs
    selectRef,

    // Состояния
    isOpen,
    isHovered,
    isFocused,
    isDisabled: disabled,
    isMultiple: multiple,

    // Выбранные значения
    selectedValue,
    selectedOption,
    selectedOptions,
    displayValue,

    // Навигация
    focusedOptionIndex,

    // Методы
    handleSelect,
    toggleOpen,
    open,
    close,
    resetValue,

    // Пропсы для компонентов
    selectProps,
    getMenuItemProps,

    // Опции
    options: validOptions,
  };
};
