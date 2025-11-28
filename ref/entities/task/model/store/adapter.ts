import type { RootState } from '@/app/store';

import {
  makeSelectTaskById,
  selectSelectedTask,
  setSelectedTaskId,
  resetSelectedTask,
} from '../store';

export const taskAdapter: Record<string, unknown> = {
  getById: (state: RootState, id: string) => makeSelectTaskById(id)(state),
  getSelected: (state: RootState) => selectSelectedTask(state),
  select: setSelectedTaskId,
  resetSelected: resetSelectedTask,
};
