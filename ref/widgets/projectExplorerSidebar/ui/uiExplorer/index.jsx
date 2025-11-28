import React from 'react';
import { Scrollbar } from '@/shared/uiKit/Scrollbar';
import { useGlobalModes } from '@/entities/mode/editorMode';
import { useScreenMutation } from '@/entities/uiScreen';
import { useDesignMode } from '@/entities/mode/editorMode';
import { StaticPanel } from '@/entities/static';
import { ImporterUILibraryComponents } from '@/features/importUILibraryComponents';

import { TABS, useSidebarExplorer } from '../../model';
import { TokenPanel } from './TokenPanel';
import { LayersAndVariablesPanel } from './LayersAndVariablesPanel';
import { ComponentPanel } from './ComponentPanel';
import { PresetPanel } from './PresetPanel';
import { SidebarTabs } from './SidebarTabs';
import { ScreenPanel } from './ScreenPanel';
import { CustomCodePanel } from './CustomCodePanel';
import { CustomActionPanel } from './CustomActionPanel';

export const UIExplorer = () => {

  const { isCodebaseModeGlobal } = useGlobalModes();
  const { isComponentCanvasInDesignMode } = useDesignMode();
  const { subMode } = useSidebarExplorer();
  const { addScreen } = useScreenMutation();


  const handleAddScreen = () => {
    const newScreen = addScreen();
  };

  return (
    <>
      <SidebarTabs />
      <Scrollbar data-testid="main-content-area">
        {subMode === TABS.PROJECT &&
          <>
            <ScreenPanel />
            <LayersAndVariablesPanel />
          </>
        }
        {subMode === TABS.ASSETS &&
          <>
            <ComponentPanel
              uiComponentImporterSlot={<ImporterUILibraryComponents />}
            // setComponentGrid={setComponentGrid}
            />

            {isComponentCanvasInDesignMode && <LayersAndVariablesPanel />}
            {!isComponentCanvasInDesignMode &&
              <>
                <TokenPanel />
                <PresetPanel />
                <StaticPanel />
              </>
            }
          </>
        }
        {subMode === TABS.CODES &&
          <>
            <CustomCodePanel />
            <CustomActionPanel />
          </>
        }
      </Scrollbar>
    </>

  );
};
