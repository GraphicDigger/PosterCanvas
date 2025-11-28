

// Генерирует JSX для детей компонента
export const generateChildrenJSX = (componentStructure) => {
  if (!componentStructure || !componentStructure.children || componentStructure.children.length === 0) {
    return '';
  }

  return componentStructure.children.map(child => {
    if (child.type === 'text') {
      return child.content;
    }

    if (child.type === 'icon') {
      // Здесь можно добавить логику для рендеринга иконок
      return `<span className="icon ${child.name}">${child.content}</span>`;
    }

    // Для более сложных вложенных компонентов нужна рекурсивная логика
    return '';
  }).join('\n      ');
};
