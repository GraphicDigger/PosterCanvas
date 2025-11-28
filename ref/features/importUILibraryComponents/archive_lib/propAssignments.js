

//Генерирует присваивания пропсов для JSX

export const generatePropAssignments = (props) => {
  if (!props || props.length === 0) {return '';}

  return props.map(prop => {
    // Пропускаем children, так как они рендерятся отдельно
    if (prop.name === 'children') {return '';}

    // Для булевых пропсов без значения
    if (prop.type === 'BOOLEAN' && prop.defaultValue === true) {
      return prop.name;
    }

    // Для строковых и числовых значений
    const value = typeof prop.defaultValue === 'string'
      ? `"${prop.defaultValue}"`
      : prop.defaultValue;

    return `${prop.name}={${value}}`;
  }).filter(Boolean).join('\n      ');
};
