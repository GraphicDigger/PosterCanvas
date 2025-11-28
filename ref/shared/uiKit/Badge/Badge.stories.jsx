import React from 'react';
import { Badge } from './Badge';
import { Avatar } from '../Avatar';
import { PlusIcon } from '../../../shared/assets/icons';
import avatarImage from '../../../shared/assets/dummy/avatar.png';


export default {
  title: 'uiKit/Badge',
  component: Badge,
};

const Template = (args) => (
  <Badge {...args}>
    <Avatar
      size="large"
      src={avatarImage}
    />
  </Badge>
);

export const Dot = Template.bind({});
Dot.args = {
  type: 'dot',
  color: '#FF4D4F',
  size: 'small',
};

export const Number = Template.bind({});
Number.args = {
  type: 'number',
  content: '1',
  color: '#FF4D4F',
};

export const LargeNumber = Template.bind({});
LargeNumber.args = {
  type: 'number',
  content: '99+',
  color: '#FF4D4F',
};

export const WithSmallAvatar = Template.bind({});
WithSmallAvatar.args = {
  type: 'avatar',
  avatar: {
    src: avatarImage,
    border: true,
  },
};

export const WithSmallIconAvatar = Template.bind({});
WithSmallIconAvatar.args = {
  type: 'avatar',
  position: 'bottom-right',
  avatar: {
    icon: <PlusIcon />,
    bgColor: 'lightgrey',
  },
};

export const PositionsShowcase = () => (
  <div
    style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(2, 100px)',
      gap: '20px',
    }}
  >
    {['top-left', 'top-right', 'bottom-left', 'bottom-right'].map((position) => (
      <Badge key={position} type="dot" position={position} >
        <Avatar
          size="large"
          src={avatarImage}
        />
      </Badge>
    ))}
  </div>
);

