import { useTaskAssigneeContext, TaskAssigneeProvider } from '../context/TaskAssigneeContext';
import { useTaskAssigneeSelectors } from './useTaskAssigneeSelectors';
import { useTaskAssigneeQueries } from './useQueries';
import { useUIStates } from './useUIStates';

type TaskAssignee = ReturnType<typeof useTaskAssigneeSelectors> &
                 ReturnType<typeof useTaskAssigneeQueries> &
                 ReturnType<typeof useUIStates>

type Plugin<T = {}> = (context: ReturnType<typeof useTaskAssigneeContext>) => T;

export const useTaskAssignee = (plugins: Plugin[] = [
  useTaskAssigneeSelectors,
  useTaskAssigneeQueries,
  useUIStates,
  //external

]): TaskAssignee => {

  const context = useTaskAssigneeContext();

  return plugins.reduce(
    (acc, plugin) => ({ ...acc, ...plugin(context) }),
    { ...context },
  ) as TaskAssignee;
};

export {
  useTaskAssigneeQueries,
  TaskAssigneeProvider,
};
