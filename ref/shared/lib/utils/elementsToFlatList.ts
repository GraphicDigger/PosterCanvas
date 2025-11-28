import type { FlatElementList } from '@/shared/types';
import type { DefaultElement } from '@/shared/uiEditorDefaults/elements/types';

export const elementsToFlatList = (element: DefaultElement): FlatElementList => {
  const result: FlatElementList = [element];

  if (element.childrens && element.childrens.length > 0) {
    element.childrens.forEach((child: DefaultElement) => {
      result.push(...elementsToFlatList(child));
    });
  }

  return result;
};
