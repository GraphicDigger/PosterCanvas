import { useDefaultElementsContext, DefaultElementsProvider } from '../context/DefaultElementsContext';
import { useDefaultElementsSelectors } from './useDefaultElementsSelectors';
import { useDefaultElementsQueries } from './useQueries';
import { useUIStates } from './useUIStates';

type UiDefaultUnit = ReturnType<typeof useDefaultElementsSelectors> &
                 ReturnType<typeof useDefaultElementsQueries> &
                 ReturnType<typeof useUIStates>

type Plugin<T = {}> = (context: ReturnType<typeof useDefaultElementsContext>) => T;

export const useDefaultElements = (plugins: Plugin[] = [
  useDefaultElementsSelectors,
  useDefaultElementsQueries,
  useUIStates,
  //external

]): UiDefaultUnit => {

  const context = useDefaultElementsContext();

  return plugins.reduce(
    (acc, plugin) => ({ ...acc, ...plugin(context) }),
    { ...context },
  ) as UiDefaultUnit;
};

export {
  useDefaultElementsQueries,
  DefaultElementsProvider,
};
