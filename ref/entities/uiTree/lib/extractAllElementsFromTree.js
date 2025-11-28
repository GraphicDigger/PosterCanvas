import { ENTITY_KINDS } from '../../../shared/constants';

// Утилитарная функция для рекурсивного извлечения всех элементов из дерева
export const extractAllElementsFromTree = (treeNodes) => {
  const elements = [];

  const traverse = (nodes) => {
    if (!Array.isArray(nodes)) {return;}

    for (const node of nodes) {
      if (node.kind === ENTITY_KINDS.ELEMENT) {
        elements.push(node);
      }

      if (node.children && node.children.length > 0) {
        traverse(node.children);
      }
    }
  };
  traverse(treeNodes);

  return elements;
};
