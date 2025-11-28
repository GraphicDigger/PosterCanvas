import { v4 as uuidv4 } from 'uuid';
import { ENTITY_KINDS } from '../../../shared/constants';


export const normalizePropList = (component) => {

  if (!component || !component.props
  ) {return {
    normalizedProps: [],
    normalizedPropValues: [],
    propIds: [],
  };}

  const normalizedProps = [];
  const normalizedPropValues = [];


  component.props.forEach(prop => {
    // Формируем ID пропса в стандартном формате
    const propId = `${component.id}_${prop.name}_${uuidv4()}`;

    // Нормализуем проп (без поля valueIds)
    normalizedProps.push({
      id: propId,
      name: prop.name,
      kind: ENTITY_KINDS.PROP,
      type: prop.type.name,
      description: prop.description,
      defaultValue: prop.defaultValue,
      componentId: component.id,
    });

    // Если у пропа есть возможные значения, создаем для них записи
    if (prop.values && Array.isArray(prop.values)) {
      prop.values.forEach(value => {
        const valueId = `${propId}-value-${value}-${uuidv4()}`;

        normalizedPropValues.push({
          id: valueId,
          name: value,
          value: value,
          propId: propId,
          kind: ENTITY_KINDS.PROP_VALUE,
        });
      });
    }

  });

  return { normalizedProps, normalizedPropValues };
};

/**
 * Создает базовые элементы для компонента
 * @param {Object} uiComponent - Компонент UI библиотеки
 * @returns {Array} - Массив идентификаторов элементов
 */
export const createBasicElements = (uiComponent) => {
  const rootElementId = `${uiComponent.id}-element-root-${uuidv4()}`;

  // Базовый набор элементов для каждого компонента
  return [rootElementId];
};

/**
 * Создает варианты компонента на основе его пропсов
 * @param {Object} uiComponent - Компонент UI библиотеки
 * @param {Array} normalizedProps - Нормализованные пропсы
 * @returns {Array} - Массив вариантов компонента
 */
export const createComponentVariants = (uiComponent, normalizedProps) => {
  // Для простоты создаем только основной вариант
  const primaryVariantId = `${uiComponent.id}-variant-primary-${uuidv4()}`;

  // Находим пропсы с enum значениями
  const enumProps = normalizedProps.filter(prop =>
    prop.type === 'ENUM' ||
        (prop.values && Array.isArray(prop.values) && prop.values.length > 0),
  );

  // Если нет enum пропсов, возвращаем только один вариант
  if (enumProps.length === 0) {
    return [{
      id: primaryVariantId,
      name: 'Default',
      propValues: {}, // Пустые значения, будут использованы значения по умолчанию
    }];
  }

  // Иначе создаем варианты на основе значений enum пропсов
  // Для простоты берем только первый enum проп
  const enumProp = enumProps[0];

  if (!enumProp.values || !Array.isArray(enumProp.values) || enumProp.values.length === 0) {
    return [{
      id: primaryVariantId,
      name: 'Default',
      propValues: {},
    }];
  }

  // Создаем вариант для каждого значения enum пропа
  return enumProp.values.map((value, index) => {
    const variantId = index === 0
      ? primaryVariantId
      : `${uiComponent.id}-variant-${value}-${uuidv4()}`;

    return {
      id: variantId,
      name: String(value),
      propValues: {
        [enumProp.id]: value,
      },
    };
  });
};
