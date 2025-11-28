import React, { useState } from 'react';
import { ButtonTool } from './ButtonTool';
import { ButtonToolGroup } from './ButtonToolGroup';
import { ButtonToolToggle } from './ButtonToolToggle';
import { ButtonToolMultiToggle } from './ButtonToolMultiToggle';
import { PlusIcon, SearchIcon, CodeIcon, PreviewIcon } from '../../../shared/assets/icons';

export default {
  title: 'uiKit/ButtonTool',
  component: ButtonTool,
};

const Template = (args) => <ButtonTool {...args} />;

export const Default = Template.bind({});
Default.args = {
  color: 'default',
  variant: 'filled',
};

export const Selected = Template.bind({});
Selected.args = {
  ...Default.args,
  isSelected: true,
};

export const Disabled = Template.bind({});
Disabled.args = {
  ...Default.args,
  disabled: true,
};

export const Group = () => (
  <ButtonToolGroup>
    <ButtonTool>
      <PlusIcon />
    </ButtonTool>
    <ButtonTool>
      <SearchIcon />
    </ButtonTool>
    <ButtonTool>
      <CodeIcon />
    </ButtonTool>
  </ButtonToolGroup>
);

export const Toggle = () => {
  const [value, setValue] = useState('1');

  return (
    <div style={{ display: 'flex', gap: '30px' }}>

      <ButtonToolToggle
        value={value}
        onChange={setValue}
        style="primary"
        size="small"
      >
        <ButtonTool value="1">
          <PlusIcon />
        </ButtonTool>
        <ButtonTool value="2">
          <SearchIcon />
        </ButtonTool>
        <ButtonTool value="3">
          <CodeIcon />
        </ButtonTool>
      </ButtonToolToggle>
    </div>
  );
};

export const MultiToggle = () => {
  const [value, setValue] = useState(['1']);

  return (
    <div style={{ display: 'flex', gap: '30px' }}>

      <ButtonToolMultiToggle
        value={value}
        onChange={setValue}
        color="primary"
        size="small"
      >
        <ButtonTool value="1" >
          <PlusIcon />
        </ButtonTool>
        <ButtonTool value="2">
          <SearchIcon />
        </ButtonTool>
        <ButtonTool value="3">
          <CodeIcon />
        </ButtonTool>
      </ButtonToolMultiToggle>
    </div>
  );
};
