import React from 'react';
import { Preview } from './Preview';
import { ThemeProvider } from '../../../app/providers';
import dummyImage from '../../../shared/assets/dummy/abstract.jpg';

const ThemeWrapper = (story) => (
  <ThemeProvider>
    {story()}
  </ThemeProvider>
);


export default {
  title: 'uiKit/Preview',
  component: Preview,
  decorators: [ThemeWrapper],
  argTypes: {
    color: { control: 'color', description: 'Color to display in the preview' },
    imageUrl: { control: 'text', description: 'URL of the image to display in the preview' },
  },
};

const Template = (args) => <Preview {...args} />;

export const ColorPreview = Template.bind({});
ColorPreview.args = {
  color: '#ff0000',
};

export const ImagePreview = Template.bind({});
ImagePreview.args = {
  imageUrl: dummyImage,
  fit: true,
};

export const WithoutImagePreview = Template.bind({});
WithoutImagePreview.args = {
  imageUrl: '',
};
