import React, { useMemo } from 'react';
import { ResizableWrapper } from '../../../../shared/uiKit/ResizableWrapper';
import { Surface } from '../../../../shared/uiKit/Surface';
import { FilterWorkspaces } from './filters/FilterWorkspaces';
import { FilterProjects } from './filters/FilterProjects';
import { FilterModules } from './filters/FilterModules';
import { FilterActorRoles } from './filters/FilterActorRoles';
import { FilterPeriod } from './filters/FilterPeriod';
import { ActivitySidebar } from './filters/ActivitySidebar';
import { useActivities, ActivityCard } from '@/entities/eventActivity';
import { Scrollbar } from '@/shared/uiKit/Scrollbar';
import { useEntities } from '@/entities/entityStore/model/hooks/useEntities';
import { ENTITY_KINDS } from '@/shared/constants/entityKinds';
import { MultiEntityManagePanel } from '@/features/multiEntityManagePanel';

export const ActivityDetail = () => {

  const { compositeSelectedActivity: activity } = useActivities();

  return (
    <>
      <ActivitySidebar />
      <MultiEntityManagePanel
        entityKind={activity.source.entityKind}
        entityId={activity.source.entityId}
        config={{
          width: '100%',
          anchor: 'none',
        }}
      />
    </>
  );
};
