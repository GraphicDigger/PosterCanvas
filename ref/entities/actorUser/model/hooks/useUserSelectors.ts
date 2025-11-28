import { useSelector } from 'react-redux';
import {
  selectAllUsers,
  selectSelectedUser,
  makeSelectUsersByIds,
  makeSelectUserById,
  makeSelectCompositeUserById,
} from '../store';


interface Props {
    id?: string;
    ids?: string[];
}

export const useUserSelectors = ({ id, ids }: Props = {}) => {

  const allUsers = useSelector(selectAllUsers);
  const selectedUser = useSelector(selectSelectedUser);
  const usersByIds = useSelector(makeSelectUsersByIds(ids ?? []));
  const userById = id ? useSelector(makeSelectUserById(id)) : undefined;
  const compositeSelectedUser = selectedUser ? useSelector(makeSelectCompositeUserById(selectedUser.id)) : undefined;

  return {
    allUsers,
    selectedUser,
    usersByIds,
    userById,
    compositeSelectedUser,
  };
};

