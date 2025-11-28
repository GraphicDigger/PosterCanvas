// 2 способа рендера: Создание рендерера на основе материализованных путей

import React, { useMemo } from 'react';
import { ENTITY_KINDS } from '../../../shared/constants';
import { TextContent, ELEMENT_RENDERERS_MAP } from './elements';
import { useRenderEvents } from '../model';
import { useDesignMode } from '../../../entities/mode/editorMode';
import { Artboard } from './Artboard';
import { useUITree } from '../model/hooks/useUITree';

export const PathUIRender = ({ ownershipType, ownerId }) => {
  const { getUITreeByOwnership } = useUITree();
  const { isComponentCanvasInDesignMode } = useDesignMode();

  // Получаем дерево UI из Redux
  const uiTree = getUITreeByOwnership(ownershipType, ownerId);

  // Создаем плоскую структуру с путями в качестве ключей
  const uiMap = useMemo(() => {
    const map = {};

    const buildMap = (nodes, parentPath = '', parentContext = null) => {
      if (!nodes || nodes.length === 0) {return;}

      nodes.forEach(node => {
        const currentPath = parentPath ? `${parentPath}.${node.id}` : node.id;
        const isInstance = node.kind === ENTITY_KINDS.INSTANCE;
        const context = isInstance ? node : parentContext;

        map[currentPath] = {
          node,
          parentPath,
          context,
          isInstance,
          childPaths: [],
        };

        if (node.children && node.children.length > 0) {
          node.children.forEach(child => {
            const childPath = `${currentPath}.${child.id}`;
            map[currentPath].childPaths.push(childPath);
            buildMap([child], currentPath, context);
          });
        }
      });
    };

    buildMap(uiTree);
    return map;
  }, [uiTree]);

  // Рендерер для элемента по его пути
  const renderByPath = (path) => {
    if (!uiMap[path]) {return null;}

    const { node, context, isInstance, childPaths } = uiMap[path];
    const disableClick = false;
    const eventHandlers = useRenderEvents(node, disableClick, context);

    if (isInstance) {
      return (
        <Artboard
          key={node.id}
          isComponentMode={isComponentCanvasInDesignMode}
          context={node}
          data-path={path}
        >
          {childPaths.map(childPath => renderByPath(childPath))}
        </Artboard>
      );
    }

    const HTMLElementRenderer = ELEMENT_RENDERERS_MAP[node.tag || node.type];
    if (HTMLElementRenderer) {
      return (
        <HTMLElementRenderer
          key={node.id}
          ui={node}
          instance={context}
          children={node.children}
          disableClick={disableClick}
          data-path={path}
        />
      );
    }

    const Tag = node.tag || 'div';

    return (
      <Tag
        key={node.id}
        style={node.properties?.style}
        className={node.properties?.attributes?.className}
        {...eventHandlers}
        data-path={path}
      >
        <TextContent
          ui={node}
          instance={context}
        />

        {childPaths.map(childPath => renderByPath(childPath))}
      </Tag>
    );
  };

  // Рендерим корневые элементы
  return (
    <div className="path-based-ui-render">
      {Object.keys(uiMap)
        .filter(path => !uiMap[path].parentPath) // Только корневые элементы
        .map(path => renderByPath(path))}
    </div>
  );
};
