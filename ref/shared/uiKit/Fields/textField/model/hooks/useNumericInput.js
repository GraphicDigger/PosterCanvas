import { useCallback } from 'react';

/**
 * Хук для работы с числовыми полями ввода
 * Поддерживает различные типы числовых значений:
 * - Целые числа: 1, 123
 * - Десятичные числа: 1.5, 0.25
 * - Числа с единицами измерения: 10px, 1.5em, 100%
 * - Отрицательные числа: -5, -10px
 */

export const useNumericInput = ({
  allowDecimals = true,          // Разрешить десятичные числа
  allowNegative = false,         // Разрешить отрицательные числа
  allowUnits = false,           // Разрешить единицы измерения (px, em, %, etc.)
  units = [],                   // Массив разрешенных единиц измерения
  maxLength = null,             // Максимальная длина числа
  min = null,                   // Минимальное значение
  max = null,                   // Максимальное значение
  onChange,                     // Callback для изменения значения
}) => {
  // Стандартные единицы измерения CSS
  const defaultUnits = [
    'px', 'em', 'rem', '%', 'vh', 'vw', 'pt', 'pc',
    'in', 'cm', 'mm', 'ex', 'ch', 'vmin', 'vmax',
  ];

  const allowedUnits = units.length > 0 ? units : defaultUnits;

  // Создаем регулярное выражение для валидации
  const createValidationRegex = useCallback(() => {
    let pattern = '^';

    // Отрицательный знак (опционально)
    if (allowNegative) {
      pattern += '-?';
    }

    // Числовая часть - более гибкая для промежуточных состояний
    if (allowDecimals) {
      // Разрешаем: 0, 00, 000, 1, 10, 100, 1., 1.0, .5, 0.5 и т.д.
      pattern += '(0*\\d*\\.?\\d*|\\d*\\.?0*\\d*|\\d+)';
    } else {
      // Разрешаем: 0, 00, 000, 1, 10, 100 и т.д.
      pattern += '0*\\d*';
    }

    // Единицы измерения (опционально)
    if (allowUnits && allowedUnits.length > 0) {
      // Экранируем специальные символы в единицах измерения
      const escapedUnits = allowedUnits.map(unit =>
        unit.replace(/[.*+?^${}()|[\]\\%]/g, '\\$&'),
      );
      const unitsPattern = escapedUnits.join('|');
      pattern += `(${unitsPattern})?`;

    }

    pattern += '$';

    const regex = new RegExp(pattern);
    return regex;
  }, [allowDecimals, allowNegative, allowUnits, allowedUnits]);

  // Валидация введенного значения
  const validateInput = useCallback((value) => {

    // Разрешаем пустые и промежуточные состояния
    if (value === '' || value === '-' || value === '.' || value === '0' || value === '00' || value === '000') {
      return true;
    }

    // Сначала проверяем полное соответствие
    const regex = createValidationRegex();
    if (regex.test(value)) {
      return true;
    }

    // Если полное соответствие не прошло, проверяем частичный ввод единиц
    if (allowUnits && allowedUnits.length > 0) {
      // Извлекаем числовую часть и возможную частичную единицу
      const match = value.match(/^(-?\d*\.?\d*)(.*)$/);
      if (match) {
        const numberPart = match[1];
        const unitPart = match[2];

        // Разрешаем промежуточные числовые состояния
        if (numberPart === '' || numberPart === '-' || numberPart === '.' ||
                    numberPart === '0' || numberPart === '00' || numberPart === '000') {
          return true;
        }

        // Проверяем, что числовая часть валидна
        let numberPattern = '^';
        if (allowNegative) {numberPattern += '-?';}
        if (allowDecimals) {
          // Более гибкое регулярное выражение для промежуточных состояний
          numberPattern += '(0*\\d*\\.?\\d*|\\d*\\.?0*\\d*)';
        } else {
          numberPattern += '0*\\d*';
        }
        numberPattern += '$';

        const numberRegex = new RegExp(numberPattern);
        const isNumberValid = numberRegex.test(numberPart);

        // Проверяем, что частичная единица может быть началом одной из разрешенных
        const isPartialUnitValid = unitPart === '' || allowedUnits.some(unit => {
          const startsWithResult = unit.startsWith(unitPart);
          return startsWithResult;
        });

        return isNumberValid && isPartialUnitValid;
      }
    }

    return false;
  }, [createValidationRegex, allowUnits, allowedUnits, allowNegative, allowDecimals]);

  // Проверка диапазона значений
  const validateRange = useCallback((value) => {
    if (!value || value === '' || value === '-') {return true;}

    // Извлекаем числовую часть
    const numericValue = parseFloat(value);
    if (isNaN(numericValue)) {return false;}

    if (min !== null && numericValue < min) {return false;}
    if (max !== null && numericValue > max) {return false;}

    return true;
  }, [min, max]);

  // Проверка максимальной длины
  const validateLength = useCallback((value) => {
    if (maxLength === null) {return true;}
    return value.length <= maxLength;
  }, [maxLength]);

  // Основная функция валидации
  const isValidInput = useCallback((value) => {
    return validateInput(value) &&
               validateLength(value) &&
               validateRange(value);
  }, [validateInput, validateLength, validateRange]);

  // Обработчик изменения с валидацией
  const handleNumericChange = useCallback((event) => {
    const value = event?.target?.value || event;

    if (isValidInput(value)) {
      if (onChange) {
        onChange(value);
      }
      return true;
    }

    return false; // Значение не прошло валидацию
  }, [isValidInput, onChange]);

  // Форматирование значения (удаление лишних символов)
  const formatValue = useCallback((value) => {
    if (!value) {return '';}

    // Удаляем лишние точки
    if (allowDecimals) {
      const parts = value.split('.');
      if (parts.length > 2) {
        value = parts[0] + '.' + parts.slice(1).join('');
      }
    }

    return value;
  }, [allowDecimals]);

  // Извлечение числовой части и единицы измерения
  const parseValue = useCallback((value) => {
    if (!value) {return { number: '', unit: '' };}

    const match = value.match(/^(-?\d*\.?\d*)(.*)$/);
    if (match) {
      return {
        number: match[1],
        unit: match[2] || '',
      };
    }

    return { number: '', unit: '' };
  }, []);

  // Получение только числовой части
  const getNumericValue = useCallback((value) => {
    const { number } = parseValue(value);
    return parseFloat(number) || 0;
  }, [parseValue]);

  // Получение только единицы измерения
  const getUnit = useCallback((value) => {
    const { unit } = parseValue(value);
    return unit;
  }, [parseValue]);

  return {
    isValidInput,
    handleNumericChange,
    formatValue,
    parseValue,
    getNumericValue,
    getUnit,
    validateInput,
    validateRange,
    validateLength,
  };
};
