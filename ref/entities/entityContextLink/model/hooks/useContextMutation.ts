import { v4 as uuidv4 } from 'uuid';
import { useDispatch } from 'react-redux';
import { addContextLink } from '../store';
import { ContextLink } from '../../types';

export const useContextMutation = () => {
  const dispatch = useDispatch();

  const handleAddContextLink = (contextLink: ContextLink) => {

    const newContextLink = {
      ...contextLink,
      id: uuidv4(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    dispatch(addContextLink(newContextLink));
  };

  return {
    addContextLink: handleAddContextLink,
  };
};
