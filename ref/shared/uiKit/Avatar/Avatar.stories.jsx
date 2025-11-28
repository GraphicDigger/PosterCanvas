import React from 'react';
import { ThemeProvider } from '../../../app/providers';
import { Avatar, AvatarGroup } from './';
import avatarImage from '../../../shared/assets/dummy/avatar.png';
import { AvatarIcon } from '../../../shared/assets/icons';


export default {
  title: 'uiKit/Avatar',
  component: Avatar,
};

const Template = (args) => {
  return (
    <>
      <Avatar {...args} />
    </>
  );
};

export const Default = Template.bind({});
Default.args = {
  src: avatarImage,
};

export const ImageSizes = () => {
  return (
    <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
      <Avatar src={avatarImage} size="small" />
      <Avatar src={avatarImage} size="default" />
      <Avatar src={avatarImage} size="large" />
      <Avatar src={avatarImage} size="xlarge" />
    </div>
  );
};

export const ImageShapes = () => {
  return (
    <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
      <Avatar src={avatarImage} shape="circle" />
      <Avatar src={avatarImage} shape="rounded" />
    </div>
  );
};

export const WithNameInitials = () => {
  return (
    <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
      <Avatar bgColor="lightgrey">
                GM
      </Avatar>
    </div>
  );
};

export const WithIcon = () => {
  return (
    <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
      <Avatar>
        <AvatarIcon size="s" />
      </Avatar>
    </div>
  );
};

export const Group = () => (
  <AvatarGroup>
    <Avatar src={avatarImage} alt="User 1" />
    <Avatar src={avatarImage} alt="User 2" />
    <Avatar src={avatarImage} alt="User 3" />
    <Avatar src={avatarImage} alt="User 4" />
    <Avatar src={avatarImage} alt="User 5" />
  </AvatarGroup>
);

export const GroupWithMax = () => (
  <AvatarGroup max={3}>
    <Avatar src={avatarImage} alt="User 1" />
    <Avatar src={avatarImage} alt="User 2" />
    <Avatar src={avatarImage} alt="User 3" />
    <Avatar src={avatarImage} alt="User 4" />
    <Avatar src={avatarImage} alt="User 5" />
  </AvatarGroup>
);

export const GroupWithCustomSpacing = () => (
  <AvatarGroup spacing={16}>
    <Avatar src={avatarImage} alt="User 1" />
    <Avatar src={avatarImage} alt="User 2" />
    <Avatar src={avatarImage} alt="User 3" />
    <Avatar src={avatarImage} alt="User 4" />
    <Avatar src={avatarImage} alt="User 5" />
  </AvatarGroup>
);

