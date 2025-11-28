import { useState, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { chatApi } from '../../api/chat.api';
import { setChats } from '../store';

export const useChatQueries = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null | undefined>(undefined);

  const fetchChats = useCallback(async () => {
    if (loading) {return;}
    try {
      setLoading(true);
      const chats = await chatApi.getChats();
      dispatch(setChats(chats || []));
    } catch (error) {
      setError(error as Error);
    } finally {
      setLoading(false);
    }
  }, [dispatch, loading]);

  return {
    loading,
    error,
    fetchChats,
  };
};
