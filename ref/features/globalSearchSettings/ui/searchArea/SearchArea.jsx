import React, { memo } from 'react';
import { SEARCH_AREA } from '../../model/constants/searchArea';
import { SearchByProject } from './projects';
import { SearchByWorkspace } from './workspace';
import { useSearchFilters } from '../../model/hooks/useSearchFilters';

export const SearchArea = memo(() => {

  const { isProjectMode } = useSearchFilters();

  return (
    <>
      {isProjectMode
        ? <SearchByProject />
        : <SearchByWorkspace />
      }
    </>
  );
});

