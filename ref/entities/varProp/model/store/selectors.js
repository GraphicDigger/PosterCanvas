import { createSelector } from '@reduxjs/toolkit';
import { selectSelectedPropId } from './uiStates/selectors';
import { selectPropValuesByPropId } from '../../@x/propValue';
import { selectSelectedComponentId } from '../../@x/component';

// base selectors
const selectPropState = state => state.propEntity;
const selectPropEntities = state => state.propEntity.entities;
const selectPropIds = state => state.propEntity.ids;
const selectPropByComponent = state => state.propEntity.byComponent;
const selectPropByVariable = state => state.propEntity.byVariable;

// all props
export const selectAllProps = createSelector(
  [selectPropIds, selectPropEntities],
  (ids, entities) => {
    return ids.map(id => entities[id]);
  },
);

// selected prop
export const selectSelectedProp = createSelector(
  [selectSelectedPropId, selectPropEntities],
  (selectedId, entities) => {
    if (!selectedId) {return null;}
    return entities[selectedId];
  },
);

export const selectPropById = createSelector(
  [selectPropEntities, (_, id) => id, (state) => state],
  (entities, id, state) => {
    const propValues = selectPropValuesByPropId(state, id);
    return {
      ...entities[id],
      values: propValues || [],
    };
  },
);

//component props
export const selectPropsByComponentId = createSelector(
  [selectPropByComponent, selectPropEntities, (_, componentId) => componentId, (state) => state],
  (byComponent, entities, componentId, state) => {
    const propIds = byComponent[componentId] || [];
    const props = propIds.map(id => entities[id]);
    const result = props.map(prop => {
      const propValues = selectPropValuesByPropId(state, prop.id);
      return {
        ...prop,
        values: propValues || [],
      };
    });
    return result;

  },
);


// //selected component props
// export const selectPropsBySelectedComponentId = createSelector(
//     [selectPropByComponent, selectPropEntities, selectSelectedComponentId],
//     (byComponent, entities, selectedComponentId) => {

//         if (!selectedComponentId) return [];
//         const propIds = byComponent[selectedComponentId] || [];

//         const result = propIds.map(id => entities[id]);
//         return result;
//     }
// );

// // селектор для получения пропсов компонента с их значениями
// export const selectSelectedComponentPropsWithPropValues = createSelector(
//     [selectPropsBySelectedComponentId, (state) => state],
//     (componentProps, state) => {

//         if (!componentProps || componentProps.length === 0) return [];

//         const result = componentProps.map(prop => {
//             const propValues = selectPropValuesByPropId(state, prop.id);
//             return {
//                 ...prop,
//                 values: propValues || []
//             };
//         });
//         return result;
//     }
// );

