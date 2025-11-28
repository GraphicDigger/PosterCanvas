import { useSelector } from 'react-redux';
import {
  selectAllProjects,
  selectSelectedProject,
  selectCurrentDatabaseType,
  makeSelectProjectsByIds,
  makeSelectProjectById,
  makeSelectProjectsByWorkspaceId,
  makeSelectProjectsByUserIdWorkspaceId,
} from '../store';
import { useWorkspaces } from '../../../workspace';
import { useUser } from '../../../actorUser';


interface Props {
    id?: string;
    ids?: string[];
}

export const useProjects = ({ ids, id }: Props = {}) => {

  const { selectedWorkspace } = useWorkspaces();
  const { selectedUser } = useUser();

  const allProjects = useSelector(selectAllProjects);
  const selectedProject = useSelector(selectSelectedProject);
  const currentDatabaseType = useSelector(selectCurrentDatabaseType);

  const projectsBySelectedWorkspace = useSelector(makeSelectProjectsByWorkspaceId(selectedWorkspace?.id ?? ''));
  const projectsBySelectedUserAndWorkspace = useSelector(makeSelectProjectsByUserIdWorkspaceId(selectedUser?.id ?? '', selectedWorkspace?.id ?? ''));

  const projectsByIds = useSelector(makeSelectProjectsByIds(ids ?? []));
  const projectById = id ? useSelector(makeSelectProjectById(id)) : undefined;

  return {
    allProjects,
    selectedProject,
    currentDatabaseType,

    projectsByIds,
    projectById,
    projectsBySelectedWorkspace,
    projectsBySelectedUserAndWorkspace,
  };
};
