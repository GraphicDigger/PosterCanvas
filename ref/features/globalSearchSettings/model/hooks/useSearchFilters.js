import { useSelector } from 'react-redux';
import {
  selectSearchSettings,
  selectSelectedProjectIds,
  selectSelectedScreenIds,
  selectIsCurrentScreenOnly,
  selectIncludeComponents,
  selectIncludeElements,
  selectIncludeImages,
  selectIncludeText,
  selectIncludeTasks,
  selectIncludeDocuments,
  selectIncludeChats,
  selectSearchMode,
  selectIsProjectMode,
  selectIsWorkspaceMode,
} from '../store/selectors';

// получения текущих значений фильтров
export const useSearchFilters = () => {
  const searchMode = useSelector(selectSearchMode);
  const isProjectMode = useSelector(selectIsProjectMode);
  const isWorkspaceMode = useSelector(selectIsWorkspaceMode);

  const searchSettings = useSelector(selectSearchSettings);
  const selectedProjectIds = useSelector(selectSelectedProjectIds);
  const selectedScreenIds = useSelector(selectSelectedScreenIds);
  const isCurrentScreenOnly = useSelector(selectIsCurrentScreenOnly);

  const includeComponents = useSelector(selectIncludeComponents);
  const includeElements = useSelector(selectIncludeElements);
  const includeImages = useSelector(selectIncludeImages);
  const includeText = useSelector(selectIncludeText);
  const includeTasks = useSelector(selectIncludeTasks);
  const includeDocuments = useSelector(selectIncludeDocuments);
  const includeChats = useSelector(selectIncludeChats);

  return {
    searchMode,
    isProjectMode,
    isWorkspaceMode,

    searchSettings,
    selectedProjectIds,
    selectedScreenIds,
    isCurrentScreenOnly,
    includeComponents,
    includeElements,
    includeImages,
    includeText,
    includeTasks,
    includeDocuments,
    includeChats,
  };
};
