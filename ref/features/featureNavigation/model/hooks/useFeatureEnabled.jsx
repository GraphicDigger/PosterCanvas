import { PreviewIcon, CodeIcon,  VariableDataIcon, SearchIcon,  StoryboardIcon, ImportIcon, BurgerIcon, LibraryIcon, CommentIcon } from '@/shared/assets/icons';
import { useGlobalModes, GLOBAL_MODES, DESIGN_MODES } from '@/entities/mode/editorMode';
import { useSidebarExplorer } from '@/widgets/projectExplorerSidebar/model/hooks/useSidebarExplorer';
import { SIDEBAR_CONTENT } from '@/widgets/projectExplorerSidebar/model/constants/sidebarContent';
import { usePreviewModes } from '@/entities/mode/editorMode';
import { useImporter, ImporterDialog } from '../../../importer';
import { useDesignMode } from '@/entities/mode/editorMode';

export const useFeatureEnabled = (feature) => {
  const {
    setGlobalPreviewMode,
    toggleModesDesignCodebase,
    setGlobalDatabaseMode,
    setGlobalWireframeMode,
    isPreviewModeGlobal,
    isCodebaseModeGlobal,
    isDatabaseModeGlobal,
    isCommentsInDesignMode,
  } = useGlobalModes();

  const { toggleCommentsInDesignMode } = useDesignMode();

  const {
    toggleSettings,
    toggleGlobalSearch,
    isSettingsMode,
    isGlobalSearchMode,
  } = useSidebarExplorer();


  const component = () => {
    switch (feature) {
    case GLOBAL_MODES.IMPORTER:
      return <ImporterDialog />;
    default:
      return null;
    }
  };

  const handleClick = () => {
    switch (feature) {
    case GLOBAL_MODES.PREVIEW:
      setGlobalPreviewMode();
      break;
    case GLOBAL_MODES.CODEBASE:
      toggleModesDesignCodebase();
      break;
    case GLOBAL_MODES.DATABASE:
      setGlobalDatabaseMode();
      break;
    case GLOBAL_MODES.WIREFRAME:
      setGlobalWireframeMode();
      break;
    case SIDEBAR_CONTENT.SETTINGS:
      toggleSettings();
      break;
    case SIDEBAR_CONTENT.GLOBAL_SEARCH:
      toggleGlobalSearch();
      break;
    case 'Library':
      console.log('Library');
      break;
    case DESIGN_MODES.COMMENTS:
      toggleCommentsInDesignMode();
      break;
    default:
      break;
    }
  };

  const getIcon = () => {
    switch (feature) {
    case GLOBAL_MODES.PREVIEW:
      return <PreviewIcon />;
    case GLOBAL_MODES.CODEBASE:
      return <CodeIcon />;
    case GLOBAL_MODES.DATABASE:
      return <VariableDataIcon />;
    case GLOBAL_MODES.WIREFRAME:
      return <StoryboardIcon />;
    case SIDEBAR_CONTENT.SETTINGS:
      return <BurgerIcon />;
    case SIDEBAR_CONTENT.GLOBAL_SEARCH:
      return <SearchIcon />;
    case 'Library':
      return <LibraryIcon />;
    case DESIGN_MODES.COMMENTS:
      return <CommentIcon />;
    default:
      return null;
    }
  };

  const isSelected = () => {
    switch (feature) {
    case GLOBAL_MODES.PREVIEW:
      return isPreviewModeGlobal;
    case GLOBAL_MODES.CODEBASE:
      return isCodebaseModeGlobal;
    case GLOBAL_MODES.DATABASE:
      return isDatabaseModeGlobal;
    case SIDEBAR_CONTENT.SETTINGS:
      return isSettingsMode;
    case SIDEBAR_CONTENT.GLOBAL_SEARCH:
      return isGlobalSearchMode;
    case DESIGN_MODES.COMMENTS:
      return isCommentsInDesignMode;
    default:
      return false;
    }
  };

  return { handleClick, getIcon, isSelected, component };
};
