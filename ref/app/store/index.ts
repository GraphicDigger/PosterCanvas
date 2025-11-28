import { configureStore } from '@reduxjs/toolkit';
import { commentControlMiddleware } from '@/features/commentControl';
import { eventManagerMiddleware } from '@/features/eventBridgeMiddleware';
import { createReduxBridgeMiddlewareWithFilter, getGlobalEventBus } from '@/shared/services/eventBus';
import { elementEntityReducer } from '../../entities/uiElement';
import { propEntityReducer } from '../../entities/varProp';
import { propValueEntityReducer } from '../../entities/varPropValue';
import { componentEntityReducer } from '../../entities/uiComponent';
import { variantEntityReducer } from '../../entities/uiVariant';
import { dataVariableEntityReducer } from '../../entities/varVariableData';
import { screenEntityReducer } from '../../entities/uiScreen';
import { codeEntityReducer } from '../../entities/code';
import { tokenCollectionEntityReducer } from '../../entities/varTokenCollection';
import { tokenEntityReducer } from '../../entities/varToken';
import { presetCollectionEntityReducer } from '../../entities/varPresetCollection';
import { presetEntityReducer } from '../../entities/varPreset';
import { dataRecordEntityReducer } from '../../entities/dataRecord';
import { dataModelReducer } from '../../entities/dataModel';
import { commentEntityReducer } from '../../entities/comment';
import { memberEntityReducer } from '../../entities/actorMember';
import { projectEntityReducer } from '../../entities/project';
import { documentEntityReducer } from '@/entities/document';
import { taskEntityReducer } from '@/entities/task';
import { chatEntityReducer } from '@/entities/chat';
import { contextLinkEntityReducer } from '@/entities/entityContextLink';
import { actionEntityReducer } from '../../entities/action';
import { wireframeBlockEntityReducer } from '../../entities/wireframeBlock';
import { instanceEntityReducer } from '../../entities/uiInstance';
import { apiEntityReducer } from '@/entities/api';
import { dataModelFieldReducer } from '../../entities/dataModelField';
import { focusSystemReducer } from '../../entities/uiFocus';
import { editorModesReducer } from '../../entities/mode/editorMode';
import { spaceModesReducer } from '../../entities/mode/spaceMode';
import { actorRoleEntityReducer } from '../../entities/actorRole';
import { actorPositionEntityReducer } from '../../entities/actorPosition';
import { actorAgentEntityReducer } from '../../entities/actorAgent';
import { workspaceEntityReducer } from '../../entities/workspace';
import { userspaceEntityReducer } from '../../entities/userspace';
import { variableModeEntityReducer } from '../../entities/varMode';
import { presetModeValueEntityReducer } from '../../entities/varPresetModeValue';
import { variableModeGroupEntityReducer } from '../../entities/varModeGroup';
import { eventEntityReducer } from '@/entities/event';
import { activityEntityReducer } from '@/entities/eventActivity';
import { notificationEntityReducer } from '@/entities/eventNotification';
import { tokenValueEntityReducer } from '../../entities/varTokenValue';
import { htmlAttrEntityReducer } from '../../entities/htmlAttribute';
import { explorerSidebarReducer } from '../../widgets/projectExplorerSidebar';
import { instanceSidebarReducer } from '../../widgets/componentInstanceSidebar';
import { screenSidebarReducer } from '../../widgets/screenSidebar';
import { elementSidebarReducer } from '../../widgets/elementSidebar';
import { codeSidebarReducer } from '../../widgets/sidebarCode';
import { presetManagerReducer } from '../../widgets/varPresetManager';
import { codeEditorReducer } from '../../features/codeEditor';
import { searchSettingsReducer } from '../../features/globalSearchSettings';
import { UILibraryComponentsImporterReducer } from '../../features/importUILibraryComponents';
import { importerReducer } from '../../features/importer';
import { StackBlitzReducer } from '../../features/StackBlitzEditor';
import { aiAssistantReducer } from '../../widgets/aiAssistant';
import { databaseManagerReducer } from '../../widgets/databaseManager';
import { DbModelEditorReducer } from '../../features/dataModelEditor';
import { dbRecordEditorReducer } from '../../features/dataRecordEditor';
import { screenWireframeCanvasReducer } from '../../widgets/screenWireframeCanvas';
import { projectDatabaseSettingsReducer } from '../../features/settings/projectDatabaseSettings';
import { commentControlReducer } from '../../features/commentControl';
import { userEntityReducer } from '../../entities/actorUser';
import { projectMemberEntityReducer } from '../../entities/projectMember';
import { taskAssigneeEntityReducer } from '../../entities/taskAssignee';
import { authSessionReducer } from '@/app/sessions/auth';
import { defaultWidgetsReducer } from '@/shared/uiEditorDefaults/widgets';

// Get global EventBus singleton instance / Получаем глобальный singleton экземпляр EventBus
const eventBusForMiddleware = getGlobalEventBus();

export const store = configureStore({
  reducer: {

    // entities
    screenEntity: screenEntityReducer,
    componentEntity: componentEntityReducer,
    variantEntity: variantEntityReducer,
    dataVariableEntity: dataVariableEntityReducer,
    elementEntity: elementEntityReducer,
    propEntity: propEntityReducer,
    propValueEntity: propValueEntityReducer,
    codeEntity: codeEntityReducer,
    tokenEntity: tokenEntityReducer,
    tokenCollectionEntity: tokenCollectionEntityReducer,
    presetCollectionEntity: presetCollectionEntityReducer,
    presetEntity: presetEntityReducer,
    dataRecordEntity: dataRecordEntityReducer,
    dataModelEntity: dataModelReducer,
    commentEntity: commentEntityReducer,
    memberEntity: memberEntityReducer,
    projectEntity: projectEntityReducer,
    documentEntity: documentEntityReducer,
    taskEntity: taskEntityReducer,
    chatEntity: chatEntityReducer,
    actionEntity: actionEntityReducer,
    wireframeBlockEntity: wireframeBlockEntityReducer,
    instanceEntity: instanceEntityReducer,
    apiEntity: apiEntityReducer,
    dataModelFieldEntity: dataModelFieldReducer,
    spaceModes: spaceModesReducer,
    actorRoleEntity: actorRoleEntityReducer,
    actorPositionEntity: actorPositionEntityReducer,
    actorAgentEntity: actorAgentEntityReducer,
    workspaceEntity: workspaceEntityReducer,
    userspaceEntity: userspaceEntityReducer,
    eventEntity: eventEntityReducer,
    activityEntity: activityEntityReducer,
    notificationEntity: notificationEntityReducer,
    variableModeEntity: variableModeEntityReducer,
    presetModeValueEntity: presetModeValueEntityReducer,
    variableModeGroupEntity: variableModeGroupEntityReducer,
    tokenValueEntity: tokenValueEntityReducer,
    htmlAttrEntity: htmlAttrEntityReducer,
    contextLinkEntity: contextLinkEntityReducer,
    userEntity: userEntityReducer,
    projectMemberEntity: projectMemberEntityReducer,
    taskAssigneeEntity: taskAssigneeEntityReducer,
    // features
    editorModes: editorModesReducer,
    focusSystem: focusSystemReducer,
    codeEditor: codeEditorReducer,
    searchSettings: searchSettingsReducer,
    UILibraryComponentsImporter: UILibraryComponentsImporterReducer,
    stackBlitz: StackBlitzReducer,
    importer: importerReducer,
    aiAssistant: aiAssistantReducer,
    dbModelEditor: DbModelEditorReducer,
    dbRecordEditor: dbRecordEditorReducer,
    projectDatabaseSettings: projectDatabaseSettingsReducer,
    commentControl: commentControlReducer,
    // widgets
    codeSidebar: codeSidebarReducer,
    explorerSidebar: explorerSidebarReducer,
    instanceSidebar: instanceSidebarReducer,
    screenSidebar: screenSidebarReducer,
    elementSidebar: elementSidebarReducer,
    databaseManager: databaseManagerReducer,
    presetManager: presetManagerReducer,
    screenWireframeCanvas: screenWireframeCanvasReducer,
    
    // shared
    authSession: authSessionReducer,
    defaultWidgets: defaultWidgetsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Игнорируем проверку сериализации для vm
        ignoredActions: ['stackBlitz/setVM'],
        ignoredPaths: ['stackBlitz.vm'],
      },
    })
      .concat(eventManagerMiddleware.middleware)
      .concat(commentControlMiddleware.middleware)
      .concat(createReduxBridgeMiddlewareWithFilter(eventBusForMiddleware,
        {
          exclude: [
            'eventEntity/addEvent',
            'eventEntity/updateEvent',
            'eventEntity/deleteEvent',
            'activityEntity/addActivity',
            'activityEntity/updateActivity',
            'activityEntity/deleteActivity',
          ],
        }),
      ),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

