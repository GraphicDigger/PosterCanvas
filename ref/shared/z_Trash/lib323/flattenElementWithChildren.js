// Вспомогательная функция для создания плоского массива из иерархии
export const flattenElementWithChildren = (element) => {
  const result = [element];

  if (element.childrens && element.childrens.length > 0) {
    element.childrens.forEach(child => {
      result.push(...flattenElementWithChildren(child));
    });
  }

  return result;
};
