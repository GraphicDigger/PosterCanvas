import React from 'react';
import { useTheme } from '@emotion/react';
import { Link } from 'react-router-dom';
import styled from '@emotion/styled';
import avatarImage from '../../../shared/assets/dummy/avatar.png';
import { ThemeProvider } from '../../../app/providers';
import { ResizableWrapper } from '../../../shared/uiKit/ResizableWrapper';
import { useGlobalModes } from '../../../entities/mode/editorMode';
import { Surface } from '../../../shared/uiKit/Surface';
import { Divider } from '../../../shared/uiKit/Divider';
import { Avatar } from '../../../shared/uiKit/Avatar';
import { SIDEBAR_CONTENT } from '../../../widgets/projectExplorerSidebar/model';
import { GLOBAL_MODES, DESIGN_MODES } from '../../../entities/mode/editorMode';
import { Stack } from '../../../shared/uiKit/Stack';
import { ButtonTool } from '../../../shared/uiKit/ButtonTool';
import { CommentIcon, LibraryIcon } from '../../../shared/assets/icons';
import { lineColors } from '../../../shared/styles';
import { useFeatureEnabled } from '../model/hooks/useFeatureEnabled';
import { useAuth } from '@/app/sessions/auth';


export const FeatureNavigation = ({
  children,
  header = true,
  footer = true,
}) => {

  const theme = useTheme();
  const { currentMember } = useAuth();
  const { isCodebaseModeGlobal } = useGlobalModes();

  return (
    <ThemeProvider forceDark={isCodebaseModeGlobal}>
      <ResizableWrapper >
        <Surface>
          {header &&
            <Stack
              direction='row'
              height='fit'
              justify='space-between'
              paddingLeft='12px'
              paddingRight='16px'
              paddingTop='12px'
              paddingBottom='12px'
              className='project-sidebar-header'
            >
              <Link to="/dashboard"><Avatar src={currentMember?.avatar} /></Link>
              <FeatureEnabledButton feature={SIDEBAR_CONTENT.GLOBAL_SEARCH} />
              <FeatureEnabledButton feature={GLOBAL_MODES.PREVIEW} />
              <FeatureEnabledButton feature={GLOBAL_MODES.CODEBASE} />
              <FeatureEnabledButton feature={SIDEBAR_CONTENT.SETTINGS} />
            </Stack>
          }

          {children}

          {footer &&
            <StyledFooter backgroundColor={theme.sys.color.surface}>
              <FeatureEnabledButton feature={GLOBAL_MODES.IMPORTER} />
              <FeatureEnabledButton feature='Library' />
              <FeatureEnabledButton feature={GLOBAL_MODES.WIREFRAME} />
              <FeatureEnabledButton feature={GLOBAL_MODES.DATABASE} /> {/* open Codebase button */}
              <FeatureEnabledButton feature={DESIGN_MODES.COMMENTS} />
              <Divider top left color={theme.sys.color.outline.default} />
            </StyledFooter>
          }
        </Surface>
        <Divider orientation="vertical" top right />
      </ResizableWrapper>
    </ThemeProvider>

  );
};

export const FeatureEnabledButton = ({ feature }) => {

  const { handleClick, getIcon, isSelected, component } = useFeatureEnabled(feature);
  const buttonComponent = component();
  if (buttonComponent) { return buttonComponent; }

  return (
    <ButtonTool
      onClick={handleClick}
      isSelected={isSelected()}
    >
      {getIcon()}
    </ButtonTool>
  );
};

const StyledFooter = styled.div`
    position: absolute;
    background-color: ${({ backgroundColor }) => backgroundColor};
    display: flex;
    justify-content: space-between;
    align-items: center;
    bottom: 0;
    right: 0;
    left: 0;
    padding: 12px 16px;
    width: 100%;
`;
