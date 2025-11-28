/** @jsxImportSource @emotion/react */
import React from 'react';
import styled from '@emotion/styled';
import { useTheme } from '@emotion/react';
import { useDesignMode, useGlobalModes } from '../../../../entities/mode/editorMode';
import { CustomCode, ScreenCode } from '../codes';
import { ComponentCode } from '../../../../features/componentCodeGenerate';
import { useCodeEditor } from '../../model';
import { useProps } from '../../../../entities/prop/model';


export const CodeArea = () => {
  const theme = useTheme();

  const { isComponentCanvasInDesignMode, isScreenCanvasInDesignMode, isCodeInDesignMode } = useDesignMode();
  const { isCodebaseModeGlobal } = useGlobalModes();
  const { activeCode } = useCodeEditor();
  const { selectedComponentProps } = useProps();

  return (
    <StyledCodeContainer textStyle={theme.sys.typography.color.primary}>

      {isComponentCanvasInDesignMode && isCodeInDesignMode &&
                <ComponentCode code={activeCode} props={selectedComponentProps} />
      }
      {isScreenCanvasInDesignMode && isCodeInDesignMode &&
                <ScreenCode code={activeCode} />
      }
      {isCodeInDesignMode && !isScreenCanvasInDesignMode && !isComponentCanvasInDesignMode &&
                <CustomCode code={activeCode} />
      }
      {isCodebaseModeGlobal &&
                <CustomCode code={activeCode} />
      }

    </StyledCodeContainer>
  );
};

const StyledCodeContainer = styled.div`
    display: flex;
    width: 100%;
    height: 100%;
    color: ${props => props.textStyle};
`;
