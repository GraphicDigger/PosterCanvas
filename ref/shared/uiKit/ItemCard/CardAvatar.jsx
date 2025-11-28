import React from 'react';
import PropTypes from 'prop-types';
import { Avatar } from '../Avatar';
import { AvatarIcon } from '../../assets/icons';


export const CardAvatar = ({ children, size }) => {
  const avatarSize = size === 'medium' ? 'large' : 'medium';
  return (
    children ||
        <Avatar size={avatarSize}>
          <AvatarIcon size="s" />
        </Avatar>
  );
};

CardAvatar.propTypes = {
  children: PropTypes.node.isRequired,
};
