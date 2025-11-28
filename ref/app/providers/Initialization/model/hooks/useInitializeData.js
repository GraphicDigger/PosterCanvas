import { useState, useCallback } from 'react';
import { safeExecute } from '../../lib';
import { useDataModelsQueries } from '../../../../../entities/dataModel';
import { useDataRecordQueries } from '../../../../../entities/dataRecord';
import { useScreensQueries } from '../../../../../entities/uiScreen';
import { useCommentQueries } from '../../../../../entities/comment';
import { useMemberQueries } from '../../../../../entities/actorMember';
import { useProjectQueries } from '../../../../../entities/project';
import { useDocumentQueries } from '../../../../../entities/document';
import { useTaskQueries } from '../../../../../entities/task';
import { useChatQueries } from '../../../../../entities/chat';
import { useComponentQueries } from '../../../../../entities/uiComponent';
import { useCodesQueries } from '../../../../../entities/code';
import { usePropQueries } from '../../../../../entities/varProp';
import { usePropValueQueries } from '../../../../../entities/varPropValue';
import { useActionQueries } from '../../../../../entities/action';
import { useWireframeBlockQueries } from '../../../../../entities/wireframeBlock';
import { useElementsQueries } from '../../../../../entities/uiElement';
import { useInstanceQueries } from '../../../../../entities/uiInstance';
import { useApiQueries } from '@/entities/api';
import { useDataModelsFieldsQueries } from '../../../../../entities/dataModelField';
import { useActorRoleQueries } from '../../../../../entities/actorRole';
import { useActorPositionQueries } from '../../../../../entities/actorPosition';
import { useWorkspaceQueries } from '../../../../../entities/workspace';
import { useUserspaceQueries } from '../../../../../entities/userspace';
import { useEventQueries } from '@/entities/event';
import { useActivityQueries } from '@/entities/eventActivity';
import { useNotificationQueries } from '@/entities/eventNotification';
import { useTokenQuery } from '../../../../../entities/varToken';
import { useVariableQueries } from '../../../../../entities/varVariableData';
import { usePresetQuery } from '../../../../../entities/varPreset';
import { useVariableModeQueries } from '../../../../../entities/varMode';
import { usePresetModeValueQueries } from '../../../../../entities/varPresetModeValue';
import { usePresetCollectionQueries } from '../../../../../entities/varPresetCollection';
import { useVariableModeGroupQueries } from '../../../../../entities/varModeGroup';
import { useTokenValueQueries } from '../../../../../entities/varTokenValue';
import { useTokenCollectionQueries } from '../../../../../entities/varTokenCollection';
import { useHtmlAttrQueries } from '../../../../../entities/htmlAttribute';
import { useContextLinkQueries } from '../../../../../entities/entityContextLink';
import { useDefaultWidgetsQueries } from '@/shared/uiEditorDefaults/widgets';
import { useUserQueries } from '../../../../../entities/actorUser';
import { useProjectMemberQueries } from '../../../../../entities/projectMember';
import { useTaskAssigneeQueries } from '../../../../../entities/taskAssignee';

export const useInitializeData = () => {

  const [state, setState] = useState({
    isInitialized: false,
    isInitializing: false,
    isLoading: true,
    error: null,
  });

  const { fetchModels } = useDataModelsQueries();
  const { fetchRecords } = useDataRecordQueries();
  const { fetchModelsFields } = useDataModelsFieldsQueries();

  const { fetchScreens } = useScreensQueries();
  const { fetchComments } = useCommentQueries();
  const { fetchMembers } = useMemberQueries();
  const { fetchProjects } = useProjectQueries();
  const { fetchDocuments } = useDocumentQueries();
  const { fetchTasks } = useTaskQueries();
  const { fetchChats } = useChatQueries();
  const { fetchComponents } = useComponentQueries();
  const { fetchCodes } = useCodesQueries();
  const { fetchPropValues } = usePropValueQueries();
  const { fetchActions } = useActionQueries();
  const { fetchWireframeBlocks } = useWireframeBlockQueries();
  const { fetchElements } = useElementsQueries();
  const { fetchInstances } = useInstanceQueries();
  const { fetchApis } = useApiQueries();
  const { fetchActorRoles } = useActorRoleQueries();
  const { fetchActorPositions } = useActorPositionQueries();
  const { fetchWorkspaces } = useWorkspaceQueries();
  const { fetchUserspaces } = useUserspaceQueries();
  const { fetchEvents } = useEventQueries();
  const { fetchActivities } = useActivityQueries();
  const { fetchNotifications } = useNotificationQueries();
  const { fetchTokens } = useTokenQuery();
  const { fetchProps } = usePropQueries();
  const { fetchVariables } = useVariableQueries();
  const { fetchPresets } = usePresetQuery();
  const { fetchVariableModes } = useVariableModeQueries();
  const { fetchPresetModeValues } = usePresetModeValueQueries();
  const { refetch: fetchPresetCollections } = usePresetCollectionQueries();
  const { fetchVariableModeGroups } = useVariableModeGroupQueries();
  const { fetchTokenValues } = useTokenValueQueries();
  const { fetchTokenCollections } = useTokenCollectionQueries();
  const { fetchHtmlAttrs } = useHtmlAttrQueries();
  const { fetchContextLinks } = useContextLinkQueries();
  const { fetchDefaultWidgets } = useDefaultWidgetsQueries();
  const { fetchUsers } = useUserQueries();
  const { fetchProjectMembers } = useProjectMemberQueries();
  const { fetchTaskAssignees } = useTaskAssigneeQueries();

  const initializeData = useCallback(async () => {
    if (state.isInitialized || state.isInitializing) {return;}

    setState(prev => ({ ...prev, isInitializing: true, error: null, isLoading: true }));

    try {
      console.log('[InitialDataProvider] Начало инициализации данных');

      await Promise.all([
        safeExecute(fetchModels, 'models'),
        safeExecute(fetchRecords, 'records'),
        safeExecute(fetchModelsFields, 'modelsFields'),

        safeExecute(fetchScreens, 'screens'),
        safeExecute(fetchComments, 'comments'),
        safeExecute(fetchMembers, 'members'),
        safeExecute(fetchProjects, 'projects'),
        safeExecute(fetchDocuments, 'documents'),
        safeExecute(fetchTasks, 'tasks'),
        safeExecute(fetchChats, 'chats'),
        safeExecute(fetchComponents, 'components'),
        safeExecute(fetchCodes, 'codes'),
        safeExecute(fetchProps, 'props'),
        safeExecute(fetchPropValues, 'propValues'),
        safeExecute(fetchActions, 'actions'),
        safeExecute(fetchWireframeBlocks, 'wireframeBlocks'),
        safeExecute(fetchElements, 'elements'),
        safeExecute(fetchInstances, 'instances'),
        safeExecute(fetchApis, 'apis'),
        safeExecute(fetchActorRoles, 'actorRoles'),
        safeExecute(fetchActorPositions, 'actorPositions'),
        safeExecute(fetchWorkspaces, 'workspaces'),
        safeExecute(fetchUserspaces, 'userspaces'),
        safeExecute(fetchEvents, 'events'),
        safeExecute(fetchActivities, 'activities'),
        safeExecute(fetchNotifications, 'notifications'),
        safeExecute(fetchTokens, 'tokens'),
        safeExecute(fetchVariables, 'variables'),
        safeExecute(fetchPresets, 'presets'),
        safeExecute(fetchVariableModes, 'variableModes'),
        safeExecute(fetchPresetModeValues, 'presetModeValues'),
        safeExecute(fetchPresetCollections, 'presetCollections'),
        safeExecute(fetchVariableModeGroups, 'variableModeGroups'),
        safeExecute(fetchTokenValues, 'tokenValues'),
        safeExecute(fetchTokenCollections, 'tokenCollections'),
        safeExecute(fetchHtmlAttrs, 'htmlAttrs'),
        safeExecute(fetchContextLinks, 'contextLinks'),
        safeExecute(fetchDefaultWidgets, 'defaultWidgets'),
        safeExecute(fetchUsers, 'users'),
        safeExecute(fetchProjectMembers, 'projectMembers'),
        safeExecute(fetchTaskAssignees, 'taskAssignees'),
        safeExecute(fetchTaskAssignees, 'taskAssignees'),
      ].filter(Boolean));

      setState(prev => ({
        ...prev,
        isInitialized: true,
        isInitializing: false,
        isLoading: false,
      }));

      console.log('[InitialDataProvider] Данные успешно инициализированы');
      return true;
    } catch (err) {
      console.error('[InitialDataProvider] Ошибка инициализации данных:', err);
      setState(prev => ({
        ...prev,
        error: err,
        isInitializing: false,
        isLoading: false,
      }));
      return false;
    }
  }, [
    fetchModels,
    fetchRecords,
    fetchModelsFields,

    fetchScreens,
    fetchComments,
    fetchMembers,
    fetchProjects,
    fetchDocuments,
    fetchTasks,
    fetchChats,
    fetchComponents,
    fetchCodes,
    fetchProps,
    fetchPropValues,
    fetchActions,
    fetchWireframeBlocks,
    fetchElements,
    fetchInstances,
    fetchApis,
    fetchActorRoles,
    fetchActorPositions,
    fetchWorkspaces,
    fetchUserspaces,
    fetchEvents,
    fetchActivities,
    fetchNotifications,
    fetchTokens,
    fetchVariables,
    fetchPresets,
    fetchVariableModes,
    fetchPresetModeValues,
    fetchPresetCollections,
    fetchVariableModeGroups,
    fetchTokenValues,
    fetchTokenCollections,
    fetchHtmlAttrs,
    fetchContextLinks,
    fetchDefaultWidgets,
    fetchUsers,
    fetchProjectMembers,
    fetchTaskAssignees,
  ]);

  return {
    initializeData,
    isInitialized: state.isInitialized,
    isInitializing: state.isInitializing,
    isLoading: state.isLoading,
    error: state.error,
  };
};
