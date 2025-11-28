
// Анализирует компонент различными методами

export const analyzeComponent = async (
  component,
  Component,
  options = {},
) => {

  if (!component || !Component) {return component;}

  const {
    useRendering = true,
    useVirtualDOM = true,
    testProps = {},
    jsxCode = null,
  } = options;

  let result = { ...component };

  try {
    // Анализ путем рендеринга компонента
    if (useRendering) {
      console.log('Анализ компонента путем рендеринга:', component.name);
      result = analyzeComponentByRendering(result, Component, testProps);
    }

    // Анализ виртуального DOM
    if (useVirtualDOM) {
      console.log('Анализ виртуального DOM компонента:', component.name);
      result = analyzeVirtualDOM(result, Component, testProps);
    }

    return result;
  } catch (error) {
    console.error('Ошибка при анализе компонента:', error);
    return component;
  }
};
