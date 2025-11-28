import { v4 as uuidv4 } from 'uuid';
import { ENTITY_KINDS } from '../../../../shared/constants';
import { useSelector, useDispatch } from 'react-redux';
import { addScreen, selectSelectedScreen, selectAllScreens, selectCompositeSelectedScreen, selectSelectedScreenId } from '../store';
import { selectAllScreensWithContext, selectSelectedScreenWithContext } from '../store/selector';
import { selectCompositeEntitiesByOwnership } from '../../@x/uiTree';
import { useMemo } from 'react';


export const useScreens = () => {

  const allScreens = useSelector(selectAllScreens);
  const selectedScreenId = useSelector(selectSelectedScreenId);
  const baseSelectedScreen = useSelector(selectSelectedScreen);

  // Use memoized parameterized selector to prevent instability
  const selectedScreenEntities = useMemo(() => {
    if (!baseSelectedScreen) {return [];}
    return selectCompositeEntitiesByOwnership;
  }, [baseSelectedScreen?.id]);

  const selectedScreenEntitiesData = useSelector(useMemo(() => {
    if (!baseSelectedScreen) {return () => [];}
    return (state) => selectedScreenEntities(state, ENTITY_KINDS.SCREEN, baseSelectedScreen.id);
  }, [baseSelectedScreen?.id]));

  const selectedScreen = baseSelectedScreen ? {
    ...baseSelectedScreen,
    childrens: selectedScreenEntitiesData,
  } : null;

  const allScreensWithContext = useSelector(selectAllScreensWithContext);
  const selectedScreenWithContext = useSelector(selectSelectedScreenWithContext);

  return {
    allScreens,
    allScreensWithContext,
    selectedScreen,
    selectedScreenWithContext,
    selectedScreenId,
  };
};

export const useScreenMutation = () => {
  const dispatch = useDispatch();

  const handleAddScreen = () => {
    const screenId = uuidv4();
    dispatch(addScreen({ id: screenId }));
  };

  return {
    addScreen: handleAddScreen,
  };
};

