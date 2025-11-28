

// Основная функция для анализа компонента и построения его структуры
export const analyzeComponentStructureWithRendering = async (component, options = {}) => {
  if (!component) {return null;}

  try {
    // Используем динамический анализатор для получения иерархии компонента
    const result = await dynamicComponentAnalyzer(component, options);
    return result;
  } catch (error) {
    console.error('Ошибка при анализе компонента:', error);
    return component;
  }
};

// Хелпер для анализа компонента по его пути
export const analyzeComponentByPath = async (componentPath, componentName) => {
  if (!componentPath) {return null;}

  // Формируем базовую информацию о компоненте
  const componentInfo = {
    name: componentName || componentPath.split('/').pop().replace(/\.\w+$/, ''),
    importPath: componentPath,
  };

  // Анализируем компонент
  return analyzeComponentStructureWithRendering(componentInfo);
};
