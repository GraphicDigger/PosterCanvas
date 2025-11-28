import { useMemo } from 'react';
import { Children, isValidElement, cloneElement } from 'react';

//Извлекает опции из дочерних компонентов
export const extractOptionsFromChildren = (children) => {
  const options = [];
  let index = 0;

  Children.forEach(children, (child) => {
    if (!isValidElement(child)) {return;}

    // Если это MenuGroup - рекурсивно обрабатываем его детей
    if (child.type.displayName === 'MenuGroup') {
      const groupChildren = child.props.children;
      const groupOptions = extractOptionsFromChildren(groupChildren);
      options.push(...groupOptions);
    }
    // Если это элемент меню (MenuItem, MenuItemCheckbox, MenuItemRadio)
    else if (['MenuItem', 'MenuItemCheckbox', 'MenuItemRadio'].includes(child.type.displayName)) {
      // Получаем значение пропа value или используем текст элемента,
      // или если и его нет, генерируем по индексу
      const value = child.props.value !== undefined
        ? child.props.value
        : (typeof child.props.children === 'string'
          ? child.props.children
          : `option-${index}`);

      // Получаем label из содержимого или из value
      const label = typeof child.props.children === 'string'
        ? child.props.children
        : value;

      options.push({
        value,
        label,
        element: child,
        index,
      });

      index++;
    }
  });

  return options;
};

//Рендерит дочерние элементы с добавлением нужных пропсов
export const renderChildrenWithProps = (children, {
  selectedValue,
  multiple,
  handleSelect,
  name,
  variant,
}) => {
  let index = 0;

  return Children.map(children, (child) => {
    if (!isValidElement(child)) {return child;}

    // Если это MenuGroup - рекурсивно обрабатываем его детей
    if (child.type.displayName === 'MenuGroup') {
      return cloneElement(child, {
        children: renderChildrenWithProps(child.props.children, {
          selectedValue,
          multiple,
          handleSelect,
          name,
          variant,
        }),
      });
    }
    // Если это элемент меню (MenuItem, MenuItemCheckbox или MenuItemRadio)
    else if (['MenuItem', 'MenuItemCheckbox', 'MenuItemRadio'].includes(child.type.displayName)) {
      // Получаем value из пропа или из текста элемента
      const elementValue = child.props.value !== undefined
        ? child.props.value
        : (typeof child.props.children === 'string'
          ? child.props.children
          : `option-${index}`);

      // Проверяем, выбран ли этот элемент
      const isSelected = multiple
        ? Array.isArray(selectedValue) && selectedValue.includes(elementValue)
        : selectedValue === elementValue;

      // Создаем обработчик выбора элемента
      const handleItemSelect = () => {
        handleSelect(elementValue);
      };

      // Создаем новые пропсы для элемента
      const props = {
        value: elementValue,  // Сохраняем value проп
      };

      // Определяем, какой тип элемента нужно использовать
      const componentType = child.type;

      // Если указан вариант, то переопределяем тип
      if (variant === 'checkbox' && child.type.displayName !== 'MenuItemCheckbox') {
        // Добавляем пропсы для checkbox
        props.checked = isSelected;
        props.onChange = handleItemSelect;
      } else if (variant === 'radio' && child.type.displayName !== 'MenuItemRadio') {
        // Добавляем пропсы для radio
        props.checked = isSelected;
        props.onChange = handleItemSelect;
        props.name = name || 'select-radio-group';
      } else {
        // Пропсы по типу элемента
        if (child.type.displayName === 'MenuItemCheckbox') {
          props.checked = isSelected;
          props.onChange = handleItemSelect;
        } else if (child.type.displayName === 'MenuItemRadio') {
          props.checked = isSelected;
          props.onChange = handleItemSelect;
          props.name = name || 'select-radio-group';
        } else { // MenuItem
          props.onClick = handleItemSelect;
        }
      }

      // Наращиваем индекс для следующего элемента
      index++;

      // Клонируем элемент с новыми пропсами
      return cloneElement(child, props);
    }

    return child;
  });
};

//Хук для работы с дочерними элементами в компоненте Select
export const useSelectChildren = (children, {
  selectedValue,
  multiple,
  handleSelect,
  name,
  variant,
}) => {
  // Извлекаем опции из дочерних компонентов с учетом value
  const extractedOptions = useMemo(() => {
    return children ? extractOptionsFromChildren(children) : [];
  }, [children]);

  // Функция для рендера дочерних компонентов с нужными пропсами
  const renderChildren = useMemo(() => {
    return (isOpen) => {
      if (!isOpen) {return null;}

      return renderChildrenWithProps(children, {
        selectedValue,
        multiple,
        handleSelect,
        name,
        variant,
      });
    };
  }, [children, selectedValue, multiple, handleSelect, name, variant]);

  return {
    extractedOptions,
    renderChildren,
  };
};

export default useSelectChildren;
