import React from 'react';
import { Pin } from './Pin';
import avatarImage from '../../assets/dummy/avatar.png';

export default {
  title: 'uiKit/Pin',
  component: Pin,
};

const user = {
  id: 1,
  name: 'Kate Doe',
  avatar: avatarImage,
};

const Template = (args) => <Pin {...args} />;

const Default = Template.bind({});
Default.args = {
  variant: 'cursor',
  user,
};

export const New = Template.bind({});
New.args = {
  variant: 'new',
  user,
};

export const Added = Template.bind({});
Added.args = {
  variant: 'added',
  user,
};

export const Selected = Template.bind({});
Selected.args = {
  variant: 'selected',
  user,
};

// Показать все варианты рядом
export const Variants = () => (
  <div style={{ display: 'flex', gap: '48px', alignItems: 'center' }}>
    <Pin variant="cursor" />
    <Pin variant="new" />
    <Pin variant="added" user={user} />
    <Pin variant="selected" user={user} />
  </div>
);
