import { useDefaultWidgetsContext } from '../context/DefaultWidgetsContext';
import { useDefaultWidgetSelectors } from './useDefaultWidgetSelectors';
import { useDefaultWidgetsQueries } from './useQueries';
import { useUIStates } from './useUIStates';

type UiDefaultUnit = ReturnType<typeof useDefaultWidgetSelectors> &
                 ReturnType<typeof useDefaultWidgetsQueries> &
                 ReturnType<typeof useUIStates>

type Plugin<T = {}> = (context: ReturnType<typeof useDefaultWidgetsContext>) => T;

export const useDefaultWidgets = (plugins: Plugin[] = [
  useDefaultWidgetSelectors,
  useDefaultWidgetsQueries,
  useUIStates,
  //external

]): UiDefaultUnit => {

  const context = useDefaultWidgetsContext();

  return plugins.reduce(
    (acc, plugin) => ({ ...acc, ...plugin(context) }),
    { ...context },
  ) as UiDefaultUnit;
};

export {
  useDefaultWidgetsQueries,
};
