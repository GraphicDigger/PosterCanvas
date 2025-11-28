import { useSelector } from 'react-redux';
import {
  selectAllMembers,
  selectSelectedMember,
  makeSelectMembersByIds,
  makeSelectMemberById,
  makeSelectCompositeMemberById,
} from '../store';


interface Props {
    id?: string;
    ids?: string[];
}

export const useMembers = ( { id, ids }: Props = {} ) => {

  const allMembers = useSelector(selectAllMembers);
  const selectedMember = useSelector(selectSelectedMember);
  const membersByIds = useSelector(makeSelectMembersByIds(ids ?? []));
  const memberById = id ? useSelector(makeSelectMemberById(id)) : undefined;
  const compositeSelectedMember = selectedMember ? useSelector(makeSelectCompositeMemberById(selectedMember.id)) : undefined;

  return {
    allMembers,
    selectedMember,
    membersByIds,
    memberById,
    compositeSelectedMember,
  };
};
