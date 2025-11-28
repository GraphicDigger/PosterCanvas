import { useState, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { mockScreens } from '../../api/mockScreens.data';
import { addScreen, useScreenStates } from '../../../../entities/uiScreen';

// Хук для загрузки моковых данных экранов
export const useCreateMockScreens = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isCreated, setIsCreated] = useState(false);
  const { handleSelect } = useScreenStates();

  const createMockScreens = useCallback(async () => {
    if (loading || isCreated) {return;}

    try {
      setLoading(true);

      mockScreens.forEach(screen => {
        dispatch(addScreen({ id: screen.id, name: screen.name }));
      });
      handleSelect(mockScreens[0].id);
      setIsCreated(true);

    } catch (err) {
      setError(err);
      console.error('Error creating mock screens:', err);
    } finally {
      setLoading(false);
    }
  }, [dispatch, loading, isCreated]);

  return {
    createMockScreens,
    loading,
    error,
    isCreated,
  };
};
