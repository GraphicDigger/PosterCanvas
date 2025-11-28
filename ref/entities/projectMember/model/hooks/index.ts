import { useProjectMemberContext, ProjectMemberProvider } from '../context/ProjectMemberContext';
import { useProjectMemberSelectors } from './useProjectMemberSelectors';
import { useProjectMemberQueries } from './useQueries';
import { useUIStates } from './useUIStates';

type ProjectMember = ReturnType<typeof useProjectMemberSelectors> &
                 ReturnType<typeof useProjectMemberQueries> &
                 ReturnType<typeof useUIStates>

type Plugin<T = {}> = (context: ReturnType<typeof useProjectMemberContext>) => T;

export const useProjectMember = (plugins: Plugin[] = [
  useProjectMemberSelectors,
  useProjectMemberQueries,
  useUIStates,
  //external

]): ProjectMember => {

  const context = useProjectMemberContext();

  return plugins.reduce(
    (acc, plugin) => ({ ...acc, ...plugin(context) }),
    { ...context },
  ) as ProjectMember;
};

export {
  useProjectMemberQueries,
  ProjectMemberProvider,
};
