import { useSelector } from 'react-redux';
import {
  selectAllMembers,
  selectSelectedMember,
  selectMembersByIds,
} from '../store/selectors';


export const useMembers = () => {

  const allMembers = useSelector(selectAllMembers);
  const selectedMember = useSelector(selectSelectedMember);

  return {
    allMembers,
    selectedMember,
  };
};

export const useMembersByIds = (ids) => {
  const members = useSelector(state => selectMembersByIds(state, ids));

  return {
    members,
  };
};

