import { useUITree } from '../model/hooks/useUITree';
import { useEffect, useRef, useState } from 'react';
import { useDesignMode } from '../../../entities/uiDesignMode';
import { ENTITY_KINDS } from '../../../shared/constants';
import { flattenUITree } from '../lib/flattenUITree';

export const VirtualizedUIRender = ({ ownershipType, ownerId, height = 600, width = '100%' }) => {
  const { getUITreeByOwnership } = useUITree();
  const [flattenedItems, setFlattenedItems] = useState([]);
  const listRef = useRef();
  const { isComponentCanvasInDesignMode } = useDesignMode();

  // Получаем дерево UI из Redux
  const uiTree = getUITreeByOwnership(ownershipType, ownerId);

  // Преобразуем дерево UI в плоский список при изменении uiTree
  useEffect(() => {
    if (uiTree && uiTree.length > 0) {
      const items = flattenUITree(uiTree);
      setFlattenedItems(items);
    }
  }, [uiTree]);

  // Определяем высоту каждого элемента
  const getItemSize = index => {
    const item = flattenedItems[index];
    // Базовая высота для разных типов элементов
    if (item.node.kind === ENTITY_KINDS.INSTANCE) {return 80;}
    if (item.node.tag === 'h1' || item.node.tag === 'h2') {return 60;}
    return 40; // Стандартная высота для остальных элементов
  };

  // Рендерер для каждого элемента
  const ItemRenderer = ({ index, style }) => {
    const { node, depth, context } = flattenedItems[index];
    const disableClick = false;

    // Отступ для визуализации вложенности
    const indentStyle = {
      paddingLeft: `${depth * 20}px`,
      ...style,
    };

    const eventHandlers = useRenderEvents(node, disableClick, context);

    // Рендеринг инстанса
    if (node.kind === ENTITY_KINDS.INSTANCE) {
      return (
        <div style={indentStyle}>
          <Artboard
            key={node.id}
            isComponentMode={isComponentCanvasInDesignMode}
            context={node}
          >
            <div>Инстанс: {node.name || node.id}</div>
          </Artboard>
        </div>
      );
    }

    // Рендеринг элемента с использованием специализированного рендерера
    const HTMLElementRenderer = ELEMENT_RENDERERS_MAP[node.tag || node.type];
    if (HTMLElementRenderer) {
      return (
        <div style={indentStyle}>
          <HTMLElementRenderer
            ui={node}
            instance={context}
            disableClick={disableClick}
          />
        </div>
      );
    }

    // Стандартный рендеринг
    const Tag = node.tag || 'div';
    return (
      <div style={indentStyle}>
        <Tag
          style={node.properties?.style}
          className={node.properties?.attributes?.className}
          {...eventHandlers}
        >
          <TextContent ui={node} instance={context} />
          {node.properties?.text || node.id}
        </Tag>
      </div>
    );
  };

  if (flattenedItems.length === 0) {return null;}

  return (
    <List
      ref={listRef}
      height={height}
      itemCount={flattenedItems.length}
      itemSize={getItemSize}
      width={width}
    >
      {ItemRenderer}
    </List>
  );
};
