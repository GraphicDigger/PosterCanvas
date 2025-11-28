/** @jsxImportSource @emotion/react */
import React from 'react';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';
import { useTheme } from '@emotion/react';
import { Surface } from '../Surface';
import { MenuList } from '../Menu/MenuList';


export const Dropdown = ({ children }) => {
  const theme = useTheme();

  return (
    <Surface elevation={4} borderRadius={theme.ref.borderRadius.large}>
      <MenuList>
        {children}
      </MenuList>
    </Surface>
  );
};

Dropdown.propTypes = {
  children: PropTypes.node.isRequired,
  preventClose: PropTypes.bool,
  onClose: PropTypes.func,
};
