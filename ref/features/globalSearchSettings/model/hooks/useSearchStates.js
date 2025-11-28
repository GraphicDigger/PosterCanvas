import { useDispatch, useSelector } from 'react-redux';
import {
  toggleProjectInSearch,
  toggleScreenInSearch,
  toggleSearchComponents,
  toggleSearchElements,
  toggleCurrentScreenOnly,
  toggleSearchImages,
  toggleSearchText,
  toggleSearchTasks,
  toggleSearchDocuments,
  toggleSearchChats,
  setSearchMode,
} from '../store/slice';
import { selectIsScreenSelected } from '../store/selectors';

// управления состояниями фильтров

export const useSearchStates = (screenId) => {
  const dispatch = useDispatch();
  const isScreenSelected = useSelector(state => selectIsScreenSelected(state, screenId));

  const handleToggleProjectInSearch = (id) => {
    dispatch(toggleProjectInSearch(id));
  };

  const handleToggleScreenInSearch = (id) => {
    dispatch(toggleScreenInSearch(id));
  };

  const handleToggleComponents = () => {
    dispatch(toggleSearchComponents());
  };

  const handleToggleElements = () => {
    dispatch(toggleSearchElements());
  };

  const handleToggleCurrentScreen = () => {
    dispatch(toggleCurrentScreenOnly());
  };

  const handleToggleImages = () => {
    dispatch(toggleSearchImages());
  };

  const handleToggleText = () => {
    dispatch(toggleSearchText());
  };

  const handleToggleTasks = () => {
    dispatch(toggleSearchTasks());
  };

  const handleToggleDocuments = () => {
    dispatch(toggleSearchDocuments());
  };

  const handleToggleChats = () => {
    dispatch(toggleSearchChats());
  };

  const handleSetSearchMode = (mode) => {
    dispatch(setSearchMode(mode));
  };


  return {
    isScreenSelected,
    handleToggleProjectInSearch,
    handleToggleScreenInSearch,
    handleToggleComponents,
    handleToggleElements,
    handleToggleCurrentScreen,
    handleToggleImages,
    handleToggleText,
    handleToggleTasks,
    handleToggleDocuments,
    handleToggleChats,
    handleSetSearchMode,
  };
};
