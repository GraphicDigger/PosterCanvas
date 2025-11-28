/** @jsxImportSource @emotion/react */
import React, { useCallback } from 'react';
import { useTheme } from '@emotion/react';
import styled from '@emotion/styled';
import { Stack } from '../../../../../shared/uiKit/Stack';
import { ButtonTool } from '../../../../../shared/uiKit/ButtonTool';
import { SeparateBorderIcon, SeparateBorderTopIcon, SeparateBorderRightIcon, SeparateBorderBottomIcon, SeparateBorderLeftIcon } from '../../../../../shared/assets/icons';
import { TextField, StartSlot } from '../../../../../shared/uiKit/Fields';
import { useElement } from '../../../../../entities/uiElement';
import { useBorder } from '../../model';
import { MinusIcon } from '../../../../../shared/assets/icons';
import { ActionWrapper, RightAction } from '../../../../../shared/uiKit/ActionWrapper';


export const Border = () => {
  const theme = useTheme();

  const {
    hasBorder,
    hasSeparateBorder,

    border,
    borderTopWidth,
    borderBottomWidth,
    borderLeftWidth,
    borderRightWidth,

    separateBorder,
    removeBorder,
    updateBorderWidth,
    updateBorderColor,
    updateBorderTopWidth,
    updateBorderBottomWidth,
    updateBorderLeftWidth,
    updateBorderRightWidth,
  } = useBorder();

  const handleSeparateBorder = useCallback(() => {
    separateBorder();
  }, [separateBorder]);

  const handleRemoveBorder = useCallback(() => {
    removeBorder();
  }, [removeBorder]);

  const handleUpdateBorderWidth = useCallback((value) => {
    updateBorderWidth(value);
  }, [updateBorderWidth]);

  const handleUpdateBorderColor = useCallback((value) => {
    updateBorderColor(value);
  }, [updateBorderColor]);

  const handleUpdateBorderTopWidth = useCallback((value) => {
    updateBorderTopWidth(value);
  }, [updateBorderTopWidth]);

  const handleUpdateBorderBottomWidth = useCallback((value) => {
    updateBorderBottomWidth(value);
  }, [updateBorderBottomWidth]);

  const handleUpdateBorderLeftWidth = useCallback((value) => {
    updateBorderLeftWidth(value);
  }, [updateBorderLeftWidth]);

  const handleUpdateBorderRightWidth = useCallback((value) => {
    updateBorderRightWidth(value);
  }, [updateBorderRightWidth]);

  return (
    <Stack direction="row" gap={1} alignItems='flex-start'>
      <Stack direction="row" gap={1} alignItems='flex-start' width='fit'>
        <ButtonTool
          filled
          isSelected={hasSeparateBorder}
          onClick={handleSeparateBorder}
        >
          <SeparateBorderIcon />
        </ButtonTool>
      </Stack>
      <Stack gap={1} alignItems='flex-start' >
        <ActionWrapper>
          <Stack direction='row' gap={1}>
            <TextField
              value={border?.color}
              onChange={(value) => handleUpdateBorderColor(value)}
            />
            {!hasSeparateBorder &&
                            <TextField
                              value={border?.width}
                              onChange={(value) => handleUpdateBorderWidth(value)}
                              numeric={true}
                            />}
          </Stack>
          <RightAction onClick={handleRemoveBorder}>
            <MinusIcon />
          </RightAction>
        </ActionWrapper>
        {hasSeparateBorder &&
                    <Stack gap={1} direction="row" theme={theme}>
                      <Stack gap={1} >
                        <TextField
                          value={borderLeftWidth}
                          onChange={(value) => handleUpdateBorderLeftWidth(value)}
                          numeric={true}
                        >
                          <StartSlot>
                            <SeparateBorderLeftIcon color={theme.sys.icon.light1} />
                          </StartSlot>
                        </TextField>
                        <TextField
                          value={borderRightWidth}
                          onChange={(value) => handleUpdateBorderRightWidth(value)}
                          numeric={true}
                        >
                          <StartSlot>
                            <SeparateBorderRightIcon color={theme.sys.icon.light1} />
                          </StartSlot>
                        </TextField>
                      </Stack>
                      <Stack gap={1}>
                        <TextField
                          value={borderTopWidth}
                          onChange={(value) => handleUpdateBorderTopWidth(value)}
                          numeric={true}
                        >
                          <StartSlot>
                            <SeparateBorderTopIcon color={theme.sys.icon.light1} />
                          </StartSlot>
                        </TextField>
                        <TextField
                          value={borderBottomWidth}
                          onChange={(value) => handleUpdateBorderBottomWidth(value)}
                          numeric={true}
                        >
                          <StartSlot >
                            <SeparateBorderBottomIcon color={theme.sys.icon.light1} />
                          </StartSlot>
                        </TextField>
                      </Stack>
                    </Stack>
        }
      </Stack>
    </Stack>
  );
};


const StyledMap = styled.div`
    display: flex;
    gap: 2px;
    align-items: center;
    justify-content: center;
    width: 100%;
    border-radius: 8px;
    position: relative;
    overflow: hidden;
    & > * {
        flex: 1;
    }
`;
