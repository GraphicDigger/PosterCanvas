import React, { memo } from 'react';
import { WindowPopover, WindowTrigger, Window, WindowHead, WindowBody } from '../../../shared/uiKit/Window';
import { ButtonTool, ButtonToolToggle } from '../../../shared/uiKit/ButtonTool';
import { SettingsIcon } from '../../../shared/assets/icons';

import { SEARCH_AREA } from '../model';
import { SearchArea } from './searchArea';
import { useSearchStates, useSearchFilters } from '../model';


export const GlobalSearchSettings = memo(() => {

  const { searchMode } = useSearchFilters();
  const { handleSetSearchMode } = useSearchStates();


  return (
    <WindowPopover placement='right-start' offset={16} closeOnSelect={false} >
      <WindowTrigger>
        <ButtonTool>
          <SettingsIcon />
        </ButtonTool>
      </WindowTrigger>
      <Window width={240}>
        <WindowHead padding={8}>
          <ButtonToolToggle
            value={searchMode}
            onChange={handleSetSearchMode}
            width='100%'
            content="text"
            variant="secondary"
            size="small"
          >
            <ButtonTool width='100%' value={SEARCH_AREA.PROJECT}> Project </ButtonTool>
            <ButtonTool width='100%' value={SEARCH_AREA.WORKSPACE}> Workspace </ButtonTool>
          </ButtonToolToggle>
        </WindowHead>
        <WindowBody padding={2}>
          <SearchArea />
        </WindowBody>
      </Window>
    </WindowPopover>
  );
});

