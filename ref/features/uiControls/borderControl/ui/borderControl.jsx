/** @jsxImportSource @emotion/react */
import React from 'react';
import { Stack } from '../../../../shared/uiKit/Stack';
import { Border } from './components/Border';
import { BorderRadius } from './components/BorderRadius';
import { useBorder, useBorderRadius } from '../model';


export const BorderControl = () => {

  const { hasBorder } = useBorder();
  const { hasBorderRadius } = useBorderRadius();

  return (
    <Stack height='fit' justifyContent='space-between' gap={2}>
      {hasBorder && <Border />}
      {hasBorderRadius && <BorderRadius />}
    </Stack>
  );
};

