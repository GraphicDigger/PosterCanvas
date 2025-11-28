import { useUserContext, UserProvider } from '../context/UserContext';
import { useUserSelectors } from './useUserSelectors';
import { useUserQueries } from './useQueries';
import { useUIStates } from './useUIStates';

type User = ReturnType<typeof useUserSelectors> &
                 ReturnType<typeof useUserQueries> &
                 ReturnType<typeof useUIStates>

type Plugin<T = {}> = (context: ReturnType<typeof useUserContext>) => T;

export const useUser = (plugins: Plugin[] = [
  useUserSelectors,
  useUserQueries,
  useUIStates,
  //external

]): User => {

  const context = useUserContext();

  return plugins.reduce(
    (acc, plugin) => ({ ...acc, ...plugin(context) }),
    { ...context },
  ) as User;
};

export {
  useUserQueries,
  UserProvider,
};
