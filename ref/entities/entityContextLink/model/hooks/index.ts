import { useContextLinkContext, ContextLinkProvider } from '../context/ContextLinkContext';
import { useContextLinkSelectors } from './useContextLinkSelectors';
import { useContextLinkQueries } from './useQueries';
import { useContextMutation } from './useContextMutation';
import { useUIStates } from './useUIStates';

type ContextLink = ReturnType<typeof useContextLinkSelectors> &
                 ReturnType<typeof useContextLinkQueries> &
                 ReturnType<typeof useUIStates> &
                 ReturnType<typeof useContextMutation>

type Plugin<T = {}> = (context: ReturnType<typeof useContextLinkContext>) => T;

export const useContextLink = (plugins: Plugin[] = [
  useContextLinkSelectors,
  useContextLinkQueries,
  useContextMutation,
  useUIStates,
  //external

]): ContextLink => {

  const context = useContextLinkContext();

  return plugins.reduce(
    (acc, plugin) => ({ ...acc, ...plugin(context) }),
    { ...context },
  ) as ContextLink;
};

export {
  useContextLinkQueries,
  ContextLinkProvider,
};
