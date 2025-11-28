
// Функция для преобразования дерева UI в плоский список

export const flattenUITree = (nodes, depth = 0, parentPath = '', parentContext = null) => {
  if (!nodes || nodes.length === 0) {return [];}

  let result = [];

  nodes.forEach(node => {
    const currentPath = parentPath ? `${parentPath}.${node.id}` : node.id;
    const isInstance = node.kind === ENTITY_KINDS.INSTANCE;
    const context = isInstance ? node : parentContext;

    // Добавляем текущий элемент
    result.push({
      node,
      depth,
      path: currentPath,
      context,
      parentPath,
    });

    // Добавляем дочерние элементы
    if (node.children && node.children.length > 0) {
      const childItems = flattenUITree(node.children, depth + 1, currentPath, context);
      result = result.concat(childItems);
    }
  });

  return result;
};
