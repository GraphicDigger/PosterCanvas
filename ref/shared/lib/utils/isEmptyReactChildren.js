import React, { Children } from 'react';

/**
 * Универсальная функция для проверки, является ли React children пустым
 * @param {React.ReactNode} children - React children для проверки
 * @returns {boolean} - true если содержимое пустое, false если есть валидное содержимое
 *
 * @example
 * isEmptyReactChildren(null) // true
 * isEmptyReactChildren('') // true
 * isEmptyReactChildren('   ') // true
 * isEmptyReactChildren(<div>Content</div>) // false
 * isEmptyReactChildren([null, undefined, false]) // true
 * isEmptyReactChildren([<div>Content</div>]) // false
 */
export const isEmptyReactChildren = (children) => {
  // Проверяем примитивные значения
  if (children === null || children === undefined || children === false) {
    return true;
  }

  // Если children это true или пустая строка
  if (children === true || (typeof children === 'string' && children.trim().length === 0)) {
    return true;
  }

  // Преобразуем children в массив для обработки
  const childrenArray = Children.toArray(children);

  // Если массив пустой
  if (childrenArray.length === 0) {
    return true;
  }

  // Проверяем, есть ли хотя бы один валидный элемент
  const hasValidContent = childrenArray.some(child => {
    // Игнорируем null, undefined, false, true
    if (child === null || child === undefined || child === false || child === true) {
      return false;
    }

    // Проверяем строки (только непустые строки считаются валидными)
    if (typeof child === 'string') {
      return child.trim().length > 0;
    }

    // Проверяем числа (0 считается валидным)
    if (typeof child === 'number') {
      return true;
    }

    // Для React элементов считаем валидным
    // (даже если они могут вернуть null при рендеринге, это проверяется на уровне компонента)
    if (React.isValidElement(child)) {
      return true;
    }

    return false;
  });

  return !hasValidContent;
};

