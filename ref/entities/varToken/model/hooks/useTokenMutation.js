import { v4 as uuidv4 } from 'uuid';
import { useDispatch } from 'react-redux';
import { removeTokensFromCollection } from '../store';
import { addToken, updateToken, removeToken } from '../store';

export const useTokenMutation = () => {
  const dispatch = useDispatch();

  const handleAddToken = (token) => {
    dispatch(addToken(token));
  };

  const handleUpdateToken = (token) => {
    dispatch(updateToken(token));
  };

  const handleRemoveToken = (id) => {
    dispatch(removeToken(id));
  };

  const handleRemoveTokensFromCollection = (collectionId) => {
    dispatch(removeTokensFromCollection(collectionId));
  };
  return {
    addToken: handleAddToken,
    updateToken: handleUpdateToken,
    removeToken: handleRemoveToken,
    removeTokensFromCollection: handleRemoveTokensFromCollection,
  };
};
