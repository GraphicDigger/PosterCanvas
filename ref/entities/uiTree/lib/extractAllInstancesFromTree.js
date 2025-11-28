import { ENTITY_KINDS } from '../../../shared/constants';


// Утилитарная функция для рекурсивного извлечения всех инстансов из дерева
export const extractAllInstancesFromTree = (treeNodes) => {
  const instances = [];

  const traverse = (nodes) => {
    if (!Array.isArray(nodes)) {return;}

    for (const node of nodes) {
      // Если это инстанс, добавляем его в результат
      if (node.kind === ENTITY_KINDS.INSTANCE) {
        instances.push(node);
      }

      // Рекурсивно обрабатываем дочерние элементы
      if (node.children && node.children.length > 0) {
        traverse(node.children);
      }
    }
  };

  traverse(treeNodes);
  return instances;
};
