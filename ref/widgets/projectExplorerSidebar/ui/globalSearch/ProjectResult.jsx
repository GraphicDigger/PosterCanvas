import React, { useMemo } from 'react';
import { List } from '@/shared/uiKit/List';
import { useElement } from '@/entities/uiElement';
import { useScreens } from '@/entities/uiScreen';
import { useSearchFilters } from '@/features/globalSearchSettings';
import { ENTITY_KINDS } from '@/shared/constants';
import { ComponentPreview, useComponents } from '@/entities/uiComponent';

export const ProjectResult = () => {

  const { allComponents } = useComponents();
  const { allElements } = useElement();
  const { allScreens } = useScreens();

  const {
    includeComponents,
    includeElements,
    includeImages,
    includeText,
    selectedScreenIds,
  } = useSearchFilters();

  const searchResults = useMemo(() => {
    const results = [];

    // Если экраны не выбраны, показываем все
    const shouldFilterByScreens = selectedScreenIds && selectedScreenIds.length > 0;

    if (includeComponents && allComponents) {
      let componentsToShow = allComponents;

      // Фильтруем только если выбраны экраны
      if (selectedScreenIds && selectedScreenIds?.length > 0) {
        componentsToShow = allComponents.filter(component =>
          allScreens.some(screen =>
            selectedScreenIds.includes(screen.id) &&
                        screen.componentIds?.includes(component.id),
          ),
        );
      }

      results.push(...componentsToShow.map(component => ({
        ...component,
        type: ENTITY_KINDS.COMPONENT,
        title: component.name,
        subtitle: `Variants: ${component.variants?.length}`,
        content: `Props: ${component.props?.join(', ')}`,
      })));
    }

    if (includeElements && allElements) {
      let elementsToShow = allElements;

      // Фильтруем только если выбраны экраны
      if (shouldFilterByScreens) {
        elementsToShow = allElements.filter(element =>
          allScreens.some(screen =>
            selectedScreenIds.includes(screen.id) &&
                        screen.elementIds?.includes(element.id),
          ),
        );
      }

      results.push(...elementsToShow.map(element => ({
        ...element,
        type: ENTITY_KINDS.ELEMENT,
        title: element.name,
        subtitle: 'Element',
        content: `Layout: ${Object.keys(element.layout).length} properties`,
      })));
    }

    return results;
  }, [
    allComponents,
    allElements,
    allScreens,
    selectedScreenIds,
    includeComponents,
    includeElements,
    includeImages,
    includeText,
  ]);

  if (!allComponents || !allElements || !allScreens) {
    return <div>Loading...</div>;
  }


  return (
    <List padding={2} gap={0}>
      {searchResults.map(item => (
        <ComponentPreview
          key={`${item.type}-${item.id}`}
          uiView='preview'
          component={item}
        />
      ))}
    </List>
  );
};
