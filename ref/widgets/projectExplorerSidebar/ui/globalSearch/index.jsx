/** @jsxImportSource @emotion/react */
import React, { useState } from 'react';
import styled from '@emotion/styled';
import { Scrollbar } from '@/shared/uiKit/Scrollbar';
import { Stack } from '@/shared/uiKit/Stack';
import { SearchArea } from './components/SearchArea';
import { SearchResult } from './components/SearchResult';
import { useSearchFilters } from '@/features/globalSearchSettings/model';
import { SectionPanel, SectionPanelHeader } from '@/shared/uiKit/SectionPanel';
import { SearchInput } from '@/shared/uiKit/SearchInput';
import { GlobalSearchSettings } from '@/features/globalSearchSettings';
import { ProjectResult } from './ProjectResult';
import { WorkspaceResult } from './WorkspaceResult';


export const GlobalSearch = () => {

  const { isProjectMode, isWorkspaceMode } = useSearchFilters();

  const [value, setValue] = useState('');

  const handleSubmit = (text) => {
    if (text.trim()) {
      console.log('Search query:', text);
      setValue('');
    }
  };

  return (
    <Stack direction='column' align='start'>
      <SectionPanel dividerBottom >
        <SectionPanelHeader>
          <SearchInput
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onSubmit={handleSubmit}
            endSlot={<GlobalSearchSettings />}
          />
        </SectionPanelHeader>
      </SectionPanel>
      <Scrollbar>
        {isProjectMode && <ProjectResult />}
        {isWorkspaceMode && <WorkspaceResult />}
      </Scrollbar>
    </Stack>
  );

};
