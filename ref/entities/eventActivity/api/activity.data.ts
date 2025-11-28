import type { Activity } from '@/shared/services/eventActivity';
import { documents } from './data/documents';
import { tasks } from './data/tasks';
import { components } from './data/components';

export const activities: Activity[] = [
  ...documents,
  ...tasks,
  ...components,
];
