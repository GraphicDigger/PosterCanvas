import React, { useEffect, useMemo } from 'react';
import { SectionPanel, SectionPanelHeader, SectionPanelName, SectionPanelBody } from '@/shared/uiKit/SectionPanel';
import { ButtonTool } from '@/shared/uiKit/ButtonTool';
import { PlusIcon, ArrowWithLegLeftIcon } from '@/shared/assets/icons';
import { Button } from '@/shared/uiKit/Button';
import { useActivities, useActivityStates, ActivityCard } from '@/entities/eventActivity';
import { SlotBar, LeftSlot, RightSlot } from '@/shared/uiKit/SlotBar';
import { Stack } from '@/shared/uiKit/Stack';
import { Scrollbar } from '@/shared/uiKit/Scrollbar';
import { Surface } from '@/shared/uiKit/Surface';
import { ResizableWrapper } from '@/shared/uiKit/ResizableWrapper';
import { Divider } from '@/shared/uiKit/Divider';
import { Typography } from '@/shared/uiKit/Typography';
import { ActivityList } from '@/entities/eventActivity';
import { useActivityManager } from '../model';
import { FilterWorkspaces } from './components/FilterWorkspaces';
import { FilterProjects } from './components/FilterProjects';
import { FilterModules } from './components/FilterModules';
import { FilterActorRoles } from './components/FilterActorRoles';

export const EventActivitySidebar = ({ activity }) => {

  const { activities } = useActivityManager();
  const minWidth = useMemo(() => activity ? 400 : 280, [activity]);
  const initialWidth = useMemo(() => activity ? 400 : 280, [activity]);

  return (
    <ResizableWrapper
      minWidth={minWidth}
      initialWidth={initialWidth}
      side="right"
    >
      <Surface>
        {activity ? <Activities activities={activities} /> : <Filter />}
        <Divider orientation='vertical' right top />
      </Surface>
    </ResizableWrapper>
  );
};

const Activities = ({ activities }) => {
  const { handleReset } = useActivityStates();

  return (
    <>
      <SlotBar divider>
        <LeftSlot padding={0}>
          <Button
            size='small'
            color='default'
            startIcon={<ArrowWithLegLeftIcon />}
            onClick={handleReset}
          > Filter
          </Button>
        </LeftSlot>
      </SlotBar>
      <Scrollbar>
        <ActivityList size='small' compact />
      </Scrollbar>
    </>
  );
};

const Filter = () => {
  return (
    <>
      <SlotBar divider>
        <LeftSlot padding={2}>
          <Typography variant='heading.xsmall'>
                        Filter
          </Typography>
        </LeftSlot>
      </SlotBar>
      <Scrollbar>
        <Surface>
          {/* <FilterPeriod /> */}
          <FilterWorkspaces />
          <FilterProjects />
          <FilterModules />
          <FilterActorRoles />
        </Surface>
      </Scrollbar>
    </>
  );
};

