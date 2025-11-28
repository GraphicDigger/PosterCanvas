import { useSelector } from 'react-redux';
import {
  selectAllTasks,
  selectSelectedTask,
  makeSelectTaskById,
  makeSelectTaskByIds,
  makeSelectMemberTasksByUserIdWorkspaceId,
} from '../store';
import { useUser } from '../../../actorUser';
import { useWorkspaces } from '../../../workspace';


interface Props {
    id?: string;
    ids?: string[];
    userId?: string;
    workspaceId?: string;
}

export const useTaskSelectors = ({
  id,
  ids,
  userId,
  workspaceId,
}: Props = {}) => {

  const allTasks = useSelector(selectAllTasks);
  const selectedTask = useSelector(selectSelectedTask);
  const { selectedUser } = useUser();
  const { selectedWorkspace } = useWorkspaces();

  const taskById = id ? useSelector(makeSelectTaskById(id)) : undefined;
  const taskByIds = useSelector(makeSelectTaskByIds(ids ?? []));
  const memberTasks = useSelector(makeSelectMemberTasksByUserIdWorkspaceId(userId ?? '', workspaceId ?? ''));

  return {
    allTasks,
    selectedTask,
    taskById,
    taskByIds,
    memberTasks,
  };
};

