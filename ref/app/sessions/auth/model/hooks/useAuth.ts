import { useSelector } from 'react-redux';
import { selectIsAuthenticated } from '../store/selectors';
import { selectCurrentUser, selectCurrentWorkspace, selectCurrentMember } from '../store';

export const useAuth = () => {

  const isAuthenticated = useSelector(selectIsAuthenticated);
  const currentUser = useSelector(selectCurrentUser);
  const currentWorkspace = useSelector(selectCurrentWorkspace);
  const currentMember = useSelector(selectCurrentMember);

  return {
    isAuthenticated,
    currentUser,
    currentWorkspace,
    currentMember,
  };
};
