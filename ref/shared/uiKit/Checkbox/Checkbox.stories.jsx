import React, { useState } from 'react';
import styled from '@emotion/styled';
import { ThemeProvider } from '../../../app/providers';
import { Checkbox } from './Checkbox';
import { Box } from '../Box';

const ThemeWrapper = (story) => (
  <ThemeProvider>
    {story()}
  </ThemeProvider>
);

export default {
  title: 'uiKit/Checkbox',
  component: Checkbox,
  decorators: [ThemeWrapper],
};

const Template = (args) => {
  return (
    <>
      <Checkbox {...args} />
    </>
  );
};

export const Check = () => {
  const [controlChecked, setControlChecked] = useState(false);
  const [targetChecked, setTargetChecked] = useState(false);

  return (
    <Box css={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '200px' }}>
      <Checkbox
        variant="checkbox"
        label="Turn"
        checked={controlChecked}
        onChange={(checked) => setControlChecked(checked)}
      />
      <Checkbox
        variant="checkbox"
        label={controlChecked ? 'OFF' : 'ON'}
        checked={targetChecked}
        onChange={(checked) => setTargetChecked(checked)}
        disabled={controlChecked}
      />
    </Box>
  );
};

export const Switch = () => {
  const [controlChecked, setControlChecked] = useState(false);
  const [targetChecked, setTargetChecked] = useState(false);

  return (
    <Box css={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '200px' }}>
      <Checkbox
        variant="switch"
        label="Turn"
        checked={controlChecked}
        onChange={(checked) => setControlChecked(checked)}
      />
      <Checkbox
        variant="switch"
        label={controlChecked ? 'OFF' : 'ON'}
        checked={targetChecked}
        onChange={(checked) => setTargetChecked(checked)}
        disabled={controlChecked}
      />
    </Box>
  );
};

const Container = styled.div`
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 24px;
    padding: 24px;
    background: white;
    border-radius: 8px;
`;

const Column = styled.div`
    display: flex;
    flex-direction: column;
    gap: 16px;
`;

const Label = styled.div`
    font-size: 14px;
    color: #666;
    margin-bottom: 8px;
`;

