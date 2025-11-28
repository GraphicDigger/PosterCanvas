import React from 'react';
import styled from '@emotion/styled';
import { Surface } from './Surface';
import { surfaceColors } from '../../styles/tokens/surface';
import { ThemeProvider, useTheme } from '../../../app/providers';

export default {
  title: 'uiKit/Surface',
  component: Surface,
};

export const SurfaceColorsDemo = () => {
  return (
    <ThemeProvider >
      <SurfaceColors />
    </ThemeProvider>
  );
};

const SurfaceColors = () => {

  const { theme } = useTheme();
  const colors = surfaceColors(theme);

  return (
    <ColorGrid>
      {Object.entries(colors).map(([name, value], index) => (
        <div key={index}>
          <ColorCircle color={colors[name]} />
          <ColorLabel>
            {name}
          </ColorLabel>
        </div>
      ))}
    </ColorGrid>
  );
};

const ColorCircle = styled.div`
    width: 100px;
    height: 100px;
    border-radius: 50%;
    background-color: ${props => props.color};
    margin: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
`;

const ColorGrid = styled.div`
    display: grid;
    width: 100vw;
    grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
    gap: 20px;
    padding: 20px;
    align-item: center;
    justify-conten: center
`;

const ColorLabel = styled.div`
    margin-top: 10px;
    font-size: 12px;
    color: #666;
    text-align: center;
`;

export const Default = () => (
  <Surface elevation={1} padding={20}>
    <p>Basic Surface Component</p>
  </Surface>
);
