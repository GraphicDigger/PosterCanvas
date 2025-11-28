// useTask.ts
import { useTaskContext } from '../context/TaskContext';
import { useTaskSelectors } from './useTaskSelectors';
import { useTaskQueries } from './useQueries';
import { useUIStates } from './useUIStates';
import { useTaskMutation } from './useTaskMutation';

export interface Props {
  id?: string;
  ids?: string[];
  userId?: string;
  workspaceId?: string;
}

type Task = ReturnType<typeof useTaskSelectors> &
  ReturnType<typeof useTaskQueries> &
  ReturnType<typeof useUIStates> &
  ReturnType<typeof useTaskMutation>;

type Plugin<T = {}> = (context: ReturnType<typeof useTaskContext> & Props) => T;

export const useTask = (
  props: Props,
  plugins: Plugin[] = [
    useTaskSelectors,
    useTaskQueries,
    useUIStates,
    useTaskMutation,
  ],
): Task => {
  const context = { ...useTaskContext(), ...props }; // props в context

  return plugins.reduce(
    (acc, plugin) => ({ ...acc, ...plugin(acc) }), // передаём весь аккумулятор
    context,
  ) as Task;
};

export { useTaskQueries, useTaskSelectors };
