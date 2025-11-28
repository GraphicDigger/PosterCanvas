import { useSelector } from 'react-redux';
import {
  selectAllUserspaces,
  selectSelectedUserspace,
  selectUserspacesByIds,
} from '../store';


export const useUserspaces = () => {

  const allUserspaces = useSelector(selectAllUserspaces);
  const selectedUserspace = useSelector(selectSelectedUserspace);

  return {
    allUserspaces,
    selectedUserspace,
  };
};

export const useUserspacesByIds = (ids) => {
  const Userspaces = useSelector(state => selectUserspacesByIds(state, ids));

  return {
    Userspaces,
  };
};

