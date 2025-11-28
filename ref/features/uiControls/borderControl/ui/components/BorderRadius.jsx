/** @jsxImportSource @emotion/react */
import React, { useCallback } from 'react';
import { useTheme } from '@emotion/react';
import { Stack } from '../../../../../shared/uiKit/Stack';
import { ButtonTool } from '../../../../../shared/uiKit/ButtonTool';
import { SeparateBorderRadiusIcon, SeparateBorderRadiusTopLeftIcon, SeparateBorderRadiusTopRightIcon, SeparateBorderRadiusBottomLeftIcon, SeparateBorderRadiusBottomRightIcon } from '../../../../../shared/assets/icons';
import { TextField, StartSlot } from '../../../../../shared/uiKit/Fields';
import { MinusIcon } from '../../../../../shared/assets/icons';
import { ActionWrapper, RightAction } from '../../../../../shared/uiKit/ActionWrapper';
import { useBorderRadius } from '../../model/hooks/useBorderRadius';


export const BorderRadius = () => {
  const theme = useTheme();

  const {
    hasBorderRadius,
    hasSeparateBorderRadius,

    borderRadius,
    borderTopLeftRadius,
    borderTopRightRadius,
    borderBottomLeftRadius,
    borderBottomRightRadius,

    separateBorderRadius,
    updateBorderRadius,
    removeBorderRadius,
    updateTopLeftRadius,
    updateTopRightRadius,
    updateBottomLeftRadius,
    updateBorderBottomRightRadius,
  } = useBorderRadius();

  const handleUpdateRadius = useCallback((value) => {
    updateBorderRadius(value);
  }, [updateBorderRadius]);

  const handleUpdateTopLeftRadius = useCallback((value) => {
    updateTopLeftRadius(value);
  }, [updateTopLeftRadius]);

  const handleUpdateTopRightRadius = useCallback((value) => {
    updateTopRightRadius(value);
  }, [updateTopRightRadius]);

  const handleUpdateBottomLeftRadius = useCallback((value) => {
    updateBottomLeftRadius(value);
  }, [updateBottomLeftRadius]);

  const handleUpdateBorderBottomRightRadius = useCallback((value) => {
    updateBorderBottomRightRadius(value);
  }, [updateBorderBottomRightRadius]);

  const handleRemoveRadius = useCallback(() => {
    removeBorderRadius();
  }, [removeBorderRadius]);

  const handleSeparateBorderRadius = useCallback(() => {
    separateBorderRadius();
  }, [separateBorderRadius]);

  return (
    <Stack direction="row" gap={1} alignItems='flex-start'>
      <ButtonTool
        filled
        onClick={handleSeparateBorderRadius}
        isSelected={hasSeparateBorderRadius}
      >
        <SeparateBorderRadiusIcon />
      </ButtonTool>
      <ActionWrapper align='center'>
        {!hasSeparateBorderRadius
          ? <TextField
            numeric={true}
            value={borderRadius}
            onChange={(value) => handleUpdateRadius(value)}
          />
          :
          <Stack gap={1} direction="row" theme={theme}>
            <Stack gap={1} >
              <TextField
                numeric={true}
                value={borderTopLeftRadius}
                onChange={(value) => handleUpdateTopLeftRadius(value)}
              >
                <StartSlot>
                  <SeparateBorderRadiusTopLeftIcon color={theme.sys.icon.light1} />
                </StartSlot>
              </TextField>
              <TextField
                numeric={true}
                value={borderBottomLeftRadius}
                onChange={(value) => handleUpdateBottomLeftRadius(value)}
              >
                <StartSlot>
                  <SeparateBorderRadiusBottomLeftIcon color={theme.sys.icon.light1} />
                </StartSlot>
              </TextField>
            </Stack>
            <Stack gap={1}>
              <TextField
                numeric={true}
                value={borderTopRightRadius}
                onChange={(value) => handleUpdateTopRightRadius(value)}
              >
                <StartSlot>
                  <SeparateBorderRadiusTopRightIcon color={theme.sys.icon.light1} />
                </StartSlot>
              </TextField>
              <TextField
                numeric={true}
                value={borderBottomRightRadius}
                onChange={(value) => handleUpdateBorderBottomRightRadius(value)}
              >
                <StartSlot>
                  <SeparateBorderRadiusBottomRightIcon color={theme.sys.icon.light1} />
                </StartSlot>
              </TextField>
            </Stack>
          </Stack>
        }
        <RightAction onClick={handleRemoveRadius}>
          <MinusIcon />
        </RightAction>
      </ActionWrapper>
    </Stack>
  );
};
