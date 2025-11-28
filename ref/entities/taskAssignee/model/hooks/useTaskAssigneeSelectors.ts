import { useSelector } from 'react-redux';
import {
  selectAllTaskAssignees,
  selectSelectedTaskAssignee,
  makeSelectTaskAssigneesByIds,
  makeSelectTaskAssigneeById,
} from '../store';

interface Props {
    id?: string;
    ids?: string[];
}

export const useTaskAssigneeSelectors = ({ id, ids }: Props = {}) => {

  const allTaskAssignees = useSelector(selectAllTaskAssignees);
  const selectedTaskAssignee = useSelector(selectSelectedTaskAssignee);
  const TaskAssigneesByIds = useSelector(makeSelectTaskAssigneesByIds(ids ?? []));
  const TaskAssigneeById = id ? useSelector(makeSelectTaskAssigneeById(id)) : undefined;

  return {
    allTaskAssignees,
    selectedTaskAssignee,

    TaskAssigneesByIds,
    TaskAssigneeById,

  };
};
