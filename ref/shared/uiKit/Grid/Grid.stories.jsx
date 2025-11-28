import React from 'react';
import { ThemeProvider } from '../../../app/providers';
import { Grid } from './Grid';
import { Box } from '../Box';
import styled from '@emotion/styled';

export default {
  title: 'uiKit/Grid',
  component: Grid,

};

const Item = styled(Box)`
    padding: 16px;
    text-align: center;
    border-radius: 4px;
    background-color: #e0e0e0;
    color: #333;
`;

export const BasicGrid = () => (
  <Grid container spacing={2}>
    <Grid item size={8}>
      <Item>size=8</Item>
    </Grid>
    <Grid item size={4}>
      <Item>size=4</Item>
    </Grid>
    <Grid item size={4}>
      <Item>size=4</Item>
    </Grid>
    <Grid item size={8}>
      <Item>size=8</Item>
    </Grid>
  </Grid>
);

export const DifferentColumns = () => (
  <Grid container spacing={2} columns={16}>
    <Grid item size={8}>
      <Item>size=8 (in 16-column grid)</Item>
    </Grid>
    <Grid item size={8}>
      <Item>size=8 (in 16-column grid)</Item>
    </Grid>
    <Grid item size={4}>
      <Item>size=4 (in 16-column grid)</Item>
    </Grid>
    <Grid item size={4}>
      <Item>size=4 (in 16-column grid)</Item>
    </Grid>
    <Grid item size={4}>
      <Item>size=4 (in 16-column grid)</Item>
    </Grid>
    <Grid item size={4}>
      <Item>size=4 (in 16-column grid)</Item>
    </Grid>
  </Grid>
);

export const SpacingGrid = () => (
  <div>
    <Grid container spacing={1}>
      <Grid item size={3}>
        <Item>spacing=1</Item>
      </Grid>
      <Grid item size={3}>
        <Item>spacing=1</Item>
      </Grid>
      <Grid item size={3}>
        <Item>spacing=1</Item>
      </Grid>
      <Grid item size={3}>
        <Item>spacing=1</Item>
      </Grid>
    </Grid>

    <Grid container spacing={2} css={{ marginTop: '20px' }}>
      <Grid item size={3}>
        <Item>spacing=2</Item>
      </Grid>
      <Grid item size={3}>
        <Item>spacing=2</Item>
      </Grid>
      <Grid item size={3}>
        <Item>spacing=2</Item>
      </Grid>
      <Grid item size={3}>
        <Item>spacing=2</Item>
      </Grid>
    </Grid>

    <Grid container spacing={3} css={{ marginTop: '20px' }}>
      <Grid item size={3}>
        <Item>spacing=3</Item>
      </Grid>
      <Grid item size={3}>
        <Item>spacing=3</Item>
      </Grid>
      <Grid item size={3}>
        <Item>spacing=3</Item>
      </Grid>
      <Grid item size={3}>
        <Item>spacing=3</Item>
      </Grid>
    </Grid>
  </div>
);

export const NestedGrid = () => (
  <Grid container spacing={2}>
    <Grid item size={8}>
      <Item>
        <Grid container spacing={1}>
          <Grid item size={4}>
            <Item>Nested 4/12</Item>
          </Grid>
          <Grid item size={8}>
            <Item>Nested 8/12</Item>
          </Grid>
        </Grid>
      </Item>
    </Grid>
    <Grid item size={4}>
      <Item>4/12</Item>
    </Grid>
  </Grid>
);

export const Interactive = (args) => (
  <Grid container {...args}>
    <Grid item size={4}>
      <Item>Item 1</Item>
    </Grid>
    <Grid item size={5}>
      <Item>Item 2</Item>
    </Grid>
    <Grid item size={2}>
      <Item>Item 3</Item>
    </Grid>
  </Grid>
);

Interactive.args = {
  spacing: 2,
  columns: 12,
};

export const AutoFill = () => (
  <Grid container autoFill spacing={2}>
    <Grid item >
      <Item>Item 1</Item>
    </Grid>
    <Grid item>
      <Item>Item 2</Item>
    </Grid>
    <Grid item>
      <Item>Item 3</Item>
    </Grid>
  </Grid>
);
export const AutoFit = () => (
  <Grid container autoFit spacing={2}>
    <Grid item >
      <Item>Item 1</Item>
    </Grid>
    <Grid item>
      <Item>Item 2</Item>
    </Grid>
    <Grid item>
      <Item>Item 3</Item>
    </Grid>
  </Grid>
);

