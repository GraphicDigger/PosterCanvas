import { v4 as uuidv4 } from 'uuid';


//Генерирует тестовые пропсы для компонента
export const generateTestProps = (component) => {
  // Базовые пропсы для всех компонентов
  const baseProps = {
    id: component.id || uuidv4(),
  };

  // Если у компонента нет пропсов, возвращаем базовые
  if (!component.props || !Array.isArray(component.props)) {
    return baseProps;
  }

  // Создаем пропсы на основе информации о компоненте
  const testProps = component.props.reduce((props, prop) => {
    // Пропускаем пропсы без имени
    if (!prop.name && !prop.propName) {return props;}

    const propName = prop.propName || prop.name;
    const propType = prop.type || 'string';

    // Генерируем значение пропса в зависимости от типа
    switch (propType) {
    case 'string':
      props[propName] = `Test ${propName}`;
      break;
    case 'number':
      props[propName] = 42;
      break;
    case 'boolean':
      props[propName] = true;
      break;
    case 'function':
      props[propName] = () => { };
      break;
    case 'object':
      props[propName] = {};
      break;
    case 'array':
      props[propName] = [];
      break;
    default:
      // Используем дефолтное значение, если оно есть
      if (prop.defaultValue !== undefined) {
        props[propName] = prop.defaultValue;
      }
    }

    return props;
  }, { ...baseProps });

  // Специальные случаи для конкретных компонентов
  if (component.name === 'Card') {
    testProps.title = 'Test Card Title';
    testProps.subheader = 'Test Subheader';
    testProps.content = 'Test Content';
  } else if (component.name === 'Button') {
    testProps.children = 'Test Button';
  }

  return testProps;
};
