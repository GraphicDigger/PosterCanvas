import { useSelector } from 'react-redux';
import {
  selectAllProjectMembers,
  selectSelectedProjectMember,
} from '../store';

interface Props {
    id?: string;
    ids?: string[];
}

export const useProjectMemberSelectors = ( { id, ids }: Props = {} ) => {

  const allProjectMembers = useSelector(selectAllProjectMembers);
  const selectedProjectMember = useSelector(selectSelectedProjectMember);

  return {
    allProjectMembers,
    selectedProjectMember,
  };
};

