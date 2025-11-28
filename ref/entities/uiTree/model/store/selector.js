import { createSelector } from 'reselect';
import { ENTITY_KINDS } from '../../../../shared/constants';
import { selectElementIds, selectElementEntities } from '../../@x/element';
import { selectInstanceIds, selectInstanceEntities } from '../../@x/instance';
import { extractAllInstancesFromTree, extractAllElementsFromTree } from '../../lib';
import { selectCompositeComponentById } from '../../@x/component';

// Универсальный селектор для получения всех сущностей (элементов + инстансов) по ownership, ключая рекурсивно всех их потомков.
// Результат для экрана будет содержать структуру вида:
// [
//   {
//     id: 'button-instance-01',
//     kind: 'instance',
//     componentId: 'button-component-new',
//     children: [
//       {
//         id: 'element-00-button', // элемент из компонента
//         kind: 'element',
//         children: [
//           {
//             id: 'icon-instance-01', // вложенный инстанс
//             kind: 'instance',
//             children: [...] // элементы из компонента иконки
//           }
//         ]
//       }
//     ]
//   }
// ]

export const selectCompositeEntitiesByOwnership = createSelector(
  [
    (state) => selectElementIds(state),
    (state) => selectElementEntities(state),
    (state) => selectInstanceIds(state),
    (state) => selectInstanceEntities(state),
    (_, ownershipType, ownerId) => ({ ownershipType, ownerId }),
  ],
  (elementIds, elementEntities, instanceIds, instanceEntities, { ownershipType, ownerId }) => {
    if (!elementIds || !elementEntities || !instanceIds || !instanceEntities) { return []; }

    const allEntities = { ...elementEntities, ...instanceEntities };
    const allIds = [...elementIds, ...instanceIds];

    const entitiesInTree = new Map(); // Карта для хранения всех сущностей дерева {id: entityObject}
    const rootEntityIds = []; // Массив ID корневых сущностей для этого владельца
    const queue = [];

    // 1. Найти "корневые" сущности по ownership и всех их потомков
    for (const id of allIds) {
      const entity = allEntities[id];
      if (entity) {
        // Проверяем ownership для элементов
        if (entity.ownership?.type === ownershipType &&
          entity.ownership?.id === ownerId) {
          if (!entitiesInTree.has(id)) {
            entitiesInTree.set(id, { ...entity, children: [] });
            queue.push(id);
            rootEntityIds.push(id);
          }
        }
      }
    }

    // 2. Найти всех потомков (элементы, принадлежащие элементам, и инстансы, принадлежащие элементам)
    let head = 0;
    while (head < queue.length) {
      const currentParentId = queue[head++];
      const currentParent = entitiesInTree.get(currentParentId);

      for (const id of allIds) {
        const potentialChild = allEntities[id];
        if (potentialChild && !entitiesInTree.has(id)) {
          let shouldAddChild = false;

          // Проверяем, принадлежит ли этот entity текущему родителю
          const belongsToParent =
            (potentialChild.ownership?.type === ENTITY_KINDS.ELEMENT &&
              potentialChild.ownership?.id === currentParentId) ||
            (potentialChild.ownership?.type === ENTITY_KINDS.INSTANCE &&
              potentialChild.ownership?.id === currentParentId);

          if (belongsToParent) {
            shouldAddChild = true;
          }

          // Если текущий родитель - инстанс, то также добавляем все элементы и инстансы из его компонента
          if (currentParent?.kind === ENTITY_KINDS.INSTANCE && currentParent.componentId) {
            const belongsToInstanceComponent =
              (potentialChild.ownership?.type === ENTITY_KINDS.COMPONENT &&
                potentialChild.ownership?.id === currentParent.componentId);

            if (belongsToInstanceComponent) {
              shouldAddChild = true;
            }
          }

          if (shouldAddChild) {
            entitiesInTree.set(id, { ...potentialChild, children: [] });
            queue.push(id);
          }
        }
      }
    }

    // 3. Построить иерархию (связать детей с родителями)
    const componentToInstancesMap = new Map();
    entitiesInTree.forEach(entity => {
      if (entity.kind === ENTITY_KINDS.INSTANCE && entity.componentId) {
        if (!componentToInstancesMap.has(entity.componentId)) {
          componentToInstancesMap.set(entity.componentId, []);
        }
        componentToInstancesMap.get(entity.componentId).push(entity);
      }
    });

    entitiesInTree.forEach(entityNode => {
      const ownerId = entityNode.ownership?.id;
      const ownerType = entityNode.ownership?.type;

      if (!ownerId) { return; }

      // Случай 1: Сущность принадлежит другой сущности напрямую (элемент -> элемент, инстанс -> элемент)
      if (ownerType === ENTITY_KINDS.ELEMENT || ownerType === ENTITY_KINDS.INSTANCE) {
        if (entitiesInTree.has(ownerId)) {
          const parentNode = entitiesInTree.get(ownerId);
          parentNode.children.push(entityNode);
        }
      }
      // Случай 2: Элемент принадлежит компоненту, и его нужно добавить в соответствующий инстанс
      else if (ownerType === ENTITY_KINDS.COMPONENT) {
        const componentId = ownerId;
        const instancesOfComponent = componentToInstancesMap.get(componentId);
        if (instancesOfComponent) {
          instancesOfComponent.forEach(instanceNode => {
            instanceNode.children.push(entityNode);
          });
        }
      }
    });

    // 4. Вернуть только корневые сущности с вложенными детьми
    return rootEntityIds.map(id => entitiesInTree.get(id)).filter(Boolean);
  },
);

// Селектор для получения всех инстансов из дерева с их композитными компонентами
export const selectAllInstancesFromTree = createSelector(
  [
    (state, ownershipType, ownerId) => selectCompositeEntitiesByOwnership(state, ownershipType, ownerId),
    (state) => state,
  ],
  (treeNodes, state) => {
    const instances = extractAllInstancesFromTree(treeNodes);

    // Для каждого инстанса получаем его композитный компонент с пропсами
    return instances.map(instance => ({
      ...instance,
      component: selectCompositeComponentById(state, instance.componentId),
    }));
  },
);

//fabric selector
export const makeSelectCompositeEntitiesByOwnership = (ownershipType, ownerId) =>
  createSelector(
    [
      selectElementIds,
      selectElementEntities,
      selectInstanceIds,
      selectInstanceEntities,
      () => ({ ownershipType, ownerId }),
    ],
    (
      elementIds,
      elementEntities,
      instanceIds,
      instanceEntities,
      params,
    ) => {
      return selectCompositeEntitiesByOwnership.resultFunc(
        elementIds,
        elementEntities,
        instanceIds,
        instanceEntities,
        params,
      );
    },
  );

export const makeSelectAllInstancesFromTree = (ownershipType, ownerId) =>
  createSelector(
    [(state) => selectCompositeEntitiesByOwnership(state, ownershipType, ownerId)],
    (treeNodes) => {
      return extractAllInstancesFromTree(treeNodes);
    },
  );

export const makeSelectAllInstanceIdsFromTree = (ownershipType, ownerId) =>
  createSelector(
    [makeSelectAllInstancesFromTree(ownershipType, ownerId)],
    (instances) => {
      return instances.map(instance => instance.id);
    },
  );

export const makeSelectAllElementsFromTree = (ownershipType, ownerId) =>
  createSelector(
    [(state) => selectCompositeEntitiesByOwnership(state, ownershipType, ownerId)],
    (treeNodes) => {
      return extractAllElementsFromTree(treeNodes);
    },
  );

export const makeSelectAllElementIdsFromTree = (ownershipType, ownerId) =>
  createSelector(
    [makeSelectAllElementsFromTree(ownershipType, ownerId)],
    (elements) => {
      return elements.map(e => e.id);
    },
  );

// Селектор для получения всех элементов включая элементы из инстансов и вложенных инстансов
export const makeSelectAllNestedElementsFromTree = (ownershipType, ownerId) =>
  createSelector(
    [
      makeSelectAllInstancesFromTree(ownershipType, ownerId),
      makeSelectAllElementsFromTree(ownershipType, ownerId),
    ],
    (instances, elements) => {

      const allInstanceElements = [];
      // Рекурсивная функция для извлечения всех элементов из инстансов
      const extractElementsFromInstances = (nodes) => {
        nodes.forEach(node => {
          if (node.kind === ENTITY_KINDS.ELEMENT) {
            allInstanceElements.push(node);
          }

          // Рекурсивно обрабатываем дочерние узлы
          if (node.children && node.children.length > 0) {
            extractElementsFromInstances(node.children);
          }
        });
      };
      // Для каждого инстанса извлекаем все его элементы
      instances.forEach(instance => {
        if (instance.children && instance.children.length > 0) {
          extractElementsFromInstances(instance.children);
        }
      });
      extractElementsFromInstances(instances);
      const allElements = [...allInstanceElements, ...elements];

      return allElements;
    },
  );
