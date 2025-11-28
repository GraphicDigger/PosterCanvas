/** @jsxImportSource @emotion/react */
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Surface } from '../../../shared/uiKit/Surface';
import { ResizableWrapper } from '../../../shared/uiKit/ResizableWrapper';

import { TestDrive } from '../../../features/customCodeTestDrive';
import { Arguments } from '../../../features/customCodeSetArguments';
import { AiAssistant } from '../../aiAssistant';
import { CodeSidebarTabs } from './CodeSidebarTabs';
import { TABS, setCodeType, selectCodeSidebar } from '../model';


export const CodeSidebar = ({ code }) => {

  const dispatch = useDispatch();
  useEffect(() => {
    if (code?.type) {
      dispatch(setCodeType(code.type));
    }
  }, [code?.type, dispatch]);

  const { selectedTab } = useSelector(selectCodeSidebar);

  return (
    <ResizableWrapper side='left'>
      <Surface>
        <CodeSidebarTabs />
        {selectedTab === TABS.TEST_DRIVE && <TestDrive />}
        {selectedTab === TABS.ARGUMENTS && <Arguments />}
        {selectedTab === TABS.AI_ASSISTANT && <AiAssistant />}
      </Surface>
    </ResizableWrapper >
  );
};
