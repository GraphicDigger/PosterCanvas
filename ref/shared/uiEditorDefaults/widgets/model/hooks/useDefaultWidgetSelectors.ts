import { useSelector } from 'react-redux';
import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '@/app/store';
import {
  selectAllDefaultWidgets,
  selectSelectedDefaultWidget,
  selectDefaultWidgetById,
  selectDefaultWidgetByIds,
} from '../store';

interface Props {
  tag?: string;
}


export const useDefaultWidgetSelectors = ({ tag }: Props = {}) => {

  const allDefaultWidgets = useSelector(selectAllDefaultWidgets);
  const selectedDefaultWidget = useSelector(selectSelectedDefaultWidget);
  const getDefaultWidgetById = useSelector(selectDefaultWidgetByIdFn);
  const getDefaultWidgetByIds = useSelector(selectDefaultWidgetByIdsFn);

  return {
    allDefaultWidgets,
    selectedDefaultWidget,
    getDefaultWidgetById,
    getDefaultWidgetByIds,
  };
};

const selectDefaultWidgetByIdsFn = createSelector(
  [(state: RootState) => state],
  (state) => (id: string) => selectDefaultWidgetByIds(state, id),
);

const selectDefaultWidgetByIdFn = createSelector(
  [(state: RootState) => state],
  (state) => (id: string) => selectDefaultWidgetById(state, id),
);

const selectFlattenWidgetWithChildrenFn = createSelector(
  [(state: RootState) => state],
  (state) => (id: string) => selectFlattenWidgetWithChildren(state, id),
);

const selectFlattenElementWithChildrenFn = createSelector(
  [(state: RootState) => state],
  (state) => (id: string) => selectFlattenWidgetWithChildren(state, id),
);

