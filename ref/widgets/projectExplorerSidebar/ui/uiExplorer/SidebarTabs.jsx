/** @jsxImportSource @emotion/react */
import React, { useEffect } from 'react';
import { useTheme, css } from '@emotion/react';
import { useDispatch } from 'react-redux';
import { Divider } from '../../../../shared/uiKit/Divider';
import { Tabs } from '../../../../shared/uiKit/Tabs';
import { useDesignMode } from '../../../../entities/mode/editorMode';
import { TABS } from '../../model';
import { useSidebarExplorer } from '../../model';


export const SidebarTabs = () => {

  const dispatch = useDispatch();
  const theme = useTheme();
  const { resetDesignModesToInitialState } = useDesignMode();
  const { subMode, subModes, setSubMode } = useSidebarExplorer();

  const handleSubModeChange = (label) => {
    setSubMode(label);
  };

  useEffect(() => {
    if (subMode !== TABS.ASSETS) {
      resetDesignModesToInitialState();
    }
  }, [subMode]);

  return (
    <>
      <div css={css({ height: '40px', position: 'relative' })}>
        <Tabs
          tabs={subModes}
          selectedTab={subMode}
          onChange={handleSubModeChange}
          padding={16}
        />
        <Divider bottom left color={theme.sys.color.outline.light1} />
      </div>
    </>
  );
};
