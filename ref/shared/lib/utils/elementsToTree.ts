import type { ElementWithChildren, FlatElementList, Element } from '@/shared/types';

export const elementsToTree = (
  allEntities: FlatElementList,
  ownerId: string,
  ownershipType: string,
): ElementWithChildren[] => {
  if (!allEntities) {
    return [];
  }

  const buildTree = (parentId: string): ElementWithChildren[] => {
    const children = allEntities.filter((entity: Element) =>
      entity.ownership?.type === ownershipType &&
      entity.ownership?.id === parentId,
    );

    return children.map(child => ({
      ...child,
      childrens: buildTree(child.id), // Recursively build the tree
    }));
  };

  return buildTree(ownerId);
};
