import { useSelector, useDispatch } from 'react-redux';
import {
  selectVM,
  selectIsReady,
  selectIsError,
  selectErrorMessage,
  selectProjectId,
  selectContainerId,
} from '../store/initialStackBlitz';
import {
  setVM,
  setIsReady,
  setError,
  clearError,
  setProjectId,
  resetStackBlitzState,
} from '../store/slice';

export const useStackBlitzState = () => {
  const dispatch = useDispatch();

  const vm = useSelector(selectVM);
  const isReady = useSelector(selectIsReady);
  const isError = useSelector(selectIsError);
  const errorMessage = useSelector(selectErrorMessage);
  const projectId = useSelector(selectProjectId);
  const containerId = useSelector(selectContainerId);

  const handleSetVM = (vm) => dispatch(setVM(vm));
  const handleSetIsReady = (isReady) => dispatch(setIsReady(isReady));
  const handleSetError = (errorMessage) => dispatch(setError(errorMessage));
  const handleClearError = () => dispatch(clearError());
  const handleSetProjectId = (projectId) => dispatch(setProjectId(projectId));
  const handleResetStackBlitzState = () => dispatch(resetStackBlitzState());

  return {
    vm,
    isReady,
    isError,
    errorMessage,
    projectId,
    containerId,
    hasVM: !!vm,
    hasError: isError && !!errorMessage,
    setVM: handleSetVM,
    setIsReady: handleSetIsReady,
    setError: handleSetError,
    clearError: handleClearError,
    setProjectId: handleSetProjectId,
    resetStackBlitzState: handleResetStackBlitzState,
  };
};
