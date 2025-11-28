import { createListenerMiddleware, isAnyOf } from '@reduxjs/toolkit';
import { selectInstancesByComponentId } from '../../../../entities/uiInstance/model/store/selectors';
import { updateInstanceProps } from '../../../../entities/uiInstance/model/store/slice';
import { addProp, selectPropsByComponentId, selectPropById } from '../../../../entities/uiInstance/@x/props';
import { updatePropValue, addPropValue, selectPropValuesByPropId } from '../../../../entities/uiInstance/@x/propValue';
import { addElement, addElements } from '../../../../entities/uiElement';
import { v4 as uuidv4 } from 'uuid';
import { ENTITY_KINDS, EventType } from '../../../../shared/constants';
import { addEvent } from '../../../../entities/event/model/store';
import { addActivity } from '../../../../entities/eventActivity';
// import { selectCurrentMemberId } from '../../../member'; // Предполагаемый селектор

export const eventElementMiddleware = createListenerMiddleware();

eventElementMiddleware.startListening({
  matcher: isAnyOf(addElement, addElements),
  effect: async (action, listenerApi) => {
    const { payload } = action;
    const state = listenerApi.getState();
    // const currentMemberId = selectCurrentMemberId(state); // Получение ID текущего пользователя
    const currentMemberId = 'id-member-01'; // Временный хардкод

    const elements = Array.isArray(payload) ? payload : [payload];

    elements.forEach(element => {
      const eventId = uuidv4();
      const activityId = uuidv4();

      // Создаем событие
      const newEvent = {
        id: eventId,
        kind: ENTITY_KINDS.EVENT,
        type: EventType.ELEMENT_CREATED,
        memberId: currentMemberId,
        source: {
          entityId: element.id,
          entityKind: ENTITY_KINDS.ELEMENT,
        },
        payload: {
          text: `Added a <${element.tag}> element`,
          // projectId: 'project_alpha' // projectId нужно будет как-то определять
        },
        approved: true,
        timestamp: new Date().toISOString(),
      };

      // Создаем активность
      const newActivity = {
        id: activityId,
        kind: ENTITY_KINDS.ACTIVITY,
        sourceEventId: eventId,
        payload: {
          text: `Added a <${element.tag}> element`,
          sourceEntityKind: ENTITY_KINDS.ELEMENT,
        },
      };

      listenerApi.dispatch(addEvent(newEvent));
      listenerApi.dispatch(addActivity(newActivity));
    });
  },
});

// // listen update prop value
// syncInstancePropsWithComponent.startListening({
//     matcher: isAnyOf(updatePropValue, addPropValue),
//     effect: async (action, listenerApi) => {
//         const { payload } = action;
//         const state = listenerApi.getState();
//         const componentId = selectPropById(state, payload.propId).componentId;
//         const componentProps = selectPropsByComponentId(state, componentId);
//         const relatedInstances = selectInstancesByComponentId(state, componentId);


//         relatedInstances.forEach(instance => {
//             listenerApi.dispatch(updateInstanceProps({
//                 instanceId: instance.id,
//                 props: componentProps,
//                 isCustom: false
//             }));
//         });
//     }
// });


// //Слушает удаление пропа
// syncInstancePropsWithComponent.startListening({
//     actionCreator: (action) => action.type === 'propEntity/deleteProp',
//     effect: async (action, listenerApi) => {
//         const { payload } = action;
//         const state = listenerApi.getState();

//         const relatedInstances = Object.values(state.instanceEntity.entities)
//             .filter(instance => instance.componentId === payload.componentId);

//         // Удаляем проп из всех связанных instances
//         relatedInstances.forEach(instance => {
//             if (instance.props && instance.props[payload.id]) {
//                 listenerApi.dispatch({
//                     type: 'instanceEntity/removeInstanceProp',
//                     payload: {
//                         instanceId: instance.id,
//                         propId: payload.id
//                     }
//                 });
//             }
//         });

//         console.log(`Синхронизировано удаление пропа ${payload.id} из ${relatedInstances.length} instances`);
//     }
// });
