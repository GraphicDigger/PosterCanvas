import type { Element } from '@/entities/uiElement/types';

export type { Element } from '@/entities/uiElement/types';
export type ElementWithChildren = Element & { childrens?: ElementWithChildren[] };
export type FlatElementList = Element[];