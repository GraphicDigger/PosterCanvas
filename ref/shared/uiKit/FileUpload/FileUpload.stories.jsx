import React from 'react';
import { FileUpload } from './FileUpload';


export default {
  title: 'uiKit/FileUpload',
  component: FileUpload,
};

const Template = (args) => <FileUpload {...args} />;

export const SingleFile = Template.bind({});
SingleFile.args = {
  multiple: false,
};

export const MultipleFiles = Template.bind({});
MultipleFiles.args = {
  multiple: true,
};
