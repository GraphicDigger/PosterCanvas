import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import {
  selectAllWorkspaces,
  selectSelectedWorkspace,
  selectWorkspacesByIds,
  makeSelectWorkspacesByUserId,
} from '../store';
import { useUserspaces } from '../../../userspace';
import { selectSelectedUserId } from '../../../actorUser';

export const useWorkspaces = () => {

  const selectedWorkspace = useSelector(selectSelectedWorkspace);
  const allWorkspaces = useSelector(selectAllWorkspaces);
  const selectedUserId = useSelector(selectSelectedUserId);
  const selectedUserWorkspaces = useSelector(makeSelectWorkspacesByUserId(selectedUserId));

  return {
    allWorkspaces,
    selectedWorkspace,
    selectedUserWorkspaces,
  };
};

export const useWorkspacesByIds = (ids) => {
  const Workspaces = useSelector(state => selectWorkspacesByIds(state, ids));

  return {
    Workspaces,
  };
};

